"use client";

import { useState } from "react";
import { Checkbox } from "@mantine/core";
import styles from "./counter.module.css";

export const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.root}>
      <p>You clicked {count} times</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Click me
      </button>
      <Checkbox defaultChecked label="I agree to sell my privacy" />
    </div>
  );
};
