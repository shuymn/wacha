import React from "react";
import { Helmet } from "react-helmet";
import { Route, Switch, Redirect } from "react-router-dom";
import { PrivateRoute } from "../../components/private-route";
import { AuthContextProvider } from "../../contexts/auth";
import { Dashboard } from "../dashboard";
import { renderNotFound } from "../not-found";
import { SignIn } from "../sign-in";

export const Root: React.FC = () => {
  return (
    <>
      <Helmet>
        <link rel="icon" href="/favicon.ico" />
      </Helmet>

      <AuthContextProvider>
        <Switch>
          <Redirect exact from="/" to="/dashboard" />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <Route exact path="/signin" component={SignIn} />
          <Route render={renderNotFound} />
        </Switch>
      </AuthContextProvider>
    </>
  );
};
