import { HttpStatusCode } from '@angular/common/http';

export class CustomError extends Error {
  get status() {
    return this.#status;
  }
  set status(status: HttpStatusCode | undefined) {
    if (!status) {
      return;
    }
    this.#status = status;
  }
  #status: HttpStatusCode | undefined;
  constructor(status?: HttpStatusCode, message?: string) {
    super(message);

    this.status = status;
  }
}
