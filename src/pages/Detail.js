import React, { useContext, useEffect, useState } from "react";
import Nav from "../components/Nav";
import { useParams } from "react-router-dom";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import Collection from "../static/icon/collection.png";
import Download from "../static/icon/download.png";
import { ToastContext, showToast } from "../context/toastContext";

const Detail = () => {
    const [state, dispatch] = useContext(UserContext); // eslint-disable-line no-unused-vars
    const [toast, createToast] = useContext(ToastContext); // eslint-disable-line no-unused-vars
    const [literature, setLiterature] = useState({});
    const [collections, setCollections] = useState([]);
    const [loading, setLoading] = useState(false);
    const [addingToCollection, setAddingToCollection] = useState(false);
    const [removingCollection, setRemovingCollection] = useState(false);

    const { id } = useParams();
    const idUser = state.user.id;

    const loadCollections = async () => {
        try {
            const res = await API.get(
                `/mycollection?userId=${idUser}&literatureId=${id}`
            );
            setCollections(res.data.data);
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

    const handleAddToCollection = async () => {
        try {
            setAddingToCollection(true);
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
            loadCollections();
            setAddingToCollection(false);
            showToast(
                () =>
                    createToast({
                        show: true,
                        message: "Literature added to my collections",
                    }),
                () => createToast({ show: false })
            );
        } catch (err) {
            setAddingToCollection(false);
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

    const handleRemoveCollection = async (idCollection) => {
        try {
            setRemovingCollection(true);
            await API.delete(`/removecollection/${idCollection}`);
            loadCollections();
            setRemovingCollection(false);
            showToast(
                () =>
                    createToast({
                        show: true,
                        message: "Literature removed from my collections",
                    }),
                () => createToast({ show: false })
            );
        } catch (err) {
            setRemovingCollection(false);
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
                setLoading(true);
                const res = await API.get(`/literature/${id}`);
                setLiterature(res.data.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                showToast(
                    () =>
                        createToast({
                            show: true,
                            message: error.message,
                        }),
                    () => createToast({ show: false })
                );
            }
        };

        loadCollections();
        loadDetailLiterature();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                        {loading ? (
                            <div
                                style={{
                                    maxWidth: "500px",
                                    minWidth: "200px",
                                }}
                                className="mx-auto text-center"
                            >
                                Loading...
                            </div>
                        ) : (
                            <div className="row m-3 mt-5 mr-4">
                                <div className="col-xl-3 px-2 pb-3 text-center">
                                    {literature.file ? (
                                        <img
                                            src={`https://res.cloudinary.com/robialta/image/upload/${literature.file}.png`}
                                            style={{
                                                maxWidth: "400px",
                                                minWidth: "250px",
                                                borderRadius: "7px",
                                            }}
                                            className="card-img-top "
                                            alt="lb1"
                                        />
                                    ) : (
                                        "Loading..."
                                    )}
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
                                        href={`https://res.cloudinary.com/robialta/image/upload/${literature.file}.pdf`}
                                        rel="noopener noreferrer"
                                        download
                                    >
                                        <button
                                            disabled={
                                                removingCollection ||
                                                addingToCollection
                                            }
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
                                                alt="Download"
                                            />
                                        </button>
                                    </a>
                                    {collections.length > 0 ? (
                                        <button
                                            disabled={removingCollection}
                                            onClick={() =>
                                                handleRemoveCollection(
                                                    collections[0].collection.id
                                                )
                                            }
                                            className="btn btn-dark  mt-4 mr-2"
                                            type="button"
                                            style={{
                                                backgroundColor: "#AF2E1C",
                                                height: "50px",
                                                borderRadius: "5px",
                                            }}
                                        >
                                            {removingCollection
                                                ? "Removing..."
                                                : "Remove From Collections"}
                                            <img
                                                className="ml-3 mt-1"
                                                src={Collection}
                                                style={{
                                                    float: "right",
                                                }}
                                                alt="Collection"
                                            />
                                        </button>
                                    ) : (
                                        <button
                                            disabled={addingToCollection}
                                            onClick={() =>
                                                handleAddToCollection()
                                            }
                                            className="btn btn-dark  mt-4 mr-2"
                                            type="button"
                                            style={{
                                                backgroundColor: "#AF2E1C",
                                                height: "50px",
                                                borderRadius: "5px",
                                            }}
                                        >
                                            {addingToCollection
                                                ? "Adding..."
                                                : "Add My Collections"}
                                            <img
                                                className="ml-3 mt-1"
                                                src={Collection}
                                                style={{
                                                    float: "right",
                                                }}
                                                alt="Collection"
                                            />
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;
