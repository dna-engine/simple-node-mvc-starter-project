// simple-node-mvc-starter-project ~~ MIT License
// REST Error

// Types
export type RestError = {
   ok:      boolean,
   error:   boolean,
   code:    number,
   status:  string,
   message: string,
   };

const makeRestError = (code: number, status: string, message?: string): RestError => ({
   ok:      false,
   error:   true,
   code:    code,
   status:  status,
   message: message ?? 'Error encountered.',
   });

const restError = {
   badRequest(message?: string)     { return makeRestError(400, 'Bad request',           message); },
   unauthorized(message?: string)   { return makeRestError(401, 'Unauthorized',          message); },
   notFound(message?: string)       { return makeRestError(404, 'Resource not found',    message); },
   teapot(message?: string)         { return makeRestError(418, 'I am a teapot',         message); },
   serverError(message?: string)    { return makeRestError(500, 'Internal server error', message); },
   notImplemented(message?: string) { return makeRestError(501, 'Not implemented',       message); },
   customError1(message?: string)   { return makeRestError(701, 'TBD error #1',          message); },
   customError2(message?: string)   { return makeRestError(702, 'TBD error #2',          message); },
   };

export { restError };
