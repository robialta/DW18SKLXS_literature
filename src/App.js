import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { API, setAuthToken } from "./config/api";
import { UserContext } from "./context/userContext";
import { ToastContext } from "./context/toastContext";
import "./App.css";

//Import components
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import PrivateRoute from "./components/PrivateRoute";
import AddLiterature from "./pages/AddLiterature";
import Detail from "./pages/Detail";
import MyCollection from "./pages/MyCollection";
import Admin from "./pages/Admin";
import Toast from "./components/Toast";
import Loader from "./components/Loader";

if (localStorage.token) setAuthToken(localStorage.token);

function App() {
    const [state, dispatch] = useContext(UserContext);
    const [toasState, toastDispatch] = useContext(ToastContext);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const res = await API.get("/auth");
                dispatch({
                    type: "USER_LOADED",
                    payload: res.data.data,
                });
            } catch (error) {
                dispatch({
                    type: "AUTH_ERROR",
                });
            }
        };
        loadUser();
    }, []);
    return (
        <Router>
            <Switch>
                <Route exact path={"/"} component={Landing} />
                <PrivateRoute exact path={"/home"} component={Home} />
                <PrivateRoute exact path={"/profile"} component={Profile} />
                <PrivateRoute
                    exact
                    path={"/mycollection"}
                    component={MyCollection}
                />
                <PrivateRoute exact path={"/detail/:id"} component={Detail} />
                <PrivateRoute
                    exact
                    path={"/addliterature"}
                    component={AddLiterature}
                />
                <PrivateRoute
                    exact
                    path={"/search/:title"}
                    component={Search}
                />
                <PrivateRoute exact path={"/admin"} component={Admin} />
            </Switch>
            {toasState.show ? <Toast message={toasState.message} /> : null}
            {state.loading ? <Loader /> : null}
        </Router>
    );
}

export default App;
