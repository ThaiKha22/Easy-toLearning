// Central mock data store for AI StudyHub.
// In production this shape maps directly onto REST responses from the future
// Express + MongoDB backend — see src/services for the swap-in layer.

export const currentUser = {
  id: 'u1',
  name: 'Alex Rivera',
  email: 'alex.rivera@studyhub.io',
  avatar: null,
  initials: 'AR',
  bio: 'Second-year CS student. Trying to actually understand networking this time.',
  streakDays: 12,
  dailyGoalMinutes: 45,
  preferredStudyTime: 'Evening',
  difficultyPreference: 'Adaptive',
  language: 'English',
  theme: 'system',
  notifications: {
    studyReminders: true,
    quizReminders: true,
    aiRecommendations: true,
    weeklyReports: false,
  },
};

export const subjects = [
  {
    id: 'sub-networks',
    name: 'Computer Networks',
    description: 'OSI model, TCP/IP, routing, and everything that keeps packets moving.',
    color: 'brand',
    progress: 67,
    documents: 8,
    flashcards: 142,
    quizzes: 6,
    lastStudied: '2026-08-22T19:20:00Z',
    examDate: '2026-09-19',
  },
  {
    id: 'sub-os',
    name: 'Operating Systems',
    description: 'Processes, scheduling, memory management, and concurrency.',
    color: 'violet',
    progress: 41,
    documents: 5,
    flashcards: 88,
    quizzes: 4,
    lastStudied: '2026-08-21T14:05:00Z',
    examDate: '2026-09-30',
  },
  {
    id: 'sub-db',
    name: 'Database Systems',
    description: 'Relational design, normalization, transactions, and indexing.',
    color: 'spark',
    progress: 82,
    documents: 6,
    flashcards: 103,
    quizzes: 5,
    lastStudied: '2026-08-20T09:40:00Z',
    examDate: '2026-09-12',
  },
  {
    id: 'sub-web',
    name: 'Web Development',
    description: 'HTTP, REST APIs, client-server architecture, and modern frontend basics.',
    color: 'success',
    progress: 23,
    documents: 3,
    flashcards: 40,
    quizzes: 2,
    lastStudied: '2026-08-17T11:00:00Z',
    examDate: '2026-10-05',
  },
];

export const weakTopics = [
  { id: 't-cc', subjectId: 'sub-networks', name: 'Congestion Control', mastery: 68 },
  { id: 't-sub', subjectId: 'sub-networks', name: 'Subnetting', mastery: 52 },
  { id: 't-fc', subjectId: 'sub-networks', name: 'Flow Control', mastery: 58 },
  { id: 't-dead', subjectId: 'sub-os', name: 'Deadlock Avoidance', mastery: 47 },
];

export const strongTopics = [
  { id: 't-tcp', subjectId: 'sub-networks', name: 'TCP Handshake', mastery: 91 },
  { id: 't-http', subjectId: 'sub-web', name: 'HTTP Methods', mastery: 88 },
];

export const documents = [
  {
    id: 'doc-1',
    subjectId: 'sub-networks',
    title: 'Chapter 4 — Transmission Control Protocol',
    type: 'pdf',
    sizeKb: 2380,
    uploadedAt: '2026-08-18T10:00:00Z',
    status: 'ready',
    pages: 24,
  },
  {
    id: 'doc-2',
    subjectId: 'sub-networks',
    title: 'Lecture Notes — Routing Algorithms',
    type: 'docx',
    sizeKb: 540,
    uploadedAt: '2026-08-15T08:30:00Z',
    status: 'ready',
    pages: 11,
  },
  {
    id: 'doc-3',
    subjectId: 'sub-networks',
    title: 'Congestion Control — Reading Packet',
    type: 'pdf',
    sizeKb: 1120,
    uploadedAt: '2026-08-22T18:55:00Z',
    status: 'processing',
    pages: 9,
  },
  {
    id: 'doc-4',
    subjectId: 'sub-os',
    title: 'Process Scheduling Algorithms',
    type: 'pdf',
    sizeKb: 1890,
    uploadedAt: '2026-08-10T12:00:00Z',
    status: 'ready',
    pages: 18,
  },
  {
    id: 'doc-5',
    subjectId: 'sub-db',
    title: 'Normalization Cheat Sheet',
    type: 'txt',
    sizeKb: 12,
    uploadedAt: '2026-08-05T09:00:00Z',
    status: 'error',
    pages: 1,
  },
];

