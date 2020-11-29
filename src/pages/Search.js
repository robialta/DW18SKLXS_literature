import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListCard from "../components/ListCard";
import Nav from "../components/Nav";
import { API } from "../config/api";
import { showToast, ToastContext } from "../context/toastContext";
import { UserContext } from "../context/userContext";

const Search = () => {
    const [toast, createToast] = useContext(ToastContext); //eslint-disable-line no-unused-vars
    const [state, dispatch] = useContext(UserContext); //eslint-disable-line no-unused-vars
    const [literatures, setLiteratures] = useState([]);
    const { title } = useParams();
    const [formData, setFormData] = useState({ keyword: title });
    const [years, setYears] = useState([]);
    const [loading, setLoading] = useState(false);

    const { keyword } = formData;
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const searchLiterature = async (e) => {
        e.preventDefault();
        const public_year = !e.target.name ? " " : e.target.value;

        if (!keyword) return;
        try {
            setLoading(true);
            const res = await API.get(
                `/search?title=${keyword}&public_year=${public_year}`
            );
            setLiteratures(res.data.data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            showToast(
                () => createToast({ show: true, message: "SERVER ERROR" }),
                () => createToast({ show: false })
            );
        }
    };

    const loadData = async () => {
        try {
            setLoading(true);
            const res = await API.get(
                `/search?title=${title}&public_year=${""}`
            );
            setLiteratures(res.data.data);
        } catch (err) {
            showToast(
                () => createToast({ show: true, message: "SERVER ERROR" }),
                () => createToast({ show: false })
            );
        }
        try {
            const res = await API.get("/literatures");
            var availableYears = [];
            res.data.data.literatures.forEach((literature) => {
                availableYears.push(literature.publication.split("-")[0]);
            });
            let generatedYears = [];
            let minYear = availableYears.sort()[0];
            let maxYear = availableYears.sort()[availableYears.length - 1];
            for (let i = minYear; i <= maxYear; i++) {
                generatedYears.push(i);
            }
            setYears(generatedYears);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            showToast(
                () => createToast({ show: true, message: "SERVER ERROR" }),
                () => createToast({ show: false })
            );
        }
    };

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div>
            <div className="main-content row mx-auto" style={{ width: "91%" }}>
                <Nav />

                <div className="body-wrap col-sm-12 ">
                    <div
                        className="col-sm-12 m-0"
                        style={{ padding: "32px 10px" }}
                    >
                        <form
                            className="form-inline"
                            onSubmit={(e) => searchLiterature(e)}
                        >
                            <div
                                className="form-group "
                                style={{ width: "100%" }}
                            >
                                <input
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                    id="search-literature2"
                                    className="form-control form-control-lg"
                                    type="text"
                                    name="keyword"
                                    value={keyword}
                                    placeholder="Search for literatur"
                                />
                                <button
                                    id="butt2"
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
                                        src="../assets/icon/search.png"
                                        className="mx-auto"
                                        alt="search"
                                    />
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="col-sm-12 ">
                        <div className="row m-0" style={{ width: "100%" }}>
                            <div className="col-xs-3 pt-3">
                                <p style={{ color: "#AF2E1C" }}>Anytime</p>
                                <div className="form-group mb-2 text-left">
                                    <select
                                        onChange={(e) => searchLiterature(e)}
                                        id="filter-literature"
                                        name="year"
                                        defaultValue="DEFAULT"
                                        className="form-control form-control-sm bg-dark"
                                        style={{
                                            width: "160px",
                                            height: "34px",
                                            borderRadius: "5px",
                                            fontSize: "15px",
                                        }}
                                    >
                                        <option
                                            style={{
                                                color: "black",
                                            }}
                                            value=" "
                                        >
                                            All Time
                                        </option>
                                        {years.map((year, index) => (
                                            <option
                                                key={index}
                                                style={{
                                                    color: "black",
                                                }}
                                                value={year}
                                            >
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="col mx-auto pt-3">
                                {loading ? (
                                    <div
                                        style={{
                                            marginTop: "200px",
                                            maxWidth: "500px",
                                            minWidth: "200px",
                                        }}
                                        className="mx-auto text-center"
                                    >
                                        Searching...
                                    </div>
                                ) : literatures.length > 0 ? (
                                    <ListCard
                                        literatures={literatures}
                                        maxCol="4"
                                    />
                                ) : (
                                    <div
                                        style={{
                                            marginTop: "200px",
                                            maxWidth: "500px",
                                            minWidth: "200px",
                                        }}
                                        className="mx-auto text-center"
                                    >
                                        Not Found
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
