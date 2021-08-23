import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import LoginPage from './pages/LoginPage/LoginPage';
import ListProduct from './pages/ListProduct/ListProduct';
import ListCategory from './pages/ListCategory/ListCategory';
import ListUser from './pages/ListUser/ListUser';
import AddProduct from './components/Products/AddProduct';
import EditProduct from './components/Products/EditProduct';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


function App() {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <HomePage />
                </Route>

                <Route path="/login">
                    <LoginPage />
                </Route>

                <Route path="/listProduct" exact render={() => {
                    return localStorage.getItem("token")  ? <ListProduct></ListProduct> : <Redirect to="/login"></Redirect>
                }}>
                </Route>

                <Route path="/listTheloai" exact render={() => {
                    return localStorage.getItem("token")  ? <ListCategory></ListCategory> : <Redirect to="/login"></Redirect>
                }}>
                </Route>

                <Route path="/listUser" exact render={() => {
                    return localStorage.getItem("token")  ? <ListUser></ListUser> : <Redirect to="/login"></Redirect>
                }}>
                </Route>

                <Route path="/EditProduct/:id" exact render={() => {
                    return localStorage.getItem("token")  ? <EditProduct></EditProduct> : <Redirect to="/login"></Redirect>
                }}>
                </Route>

                <Route path="/AddProduct" exact render={() => {
                    return localStorage.getItem("token")  ? <AddProduct></AddProduct> : <Redirect to="/login"></Redirect>
                }}>
                </Route>           
                <Route path="*">
                    <NotFoundPage />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

const mapStateToProps = (state) => {
    return {
        token: state.admin
    }
}

export default connect(mapStateToProps, null)(App);
