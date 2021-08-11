import React, { useState } from 'react';
import Header from '../../commons/Header';
import { Badge } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css"
import { connect } from 'react-redux';
import { listCategory } from './../../actions/index';
import { useEffect } from 'react';
import axios from 'axios';

function ListCategory(props) {


    const [category, setCategory] = useState({
        name_category: '',
    })

    const [flag, setFlag] = useState({
        number: 0,
        name_category: '',
        _id: '',
        status: '',
    })

    const [search, setSearch] = useState({
        valueSearch: '',
    })

    useEffect(() => {

        axios.get('/api/getCategory')
            .then(res => {
                props.listCate(res.data.category);
            });

    })

    //tim san pham
    const findId = (id) => {
        var cate = props.listCategory.find((k) => k._id === id)
        return cate;
    }

    const onChangeStatus = (id) => {
        var cate2 = findId(id)
        var status = cate2.status === 'active' ? 'disable' : 'active'
        axios.put(`/api/putCategory/${id}`, { status: status, name_category: cate2.name_category })
            .then(res => {
                console.log(res)
            });
    }

    const onUpdateCategory = (id) => {

        var cate = findId(id)

        setCategory({
            ...category,
            name_category: cate.name_category,
        })

        setFlag({
            ...flag,
            number: 1,
            name_category: cate.name_category,
            _id: cate._id,
            status: cate.status,
        })
    }

    const getCategory = (listCategory) => {
        var result = null;
        if (listCategory.length > 0) {
            result = listCategory.map((category, index) => {
                return (
                    <tr key={index}>
                        <td>{category.name_category}</td>
                        <td>
                            <Badge bg={category.status === "active" ? "primary" : "secondary"} onClick={() => onChangeStatus(category._id)} >{category.status}</Badge>
                        </td>
                        <td>
                            <button type="button" className="btn btn-success mr-10" onClick={() => onUpdateCategory(category._id)}>
                                <span><i class="fas fa-edit"></i></span> Sửa
                            </button>
                            <button type="button" className="btn btn-danger">
                                <span><i class="fas fa-trash-alt"></i></span> Xóa
                            </button>
                        </td>
                    </tr>
                )
            });
        }
        return result;
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(flag)
        console.log(category)
        if (flag._id) {
            axios.put(`/api/putCategory/${flag._id}`, { status: flag.status, name_category: category.name_category })
                .then(res => {
                    console.log(res)
                });
            setCategory({
                ...category,
                name_category: '',
            })

            setFlag({
                ...flag,
                number: 0,
                name_category: '',
                _id: '',
                status: '',
            })
        }
        if (!flag._id) {
            axios.post('/api/postCategory', category)
                .then(res => {

                });
            setCategory({
                ...category,
                name_category: '',
            })

            setFlag({
                ...flag,
                number: 0,
                name_category: '',
                _id: '',
                status: '',
            })
        }
    }

    const onHandleSearch = (e) => {

    }


    return (
        <div>
            <Header />
            <br />
            <div classnames="container">
                <div className="row">
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 mg-10">
                        <div className="panel panel-default">
                            <div className="panel-heading ">
                                <h3 className="panel-title">Danh sách loại sản phẩm</h3>
                                <div className="inline">
                                    <input type="search"
                                        name="valueSearch"
                                        id="input"
                                        className="form-control search"
                                        value={search.valueSearch}
                                        onChange={(e) => setSearch({ ...search, valueSearch: e.target.value })}
                                        placeholder="Tìm kiếm loại sản phẩm...." />
                                    <button type="button" className="btn btn-primary mr-10" onClick={onHandleSearch}>Tìm kiếm</button>
                                </div>
                            </div>
                            <br />
                            <div className="panel-body">
                                <table className="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>Loại sản phẩm</th>
                                            <th>Trạng thái </th>
                                            <th>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getCategory(props.listCategory)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 mg-20">
                        <form onSubmit={onSubmit}>
                            <legend>Thêm loại sản phẩm</legend>

                            <div className="form-group">
                                <label>Loại sản phẩm</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name_category"
                                    value={category.name_category}
                                    onChange={(e) => setCategory({ ...category, name_category: e.target.value })}
                                />
                            </div>
                            <br />
                            <button type="submit" className="btn btn-primary">
                                <span><i class="fas fa-download css-icon"></i></span>Thêm</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        listCategory: state.listCategory,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        listCate: (category, props) => {
            dispatch(listCategory(category));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListCategory);
