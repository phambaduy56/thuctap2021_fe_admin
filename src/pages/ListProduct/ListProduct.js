import React from 'react';
import Header from '../../commons/Header';
import './index.css';
import { Container, Row, Col, Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux'
import { useEffect } from 'react';
import { listProduct, editProduct } from './../../actions/index';

function ListProduct(props) {

    useEffect(() => {

        axios.get('/api/getProduct')
            .then(res => {
                props.getProduct(res.data.product)
            })

    });

    const onDeleteProduct = (id) => {
        if (window.confirm('Are you sure you want to delete!')) {
            axios.delete(`/api/deleteProduct/${id}`)
                .then(res => {

                })
        }

    }


    const ShowProduct = (products) => {
        var result = null;
        if (products.length > 0) {
            result = products.map((p, index) => {
                return (

                    <tr key={index}>
                        <td>{p.name_product}</td>
                        <td>{p.price}</td>
                        <td>{p.discount}</td>
                        <td>{p.qty}</td>
                        <td>
                            <Link className="btn btn-success mr-10" to="/EditProduct" onClick={() => onEditProduct(p)} >
                                <span><i class="fas fa-edit"></i></span> Sửa
                            </Link>
                            <Button variant="danger" className="mr-10" onClick={() => onDeleteProduct(p._id)}>
                                <span><i class="fas fa-trash-alt"></i></span> Xóa
                            </Button>
                        </td>
                    </tr>
                )
            });
        }
        return result;
    }

    const onEditProduct = (id) => {
        props.editProduct(id)
    }

    return (
        <div>
            <Header />
            <br />
            <Container fluid="md">
                <Row>
                    <Col>
                        <Link className="btn btn-lg btn-primary" to="/AddProduct" >
                            <span><i class="fas fa-plus-circle"></i></span> Thêm sản phẩm
                        </Link>
                        <br /><br />
                        <div className="panel panel-primary">
                            <div className="panel-heading">
                                <h3 className="panel-title">Danh sách sản phẩm</h3>
                            </div>
                            <div className="panel-body">
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Tên sản phẩm</th>
                                            <th>Giá sản phẩm</th>
                                            <th>Giảm giá</th>
                                            <th>Số lượng</th>
                                            <th>Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ShowProduct(props.listproduct)}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

        </div>
    );

}

const mapStateToProps = (state) => {
    return {
        listproduct: state.product
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProduct: (product) => {
            dispatch(listProduct(product))
        },
        editProduct: (id) => {
            dispatch(editProduct(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListProduct);
