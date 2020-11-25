import React from "react";
import Card from "../components/Card";

function ListCard(props) {
    console.log(props);
    return (
        <div
            class={`row row-cols-1 row-cols-xs-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-${props.maxCol} m-0 p-0 text-left`}
            style={{ width: "100%" }}
        >
            {props.literatures.map((literature, index) => (
                <Card
                    key={index}
                    literature={literature}
                    userId={literature.user.id}
                />
            ))}
        </div>
    );
}

export default ListCard;
