import React from "react";
import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";

export default function DeepDiveFinish({ xp, onRestart, onReplay }) {
  return (
    <div className="stack">
      <Card variant="hero">
        <div className="finishBadge">COMPLETED</div>
        <div className="finishTitle">Nice work.</div>
        <div className="finishSub">
          You finished today’s Deep Dive and earned <b>{xp} XP</b>.
        </div>

        <div className="rewardRow">
          <div className="reward">
            <div className="rewardTop">XP</div>
            <div className="rewardVal">+{xp}</div>
          </div>
          <div className="reward">
            <div className="rewardTop">Streak</div>
            <div className="rewardVal">Safe</div>
          </div>
          <div className="reward">
            <div className="rewardTop">Mood</div>
            <div className="rewardVal">🔥</div>
          </div>
        </div>

        <div className="finishActions">
          <Button size="lg" onClick={onRestart}>Back to Home</Button>
          <Button variant="secondary" size="lg" onClick={onReplay}>Replay</Button>
        </div>

        <div className="finishHint">
          Come back tomorrow for the next Deep Dive (mock teaser).
        </div>
      </Card>

      <Card>
        <div className="sectionTitle">Share (mock)</div>
        <div className="divider" />
        <button
          className="shareBtn"
          type="button"
          onClick={() => {
            const text = `I finished my Daily Deep Dive and earned ${xp} XP!`;
            navigator.clipboard?.writeText(text);
            alert("Copied share text to clipboard (mock).");
          }}
        >
          Copy share text
        </button>
      </Card>
    </div>
  );
}
