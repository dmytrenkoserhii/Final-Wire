import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from '../layout/AppLayout'
import { RequireAuth, RedirectIfAuth } from './guards'
import { AuthPage } from '../../pages/auth/AuthPage'
import { HomePage } from '../../pages/home/HomePage'
import { ProfilePage } from '../../pages/profile/ProfilePage'
import { RoomPage } from '../../pages/room/RoomPage'
import { GamePage } from '../../pages/game/GamePage'
import { ResultPage } from '../../pages/result/ResultPage'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />

      <Route element={<RedirectIfAuth />}>
        <Route path="/auth" element={<AuthPage />} />
      </Route>

      <Route element={<RequireAuth />}>
        <Route element={<AppLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/room/:code" element={<RoomPage />} />
          <Route path="/result/:sessionId" element={<ResultPage />} />
        </Route>
        <Route path="/game/:code" element={<GamePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  )
}
