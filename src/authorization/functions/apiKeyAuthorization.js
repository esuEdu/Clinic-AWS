import authService from "../authorization.service.js";

const apiKeyAuthorization = async (event) => {
  try {
    await authService.apiKeyAuthorization(event); // Assume this validates API key

    // Generate an IAM policy for the user
    return generatePolicy("user", "Allow", event.routeArn); // Allow access if valid
  } catch (error) {
    return generatePolicy("user", "Deny", event.routeArn); // Deny access if invalid
  }
};

// Helper function to generate IAM policy for the authorizer
const generatePolicy = (principalId, effect, resource) => {
  return {
    principalId,
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: effect,
          Resource: resource,
        },
      ],
    },
  };
};

export const handler = apiKeyAuthorization;