export interface User {
  id: string
  name: string
  nativeLanguage: string
  targetLanguage: string
  level: string
  role: "learner" | "helper" | "both"
  streak: number
  totalSessions: number
  totalMinutes: number
  badges: string[]
}

export interface Partner {
  id: string
  name: string
  avatar: string
  nativeLanguage: string
  targetLanguage: string
  badges: string[]
  reliability: number
}

export interface Session {
  id: string
  dateTime: string
  partnerId: string
  status: "upcoming" | "completed" | "in-progress"
  duration: number
  structure: string[]
  promptPackId: string
}

export interface PromptPack {
  id: string
  title: string
  prompts: string[]
}

export interface Correction {
  id: string
  sessionId: string
  text: string
  tag: string
  timestamp: string
}

export const currentUser: User = {
  id: "user-1",
  name: "Alex Chen",
  nativeLanguage: "English",
  targetLanguage: "Spanish",
  level: "B1",
  role: "learner",
  streak: 7,
  totalSessions: 24,
  totalMinutes: 600,
  badges: ["First Session", "7 Day Streak"],
}

export const partners: Partner[] = [
  {
    id: "partner-1",
    name: "María García",
    avatar: "/diverse-woman-portrait.png",
    nativeLanguage: "Spanish",
    targetLanguage: "English",
    badges: ["Reliable partner", "Helpful"],
    reliability: 98,
  },
  {
    id: "partner-2",
    name: "Carlos Ruiz",
    avatar: "/man.jpg",
    nativeLanguage: "Spanish",
    targetLanguage: "English",
    badges: ["Patient", "Reliable partner"],
    reliability: 95,
  },
  {
    id: "partner-3",
    name: "Sofia Martinez",
    avatar: "/professional-woman.png",
    nativeLanguage: "Spanish",
    targetLanguage: "English",
    badges: ["Experienced", "Helpful"],
    reliability: 97,
  },
]

export const sessions: Session[] = [
  {
    id: "session-1",
    dateTime: "2025-01-15T10:00:00",
    partnerId: "partner-1",
    status: "upcoming",
    duration: 25,
    structure: ["Warm-up (5min)", "Target language (10min)", "Switch (5min)", "Wrap-up (5min)"],
    promptPackId: "pack-1",
  },
  {
    id: "session-2",
    dateTime: "2025-01-12T14:00:00",
    partnerId: "partner-2",
    status: "completed",
    duration: 25,
    structure: ["Warm-up (5min)", "Target language (10min)", "Switch (5min)", "Wrap-up (5min)"],
    promptPackId: "pack-2",
  },
]

export const promptPacks: PromptPack[] = [
  {
    id: "pack-1",
    title: "Daily Life Conversations",
    prompts: [
      "Describe your morning routine in detail",
      "What did you have for breakfast today?",
      "Tell me about your favorite place in your city",
      "What are your plans for this weekend?",
      "Describe the weather where you are right now",
    ],
  },
  {
    id: "pack-2",
    title: "Travel & Adventure",
    prompts: [
      "Describe your dream vacation destination",
      "Tell me about the best trip you've ever taken",
      "What would you pack for a week-long trip?",
      "How do you usually plan your travels?",
      "Share a funny travel story",
    ],
  },
]

export const corrections: Correction[] = [
  {
    id: "corr-1",
    sessionId: "session-2",
    text: '"Yo fue" → "Yo fui" (preterite conjugation)',
    tag: "grammar",
    timestamp: "2025-01-12T14:15:00",
  },
  {
    id: "corr-2",
    sessionId: "session-2",
    text: '"El gato es en la casa" → "El gato está en la casa" (ser vs estar)',
    tag: "grammar",
    timestamp: "2025-01-12T14:20:00",
  },
]

export const weeklyStats = [
  { day: "Mon", minutes: 25 },
  { day: "Tue", minutes: 0 },
  { day: "Wed", minutes: 25 },
  { day: "Thu", minutes: 25 },
  { day: "Fri", minutes: 0 },
  { day: "Sat", minutes: 25 },
  { day: "Sun", minutes: 0 },
]
