import test from "ava";
import { createContext } from "expression-expander";

test("plain expand string", t => {
  const context = createContext();

  context.properties = {
    a: 1,
    b: 2,
    c: "text"
  };

  t.is(context.expand("${a}"), 1);
  t.is(context.expand("A${a}C"), "A1C");
  t.is(context.expand("A${a}${b}C"), "A12C");
  t.is(context.expand("A${c}C"), "AtextC");
});

test("expand empty string", t => {
  const context = createContext({keepUndefinedValues: true});

  context.properties = {
    a: ""
  };

  t.is(context.expand("${a}"), "");
});

test("plain properties passed in options", t => {
  const context = createContext({
    properties: {
      a: 1,
      b: 2,
      c: "text"
    }
  });

  t.is(context.expand("${a}"), 1);
  t.is(context.expand("A${a}C"), "A1C");
  t.is(context.expand("A${a}${b}C"), "A12C");
  t.is(context.expand("A${c}C"), "AtextC");
});

test("plain expand string with undefined value", t => {
  const context = createContext();

  context.properties = {
    b: 2
  };

  t.is(context.expand("B${a}A"), "BA");
  t.is(context.expand("${a}"), "");
});

test("plain expand string transitive", t => {
  const context = createContext();

  context.properties = {
    a: "${b}",
    b: 2
  };

  t.is(context.expand("${a}"), 2);
});

test("expand undefined", t => {
  t.is(createContext().expand(undefined), undefined);
});

test("expand null", t => {
  t.is(createContext().expand(null), null);
});

test("expand NaN", t => {
  t.deepEqual(createContext().expand(NaN), NaN);
});

test("expand false", t => {
  t.is(createContext().expand(false), false);
});

test("expand true", t => {
  t.is(createContext().expand(true), true);
});

test("expand number", t => {
  t.is(createContext().expand(42), 42);
});

test("expand function", t => {
  function x() {}
  t.is(createContext().expand(x), x);
});

test("expand bigint", t => {
  t.is(createContext().expand(123n), 123n);
});

test("expand BigInt", t => {
  t.is(
    createContext().expand(BigInt("9007199254740991")),
    BigInt("9007199254740991")
  );
});

test("expand Date", t => {
  const d = new Date();
  t.is(createContext().expand(d), d);
});

test("expand Map", t => {
  const d = new Map([
    ["k1${b}", "v1${a}"],
    ["k2", "v2"]
  ]);

  const ctx = createContext();

  ctx.properties = {
    a: "aa",
    b: 2
  };

  t.deepEqual(
    ctx.expand(d),
    new Map([
      ["k12", "v1aa"],
      ["k2", "v2"]
    ])
  );
});

test("expand Set", t => {
  const d = new Set(["k1${b}", "v1${a}"]);

  const ctx = createContext();

  ctx.properties = {
    a: "aa",
    b: 2
  };

  t.deepEqual(ctx.expand(d), new Set(["k12", "v1aa"]));
});

test("expand undefined value", t => {
  t.is(createContext().expand("${a}"), "");
});

test("expand object", t => {
  const context = createContext();

  context.properties = {
    a: 1,
    b: 2,
    c: "nc"
  };

  const expanded = context.expand({
    b: 3,
    c: "${a}",
    "${c}": 4
  });

  t.is(expanded.b, 3);
  t.is(expanded.c, 1);
  t.is(expanded.nc, 4);
});

test("expand array", t => {
  const context = createContext();

  context.properties = {
    a: 1,
    b: "2"
  };

  const expanded = context.expand([0, "${a}", "${b}"]);

  t.is(expanded[0], 0);
  t.is(expanded[1], 1);
  t.is(expanded[2], "2");
});

test("expand string with quoter", t => {
  const context = createContext({
    valueQuoter(o) {
      return "<" + o + ">";
    }
  });

  context.properties = {
    a: "1"
  };

  t.is(context.expand("${a}"), "<1>");
});

test("expand circular transitivity with quoter", t => {
  const context = createContext({
    valueQuoter(o) {
      return "<" + o + ">";
    }
  });

  context.properties = {
    a: "${b}",
    b: "${a}"
  };

  t.throws(() => {
    context.expand("${a}");
  });
});

test("expand special marker {{xxx}}", t => {
  const context = createContext({
    leftMarker: "{{",
    rightMarker: "}}",
    markerRegexp: "{{([^}]+)}}"
  });

  context.properties = {
    a: 1,
    b: 2,
    c: "text"
  };

  t.is(context.expand("{{a}}"), 1);
  t.is(context.expand("A{{a}}C"), "A1C");
  t.is(context.expand("A{{a}}{{b}}C"), "A12C");
  t.is(context.expand("A{{c}}C"), "AtextC");
});


test("expand special marker ${{xxx}}", t => {
  const context = createContext({
    leftMarker: "${{",
    rightMarker: "}}",
    markerRegexp: /\$\{\{([^}]+)\}\}/
    });

  context.properties = {
    a: 1,
    b: 2,
    c: "text"
  };

  t.is(context.expand("${{a}}"), 1);
  t.is(context.expand("A${{a}}C"), "A1C");
  t.is(context.expand("A${{a}}${{b}}C"), "A12C");
  t.is(context.expand("A${{c}}C"), "AtextC");
});
