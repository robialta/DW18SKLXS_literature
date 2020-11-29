import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import SignUpModal from "../components/SignUpModal";
import SignInModal from "../components/SignInModal";
import LOGO from "../static/logo/main.png";
import { UserContext } from "../context/userContext";

const Landing = () => {
    const [state, dispatch] = useContext(UserContext); //eslint-disable-line no-unused-vars
    const page = useHistory();
    if (state.isLogedIn) page.push("/home");

    return (
        <div className="main-content row mx-auto" style={{ width: "91%" }}>
            <div
                className="landing m-0 p-0"
                style={{
                    backgroundImage: "url(/assets/img/landing-banner.png)",
                    backgroundRepeat: "no-repeat",
                    height: "100vh",
                    backgroundPositionY: "center",
                    backgroundPositionX: "90%",
                    width: "100%",
                }}
            >
                <div className="row m-0">
                    <div className="navbar-wrap" style={{ width: "100%" }}>
                        <nav className="navbar navbar-expand-lg navbar-dark mt-0">
                            <div
                                className="na-brand"
                                style={{ position: "relative", top: "11px" }}
                            >
                                <Link className="navbar-brand" to="/home">
                                    <img src={LOGO} alt="logo" />
                                </Link>
                            </div>
                        </nav>
                    </div>
                </div>
                <div className="row m-0">
                    <div className="col-sm-12">
                        <div className="row p-0" style={{ marginTop: "149px" }}>
                            <div className="col-sm-12 " style={{}}>
                                <span
                                    style={{
                                        fontSize: "96px",
                                        fontStyle: "italic",
                                        fontWeight: "700",
                                        fontFamily: "Times New Roman",
                                        lineHeight: "105px",
                                        letterSpacing: "0em",
                                    }}
                                >
                                    source
                                </span>
                                <span
                                    style={{
                                        fontStyle: "italic",
                                        fontSize: "96px",
                                        fontWeight: "700",
                                        fontFamily: "Times New Roman",
                                        lineHeight: "105px",
                                        letterSpacing: "0em",
                                    }}
                                >
                                    {" "}
                                    of{" "}
                                </span>
                                <br></br>
                                <span
                                    style={{
                                        fontSize: "96px",
                                        fontWeight: "700",
                                        fontFamily: "Times New Roman",
                                        lineHeight: "105px",
                                        letterSpacing: "0em",
                                    }}
                                >
                                    intelligence
                                </span>
                            </div>
                            <div
                                className="col-sm-12"
                                style={{ paddingTop: "18px" }}
                            >
                                <p
                                    style={{
                                        fontSize: "24px",
                                        fontWeight: "400",
                                        fontFamily: "",
                                    }}
                                >
                                    Sign-up and receive unlimited accesss to all{" "}
                                    <br></br>
                                    of your literatur - share your literature.
                                </p>
                            </div>
                            <div
                                className="col-sm-12 pl-3"
                                style={{ paddingTop: "21px" }}
                            >
                                <button
                                    data-toggle="modal"
                                    data-target="#signupmodal"
                                    className="btn dark text-light mb-2"
                                    style={{
                                        marginRight: "31px",
                                        fontSize: "18px",
                                        border: "none",
                                        width: "211px",
                                        height: "50px",
                                        background: "#AF2E1C",
                                    }}
                                >
                                    Sign up
                                </button>
                                <button
                                    data-toggle="modal"
                                    data-target="#signinmodal"
                                    className="btn btn-light mb-2"
                                    style={{
                                        fontSize: "18px",
                                        border: "none",
                                        width: "211px",
                                        height: "50px",
                                        background: "r#F9F9F9",
                                    }}
                                >
                                    Sign in
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <SignInModal />
                <SignUpModal />
            </div>
        </div>
    );
};

export default Landing;
