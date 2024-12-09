import crypto from "node:crypto";
import dotenv from "dotenv";
dotenv.config();

// Import AWS Cognito SDK
import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  SignUpCommand,
  ConfirmSignUpCommand,
  ResendConfirmationCodeCommand,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
} from "@aws-sdk/client-cognito-identity-provider";

async function login(event) {
  const { email, password } = event.body;
  const client = new CognitoIdentityProviderClient({ region: "us-east-1" });

  const params = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: process.env.COGNITO_CLIENT_ID,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  };

  try {
    const command = new InitiateAuthCommand(params);
    const data = await client.send(command);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function signup(event) {
  const { password, email } = event.body;
  const id = crypto.randomUUID();

  const client = new CognitoIdentityProviderClient({ region: "us-east-1" });

  const params = {
    ClientId: process.env.COGNITO_CLIENT_ID,
    Password: password,
    Username: email,
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
    ],
  };

  try {
    const command = new SignUpCommand(params);
    const data = await client.send(command);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function confirmSignup(event) {
  const { email, code } = event.body;
  const client = new CognitoIdentityProviderClient({ region: "us-east-1" });

  const params = {
    ClientId: process.env.COGNITO_CLIENT_ID,
    ConfirmationCode: code,
    Username: email,
  };

  try {
    const command = new ConfirmSignUpCommand(params);
    const data = await client.send(command);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function resendCode(event) {
  const { email } = event.body;
  const client = new CognitoIdentityProviderClient({ region: "us-east-1" });

  const params = {
    ClientId: process.env.COGNITO_CLIENT_ID,
    Username: email,
  };

  try {
    const command = new ResendConfirmationCodeCommand(params);
    const data = await client.send(command);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function forgotPassword(event) {
  const { email } = event.body;
  const client = new CognitoIdentityProviderClient({ region: "us-east-1" });

  const params = {
    ClientId: process.env.COGNITO_CLIENT_ID,
    Username: email,
  };

  try {
    const command = new ForgotPasswordCommand(params);
    const data = await client.send(command);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function confirmForgotPassword(event) {
  const { email, code, password } = event.body;
  const client = new CognitoIdentityProviderClient({ region: "us-east-1" });

  const params = {
    ClientId: process.env.COGNITO_CLIENT_ID,
    ConfirmationCode: code,
    Password: password,
    Username: email,
  };

  try {
    const command = new ConfirmForgotPasswordCommand(params);
    const data = await client.send(command);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function authorizer(payload) {
  const client = new CognitoIdentityProviderClient({ region: "us-east-1" });

  const params = {
    AccessToken: payload.authorizationToken,
  };

  try {
    const data = await client.send(new GetUserCommand(params));
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default {
  login,
  signup,
  confirmSignup,
  resendCode,
  forgotPassword,
  confirmForgotPassword,
  authorizer,
};
