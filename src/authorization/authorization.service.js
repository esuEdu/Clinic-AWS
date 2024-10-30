import { ApiGatewayV2 } from "@aws-sdk/client-apigatewayv2";
import dotenv from "dotenv";
dotenv.config();

async function apiKeyAuthorization(event) {
  const { identitySource } = event;

  const isAuthorized = identitySource.some(
    (apiKey) => apiKey === process.env.API_KEY
  );

  if (isAuthorized) {
    return { status: "success", message: "Authentication successful" };
  } else {
    throw { status: "error", message: "Authentication failed" };
  }
}

export default {
  apiKeyAuthorization,
};
