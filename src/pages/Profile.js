import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import ListCard from "../components/ListCard";

import GenderIcon from "../static/icon/gender2.png";
import EmailIcon from "../static/icon/email2.png";
import PhoneIcon from "../static/icon/phone2.png";
import LocalIcon from "../static/icon/local.png";
import Nav from "../components/Nav";
import { ToastContext, showToast } from "../context/toastContext";

const Profile = () => {
    const [state, dispatch] = useContext(UserContext);
    const [toast, createToast] = useContext(ToastContext);
    const [myLiteratures, setMyLiteratures] = useState([]);
    const [pendingLiteratures, setPendingLiteratures] = useState([]);
    const [uploadStatus, setUploadStatus] = useState("");
    const [uploaded, setUploaded] = useState("");
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);

    const changePhoto = async (e) => {
        if (e.target.files[0]) {
            try {
                setUploading(true);
                const config = {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                };

                const formData = new FormData();
                formData.append("photo", e.target.files[0]);

                const res = await API.post(
                    `/uploadprofile/${state.user.id}`,
                    formData,
                    config
                );
                setUploadStatus("uploaded");
                setUploaded(res.data.data);
                setUploading(false);
            } catch (err) {
                setUploading(false);
                showToast(
                    () => createToast({ show: true, message: "SERVER ERROR" }),
                    () => createToast({ show: false })
                );
            }
        }
    };

    const updateProfile = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const body = JSON.stringify({ profile: uploaded });
            await API.patch(`/updateprofile/${state.user.id}`, body, config);
            dispatch({
                type: "USER_LOADED",
                payload: { ...state.user, profile: uploaded },
            });
            setUploadStatus("");
            setUploaded("");
            setSaving(false);
            showToast(
                () =>
                    createToast({
                        show: true,
                        message: "Your new photo has been saved",
                    }),
                () => createToast({ show: false })
            );
        } catch (err) {
            setSaving(false);
            showToast(
                () => createToast({ show: true, message: "SERVER ERROR" }),
                () => createToast({ show: false })
            );
        }
    };

    useEffect(() => {
        const loadMyLiteratures = async () => {
            try {
                setLoading(true);
                const res = await API.get(`/myliteratures/${state.user.id}`);
                setMyLiteratures(
                    res.data.data.filter(
                        (literature) => literature.status === "Aproved"
                    )
                );
                setPendingLiteratures(
                    res.data.data.filter(
                        (literature) => !(literature.status === "Aproved")
                    )
                );
                setLoading(false);
            } catch (error) {
                setLoading(false);
                showToast(
                    () => createToast({ show: true, message: "SERVER ERROR" }),
                    () => createToast({ show: false })
                );
            }
        };
        loadMyLiteratures();
    }, []);
    return (
        <div className="main-content row mx-auto" style={{ width: "91%" }}>
            <Nav />
            <div className="body-wrap col-sm-12 px-4">
                <div className="col-md-12 px-0" style={{ background: "" }}>
                    <div className="row py-4">
                        <div className="col-md-12">
                            <span
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
                                Profile
                            </span>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-md-12">
                            <div
                                className="card"
                                style={{
                                    minHeight: "300px",
                                    background: "#252525",
                                    width: "100%",
                                    border: "none",
                                }}
                            >
                                <div className="row m-3 mt-5 mr-4">
                                    <div
                                        className="col-xl-9"
                                        style={{ background: "" }}
                                    >
                                        <ul className="list-group" style={{}}>
                                            <li
                                                className="list-group-item"
                                                style={{
                                                    display: "flex",
                                                    backgroundColor: "#252525",
                                                    border: "none",
                                                }}
                                            >
                                                <div
                                                    className="mr-4"
                                                    style={{
                                                        maxWidth: "75px",
                                                        background: "",
                                                    }}
                                                >
                                                    <img
                                                        className=""
                                                        style={{
                                                            position:
                                                                "relative",
                                                            top: "7px",
                                                        }}
                                                        src={EmailIcon}
                                                        alt="usericon"
                                                    />
                                                </div>
                                                <div
                                                    style={{
                                                        maxWidth: "",
                                                        background: "",
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            position:
                                                                "relative",
                                                            top: "",
                                                            fontWeight: 700,
                                                            color: "white",
                                                            fontSize: "18px",
                                                        }}
                                                    >
                                                        {state.user.email}
                                                    </span>{" "}
                                                    <br></br>
                                                    <span
                                                        style={{
                                                            position:
                                                                "relative",
                                                            top: "3px",
                                                            color: "#929292",
                                                            fontWeight: 400,
                                                            fontSize: "12px",
                                                            fontFamily:
                                                                "Google Sans",
                                                        }}
                                                    >
                                                        E-mail
                                                    </span>
                                                </div>
                                            </li>
                                            <li
                                                className="list-group-item"
                                                style={{
                                                    display: "flex",
                                                    backgroundColor: "#252525",
                                                    border: "none",
                                                }}
                                            >
                                                <div
                                                    className="mr-4"
                                                    style={{
                                                        maxWidth: "75px",
                                                        background: "",
                                                    }}
                                                >
                                                    <img
                                                        className=""
                                                        style={{
                                                            position:
                                                                "relative",
                                                            top: "7px",
                                                        }}
                                                        src={GenderIcon}
                                                        alt="usericon"
                                                    />
                                                </div>
                                                <div
                                                    style={{
                                                        maxWidth: "",
                                                        background: "",
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            position:
                                                                "relative",
                                                            top: "",
                                                            fontWeight: 700,
                                                            color: "white",
                                                            fontSize: "18px",
                                                        }}
                                                    >
                                                        {state.user.gender}
                                                    </span>{" "}
                                                    <br></br>
                                                    <span
                                                        style={{
                                                            position:
                                                                "relative",
                                                            top: "3px",
                                                            color: "#929292",
                                                            fontWeight: 400,
                                                            fontSize: "12px",
                                                            fontFamily:
                                                                "Google Sans",
                                                        }}
                                                    >
                                                        Gender
                                                    </span>
                                                </div>
                                            </li>
                                            <li
                                                className="list-group-item"
                                                style={{
                                                    display: "flex",
                                                    backgroundColor: "#252525",
                                                    border: "none",
                                                }}
                                            >
                                                <div
                                                    className="mr-4"
                                                    style={{
                                                        maxWidth: "75px",
                                                        background: "",
                                                    }}
                                                >
                                                    <img
                                                        className=""
                                                        style={{
                                                            position:
                                                                "relative",
                                                            top: "7px",
                                                        }}
                                                        src={PhoneIcon}
                                                        alt="usericon"
                                                    />
                                                </div>
                                                <div
                                                    style={{
                                                        maxWidth: "",
                                                        background: "",
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            position:
                                                                "relative",
                                                            top: "",
                                                            fontWeight: 700,
                                                            color: "white",
                                                            fontSize: "18px",
                                                        }}
                                                    >
                                                        {state.user.phone}
                                                    </span>{" "}
                                                    <br></br>
                                                    <span
                                                        style={{
                                                            position:
                                                                "relative",
                                                            top: "3px",
                                                            color: "#929292",
                                                            fontWeight: 400,
                                                            fontSize: "12px",
                                                            fontFamily:
                                                                "Google Sans",
                                                        }}
                                                    >
                                                        Mobile phone
                                                    </span>
                                                </div>
                                            </li>
                                            <li
                                                className="list-group-item"
                                                style={{
                                                    display: "flex",
                                                    backgroundColor: "#252525",
                                                    border: "none",
                                                }}
                                            >
                                                <div
                                                    className="mr-4"
                                                    style={{
                                                        maxWidth: "75px",
                                                        background: "",
                                                    }}
                                                >
                                                    <img
                                                        className=""
                                                        style={{
                                                            position:
                                                                "relative",
                                                            top: "7px",
                                                        }}
                                                        src={LocalIcon}
                                                        alt="usericon"
                                                    />
                                                </div>
                                                <div
                                                    style={{
                                                        maxWidth: "",
                                                        background: "",
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            position:
                                                                "relative",
                                                            top: "",
                                                            fontWeight: 700,
                                                            color: "white",
                                                            fontSize: "18px",
                                                        }}
                                                    >
                                                        {state.user.address}
                                                    </span>{" "}
                                                    <br></br>
                                                    <span
                                                        style={{
                                                            position:
                                                                "relative",
                                                            top: "3px",
                                                            color: "#929292",
                                                            fontWeight: 400,
                                                            fontSize: "12px",
                                                            fontFamily:
                                                                "Google Sans",
                                                        }}
                                                    >
                                                        Address
                                                    </span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div
                                        className="col-xl-3 p-0 text-center"
                                        style={{ background: "" }}
                                    >
                                        <div
                                            className=" mx-auto"
                                            id="photo-profile"
                                            style={
                                                uploadStatus === "uploaded"
                                                    ? {
                                                          backgroundImage: `url(https://res.cloudinary.com/robialta/image/upload/${uploaded})`,
                                                      }
                                                    : !state.user.profile
                                                    ? {
                                                          backgroundImage: `url(https://res.cloudinary.com/robialta/image/upload/literature/photos/default_sr0fpp.png)`,
                                                      }
                                                    : {
                                                          backgroundImage: `url(https://res.cloudinary.com/robialta/image/upload/${state.user.profile})`,
                                                      }
                                            }
                                        ></div>
                                        {uploadStatus === "uploaded" ? (
                                            <div
                                                className="text-center"
                                                style={{ width: "100%" }}
                                            >
                                                <button
                                                    disabled={saving}
                                                    onClick={(e) =>
                                                        updateProfile(e)
                                                    }
                                                    className="btn dark btn-md btn-success text-light my-3"
                                                    style={{
                                                        height: "50px",
                                                        width: "100px",
                                                        marginRight: "5px",
                                                    }}
                                                >
                                                    {saving
                                                        ? "Saving..."
                                                        : "Save"}
                                                </button>
                                                <button
                                                    disabled={saving}
                                                    onClick={() =>
                                                        setUploadStatus("")
                                                    }
                                                    className="btn dark btn-md btn-danger  text-light my-3"
                                                    style={{
                                                        height: "50px",
                                                        width: "100px",
                                                        marginLeft: "5px",
                                                    }}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ) : (
                                            <div>
                                                <button
                                                    disabled={uploading}
                                                    className="btn dark btn-md  text-light my-3"
                                                    style={{
                                                        width: "227px",
                                                        background: "#af2e1c",
                                                        height: "50px",
                                                    }}
                                                >
                                                    <label
                                                        className="m-0"
                                                        htmlFor="profil"
                                                        style={{
                                                            cursor: "pointer",
                                                            width: "100%",
                                                        }}
                                                    >
                                                        {uploading
                                                            ? "Processing..."
                                                            : "Change Photo Profil"}
                                                    </label>
                                                </button>
                                            </div>
                                        )}

                                        <input
                                            hidden
                                            type="file"
                                            id="profil"
                                            onChange={(e) => changePhoto(e)}
                                            accept="image/x-png,image/jpeg"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row py-4">
                        <div className="col-md-12">
                            <span
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
                                My Literatures
                            </span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 px-0">
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
                            ) : myLiteratures.length > 0 ? (
                                <ListCard
                                    literatures={myLiteratures}
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
                                    You don't have literatures yet!
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="row py-4">
                        <div className="col-md-12">
                            <span
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
                                Pending Literatures
                            </span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 px-0">
                            {loading ? (
                                <div
                                    style={{
                                        maxWidth: "500px",
                                        minWidth: "200px",
                                    }}
                                    className="mx-auto text-center mb-3"
                                >
                                    Loading...
                                </div>
                            ) : pendingLiteratures.length > 0 ? (
                                <ListCard
                                    literatures={pendingLiteratures}
                                    maxCol="5"
                                />
                            ) : (
                                <div
                                    style={{
                                        maxWidth: "500px",
                                        minWidth: "200px",
                                    }}
                                    className="mx-auto text-center mb-3"
                                >
                                    You don't have pending literatures yet!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
