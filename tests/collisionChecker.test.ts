export {};

import collisionChecker, { SubnetStruct } from "../util/collisionChecker";

test("衝突検知関数のテスト", () => {
  {
    const subnet: SubnetStruct = {
      id: "1",
      ip: "10.0.0.0",
      prefix: "24",
    };
    const other_subnets: SubnetStruct[] = [
      {
        id: "2",
        ip: "10.0.1.0",
        prefix: "24",
      },
      {
        id: "3",
        ip: "10.0.2.0",
        prefix: "24",
      },
    ];
    const collision_subnet_ids = collisionChecker(subnet, other_subnets);
    expect(collision_subnet_ids.length).toEqual(0);
  }
  {
    const subnet: SubnetStruct = {
      id: "1",
      ip: "10.0.1.0",
      prefix: "24",
    };
    const other_subnets: SubnetStruct[] = [
      {
        id: "2",
        ip: "10.0.0.0",
        prefix: "24",
      },
      {
        id: "3",
        ip: "10.0.1.0",
        prefix: "24",
      },
    ];
    const collision_subnet_ids = collisionChecker(subnet, other_subnets);
    expect(collision_subnet_ids.length).not.toEqual(0);
  }
});
