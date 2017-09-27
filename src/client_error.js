/* @flow */

export default class ClientError extends Error {
  request: Request;
  response: Response;
  body: Object;

  constructor(request: Request, response: Response, body: Object) {
    super(response.statusText);
    this.request = request;
    this.response = response;
    this.body = body;
  }
}
