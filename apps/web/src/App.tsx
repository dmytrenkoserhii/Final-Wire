import './App.css'
import { HealthStatus, SocketEventName } from '@final-wire/shared'

export default function App() {
  return (
    <main className="app">
      <h1>Final Wire</h1>
      <p>Health contract: {HealthStatus.Ok}</p>
      <p>
        WS contracts: {SocketEventName.Ping} / {SocketEventName.Pong}
      </p>
    </main>
  )
}
