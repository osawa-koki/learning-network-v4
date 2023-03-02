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
    let data;
    await fetch(`http://ip-api.com/json/${ip_address}}`)
      .then(response => response.json())
      .then(data => {
        data = data;
      });

    return {
      'statusCode': 200,
      'body': JSON.stringify(data),
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};
