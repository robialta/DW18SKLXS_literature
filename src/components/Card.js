import React from "react";
import { useHistory } from "react-router-dom";
import Cover from "../static/img/literature-cover.png";

export const Card = (props) => {
    const route = useHistory();
    const goToDetail = () => {
        route.push(`/detail/${props.literature.id}`);
    };
    return (
        <div class="col mb-4 ">
            <div
                className="p-3"
                class="card "
                style={{
                    border: "none",
                    width: "200px",
                    backgroundColor: "#161616",
                    borderRadius: "10px",
                    cursor: "pointer",
                }}
                onClick={
                    props.literature.status === "Aproved"
                        ? () => {
                              goToDetail();
                          }
                        : null
                }
            >
                <img
                    src={Cover}
                    style={{
                        width: "200px",

                        height: "270px",
                        backgroundColor: "white",
                        borderRadius: "10px",
                    }}
                />
                <div class="card-body px-0 py-2">
                    <div
                        style={{
                            fontFamily: "Times New Roman",
                            fontWeight: "400",
                            fontSize: "24px",
                            lineHeight: "28px",
                        }}
                    >
                        {props.literature.title}
                    </div>
                </div>
                <div
                    class="card-footer bg-transparent p-0"
                    style={{
                        color: "#929292",
                        border: "none",
                    }}
                >
                    <span style={{ float: "left" }}>
                        {props.literature.author}
                    </span>

                    <span style={{ float: "right" }}>
                        {props.literature.publication.split("-")[0]}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Card;