export const documentDetail = {
  'doc-1': {
    summary: `TCP guarantees reliable, ordered delivery of a byte stream between two hosts. It
does this using sequence numbers, acknowledgments, and retransmission timers.
Each byte of data is numbered, allowing the receiver to detect gaps and
reassemble the stream in order even when segments arrive out of sequence.

Reliability is maintained through positive acknowledgment: the sender starts
a timer for every segment and retransmits automatically if no ACK arrives in
time. Flow control keeps a fast sender from overwhelming a slow receiver
using a dynamically advertised receive window, while congestion control
keeps the sender from overwhelming the network itself using mechanisms like
slow start, congestion avoidance, and fast retransmit.`,
    keyConcepts: [
      { id: 'kc1', name: 'Three-Way Handshake', explanation: 'SYN, SYN-ACK, ACK exchange used to establish a reliable connection before data transfer begins.', difficulty: 'Easy', relatedTopics: ['TCP', 'Connection Setup'] },
      { id: 'kc2', name: 'Sequence Numbers', explanation: 'Numbers assigned to each byte of data so the receiver can reorder segments and detect loss.', difficulty: 'Medium', relatedTopics: ['TCP', 'Reliability'] },
      { id: 'kc3', name: 'Sliding Window', explanation: 'A flow-control mechanism that lets multiple segments be in flight before requiring an acknowledgment.', difficulty: 'Medium', relatedTopics: ['Flow Control'] },
      { id: 'kc4', name: 'Congestion Avoidance', explanation: 'Additive-increase, multiplicative-decrease strategy that probes for available bandwidth without flooding the network.', difficulty: 'Hard', relatedTopics: ['Congestion Control'] },
    ],
    flashcardPreview: 6,
    quiz: { questions: 12, difficulty: 'Medium', estimatedMinutes: 15 },
  },
};

export const flashcardDecks = [
  { id: 'deck-tcp', subjectId: 'sub-networks', name: 'TCP Fundamentals', cardCount: 30, mastered: 18 },
  { id: 'deck-routing', subjectId: 'sub-networks', name: 'Routing Algorithms', cardCount: 22, mastered: 9 },
  { id: 'deck-os-sched', subjectId: 'sub-os', name: 'Process Scheduling', cardCount: 26, mastered: 14 },
  { id: 'deck-normal', subjectId: 'sub-db', name: 'Normalization Forms', cardCount: 18, mastered: 15 },
];

export const flashcards = [
  { id: 'fc1', deckId: 'deck-tcp', question: 'What is TCP?', answer: 'A connection-oriented transport-layer protocol that provides reliable, ordered, and error-checked delivery of a byte stream between applications.' },
  { id: 'fc2', deckId: 'deck-tcp', question: 'What does the three-way handshake establish?', answer: 'A reliable connection between client and server using SYN, SYN-ACK, and ACK segments before any data is sent.' },
  { id: 'fc3', deckId: 'deck-tcp', question: 'What triggers a fast retransmit?', answer: 'Receiving three duplicate ACKs for the same segment, signaling likely packet loss without waiting for a timeout.' },
  { id: 'fc4', deckId: 'deck-tcp', question: 'What is the purpose of the receive window?', answer: 'It tells the sender how much buffer space the receiver has available, preventing the sender from overwhelming it.' },
  { id: 'fc5', deckId: 'deck-tcp', question: 'What is slow start?', answer: 'An algorithm that begins with a small congestion window and doubles it each round-trip until loss is detected or a threshold is reached.' },
  { id: 'fc6', deckId: 'deck-tcp', question: 'What distinguishes TCP from UDP?', answer: 'TCP is connection-oriented and reliable; UDP is connectionless and makes no delivery guarantees, trading reliability for speed.' },
];

