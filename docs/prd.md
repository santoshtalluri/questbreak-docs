# QuestBreak — Product Requirements Document

**Status:** Draft v0.1
**Date:** 19 August 2026
**Relationship to other docs:** This PRD sits *upstream* of Plan v1.0 and Plan v2.0. Those specify what the systems do. This one establishes who the product is for, what it is for, and how we will know it worked. Where they conflict, this document defines intent and the plans define implementation.

---

## 1. Introduction

### 1.1 What is it?

**QuestBreak is an adaptive practice app for middle schoolers that alternates 20 minutes of standards-aligned academic work with a 5-minute earned break — half arcade game, half curiosity content.**

That structure alone is not new. The thing that makes QuestBreak a distinct product is one mechanic:

> **How well you learn changes how good the break is — not merely whether you get one.**

Learning well during the quest drops power-ups that are spent inside the arcade game. A student who reasoned carefully and asked for help when stuck enters the break with a Shield and an Overdrive. A student who scraped past the gate enters with nothing. Both earned the break; only one earned an advantage in it.

This is the difference between a **toll booth** and a **payoff**. Every gamified learning product gates fun behind work. QuestBreak is built so that the quality of the work is felt inside the fun.

### 1.2 What kind of product is it?

It is a **practice-habit product**, and the category matters because it defines what we are not building.

| It is | It is not |
|---|---|
| Practice and reinforcement of skills already introduced | A first-instruction tutor or curriculum replacement |
| A daily habit, measured in weeks and months | A test-prep sprint or a homework-completion tool |
| Student-facing, student-motivated | An assignment queue an adult fills |
| A diagnostic engine with a game layer on top | A game with academic content bolted on |

The academic engine (Skill Graph, adaptive routing, mastery states) is the product. The game layer is strictly additive: it exists to make the student return tomorrow, and it is architecturally separable from the engine underneath it.

### 1.3 The one-sentence positioning

> **The practice app that a kid who is behind will open on their own.**

Every hard design decision in this product resolves against that sentence.

---

## 2. Who We Are Creating It For

### 2.1 Primary user: students aged 11–14 (grades 6–8)

This is the user we design for. Their experience is the product. Three segments, in priority order:

**Segment A — Behind and avoidant. *The core case.***
Below grade level in one or more granular competencies. Crucially, the deficit is rarely global — it is three or four missing prerequisites that make everything downstream feel impossible. This student has learned, through years of red marks and visible ranking, that academic practice is where they find out they are stupid. Their dominant behavior is **avoidance**, and avoidance is rational given the emotional cost they have experienced.

Nearly every unusual constraint in this product exists for this student: the below-threshold debrief, Flow decaying one tier instead of collapsing, the ban on public accuracy comparison, effort-ranked leaderboards, silent streak grace days, free-to-fail Constellation Trials, and identical rewards at every mastery threshold. If this student is not served, the product has failed regardless of how the other two segments perform.

**Segment B — On level, disengaged.**
Capable. Bored. Practices only what is assigned, and only to the minimum bar. Not emotionally injured by academics, just unmotivated by them. Served primarily by the game layer: Flow, power-ups, Quest framing, the Codex, and Crews.

**Segment C — Ahead and curious.**
Working at or above level and genuinely interested in something — space, animals, music production, competitive games. Underserved by practice tools, which have no ceiling and nothing to explore. Served by the Discovery Codex, Expeditions, Anomalies cards, and Constellation Trials as a real high-difficulty event.

### 2.2 Secondary parties: guardians and educators

Not who we design *for*, but who we must serve for the product to be usable at all. They live in a separate teacher/parent branch and hold exactly three powers over the student experience:

1. Set the per-student mastery threshold (70–95%) and hint cap.
2. Grant or withhold consent for every social feature.
3. Read competency telemetry.

They cannot see Studio artifacts unless the student shares them, and no guardian-facing commentary is ever rendered inside the student branch. The student's space is the student's.

### 2.3 Explicitly not for

- **Elementary students.** The reading level, the companion's register, and the social layer are all pitched at 11–14.
- **High schoolers.** The theme wrapper and Vela's voice will read as childish, and the failure modes are different.
- **Cram / test-prep users.** The loop is a habit built over months. It is bad at producing a score bump in ten days, and we should not claim otherwise.
- **Classroom-time seat filling.** A 25-minute loop with a game in it is a poor fit for a supervised 45-minute period, and optimizing for that use case would corrupt the incentive design.

