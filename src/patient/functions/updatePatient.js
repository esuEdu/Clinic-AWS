import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import httpHeaderNormalizer from "@middy/http-header-normalizer";
import httpContentNegotiation from "@middy/http-content-negotiation";
import httpResponseSerializer from "@middy/http-response-serializer";
import patientService from "../patient.service.js";

const update = async (event) => {
  try {
    const data = await patientService.updatePatient(event.body);
    return {
      statusCode: 200,
      body: data,
    };
  } catch (error) {
    return {
      statusCode: 400,
      body: {
        message: "Error updating patient",
        error: error.message,
      },
    };
  }
};

export const handler = middy()
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
  .handler(update);
