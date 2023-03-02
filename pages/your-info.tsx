import React, { useEffect, useState } from "react";

import { Alert, Spinner, Table } from 'react-bootstrap';
import Layout from "../components/Layout";
import Setting from "../setting";

type FetchingState = "fetching" | "fetched" | "error";

export default function YourInfoPage() {

  const [fetching_state, setFetched] = useState<FetchingState>('fetching');
  const [error, setError] = useState<Error | null>(null);

  const [ip, setIp] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [region, setRegion] = useState<string | null>(null);
  const [regionName, setRegionName] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [zip, setZip] = useState<string | null>(null);
  const [lat, setLat] = useState<string | null>(null);
  const [lon, setLon] = useState<string | null>(null);
  const [timezone, setTimezone] = useState<string | null>(null);
  const [isp, setIsp] = useState<string | null>(null);
  const [org, setOrg] = useState<string | null>(null);
  const [as, setAs] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${Setting.apiPath}/your-info`)
      .then(response => response.json())
      .then((data: any) => {
        console.log(data);
        const ip_api_data = data['ip-api'];
        setIp(ip_api_data.query);
        setCountry(ip_api_data.country);
        setCountryCode(ip_api_data.countryCode);
        setRegion(ip_api_data.region);
        setRegionName(ip_api_data.regionName);
        setCity(ip_api_data.city);
        setZip(ip_api_data.zip);
        setLat(ip_api_data.lat);
        setLon(ip_api_data.lon);
        setTimezone(ip_api_data.timezone);
        setIsp(ip_api_data.isp);
        setOrg(ip_api_data.org);
        setAs(ip_api_data.as);
        setFetched('fetched');
      })
      .catch(error => {
        console.error(error);
        setError(error);
        setFetched('error');
      });
  }, []);

  return (
    <Layout>
      <div id="YourInfo">
        <h1>Your Info (from IP Address)</h1>
        <p className="mt-3">'ip-api.com'から取得しています。<br /><br />IPアドレスそのものでは、個人を特定することはできませんが、契約しているインターネットプロバイダの国や地域などの情報は取得することはできます。<br /><br />また、IPアドレスでの通信履歴を探索することで、より個人を特定するような情報に近づけることも可能です。</p>
        <div className="mt-5">
        {
          fetching_state === 'fetching' ? (
            <div id='YourIpDetailsFetingLoader'>
              <Spinner animation="grow" variant="primary" />
              <Spinner animation="grow" variant="secondary" />
              <Spinner animation="grow" variant="success" />
              <Spinner animation="grow" variant="danger" />
              <Spinner animation="grow" variant="warning" />
              <Spinner animation="grow" variant="info" />
              <Spinner animation="grow" variant="light" />
              <Spinner animation="grow" variant="dark" />
            </div>
          ) : fetching_state === 'fetched' ? (
            <Table>
              <tbody>
                <tr>
                  <td>IP</td>
                  <td>{ip}</td>
                </tr>
                <tr>
                  <td>Country</td>
                  <td>{country}</td>
                </tr>
                <tr>
                  <td>Country Code</td>
                  <td>{countryCode}</td>
                </tr>
                <tr>
                  <td>Region</td>
                  <td>{region}</td>
                </tr>
                <tr>
                  <td>Region Name</td>
                  <td>{regionName}</td>
                </tr>
                <tr>
                  <td>City</td>
                  <td>{city}</td>
                </tr>
                <tr>
                  <td>Zip</td>
                  <td>{zip}</td>
                </tr>
                <tr>
                  <td>Lat</td>
                  <td>{lat}</td>
                </tr>
                <tr>
                  <td>Lon</td>
                  <td>{lon}</td>
                </tr>
                <tr>
                  <td>Timezone</td>
                  <td>{timezone}</td>
                </tr>
                <tr>
                  <td>Isp</td>
                  <td>{isp}</td>
                </tr>
                <tr>
                  <td>Org</td>
                  <td>{org}</td>
                </tr>
                <tr>
                  <td>As</td>
                  <td>{as}</td>
                </tr>
              </tbody>
            </Table>
          ) : fetching_state === 'error' ? (
            <Alert variant="danger">
              <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
              <p>
                {error}
              </p>
            </Alert>
          ) : null
        }
        </div>
      </div>
    </Layout>
  );
};