---

## 3. The Problem

### 3.1 Surface problem

Middle schoolers do not practice enough, and much of the practice they do is unproductive — repeating what they can already do, or grinding at something whose prerequisite they never got.

This is true but shallow. It describes a symptom that a dozen products already claim to address.

### 3.2 The real problem: existing tools split into two failure modes

**Failure mode 1 — Academically rigorous, motivationally dead.**
Tools in this category (the IXL / Khan-style practice lineage) get the pedagogy right: granular skills, real adaptivity, honest assessment. They are also joyless. Students use them because an adult required it. When the requirement is removed, usage stops. Their retention is *assignment-driven*, not desire-driven — which means they cannot reach the student who is avoidant, because that student's guardian or teacher is exactly the pressure they are avoiding.

**Failure mode 2 — Engaging, academically thin.**
Tools in this category (the Prodigy-style lineage) wrap thin content in a real game. Kids do open them voluntarily, which is a genuine achievement. But the academic content functions as a **toll**: answer three questions, get back to the game. The rational student strategy is to minimize time and effort on the toll. The product's incentive structure quietly teaches that learning is a cost to be reduced — the exact opposite of what its content teaches.

### 3.3 The structural flaw both share

In both categories, **the reward is disconnected from the quality of the learning.**

A student who genuinely mastered a skill and a student who guessed their way past the bar receive an identical reward. So the optimal strategy is always the minimum. This is not a content problem or a UX problem; it is an incentive-design problem, and no amount of better questions or nicer animations fixes it.

### 3.4 The third problem, specific to our core user

**Failure is emotionally expensive in nearly every product in this space.** Combos reset to zero. Streaks break with a warning modal engineered to produce dread. Scores rank publicly. Progress decays if you leave.

These are consumer-game retention mechanics, and they work — on adults, on the already-succeeding, on people whose self-concept is not at stake. Applied to a twelve-year-old who is already behind, they convert every session into another opportunity to be told they are behind. So that student quits, and the product's aggregate engagement numbers never show it, because the students who quit stop appearing in the denominator.

### 3.5 Problem statement

> Middle schoolers who most need practice avoid it, because the tools that are academically serious are joyless, the tools that are enjoyable are academically hollow, and both punish failure in ways that teach an already-struggling student that trying is not worth the risk.

---

## 4. Value Proposition

### 4.1 For the student

| What they get | Why it matters |
|---|---|
| **A break you made better by learning well** | Power-ups earned during the quest are spent in the arcade. Effort is *felt*, not just accounted for. This is the thing no competitor does. |
| **Being wrong costs you nothing** | XP is kept on a failed round. Flow drops one tier, never to zero. Streaks have silent grace days. Trials are free to fail. Nothing earned is ever removed. |
| **Nobody sees your accuracy — ever** | No leaderboard, crew metric, or peer surface exposes scores. Social comparison ranks focus minutes, mistakes resolved, cards collected, and themes explored. A struggling student can legitimately win those. |
| **Your interest is the material, not a sticker** | Ratios taught through rocket fuel mixtures or shooting percentages, at identical rigor. Five themes, and the theme never simplifies the question. |
| **A map that fills in** | Granular competencies as stars that ignite. Progress you can see without anyone grading you. |
| **Something to collect that rewards curiosity** | Discovery Cards awarded for *participating* in enrichment, never for being right. The rarest set only fills from unfamiliar themes. |

### 4.2 For guardians and educators

| What they get | Why it matters |
|---|---|
| **Practice that happens without nagging** | The product is designed to be opened voluntarily. That is the whole bet. |
| **Competency data, not a letter grade** | Which specific prerequisites are missing, and which repeated mistakes have been resolved. |
| **An invisible accommodation** | The mastery threshold is adjustable 70–95%, set by an adult, never shown to the student as a comparison, with identical rewards at every level. Accommodation without stigma. |
| **A product built for children, not monetized against them** | No ads, no purchases, no trading, no lootboxes, no free-text chat, no guilt notifications, no dark-pattern retention loops. COPPA/FERPA-aligned. |

### 4.3 Why they should choose us over the alternative

Against the rigorous-but-dead category: **the student will actually open it.**
Against the fun-but-hollow category: **the learning is real, adaptive, and verified — and the fun is better *because* of it, not despite it.**

---

## 5. North Star

### 5.1 The qualitative north star