export const quizzes = [
  { id: 'qz-tcp', subjectId: 'sub-networks', title: 'TCP & Reliable Delivery', questionCount: 12, difficulty: 'Medium', estimatedMinutes: 15, lastScore: 82, attempts: 3 },
  { id: 'qz-routing', subjectId: 'sub-networks', title: 'Routing Algorithms', questionCount: 10, difficulty: 'Hard', estimatedMinutes: 14, lastScore: 64, attempts: 1 },
  { id: 'qz-osched', subjectId: 'sub-os', title: 'CPU Scheduling', questionCount: 15, difficulty: 'Medium', estimatedMinutes: 18, lastScore: null, attempts: 0 },
  { id: 'qz-normal', subjectId: 'sub-db', title: 'Normal Forms', questionCount: 8, difficulty: 'Easy', estimatedMinutes: 9, lastScore: 91, attempts: 2 },
];

export const quizQuestions = [
  {
    id: 'q1',
    prompt: 'What mechanism provides reliable delivery in TCP?',
    options: [
      { id: 'a', label: 'DNS resolution' },
      { id: 'b', label: 'Sequence numbers and acknowledgments' },
      { id: 'c', label: 'ARP caching' },
      { id: 'd', label: 'UDP checksums' },
    ],
    correctOptionId: 'b',
    topic: 'TCP',
    explanation: 'TCP numbers every byte and requires acknowledgment, retransmitting anything that goes unacknowledged.',
  },
  {
    id: 'q2',
    prompt: 'Which algorithm helps TCP avoid overwhelming the network after a loss event?',
    options: [
      { id: 'a', label: 'Slow start' },
      { id: 'b', label: 'Round-robin scheduling' },
      { id: 'c', label: 'Static routing' },
      { id: 'd', label: 'DNS caching' },
    ],
    correctOptionId: 'a',
    topic: 'Congestion Control',
    explanation: 'Slow start resets the congestion window to a small value and ramps up gradually after loss is detected.',
  },
  {
    id: 'q3',
    prompt: 'What does the receive window primarily control?',
    options: [
      { id: 'a', label: 'Network-wide congestion' },
      { id: 'b', label: 'DNS lookup speed' },
      { id: 'c', label: 'How much unacknowledged data the sender can have in flight' },
      { id: 'd', label: 'The physical transmission medium' },
    ],
    correctOptionId: 'c',
    topic: 'Flow Control',
    explanation: 'The receive window advertises available buffer space, which governs flow control between sender and receiver.',
  },
  {
    id: 'q4',
    prompt: 'A subnet mask of /26 provides how many usable host addresses?',
    options: [
      { id: 'a', label: '62' },
      { id: 'b', label: '126' },
      { id: 'c', label: '30' },
      { id: 'd', label: '254' },
    ],
    correctOptionId: 'a',
    topic: 'Subnetting',
    explanation: 'A /26 mask leaves 6 host bits (2^6 - 2 = 62 usable addresses), reserving one for network and one for broadcast.',
  },
  {
    id: 'q5',
    prompt: 'What is the main goal of congestion control, as opposed to flow control?',
    options: [
      { id: 'a', label: 'Protecting the receiver’s buffer' },
      { id: 'b', label: 'Protecting the network from being overwhelmed' },
      { id: 'c', label: 'Encrypting data in transit' },
      { id: 'd', label: 'Resolving domain names' },
    ],
    correctOptionId: 'b',
    topic: 'Congestion Control',
    explanation: 'Flow control protects the receiver; congestion control protects the shared network path between sender and receiver.',
  },
];

