import { HttpError } from './api';

export interface Logger {
  /**
   * Logs an error
   * @param error
   */
  error(error: HttpError): void;
}
