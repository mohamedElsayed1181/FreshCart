import { useContext } from "react";
import logo from "../../images/freshcart-logo.svg";
import { Link, NavLink } from "react-router-dom";
import { CartContext } from "../../context/cartContext";

export default function Navbar() {
  let { count } = useContext(CartContext);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-main-light navbar-light">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <img src={logo} alt="FreshCart Logo" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Products">
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Category">
                  Categories
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Brands">
                  Brands
                </NavLink>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link d-flex align-items-center"
                  to="/cart"
                >
                  <i className="fa-solid fa-cart-shopping me-2"></i> Cart
                  <span className="badge rounded-pill bg-success ms-2">
                    {count}
                  </span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Rigister">
                  Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Login">
                  Login
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