> **A student who is behind opens QuestBreak on their own — and leaves knowing exactly what they got better at.**

Both halves are load-bearing. *On their own* is the motivational claim. *Knowing exactly what they got better at* is the pedagogical claim. Either one alone describes a product that already exists.

### 5.2 The north star metric

> ### Mastered skill nodes per active student per week, from self-initiated sessions.

**Why this metric:**

- **It requires both things to be true at once.** A node only flips to Mastered through graph-verified performance, so learning genuinely happened. *Self-initiated* means no adult started the session, so the motivational thesis genuinely held. Neither half can be faked by the other.
- **It resists gaming.** Mastery is verified against the Skill Graph, not self-reported. It cannot be farmed by idling, by session length, or by opening the app.
- **It is the value delivered, not a proxy for it.** Unlike DAU, session length, or streak length — all of which can rise while the product gets worse for our core user.
- **It is movable by every team.** Content quality, adaptive routing, game feel, and onboarding all move it.

**What we deliberately did *not* choose:**

| Rejected metric | Why |
|---|---|
| DAU / session length | Rises under compulsion. §12 explicitly forbids the mechanics that would move it. |
| Streak length | We removed loss aversion on purpose; optimizing this would reintroduce it. |
| Questions answered | Rewards volume over mastery. Encourages rushing, which fights the adaptive engine. |
| Accuracy | Improves when we serve easier students, and can be raised by lowering rigor. |

### 5.3 The counter-metric that keeps it honest

A north star alone is dangerous: mastery-per-week can be pumped by making mastery cheap, or by quietly serving only students who were already succeeding. So the north star is **paired and never reported alone**:

> ### Return-After-Miss Rate ≥ 65% within 2 days

The percentage of students who miss the accuracy gate and come back within two days. This is the moment the product either keeps or loses Segment A. If mastery-per-week is climbing while Return-After-Miss is falling, we are shedding the students we built this for, and the north star is lying.

**Report them together, always.**

### 5.4 Supporting guardrails

Any of these tripping is a design failure regardless of headline numbers (detail in Plan v2.0 §15):

- Median session length stays near 25–50 minutes — a rising tail means compulsion, not value
- Rushing rate must not rise as Flow rewards are tuned
- Hint use must not fall while accuracy also falls (that pattern means guessing to protect Flow)
- Below-threshold students' XP-per-session stays within 60% of above-threshold students'

---

## 6. High-Level Approach and Design

### 6.1 Four design pillars

**Pillar 1 — Mastery Before Play.**
The break unlocks at the accuracy threshold with a hint cap. No currency, level, power-up, or social standing can substitute. This is the product's credibility with adults, and it is non-negotiable.

**Pillar 2 — Earned Advantage.**
Learning performance converts into concrete arcade advantage via power-ups. This is the thesis mechanic and the product's actual differentiation. If we build only one thing well, it is this.

**Pillar 3 — Progress Is Never Lost.**
XP, cards, and levels are monotonic. Streaks have automatic silent grace days. Flow decays one tier instead of collapsing. Failure costs the break, never the session's worth. This is what makes the product safe for Segment A.

**Pillar 4 — Interest is material, not wrapper.**
The theme changes the context of every question and never its rigor. Vocabulary and cognitive demand stay constant across all five themes.

### 6.2 The core loop

```
  ┌─ Quest (20 min) ──────────────────────────────┐
  │  Adaptive question stream, driven by the      │
  │  Skill Graph. Flow Meter builds. Power-ups    │
  │  drop. Focus Boost intercepts repeated        │
  │  mistakes on the same tag.                    │
  └───────────────────────┬───────────────────────┘
                          │
                  ┌───────▼────────┐
                  │  Mastery gate  │   threshold + hint cap
                  └───┬────────┬───┘
              missed  │        │  cleared
        ┌─────────────▼──┐  ┌──▼──────────────────────────┐
        │ Vela debrief   │  │ Hybrid Break (5 min)        │
        │ • XP kept      │  │ • Arcade 2.5 min            │
        │ • Sparks kept  │  │   (power-ups spent here)    │
        │ • Card awarded │  │ • Discover 2.5 min          │
        │ • Named gains  │  │   (3 slots, student picks 1)│
        │ • Tomorrow's   │  │ • Discovery Card awarded    │
        │   plan shown   │  └──────────────┬──────────────┘
        └────────┬───────┘                 │
                 └────────────┬────────────┘
                              ▼
                     Session Summary
              (mastery delta, XP, cards, and a
               visible healthy stopping point)
```

