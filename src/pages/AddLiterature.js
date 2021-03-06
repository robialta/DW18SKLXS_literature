import React, { useContext, useState } from "react";
import Nav from "../components/Nav";
import AttachIcon from "../static/icon/attachWhite.png";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import { Formik } from "formik";
import { ToastContext, showToast } from "../context/toastContext";

function AddLiterature() {
    const [toast, createToast] = useContext(ToastContext); //eslint-disable-line no-unused-vars
    const [state] = useContext(UserContext);
    const [fileData, setFileData] = useState({ value: "" });
    const [errorFile, setErrorFile] = useState("");
    const [publicationType, setPublicationType] = useState("text");
    const [loading, setLoading] = useState(false);

    const setFile = (e) => {
        if (e.target.files[0]) {
            setFileData({ value: "", name: "", size: "", type: "" });
            if (Math.floor(e.target.files[0].size) / 1000 > 5000)
                return setErrorFile("Maximum File SIze 5 MB");
            setFileData({
                value: e.target.value,
                name: e.target.files[0].name,
                size: Math.floor(e.target.files[0].size) / 1000,
                type: e.target.files[0].type,
                literature: e.target.files[0],
            });
            setErrorFile("");
        } else {
            setFileData({
                value: "",
                name: "",
                size: "",
                type: "",
                literature: "",
            });
        }
    };

    const validate = (values) => {
        const errors = {};

        if (!values.title) errors.title = "Title Required!";

        if (!values.publication)
            errors.publication = "Publication Date Required!";

        if (!values.pages) errors.pages = "Pages Required!";

        if (!values.ISBN) errors.ISBN = "ISBN Required!";

        if (!values.author) errors.author = "Author Required!";

        return errors;
    };

    const addLiterature = async (values, setSubmitting, resetForm) => {
        if (!fileData.value) return setErrorFile("File Required");
        setLoading(true);
        setSubmitting();

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        values.userId = state.user.id;
        values.literature = fileData.literature;

        let formData = new FormData();
        formData.append("title", values.title);
        formData.append("publication", values.publication);
        formData.append("pages", values.pages);
        formData.append("isbn", values.ISBN);
        formData.append("author", values.author);
        formData.append("userId", values.userId);
        formData.append("literature", values.literature);

        try {
            await API.post("/literature", formData, config);
            resetForm();
            setFileData({
                value: "",
                name: "",
                size: "",
                type: "",
                literature: "",
            });
            setLoading(false);
            showToast(
                () =>
                    createToast({
                        show: true,
                        message:
                            "Thank you for adding your own literature, please wait 1 x 24 hours to verify whether this literature is your writing",
                    }),
                () => createToast({ show: false })
            );
        } catch (err) {
            setLoading(false);
            showToast(
                () => createToast({ show: true, message: "SERVER ERROR" }),
                () => createToast({ show: false })
            );
        }
    };

    return (
        <div className="main-content row mx-auto" style={{ width: "91%" }}>
            <Nav />
            <div className="body-wrap col-sm-12 px-4">
                <div
                    className="col-md-12 p-0"
                    style={{ margin: "50px 0 50px 0" }}
                >
                    <span
                        style={{
                            fontFamily: "Times New Roman",
                            fontSize: "36px",
                            fontStyle: "normal",
                            fontWeight: 700,
                            lineHeight: "3px",
                            letterSpacing: "0em",
                            textAlign: "left",
                        }}
                    >
                        Add Literature
                    </span>
                </div>

                <div className="col-md-12 p-0" style={{ width: "100%" }}>
                    <Formik
                        initialValues={{
                            title: "",
                            publication: "",
                            pages: "",
                            ISBN: "",
                            file: "",
                            author: "",
                        }}
                        validate={(values) => validate(values)}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            addLiterature(values, setSubmitting, resetForm);
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
                            <form onSubmit={handleSubmit} id="addliterature">
                                <div className="form-group mb-2">
                                    <input
                                        placeholder="Title"
                                        type="text"
                                        className="form-control form-control-lg bg-dark"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="title"
                                        value={values.title}
                                    />
                                    <div className="error">
                                        {errors.title &&
                                            touched.title &&
                                            errors.title}
                                    </div>
                                </div>
                                <div className="form-group mb-2">
                                    <input
                                        placeholder="Publication Date"
                                        type={publicationType}
                                        className="form-control form-control-lg bg-dark"
                                        name="publication"
                                        value={values.publication}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        onFocus={() => {
                                            setPublicationType("date");
                                        }}
                                    />
                                    <div className="error">
                                        {errors.publication &&
                                            touched.publication &&
                                            errors.publication}
                                    </div>
                                </div>

                                <div className="form-group mb-2">
                                    <input
                                        placeholder="Pages"
                                        type="number"
                                        className="form-control form-control-lg bg-dark"
                                        name="pages"
                                        value={values.pages}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <div className="error">
                                        {errors.pages &&
                                            touched.pages &&
                                            errors.pages}
                                    </div>
                                </div>
                                <div className="form-group mb-2">
                                    <input
                                        placeholder="ISBN"
                                        type="number"
                                        className="form-control form-control-lg bg-dark"
                                        name="ISBN"
                                        value={values.ISBN}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <div className="error">
                                        {errors.ISBN &&
                                            touched.ISBN &&
                                            errors.ISBN}
                                    </div>
                                </div>
                                <div className="form-group mb-2">
                                    <input
                                        placeholder="author"
                                        type="text"
                                        className="form-control form-control-lg bg-dark"
                                        name="author"
                                        value={values.author}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <div className="error">
                                        {errors.author &&
                                            touched.author &&
                                            errors.author}
                                    </div>
                                </div>

                                <div className="form-group mb-2 pt-1">
                                    <div
                                        className="input-group input-group-lg"
                                        style={{ width: "280px" }}
                                    >
                                        <div
                                            style={{
                                                cursor: "pointer",
                                            }}
                                            type="text"
                                            className="form-control bg-dark text-left"
                                            id="inlineFormInputGroup"
                                        >
                                            <label
                                                className=""
                                                htmlFor="fileInput"
                                                style={{
                                                    width: "100%",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                Attache Literature File{" "}
                                                <img
                                                    style={{
                                                        float: "right",
                                                    }}
                                                    src={AttachIcon}
                                                    alt="Attach file"
                                                />
                                            </label>
                                        </div>
                                    </div>

                                    <div style={{ height: "70px" }}>
                                        {!fileData.name ? (
                                            <div className="error">
                                                {errorFile}
                                            </div>
                                        ) : (
                                            <small>
                                                <span className="text-success">
                                                    FILE SELECTED :{" "}
                                                    {fileData.name}
                                                </span>
                                                <br></br>
                                                <span className="text-success">
                                                    SIZE : {fileData.size} KB
                                                </span>
                                                <br></br>
                                                <span className="text-success">
                                                    TYPE :{" "}
                                                    {fileData.type.slice(
                                                        -3,
                                                        fileData.type.length
                                                    )}
                                                </span>
                                            </small>
                                        )}
                                    </div>
                                </div>

                                <div className="form-group mb-2 text-right">
                                    <button
                                        disabled={loading}
                                        type="text"
                                        className="btn text-white"
                                        style={{
                                            float: "right",
                                            background: "#EE4622",
                                            fontSize: "18px",
                                            height: "50px",
                                            width: "192px",
                                            borderRadius: "5px",
                                            position: "relative",
                                            top: "-25px",
                                        }}
                                    >
                                        {loading
                                            ? "Uploding..."
                                            : "Add Literature"}
                                    </button>
                                </div>

                                <input
                                    disabled={loading}
                                    accept="application/pdf"
                                    type="file"
                                    id="fileInput"
                                    name="file"
                                    hidden
                                    value={fileData.value}
                                    style={{ display: "" }}
                                    onChange={(e) => {
                                        setFile(e);
                                    }}
                                />
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}

export default AddLiterature;
