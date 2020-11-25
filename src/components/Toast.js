import React, { useEffect, useState } from "react";

const Toast = (props) => {
    const [show, setShow] = useState(props.show);
    const [hide, setHide] = useState(true);
    useEffect(() => {
        setHide(false);
        setInterval(() => {
            setHide(true);
        }, 3000);
    }, [show]);

    return (
        <div id={hide ? "toast-hide" : "toast-show"} className={props.class}>
            {props.message}
        </div>
    );
};

export default Toast;
