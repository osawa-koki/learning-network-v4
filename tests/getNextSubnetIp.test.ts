export {};

import getNextSubnetIp from "../util/getNextSubnetIp";

test("追加するサブネット計算関数のテスト", () => {
  expect(getNextSubnetIp("10.0.0.0", "24")).toBe("10.0.1.0");
  expect(getNextSubnetIp("10.0.1.0", "24")).toBe("10.0.2.0");
  expect(getNextSubnetIp("10.0.2.0", "24")).toBe("10.0.3.0");

  expect(getNextSubnetIp("10.0.0.0", "16")).toBe("10.1.0.0");
  expect(getNextSubnetIp("10.1.0.0", "16")).toBe("10.2.0.0");
  expect(getNextSubnetIp("10.2.0.0", "16")).toBe("10.3.0.0");
});
