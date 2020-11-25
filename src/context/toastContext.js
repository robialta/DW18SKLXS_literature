import { Form } from "formik";
import React, { createContext, useContext, useReducer } from "react";

export const ToastContext = createContext();

const initialState = {
    show: false,
    message: "",
};

const reducer = (state, action) => {
    // state = { show: true, message: "" };
    if (!action.show) return { show: false, message: "" };

    return { show: true, message: action.message };
};

export const ToastContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <ToastContext.Provider value={[state, dispatch]}>
            {props.children}
        </ToastContext.Provider>
    );
};

export const showToast = (show, hide) => {
    show();
    setTimeout(() => {
        hide();
    }, 3500);
};
