import React, { createContext, useReducer } from "react";

export const UserContext = createContext();

const initialState = {
    isLogedIn: false,
    user: null,
    loading: true,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return {
                ...state,
                loading: true,
            };
        case "UNLOADING":
            return {
                ...state,
                loading: false,
            };
        case "USER_LOADED":
            return {
                isLogedIn: true,
                user: action.payload,
                loading: false,
            };

        case "AUTH_ERROR":
        case "LOGIN_FAILED":
            return {
                isLogedIn: false,
                loading: false,
            };
        case "LOGIN_SUCCESS":
            localStorage.setItem("token", action.payload);
            return {
                isLogedIn: true,
                loading: false,
            };
        case "LOGOUT":
            localStorage.removeItem("token");
            return {
                isLogedIn: false,
            };
        default:
            throw new Error();
    }
};

export const UserContextProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <UserContext.Provider value={[state, dispatch]}>
            {props.children}
        </UserContext.Provider>
    );
};
