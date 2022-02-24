import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import axios from "./utils/axios";

//customer portion
import Cart from "./pages/CustomerPages/Cart";
import HomePage from "./pages/CustomerPages/HomePage";
import Login from "./pages/CustomerPages/Login";
import Product from "./pages/CustomerPages/Product";
import ProductListPage from "./pages/CustomerPages/ProductListPage";
import Register from "./pages/CustomerPages/Register";
import CustomerProfile from "./pages/CustomerPages/CustomerProfile";
import { useStateValue } from "./utils/StateProvider";

//admin portion
import Sidebar from "./components/adminComponents/sidebar/Sidebar";
import Topbar from "./components/adminComponents/topbar/Topbar";
import Home from "./pages/AdminPages/home/Home";
import UserList from "./pages/AdminPages/userList/UserList";
import User from "./pages/AdminPages/user/User";
import NewUser from "./pages/AdminPages/newUser/NewUser";
import ProductList from "./pages/AdminPages/productList/ProductList";
import AdminProduct from "./pages/AdminPages/admin_product/AdminProduct";
import NewProduct from "./pages/AdminPages/newProduct/NewProduct";
import SellerList from "./pages/AdminPages/seller_list/SellerList";
import Seller from "./pages/AdminPages/seller/Seller";

//seller portion
import SellerLogin from "./pages/SellerPages/SellerLogin";
import SellerRegister from "./pages/SellerPages/SellerRegister";
import SellerHome from "./pages/SellerPages/SellerHome";
import AdminLogin from "./pages/AdminPages/AdminLogin";
import SellerNewProduct from "./pages/SellerPages/SellerNewProduct";
import OrdersPage from "./pages/CustomerPages/OrdersPage";
import Transactions from "./pages/AdminPages/Transactions";
//delivery portion
import DeliveryRegister from "./pages/DeliveryPages/DeliveryRegister"
import DeliveryLogin from "./pages/DeliveryPages/DeliveryLogin"
import DeliveryHome from "./pages/DeliveryPages/DeliveryHome"


const App = () => {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    // this will only run once when the App component loads
    console.log("app component loads");

    //here i will check if the user exists in the database because i can delete the user from admin
    const checkExistanceOfUser = async () => {
      const token = sessionStorage.getItem("token");
      const email = sessionStorage.getItem("email");
      axios({
        method: "GET",
        url: `/api/user/email/${email}`,
        headers: { token: `Bearer ${token}` },
      })
        .then((res) => {})
        .catch((err) => {
          sessionStorage.removeItem("email");
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("type");
          sessionStorage.removeItem("id");
        });
    };
    checkExistanceOfUser();
    const email = sessionStorage.getItem("email");
    const type = sessionStorage.getItem("type");
    const id = sessionStorage.getItem("id");
    if (email) {
      // User is signed in
      //now store this user in context api in reducer.js
      if (!user) {
        const userObj = { email, type, id };

        dispatch({
          type: "SET_USER",
          user: userObj,
        });
      }
    } else {
      // User is signed out
      //now remove the user from the context api in reducer.js
      dispatch({
        type: "SET_USER",
        user: null,
      });
    }
  }, []);
  return (
    <div>
      <Routes>
        <Route path="/">
          <Route
            path=""
            element={(!user || user?.type === "customer") && <HomePage />}
          />
          <Route path="admin">
            <Route
              path=""
              element={
                user?.type === "admin" && (
                  <>
                    <Topbar />
                    <div className="container">
                      <Sidebar />
                      <Home />
                    </div>
                  </>
                )
              }
            />
            <Route
              path="users"
              element={
                user?.type === "admin" && (
                  <>
                    <Topbar />
                    <div className="container">
                      <Sidebar />
                      <UserList />
                    </div>
                  </>
                )
              }
            />
            <Route
              // path="users/user/:userId"
              path="users/user/:id"
              element={
                user?.type === "admin" && (
                  <>
                    <Topbar />
                    <div className="container">
                      <Sidebar />
                      <User />
                    </div>
                  </>
                )
              }
            />
            <Route
              // path="sellers/seller/:sellerId"
              path="sellers/seller/:id"
              element={
                user?.type === "admin" && (
                  <>
                    <Topbar />
                    <div className="container">
                      <Sidebar />
                      <Seller />
                    </div>
                  </>
                )
              }
            />
            {/* <Route
              path="newUser"
              element={
                user?.type === "admin" && (
                  <>
                    <Topbar />
                    <div className="container">
                      <Sidebar />
                      <NewUser />
                    </div>
                  </>
                )
              }
            /> */}
            <Route
              path="products"
              element={
                user?.type === "admin" && (
                  <>
                    <Topbar />
                    <div className="container">
                      <Sidebar />
                      <ProductList />
                    </div>
                  </>
                )
              }
            />

            <Route
              path="sellers"
              element={
                user?.type === "admin" && (
                  <>
                    <Topbar />
                    <div className="container">
                      <Sidebar />
                      <SellerList />
                    </div>
                  </>
                )
              }
            />
            <Route
              path="transactions"
              element={
                user?.type === "admin" && (
                  <>
                    <Topbar />
                    <div className="container">
                      <Sidebar />
                      <Transactions />
                    </div>
                  </>
                )
              }
            />

            <Route path="login" element={!user && <AdminLogin />} />
          </Route>
          <Route path="login" element={!user && <Login />} />
          <Route path="orders" element={user && <OrdersPage />} />
          <Route path="profile" element={user && <CustomerProfile />} />
          <Route path="register" element={!user && <Register />} />
          <Route path="cart" element={user?.type === "customer" && <Cart />} />
          <Route path="seller/login" element={!user && <SellerLogin />} />
          <Route path="seller/register" element={!user && <SellerRegister />} />
          <Route path="delivery/register" element={!user && <DeliveryRegister />} />
          <Route path="delivery/login" element={!user && <DeliveryLogin />} />
          <Route
            path="seller"
            element={user?.type === "seller" && <SellerHome />}
          />
          <Route
            path="delivery"
            element={user?.type === "delivery" && <DeliveryHome/>}
          />
          <Route
            path="seller/newproduct"
            element={
             user?.type === "seller" && <SellerNewProduct/>
            }
          />
          <Route path=":category/products">
            <Route
              path=""
              element={user?.type === "customer" && <ProductListPage />} 
            />
          </Route>
           <Route
              path=":productId"
              element={user?.type === "customer" && <Product />}
            />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
