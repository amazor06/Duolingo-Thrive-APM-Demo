import React, { useMemo, useState } from "react";
import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";
import ProgressBar from "../ui/ProgressBar.jsx";
import Chip from "../ui/Chip.jsx";
import Modal from "../ui/Modal.jsx";

const YESTERDAY = {
  dateLabel: "Yesterday",
  struggledWith: ["ser vs estar", "present tense of 'tener'", "gender agreement (el/la)"],
  accuracy: "72%",
  timeSpent: "4m 12s",
};

const QUESTIONS = [
  {
    id: "q1",
    type: "mcq",
    kicker: "Review • ser vs estar",
    prompt: "Choose the best translation: “I am tired.”",
    choices: ["Soy cansado", "Estoy cansado", "Es cansado", "Estoy cansada"],
    correctIndex: 1,
    xp: 10,
    explanation: "For temporary states (tired), Spanish uses estar: “Estoy cansado/a.”",
  },
  {
    id: "q2",
    type: "fill",
    kicker: "Review • tener",
    prompt: "Fill in the blank: “I have a dog.” → “Yo ____ un perro.”",
    answer: "tengo",
    xp: 10,
    explanation: "The 'yo' form of tener is 'tengo'.",
  },
  {
    id: "q3",
    type: "mcq",
    kicker: "Review • articles",
    prompt: "Pick the correct phrase: “the house”",
    choices: ["la casa", "el casa", "los casa", "las casa"],
    correctIndex: 0,
    xp: 15,
    explanation: "Casa is feminine → “la casa”.",
  },
];

function normalize(s) {
  return (s || "").trim().toLowerCase();
}

