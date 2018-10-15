import { HttpError } from '../api';
import { Logger } from '../logger';

/**
 * Logger for testing purposes, just logs the last error
 */
export class FakeLogger implements Logger {
  private _lastError: HttpError = null;
  get lastError(): HttpError {
    return this._lastError;
  }
  error(error: HttpError): void {
    this._lastError = error;
  }
  clearErrorLog(): void {
    this._lastError = null;
  }
}
