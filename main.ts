import { signal, effect } from "@preact/signals-core";

const counter = signal(0);

effect(() => console.log("Counter:", counter.value));

for (let u = 0; u < 10; u++) {
  counter.value = u;
}
