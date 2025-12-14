import React from "react";
import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";
import StatRow from "../ui/StatRow.jsx";

export default function DeepDiveHome({ onStart }) {
  return (
    <div className="stack">
      <Card variant="hero">
        <div className="heroTop">
          <div className="heroBadge">NEW</div>
          <div className="heroTitle">Daily Deep Dive</div>
          <div className="heroSub">
            A focused, 5–7 minute session with one clear takeaway.
          </div>
        </div>

        <div className="heroGrid">
          <div className="heroMiniCard">
            <div className="miniKicker">Today’s goal</div>
            <div className="miniValue">Build momentum</div>
            <div className="miniHint">Complete the 3 steps</div>
          </div>
          <div className="heroMiniCard">
            <div className="miniKicker">Reward</div>
            <div className="miniValue">+35 XP</div>
            <div className="miniHint">Keep your streak alive</div>
          </div>
        </div>

        <div style={{ marginTop: 14 }}>
          <Button size="lg" onClick={onStart}>
            Start Deep Dive
          </Button>
        </div>
      </Card>

      <Card>
        <div className="sectionTitle">What you’ll do</div>
        <div className="divider" />
        <StatRow
          icon="1"
          title="Review"
          desc="Quick check-in to set context"
        />
        <StatRow
          icon="2"
          title="Learn"
          desc="A short, high-signal explanation"
        />
        <StatRow
          icon="3"
          title="Apply"
          desc="One action to lock it in"
        />
      </Card>
    </div>
  );
}
