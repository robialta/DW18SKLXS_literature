import React from "react";
import { useHistory } from "react-router-dom";

export const Card = (props) => {
    const route = useHistory();
    const goToDetail = () => {
        route.push(`/detail/${props.literature.id}`);
    };
    return (
        <div className="col mb-4 ">
            <div
                className="card p-3"
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
                    src={`https://res.cloudinary.com/robialta/image/upload/v1606405407/${props.literature.file}.png`}
                    style={{
                        width: "200px",

                        height: "270px",
                        backgroundColor: "white",
                        borderRadius: "10px",
                    }}
                    alt="literature"
                />
                <div className="card-body px-0 py-2">
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
                    className="card-footer bg-transparent p-0"
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
