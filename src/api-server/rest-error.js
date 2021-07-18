// simple-node-mvc-starter-project ~~ MIT License
// REST Errors

const restError = {
   badRequest(msg)     { return { error: true, code: 400, status: 'Bad request',           message: msg }; },
   unauthorized(msg)   { return { error: true, code: 401, status: 'Unauthorized',          message: msg }; },
   notFound(msg)       { return { error: true, code: 404, status: 'Resource not found',    message: msg }; },
   teapot(msg)         { return { error: true, code: 418, status: 'I am a teapot',         message: msg }; },
   serverError(msg)    { return { error: true, code: 500, status: 'Internal server error', message: msg }; },
   notImplemented(msg) { return { error: true, code: 501, status: 'Not Implemented',       message: msg }; },
   };

export { restError };
