import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../context/userContext";
import Loader from "./Loader";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [state] = useContext(UserContext);

    return (
        <Route
            {...rest}
            render={(props) =>
                state.loading ? (
                    <Loader />
                ) : state.isLogedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" />
                )
            }
        />
    );
};

export default PrivateRoute;
