import React, { useContext } from "react";
import { Link } from "react-router-dom";
import LOGO from "../static/logo/main.png";
import { UserContext } from "../context/userContext";

const Nav = () => {
    const [state, dispatch] = useContext(UserContext); //eslint-disable-line no-unused-vars
    const page = window.location.pathname;
    const logOut = async () => {
        dispatch({
            type: "LOGOUT",
        });
    };
    return (
        <div className="navbar-wrap" style={{ width: "100%" }}>
            <nav className="navbar navbar-expand-lg navbar-dark mt-0">
                <div
                    className="na-brand"
                    style={{ position: "relative", top: "11px" }}
                >
                    <Link className="navbar-brand" id="kanct" to="/home">
                        <img src={LOGO} alt="logo" />
                    </Link>
                </div>
                <button
                    style={{ position: "relative", top: "19px" }}
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link
                                to="/profile"
                                className="nav-link"
                                style={{
                                    color:
                                        page === "/profile"
                                            ? "#AF2E1C"
                                            : "#fff",
                                }}
                            >
                                <div className="nav-text">Profile</div>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/mycollection"
                                className="nav-link "
                                style={{
                                    color:
                                        page === "/mycollection"
                                            ? "#AF2E1C"
                                            : "#fff",
                                }}
                            >
                                <div className="nav-text">My Collection</div>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className="nav-link "
                                to="/addliterature"
                                style={{
                                    color:
                                        page === "/addliterature"
                                            ? "#AF2E1C"
                                            : "#fff",
                                }}
                            >
                                <div className="nav-text">Add Literature</div>
                            </Link>
                        </li>
                        {state.user ? (
                            state.user.type === "admin" ? (
                                <li className="nav-item">
                                    <Link
                                        className="nav-link "
                                        to="/admin"
                                        style={{
                                            color: "white",
                                        }}
                                    >
                                        <div className="nav-text">
                                            Verification
                                        </div>
                                    </Link>
                                </li>
                            ) : (
                                ""
                            )
                        ) : (
                            ""
                        )}

                        <li className="nav-item ">
                            <div
                                className="nav-link text-white"
                                style={{ cursor: "pointer" }}
                                onClick={() => logOut()}
                            >
                                <div className="nav-text">Logout</div>
                            </div>
                        </li>
                    </ul>
                    <div
                        className="na-brand"
                        style={{ position: "relative", top: "8px" }}
                    >
                        <Link className="navbar-brand" id="nav" to="/home">
                            <img src={LOGO} alt="logo" />
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Nav;
