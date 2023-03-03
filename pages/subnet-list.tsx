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
import getNextSubnetIp from "../util/getNextSubnetIp";
import getSubnetMask from "../util/getSubnetMask";
import getIPAddressBits from "../util/getIPAddressBits";

// 1..32の配列を作成
const prefixes = Array.from(Array(32), (_, i) => i + 1);

export default function SubnetListPage() {

  return (
    <Layout>
      <div id="SubnetList">
        <h1>サブネットリスト</h1>
        <Table bordered hover className="mt-5">
          <thead>
            <tr className="text-center">
              <th>プレフィックス</th>
              <th>サブネットマスク</th>
              <th>サブネットマスク(2進数)</th>
              <th>アドレスサイズ</th>
            </tr>
          </thead>
          <tbody>
            {
              prefixes.map((prefix) => {
                const subet = getSubnetMask(prefix);
                return (
                  <tr key={prefix}>
                    <th className="text-center">/ {prefix}</th>
                    <td>{subet}</td>
                    <td>{getIPAddressBits(subet)}</td>
                    <td>{(2 ** (32 - prefix))}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </Table>
      </div>
    </Layout>
  );
};
