import React from "react";

export default function page() {
  return (
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum tempora
      placeat doloribus consequuntur quo assumenda. Dolor, voluptates repellat
      tempora rerum commodi voluptas beatae error quas ipsa recusandae iusto
      perferendis tempore?
    </div>
  );
}

function add(a: number, b: number): number {
  return a + b;
}

function wrapper(
  action: (a: number, b: number) => number,
): (a: number, b: number) => number {
  return (...args: [number, number]) => {
    console.log("before", args);
    return action(...args);
  };
}

const wrapperAdd = wrapper((a, b) => a + b);
