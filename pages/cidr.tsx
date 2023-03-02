import { useState } from 'react';
import { Alert, Button, Form, Table } from 'react-bootstrap';
import Layout from "../components/Layout";
import CIDR from "../components/CIDR";
import getIpDetails from "../util/getIpDetails";
import isValidIPv4 from "../util/isValidIPv4";
import isValidPrefix from "../util/isValidPrefix";
import getIPAddressBits from "../util/getIPAddressBits";
import getSubnetMask from "../util/getSubnetMask";

export default function CIDRPage() {

  const [ip, setIP] = useState<string>('10.0.0.0');
  const [prefix, setPrefix] = useState<string>('24');

  return (
    <Layout>
      <div id="CIDR" className="mt-3">
        <h1>CIDRからIPアドレスの範囲を算出します。</h1>
        <div className='d-flex align-items-center'>
          <Form.Control type="text" placeholder='10.0.0.0' value={ip} onInput={(e) => {setIP((e.target as HTMLInputElement).value)}} className='ip' />
          <div className='px-3'>/</div>
          <Form.Control type="number" placeholder='24' value={prefix} onInput={(e) => {setPrefix((e.target as HTMLInputElement).value)}} className='prefix' />
        </div>
        {
          (isValidIPv4(ip) === false || isValidPrefix(prefix) === false) ? (
            <Alert variant='danger' className='mt-3'>
              <ul>
                {
                  isValidIPv4(ip) === false && (
                    <li>IPアドレスが不正です。</li>
                  )
                }
                {
                  isValidPrefix(prefix) === false && (
                    <li>プレフィックスが不正です。</li>
                  )
                }
              </ul>
            </Alert>
          ) : (
            <>
              <Alert variant='info' className='mt-3'>
                '{ip}/{prefix}'はCIDR表記として有効です。
                {
                  ip !== getIpDetails(ip, parseInt(prefix)).networkAddress && (
                    <>
                      <hr />
                      これは、'{getIpDetails(ip, parseInt(prefix)).networkAddress}/{prefix}'と同じ範囲を表しています。<br />代わりに、'{getIpDetails(ip, parseInt(prefix)).networkAddress}/{prefix}'を使用することをお勧めします。
                      <hr />
                      <Button variant='info' onClick={() => setIP(getIpDetails(ip, parseInt(prefix)).networkAddress)} size="sm">Set to {getIpDetails(ip, parseInt(prefix)).networkAddress}</Button>
                    </>
                  )
                }
              </Alert>
              <hr />
              <Table striped bordered hover className='mt-3'>
                <tbody>
                  <tr>
                    <th>CIDR</th>
                    <td>{ip}/{prefix}</td>
                  </tr>
                  <tr>
                    <th>IPアドレス</th>
                    <td>{ip}</td>
                  </tr>
                  <tr>
                    <th>IPアドレス(ビット表記)</th>
                    <td>{getIPAddressBits(ip)}</td>
                  </tr>
                  <tr>
                    <th>プレフィックス</th>
                    <td>{prefix}</td>
                  </tr>
                  <tr>
                    <th>サブネットマスク</th>
                    <td>{getSubnetMask(parseInt(prefix))}</td>
                  </tr>
                  <tr>
                    <th>サブネットマスク(ビット表記)</th>
                    <td>{getIPAddressBits(getSubnetMask(parseInt(prefix)))}</td>
                  </tr>
                  <tr>
                    <th>ネットワークアドレス</th>
                    <td>{getIpDetails(ip, parseInt(prefix)).networkAddress}</td>
                  </tr>
                  <tr>
                    <th>ブロードキャストアドレス</th>
                    <td>{getIpDetails(ip, parseInt(prefix)).broadcastAddress}</td>
                  </tr>
                  <tr>
                    <th>IPアドレス範囲(FROM)</th>
                    <td>{getIpDetails(ip, parseInt(prefix)).ipAddressStart}</td>
                  </tr>
                  <tr>
                    <th>IPアドレス範囲(END)</th>
                    <td>{getIpDetails(ip, parseInt(prefix)).ipAddressEnd}</td>
                  </tr>
                  <tr>
                    <th>アドレスサイズ</th>
                    <td>{2 ** (32 - parseInt(prefix)) - 2} (2 ^ <sup>(32 - {prefix})</sup> - 2)</td>
                  </tr>
                </tbody>
              </Table>
              <CIDR cidr={`${ip}/${prefix}`} network_address={getIpDetails(ip, parseInt(prefix)).networkAddress} broadcast_address={getIpDetails(ip, parseInt(prefix)).broadcastAddress} first_address={getIpDetails(ip, parseInt(prefix)).ipAddressStart} last_address={getIpDetails(ip, parseInt(prefix)).ipAddressEnd} />
            </>
          )
        }
      </div>
    </Layout>
  );
};
