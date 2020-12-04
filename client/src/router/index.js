import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// import StartPage from "../containers/StartPage";
import LoginPage from "../containers/LoginPage";
import RegistrationPage from "../containers/RegistrationPage";
import NotFound from "../containers/NotFound";
import ChatCreatePage from "../containers/Chat/ChatCreatePage"
import StreamHomePage from "../containers/StreamHomePage";

import Header from "../components/Header";

import PrivateRoute from "./privateRoute";
import PublicRoute from "./publicRoute";

import { loadCurrentUser, logoutCurrentUser } from "../containers/Profile/actions";


const Routing = (
    {
        user,
        isAuthorized,
        loadCurrentUser: loadUser,
        isLoading,
        logoutCurrentUser: logOutUser
    }) => {

    useEffect(() => {
        if (!isAuthorized) {
            loadUser();
        }
    }, []);

    return (
        isLoading
            ?
                <div className="loading">
                    loading
                </div>
            : (
                <div className="fill">
                  {isAuthorized && (
                    <header>
                        <Header user={user} logout={logOutUser} />
                    </header>
                  )}
                  <main className="fill">
                    <Switch>
                      <PublicRoute exact path="/login" component={LoginPage} />
                      <PublicRoute exact path="/registration" component={RegistrationPage} />

                      <PrivateRoute exact path="/" component={StreamHomePage} />
                      <PrivateRoute exact path="/create-chat" component={ChatCreatePage} />

                      <Route path="*" exact component={NotFound} />
                    </Switch>
                  </main>
                </div>
              )
    );
};

const actions = {
    loadCurrentUser,
    logoutCurrentUser
};

const mapStateToProps = ({ profile }) => ({
    isAuthorized: profile.isAuthorized,
    user: profile.user,
    isLoading: profile.isLoading
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Routing);
