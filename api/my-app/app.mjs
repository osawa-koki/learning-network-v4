/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const lambdaHandler = async (event, context) => {
  try {
    const ip_address = event.requestContext.identity.sourceIp;
    const request_uri = `http://ip-api.com/json/${ip_address}`;
    let ip_api_result;
    await fetch(request_uri)
      .then(response => response.json())
      .then(data => {
        ip_api_result = data;
      });

    return {
      'statusCode': 200,
      'headers': {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      'body': JSON.stringify({
        'request_uri': request_uri,
        'ip-api': ip_api_result,
      }),
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};
