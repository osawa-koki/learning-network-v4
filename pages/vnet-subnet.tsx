import React, { useState } from "react";

import { Alert, Button, Form, OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
import { BsFillBellFill } from "react-icons/bs";
import Layout from "../components/Layout";

import getIpDetails from '../util/getIpDetails';
import isValidIPv4 from '../util/isValidIPv4';
import isValidPrefix from '../util/isValidPrefix';
import subnetIsInVNet from '../util/subnetIsInVNet';
import collisionChecker from '../util/collisionChecker';
import { SubnetStruct } from '../util/collisionChecker';

const subnet_ids = 'ABCDE'.split('');

export default function VNetSubnetPage() {

  const [vnet_ip, setVNetIP] = useState<string>('10.0.0.0');
  const [vnet_prefix, setVNetPrefix] = useState<string>('16');
  const [subnets, setSubnets] = useState<{id: string, ip: string, prefix: string}[]>([
    {id: 'A', ip: '10.0.1.0', prefix: '24'},
    {id: 'B', ip: '10.0.2.0', prefix: '24'},
  ]);

  const PutSubnet = (id: string, e: any, type: 'vnet' | 'subnet') => {
    const value = e.target.value;
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
    if (window.confirm('削除しますか？') === false) return;
    const index = subnets.findIndex((s) => s.id === id);
    if (index < 0) return;
    subnets.splice(index, 1);
    // IDを振り直す
    subnets.forEach((s, i) => {
      s.id = subnet_ids[i];
    });
    setSubnets([...subnets]);
  };

  // 戻り値は要素
  const ValidationCheck = (subnet_ip: string, subnet_prefix: string, vnet_ip, vnet_prefix, other_subnets: {id: string, ip: string, prefix: string}[]) => {
    let error: string | null = null;
    // サブネットIPが妥当か判断
    if (isValidIPv4(subnet_ip) === false) {
      error = 'IPアドレスの形式が不正です。';
    }
    // サブネットプレフィックスが妥当か判断
    if (isValidPrefix(subnet_prefix) === false) {
      error = 'プレフィックスの値が不正です。';
    }
    // サブネットが仮想ネットワークに含まれているか判断
    if (subnetIsInVNet(subnet_ip, subnet_prefix, vnet_ip, vnet_prefix) === false) {
      error = 'サブネットが仮想ネットワークに含まれていません。';
    }
    // サブネットが他のサブネットと重複していないか判断
    const collisioning_ids = collisionChecker(
      {id: null, ip: subnet_ip, prefix: subnet_prefix} as SubnetStruct,
      other_subnets,
    );
    if (collisioning_ids.length !== 0) {
      error = `サブネットが他のサブネットと重複しています。(${collisioning_ids.map(id => `'#${id}'`).join(', ')})`;
    }

    if (error !== null) {
      return (
        <OverlayTrigger overlay={<Tooltip>{error}</Tooltip>}>
          <div><BsFillBellFill className="d-block m-auto text-danger" /></div>
        </OverlayTrigger>
      );
    }
    return <div></div>;
  }

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
        {
          (isValidIPv4(vnet_ip) === false || isValidPrefix(vnet_prefix) === false) ? (
            <Alert variant='danger' className='mt-3'>
              <ul>
                {isValidIPv4(vnet_ip) === false && <li>IPアドレスが不正です。</li>}
                {isValidPrefix(vnet_prefix) === false && <li>プレフィックスが不正です。</li>}
              </ul>
            </Alert>
          ) : (
            vnet_ip !== getIpDetails(vnet_ip, parseInt(vnet_prefix)).networkAddress && (
              <Alert variant="info" className="mt-3">
                これは、'{getIpDetails(vnet_ip, parseInt(vnet_prefix)).networkAddress}/{vnet_prefix}'と同じ範囲を表しています。<br />代わりに、'{getIpDetails(vnet_ip, parseInt(vnet_prefix)).networkAddress}/{vnet_prefix}'を使用することをお勧めします。
                <hr />
                <Button variant='info' onClick={() => setVNetIP(getIpDetails(vnet_ip, parseInt(vnet_prefix)).networkAddress)} size="sm">Set to {getIpDetails(vnet_ip, parseInt(vnet_prefix)).networkAddress}</Button>
              </Alert>
            )
          )
        }
        <hr />
        <Table striped bordered hover size="sm" id="Subnet" className="mt-3">
          <thead className="text-center">
            <tr>
              <th>#</th>
              <th>subnet</th>
              <th>error</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {subnets.map((subnet, _) => (
              <tr key={subnet.id}>
                <th><div className="d-flex justify-content-center align-items-center">{subnet.id}</div></th>
                <td className="d-flex justify-content-center align-items-center">
                  <Form.Control type="text" value={subnet.ip} onInput={(e) => {PutSubnet(subnet.id, e, 'vnet')}} className='ip' />
                  <div className='px-3'>/</div>
                  <Form.Control type="number" value={subnet.prefix} onInput={(e) => {PutSubnet(subnet.id, e, 'subnet')}} className='prefix' />
                </td>
                <td>
                  { ValidationCheck(subnet.ip, subnet.prefix, vnet_ip, vnet_prefix, subnets.filter((s) => s.id !== subnet.id)) }
                </td>
                <td>
                  <Button variant="secondary" size="sm" onClick={Delete(subnet.id)}>削除</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="primary" onClick={Add} disabled={subnet_ids.length === subnets.length}>Add</Button>
        {
          subnets.filter(subnet => subnet.ip !== getIpDetails(subnet.ip, parseInt(subnet.prefix)).networkAddress).map(subnet => (
            isValidIPv4(subnet.ip) && isValidPrefix(subnet.prefix) &&
            <Alert variant="info" className="mt-3">
              '#{subnet.id}'は、'{getIpDetails(subnet.ip, parseInt(subnet.prefix)).networkAddress}/{subnet.prefix}'と同じ範囲を表しています。<br />代わりに、'{getIpDetails(subnet.ip, parseInt(subnet.prefix)).networkAddress}/{subnet.prefix}'を使用することをお勧めします。
              <hr />
              <Button variant='info' onClick={() => {
                PutSubnet(subnet.id, { target: { value: getIpDetails(subnet.ip, parseInt(subnet.prefix)).networkAddress } }, 'vnet')
              }} size="sm">Set to {getIpDetails(subnet.ip, parseInt(subnet.prefix)).networkAddress}</Button>
            </Alert>
          ))
        }
      </div>
    </Layout>
  );
};
