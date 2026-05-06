import type { GoalId, RoadmapModule } from "../types";

export const roadmaps: Record<GoalId, RoadmapModule[]> = {
  frontend: [
    {
      id: "frontend-foundations",
      goalId: "frontend",
      title: "Web Foundations",
      description: "Create layouts that are semantic, responsive, and easy to maintain.",
      milestone: "Ship a responsive profile page",
      accent: "#38D5F5",
      tasks: [
        {
          id: "frontend-html-semantics",
          title: "Map semantic HTML landmarks",
          description: "Build a page using header, nav, main, section, article, and footer intentionally.",
          estimatedMinutes: 25,
          xp: 25
        },
        {
          id: "frontend-css-layout",
          title: "Practice flex and grid layouts",
          description: "Recreate a dashboard layout with flexible cards and a responsive sidebar pattern.",
          estimatedMinutes: 35,
          xp: 35
        },
        {
          id: "frontend-js-basics",
          title: "Review JavaScript control flow",
          description: "Use arrays, objects, functions, loops, and conditionals to transform UI data.",
          estimatedMinutes: 30,
          xp: 30
        },
        {
          id: "frontend-git-flow",
          title: "Commit a clean Git history",
          description: "Create a feature branch, write meaningful commits, and open a polished README.",
          estimatedMinutes: 20,
          xp: 20
        }
      ]
    },
    {
      id: "frontend-react-core",
      goalId: "frontend",
      title: "React Core",
      description: "Learn how modern interfaces are composed, updated, and validated.",
      milestone: "Build a typed component library",
      accent: "#8B5CF6",
      tasks: [
        {
          id: "frontend-components-props",
          title: "Model reusable components",
          description: "Create Button, Card, Input, and EmptyState components with typed props.",
          estimatedMinutes: 40,
          xp: 40
        },
        {
          id: "frontend-hooks-state",
          title: "Use hooks for UI state",
          description: "Practice useState, useMemo, and custom hooks with a searchable list.",
          estimatedMinutes: 35,
          xp: 35
        },
        {
          id: "frontend-forms-validation",
          title: "Validate a form with Zod",
          description: "Build a signup form with schema validation, field errors, and success feedback.",
          estimatedMinutes: 45,
          xp: 45
        },
        {
          id: "frontend-accessibility",
          title: "Run an accessibility pass",
          description: "Check labels, contrast, keyboard order, focus states, and alternative text.",
          estimatedMinutes: 30,
          xp: 30
        }
      ]
    },
    {
      id: "frontend-product-polish",
      goalId: "frontend",
      title: "Product Polish",
      description: "Make the interface feel designed, resilient, and ready to demo.",
      milestone: "Launch a mini SaaS dashboard",
      accent: "#F472B6",
      tasks: [
        {
          id: "frontend-loading-empty-error",
          title: "Design loading, empty, and error states",
          description: "Create states for a data-heavy screen and make every path feel intentional.",
          estimatedMinutes: 35,
          xp: 35
        },
        {
          id: "frontend-data-fetching",
          title: "Fetch and cache remote data",
          description: "Consume a public API and normalize the response for predictable rendering.",
          estimatedMinutes: 45,
          xp: 45
        },
        {
          id: "frontend-performance-pass",
          title: "Profile render performance",
          description: "Find unnecessary re-renders and use memoization only where it matters.",
          estimatedMinutes: 30,
          xp: 30
        },
        {
          id: "frontend-deploy-demo",
          title: "Publish a live demo",
          description: "Deploy the project, write setup instructions, and add screenshots to the README.",
          estimatedMinutes: 40,
          xp: 40
        }
      ]
    }
  ],
  backend: [
    {
      id: "backend-api-foundations",
      goalId: "backend",
      title: "API Foundations",
      description: "Design predictable HTTP APIs that are easy for clients to consume.",
      milestone: "Ship a typed REST API",
      accent: "#5EEAD4",
      tasks: [
        {
          id: "backend-http-basics",
          title: "Model HTTP resources",
          description: "Define routes, methods, status codes, and request bodies for a task API.",
          estimatedMinutes: 25,
          xp: 25
        },
        {
          id: "backend-node-server",
          title: "Build a Node server",
          description: "Create a small TypeScript service with routing, validation, and structured errors.",
          estimatedMinutes: 45,
          xp: 45
        },
        {
          id: "backend-validation",
          title: "Validate API input",
          description: "Use schemas to reject invalid payloads before they reach business logic.",
          estimatedMinutes: 35,
          xp: 35
        },
        {
          id: "backend-logging",
          title: "Add useful request logs",
          description: "Capture method, path, duration, status, and a request id for every request.",
          estimatedMinutes: 25,
          xp: 25
        }
      ]
    },
    {
      id: "backend-data-auth",
      goalId: "backend",
      title: "Data and Auth",
      description: "Persist data safely and protect user-owned resources.",
      milestone: "Add accounts and protected routes",
      accent: "#2563EB",
      tasks: [
        {
          id: "backend-sql-modeling",
          title: "Design a relational schema",
          description: "Model users, projects, tasks, and completion events with clear relationships.",
          estimatedMinutes: 40,
          xp: 40
        },
        {
          id: "backend-migrations",
          title: "Write database migrations",
          description: "Create migrations and seed data so the app starts consistently on any machine.",
          estimatedMinutes: 35,
          xp: 35
        },
        {
          id: "backend-auth-flow",
          title: "Implement token auth",
          description: "Build login, signup, password hashing, JWT creation, and route protection.",
          estimatedMinutes: 55,
          xp: 55
        },
        {
          id: "backend-permissions",
          title: "Enforce ownership checks",
          description: "Prevent users from reading or changing resources that belong to someone else.",
          estimatedMinutes: 35,
          xp: 35
        }
      ]
    },
    {
      id: "backend-reliability",
      goalId: "backend",
      title: "Reliability",
      description: "Make services observable, tested, and ready for production traffic.",
      milestone: "Deploy with health checks",
      accent: "#A3E635",
      tasks: [
        {
          id: "backend-tests",
          title: "Add integration tests",
          description: "Test the critical happy paths and failure paths against a real test database.",
          estimatedMinutes: 50,
          xp: 50
        },
        {
          id: "backend-background-jobs",
          title: "Create a background job",
          description: "Move an email reminder or report generation flow out of the request cycle.",
          estimatedMinutes: 45,
          xp: 45
        },
        {
          id: "backend-rate-limit",
          title: "Add rate limiting",
          description: "Protect authentication and write endpoints from abuse.",
          estimatedMinutes: 30,
          xp: 30
        },
        {
          id: "backend-deploy-monitor",
          title: "Deploy and monitor",
          description: "Add health checks, environment variables, logs, and a deployment README.",
          estimatedMinutes: 45,
          xp: 45
        }
      ]
    }
  ],
  mobile: [
    {
      id: "mobile-rn-foundations",
      goalId: "mobile",
      title: "React Native Foundations",
      description: "Understand mobile layout, platform constraints, and native-feeling interactions.",
      milestone: "Build a polished two-screen app",
      accent: "#F472B6",
      tasks: [
        {
          id: "mobile-layout-safeareas",
          title: "Master mobile layout basics",
          description: "Use SafeAreaView, ScrollView, keyboard-aware spacing, and density-friendly controls.",
          estimatedMinutes: 30,
          xp: 30
        },
        {
          id: "mobile-components",
          title: "Create reusable mobile components",
          description: "Build cards, buttons, chips, and list rows with touch feedback.",
          estimatedMinutes: 40,
          xp: 40
        },
        {
          id: "mobile-navigation",
          title: "Set up navigation flows",
          description: "Create stack and tab routes with deep-link-ready paths.",
          estimatedMinutes: 35,
          xp: 35
        },
        {
          id: "mobile-state",
          title: "Persist app state",
          description: "Store onboarding, settings, and progress locally using AsyncStorage.",
          estimatedMinutes: 35,
          xp: 35
        }
      ]
    },
    {
      id: "mobile-device-features",
      goalId: "mobile",
      title: "Device Features",
      description: "Use mobile capabilities while keeping permission flows clear.",
      milestone: "Build a utility app with device APIs",
      accent: "#38BDF8",
      tasks: [
        {
          id: "mobile-forms",
          title: "Validate mobile forms",
          description: "Create a form with helpful errors, disabled states, and submit feedback.",
          estimatedMinutes: 35,
          xp: 35
        },
        {
          id: "mobile-camera-media",
          title: "Prototype a media picker flow",
          description: "Design permission messaging and preview selected media in a native-feeling screen.",
          estimatedMinutes: 45,
          xp: 45
        },
        {
          id: "mobile-offline",
          title: "Design offline-first state",
          description: "Queue local changes and show sync status without blocking the user.",
          estimatedMinutes: 45,
          xp: 45
        },
        {
          id: "mobile-haptics-motion",
          title: "Add tasteful feedback",
          description: "Use small transitions, press states, and haptics where they clarify progress.",
          estimatedMinutes: 25,
          xp: 25
        }
      ]
    },
    {
      id: "mobile-release",
      goalId: "mobile",
      title: "Release Craft",
      description: "Prepare an app that looks credible in a GitHub portfolio and on a device.",
      milestone: "Create a release-ready build plan",
      accent: "#A78BFA",
      tasks: [
        {
          id: "mobile-accessibility",
          title: "Run a mobile accessibility pass",
          description: "Check tap targets, contrast, screen reader labels, and dynamic text behavior.",
          estimatedMinutes: 35,
          xp: 35
        },
        {
          id: "mobile-performance",
          title: "Reduce list jank",
          description: "Optimize list rendering, image sizing, and expensive calculations.",
          estimatedMinutes: 40,
          xp: 40
        },
        {
          id: "mobile-readme",
          title: "Write a portfolio README",
          description: "Document features, architecture, screenshots, and Android run instructions.",
          estimatedMinutes: 30,
          xp: 30
        },
        {
          id: "mobile-build",
          title: "Create an Android build checklist",
          description: "List app config, permissions, testing devices, and release tasks.",
          estimatedMinutes: 30,
          xp: 30
        }
      ]
    }
  ],
  python: [
    {
      id: "python-foundations",
      goalId: "python",
      title: "Python Foundations",
      description: "Write clear scripts using core language features and standard library tools.",
      milestone: "Automate a repetitive workflow",
      accent: "#FACC15",
      tasks: [
        {
          id: "python-data-types",
          title: "Practice core data types",
          description: "Use lists, dictionaries, sets, tuples, and comprehensions to transform data.",
          estimatedMinutes: 30,
          xp: 30
        },
        {
          id: "python-functions",
          title: "Refactor into functions",
          description: "Break a messy script into small typed functions with readable names.",
          estimatedMinutes: 30,
          xp: 30
        },
        {
          id: "python-files",
          title: "Read and write files safely",
          description: "Parse CSV and JSON files, handle missing paths, and write clean output.",
          estimatedMinutes: 35,
          xp: 35
        },
        {
          id: "python-cli",
          title: "Build a command-line tool",
          description: "Accept arguments, print helpful errors, and document common commands.",
          estimatedMinutes: 40,
          xp: 40
        }
      ]
    },
    {
      id: "python-apps-apis",
      goalId: "python",
      title: "Apps and APIs",
      description: "Move from scripts to services that other people can use.",
      milestone: "Ship a small API",
      accent: "#38D5F5",
      tasks: [
        {
          id: "python-venv",
          title: "Create a clean project environment",
          description: "Use a virtual environment, dependency file, formatter, and README setup steps.",
          estimatedMinutes: 25,
          xp: 25
        },
        {
          id: "python-fastapi",
          title: "Build a FastAPI endpoint",
          description: "Create typed routes with request validation and response models.",
          estimatedMinutes: 45,
          xp: 45
        },
        {
          id: "python-testing",
          title: "Test critical behavior",
          description: "Write unit tests for pure functions and API tests for important routes.",
          estimatedMinutes: 45,
          xp: 45
        },
        {
          id: "python-errors",
          title: "Handle errors explicitly",
          description: "Use exceptions, logging, and structured error responses without hiding failures.",
          estimatedMinutes: 35,
          xp: 35
        }
      ]
    },
    {
      id: "python-data-automation",
      goalId: "python",
      title: "Data and Automation",
      description: "Build portfolio tools that save time or reveal patterns.",
      milestone: "Publish a useful automation project",
      accent: "#22C55E",
      tasks: [
        {
          id: "python-pandas",
          title: "Analyze a CSV with pandas",
          description: "Clean data, create summary columns, and export a simple report.",
          estimatedMinutes: 45,
          xp: 45
        },
        {
          id: "python-web-scrape",
          title: "Collect public web data responsibly",
          description: "Read a public page or API, respect rate limits, and cache results.",
          estimatedMinutes: 40,
          xp: 40
        },
        {
          id: "python-scheduler",
          title: "Schedule a recurring script",
          description: "Plan how the tool runs daily and logs what changed.",
          estimatedMinutes: 30,
          xp: 30
        },
        {
          id: "python-package",
          title: "Package the project",
          description: "Add project metadata, installation instructions, and an example command.",
          estimatedMinutes: 35,
          xp: 35
        }
      ]
    }
  ],
  cybersecurity: [
    {
      id: "security-foundations",
      goalId: "cybersecurity",
      title: "Security Foundations",
      description: "Build the baseline knowledge needed to reason about systems safely.",
      milestone: "Create a security lab notebook",
      accent: "#FB923C",
      tasks: [
        {
          id: "security-linux",
          title: "Practice Linux navigation",
          description: "Use files, permissions, processes, logs, and shell pipelines in a local lab.",
          estimatedMinutes: 35,
          xp: 35
        },
        {
          id: "security-networking",
          title: "Map network fundamentals",
          description: "Explain IP, DNS, TCP, TLS, ports, and common request flows.",
          estimatedMinutes: 30,
          xp: 30
        },
        {
          id: "security-threat-model",
          title: "Create a threat model",
          description: "Identify assets, actors, trust boundaries, and likely attack paths for a small app.",
          estimatedMinutes: 40,
          xp: 40
        },
        {
          id: "security-crypto-basics",
          title: "Separate hashing from encryption",
          description: "Summarize password hashing, symmetric encryption, and public-key cryptography.",
          estimatedMinutes: 30,
          xp: 30
        }
      ]
    },
    {
      id: "security-web",
      goalId: "cybersecurity",
      title: "Web App Security",
      description: "Learn common vulnerabilities using safe, legal practice environments.",
      milestone: "Write a vulnerability report",
      accent: "#F43F5E",
      tasks: [
        {
          id: "security-owasp",
          title: "Review OWASP Top 10",
          description: "Pick three risks and write how they appear in real product workflows.",
          estimatedMinutes: 35,
          xp: 35
        },
        {
          id: "security-auth",
          title: "Audit an auth flow",
          description: "Check password handling, session expiration, reset flows, and authorization boundaries.",
          estimatedMinutes: 45,
          xp: 45
        },
        {
          id: "security-inputs",
          title: "Find input validation risks",
          description: "Practice identifying injection, XSS, and unsafe file upload patterns.",
          estimatedMinutes: 45,
          xp: 45
        },
        {
          id: "security-report",
          title: "Write a responsible report",
          description: "Document impact, reproduction steps, evidence, and remediation clearly.",
          estimatedMinutes: 35,
          xp: 35
        }
      ]
    },
    {
      id: "security-defense",
      goalId: "cybersecurity",
      title: "Defensive Practice",
      description: "Investigate events, reduce risk, and communicate what changed.",
      milestone: "Build a blue-team dashboard",
      accent: "#A3E635",
      tasks: [
        {
          id: "security-logs",
          title: "Read security logs",
          description: "Inspect login events and classify normal, suspicious, and confirmed issues.",
          estimatedMinutes: 35,
          xp: 35
        },
        {
          id: "security-hardening",
          title: "Create a hardening checklist",
          description: "List practical controls for secrets, dependencies, headers, and admin access.",
          estimatedMinutes: 35,
          xp: 35
        },
        {
          id: "security-detection",
          title: "Design a detection rule",
          description: "Define what event pattern should alert and what the responder should check next.",
          estimatedMinutes: 40,
          xp: 40
        },
        {
          id: "security-portfolio",
          title: "Publish a safe lab write-up",
          description: "Show your method and learning without publishing harmful exploit details.",
          estimatedMinutes: 35,
          xp: 35
        }
      ]
    }
  ],
  data: [
    {
      id: "data-foundations",
      goalId: "data",
      title: "Analysis Foundations",
      description: "Ask better questions and clean data before drawing conclusions.",
      milestone: "Create a data quality report",
      accent: "#A3E635",
      tasks: [
        {
          id: "data-question",
          title: "Frame an analysis question",
          description: "Turn a vague business question into measurable dimensions, metrics, and filters.",
          estimatedMinutes: 25,
          xp: 25
        },
        {
          id: "data-spreadsheet-cleaning",
          title: "Clean a messy spreadsheet",
          description: "Handle duplicates, missing values, inconsistent categories, and date formats.",
          estimatedMinutes: 40,
          xp: 40
        },
        {
          id: "data-basic-stats",
          title: "Compute useful summary stats",
          description: "Calculate mean, median, percentiles, counts, and rates without overclaiming.",
          estimatedMinutes: 30,
          xp: 30
        },
        {
          id: "data-document-findings",
          title: "Write first findings",
          description: "Summarize what changed, what matters, and what needs more evidence.",
          estimatedMinutes: 30,
          xp: 30
        }
      ]
    },
    {
      id: "data-sql-python",
      goalId: "data",
      title: "SQL and Python",
      description: "Pull reliable datasets and automate repeatable analysis.",
      milestone: "Build a reproducible notebook",
      accent: "#14B8A6",
      tasks: [
        {
          id: "data-sql-select",
          title: "Practice SELECT queries",
          description: "Use filters, joins, grouping, sorting, and basic window functions.",
          estimatedMinutes: 45,
          xp: 45
        },
        {
          id: "data-sql-questions",
          title: "Answer five business questions with SQL",
          description: "Write queries that connect directly to a decision someone could make.",
          estimatedMinutes: 45,
          xp: 45
        },
        {
          id: "data-python-pandas",
          title: "Clean data with pandas",
          description: "Load a CSV, type columns, remove noise, and create an analysis-ready table.",
          estimatedMinutes: 45,
          xp: 45
        },
        {
          id: "data-notebook",
          title: "Make a reproducible notebook",
          description: "Structure code, markdown, charts, and assumptions so another person can follow.",
          estimatedMinutes: 40,
          xp: 40
        }
      ]
    },
    {
      id: "data-visual-story",
      goalId: "data",
      title: "Visualization and Story",
      description: "Choose charts that clarify decisions instead of decorating numbers.",
      milestone: "Publish a dashboard case study",
      accent: "#38D5F5",
      tasks: [
        {
          id: "data-chart-choice",
          title: "Choose chart types intentionally",
          description: "Match comparison, trend, distribution, and composition questions to useful charts.",
          estimatedMinutes: 30,
          xp: 30
        },
        {
          id: "data-dashboard",
          title: "Build a dashboard wireframe",
          description: "Place the highest-leverage metrics first and keep supporting charts scannable.",
          estimatedMinutes: 35,
          xp: 35
        },
        {
          id: "data-storytelling",
          title: "Write an executive narrative",
          description: "Lead with the answer, then show evidence, caveats, and next actions.",
          estimatedMinutes: 35,
          xp: 35
        },
        {
          id: "data-portfolio-case",
          title: "Publish a portfolio case study",
          description: "Document the question, data prep, analysis, insights, and recommendations.",
          estimatedMinutes: 45,
          xp: 45
        }
      ]
    }
  ]
};

export const getRoadmap = (goalId: GoalId) => roadmaps[goalId];
