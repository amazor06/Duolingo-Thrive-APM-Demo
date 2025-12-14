import React from "react";

export default function Button({
  children,
  onClick,
  disabled,
  variant = "primary",
  size = "md",
  type = "button",
}) {
  const cls = ["btn", `btn-${variant}`, `btn-${size}`, disabled ? "is-disabled" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled}>
      <span className="btnInner">{children}</span>
    </button>
  );
}
 