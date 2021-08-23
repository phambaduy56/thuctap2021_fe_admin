import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';


function Header(props) {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Nav>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/">Trang Chủ</NavLink>
                    </li>
                </Nav>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/listProduct">Sản Phẩm</NavLink>
                        </li>
                        <Nav>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/listTheloai">Loại Sản Phẩm</NavLink>
                        </li>
                    </Nav>
                        <Nav>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/listUser">Người Dùng</NavLink>
                        </li>
                    </Nav>
                    </Nav>
                    <Nav>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login">Singin</NavLink>
                        </li>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;