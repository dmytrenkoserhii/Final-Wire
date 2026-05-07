import classes from './Logo.module.css'

interface Props {
  size?: 'sm' | 'md' | 'lg'
  withText?: boolean
}

export function Logo({ size = 'md', withText = true }: Props) {
  return (
    <div className={[classes.root, classes[size]].join(' ')}>
      <svg className={classes.mark} viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" opacity="0.4" />
        <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
        <path
          d="M24 6 L24 18 M24 30 L24 42 M6 24 L18 24 M30 24 L42 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="24" cy="24" r="4" fill="currentColor" />
      </svg>
      {withText && (
        <div className={classes.text}>
          <span className={classes.title}>FINAL WIRE</span>
          <span className={classes.subtitle}>Reactor Control System</span>
        </div>
      )}
    </div>
  )
}
