import { CognitoUser } from "@aws-amplify/auth";
import { Amplify } from "@aws-amplify/core";
import {
  AuthState as AuthStateType,
  onAuthUIStateChange,
} from "@aws-amplify/ui-components";
import React, { createContext, useEffect, useState } from "react";

Amplify.configure({
  Auth: {
    region: process.env.COGNITO_REGION,
    userPoolId: process.env.COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.COGNITO_CLIENT_ID,
    oauth: {
      domain: ".auth.ap-northeast-1.amazoncognito.com",
      scope: ["email", "openid"],
      redirectSignIn: "",
      redirectSignOut: "",
      responseType: "code",
    },
  },
});

type AuthState = {
  authState: AuthStateType | undefined;
  user: CognitoUser | null;
};

const initialState: AuthState = {
  authState: undefined,
  user: null,
};

export const AuthContext = createContext<AuthState>(initialState);

type AuthContextProviderProps = { children: React.ReactNode };

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}: AuthContextProviderProps) => {
  const [authState, setAuthState] = useState<AuthState["authState"]>();
  const [user, setUser] = useState<AuthState["user"]>(null);

  useEffect(
    () =>
      onAuthUIStateChange((nextAuthState, authData) => {
        setAuthState(nextAuthState);
        setUser(authData as AuthState["user"]);
      }),
    []
  );

  const value: AuthState = { authState, user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
