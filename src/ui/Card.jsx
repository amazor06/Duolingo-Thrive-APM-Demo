import React from "react";

export default function Card({ children, variant }) {
  const cls = ["card", variant ? `card-${variant}` : ""].filter(Boolean).join(" ");
  return <section className={cls}>{children}</section>;
}
