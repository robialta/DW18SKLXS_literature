import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../context/userContext";

import Avatar from "../static/img/Ellipse 1.png";
import CheckList from "../static/icon/checklist.png";
import Logout from "../static/icon/logout.png";
import { API } from "../config/api";
import LOGO from "../static/logo/main.png";

const Admin = () => {
    const [literatures, setLiteratures] = useState([]);
    const [state, dispatch] = useContext(UserContext);
    const history = useHistory();
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [loading, setLoading] = useState(false); // eslint-disable-line no-unused-vars
    const [canceling, setCanceling] = useState(false);
    const [aproving, setAproving] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const loadData = async () => {
        try {
            setLoading(true);
            const res = await API.get("/literatures");
            if (selectedCategory === "Aproved") {
                setLiteratures(
                    res.data.data.literatures.filter(
                        (literature) => literature.status === "Aproved"
                    )
                );
            } else if (selectedCategory === "Canceled") {
                setLiteratures(
                    res.data.data.literatures.filter(
                        (literature) => literature.status === "Canceled"
                    )
                );
            } else if (selectedCategory === "Waiting") {
                setLiteratures(
                    res.data.data.literatures.filter(
                        (literature) =>
                            literature.status === "Waiting to be verified"
                    )
                );
            } else {
                setLiteratures(res.data.data.literatures);
            }
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    };
    const setCategory = (category) => {
        setSelectedCategory(category);
    };

    const cancelLiterature = async (literature) => {
        try {
            setCanceling(true);
            let body = literature;
            body.status = "Canceled";
            await API.patch(`/literature/${literature.id}`, body);
            loadData();
            setCanceling(false);
        } catch (error) {
            setCanceling(false);
            console.log(error);
        }
    };

    const aproveLiterature = async (literature) => {
        try {
            setAproving(true);
            let body = literature;
            body.status = "Aproved";
            await API.patch(`/literature/${literature.id}`, body);
            loadData();
            setAproving(false);
        } catch (error) {
            setAproving(false);
            console.log(error);
        }
    };
    const deleteLiterature = async (literature) => {
        try {
            setDeleting(true);
            await API.delete(`/literature/${literature.id}`);
            loadData();
            setDeleting(false);
        } catch (error) {
            setDeleting(false);
            console.log(error);
        }
    };
    const logout = () => {
        dispatch({
            type: "LOGOUT",
        });
    };

    useEffect(() => {
        const abortController = new AbortController();
        if (state.user.type === "basic") {
            history.push("/home");
            return function cleanup() {
                abortController.abort();
            };
        }
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategory]);
    return (
        <div
            className="Admin"
            style={{ color: "black", backgroundColor: "#fff" }}
        >
            {/* <div className="container"> */}
            <div className="row m-0">
                <div
                    className="col-md-12"
                    style={{ background: "#161616", height: "120px" }}
                >
                    <nav
                        className="navbar navbar-light px-0 mx-auto"
                        style={{ lineHeight: "100px", width: "91%" }}
                    >
                        <div className="navbar-brand">
                            <Link to="/home">
                                <img
                                    src={LOGO}
                                    alt="Logo"
                                    style={{
                                        position: "relative",
                                        top: "-10px",
                                    }}
                                />
                            </Link>
                        </div>
                        <div>
                            <div className="dropdown dropleft">
                                <button
                                    className="dropdown-toggle"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <img
                                        src={Avatar}
                                        alt="Logo"
                                        style={{
                                            position: "relative",
                                            height: "50px",
                                            width: "50px",
                                        }}
                                    />
                                </button>
                                <div
                                    className="dropdown-menu p-0"
                                    style={{ top: "20px", lineHeight: "60px" }}
                                    aria-labelledby="dropdownMenuLink"
                                >
                                    <button
                                        onClick={() => logout()}
                                        className="dropdown-item px-3"
                                        style={{
                                            cursor: "pointer",
                                            height: "60px",
                                            fontWeight: "600",
                                        }}
                                    >
                                        <img
                                            src={Logout}
                                            className="mr-3"
                                            style={{
                                                position: "relative",
                                                height: "25px",
                                                width: "25px",
                                            }}
                                            alt="Logout"
                                        />
                                        Log Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="col-md-12 bg-light" style={{ background: "" }}>
                    <div className="contain  mx-auto" style={{ width: "91%" }}>
                        <div className="row pt-5 pb-4">
                            <div className="col-md-6">
                                <span
                                    style={{
                                        fontSize: "36px",
                                        fontStyle: "normal",
                                        fontWeight: 600,
                                        lineHeight: "36px",
                                        letterSpacing: "0em",
                                        textAlign: "left",
                                    }}
                                >
                                    Literature Verification
                                </span>
                            </div>
                            <div className="col-md-6 text-right">
                                <span
                                    style={{
                                        fontSize: "36px",
                                        fontStyle: "normal",
                                        fontWeight: 600,
                                        lineHeight: "36px",
                                        letterSpacing: "0em",
                                        textAlign: "left",
                                    }}
                                >
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-secondary dropdown-toggle"
                                            type="button"
                                            id="dropdownMenuButton"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            {selectedCategory}
                                        </button>
                                        <div
                                            className="dropdown-menu"
                                            aria-labelledby="dropdownMenuButton"
                                        >
                                            <button
                                                onClick={() =>
                                                    setCategory("All")
                                                }
                                                className="dropdown-item"
                                                href="#"
                                            >
                                                All
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setCategory("Waiting")
                                                }
                                                className="dropdown-item"
                                                href="#"
                                            >
                                                Waiting
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setCategory("Aproved")
                                                }
                                                className="dropdown-item"
                                                href="#"
                                            >
                                                Aproved
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setCategory("Canceled")
                                                }
                                                className="dropdown-item"
                                                href="#"
                                            >
                                                Canceled
                                            </button>
                                        </div>
                                    </div>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 bg-light" style={{ background: "" }}>
                    <div className="contain  mx-auto" style={{ width: "91%" }}>
                        <table
                            className="table"
                            style={{ fontFamily: "", lineHeight: "38px" }}
                        >
                            <thead>
                                <tr className="table-light">
                                    <th scope="col">No</th>
                                    <th scope="col">Users or Authors</th>
                                    <th scope="col">ISBN</th>
                                    <th scope="col">Literature</th>
                                    <th scope="col">Status</th>
                                    <th scope="col" className="text-center">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {literatures.map((literature, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{literature.user.fullName}</td>
                                        <td>{literature.ISBN}</td>
                                        <td style={{ color: "#0058DD" }}>
                                            <a
                                                href={`https://res.cloudinary.com/robialta/image/upload/v1606409471/${literature.file}.pdf`}
                                                rel="noopener noreferrer"
                                                download
                                            >
                                                {literature.file.slice(
                                                    23,
                                                    literature.file.length
                                                )}
                                            </a>
                                        </td>
                                        <td
                                            style={
                                                literature.status === "Aproved"
                                                    ? {
                                                          color: "#0ACF83",
                                                          fontWeight: "700",
                                                      }
                                                    : literature.status ===
                                                      "Canceled"
                                                    ? {
                                                          color: "#FF0742",
                                                          fontWeight: "700",
                                                      }
                                                    : {
                                                          color: "#F7941E",
                                                          fontWeight: "700",
                                                      }
                                            }
                                        >
                                            {literature.status}
                                        </td>
                                        <td className="text-center">
                                            {literature.status === "Aproved" ? (
                                                <img
                                                    className="mx-auto"
                                                    src={CheckList}
                                                    alt=""
                                                />
                                            ) : literature.status ===
                                              "Canceled" ? (
                                                <div>
                                                    <button
                                                        disabled={
                                                            deleting ||
                                                            canceling ||
                                                            aproving
                                                        }
                                                        onClick={() =>
                                                            deleteLiterature(
                                                                literature
                                                            )
                                                        }
                                                        className="btn btn-dark mx-2"
                                                        style={{
                                                            width: "100px",
                                                            backgroundColor:
                                                                "#FF0742",
                                                            border: "none",
                                                            fontWeight: "700",
                                                            color: "#161616",
                                                        }}
                                                    >
                                                        {deleting
                                                            ? "Deleting..."
                                                            : "Delete"}
                                                    </button>
                                                    <button
                                                        disabled={
                                                            deleting ||
                                                            canceling ||
                                                            aproving
                                                        }
                                                        onClick={() =>
                                                            aproveLiterature(
                                                                literature
                                                            )
                                                        }
                                                        className="btn btn-dark mx-2"
                                                        style={{
                                                            width: "100px",

                                                            backgroundColor:
                                                                "#0ACF83",
                                                            border: "none",
                                                            fontWeight: "700",
                                                            color: "#161616",
                                                        }}
                                                    >
                                                        {aproving
                                                            ? "Aproving..."
                                                            : "Approve"}
                                                    </button>
                                                </div>
                                            ) : (
                                                <div>
                                                    <button
                                                        disabled={
                                                            deleting ||
                                                            canceling ||
                                                            aproving
                                                        }
                                                        onClick={() =>
                                                            cancelLiterature(
                                                                literature
                                                            )
                                                        }
                                                        className="btn btn-dark mx-2"
                                                        style={{
                                                            width: "100px",
                                                            backgroundColor:
                                                                "#FF0742",
                                                            border: "none",
                                                            fontWeight: "700",
                                                            color: "#161616",
                                                        }}
                                                    >
                                                        {canceling
                                                            ? "Canceling..."
                                                            : "Cancel"}
                                                    </button>
                                                    <button
                                                        disabled={
                                                            deleting ||
                                                            canceling ||
                                                            aproving
                                                        }
                                                        onClick={() =>
                                                            aproveLiterature(
                                                                literature
                                                            )
                                                        }
                                                        className="btn btn-dark mx-2"
                                                        style={{
                                                            width: "100px",

                                                            backgroundColor:
                                                                "#0ACF83",
                                                            border: "none",
                                                            fontWeight: "700",
                                                            color: "#161616",
                                                        }}
                                                    >
                                                        {aproving
                                                            ? "Aproving..."
                                                            : "Approve"}
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </div>
    );
};

export default Admin;
