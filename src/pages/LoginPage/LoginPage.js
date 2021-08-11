import React, { useState } from 'react';
import Header from '../../commons/Header';
import { connect } from 'react-redux';
import { actLogin } from './../../actions/index';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginPage(props) {
  const [user, setUser] = useState({
    username: '',
    password: ''
  });

  const onSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/user/dangnhap/admin', user)
      .then(
        res => {
          const data = res.data;

          if (data.success === false) {
            alert(`Thong bao, ${data.message}`);
            return;
          }
          else{
            props.onLogin(res.data.accessToken)
          }

        });


  }

  console.log(props.token);
  if (props.token) {
    alert("Dang nhap thanh cong")
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
                <br />
                <label>Password</label>
                <input type="text"
                  className="form-control"
                  name="password"
                  placeholder="Nhập password"
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
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
