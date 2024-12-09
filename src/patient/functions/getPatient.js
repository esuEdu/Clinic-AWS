import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import httpUrlencodePathParametersParserMiddleware from "@middy/http-urlencode-path-parser";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import httpHeaderNormalizer from "@middy/http-header-normalizer";
import httpContentNegotiation from "@middy/http-content-negotiation";
import httpResponseSerializer from "@middy/http-response-serializer";
import httpSecurityHeaders from "@middy/http-security-headers";
import patientService from "../patient.service.js";

const getPatient = async (event) => {
  console.log("Event", event);
  try {
    const data = await patientService.getPatient(event.body);
    return {
      statusCode: 200,
      body: data,
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: {
        message: "Error getting patient",
        error: error.message,
      },
    };
  }
};

export const handler = middy()
  .use(httpSecurityHeaders())
  .use(httpHeaderNormalizer())
  .use(httpContentNegotiation())
  .use(httpUrlencodePathParametersParserMiddleware())
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
  .handler(getPatient);
