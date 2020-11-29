import React, { useContext, useEffect, useState } from "react";
import Nav from "../components/Nav";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import ListCard from "../components/ListCard";
import { ToastContext, showToast } from "../context/toastContext";

const MyCollection = () => {
    const [state, dispatch] = useContext(UserContext); //eslint-disable-line no-unused-vars
    const [toast, createToast] = useContext(ToastContext); //eslint-disable-line no-unused-vars
    const [myCollections, setMyCollections] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadMyCollections = async () => {
            try {
                setLoading(true);
                const res = await API.get(`/mycollections/${state.user.id}`);
                setMyCollections(res.data.data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                showToast(
                    () => createToast({ show: true, message: "SERVER ERROR" }),
                    () => createToast({ show: false })
                );
            }
        };
        loadMyCollections();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className="main-content row mx-auto" style={{ width: "91%" }}>
            <Nav />
            <div className="body-wrap col-sm-12 px-4">
                <div
                    className="col-md-12 px-0"
                    style={{ paddingTop: "34px", paddingBottom: "28px" }}
                >
                    <div
                        style={{
                            fontFamily: "Times New Roman",
                            fontSize: "36px",
                            fontStyle: "normal",
                            fontWeight: 700,
                            lineHeight: "37px",
                            letterSpacing: "0em",
                            textAlign: "left",
                        }}
                    >
                        My Collection
                    </div>
                </div>
                <div className="col-md-12  px-0">
                    <div className="row">
                        <div className="col-sm-12 pt-3 px-0">
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
                            ) : myCollections.length > 0 ? (
                                <ListCard
                                    literatures={myCollections}
                                    maxCol="5"
                                />
                            ) : (
                                <div
                                    style={{
                                        maxWidth: "500px",
                                        minWidth: "200px",
                                    }}
                                    className="mx-auto text-center"
                                >
                                    You don't have collections yet!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyCollection;
