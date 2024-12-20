import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import httpHeaderNormalizer from "@middy/http-header-normalizer";
import httpContentNegotiation from "@middy/http-content-negotiation";
import httpResponseSerializer from "@middy/http-response-serializer";
import httpSecurityHeaders from "@middy/http-security-headers";
import authService from "../auth.service.js";

const resendCode = async (event) => {
  try {
    const data = await authService.resendCode(event);
    const response = {
      statusCode: 200,
      body: {
        message: "Verification code resent successfully",
        data,
      },
    };
    return response;
  } catch (error) {
    const response = {
      statusCode: 400,
      body: {
        message: "Failed to resend verification code",
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
  .handler(resendCode);
