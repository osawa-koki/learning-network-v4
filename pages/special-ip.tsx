import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import Layout from "../components/Layout";

interface SpecialIPType {
  title: string;
  subtitle: string;
  description: string;
};

const SpecialIPs: SpecialIPType[] = [
  {
    title: '127.0.0.1',
    subtitle: 'ループバックIPアドレス',
    description: '自分自身のIPアドレスです。',
  },
  {
    title: '0.0.0.0',
    subtitle: 'ワイルドカードIPアドレス',
    description: 'ネットワーク上の全てのホストに対してパケットを送信するためのIPアドレスです。',
  },
  {
    title: '169.254.x.x',
    subtitle: 'APIPA',
    description: 'APIPAは、ネットワークに接続されているが、DHCPサーバーからIPアドレスを取得できない場合に、自動的に割り当てられるIPアドレスです。',
  },
  {
    title: '192.0.2.0',
    subtitle: 'テスト用IPアドレス',
    description: 'インターネット上で使用されることはありません。テスト用に使用されます。',
  },
  {
    title: '255.255.255.255',
    subtitle: 'ブロードキャストIPアドレス',
    description: 'ネットワーク上の全てのホストに対してパケットを送信するためのIPアドレスです。',
  },
  {
    title: '224.0.0.0 ～ 239.255.255.255',
    subtitle: 'マルチキャストIPアドレス',
    description: 'ネットワーク上の特定のホストに対してパケットを送信するためのIPアドレスです。',
  },
  {
    title: '198.18.0.0 ～ 198.19.255.255',
    subtitle: 'ベンチマークテスト用IPアドレス',
    description: 'インターネット上で使用されることはありません。ベンチマークテスト用に使用されます。',
  },
  {
    title: '240.0.0.0 ～ 255.255.255.254',
    subtitle: '予約済みIPアドレス',
    description: 'インターネット上で使用されることはありません。将来の使用を予約しています。',
  },
  {
    title: '127.0.53.53',
    subtitle: '名前衝突検出用IPアドレス',
    description: '名前衝突検出用のIPアドレスです。',
  },
];

export default function FortunePage() {

  return (
    <Layout>
      <div id="SpecialIP">
        <h1>Special IP</h1>
        <p className="mt-3">特殊なIPアドレス！</p>
        <Splide
          className="mt-3 w-100"
          options={{
            autoplay: true,
            interval: 3000,
            rewind: true,
            pauseOnHover: true,
            pauseOnFocus: true,
            arrows: false,
            type: 'loop',
          }}
        >
          {
            SpecialIPs.map((special_ip, index) => {
              return (
                <SplideSlide key={index}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{special_ip.title}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">{special_ip.subtitle}</h6>
                      <p className="card-text">{special_ip.description}</p>
                      <a className="card-link">#{special_ip.title}</a>
                    </div>
                  </div>
                </SplideSlide>
              );
            })
          }
        </Splide>
      </div>
    </Layout>
  );
};
