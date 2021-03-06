import test from "ava";

import { createContext } from "../src/expander.mjs";

test("unknown value", t => {
  const context = createContext({
    keepUndefinedValues: true
  });

  const json = {
    key: "${unknown}"
  };

  t.is(context.expand(json).key, "${unknown}");
});
