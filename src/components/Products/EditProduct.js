import React, { useState } from 'react';
import './index.css';
import { listCategory } from './../../actions/index';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

function EditProduct(props) {

    const [product, setProduct] = useState({
        _id: '',
        name_product: '',
        price: null,
        discount: null,
        qty: null,
        category_id: '',
    })

    useEffect(() => {

        axios.get('/api/getCategory')
            .then(res => {
                props.listCate(res.data.category);
            });


        var pd = props.editProduct
        if (pd) {
            setProduct({
                ...product,
                _id: pd._id,
                name_product: pd.name_product,
                price: pd.price,
                discount: pd.discount,
                qty: pd.qty,
                category_id: pd.category_id,
            })
        }

    }, [])



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
        console.log(product)
        axios.put(`/api/putProduct/${product._id}`, {
            name_product: product.name_product,
            price: product.price,
            discount: product.discount,
            qty: product.qty,
            category_id: product.category_id,
        })
            .then(res => {
                console.log(res.data)
                alert(res.data.message)
            })
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
                </div>
                <br />
                <div className="form-group">
                    <label >Giá sản phẩm</label>
                    <br />
                    <input type="text"
                        className="form-control"
                        name="price"
                        onChange={(e) => setProduct({ ...product, price: e.target.value })}
                        value={product.price || ''}
                        placeholder="Input field" />
                </div>
                <br />
                <div className="form-group">
                    <label >Giảm giá</label>
                    <br />
                    <input type="text"
                        className="form-control"
                        name="discount"
                        value={product.discount || ''}
                        onChange={(e) => setProduct({ ...product, discount: e.target.value })}
                        placeholder="Input field" />
                </div>
                <br />
                <div className="form-group">
                    <label >Số lượng</label>
                    <br />
                    <input type="text"
                        className="form-control"
                        name="qty"
                        value={product.qty || ''}
                        onChange={(e) => setProduct({ ...product, qty: e.target.value })}
                        placeholder="Input field" />
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
                    <span><i class="fas fa-download css-icon"></i></span> Thêm
                </button>
                <Link type="button"
                    className="btn btn-primary"
                    to="/listProduct"
                >
                    <span><i class="fas fa-arrow-left css-icon"></i></span> Quay lại
                </Link>
            </form>
        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        listCategory: state.listCategory,
        editProduct: state.editProduct,
        listProduct: state.product,
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