import React, { useEffect, useState } from "react";

import { Alert, Form, Spinner, Table } from 'react-bootstrap';
import Layout from "../components/Layout";



export default function VNetSubnetPage() {

  const [vnet_ip, setVNetIP] = useState<string>('10.0.0.0');
  const [vnet_prefix, setVNetPrefix] = useState<string>('16');
  const [subnet_ips, setSubnetIPs] = useState<string[]>([]);
  const [subnet_prefixes, setSubnetPrefixes] = useState<string[]>([]);

  return (
    <Layout>
      <div id="VNetSubnet">
        <h1>VNet - Subnet</h1>
        <p className="mt-3">仮想ネットワークとサブネットの論理関係の妥当性を判定します。</p>
        <hr />
        <Form id="VNet" className="mt-3">
          <Form.Group>
            <Form.Label>仮想ネットワーク</Form.Label>
            <div className='d-flex align-items-center'>
              <Form.Control type="text" placeholder='10.0.0.0' value={vnet_ip} onInput={(e) => {setVNetIP((e.target as HTMLInputElement).value)}} className='ip' />
              <div className='px-3'>/</div>
              <Form.Control type="number" placeholder='24' value={vnet_prefix} onInput={(e) => {setVNetPrefix((e.target as HTMLInputElement).value)}} className='prefix' />
            </div>
          </Form.Group>
        </Form>
        <hr />
      </div>
    </Layout>
  );
};
