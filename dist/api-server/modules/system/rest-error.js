const makeRestError = (code, status, message) => ({
    ok: false,
    error: true,
    code: code,
    status: status,
    message: message ?? 'Error encountered.',
});
const restError = {
    badRequest(message) { return makeRestError(400, 'Bad request', message); },
    unauthorized(message) { return makeRestError(401, 'Unauthorized', message); },
    notFound(message) { return makeRestError(404, 'Resource not found', message); },
    teapot(message) { return makeRestError(418, 'I am a teapot', message); },
    serverError(message) { return makeRestError(500, 'Internal server error', message); },
    notImplemented(message) { return makeRestError(501, 'Not implemented', message); },
    customError1(message) { return makeRestError(701, 'TBD error #1', message); },
    customError2(message) { return makeRestError(702, 'TBD error #2', message); },
};
export { restError };
