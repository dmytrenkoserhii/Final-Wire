import { createTheme, type CSSVariablesResolver, type MantineColorsTuple } from '@mantine/core'

const cyan: MantineColorsTuple = [
  '#e6fbff',
  '#ccf3fc',
  '#99e5f7',
  '#66d6f1',
  '#33c8eb',
  '#00bae6',
  '#00a3cc',
  '#0088aa',
  '#00e5ff',
  '#003a47',
]

const navy: MantineColorsTuple = [
  '#eef1fa',
  '#d4dbeb',
  '#a8b3d2',
  '#7889b6',
  '#54669d',
  '#3d5191',
  '#33478c',
  '#283b7c',
  '#21346f',
  '#152352',
]

const danger: MantineColorsTuple = [
  '#ffe5ea',
  '#ffb8c2',
  '#ff8a99',
  '#ff5c70',
  '#ff2e47',
  '#ff1744',
  '#e60030',
  '#b40026',
  '#82001b',
  '#510010',
]

export const theme = createTheme({
  fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
  fontFamilyMonospace: '"Share Tech Mono", ui-monospace, Consolas, monospace',
  headings: {
    fontFamily: 'Orbitron, Inter, sans-serif',
    fontWeight: '700',
  },
  primaryColor: 'cyan',
  primaryShade: { light: 6, dark: 8 },
  colors: {
    cyan,
    navy,
    danger,
  },
  defaultRadius: 'md',
  cursorType: 'pointer',
})

export const cssVariablesResolver: CSSVariablesResolver = () => ({
  variables: {
    '--fw-font-display': 'Orbitron, Inter, sans-serif',
    '--fw-font-mono': '"Share Tech Mono", ui-monospace, Consolas, monospace',
  },
  light: {
    '--fw-bg': '#f4f6fb',
    '--fw-bg-elevated': '#ffffff',
    '--fw-bg-panel': '#eef1f8',
    '--fw-bg-panel-strong': '#e2e7f1',
    '--fw-text': '#1a1f3c',
    '--fw-text-dim': '#5a6480',
    '--fw-border': 'rgba(26, 31, 60, 0.12)',
    '--fw-border-strong': 'rgba(26, 31, 60, 0.25)',
    '--fw-accent': '#0091ad',
    '--fw-accent-glow': 'rgba(0, 145, 173, 0.35)',
    '--fw-warning': '#cc7700',
    '--fw-danger': '#d50027',
    '--fw-success': '#00875a',
    '--fw-grid-line': 'rgba(26, 31, 60, 0.06)',
    '--fw-scanline': 'rgba(0, 145, 173, 0.04)',
    '--fw-panel-shadow':
      '0 1px 0 rgba(255, 255, 255, 0.6) inset, 0 10px 30px rgba(26, 31, 60, 0.08)',
    '--fw-neon-shadow': '0 0 0 1px rgba(0, 145, 173, 0.4)',
    '--fw-paper-bg': '#fbf7ec',
    '--fw-paper-text': '#33291a',
    '--fw-paper-line': 'rgba(120, 90, 50, 0.18)',
  },
  dark: {
    '--fw-bg': '#080c17',
    '--fw-bg-elevated': '#0d1322',
    '--fw-bg-panel': '#111a2e',
    '--fw-bg-panel-strong': '#162038',
    '--fw-text': '#dbe4f5',
    '--fw-text-dim': '#7a8aa8',
    '--fw-border': 'rgba(0, 229, 255, 0.18)',
    '--fw-border-strong': 'rgba(0, 229, 255, 0.45)',
    '--fw-accent': '#00e5ff',
    '--fw-accent-glow': 'rgba(0, 229, 255, 0.55)',
    '--fw-warning': '#ffb300',
    '--fw-danger': '#ff1744',
    '--fw-success': '#00e676',
    '--fw-grid-line': 'rgba(0, 229, 255, 0.06)',
    '--fw-scanline': 'rgba(0, 229, 255, 0.025)',
    '--fw-panel-shadow':
      '0 1px 0 rgba(0, 229, 255, 0.08) inset, 0 0 0 1px rgba(0, 229, 255, 0.08), 0 20px 40px rgba(0, 0, 0, 0.5)',
    '--fw-neon-shadow': '0 0 0 1px rgba(0, 229, 255, 0.5), 0 0 20px rgba(0, 229, 255, 0.35)',
    '--fw-paper-bg': '#1a1505',
    '--fw-paper-text': '#e6d8b0',
    '--fw-paper-line': 'rgba(230, 216, 176, 0.16)',
  },
})
