import { ManualPage } from '../components/ManualPage'

export function PressureSection() {
  return (
    <ManualPage
      chapter="III"
      title="Pressure Switch Configuration"
      subtitle="Five switches. Each must be set precisely before committing."
    >
      <p>
        Read the configuration table to the Operator. The Operator commits the configuration once.
      </p>

      <h3>Required configuration</h3>
      <table>
        <thead>
          <tr>
            <th>Switch</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>α</td>
            <td>OPEN</td>
          </tr>
          <tr>
            <td>β</td>
            <td>SHUT</td>
          </tr>
          <tr>
            <td>γ</td>
            <td>OPEN</td>
          </tr>
          <tr>
            <td>δ</td>
            <td>OPEN</td>
          </tr>
          <tr>
            <td>ε</td>
            <td>SHUT</td>
          </tr>
        </tbody>
      </table>

      <h3>Commit policy</h3>
      <ul>
        <li>
          Operator may flip switches freely until <code>Commit configuration</code> is pressed.
        </li>
        <li>
          Incorrect commit triggers a <strong>−10% stability</strong> penalty.
        </li>
      </ul>
    </ManualPage>
  )
}
