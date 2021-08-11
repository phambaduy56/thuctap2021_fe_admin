import React, { useState } from 'react';
import './index.css';
import { listCategory } from './../../actions/index';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

function AddProduct(props) {

    const [product, setProduct] = useState({
        name_product: '',
        price: null,
        discount: null,
        qty: null,
        category_id: '',
        productPictures: []
    })
    const [productPictures, setProductPictures] = useState([])

    useEffect(() => {

        axios.get('/api/getCategory')
            .then(res => {
                props.listCate(res.data.category);
            });

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

        const form = new FormData();
        form.append('category_id', product.category_id);
        form.append('name_product', product.name_product);
        form.append('price', product.price);
        form.append('discount', product.discount);
        form.append('qty', product.qty);

        for (let pic of productPictures) {
            form.append('productPictures', pic);
        }

        axios.post('/api/postProduct', form)
            .then(res => {
                alert(res.data.message);
            })
    }

    const handlePickImage = (e) => {
        setProductPictures([
            ...productPictures,
            e.target.files[0]
        ]);
    }

    return (

        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 mr-50">

            <form onSubmit={onSubmit}>
                <legend>Thêm sản phẩm</legend>

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
                        value={product.price}
                        onChange={(e) => setProduct({ ...product, price: e.target.value })}
                        placeholder="Input field" />
                </div>
                <br />
                <div className="form-group">
                    <label >Giảm giá</label>
                    <br />
                    <input type="text"
                        className="form-control"
                        name="discount"
                        value={product.discount}
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
                        value={product.qty}
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
                {
                    productPictures.length > 0 ?
                        productPictures.map((pic, index) => <div className="form-control" key={index}>{pic.name}</div>) : null
                }
                <input className="form-control"
                    type="file"
                    name="productPictures"
                    onChange={handlePickImage} />
                <br />
                <button type="submit" className="btn btn-primary button-mg">
                   <span><i class="fas fa-download css-icon"></i></span> Thêm
                </button>
                <Link type="button"
                    className="btn btn-primary"
                    to="/listProduct"
                >
                  <span><i class="fas fa-arrow-left css-icon"></i></span>  Quay lại
                </Link>

            </form>

        </div>

    )
}

const mapStateToProps = (state) => {
    console.log(state)
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

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);