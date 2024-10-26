"use client";

import { useState } from "react";

export const Counter = () => {
  const [count, setCount] = useState(0);
  console.log("Counter");

  return (
    <div className="border-white rounded-md border max-w-96 p-10">
      <p className="font-bold text-xl py-6">
        You clicked <span className="text-4xl">{count}</span> times
      </p>
      <button
        onClick={() => setCount(count + 1)}
        className="bg-white text-black py-2 px-8 rounded font-bold text-2xl my-2"
      >
        Click me
      </button>
    </div>
  );
};
