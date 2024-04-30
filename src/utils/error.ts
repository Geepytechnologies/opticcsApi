export class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ANCCompletionError extends CustomError {
  constructor(message: string) {
    super(message);
  }
}
