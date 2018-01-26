const { add, asyncAdd, subtract, multiply, divide } = require("./calculator");

describe("add works", () => {
  test("1+1=2", () => {
    expect(add(1,1)).toBe(2);
  });

  test("2-1=1", () => {
    expect(subtract(2,1)).toBe(1);
  });

  test("2/1=2", () => {
    expect(divide(2,1)).toBe(2);
  });

  test("2*1=2", () => {
    expect(multiply(2,1)).toBe(2);
  });

  it("1+1 works with async/await resolves", async () => {
    await expect(asyncAdd(1,1)).resolves.toEqual(2);
  })
});

describe("calculator throws to be expected", () => {
  test("'z' + 'q' throws", () => {
    expect(() => {
      add("z", "q");
    }).toThrow();
  });

  test("1 + 'q' throws", () => {
    expect(() => {
      add(1, "q");
    }).toThrow();
  });

  test("'z' - 1 throws", () => {
    expect(() => {
      subtract("z", "q");
    }).toThrow();
  });

  test("1 - 'q' throws", () => {
    expect(() => {
      subtract(1, "q");
    }).toThrow();
  });

  test("1 / 'q' throws", () => {
    expect(() => {
      divide(1, "q");
    }).toThrow();
  });

  test("'z' / 1 throws", () => {
    expect(() => {
      divide("z", 1);
    }).toThrow();
  });

  test("1 * 'q' throws", () => {
    expect(() => {
      multiply(1, "q");
    }).toThrow();
  });

  test("'z' * 1 throws", () => {
    expect(() => {
      multiply("z", 1);
    }).toThrow();
  });

  it("'z'+1 works with async/await throws", async () => {
    await expect(asyncAdd("z",1)).rejects.toThrowError();
  });

  it("1+'q' works with async/await throws", async () => {
    await expect(asyncAdd(1,"q")).rejects.toThrowError();
  });
})