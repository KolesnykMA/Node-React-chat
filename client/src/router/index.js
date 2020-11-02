import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import StartPage from "../containers/StartPage";
import LoginPage from '../containers/LoginPage';
import RegistrationPage from '../containers/RegistrationPage';
import NotFound from '../containers/NotFound';

import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';

import { loadCurrentUser, logout } from '../store/profile/actions';


const Routing = ({user, isAuthorized, loadCurrentUser: loadUser, isLoading }) => {
    useEffect(() => {

        if (!isAuthorized) {
            loadUser();
        }
    }, []);

    return (
        isLoading
            ? <> loading </>
            : (
                <div className="fill">
                    {isAuthorized && (
                        <header>
                            {user._id}
                        </header>
                    )}
                    <main className="fill">
                        <Switch>
                            <PublicRoute exact path="/login" component={LoginPage} />
                            <PublicRoute exact path="/registration" component={RegistrationPage} />
                            <PrivateRoute exact path="/" component={StartPage} />
                            {/* <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute path="/share/:postHash" component={SharedPost} /> */}
                            <Route path="*" exact component={NotFound} />
                        </Switch>
                    </main>
                    {/* <Notifications applyPost={newPost} user={user} /> */}
                </div>
            )
    );
};

const actions = {
    loadCurrentUser,
    //  logout, applyPost
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