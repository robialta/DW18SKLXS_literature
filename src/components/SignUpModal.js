import React, { useContext } from "react";
import { Formik } from "formik";
import { API, setAuthToken } from "../config/api";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { ToastContext, showToast } from "../context/toastContext";

const SignUpModal = () => {
    const [state, dispatch] = useContext(UserContext); // eslint-disable-line no-unused-vars
    const [toast, setToast] = useContext(ToastContext); //eslint-disable-line no-unused-vars
    const history = useHistory();

    const validate = (values) => {
        const errors = {};

        if (!values.email) {
            errors.email = "Email Required!";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        )
            errors.email = "Invalid email address!";

        if (!values.password) errors.password = "Password Required!";
        else if (values.password.length < 6)
            errors.password = "Password length min 6 caracters!";

        if (!values.fullName) errors.fullName = "Fullname Required!";

        if (!values.phone) errors.phone = "Phone Required!";

        if (!values.address) errors.address = "Address Required!";

        if (values.gender === "DEFAULT" || !values.gender)
            errors.gender = "Gender Required!";

        return errors;
    };

    const register = async (values, setSubmitting, resetForm) => {
        dispatch({ type: "LOADING" });
        setSubmitting();
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const body = JSON.stringify(values);

        try {
            const res = await API.post("/register", body, config);
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
                    alert(res.data.error.message);
                }
                resetForm();
                showToast(
                    () =>
                        setToast({
                            show: true,
                            message: "You are successfully registered!",
                        }),
                    () => setToast({ show: false })
                );

                history.push(
                    res.data.data.type === "admin" ? "/admin" : "/home"
                );
                dispatch({ type: "UNLOADING" });
            } else {
                dispatch({
                    type: "LOGIN_FAILED",
                    payload: res.data.data,
                });
                showToast(
                    () =>
                        setToast({
                            show: true,
                            message: res.data.err.message,
                        }),
                    () => setToast({ show: false })
                );
                dispatch({ type: "UNLOADING" });
            }
        } catch (err) {
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
            id="signupmodal"
            tabIndex="-1"
            aria-labelledby="signUpmodalLabel"
            aria-hidden="true"
        >
            <div
                className="modal-dialog"
                style={{ width: "416px", height: "408px", top: "100px" }}
            >
                <div
                    className="modal-content p-3 text-center"
                    style={{ backgroundColor: "#161616" }}
                >
                    <div className="modal-header" style={{ border: "none" }}>
                        <h5
                            className="modal-title"
                            id="exampleModalLabel"
                            style={{ fontWeight: "700", fontSize: "36px" }}
                        >
                            Sign Up
                        </h5>
                    </div>
                    <div className="modal-body">
                        <Formik
                            initialValues={{
                                email: "obyaltha@gmail.com",
                                password: "Rr892195",
                                fullName: "Robialta",
                                gender: "male",
                                phone: "083114416508",
                                address: "Bungtiang",
                            }}
                            validate={(values) => validate(values)}
                            onSubmit={(
                                values,
                                { setSubmitting, resetForm }
                            ) => {
                                register(values, setSubmitting, resetForm);
                            }}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting,
                                resetForm,
                                /* and other goodies */
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group mb-2 text-left">
                                        <input
                                            type="email"
                                            name="email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                            className="form-control form-control-lg bg-dark"
                                            placeholder="Email"
                                        />
                                        <div
                                            style={{
                                                height: "20px",
                                                fontSize: "12px",
                                                color: "#ff0018",
                                            }}
                                        >
                                            {errors.email &&
                                                touched.email &&
                                                errors.email}
                                        </div>
                                    </div>
                                    <div className="form-group mb-2 text-left">
                                        <input
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            type="password"
                                            name="password"
                                            value={values.password}
                                            className="form-control form-control-lg bg-dark"
                                            placeholder="Password"
                                        />

                                        <div
                                            className=""
                                            style={{
                                                height: "20px",
                                                fontSize: "12px",
                                                color: "#ff0018",
                                            }}
                                        >
                                            {errors.password &&
                                                touched.password &&
                                                errors.password}
                                        </div>
                                    </div>
                                    <div className="form-group mb-2 text-left">
                                        <input
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            type="text"
                                            name="fullName"
                                            value={values.fullName}
                                            className="form-control form-control-lg bg-dark"
                                            placeholder="Fullname"
                                        />
                                        <div
                                            style={{
                                                height: "20px",
                                                fontSize: "12px",
                                                color: "#ff0018",
                                            }}
                                        >
                                            {errors.fullName &&
                                                touched.fullName &&
                                                errors.fullName}
                                        </div>
                                    </div>
                                    <div className="form-group mb-2 text-left">
                                        <select
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="gender"
                                            defaultValue="DEFAULT"
                                            className="form-control form-control-lg bg-dark"
                                        >
                                            <option
                                                style={{
                                                    color: "black",
                                                }}
                                                value="DEFAULT"
                                                disabled
                                            >
                                                Gender
                                            </option>
                                            <option
                                                style={{
                                                    color: "black",
                                                }}
                                                value="Male"
                                            >
                                                Male
                                            </option>
                                            <option
                                                style={{
                                                    color: "black",
                                                }}
                                                value="Female"
                                            >
                                                Female
                                            </option>
                                        </select>
                                        <div
                                            style={{
                                                height: "20px",
                                                fontSize: "12px",
                                                color: "#ff0018",
                                            }}
                                        >
                                            {errors.gender &&
                                                touched.gender &&
                                                errors.gender}
                                        </div>
                                    </div>

                                    <div className="form-group mb-2 text-left">
                                        <input
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            type="number"
                                            name="phone"
                                            value={values.phone}
                                            className="form-control form-control-lg bg-dark"
                                            placeholder="Phone"
                                        />
                                        <div
                                            className=""
                                            style={{
                                                height: "20px",
                                                fontSize: "12px",
                                                color: "#ff0018",
                                            }}
                                        >
                                            {errors.phone &&
                                                touched.phone &&
                                                errors.phone}
                                        </div>
                                    </div>
                                    <div
                                        className="form-group mb-2 text-left"
                                        style={{
                                            marginBottom: "36px",
                                        }}
                                    >
                                        <input
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            type="text"
                                            name="address"
                                            value={values.address}
                                            className="form-control form-control-lg bg-dark"
                                            placeholder="Address"
                                        />
                                        <div
                                            className=""
                                            style={{
                                                height: "20px",
                                                fontSize: "12px",
                                                color: "#ff0018",
                                            }}
                                        >
                                            {errors.address &&
                                                touched.address &&
                                                errors.address}
                                        </div>
                                    </div>
                                    <div
                                        data-toggle="modal"
                                        data-target={
                                            !errors.email &&
                                            !errors.password &&
                                            !errors.fullName &&
                                            !errors.gender &&
                                            !errors.phone &&
                                            !errors.address
                                                ? "#signupmodal"
                                                : ""
                                        }
                                    >
                                        <button
                                            disabled={isSubmitting}
                                            type="submit"
                                            className="btn btn-lg btn-block btn-dark mb-3"
                                            style={{
                                                height: "50px",
                                                background: "#AF2E1C",
                                                border: "none",
                                            }}
                                        >
                                            Sign Up
                                        </button>
                                    </div>

                                    <small
                                        className="form-text pt-2"
                                        style={{
                                            fontSize: "18px",
                                        }}
                                    >
                                        Already have an account ? Klick{" "}
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
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpModal;
