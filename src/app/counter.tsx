"use client";

import { useState } from "react";
import stylex from "@stylexjs/stylex";

const styles = stylex.create({
  foo: {
    color: "green",
  },
  bar: {
    backgroundColor: "blanchedalmond",
  },
});

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div {...stylex.props(styles.foo, styles.bar)}>
      <p>You clicked {count} times</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Click me
      </button>
    </div>
  );
}
