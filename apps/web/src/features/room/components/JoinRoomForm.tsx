import { Stack, TextInput } from '@mantine/core'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import { SciFiButton } from '../../../shared/ui/SciFiButton'
import { useRoom } from '../context/room.context'

const schema = z.object({
  code: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z0-9]{6,8}$/, 'Code must be 6–8 letters/digits'),
})

type FormValues = z.infer<typeof schema>

export function JoinRoomForm() {
  const { joinRoom } = useRoom()
  const navigate = useNavigate()
  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (values: FormValues) => {
    const room = joinRoom(values.code)
    navigate(`/room/${room.roomCode}`)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap="md">
        <TextInput
          {...register('code')}
          label="Room code"
          placeholder="A7K2QZ"
          size="md"
          autoComplete="off"
          spellCheck={false}
          styles={{
            input: {
              fontFamily: 'var(--fw-font-mono)',
              fontSize: 20,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              textAlign: 'center',
            },
            label: {
              fontFamily: 'var(--fw-font-display)',
              fontSize: 11,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--fw-text-dim)',
              marginBottom: 8,
            },
          }}
          error={formState.errors.code?.message}
        />

        <SciFiButton tone="primary" size="lg" type="submit" fullWidth>
          Connect to Reactor
        </SciFiButton>
      </Stack>
    </form>
  )
}
