// simple-node-mvc-starter-project ~~ MIT License
// REST Error

export type RestError = {
   error:   boolean,
   code:    number,
   status:  string,
   message: string,
   };

const note = 'Error encountered.';

const restError = {
   badRequest(msg?: string): RestError     { return { error: true, code: 400, status: 'Bad request',           message: msg ?? note }; },
   unauthorized(msg?: string): RestError   { return { error: true, code: 401, status: 'Unauthorized',          message: msg ?? note }; },
   notFound(msg?: string): RestError       { return { error: true, code: 404, status: 'Resource not found',    message: msg ?? note }; },
   teapot(msg?: string): RestError         { return { error: true, code: 418, status: 'I am a teapot',         message: msg ?? note }; },
   serverError(msg?: string): RestError    { return { error: true, code: 500, status: 'Internal server error', message: msg ?? note }; },
   notImplemented(msg?: string): RestError { return { error: true, code: 501, status: 'Not Implemented',       message: msg ?? note }; },
   };

export { restError };
