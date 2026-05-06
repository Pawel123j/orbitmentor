import type { GoalId, PortfolioIdea } from "../types";

export const portfolioIdeas: Record<GoalId, PortfolioIdea[]> = {
  frontend: [
    {
      id: "frontend-project-saas-dashboard",
      goalId: "frontend",
      title: "Founder Metrics Dashboard",
      description: "A responsive analytics dashboard for a fictional SaaS founder tracking signups, churn, and feature usage.",
      difficulty: "Core",
      skills: ["React", "TypeScript", "Charts", "Responsive UI", "Empty states"],
      readmeSummary: "A premium SaaS dashboard with metric cards, filtered charts, loading states, and a documented component system."
    },
    {
      id: "frontend-project-design-system",
      goalId: "frontend",
      title: "Micro Design System",
      description: "A small design system with buttons, inputs, cards, toasts, tabs, and usage examples.",
      difficulty: "Starter",
      skills: ["Components", "Accessibility", "Story examples", "Theming"],
      readmeSummary: "A reusable UI kit focused on accessible states, typed props, and realistic examples a hiring manager can inspect quickly."
    },
    {
      id: "frontend-project-job-tracker",
      goalId: "frontend",
      title: "Developer Job Tracker",
      description: "A kanban-style tracker for applications, interviews, follow-ups, and networking notes.",
      difficulty: "Core",
      skills: ["Forms", "State management", "Drag interactions", "Local persistence"],
      readmeSummary: "A polished job-search workflow app with saved filters, status columns, validation, and progress summaries."
    }
  ],
  backend: [
    {
      id: "backend-project-api",
      goalId: "backend",
      title: "Learning Habit API",
      description: "A REST API for habits, streaks, reminders, and weekly summaries.",
      difficulty: "Core",
      skills: ["Node", "SQL", "Auth", "Validation", "Testing"],
      readmeSummary: "A production-minded API with typed routes, migrations, JWT auth, ownership checks, and integration tests."
    },
    {
      id: "backend-project-webhooks",
      goalId: "backend",
      title: "Webhook Inbox",
      description: "A developer tool for receiving, inspecting, retrying, and documenting webhook payloads.",
      difficulty: "Stretch",
      skills: ["Queues", "Logging", "Retries", "Rate limits"],
      readmeSummary: "A backend utility that demonstrates reliable event handling, retry strategy, request logs, and a practical developer UX."
    },
    {
      id: "backend-project-feature-flags",
      goalId: "backend",
      title: "Feature Flag Service",
      description: "A small service for projects, environments, user targeting, and audit history.",
      difficulty: "Stretch",
      skills: ["API design", "Permissions", "Audit logs", "Caching"],
      readmeSummary: "A feature flag API with environment scoping, permission checks, audit trails, and deployment documentation."
    }
  ],
  mobile: [
    {
      id: "mobile-project-pocket-coach",
      goalId: "mobile",
      title: "Pocket Coach",
      description: "A habit and learning coach app with onboarding, daily cards, streaks, and offline persistence.",
      difficulty: "Core",
      skills: ["Expo Router", "Zustand", "AsyncStorage", "Mobile UI", "Android polish"],
      readmeSummary: "An Android-first Expo app with onboarding, tabs, persisted progress, refined dark UI, and screenshots from a real device."
    },
    {
      id: "mobile-project-field-notes",
      goalId: "mobile",
      title: "Field Notes",
      description: "A mobile note-taking app for inspections with checklists, photos, and local draft states.",
      difficulty: "Stretch",
      skills: ["Forms", "Media picker", "Offline UX", "Permissions"],
      readmeSummary: "A field workflow app that shows mobile form craft, permission design, image previews, and sync-ready architecture."
    },
    {
      id: "mobile-project-budget",
      goalId: "mobile",
      title: "Tiny Budget",
      description: "A personal budget tracker with recurring categories, monthly summaries, and visual spending feedback.",
      difficulty: "Core",
      skills: ["Charts", "State", "Forms", "Data visualization"],
      readmeSummary: "A polished financial utility app with native-feeling inputs, monthly insights, reusable components, and local-first data."
    }
  ],
  python: [
    {
      id: "python-project-inbox-automation",
      goalId: "python",
      title: "Inbox Summary CLI",
      description: "A command-line tool that turns exported email or ticket CSVs into a priority summary.",
      difficulty: "Core",
      skills: ["CLI", "CSV", "pandas", "Testing", "Packaging"],
      readmeSummary: "A Python CLI that cleans exported data, groups messages by urgency, and produces a readable daily summary report."
    },
    {
      id: "python-project-price-watch",
      goalId: "python",
      title: "Price Watcher",
      description: "A scheduled scraper or API client that tracks product prices and reports meaningful changes.",
      difficulty: "Stretch",
      skills: ["HTTP", "Scheduling", "Caching", "Logging"],
      readmeSummary: "A responsible automation project with cached requests, rate-limit awareness, change detection, and a documented runbook."
    },
    {
      id: "python-project-api",
      goalId: "python",
      title: "Personal Knowledge API",
      description: "A FastAPI service for notes, tags, search, and lightweight analytics.",
      difficulty: "Core",
      skills: ["FastAPI", "Pydantic", "SQLite", "Tests"],
      readmeSummary: "A typed Python API with validation, search endpoints, SQLite persistence, and tests that prove the core behavior."
    }
  ],
  cybersecurity: [
    {
      id: "security-project-hardening-checklist",
      goalId: "cybersecurity",
      title: "App Hardening Checklist",
      description: "A structured checklist and report generator for reviewing a small web app's security posture.",
      difficulty: "Starter",
      skills: ["Threat modeling", "OWASP", "Documentation", "Risk scoring"],
      readmeSummary: "A safe blue-team project that turns security review notes into clear priorities, evidence, and remediation tasks."
    },
    {
      id: "security-project-log-analyzer",
      goalId: "cybersecurity",
      title: "Login Log Analyzer",
      description: "A defensive tool that flags suspicious login patterns from sample logs.",
      difficulty: "Core",
      skills: ["Log parsing", "Detection rules", "Python", "Visualization"],
      readmeSummary: "A defensive analytics project with sample data, detection logic, explainable alerts, and a clean incident summary."
    },
    {
      id: "security-project-lab-notes",
      goalId: "cybersecurity",
      title: "Safe Security Lab Notes",
      description: "A curated set of legal lab walkthroughs focused on lessons, mitigations, and responsible reporting.",
      difficulty: "Core",
      skills: ["Linux", "Networking", "Web security", "Reporting"],
      readmeSummary: "A professional security learning journal that emphasizes ethics, defensive value, and clear remediation guidance."
    }
  ],
  data: [
    {
      id: "data-project-customer-retention",
      goalId: "data",
      title: "Customer Retention Analysis",
      description: "Analyze fictional subscription data to find churn patterns and recommend retention experiments.",
      difficulty: "Core",
      skills: ["SQL", "pandas", "Visualization", "Business storytelling"],
      readmeSummary: "A full analytics case study with question framing, data cleaning, cohort trends, churn signals, and recommendations."
    },
    {
      id: "data-project-city-dashboard",
      goalId: "data",
      title: "City Services Dashboard",
      description: "Build a dashboard from open civic-style data covering requests, response times, and neighborhoods.",
      difficulty: "Stretch",
      skills: ["Dashboards", "Data cleaning", "Charts", "Maps"],
      readmeSummary: "A public-service analytics project with cleaned data, meaningful KPIs, chart rationale, and accessible dashboard design."
    },
    {
      id: "data-project-sales-story",
      goalId: "data",
      title: "Sales Performance Story",
      description: "Create a notebook and executive summary explaining revenue movement across regions and product lines.",
      difficulty: "Starter",
      skills: ["Spreadsheets", "SQL", "Narrative", "Chart selection"],
      readmeSummary: "A concise analytics narrative that leads with insights, explains assumptions, and turns numbers into clear next actions."
    }
  ]
};
