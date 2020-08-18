declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    COGNITO_REGION: string;
    COGNITO_USER_POOL_ID: string;
    COGNITO_CLIENT_ID: string;
  }
}
