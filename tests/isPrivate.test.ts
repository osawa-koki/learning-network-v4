export {};

import isPrivate from "../util/isPrivate";

test("プライベートIPアドレスの判定関数のテスト", () => {

  expect(isPrivate("10.0.0.0")).toEqual("private-A");
  expect(isPrivate("10.0.10.0")).toEqual("private-A");
  expect(isPrivate("10.255.255.255")).toEqual("private-A");

  expect(isPrivate("172.16.0.0")).toEqual("private-B");
  expect(isPrivate("172.31.255.255")).toEqual("private-B");

  expect(isPrivate("192.168.0.0")).toEqual("private-C");
  expect(isPrivate("192.168.255.255")).toEqual("private-C");

  expect(isPrivate("0.0.0.0")).toEqual("special");
  expect(isPrivate("127.0.0.1")).toEqual("special");
  expect(isPrivate("255.255.255.255")).toEqual("special");

  expect(isPrivate("5.5.5.5")).toEqual("public");
  expect(isPrivate("7.7.7.7")).toEqual("public");
  expect(isPrivate("252.10.252.10")).toEqual("public");

  expect(isPrivate("")).toEqual(null);
  expect(isPrivate("a")).toEqual(null);
  expect(isPrivate("a.b.c.d")).toEqual(null);

});
