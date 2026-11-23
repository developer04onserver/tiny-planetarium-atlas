import test from "node:test";
import assert from "node:assert/strict";
import { filterCelestials, randomCelestial } from "../src/logic.js";
import { celestials } from "../src/catalog.js";

test("the catalogue has thirty unique records", () => {
  assert.equal(celestials.length,30);
  assert.equal(new Set(celestials.map(item => item.id)).size,30);
});
test("empty search returns all records", () => {
  assert.equal(filterCelestials(celestials).length,30);
});
test("search ignores case and matches the description", () => {
  assert.equal(filterCelestials(celestials,"LITTLE SUN")[0].id,"sol");
  assert.equal(filterCelestials(celestials,"far edge")[0].id,"neptune");
});
test("kind filter narrows the catalogue", () => {
  assert.deepEqual(filterCelestials(celestials,"","moon").map(item => item.id),["luna","phobos","deimos","io","europa","titan"]);
});
test("favorites can be intersected with text and kind filters", () => {
  const favorites = new Set(["sol","luna","saturn"]);
  assert.deepEqual(filterCelestials(celestials,"","moon",favorites).map(item => item.id),["luna"]);
});
test("random selection is deterministic with an injected source", () => {
  assert.equal(randomCelestial(celestials,null,() => 0).id,"sol");
  assert.equal(randomCelestial(celestials,"sol",() => 0).id,"luna");
});
test("random selection safely handles no candidates", () => {
  assert.equal(randomCelestial([],null),undefined);
  assert.equal(randomCelestial([celestials[0]],"sol"),undefined);
});
