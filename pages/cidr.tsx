import { Button, Form } from 'react-bootstrap';
import Layout from "../components/Layout";

export default function HelloWorld() {
  return (
    <Layout>
      <div id="CIDR" className="mt-3">
        <h1>CIDRからIPアドレスの範囲を算出します。</h1>
        <div className='d-flex align-items-center'>
          <Form.Control type="text" placeholder='10.0.0.0' className='ip' />
          <div className='px-3'>/</div>
          <Form.Control type="number" placeholder='24' className='prefix' />
        </div>
        <hr />
      </div>
    </Layout>
  );
};
