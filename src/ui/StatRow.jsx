import React from "react";

export default function StatRow({ icon, title, desc }) {
  return (
    <div className="statRow">
      <div className="statIcon" aria-hidden="true">{icon}</div>
      <div className="statText">
        <div className="statTitle">{title}</div>
        <div className="statDesc">{desc}</div>
      </div>
    </div>
  );
}