export const quizResults = {
  'quiz-attempt-1': {
    quizId: 'qz-tcp',
    quizTitle: 'TCP & Reliable Delivery',
    score: 82,
    correct: 10,
    incorrect: 2,
    totalQuestions: 12,
    timeTakenMinutes: 13,
    strongTopics: ['TCP Handshake', 'HTTP Methods'],
    weakTopics: ['Congestion Control', 'Subnetting'],
    aiAnalysis: 'You understand the fundamentals well, but you frequently confuse congestion control and flow control. Consider reviewing what each mechanism protects — the network path versus the receiver’s buffer — before your next attempt.',
  },
};

export const recentActivity = [
  { id: 'act1', type: 'quiz', label: 'Completed "TCP & Reliable Delivery" quiz', detail: 'Scored 82%', time: '2026-08-22T19:20:00Z' },
  { id: 'act2', type: 'upload', label: 'Uploaded "Congestion Control — Reading Packet"', detail: 'Processing started', time: '2026-08-22T18:55:00Z' },
  { id: 'act3', type: 'flashcards', label: 'Reviewed 24 flashcards in TCP Fundamentals', detail: '18 marked as known', time: '2026-08-21T20:10:00Z' },
  { id: 'act4', type: 'session', label: 'Finished a 30-minute study session', detail: 'Operating Systems', time: '2026-08-21T14:05:00Z' },
];

export const todayPlan = [
  { id: 'tp1', topic: 'Review TCP/IP', duration: 20, difficulty: 'Medium', done: true },
  { id: 'tp2', topic: 'Flashcards — Routing Algorithms', duration: 15, difficulty: 'Easy', done: false },
  { id: 'tp3', topic: 'Practice Quiz — Congestion Control', duration: 25, difficulty: 'Hard', done: false },
];

export const weeklyPlan = [
  { day: 'Monday', tasks: [
    { id: 'm1', topic: 'TCP/IP', duration: 30, difficulty: 'Medium', done: true },
    { id: 'm2', topic: 'Flashcards', duration: 15, difficulty: 'Easy', done: true },
    { id: 'm3', topic: 'Quiz', duration: 15, difficulty: 'Medium', done: false },
  ]},
  { day: 'Tuesday', tasks: [
    { id: 't1', topic: 'HTTP', duration: 30, difficulty: 'Medium', done: true },
    { id: 't2', topic: 'Flashcards', duration: 20, difficulty: 'Easy', done: false },
    { id: 't3', topic: 'Review', duration: 10, difficulty: 'Easy', done: false },
  ]},
  { day: 'Wednesday', tasks: [
    { id: 'w1', topic: 'Subnetting Practice', duration: 35, difficulty: 'Hard', done: false },
    { id: 'w2', topic: 'Flashcards', duration: 15, difficulty: 'Medium', done: false },
  ]},
  { day: 'Thursday', tasks: [
    { id: 'th1', topic: 'Congestion Control', duration: 25, difficulty: 'Hard', done: false },
    { id: 'th2', topic: 'Practice Quiz', duration: 20, difficulty: 'Medium', done: false },
  ]},
  { day: 'Friday', tasks: [
    { id: 'f1', topic: 'Routing Algorithms', duration: 30, difficulty: 'Medium', done: false },
    { id: 'f2', topic: 'Flashcards Review', duration: 15, difficulty: 'Easy', done: false },
  ]},
  { day: 'Saturday', tasks: [
    { id: 's1', topic: 'Full Practice Exam', duration: 60, difficulty: 'Hard', done: false },
  ]},
  { day: 'Sunday', tasks: [
    { id: 'su1', topic: 'Rest / Light Review', duration: 15, difficulty: 'Easy', done: false },
  ]},
];

export const aiConversations = [
  { id: 'conv1', title: 'Explaining congestion control', subjectId: 'sub-networks', updatedAt: '2026-08-22T19:00:00Z', preview: 'Think of congestion control like managing traffic...' },
  { id: 'conv2', title: 'Deadlock avoidance strategies', subjectId: 'sub-os', updatedAt: '2026-08-21T15:30:00Z', preview: 'Deadlock avoidance uses the Banker\'s algorithm...' },
  { id: 'conv3', title: 'Normalization vs denormalization', subjectId: 'sub-db', updatedAt: '2026-08-19T10:12:00Z', preview: 'Normalization reduces redundancy, but...' },
];

