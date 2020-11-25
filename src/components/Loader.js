import React from "react";
import Loading from "../static/logo/loading.gif";

const Loader = () => {
    return (
        <div
            id="loader"
            style={{
                position: "absolute",
                top: "0",
                left: "0",
                bottom: "0",
                right: 0,
                backgroundColor: "#161616e8",
                textAlign: "center",
            }}
        >
            <img
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
                src={Loading}
            />
        </div>
    );
};

export default Loader;
