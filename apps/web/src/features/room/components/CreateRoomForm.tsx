import { Group, NumberInput, SegmentedControl, Stack, Text } from '@mantine/core'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import type { Difficulty } from '../../../shared/types/game.types'
import { SciFiButton } from '../../../shared/ui/SciFiButton'
import { useRoom } from '../context/room.context'

const schema = z.object({
  difficulty: z.enum(['EASY', 'NORMAL', 'HARD']),
  maxPlayers: z.number().int().min(2).max(4),
})

type FormValues = z.infer<typeof schema>

export function CreateRoomForm() {
  const { createRoom } = useRoom()
  const navigate = useNavigate()

  const { handleSubmit, control, setValue, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { difficulty: 'NORMAL', maxPlayers: 4 },
  })

  const difficulty = useWatch({ control, name: 'difficulty' })
  const maxPlayers = useWatch({ control, name: 'maxPlayers' })

  const onSubmit = (values: FormValues) => {
    const room = createRoom({
      difficulty: values.difficulty as Difficulty,
      maxPlayers: values.maxPlayers,
    })
    navigate(`/room/${room.roomCode}`)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap="md">
        <Stack gap={8}>
          <Text ff="var(--fw-font-display)" fz={11} lts="0.16em" tt="uppercase" c="var(--fw-text-dim)">
            Difficulty
          </Text>
          <SegmentedControl
            fullWidth
            value={difficulty}
            onChange={(v) => setValue('difficulty', v as FormValues['difficulty'])}
            data={[
              { label: 'Easy · 8m', value: 'EASY' },
              { label: 'Normal · 6m', value: 'NORMAL' },
              { label: 'Hard · 4m', value: 'HARD' },
            ]}
          />
        </Stack>

        <Stack gap={8}>
          <Text ff="var(--fw-font-display)" fz={11} lts="0.16em" tt="uppercase" c="var(--fw-text-dim)">
            Max players
          </Text>
          <Group gap="xs">
            {[2, 3, 4].map((n) => (
              <SciFiButton
                key={n}
                tone={maxPlayers === n ? 'primary' : 'ghost'}
                onClick={() => setValue('maxPlayers', n)}
                flex={1}
              >
                {n}
              </SciFiButton>
            ))}
          </Group>
          <NumberInput value={maxPlayers} display="none" readOnly />
        </Stack>

        <SciFiButton
          tone="primary"
          size="lg"
          type="submit"
          fullWidth
          loading={formState.isSubmitting}
        >
          Initiate Reactor
        </SciFiButton>
      </Stack>
    </form>
  )
}