export const aiMessages = [
  { id: 'm1', role: 'user', content: 'Explain TCP congestion control.', time: '2026-08-22T19:00:00Z' },
  {
    id: 'm2',
    role: 'ai',
    time: '2026-08-22T19:00:12Z',
    content: `Think of congestion control like managing traffic on a highway with an unknown number of lanes.

TCP starts cautiously with **slow start** — sending a little data, and doubling the amount every round trip as long as it arrives safely. This is like slowly merging onto a highway and speeding up while the road stays clear.

Once it reaches a threshold, it switches to **congestion avoidance**, increasing more carefully — one step at a time — to avoid suddenly flooding the road. If a packet is lost, TCP treats that as a sign of a traffic jam and backs off sharply, then starts probing again.

The key idea: TCP has no way to see the whole network, so it learns the safe sending rate through trial and feedback.`,
  },
  { id: 'm3', role: 'user', content: 'Give me an example with numbers.', time: '2026-08-22T19:01:30Z' },
  {
    id: 'm4',
    role: 'ai',
    time: '2026-08-22T19:01:42Z',
    content: `Suppose the congestion window (cwnd) starts at 1 MSS (maximum segment size).

- Round-trip 1: cwnd = 1 → 2
- Round-trip 2: cwnd = 2 → 4
- Round-trip 3: cwnd = 4 → 8

This doubling continues until cwnd hits the slow-start threshold (ssthresh), say 16. From there, growth becomes linear: +1 MSS per round-trip instead of doubling. If a loss is detected at cwnd = 20, ssthresh is set to 10 (half) and cwnd drops back down — then the cycle repeats.`,
  },
];

export const suggestedPrompts = [
  'Explain this simply',
  'Give me an example',
  'Quiz me on this',
  'What should I study next?',
];

export const studyContext = {
  subject: 'Computer Networks',
  document: 'Chapter 4 — TCP',
  topics: ['TCP', 'Congestion Control', 'Flow Control'],
};

export const analyticsStudyTimeWeekly = [
  { week: 'Wk 1', minutes: 180 },
  { week: 'Wk 2', minutes: 240 },
  { week: 'Wk 3', minutes: 210 },
  { week: 'Wk 4', minutes: 300 },
  { week: 'Wk 5', minutes: 265 },
  { week: 'Wk 6', minutes: 340 },
];

export const analyticsQuizPerformance = [
  { date: 'Jul 25', score: 58 },
  { date: 'Aug 1', score: 64 },
  { date: 'Aug 8', score: 71 },
  { date: 'Aug 15', score: 75 },
  { date: 'Aug 22', score: 82 },
];

export const analyticsTopicMastery = [
  { topic: 'TCP', mastery: 84 },
  { topic: 'Routing', mastery: 61 },
  { topic: 'Subnetting', mastery: 52 },
  { topic: 'Congestion Control', mastery: 68 },
  { topic: 'Flow Control', mastery: 58 },
  { topic: 'DNS', mastery: 77 },
];

export const analyticsConsistency = [
  { day: 'Mon', minutes: 40 }, { day: 'Tue', minutes: 55 }, { day: 'Wed', minutes: 20 },
  { day: 'Thu', minutes: 60 }, { day: 'Fri', minutes: 35 }, { day: 'Sat', minutes: 75 }, { day: 'Sun', minutes: 15 },
];

export const analyticsStats = {
  totalStudyMinutes: 1830,
  currentStreak: 12,
  averageQuizScore: 78,
  topicsMastered: 9,
};

export const dashboardStats = {
  overallProgress: 58,
  studyStreak: 12,
  studyTimeMinutes: 1830,
  quizAverage: 78,
};
