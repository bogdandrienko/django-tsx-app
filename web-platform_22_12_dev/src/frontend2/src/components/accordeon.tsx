import React from "react";

export function Base1(props: { children: any }) {
  return (
    <main className={"container"}>
      <head></head>
      <div>{props.children}</div>
    </main>
  );
}

export function Accordeon1(props: { value: string; children: any }) {
  return (
    <div>
      <h1>
        FIRST {props.value} {props.children}
      </h1>
    </div>
  );
}
