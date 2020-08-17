import { CognitoUserPool } from "amazon-cognito-identity-js";
import React from "react";
import { Helmet } from "react-helmet";
import { Route, Switch, Redirect } from "react-router-dom";

import styled from "styled-components";

const Wrapper = styled.main`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const userPool = new CognitoUserPool({
  UserPoolId: process.env.COGNITO_USER_POOL_ID,
  ClientId: process.env.COGNITO_CLIENT_ID,
});

export const Root = (): JSX.Element => {
  return (
    <>
      <Helmet>
        <link rel="icon" href="/favicon.ico" />
      </Helmet>

      <Wrapper>
        <Content>
          <Switch></Switch>
        </Content>
      </Wrapper>
    </>
  );
};
