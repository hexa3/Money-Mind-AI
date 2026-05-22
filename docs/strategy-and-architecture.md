# Strategy and Architecture

## Phase 1: Product Analysis
Target users:
- High-school students who need practical money judgment before graduation.
- Teachers who want finance lessons that are measurable and engaging.
- Hackathon judges looking for a clear fintech + education story with a working prototype.

Pain points:
- Finance education is often passive and abstract.
- Students face scams, debt, credit, subscriptions, and investing pressure before they understand consequences.
- Teachers lack fast analytics showing who understands the lesson and who needs help.

Competitive advantages:
- Simulation-first learning instead of another budgeting tracker.
- AI explanations after choices, not generic lectures before choices.
- Four-score feedback model: money, happiness, knowledge, risk.
- Classroom analytics connect student practice to teacher action.

Why judges should care:
- The problem is universal, urgent, and easy to understand in under five minutes.
- The prototype has multiple working surfaces that reinforce one coherent story.
- The fallback AI engine makes the demo reliable even without API secrets.

## Phase 2: Architecture
Folder structure:
- `src/app`: Next.js App Router pages and Auth.js route.
- `src/components/ui`: reusable UI primitives.
- `src/components/layout`: navigation and page headers.
- `src/components/features`: simulator, tutor, scam detector, quests, future visualizer.
- `src/lib`: typed domain models, financial engine, demo data, utilities.
- `src/lib/actions`: server actions for AI-adjacent workflows.
- `src/store`: Zustand persisted learner progress.
- `supabase/schema.sql`: PostgreSQL schema and starter RLS policies.

Database:
- `profiles`: students and teachers.
- `classrooms`: teacher-owned classes.
- `classroom_members`: student enrollment.
- `progress_snapshots`: score, XP, streak, and level history.
- `scenario_attempts`: simulator decisions and consequences.
- `assignments`: teacher-assigned challenges.

API and actions:
- `generateScenarioAction`: profile-validated scenario generation.
- `resolveChoiceAction`: typed consequence scoring.
- `tutorAction`: conversational concept explanations.
- `scamDetectorAction`: scam score, suspicious phrases, safety breakdown.
- `futureTimelineAction`: projected timeline and milestones.

State:
- Zustand persists `scores`, `xp`, `streak`, `level`, and `achievements`.
- Server-side schema is ready for Supabase persistence when credentials are added.

User flows:
- Landing page to simulator for instant wow.
- Dashboard to quests and achievements for gamification.
- Scam Detector to a fast, memorable fintech safety demo.
- Future Visualizer to long-term planning.
- Teacher Dashboard to classroom impact and analytics.

## Phase 3: Implementation Roadmap
Milestone 1: Scaffold Next.js 15, TypeScript, Tailwind, app routes.

Milestone 2: Build design system, navigation, glassmorphism visual language, responsive shell.

Milestone 3: Implement typed financial engine, scenario bank, scoring, XP, achievements.

Milestone 4: Build user-facing features: simulator, quests, tutor, scam detector, future visualizer.

Milestone 5: Add teacher dashboard, Auth.js demo login, Supabase schema, environment configuration.

Milestone 6: Run lint, production build, browser smoke tests, security review, and create hackathon materials.
