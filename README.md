# Daily Deep Dive
## Duolingo APM Thrive — Take-Home Product Exercise

This repository contains a UI and interaction prototype built as part of the Duolingo APM Thrive take-home product exercise.

The project explores a product concept focused on improving learner retention and comprehension through personalized daily review, using minimal scope to validate the idea.

---

## Product Idea

**Problem**  
Learners disengage when daily sessions feel unfocused and disconnected from prior mistakes, leading to lower return rates.

**Insight**  
Recent learner errors are a high-signal input for personalization.

**Hypothesis**  
If users begin their session with a short, targeted review of what they struggled with yesterday, they will return more frequently and improve accuracy on reviewed concepts.

---

## Solution: Daily Deep Dive

A short review flow shown at the start of a session.

**Flow**
1. Personalized recap of prior struggles (mocked)
2. Targeted review questions
3. Forced mastery through retry-until-correct
4. Clear completion state

The prototype uses mock Spanish learning content to simulate personalization.

---

## Interaction Design

- Incorrect answers are marked and require retry
- Users cannot continue until correct
- Progress feedback reinforces momentum
- Designed to be short, focused, and repeatable

---

## Success Metrics

**Primary**
- D7 retention
- Daily return rate

**Secondary**
- Session completion rate
- Accuracy improvement

**Guardrails**
- Frustration or quit rate
- Session length inflation

---

## Experiment Design

**Control:** Standard experience  
**Test:** Daily Deep Dive shown once per day at session start

---

## Tech Stack

- React (Vite)
- JavaScript
- CSS
- Deployed on Vercel

This prototype is intentionally UI and logic only, with mocked data and no backend.

---

## Running Locally

```bash
npm install
npm run dev