export default function DeepDiveLesson({ progress, setProgress, onFinish, onBack }) {
  // Intro modal
  const [showIntro, setShowIntro] = useState(true);

  // Question state
  const [qIndex, setQIndex] = useState(0);
  const q = QUESTIONS[qIndex];

  // Inputs
  const [mcqPick, setMcqPick] = useState(null);
  const [fillValue, setFillValue] = useState("");

  // Feedback/locking
  const [status, setStatus] = useState("idle"); // "idle" | "wrong" | "correct"
  const [lockedCorrect, setLockedCorrect] = useState(false);

  const totalXP = useMemo(() => QUESTIONS.reduce((sum, it) => sum + it.xp, 0), []);
  const pct = useMemo(() => Math.round((qIndex / QUESTIONS.length) * 100), [qIndex]);

  function resetPerQuestion() {
    setStatus("idle");
    setLockedCorrect(false);
    setMcqPick(null);
    setFillValue("");
  }

  function backStep() {
    if (showIntro) {
      onBack();
      return;
    }

    // If user is mid-question, let them back out to Home
    if (qIndex === 0) {
      onBack();
      return;
    }

    const prevIndex = Math.max(0, qIndex - 1);
    setQIndex(prevIndex);
    setProgress(Math.round((prevIndex / QUESTIONS.length) * 100));
    resetPerQuestion();
  }

  function canCheck() {
    if (!q) return false;
    if (q.type === "mcq") return mcqPick !== null;
    if (q.type === "fill") return normalize(fillValue).length > 0;
    return false;
  }

  function checkAnswer() {
    if (!q) return;

    let correct = false;
    if (q.type === "mcq") correct = mcqPick === q.correctIndex;
    if (q.type === "fill") correct = normalize(fillValue) === normalize(q.answer);

    if (correct) {
      setStatus("correct");
      setLockedCorrect(true); // allow Continue
    } else {
      setStatus("wrong");
      setLockedCorrect(false); // force retry
    }
  }

  function next() {
    if (!lockedCorrect) return;

    const nextIndex = qIndex + 1;
    if (nextIndex >= QUESTIONS.length) {
      onFinish(totalXP);
      return;
    }

    setQIndex(nextIndex);
    setProgress(Math.round((nextIndex / QUESTIONS.length) * 100));
    resetPerQuestion();
  }

  return (
    <div className="stack">
      {/* Intro popup */}
      <Modal
        open={showIntro}
        title="Daily Deep Dive • Review"
        onClose={() => {
          setShowIntro(false);
          setProgress(0);
        }}
        footer={
          <Button
            size="lg"
            onClick={() => {
              setShowIntro(false);
              setProgress(0);
            }}
          >
            Start review
          </Button>
        }
      >
        <div style={{ fontWeight: 900, marginBottom: 10 }}>
          {YESTERDAY.dateLabel} you struggled with:
        </div>

        <ul style={{ marginTop: 0, color: "var(--muted)", lineHeight: 1.6 }}>
          {YESTERDAY.struggledWith.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
          <div className="metric">
            <div className="metricLabel">Accuracy</div>
            <div className="metricValue">{YESTERDAY.accuracy}</div>
          </div>
          <div className="metric">
            <div className="metricLabel">Time</div>
            <div className="metricValue">{YESTERDAY.timeSpent}</div>
          </div>
        </div>

        <div style={{ marginTop: 12, color: "var(--muted)" }}>
          Today we’ll do <b>{QUESTIONS.length}</b> quick review questions.
        </div>
      </Modal>

      <Card>
        <div className="lessonHeader">
          <button className="ghostBack" onClick={backStep} type="button">
            ← Back
          </button>
          <div className="lessonMeta">
            <Chip>{q?.kicker || "Review"}</Chip>
            <div className="stepCount">
              Q <b>{qIndex + 1}</b> / {QUESTIONS.length}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 10 }}>
          <ProgressBar value={Math.max(progress, pct)} />
        </div>

        <div className="lessonTitle">{q.prompt}</div>

        <div className="divider" />

        {/* MCQ */}
        {q.type === "mcq" && (
          <div className="field">
            <div className="choiceGrid">
              {q.choices.map((c, i) => {
                const isPicked = mcqPick === i;
                const isCorrect = i === q.correctIndex;

                // Duolingo-style: if wrong, ONLY the picked option turns red (no reveal)
                const wrongPicked = status === "wrong" && isPicked && !isCorrect;
                // If correct, picked turns green
                const correctPicked = status === "correct" && isPicked && isCorrect;

                const cls = [
                  "choice",
                  isPicked ? "active" : "",
                  wrongPicked ? "wrong" : "",
                  correctPicked ? "correct" : "",
                ]
                  .filter(Boolean)
                  .join(" ");

                return (
                  <button
                    key={c}
                    type="button"
                    className={cls}
                    onClick={() => {
                      setMcqPick(i);
                      // new attempt clears feedback
                      if (status !== "idle") setStatus("idle");
                      setLockedCorrect(false);
                    }}
                  >
                    <span className="choiceRadio" aria-hidden="true" />
                    <span className="choiceText">{c}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Fill */}
        {q.type === "fill" && (
          <div className="field">
            <label className="label">Your answer</label>
            <input
              className="textarea"
              style={{ height: 46, paddingTop: 10, paddingBottom: 10 }}
              value={fillValue}
              onChange={(e) => {
                setFillValue(e.target.value);
                if (status !== "idle") setStatus("idle");
                setLockedCorrect(false);
              }}
              placeholder="Type here…"
            />
          </div>
        )}

        {/* Feedback */}
        {status !== "idle" && (
          <div
            className="note"
            style={{
              marginTop: 12,
              borderColor:
                status === "correct"
                  ? "rgba(88,204,2,0.35)"
                  : "rgba(255, 82, 82, 0.35)",
              color: "var(--text)",
            }}
          >
            <div style={{ fontWeight: 950, marginBottom: 6 }}>
              {status === "correct" ? "Correct ✅" : "Wrong ❌ Try again"}
            </div>

            {status === "correct" ? (
              <div style={{ color: "var(--muted)" }}>{q.explanation}</div>
            ) : (
              <div style={{ color: "var(--muted)" }}>
                You can’t continue until you get it right.
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="lessonActions">
          {status !== "correct" ? (
            <Button size="lg" disabled={!canCheck()} onClick={checkAnswer}>
              Check
            </Button>
          ) : (
            <Button size="lg" onClick={next}>
              {qIndex === QUESTIONS.length - 1 ? "Finish" : "Continue"}
            </Button>
          )}
        </div>
      </Card>

      <Card>
        <div className="sectionTitle">Mock personalization</div>
        <div className="divider" />
        <div className="note">
          In the real product, “yesterday you struggled with…” would come from user history.
          For this demo, it’s mocked with Spanish topics + review questions.
        </div>
      </Card>
    </div>
  );
}
