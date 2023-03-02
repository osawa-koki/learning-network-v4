import React from "react";

import Layout from "../components/Layout";

export default function ElsePage() {
  return (
    <Layout>
      <div id="Else">
        <h1>Else</h1>
        <hr />
        <p>IPアドレスでは'10.0.0.1'を'10.0.0.01'のように、先頭に'0'を付しても正常に動作します。<br /><br />これは内部的に一度ビット配列に変換する処理が行われ、この際に無視されるからです。</p>
        <hr />
        <p>このページは静的サイトであり、IPアドレス等の収集を行っていません。<br /><br />しかしながら、ホスティング先であるGitHubやIPアドレス関連情報の取得先である'ip-api.com'で、何らかのデータ収集が行われていることがあります。</p>
      </div>
    </Layout>
  );
};
