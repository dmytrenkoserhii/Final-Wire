import { ManualPage } from '../components/ManualPage'

export function GlyphSection() {
  return (
    <ManualPage
      chapter="II"
      title="Runic Glyph Sequence"
      subtitle="Press the glyphs in the order written below."
    >
      <p>
        The runic key for this run is <code>Ψ → Δ → Φ</code>. The Operator must select these in
        order.
      </p>

      <h3>Reference table</h3>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Glyph</th>
            <th>Speak it as</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Ψ</td>
            <td>Psi — "the trident"</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Δ</td>
            <td>Delta — "the triangle"</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Φ</td>
            <td>Phi — "the eye"</td>
          </tr>
        </tbody>
      </table>

      <h3>Recovery</h3>
      <ul>
        <li>
          If a wrong glyph is pressed, the sequence resets and stability drops by{' '}
          <strong>10%</strong>.
        </li>
        <li>
          The Operator may press <code>Reset sequence</code> at any time.
        </li>
      </ul>
    </ManualPage>
  )
}
