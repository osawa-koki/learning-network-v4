
type Props = {
  cidr: string,
  broadcast_address: string,
  network_address: string,
  first_address: string,
  last_address: string,
};

export default function CIDR({cidr, broadcast_address, network_address, first_address, last_address}: Props) {
  return (
    <>
    <div dangerouslySetInnerHTML={{__html: `<svg width="600" height="400" version="1.1" viewBox="0 0 600 400" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><text x="76.597466" y="93.277977" fill="#006dff" font-family="'UD Digi Kyokasho NK-B'" font-size="42.667px" opacity=".59554" stroke-width=".3" text-align="center" text-anchor="middle" xml:space="preserve"><tspan x="76.597466" y="93.277977">CIDR</tspan></text><path d="m66.278 262.47h448.1" fill="none" stroke="#00f" stroke-width=".91255"/><g fill="#0000ff" font-family="Consolas" text-anchor="middle"><text x="283.41064" y="146.89621" font-size="21.333px" text-align="center" style="font-variant-caps:normal;font-variant-east-asian:normal;font-variant-ligatures:normal;font-variant-numeric:normal" xml:space="preserve"><tspan x="283.41064" y="146.89621">${cidr}</tspan></text><text x="70.107574" y="328.53476" font-size="10.667px" text-align="center" style="font-variant-caps:normal;font-variant-east-asian:normal;font-variant-ligatures:normal;font-variant-numeric:normal" xml:space="preserve"><tspan x="70.107574" y="328.53476">(ネットワークアドレス)</tspan></text><text x="524.49432" y="315.5994" font-size="10.667px" text-align="center" style="font-variant-caps:normal;font-variant-east-asian:normal;font-variant-ligatures:normal;font-variant-numeric:normal" xml:space="preserve"><tspan x="524.49432" y="315.5994">(ブロードキャストアドレス)</tspan></text><g font-size="13.333px"><text x="65.620605" y="291.59009" text-align="center" style="font-variant-caps:normal;font-variant-east-asian:normal;font-variant-ligatures:normal;font-variant-numeric:normal" xml:space="preserve"><tspan x="65.620605" y="291.59009">${network_address}</tspan></text><text x="114.10603" y="243.46431" text-align="center" style="font-variant-caps:normal;font-variant-east-asian:normal;font-variant-ligatures:normal;font-variant-numeric:normal" xml:space="preserve"><tspan x="114.10603" y="243.46431">${first_address}</tspan></text><text x="520.87408" y="294.9552" text-align="center" style="font-variant-caps:normal;font-variant-east-asian:normal;font-variant-ligatures:normal;font-variant-numeric:normal" xml:space="preserve"><tspan x="520.87408" y="294.9552">${broadcast_address}</tspan></text><text x="458.99536" y="244.62592" text-align="center" style="font-variant-caps:normal;font-variant-east-asian:normal;font-variant-ligatures:normal;font-variant-numeric:normal" xml:space="preserve"><tspan x="458.99536" y="244.62592">${last_address}</tspan></text></g></g><circle cx="67.714" cy="261.99" r="10.053" fill="#00f"/><circle cx="517.25" cy="262.95" r="10.053" fill="#00f"/></svg>`}}></div>
    </>
  )
}