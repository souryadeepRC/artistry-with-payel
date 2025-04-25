import { NextResponse } from "next/server";

class APIResponse {
  constructor() {}
  json(responseContent: Object | null, statusCode: number) {
    return NextResponse.json(responseContent, { status: statusCode });
  }
  create(responseContent: Object) {
    return this.json(responseContent, 201);
  }
  ok(responseContent: Object) {
    return this.json(responseContent, 200);
  }
  noContent(responseContent: Object) {
    return this.json(null, 204);
  }
  delete(responseContent: Object) {
    return this.json(responseContent, 200);
  }
  badRequest(responseContent: Object) {
    return this.json(responseContent, 400);
  }
  unauthorized(responseContent: Object) {
    return this.json(responseContent, 401);
  }
  notFound(responseContent: Object) {
    return this.json(responseContent, 404);
  }
  serverError(responseContent: Object) {
    return this.json(responseContent, 500);
  }
}

const apiResponse = new APIResponse();
export default apiResponse;
