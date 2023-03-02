import { useState } from 'react';
import { Alert, Form, Table } from 'react-bootstrap';
import Layout from "../components/Layout";
import getCIDRRanges from "../util/getIpDetails";
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
                    <td>{getCIDRRanges(ip, parseInt(prefix)).networkAddress}</td>
                  </tr>
                  <tr>
                    <th>ブロードキャストアドレス</th>
                    <td>{getCIDRRanges(ip, parseInt(prefix)).broadcastAddress}</td>
                  </tr>
                  <tr>
                    <th>IPアドレス範囲(FROM)</th>
                    <td>{getCIDRRanges(ip, parseInt(prefix)).ipAddressStart}</td>
                  </tr>
                  <tr>
                    <th>IPアドレス範囲(END)</th>
                    <td>{getCIDRRanges(ip, parseInt(prefix)).ipAddressEnd}</td>
                  </tr>
                </tbody>
              </Table>
            </>
          )
        }
      </div>
    </Layout>
  );
};
