import React, { useContext, useEffect, useState } from "react";
import Nav from "../components/Nav";
import { useParams } from "react-router-dom";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import Collection from "../static/icon/collection.png";
import Download from "../static/icon/download.png";
import { ToastContext, showToast } from "../context/toastContext";

function Detail() {
    const [state, dispatch] = useContext(UserContext);
    const [toast, createToast] = useContext(ToastContext);
    const [isAdded, setIsAdded] = useState(false);
    const { id } = useParams();
    const idUser = state.user.id;
    const [literature, setLiterature] = useState({});
    console.log(toast);
    const handleAddToCollection = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const body = JSON.stringify({
                userId: idUser,
                literatureId: id,
            });

            await API.post("/addcollection", body, config);

            setIsAdded(true);
            showToast(
                () =>
                    createToast({
                        show: true,
                        message: "Literature added to your library",
                    }),
                () => createToast({ show: false })
            );
        } catch (err) {
            showToast(
                () =>
                    createToast({
                        show: true,
                        message: err.message,
                    }),
                () => createToast({ show: false })
            );
        }
    };

    useEffect(() => {
        const loadDetailLiterature = async () => {
            try {
                const res = await API.get(`/literature/${id}`);

                setLiterature(res.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        // const loadLibraries = async () => {
        //     try {
        //         const id = state.user.id;
        //         setLoading(true);
        //         const res = await API.get(`/literature/${id}`);
        //         setLibraries(
        //             res.data.data.libraries.filter(
        //                 (book) => book.status == "Aproved"
        //             )
        //         );
        //         setLoading(false);
        //     } catch (err) {
        //         setLoading(false);
        //         console.log(err);
        //     }
        // };
        // loadLibraries();
        loadDetailLiterature();
    }, []);

    return (
        <div className="Detail ">
            <div className="row mx-auto" style={{ width: "90%" }}>
                <Nav />

                <div className="col-md-12">
                    <div
                        className="card"
                        style={{
                            backgroundColor: "#161616",
                            minHeight: "339px",
                            width: "100%",
                            border: "none",
                        }}
                    >
                        <div className="row m-3 mt-5 mr-4">
                            <div className="col-xl-3 px-2 pb-3 text-center">
                                <img
                                    src={`../assets/img/detail-literature.png`}
                                    style={{
                                        maxWidth: "400px",
                                        minWidth: "250px",
                                    }}
                                    className="card-img-top "
                                    alt="lb1"
                                />
                            </div>
                            <div
                                className="col-lg-9 pr-0 "
                                style={{ paddingLeft: "46px" }}
                            >
                                <ul className="list-group" style={{}}>
                                    <li
                                        className="list-group-item pt-0 px-0"
                                        style={{
                                            backgroundColor: "#161616",
                                            display: "flex",

                                            border: "none",
                                        }}
                                    >
                                        <div
                                            style={{
                                                maxWidth: "",
                                                background: "",
                                                float: "left",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    fontFamily:
                                                        "Times New Roman",
                                                    fontWeight: 700,
                                                    color: "white",
                                                    fontSize: "36px",
                                                    lineHeight: "43px",
                                                }}
                                            >
                                                {literature.title}
                                            </div>{" "}
                                            <br></br>
                                            <div
                                                style={{
                                                    color: "#929292",
                                                    fontWeight: 400,
                                                    fontSize: "24px",
                                                    lineHeight: "24.36px",
                                                    // paddingTop: "30px",
                                                }}
                                            >
                                                {literature.author}
                                            </div>
                                        </div>
                                    </li>
                                    <li
                                        className="list-group-item pb-0 px-0 pt-4"
                                        style={{
                                            display: "flex",
                                            backgroundColor: "#161616",
                                            border: "none",
                                        }}
                                    >
                                        <div
                                            className="mt-1"
                                            style={{
                                                maxWidth: "",
                                                background: "",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    fontWeight: 600,
                                                    fontSize: "24px",
                                                    lineHeight: "24.92px",
                                                }}
                                            >
                                                Publication Date
                                            </div>{" "}
                                            <br></br>
                                            <div
                                                style={{
                                                    color: "#929292",
                                                    fontWeight: 400,
                                                    fontSize: "18px",
                                                    lineHeight: "30px",
                                                }}
                                            >
                                                {literature.publication}
                                            </div>
                                        </div>
                                    </li>

                                    <li
                                        className="list-group-item pb-0 px-0 pt-4"
                                        style={{
                                            display: "flex",
                                            backgroundColor: "#161616",
                                            border: "none",
                                        }}
                                    >
                                        <div
                                            className=""
                                            style={{
                                                maxWidth: "",
                                                background: "",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    fontWeight: 600,
                                                    fontSize: "24px",
                                                    lineHeight: "24.92px",
                                                }}
                                            >
                                                Pages
                                            </div>{" "}
                                            <br></br>
                                            <div
                                                style={{
                                                    color: "#929292",
                                                    fontWeight: 400,
                                                    fontSize: "18px",
                                                    lineHeight: "30px",
                                                }}
                                            >
                                                {literature.pages}
                                            </div>
                                        </div>
                                    </li>
                                    <li
                                        className="list-group-item pb-0 px-0"
                                        style={{
                                            display: "flex",
                                            backgroundColor: "#161616",
                                            border: "none",
                                        }}
                                    >
                                        <div
                                            className=""
                                            style={{
                                                maxWidth: "",
                                                background: "",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    fontWeight: 600,
                                                    fontSize: "24px",
                                                    lineHeight: "24.92px",
                                                    color: "#EE4622",
                                                }}
                                            >
                                                ISBN
                                            </div>{" "}
                                            <br></br>
                                            <div
                                                style={{
                                                    color: "#929292",
                                                    fontWeight: 400,
                                                    fontSize: "18px",
                                                    lineHeight: "30px",
                                                }}
                                            >
                                                {literature.ISBN}
                                            </div>
                                        </div>
                                    </li>
                                </ul>

                                <a
                                    href={`http://localhost:5000/literatures/${literature.file}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download
                                >
                                    <button
                                        className="btn btn-dark mt-4 mr-2"
                                        style={{
                                            backgroundColor: "#AF2E1C",
                                            height: "50px",
                                            borderRadius: "5px",
                                        }}
                                    >
                                        Download
                                        <img
                                            className="ml-3 mt-1"
                                            src={Download}
                                            style={{
                                                float: "right",
                                            }}
                                        />
                                    </button>
                                    <button
                                        disabled={isAdded}
                                        onClick={(e) =>
                                            handleAddToCollection(e)
                                        }
                                        className="btn btn-dark  mt-4 mr-2"
                                        type="button"
                                        style={{
                                            backgroundColor: "#AF2E1C",
                                            height: "50px",
                                            borderRadius: "5px",
                                        }}
                                    >
                                        Add My Collection{" "}
                                        <img
                                            className="ml-3 mt-1"
                                            src={Collection}
                                            style={{
                                                float: "right",
                                            }}
                                        />
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;
