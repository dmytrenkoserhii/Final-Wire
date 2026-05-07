import { Button, type ButtonProps } from '@mantine/core'
import classes from './SciFiButton.module.css'

type Props = ButtonProps & {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  type?: 'button' | 'submit' | 'reset'
  tone?: 'primary' | 'danger' | 'ghost'
}

export function SciFiButton({ tone = 'primary', className, ...rest }: Props) {
  const variant = tone === 'ghost' ? 'default' : 'filled'
  const color = tone === 'danger' ? 'danger' : tone === 'ghost' ? 'gray' : 'cyan'

  return (
    <Button
      variant={variant}
      color={color}
      radius="md"
      {...(rest as ButtonProps)}
      classNames={{
        root: [classes.btn, classes[tone], className].filter(Boolean).join(' '),
        label: classes.label,
      }}
    />
  )
}
