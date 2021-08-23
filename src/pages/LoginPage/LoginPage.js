import React, { useState } from 'react';
import Header from '../../commons/Header';
import { connect } from 'react-redux';
import { actLogin } from './../../actions/index';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { isEmpty } from 'validate.js';

function LoginPage(props) {

    const [validationMsg, setvalidationMsg] = useState("")

    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const validateAll = () => {
        const msg = {}
        if (isEmpty(user.username)) {
            msg.username = "không được để trống"
        }

        if (isEmpty(user.password)) {
            msg.password = "không được để trống"
        }

        setvalidationMsg(msg)
        if (Object.keys(msg).length > 0) return false
        return true
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const isvalid = validateAll();

        if (isvalid) {
            axios.post('/api/user/dangnhap/admin', user)
                .then(
                    res => {
                        const data = res.data;

                        if (data.success === false) {
                            alert(`Thong bao, ${data.message}`);
                            return;
                        }
                        else {
                            props.onLogin(res.data.accessToken)
                        }

                    });
        }
    }

    console.log(props.token);
    if (props.token) {
        alert("Đăng nhập thành công")
        localStorage.setItem("token", JSON.stringify(props.token));
        return <Redirect to="/" />
    }
    return (
        <div >
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                        <form onSubmit={onSubmit}>
                            <legend>Đăng Nhập</legend>

                            <div className="form-group">
                                <label>Username</label>
                                <input type="text"
                                    className="form-control"
                                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                                    placeholder="Nhập username"
                                    name="username"
                                />
                                <small className="form-text text-danger">{validationMsg.username}</small>
                                <br />
                                <label>Password</label>
                                <input type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Nhập password"
                                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                                />
                                 <small className="form-text text-danger">{validationMsg.password}</small>
                            </div>
                            <br />
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        token: state.admin,
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onLogin: (token) => {
            dispatch(actLogin(token))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
