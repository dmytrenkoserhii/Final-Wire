import { ManualPage } from '../components/ManualPage'

export function WiresSection() {
  return (
    <ManualPage
      chapter="I"
      title="On the Cooling of Coolant Wires"
      subtitle="Five lines feed the reactor. Only one carries the active loop."
    >
      <p>
        Inspect the panel. Determine which color is present, then proceed in the order below. Do not
        cut more than one wire.
      </p>

      <h3>Procedure — five wires</h3>
      <ol>
        <li>
          If a <strong>Red</strong> wire is present and there is exactly one <strong>Amber</strong>{' '}
          wire — cut the second wire from the top.
        </li>
        <li>
          Otherwise, if there are more <strong>Cyan</strong> wires than <strong>Green</strong> wires
          — cut the last <strong>Cyan</strong> wire.
        </li>
        <li>
          Otherwise, if a <strong>Violet</strong> wire is present — cut the first wire.
        </li>
        <li>
          If none of the above apply — cut the <strong>Cyan</strong> wire. There is always exactly
          one.
        </li>
      </ol>

      <h3>Caution</h3>
      <ul>
        <li>
          Cutting a wrong wire reduces stability by <strong>10%</strong>.
        </li>
        <li>Wires marked with a slash are already cut and may not be used.</li>
      </ul>
    </ManualPage>
  )
}
