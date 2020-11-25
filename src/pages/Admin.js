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
    if (state.user.type === "basic") history.push("/home");
    console.log(selectedCategory);

    const loadData = async () => {
        try {
            const res = await API.get("/literatures");
            if (selectedCategory == "Aproved") {
                setLiteratures(
                    res.data.data.literatures.filter(
                        (literature) => literature.status === "Aproved"
                    )
                );
            } else if (selectedCategory == "Canceled") {
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
        } catch (err) {
            console.log(err);
        }
    };
    const setCategory = (category) => {
        setSelectedCategory(category);
    };

    const cancelLiterature = async (literature) => {
        try {
            let body = literature;
            body.status = "Canceled";
            await API.patch(`/literature/${literature.id}`, body);
            loadData();
        } catch (error) {
            console.log(error);
        }
    };

    const aproveLiterature = async (literature) => {
        try {
            let body = literature;
            body.status = "Aproved";
            await API.patch(`/literature/${literature.id}`, body);
            loadData();
        } catch (error) {
            console.log(error);
        }
    };
    const deleteLiterature = async (literature) => {
        try {
            let body = literature;
            await API.delete(`/literature/${literature.id}`);
            loadData();
        } catch (error) {
            console.log(error);
        }
    };
    const logout = () => {
        dispatch({
            type: "LOGOUT",
        });
    };

    useEffect(() => {
        loadData();
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
                                <a
                                    classname="dropdown-toggle"
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
                                </a>
                                <div
                                    className="dropdown-menu p-0"
                                    style={{ top: "20px", lineHeight: "60px" }}
                                    aria-labelledby="dropdownMenuLink"
                                >
                                    <a
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
                                        />
                                        Log Out
                                    </a>
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
                                    <div class="dropdown">
                                        <button
                                            class="btn btn-secondary dropdown-toggle"
                                            type="button"
                                            id="dropdownMenuButton"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            {selectedCategory}
                                        </button>
                                        <div
                                            class="dropdown-menu"
                                            aria-labelledby="dropdownMenuButton"
                                        >
                                            <a
                                                onClick={() =>
                                                    setCategory("All")
                                                }
                                                class="dropdown-item"
                                                href="#"
                                            >
                                                All
                                            </a>
                                            <a
                                                onClick={() =>
                                                    setCategory("Waiting")
                                                }
                                                class="dropdown-item"
                                                href="#"
                                            >
                                                Waiting
                                            </a>
                                            <a
                                                onClick={() =>
                                                    setCategory("Aproved")
                                                }
                                                class="dropdown-item"
                                                href="#"
                                            >
                                                Aproved
                                            </a>
                                            <a
                                                onClick={() =>
                                                    setCategory("Canceled")
                                                }
                                                class="dropdown-item"
                                                href="#"
                                            >
                                                Canceled
                                            </a>
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
                                        <a
                                            href={`http://localhost:5000/literatures/${literature.file}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            download
                                        >
                                            <td style={{ color: "#0058DD" }}>
                                                {literature.file}
                                            </td>
                                        </a>
                                        <td
                                            style={
                                                literature.status == "Aproved"
                                                    ? {
                                                          color: "#0ACF83",

                                                          fontWeight: "700",
                                                      }
                                                    : literature.status ==
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
                                                        onClick={() =>
                                                            deleteLiterature(
                                                                literature
                                                            )
                                                        }
                                                        className="btn btn-dark mr-3"
                                                        style={{
                                                            width: "100px",
                                                            backgroundColor:
                                                                "#FF0742",
                                                            border: "none",
                                                            fontWeight: "700",
                                                            color: "#161616",
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            aproveLiterature(
                                                                literature
                                                            )
                                                        }
                                                        className="btn btn-dark ml-2"
                                                        style={{
                                                            width: "100px",

                                                            backgroundColor:
                                                                "#0ACF83",
                                                            border: "none",
                                                            fontWeight: "700",
                                                            color: "#161616",
                                                        }}
                                                    >
                                                        Approve
                                                    </button>
                                                </div>
                                            ) : (
                                                <div>
                                                    <button
                                                        onClick={() =>
                                                            cancelLiterature(
                                                                literature
                                                            )
                                                        }
                                                        className="btn btn-dark mr-3"
                                                        style={{
                                                            width: "100px",
                                                            backgroundColor:
                                                                "#FF0742",
                                                            border: "none",
                                                            fontWeight: "700",
                                                            color: "#161616",
                                                        }}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            aproveLiterature(
                                                                literature
                                                            )
                                                        }
                                                        className="btn btn-dark ml-2"
                                                        style={{
                                                            width: "100px",

                                                            backgroundColor:
                                                                "#0ACF83",
                                                            border: "none",
                                                            fontWeight: "700",
                                                            color: "#161616",
                                                        }}
                                                    >
                                                        Approve
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
