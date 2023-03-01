import { useState } from 'react';
import { Alert, Form } from 'react-bootstrap';
import Layout from "../components/Layout";
import getCIDRRanges from "../util/getCIDRRanges";
import isValidIPv4 from "../util/isValidIPv4";
import isValidPrefix from "../util/isValidPrefix";

export default function CIDRPage() {

  const [ip, setIP] = useState<string>('');
  const [prefix, setPrefix] = useState<string>('');

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
            <Alert variant='success' className='mt-3'>
              '{ip}/{prefix}'はCIDR表記として有効です。
            </Alert>
          )
        }
        <hr />
      </div>
    </Layout>
  );
};
