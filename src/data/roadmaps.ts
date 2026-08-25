export type RoadmapNode = {
  id: string;
  title: string;
  short?: string;
  description: string;
  type?: 'core' | 'project' | 'career' | 'optional';
  tags?: string[];
  prerequisites?: string[];
  links?: { label: string; href: string }[];
};

export type RoadmapPhase = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  goal: string;
  nodes: RoadmapNode[];
};

export type RoadmapVisual = {
  slug: string;
  tagline: string;
  outcome: string;
  phases: RoadmapPhase[];
};

const blog = (label: string, slug: string) => ({ label, href: `/blog/${slug}/` });
const project = (label: string, slug: string) => ({ label, href: `/projects/${slug}/` });
const career = (label: string, slug: string) => ({ label, href: `/careers/${slug}/` });

export const roadmapVisuals: RoadmapVisual[] = [
  {
    slug: 'ai-engineer',
    tagline: 'From strong software fundamentals to production AI systems.',
    outcome: 'Build, evaluate, deploy, and improve real AI-powered products.',
    phases: [
      {
        id: 'ai-01', number: '01', title: 'Foundations', subtitle: 'Programming + CS',
        goal: 'Become dangerous with code before touching advanced AI tooling.',
        nodes: [
          { id: 'ai-python', title: 'Python', description: 'Master functions, modules, OOP, typing, environments, testing, debugging, and package management.', tags: ['Python', 'Core'], links: [blog('What Is an AI Engineer?', 'what-is-an-ai-engineer')] },
          { id: 'ai-cpp', title: 'C++ + DSA', description: 'Use C++ to build problem-solving ability and understand core data structures and algorithms.', tags: ['C++', 'DSA'] },
          { id: 'ai-linux', title: 'Linux + Git', description: 'Work comfortably from the terminal, use Git properly, and understand developer workflows.', tags: ['Linux', 'Git'] },
          { id: 'ai-problem', title: 'Problem Solving', description: 'Practice decomposition, complexity analysis, debugging, and writing maintainable solutions.', tags: ['CS Fundamentals'] },
        ],
      },
      {
        id: 'ai-02', number: '02', title: 'Software Engineering', subtitle: 'Build reliable services',
        goal: 'Turn AI ideas into maintainable software.',
        nodes: [
          { id: 'ai-http', title: 'HTTP + APIs', description: 'Understand requests, responses, REST, JSON, authentication, validation, and failures.', tags: ['Backend', 'APIs'] },
          { id: 'ai-db', title: 'SQL + Databases', description: 'Learn relational modeling, queries, indexing, transactions, and persistence.', tags: ['SQL', 'Databases'] },
          { id: 'ai-fastapi', title: 'Backend with FastAPI', description: 'Build production-style Python APIs with validation, dependency management, and tests.', tags: ['FastAPI', 'Python'] },
          { id: 'ai-quality', title: 'Testing + Observability', description: 'Add unit tests, logging, error handling, retries, and useful diagnostics.', tags: ['Testing', 'Reliability'] },
        ],
      },
      {
        id: 'ai-03', number: '03', title: 'Math + Machine Learning', subtitle: 'Understand the models',
        goal: 'Build enough mathematical intuition to reason about ML systems.',
        nodes: [
          { id: 'ai-linear', title: 'Linear Algebra', description: 'Vectors, matrices, norms, transformations, and the intuition behind embeddings and neural networks.', tags: ['Math'] },
          { id: 'ai-prob', title: 'Probability + Statistics', description: 'Distributions, expectation, variance, sampling, uncertainty, and evaluation.', tags: ['Math'] },
          { id: 'ai-ml', title: 'Machine Learning', description: 'Regression, classification, feature engineering, validation, regularization, and model selection.', tags: ['ML'], links: [blog('Machine Learning Guide', 'machine-learning-guide')] },
          { id: 'ai-eval', title: 'Model Evaluation', description: 'Choose metrics, create baselines, detect leakage, and reason about generalization.', tags: ['Evaluation'] },
        ],
      },
      {
        id: 'ai-04', number: '04', title: 'Deep Learning', subtitle: 'Neural networks',
        goal: 'Understand and train modern neural models.',
        nodes: [
          { id: 'ai-nn', title: 'Neural Networks', description: 'Forward passes, loss functions, backpropagation, optimization, and regularization.', tags: ['Deep Learning'] },
          { id: 'ai-pytorch', title: 'PyTorch', description: 'Datasets, dataloaders, training loops, checkpoints, and experimentation.', tags: ['PyTorch'] },
          { id: 'ai-cvnlp', title: 'CV + NLP Basics', description: 'Understand the major patterns used in image and language tasks.', tags: ['CV', 'NLP'] },
          { id: 'ai-exp', title: 'Experiments', description: 'Track runs, compare baselines, and turn experiments into reproducible evidence.', tags: ['Research'] },
        ],
      },
      {
        id: 'ai-05', number: '05', title: 'LLM Engineering', subtitle: 'Build with modern models',
        goal: 'Move from model APIs to robust LLM applications.',
        nodes: [
          { id: 'ai-llm', title: 'LLM Fundamentals', description: 'Tokens, context windows, embeddings, inference, prompting, and model limitations.', tags: ['LLMs'], links: [blog('LLMs Guide', 'llms-guide')] },
          { id: 'ai-rag', title: 'RAG Systems', description: 'Chunking, embeddings, retrieval, reranking, context construction, and citations.', tags: ['RAG'] },
          { id: 'ai-agents', title: 'Tools + Agents', description: 'Design tool use, state, workflows, guardrails, and failure handling.', tags: ['Agents'] },
          { id: 'ai-llmeval', title: 'LLM Evaluation', description: 'Evaluate quality, groundedness, latency, cost, safety, and regressions.', tags: ['Evaluation'] },
        ],
      },
      {
        id: 'ai-06', number: '06', title: 'Production AI', subtitle: 'Ship and operate',
        goal: 'Turn prototypes into reliable systems.',
        nodes: [
          { id: 'ai-docker', title: 'Docker + Deployment', description: 'Containerize applications and understand deployment environments.', tags: ['Docker', 'Deployment'] },
          { id: 'ai-cloud', title: 'Cloud Fundamentals', description: 'Compute, storage, networking, secrets, managed services, and cost awareness.', tags: ['Cloud'] },
          { id: 'ai-mlops', title: 'MLOps + Monitoring', description: 'Versioning, pipelines, monitoring, drift, rollbacks, and incident thinking.', tags: ['MLOps'] },
          { id: 'ai-system', title: 'AI System Design', description: 'Design end-to-end AI architectures with trade-offs around scale, latency, quality, and cost.', tags: ['System Design'] },
        ],
      },
      {
        id: 'ai-07', number: '07', title: 'Proof of Work', subtitle: 'Projects + career',
        goal: 'Turn learning into visible evidence.',
        nodes: [
          { id: 'ai-project1', title: 'Build an AI Application', type: 'project', description: 'Ship one complete AI application from requirements to deployment.', tags: ['Project'], links: [project('AI Research Assistant', 'ai-research-assistant')] },
          { id: 'ai-project2', title: 'Build a Production-Style System', type: 'project', description: 'Add auth, storage, observability, evaluation, deployment, and documentation.', tags: ['Portfolio'] },
          { id: 'ai-resume', title: 'Portfolio + Resume', type: 'career', description: 'Present projects with measurable outcomes, architecture decisions, GitHub, and demos.', tags: ['Career'] },
          { id: 'ai-interview', title: 'Interview Preparation', type: 'career', description: 'Combine DSA, ML fundamentals, system design, and project deep-dives.', tags: ['Interviews'], links: [career('Interview Roadmap', 'interviews')] },
        ],
      },
    ],
  },
  {
    slug: 'ml-engineer',
    tagline: 'From statistics and classical ML to production machine learning.',
    outcome: 'Build models that are measured correctly and deployed responsibly.',
    phases: [
      {
        id: 'ml-01', number: '01', title: 'Python + Data', subtitle: 'Prepare the data', goal: 'Become fluent in the tools used to inspect and transform data.', nodes: [
          { id: 'ml-python', title: 'Python for ML', description: 'Write clean Python and work confidently with environments, functions, modules, and testing.', tags: ['Python'] },
          { id: 'ml-numpy', title: 'NumPy + Pandas', description: 'Manipulate arrays, tables, missing values, joins, grouping, and vectorized operations.', tags: ['NumPy', 'Pandas'] },
          { id: 'ml-viz', title: 'Visualization + EDA', description: 'Explore distributions, relationships, outliers, and data quality before modeling.', tags: ['EDA'] },
        ]
      },
      {
        id: 'ml-02', number: '02', title: 'Math + Statistics', subtitle: 'Reason about uncertainty', goal: 'Develop the mathematical intuition required to understand model behavior.', nodes: [
          { id: 'ml-linear', title: 'Linear Algebra', description: 'Vectors, matrices, projections, norms, and dimensionality reduction intuition.', tags: ['Math'] },
          { id: 'ml-prob', title: 'Probability', description: 'Conditional probability, distributions, expectation, variance, and Bayes reasoning.', tags: ['Probability'] },
          { id: 'ml-stat', title: 'Statistics', description: 'Sampling, confidence intervals, hypothesis tests, correlation, and experimental reasoning.', tags: ['Statistics'] },
        ]
      },
      {
        id: 'ml-03', number: '03', title: 'Classical ML', subtitle: 'Learn the core algorithms', goal: 'Understand how and when to use the major supervised and unsupervised approaches.', nodes: [
          { id: 'ml-reg', title: 'Regression', description: 'Linear, regularized, and tree-based regression with proper validation.', tags: ['Regression'] },
          { id: 'ml-clf', title: 'Classification', description: 'Logistic regression, trees, ensembles, margins, and class imbalance.', tags: ['Classification'] },
          { id: 'ml-ens', title: 'Ensembles', description: 'Random forests, gradient boosting, bagging, and the bias-variance trade-off.', tags: ['Ensembles'] },
          { id: 'ml-unsup', title: 'Unsupervised Learning', description: 'Clustering, dimensionality reduction, and anomaly detection.', tags: ['Unsupervised'] },
        ]
      },
      {
        id: 'ml-04', number: '04', title: 'Evaluation + Features', subtitle: 'Make models trustworthy', goal: 'Build robust validation and meaningful features.', nodes: [
          { id: 'ml-feature', title: 'Feature Engineering', description: 'Transform raw inputs into useful, leakage-safe features.', tags: ['Features'] },
          { id: 'ml-validation', title: 'Validation', description: 'Cross-validation, train/validation/test design, leakage prevention, and error analysis.', tags: ['Evaluation'] },
          { id: 'ml-tuning', title: 'Tuning + Selection', description: 'Hyperparameters, baselines, model comparison, and reproducibility.', tags: ['Optimization'] },
        ]
      },
      {
        id: 'ml-05', number: '05', title: 'Deep Learning', subtitle: 'Modern neural models', goal: 'Move beyond tabular ML when the problem demands it.', nodes: [
          { id: 'ml-nn', title: 'Neural Networks', description: 'Optimization, activations, loss functions, regularization, and backpropagation.', tags: ['DL'] },
          { id: 'ml-pytorch', title: 'PyTorch', description: 'Train, evaluate, checkpoint, and iterate on neural models.', tags: ['PyTorch'] },
          { id: 'ml-special', title: 'Choose a Specialty', description: 'Go deeper into NLP, computer vision, time series, or recommender systems.', tags: ['Specialization'], type: 'optional' },
        ]
      },
      {
        id: 'ml-06', number: '06', title: 'Production ML', subtitle: 'Operate the system', goal: 'Ship models as reliable software.', nodes: [
          { id: 'ml-api', title: 'Model APIs', description: 'Serve predictions through reliable APIs with validation and error handling.', tags: ['APIs'] },
          { id: 'ml-docker', title: 'Containers + Cloud', description: 'Package and deploy ML workloads with cost and reliability awareness.', tags: ['Deployment'] },
          { id: 'ml-monitor', title: 'Monitoring + Drift', description: 'Track model quality, input changes, latency, failures, and retraining needs.', tags: ['MLOps'] },
        ]
      },
      {
        id: 'ml-07', number: '07', title: 'Portfolio + Interviews', subtitle: 'Prove your skills', goal: 'Turn ML knowledge into evidence employers can evaluate.', nodes: [
          { id: 'ml-capstone', title: 'End-to-End ML Project', type: 'project', description: 'Build, evaluate, deploy, and document an end-to-end machine learning system.', tags: ['Project'], links: [project('House Price Prediction', 'house-price-prediction')] },
          { id: 'ml-deepdive', title: 'Model Deep-Dive', description: 'Be able to explain your model, metrics, trade-offs, failure modes, and next steps.', tags: ['Portfolio'] },
          { id: 'ml-interview', title: 'ML Interviews', type: 'career', description: 'Prepare statistics, ML theory, case studies, coding, and project questions.', tags: ['Career'] },
        ]
      },
    ],
  },
  {
    slug: 'software-engineer',
    tagline: 'A modern path from programming fundamentals to production software.',
    outcome: 'Build maintainable systems and demonstrate strong engineering fundamentals.',
    phases: [
      {
        id: 'se-01', number: '01', title: 'Programming', subtitle: 'Think in code', goal: 'Develop strong language and debugging fundamentals.', nodes: [
          { id: 'se-language', title: 'Primary Language', description: 'Go deep in C++, Python, JavaScript, Java, or another primary language.', tags: ['Programming'] },
          { id: 'se-oop', title: 'OOP + Design', description: 'Understand encapsulation, composition, inheritance, interfaces, and clean design.', tags: ['Design'] },
          { id: 'se-debug', title: 'Debugging', description: 'Learn to isolate failures, read stack traces, inspect state, and reproduce bugs.', tags: ['Debugging'] },
        ]
      },
      {
        id: 'se-02', number: '02', title: 'DSA', subtitle: 'Solve problems', goal: 'Build algorithmic reasoning and data-structure fluency.', nodes: [
          { id: 'se-ds', title: 'Core Data Structures', description: 'Arrays, linked lists, stacks, queues, hashing, trees, heaps, graphs, and tries.', tags: ['DSA'] },
          { id: 'se-algo', title: 'Algorithms', description: 'Search, sorting, recursion, graphs, greedy methods, and dynamic programming.', tags: ['Algorithms'] },
          { id: 'se-complexity', title: 'Complexity', description: 'Reason about time, space, memory, and constraints.', tags: ['Big O'] },
        ]
      },
      {
        id: 'se-03', number: '03', title: 'Core CS', subtitle: 'Understand the machine', goal: 'Build strong conceptual foundations.', nodes: [
          { id: 'se-os', title: 'Operating Systems', description: 'Processes, threads, memory, filesystems, scheduling, and concurrency.', tags: ['OS'] },
          { id: 'se-net', title: 'Networking', description: 'HTTP, TCP/IP, DNS, TLS, proxies, caching, and common failure modes.', tags: ['Networking'] },
          { id: 'se-db', title: 'Databases', description: 'SQL, data modeling, indexes, transactions, isolation, and query performance.', tags: ['Databases'] },
        ]
      },
      {
        id: 'se-04', number: '04', title: 'Backend + Systems', subtitle: 'Build services', goal: 'Design and implement production-grade services.', nodes: [
          { id: 'se-api', title: 'APIs + Auth', description: 'Design APIs, validate requests, handle authentication, authorization, and rate limits.', tags: ['Backend'] },
          { id: 'se-arch', title: 'Architecture', description: 'Separate concerns, choose boundaries, and reason about trade-offs.', tags: ['Architecture'] },
          { id: 'se-cache', title: 'Caching + Queues', description: 'Learn asynchronous processing, caching, retries, and idempotency.', tags: ['Distributed Systems'] },
        ]
      },
      {
        id: 'se-05', number: '05', title: 'Delivery', subtitle: 'Ship safely', goal: 'Build a reliable engineering workflow.', nodes: [
          { id: 'se-git', title: 'Git + Collaboration', description: 'Branching, reviews, rebasing, and useful commit history.', tags: ['Git'] },
          { id: 'se-test', title: 'Testing', description: 'Unit, integration, end-to-end tests and effective test design.', tags: ['Testing'] },
          { id: 'se-ci', title: 'CI/CD + Deployment', description: 'Automate checks and deploy repeatably.', tags: ['DevOps'] },
        ]
      },
      {
        id: 'se-06', number: '06', title: 'Portfolio + Interviews', subtitle: 'Demonstrate engineering', goal: 'Show that you can build and explain software.', nodes: [
          { id: 'se-project', title: 'Capstone System', type: 'project', description: 'Build a substantial service with auth, storage, testing, deployment, and documentation.', tags: ['Project'] },
          { id: 'se-system', title: 'System Design', description: 'Practice designing scalable systems and explaining trade-offs.', tags: ['Interview'] },
          { id: 'se-interview', title: 'Coding Interviews', type: 'career', description: 'Combine DSA, debugging, CS fundamentals, and behavioral preparation.', tags: ['Career'] },
        ]
      },
    ],
  },
  {
    slug: 'dsa-mastery',
    tagline: 'Master data structures, algorithms, and competitive problem solving in layers.',
    outcome: 'Recognize patterns, derive solutions, and implement them under constraints.',
    phases: [
      {
        id: 'dsa-01', number: '01', title: 'C++ + STL', subtitle: 'Build the toolbox', goal: 'Become fast and comfortable with the language and standard library.', nodes: [
          { id: 'dsa-cpp', title: 'C++ Semantics', description: 'References, pointers, memory, classes, templates, and modern C++ habits.', tags: ['C++'] },
          { id: 'dsa-stl', title: 'STL', description: 'Vectors, maps, sets, heaps, algorithms, iterators, and custom comparators.', tags: ['STL'] },
          { id: 'dsa-complex', title: 'Complexity', description: 'Translate constraints into expected time and space complexity.', tags: ['Big O'] },
        ]
      },
      {
        id: 'dsa-02', number: '02', title: 'Core Data Structures', subtitle: 'Choose the right structure', goal: 'Understand trade-offs rather than memorizing implementations.', nodes: [
          { id: 'dsa-linear', title: 'Linear Structures', description: 'Arrays, linked lists, stacks, queues, deques, and hashing.', tags: ['Data Structures'] },
          { id: 'dsa-trees', title: 'Trees + Heaps', description: 'BSTs, heaps, tries, Fenwick trees, and segment trees.', tags: ['Trees'] },
          { id: 'dsa-graphs', title: 'Graphs', description: 'Representations, traversal, connectivity, and common graph patterns.', tags: ['Graphs'] },
        ]
      },
      {
        id: 'dsa-03', number: '03', title: 'Algorithm Patterns', subtitle: 'Recognize the shape', goal: 'Develop a reusable problem-solving toolkit.', nodes: [
          { id: 'dsa-search', title: 'Search + Sort', description: 'Binary search, merge sort, quicksort, and answer-space search.', tags: ['Algorithms'] },
          { id: 'dsa-two', title: 'Two Pointers + Sliding Window', description: 'Learn common techniques for linear-time array and string problems.', tags: ['Patterns'] },
          { id: 'dsa-greedy', title: 'Greedy', description: 'Identify locally optimal decisions that produce globally correct solutions.', tags: ['Greedy'] },
          { id: 'dsa-dp', title: 'Dynamic Programming', description: 'State definition, transitions, memoization, tabulation, and optimization.', tags: ['DP'] },
        ]
      },
      {
        id: 'dsa-04', number: '04', title: 'Graph Algorithms', subtitle: 'Model relationships', goal: 'Handle connectivity, paths, and dependency problems.', nodes: [
          { id: 'dsa-bfs', title: 'BFS + DFS', description: 'Traversal, components, cycle detection, and grid problems.', tags: ['Graphs'] },
          { id: 'dsa-shortest', title: 'Shortest Paths', description: 'Dijkstra, Bellman-Ford, and Floyd-Warshall with selection criteria.', tags: ['Graphs'] },
          { id: 'dsa-topo', title: 'Topological Sort', description: 'Dependency ordering and DAG reasoning.', tags: ['Graphs'] },
        ]
      },
      {
        id: 'dsa-05', number: '05', title: 'Contest Readiness', subtitle: 'Speed + accuracy', goal: 'Perform reliably under time constraints.', nodes: [
          { id: 'dsa-virtual', title: 'Virtual Contests', description: 'Practice under realistic time limits and solve without editorials.', tags: ['Practice'] },
          { id: 'dsa-upsolve', title: 'Upsolving', description: 'Study failed problems and classify the pattern you missed.', tags: ['Learning'] },
          { id: 'dsa-mixed', title: 'Mixed Sets', description: 'Rotate topics so pattern recognition becomes automatic.', tags: ['Practice'] },
        ]
      },
    ],
  },
  {
    slug: 'internships',
    tagline: 'Turn technical skills into a strong internship application pipeline.',
    outcome: 'Reach interviews with proof of work and convert interviews into offers.',
    phases: [
      {
        id: 'int-01', number: '01', title: 'Choose a Target', subtitle: 'Pick a direction', goal: 'Focus your applications around one primary technical profile.', nodes: [
          { id: 'int-role', title: 'Target Role', description: 'Choose software, AI/ML, data, backend, or research as your primary direction.', tags: ['Career'] },
          { id: 'int-skills', title: 'Self-assessment', description: 'Compare your current ability against the role requirements before choosing the next checkpoint.', tags: ['Planning'] },
        ]
      },
      {
        id: 'int-02', number: '02', title: 'Technical Foundation', subtitle: 'Become interview-ready', goal: 'Build the fundamentals companies expect from interns.', nodes: [
          { id: 'int-prog', title: 'Programming', description: 'Be fluent in one primary language and comfortable debugging code.', tags: ['Programming'] },
          { id: 'int-dsa', title: 'DSA', description: 'Practice arrays through graphs and dynamic programming according to your role.', tags: ['DSA'] },
          { id: 'int-core', title: 'Role Fundamentals', description: 'Study ML, backend, databases, statistics, or systems fundamentals as appropriate.', tags: ['Fundamentals'] },
        ]
      },
      {
        id: 'int-03', number: '03', title: 'Proof of Work', subtitle: 'Build evidence', goal: 'Create projects that demonstrate real ability.', nodes: [
          { id: 'int-project1', title: 'Flagship Project', type: 'project', description: 'Build one complete project with a README, architecture, GitHub, and measurable outcome.', tags: ['Portfolio'] },
          { id: 'int-project2', title: 'Supporting Projects', type: 'project', description: 'Add smaller projects that reinforce your target role rather than random demos.', tags: ['Portfolio'] },
        ]
      },
      {
        id: 'int-04', number: '04', title: 'Application System', subtitle: 'Get interviews', goal: 'Create a repeatable application workflow.', nodes: [
          { id: 'int-resume', title: 'Resume', description: 'Write evidence-based bullets, quantify impact, and tailor the role focus.', tags: ['Resume'] },
          { id: 'int-github', title: 'GitHub + Portfolio', description: 'Make your strongest work easy to inspect and understand.', tags: ['GitHub'] },
          { id: 'int-network', title: 'Networking', description: 'Use communities, alumni, referrals, projects, and events thoughtfully.', tags: ['Networking'] },
        ]
      },
      {
        id: 'int-05', number: '05', title: 'Interview Loop', subtitle: 'Convert opportunities', goal: 'Prepare for technical and behavioral rounds.', nodes: [
          { id: 'int-coding', title: 'Coding Practice', type: 'career', description: 'Timed DSA and implementation practice with pattern review.', tags: ['Interviews'] },
          { id: 'int-projectdeep', title: 'Project Deep-Dive', type: 'career', description: 'Be ready to explain architecture, trade-offs, bugs, and what you would improve.', tags: ['Interviews'] },
          { id: 'int-behavioral', title: 'Behavioral', type: 'career', description: 'Prepare concise stories around ownership, failure, teamwork, and learning.', tags: ['Behavioral'] },
        ]
      },
    ],
  },
  {
    slug: 'interviews',
    tagline: 'A structured interview-prep system for software, AI, ML, and technical roles.',
    outcome: 'Walk into interviews able to solve, explain, design, and communicate.',
    phases: [
      {
        id: 'iv-01', number: '01', title: 'Baseline', subtitle: 'Know your gaps', goal: 'Identify what is actually stopping you from converting interviews.', nodes: [
          { id: 'iv-role', title: 'Role Requirements', description: 'Break the target role into coding, systems, domain, and behavioral expectations.', tags: ['Planning'] },
          { id: 'iv-gap', title: 'Gap Assessment', description: 'Use a simple skills matrix to identify high-impact weaknesses before the next interview cycle.', tags: ['Planning'] },
        ]
      },
      {
        id: 'iv-02', number: '02', title: 'Coding', subtitle: 'Solve under pressure', goal: 'Build speed, accuracy, and communication while coding.', nodes: [
          { id: 'iv-patterns', title: 'Core Patterns', description: 'Arrays, hashing, trees, graphs, binary search, recursion, and DP.', tags: ['DSA'] },
          { id: 'iv-timed', title: 'Timed Rounds', description: 'Practice in realistic interview constraints and explain your reasoning aloud.', tags: ['Practice'] },
          { id: 'iv-review', title: 'Review + Upsolve', description: 'Track recurring mistakes and close pattern gaps deliberately.', tags: ['Learning'] },
        ]
      },
      {
        id: 'iv-03', number: '03', title: 'Technical Depth', subtitle: 'Explain what you know', goal: 'Build the ability to defend concepts and past work.', nodes: [
          { id: 'iv-cs', title: 'CS Fundamentals', description: 'OS, networking, databases, concurrency, and complexity.', tags: ['CS'] },
          { id: 'iv-ml', title: 'AI/ML Fundamentals', description: 'Know model assumptions, metrics, data problems, and trade-offs for AI roles.', tags: ['AI/ML'] },
          { id: 'iv-project', title: 'Project Deep-Dive', description: 'Explain architecture, failures, metrics, compromises, and improvements.', tags: ['Projects'] },
        ]
      },
      {
        id: 'iv-04', number: '04', title: 'System Design', subtitle: 'Think in systems', goal: 'Learn to design robust services and AI-powered systems.', nodes: [
          { id: 'iv-requirements', title: 'Requirements', description: 'Clarify scope, users, traffic, latency, storage, and reliability goals.', tags: ['Design'] },
          { id: 'iv-architecture', title: 'Architecture', description: 'Choose services, databases, queues, caches, and APIs with explicit trade-offs.', tags: ['Design'] },
          { id: 'iv-ai-system', title: 'AI System Design', description: 'Add retrieval, model calls, evaluation, safety, cost, and observability when relevant.', tags: ['AI Systems'] },
        ]
      },
      {
        id: 'iv-05', number: '05', title: 'Behavioral + Execution', subtitle: 'Communicate clearly', goal: 'Make your technical ability easy for interviewers to see.', nodes: [
          { id: 'iv-story', title: 'STAR Stories', description: 'Prepare concise examples for ownership, conflict, failure, and learning.', tags: ['Behavioral'] },
          { id: 'iv-mock', title: 'Mock Interviews', description: 'Simulate full interviews and gather feedback before real loops.', tags: ['Practice'] },
          { id: 'iv-offer', title: 'Offer Strategy', description: 'Evaluate role fit, learning opportunities, compensation, and growth.', tags: ['Career'] },
        ]
      },
    ],
  },
];

export function getRoadmapVisual(slug: string) {
  return roadmapVisuals.find((item) => item.slug === slug);
}
