import type { GoalId, QuizQuestion } from "../types";

export const quizzes: Record<GoalId, QuizQuestion[]> = {
  frontend: [
    {
      id: "frontend-q1",
      question: "Which HTML element best wraps the primary unique content of a page?",
      options: ["<section>", "<main>", "<article>", "<aside>"],
      correctIndex: 1,
      explanation: "<main> identifies the dominant content area and should usually appear once per page."
    },
    {
      id: "frontend-q2",
      question: "What is the main benefit of TypeScript in a React codebase?",
      options: ["It replaces CSS", "It catches shape and type mistakes earlier", "It removes the need for tests", "It makes every render faster"],
      correctIndex: 1,
      explanation: "TypeScript makes component props, data models, and function contracts easier to verify before runtime."
    },
    {
      id: "frontend-q3",
      question: "Which React hook is best for deriving a filtered list from existing state?",
      options: ["useMemo", "useRef", "useLayoutEffect", "useImperativeHandle"],
      correctIndex: 0,
      explanation: "useMemo can avoid recalculating derived values when the inputs have not changed."
    },
    {
      id: "frontend-q4",
      question: "What should an accessible icon-only button include?",
      options: ["A larger border radius", "An accessible label", "A random title", "A hidden image"],
      correctIndex: 1,
      explanation: "Screen readers need a clear label describing the action, such as Save or Open menu."
    },
    {
      id: "frontend-q5",
      question: "Which state is most often forgotten in portfolio UI demos?",
      options: ["Hover state", "Empty and error states", "Dark mode", "A footer"],
      correctIndex: 1,
      explanation: "Empty and error states show product maturity because real data flows are rarely perfect."
    }
  ],
  backend: [
    {
      id: "backend-q1",
      question: "Which status code is most appropriate after successfully creating a resource?",
      options: ["200", "201", "301", "500"],
      correctIndex: 1,
      explanation: "201 Created communicates that a new resource was created successfully."
    },
    {
      id: "backend-q2",
      question: "Why should API input be validated before business logic runs?",
      options: ["To improve icon rendering", "To reject invalid or unsafe payloads early", "To disable logging", "To skip authentication"],
      correctIndex: 1,
      explanation: "Validation protects downstream code from unexpected shapes and gives clients clearer errors."
    },
    {
      id: "backend-q3",
      question: "What does a database migration primarily help with?",
      options: ["Tracking schema changes", "Encrypting every request", "Replacing tests", "Compressing images"],
      correctIndex: 0,
      explanation: "Migrations make schema changes repeatable across local, test, and production environments."
    },
    {
      id: "backend-q4",
      question: "What is an ownership check?",
      options: ["Confirming a user can access a specific resource", "Checking who wrote the README", "Naming the database owner", "Increasing request timeouts"],
      correctIndex: 0,
      explanation: "Authentication says who the user is; authorization checks what that user may access."
    },
    {
      id: "backend-q5",
      question: "Which endpoint is useful for deployment monitoring?",
      options: ["/health", "/random", "/signup-only", "/delete-all"],
      correctIndex: 0,
      explanation: "A health endpoint lets infrastructure confirm the service is alive and ready."
    }
  ],
  mobile: [
    {
      id: "mobile-q1",
      question: "Why are safe areas important in mobile apps?",
      options: ["They avoid notches, system bars, and rounded screen edges", "They speed up JavaScript", "They replace navigation", "They remove all padding"],
      correctIndex: 0,
      explanation: "Safe areas keep content from colliding with device hardware and operating system UI."
    },
    {
      id: "mobile-q2",
      question: "What should a good mobile tap target prioritize?",
      options: ["Tiny controls", "Readable size and spacing", "Only text links", "Invisible borders"],
      correctIndex: 1,
      explanation: "Comfortable touch targets reduce mistakes and make Android usage feel natural."
    },
    {
      id: "mobile-q3",
      question: "What is AsyncStorage best suited for in this app?",
      options: ["Local lightweight persistence", "Video rendering", "Native build signing", "Replacing TypeScript"],
      correctIndex: 0,
      explanation: "AsyncStorage is useful for small persisted app state such as onboarding and progress."
    },
    {
      id: "mobile-q4",
      question: "Which pattern helps lists stay smooth?",
      options: ["Render every item in a giant ScrollView", "Use list components and stable item keys", "Recalculate heavy data on every render", "Use only images"],
      correctIndex: 1,
      explanation: "Stable keys and list components help React Native update long lists predictably."
    },
    {
      id: "mobile-q5",
      question: "What makes a portfolio mobile app more credible?",
      options: ["Only a landing page", "Real states, persistence, navigation, and screenshots", "No README", "Hard-coded errors"],
      correctIndex: 1,
      explanation: "A mobile portfolio app should behave like a real product, not just a static mock."
    }
  ],
  python: [
    {
      id: "python-q1",
      question: "Which Python data type is best for key-value lookups?",
      options: ["list", "tuple", "dict", "str"],
      correctIndex: 2,
      explanation: "Dictionaries store values by key and are ideal for labeled records or lookup tables."
    },
    {
      id: "python-q2",
      question: "Why create a virtual environment for a Python project?",
      options: ["To isolate dependencies", "To delete all tests", "To make Python unavailable", "To replace Git"],
      correctIndex: 0,
      explanation: "Virtual environments keep project dependencies separate from system Python packages."
    },
    {
      id: "python-q3",
      question: "What does pandas commonly help with?",
      options: ["Data cleaning and analysis", "Rendering native Android views", "Managing DNS", "Creating passwords"],
      correctIndex: 0,
      explanation: "pandas is widely used to load, clean, transform, and summarize tabular data."
    },
    {
      id: "python-q4",
      question: "What makes a CLI tool easier to use?",
      options: ["No help text", "Clear arguments and helpful errors", "Only global variables", "Silent failures"],
      correctIndex: 1,
      explanation: "Good CLI tools explain required inputs and fail clearly when something is wrong."
    },
    {
      id: "python-q5",
      question: "Which testing approach is best for a pure function?",
      options: ["Manual clicking", "Unit tests with expected inputs and outputs", "Changing production data", "Ignoring edge cases"],
      correctIndex: 1,
      explanation: "Pure functions are excellent candidates for focused unit tests."
    }
  ],
  cybersecurity: [
    {
      id: "security-q1",
      question: "What is the safest place to practice security techniques?",
      options: ["Random public systems", "Legal labs and owned environments", "A stranger's website", "Production banking apps"],
      correctIndex: 1,
      explanation: "Security practice must stay legal and ethical by using systems you own or have permission to test."
    },
    {
      id: "security-q2",
      question: "Which concept describes a boundary where trust changes?",
      options: ["Trust boundary", "Color palette", "Package lock", "Line height"],
      correctIndex: 0,
      explanation: "Threat modeling uses trust boundaries to identify where data crosses into less trusted areas."
    },
    {
      id: "security-q3",
      question: "Why are passwords hashed instead of encrypted for storage?",
      options: ["Hashing is one-way and reduces exposure if the database leaks", "Hashing makes login impossible", "Encryption has no use", "It improves CSS"],
      correctIndex: 0,
      explanation: "Password hashes are designed so the original password is not recoverable from stored data."
    },
    {
      id: "security-q4",
      question: "What should a responsible vulnerability report include?",
      options: ["Insults", "Impact, reproduction, evidence, and remediation", "Only screenshots", "Secret keys"],
      correctIndex: 1,
      explanation: "A useful report explains the issue clearly and helps the owner fix it safely."
    },
    {
      id: "security-q5",
      question: "Which activity belongs to defensive security?",
      options: ["Reading logs for suspicious activity", "Publishing private tokens", "Bypassing permission without consent", "Deleting audit trails"],
      correctIndex: 0,
      explanation: "Log review and detection are core blue-team practices."
    }
  ],
  data: [
    {
      id: "data-q1",
      question: "What should come before choosing charts?",
      options: ["A clear analysis question", "A random color palette", "A larger logo", "Deleting raw data"],
      correctIndex: 0,
      explanation: "Good analysis starts by defining the decision or question the data should inform."
    },
    {
      id: "data-q2",
      question: "Which SQL clause groups rows for aggregate calculations?",
      options: ["ORDER BY", "GROUP BY", "WHERE", "LIMIT"],
      correctIndex: 1,
      explanation: "GROUP BY lets you calculate aggregates such as counts or averages per category."
    },
    {
      id: "data-q3",
      question: "What is a common risk when handling missing values?",
      options: ["Assuming they are meaningless without investigation", "Documenting the decision", "Checking patterns", "Showing caveats"],
      correctIndex: 0,
      explanation: "Missing values can reveal collection issues or important behavior and should be handled deliberately."
    },
    {
      id: "data-q4",
      question: "Which chart is usually best for showing change over time?",
      options: ["Line chart", "Pie chart", "Word cloud", "Gauge only"],
      correctIndex: 0,
      explanation: "Line charts make trends and changes over time easy to scan."
    },
    {
      id: "data-q5",
      question: "What makes an analytics portfolio case study stronger?",
      options: ["Only final charts", "Question, data prep, assumptions, insights, and recommendations", "No caveats", "Unlabeled axes"],
      correctIndex: 1,
      explanation: "A strong case study shows the full reasoning path, not only the finished visual."
    }
  ]
};
