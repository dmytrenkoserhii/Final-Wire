import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mantine/core'
import { StatusHeader } from '../../features/game/components/StatusHeader'
import { OperatorView } from './OperatorView'
import { ExpertView } from './ExpertView'
import { useGame } from '../../features/game/context/game.context'
import classes from './GamePage.module.css'

export function GamePage() {
  const { game } = useGame()
  const navigate = useNavigate()

  useEffect(() => {
    if (game.status === 'WON' || game.status === 'LOST') {
      const query = game.status === 'LOST' ? '?result=loss' : ''
      const id = setTimeout(() => navigate(`/result/${game.sessionId}${query}`), 1200)
      return () => clearTimeout(id)
    }
  }, [game.status, game.sessionId, navigate])

  return (
    <Box component="section" className={classes.shell}>
      <StatusHeader />
      <Box component="main" className={classes.body}>
        {game.role === 'OPERATOR' ? <OperatorView /> : <ExpertView />}
      </Box>
    </Box>
  )
}
