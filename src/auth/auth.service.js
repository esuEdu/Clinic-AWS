import crypto from "node:crypto";
import dotenv from "dotenv";
dotenv.config();

// Import AWS Cognito SDK
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  ConfirmSignUpCommand,
  ResendConfirmationCodeCommand,
} from "@aws-sdk/client-cognito-identity-provider";

async function login(event) {
  const { username, password } = event.body;
  const client = new CognitoIdentityProviderClient({ region: "us-east-1" });

  const params = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: process.env.COGNITO_CLIENT_ID,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };

  try {
    const data = await client.initiateAuth(params);
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

export default {
  login,
  signup,
  confirmSignup,
  resendCode,
};
