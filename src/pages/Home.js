import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

//Componen
import ListCard from "../components/ListCard";
import Nav from "../components/Nav";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";

const Home = () => {
    const [state, dispatch] = useContext(UserContext);
    const history = useHistory();
    const [formData, setFormData] = useState({ keyword: "" });

    const { keyword } = formData;

    const handleChange = (e) => {
        setFormData({ [e.target.name]: e.target.value });
    };

    const searching = async (e) => {
        e.preventDefault();
        if (keyword === "") return;
        history.push(`/search/${keyword}`);
    };
    return (
        <div className="main-content row mx-auto" style={{ width: "91%" }}>
            <Nav />
            <div className="body-wrap col-sm-12 p-2">
                <div
                    className="text-center"
                    style={{ position: "relative", top: "200px" }}
                >
                    <div id="logo-wrapper" style={{ marginBottom: "51px" }}>
                        <img
                            id="big-logo"
                            src="./assets/logo/literature-big.png"
                        />
                    </div>
                    <form
                        className="form-inline"
                        onSubmit={(e) => searching(e)}
                    >
                        <div className="form-group " style={{ width: "100%" }}>
                            <div className="mx-auto" style={{ width: "100%" }}>
                                <input
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                    id="search-literature"
                                    className="form-control form-control-lg"
                                    type="text"
                                    name="keyword"
                                    value={keyword}
                                    placeholder="Search for literature"
                                />
                                <button
                                    id="butt"
                                    style={{
                                        backgroundColor: "#AF2E1C",
                                        border: "none",
                                        height: "50px",

                                        borderRadius: "5px",
                                    }}
                                    type="submit"
                                    className="btn btn-lg btn-primary"
                                >
                                    <img
                                        src="./assets/icon/search.png"
                                        className="mx-auto"
                                    />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Home;
