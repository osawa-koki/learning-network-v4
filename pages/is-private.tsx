import React, { useState } from "react";

import { Alert, Form } from 'react-bootstrap';
import Layout from "../components/Layout";
import isPrivate from "../util/isPrivate";


export default function IsPrivatePage() {

  const [ip, setIP] = useState<string>('10.0.0.0');

  return (
    <Layout>
      <div id="IsPrivate">
        <h1>Is Private IP Address???</h1>
        <Form.Control type="text" placeholder='10.0.0.0' value={ip} onInput={(e) => {setIP((e.target as HTMLInputElement).value)}} className='ip mt-5' />
        <hr />
        {
          isPrivate(ip) === 'public' ? (
            <Alert variant='info'>
              <Alert.Heading>Public IP Address 🌎</Alert.Heading>
              <p>
               ' {ip}' is a public IP Address.
              </p>
            </Alert>
          ) : ['private-A', 'private-B', 'private-C'].includes(isPrivate(ip)) ? (
            <Alert variant='success'>
              <Alert.Heading>Private IP Address 🔏</Alert.Heading>
              <p>
                '{ip}' is a private IP Address.<br />(Class {isPrivate(ip).replace('private-', '')})
              </p>
            </Alert>
          ) : isPrivate(ip) === 'special' ? (
            <Alert variant='warning'>
              <Alert.Heading>Special IP Address 🚧</Alert.Heading>
              <p>
                '{ip}' is a special IP Address.
              </p>
            </Alert>
          ) : (
            <Alert variant='danger'>
              <Alert.Heading>Invalid IP Address ❌</Alert.Heading>
              <p>
                '{ip}' is not a valid IP Address.
              </p>
            </Alert>
          )
        }
      </div>
    </Layout>
  );
};
