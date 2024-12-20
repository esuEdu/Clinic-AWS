import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import httpHeaderNormalizer from "@middy/http-header-normalizer";
import httpContentNegotiation from "@middy/http-content-negotiation";
import httpResponseSerializer from "@middy/http-response-serializer";
import httpSecurityHeaders from "@middy/http-security-headers";
import authService from "../auth.service.js";

const confirmForgotPassword = async (event) => {
  try {
    const data = await authService.confirmForgotPassword(event);
    const response = {
      statusCode: 200,
      body: {
        message: "Password reset successfully",
        data,
      },
    };
    return response;
  } catch (error) {
    const response = {
      statusCode: 400,
      body: {
        message: "Failed to reset password",
        error: error.message,
      },
    };
    return response;
  }
};

export const handler = middy()
  .use(httpSecurityHeaders())
  .use(httpHeaderNormalizer())
  .use(httpContentNegotiation())
  .use(
    httpResponseSerializer({
      serializers: [
        {
          regex: /^application\/xml$/,
          serializer: ({ body }) => `<message>${body}</message>`,
        },
        {
          regex: /^application\/json$/,
          serializer: ({ body }) => JSON.stringify(body),
        },
        {
          regex: /^text\/plain$/,
          serializer: ({ body }) => body,
        },
      ],
      defaultContentType: "application/json",
    })
  )
  .use(httpErrorHandler())
  .use(httpJsonBodyParser({ disableContentTypeError: true }))
  .handler(confirmForgotPassword);
