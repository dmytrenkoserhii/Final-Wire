import { BrowserRouter } from 'react-router-dom'
import { AppProviders } from './app/providers'
import { AppRouter } from './app/router'
import { DevToolbar } from './dev/DevToolbar'

export default function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <AppRouter />
        {import.meta.env.DEV && <DevToolbar />}
      </BrowserRouter>
    </AppProviders>
  )
}