The below-threshold path is built as a **first-class screen, not a fallback**. It is where the product either keeps Segment A or loses them, and it gets the same design investment as the success path.

### 6.3 System layering

Four layers, deliberately separable:

| Layer | Contains | Constraint |
|---|---|---|
| **Academic engine** | Skill Graph, adaptive routing, mastery states, question bank, hint/mistake telemetry | The product. Unchanged from v1.0. Everything above is additive. |
| **Theme layer** | Five interest themes applied to question context, quest names, arcade skins, card sets | May never alter rigor. A rendering concern only. |
| **Game layer** | XP, Sparks, Levels, Flow, power-ups, Codex, Quests, Trials, Crews | Fully tunable. Could be removed without touching the engine. |
| **Guardrail layer** | Ethics constraints, consent state, accessibility, thresholds | Overrides all three above. Not negotiable against engagement. |

**The architectural commitment:** the narrative map is a *rendering* of the Skill Graph, never a replacement for it. Story never dictates sequencing. If the engine routes to a prerequisite, the story accommodates it.

**The service commitment:** the progression economy is authoritative server-side. A client-authoritative economy invites tampering that would destroy the mastery gate's credibility with the adults who approve the product.

### 6.4 Scope

**MVP — the testable core (Plan v2.0 Phases 1–4, ~16 weeks)**
Skill Graph and adaptive routing · themed question bank (Math 200, Reading 200) · quest framing · Flow Meter · power-up drops and arcade consumption · two-then-five arcade games · Discovery Cards and Codex · three-slot enrichment selection · below-threshold debrief · Learner Levels and Outfitter · sector map with Vela · accessibility pass.

**Post-testing (Phases 5–6)**
Constellation Trials · Crews, effort leaderboards, moderation, consent flows · Expeditions · Duels · offline mode · companion customization.

Social and boss systems land *after* student testing deliberately — they should be tuned against observed behavior in the core loop rather than designed blind.

### 6.5 Non-goals for v1

- Instruction delivery — we practice what was taught elsewhere
- Free-text communication between students, in any form, ever
- Any monetization surface inside the student experience
- Curriculum completeness — Math and Reading, grades 6–8, at launch
- A classroom-management or gradebook product

---

## 7. Open Decisions

These are undetermined by the current plans and materially affect the work. Listed in order of how much they block.

| # | Decision | Why it blocks | Owner |
|---|---|---|---|
| 1 | **Distribution and who pays** — school/district purchase vs. direct-to-family vs. free with institutional tier | Changes onboarding, rostering, consent flow, the scope of the teacher branch, and whether Segment A reaches us through a teacher or a parent. The single largest unknown. | TBD |
| 2 | **Standards alignment target** — CCSS, state-specific, or internal competency map | Determines question bank authoring and how the Skill Graph's nodes are defined | TBD |
| 3 | **Content authoring model** | 400 questions × 5 themes plus 48 illustrated cards is a substantial content cost. Human, templated, or hybrid — and who reviews for accuracy | TBD |
| 4 | **Economy tuning source** — Phase 2 telemetry vs. a deliberately generous pilot | Tightening an economy post-launch is historically the more painful direction | TBD |
| 5 | Crew composition — auto by volume, teacher-assigned, or friend-invite | Auto-assignment avoids ability sorting but risks inactive crews | TBD |

*(Plan v2.0 §16.2 holds the remaining game-system open questions.)*

---

## 8. How We Will Know It Worked

**At 8 weeks of student testing:**
- Return-After-Miss Rate > 65% — *the gate on everything else*
- Power-Up Utilization > 80% — if low, Pillar 2 is not landing and the thesis is wrong
- Quest Completion Rate > 70% of accepted quests
- Session Completion Rate > 80%

**At 30 days post-launch:**
- Mastered nodes per active student per week — trending up, reported beside Return-After-Miss
- Student Retention (30-day) > 35%
- Repeated Mistake Resolution > 70% within 2 sessions

**Kill criteria.** If Power-Up Utilization is high but Return-After-Miss stays below 50% after two tuning cycles, the game layer is working and the emotional-safety design is not — which means the product does not serve Segment A, and the premise in §3.4 needs to be rebuilt rather than tuned.

---

*Full system specification: Plan v2.0. Academic guarantees in Plan v2.0 §0.1 are non-negotiable; game systems in §2–§8 are tunable.*
