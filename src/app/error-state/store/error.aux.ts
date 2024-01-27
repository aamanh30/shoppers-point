import { HttpStatusCode } from '@angular/common/http';

const errorCodes = [
  HttpStatusCode.NotFound,
  HttpStatusCode.Forbidden,
  HttpStatusCode.InternalServerError
];

export const toErrorStatus = (path: string): HttpStatusCode => {
  const errorCode = path.split('/').pop();
  return isNaN(Number(errorCode)) || !errorCodes.includes(Number(errorCode))
    ? HttpStatusCode.NotFound
    : Number(errorCode);
};
