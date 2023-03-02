import React, { useEffect, useState } from "react";

import { Alert, Button, Form, Spinner, Table } from 'react-bootstrap';
import Layout from "../components/Layout";

const subnet_ids = 'ABCDE'.split('');

export default function VNetSubnetPage() {

  const [vnet_ip, setVNetIP] = useState<string>('10.0.0.0');
  const [vnet_prefix, setVNetPrefix] = useState<string>('16');
  const [subnets, setSubnets] = useState<{id: string, ip: string, prefix: string}[]>([
    {id: 'A', ip: '10.0.1.0', prefix: '24'},
    {id: 'B', ip: '10.0.2.0', prefix: '24'},
  ]);

  const PutSubnet = (id: string, e: any, type: 'vnet' | 'subnet') => {
    const value = (e.target as HTMLInputElement).value;
    const subnet = subnets.find((s) => s.id === id);
    if (subnet) {
      if (type === 'vnet') {
        subnet.ip = value;
      }
      if (type === 'subnet') {
        subnet.prefix = value;
      }
      setSubnets([...subnets]);
    }
  };

  const Add = () => {
    const id = subnet_ids.find((id) => !subnets.find((s) => s.id === id));
    if (id) {
      subnets.push({id, ip: '', prefix: ''});
      setSubnets([...subnets]);
    }
  };

  const Delete = (id: string) => () => {
    const index = subnets.findIndex((s) => s.id === id);
    if (index < 0) return;
    subnets.splice(index, 1);
    // IDを振り直す
    subnets.forEach((s, i) => {
      s.id = subnet_ids[i];
    });
    setSubnets([...subnets]);
  };

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
        <Table striped bordered hover size="sm" className="mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>サブネットIP</th>
              <th>サブネットプレフィックス</th>
              <th>エラー</th>
              <th>削除</th>
            </tr>
          </thead>
          <tbody>
            {subnets.map((subnet, _) => (
              <tr key={subnet.id}>
                <td>{subnet.id}</td>
                <td>
                  <Form.Control type="text" value={subnet.ip} onInput={(e) => {PutSubnet(subnet.id, e, 'vnet')}} className='ip' />
                </td>
                <td>
                  <Form.Control type="number" value={subnet.prefix} onInput={(e) => {PutSubnet(subnet.id, e, 'subnet')}} className='prefix' />
                </td>
                <td>
                  エラー
                </td>
                <td>
                  <Button variant="danger" onClick={Delete(subnet.id)}>削除</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="primary" onClick={Add} disabled={subnet_ids.length === subnets.length}>Add</Button>
      </div>
    </Layout>
  );
};
