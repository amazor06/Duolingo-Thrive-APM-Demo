import React, { useMemo, useState } from "react";
import "./styles/app.css";
import DeepDiveHome from ".src/pages/DeepDiveHome.jsx";
import DeepDiveLesson from ".src/pages/DeepDiveLesson.jsx";
import DeepDiveFinish from "src/pages/DeepDiveFinish.jsx";

const SCREENS = {
  HOME: "HOME",
  LESSON: "LESSON",
  FINISH: "FINISH",
};

export default function App() {
  const [screen, setScreen] = useState(SCREENS.HOME);
  const [progress, setProgress] = useState(0); // 0..100
  const [xp, setXp] = useState(0);

  const todayLabel = useMemo(() => {
    const d = new Date();
    return d.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });
  }, []);

  function startDive() {
    setProgress(0);
    setXp(0);
    setScreen(SCREENS.LESSON);
  }

  function finishDive(finalXp = 35) {
    setXp(finalXp);
    setProgress(100);
    setScreen(SCREENS.FINISH);
  }

  return (
    <div className="app">
      <div className="shell">
        <header className="topbar">
          <div className="brand">
            <div className="brandMark" aria-hidden="true">
              D
            </div>
            <div className="brandText">
              <div className="brandTitle">Daily Deep Dive</div>
              <div className="brandSub">{todayLabel}</div>
            </div>
          </div>

          <div className="pillRow">
            <div className="pill">
              <span className="pillDot" aria-hidden="true" />
              <span className="pillLabel">Streak</span>
              <span className="pillValue">7</span>
            </div>
            <div className="pill">
              <span className="pillLabel">XP</span>
              <span className="pillValue">{xp}</span>
            </div>
          </div>
        </header>

        <main className="main">
          {screen === SCREENS.HOME && <DeepDiveHome onStart={startDive} />}

          {screen === SCREENS.LESSON && (
            <DeepDiveLesson
              progress={progress}
              setProgress={setProgress}
              onFinish={finishDive}
              onBack={() => setScreen(SCREENS.HOME)}
            />
          )}

          {screen === SCREENS.FINISH && (
            <DeepDiveFinish
              xp={xp}
              onRestart={() => setScreen(SCREENS.HOME)}
              onReplay={() => {
                setProgress(0);
                setXp(0);
                setScreen(SCREENS.LESSON);
              }}
            />
          )}
        </main>

        <footer className="footer">
          <span className="footerHint">UI mock • no backend • built for demo vibes</span>
        </footer>
      </div>
    </div>
  );
}
