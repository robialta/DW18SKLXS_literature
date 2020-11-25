import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { API, setAuthToken } from "../config/api";
import { ToastContext, showToast } from "../context/toastContext";
import { UserContext } from "../context/userContext";

const SignInModal = () => {
    const [toast, setToast] = useContext(ToastContext);
    const history = useHistory();
    const [state, dispatch] = useContext(UserContext);
    const [formData, setformData] = useState({
        email: "obyaltha@gmail.com",
        password: "Rr892195",
    });
    const { email, password } = formData;

    const handleChange = (e) => {
        setformData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        dispatch({ type: "LOADING" });
        e.preventDefault();
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const body = JSON.stringify({ email, password });
        try {
            const res = await API.post("/login", body, config);
            if (res.status === 200) {
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: res.data.data.token,
                });
                setAuthToken(res.data.data.token);
                try {
                    const res = await API.get("/auth");
                    dispatch({
                        type: "USER_LOADED",
                        payload: res.data.data,
                    });
                } catch (error) {
                    dispatch({
                        type: "AUTH_ERROR",
                    });
                    showToast(
                        () =>
                            setToast({
                                show: true,
                                message: res.data.error.message,
                            }),
                        () => setToast({ show: false })
                    );
                }
                history.push(
                    res.data.data.type === "admin" ? "/admin" : "/home"
                );

                dispatch({ type: "UNLOADING" });
            } else {
                showToast(
                    () =>
                        setToast({
                            show: true,
                            message: res.data.error.message,
                        }),
                    () => setToast({ show: false })
                );
                dispatch({
                    type: "LOGIN_FAILED",
                    payload: res.data.data,
                });

                dispatch({ type: "UNLOADING" });
            }
        } catch (error) {
            dispatch({
                type: "LOGIN_FAILED",
            });

            showToast(
                () =>
                    setToast({
                        show: true,
                        message: "SERVER ERROR",
                    }),
                () => setToast({ show: false })
            );

            dispatch({ type: "UNLOADING" });
        }
    };

    return (
        <div
            className="modal fade"
            id="signinmodal"
            tabIndex="-1"
            aria-labelledby="signinmodalLabel"
            aria-hidden="true"
        >
            <div
                className="modal-dialog"
                style={{ width: "416px", height: "408px", top: "200px" }}
            >
                <div
                    className="modal-content p-3 text-center"
                    style={{ backgroundColor: "#161616", borderRadius: "10px" }}
                >
                    <div className="modal-header" style={{ border: "none" }}>
                        <span
                            className="modal-title"
                            id="exampleModalLabel"
                            style={{ fontWeight: "700", fontSize: "36px" }}
                        >
                            Sign In
                        </span>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group mb-4">
                                <input
                                    type="email"
                                    className="form-control form-control-lg "
                                    placeholder="Email"
                                    value={email}
                                    name="email"
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                />
                            </div>
                            <div
                                className="form-group"
                                style={{
                                    marginBottom: "36px",
                                }}
                            >
                                <input
                                    type="password"
                                    className="form-control form-control-lg "
                                    placeholder="Password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                />
                            </div>

                            <button
                                onClick={(e) => {
                                    handleSubmit(e);
                                }}
                                data-dismiss="modal"
                                className="btn btn-lg btn-block btn-dark mb-3"
                                style={{
                                    height: "50px",
                                    background: "#AF2E1C",
                                    border: "none",
                                }}
                            >
                                Sign In
                            </button>

                            <small
                                className="form-text pt-2"
                                style={{
                                    fontSize: "18px",
                                }}
                            >
                                Don't have an account ? Klick{" "}
                                <span
                                    data-toggle="modal"
                                    data-target="#signupmodal"
                                >
                                    <strong
                                        data-toggle="modal"
                                        data-target="#signinmodal"
                                        style={{
                                            color: "#AF2E1C",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Here
                                    </strong>
                                </span>
                            </small>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInModal;
