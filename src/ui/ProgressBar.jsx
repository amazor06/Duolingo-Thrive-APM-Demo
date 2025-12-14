import React from "react";

export default function ProgressBar({ value = 0 }) {
  const safe = Math.max(0, Math.min(100, value));
  return (
    <div className="progressOuter" role="progressbar" aria-valuenow={safe} aria-valuemin={0} aria-valuemax={100}>
      <div className="progressInner" style={{ width: `${safe}%` }} />
    </div>
  );
}
