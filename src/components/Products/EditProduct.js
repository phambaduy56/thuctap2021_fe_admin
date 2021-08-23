import React, { useState } from 'react';
import './index.css';
import { listCategory } from './../../actions/index';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { Link, useRouteMatch } from 'react-router-dom'
import { isEmpty } from 'validate.js';

function EditProduct(props) {
    const match = useRouteMatch();
    const [product, setProduct] = useState({
        _id: '',
        name_product: '',
        price: null,
        discount: null,
        qty: null,
        category_id: '',
        description: '',
    })

    const [validationMsg, setvalidationMsg] = useState("")

    useEffect(() => {
        const id = match.params.id;

        axios.get('/api/getCategory')
            .then(res => {
                props.listCate(res.data.category);
            });

        axios.get(`/api/getProductID/${id}`)
            .then(res => {
                const data = res.data.product;
                setProduct({
                    ...product,
                    _id: data._id,
                    name_product: data.name_product,
                    price: data.price,
                    discount: data.discount,
                    qty: data.qty,
                    category_id: data.category_id,
                    description: data.description
                })
            })

    }, [])

    const validateAll = () => {
        const msg = {}

        if (isEmpty(product.name_product)) {
            msg.name_product = "không được để trống"
        }

        if (isEmpty(product.price)) {
            msg.price = "không được để trống"
        }

        if (isEmpty(product.discount)) {
            msg.discount = "không được để trống"
        }

        if (isEmpty(product.qty)) {
            msg.qty = "không được để trống"
        }

        if (isEmpty(product.description)) {
            msg.description = "không được để trống"
        }

        setvalidationMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    };

    const getCategory = (category) => {
        var result = null;
        if (category.length > 0) {
            result = category.map((cate, index) => {
                if (cate.status === 'active') {
                    return (
                        <option
                            key={index}
                            value={cate._id}
                        >
                            {cate.name_category}
                        </option>
                    )
                }
            })
        }
        return result;
    }


    const onSubmit = (e) => {
        e.preventDefault();

        const isvalid = validateAll()

        if (isvalid) {
            axios.put(`/api/putProduct/${product._id}`, {
                name_product: product.name_product,
                price: product.price,
                discount: product.discount,
                qty: product.qty,
                category_id: product.category_id,
                description: product.description,
            })
                .then(res => {
                    console.log("res-data: ", res.data)
                    alert(res.data.message)
                })
        }
    }

    return (
        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 mr-50">
            <form onSubmit={onSubmit}>
                <legend className="css-label">Sửa sản phẩm</legend>
                <div className="form-group">
                    <label>Tên sản phẩm</label>
                    <input type="text"
                        className="form-control"
                        name="name_product"
                        onChange={(e) => setProduct({ ...product, name_product: e.target.value })}
                        value={product.name_product}
                        placeholder="Vd. vòng cổ kim cương...," />
                    <small className="form-text text-danger">{validationMsg.name_product}</small>
                </div>
                <br />
                <div className="form-group">
                    <label >Giá sản phẩm</label>
                    <br />
                    <input type="number"
                        className="form-control"
                        name="price"
                        onChange={(e) => setProduct({ ...product, price: e.target.value })}
                        value={product.price || ''}
                        placeholder="Input field" />
                    <small className="form-text text-danger">{validationMsg.price}</small>
                </div>
                <br />
                <div className="form-group">
                    <label >Giảm giá</label>
                    <br />
                    <input type="number"
                        className="form-control"
                        name="discount"
                        value={product.discount || ''}
                        onChange={(e) => setProduct({ ...product, discount: e.target.value })}
                        placeholder="Input field" />
                    <small className="form-text text-danger">{validationMsg.discount}</small>
                </div>
                <br />
                <div className="form-group">
                    <label >Số lượng</label>
                    <br />
                    <input type="number"
                        className="form-control"
                        name="qty"
                        value={product.qty || ''}
                        onChange={(e) => setProduct({ ...product, qty: e.target.value })}
                        placeholder="Input field" />
                    <small className="form-text text-danger">{validationMsg.qty}</small>
                </div>
                <br />
                <div className="form-group">
                    <label >Mô tả</label>
                    <br />
                    <input type="text"
                        className="form-control"
                        name="description"
                        value={product.description || ""}
                        onChange={(e) => setProduct({ ...product, description: e.target.value })}
                        placeholder="Input field" />
                    <small className="form-text text-danger">{validationMsg.description}</small>
                </div>
                <br />
                <label>Thể loại sản phẩm</label>
                <select
                    className="form-control"
                    onChange={(e) => setProduct({ ...product, category_id: e.target.value })}
                >
                    {getCategory(props.listCategory)}
                </select>
                <br />
                <button type="submit" className="btn btn-primary button-mg">
                    <span><i className="fas fa-download css-icon"></i></span> Thêm
                </button>
                <Link type="button"
                    className="btn btn-primary"
                    to="/listProduct"
                >
                    <span><i className="fas fa-arrow-left css-icon"></i></span> Quay lại
                </Link>
            </form>
        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        listCategory: state.listCategory
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        listCate: (category) => {
            dispatch(listCategory(category));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);