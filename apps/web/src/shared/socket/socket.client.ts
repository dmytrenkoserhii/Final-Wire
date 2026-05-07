/**
 * Socket client stub. Replace with `socket.io-client` when wiring real gateway.
 * Logs every emit, exposes a no-op `on`/`off` API.
 */

type Handler = (payload: unknown) => void

class MockSocket {
  private handlers = new Map<string, Set<Handler>>()

  emit(event: string, payload?: unknown) {
    console.info(`[socket] emit:${event}`, payload ?? '')
  }

  on(event: string, handler: Handler) {
    if (!this.handlers.has(event)) this.handlers.set(event, new Set())
    this.handlers.get(event)!.add(handler)
  }

  off(event: string, handler: Handler) {
    this.handlers.get(event)?.delete(handler)
  }

  fakeReceive(event: string, payload: unknown) {
    console.info(`[socket] fake-receive:${event}`, payload)
    this.handlers.get(event)?.forEach((h) => h(payload))
  }
}

export const socketClient = new MockSocket()
