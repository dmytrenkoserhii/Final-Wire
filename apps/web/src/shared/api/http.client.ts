/**
 * HTTP client stub. Replace with `ky` when wiring real API.
 * All methods log to console and resolve with mock data.
 */

const BASE_URL = '/api/v1'

const log = (method: string, path: string, body?: unknown) => {
  console.info(`[http] ${method} ${BASE_URL}${path}`, body ?? '')
}

export const httpClient = {
  get: <T>(path: string, mock: T): Promise<T> => {
    log('GET', path)
    return Promise.resolve(mock)
  },
  post: <T>(path: string, body: unknown, mock: T): Promise<T> => {
    log('POST', path, body)
    return Promise.resolve(mock)
  },
}
