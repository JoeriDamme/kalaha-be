export class AppError extends Error {
  // HTTP status code.
  statusCode: number;

  // Is the error handled by the application.
  isOperational: boolean;

  /**
   * Generate an Error that has been handled by the applcation.
   * @param message The message displayed on the response.
   * @param statusCode The HTTP status code.
   */
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
