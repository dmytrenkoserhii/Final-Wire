import { ManualPage } from '../components/ManualPage'

export function KeypadSection() {
  return (
    <ManualPage
      chapter="IV"
      title="Override Keypad"
      subtitle="A four-digit override unlocks the reactor stabilizer."
    >
      <p>
        The override code for this run is <code>4 8 1 5</code>. Read each digit one at a time.
        Confirm each press before continuing.
      </p>

      <h3>Etiquette</h3>
      <ul>
        <li>
          Use the words <strong>"four"</strong>, <strong>"eight"</strong>, etc. Avoid "for" / "ate"
          homonyms.
        </li>
        <li>
          If the Operator mistypes, instruct them to press <code>←</code> or <code>C</code> to
          clear.
        </li>
      </ul>

      <h3>Failure</h3>
      <ul>
        <li>
          Submitting the wrong code costs <strong>−10% stability</strong> and clears the display.
        </li>
      </ul>
    </ManualPage>
  )
}
