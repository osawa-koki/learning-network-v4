import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Layout from "../components/Layout";
import getCIDRRanges from "../util/getCIDRRanges";

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
        <hr />
      </div>
    </Layout>
  );
};
