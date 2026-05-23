export type Role = "employee" | "admin";

export type Credential = {
  email: string;
  password: string;
  role: Role;
};

export type Announcement = {
  title: string;
  tag: string;
  audience: string;
  urgency: "High" | "Medium" | "Low";
  date: string;
  reads: number;
};

export type LeadershipOutcome = {
  topic: string;
  owner: string;
  outcome: string;
  progress: number;
};

export type Employee = {
  name: string;
  role: string;
  department: string;
  vertical: string;
  location: string;
  points: number;
  skills: string[];
};

export const credentials: Record<Role, Credential> = {
  employee: { email: "employee@demo.com", password: "employee123", role: "employee" },
  admin: { email: "admin@demo.com", password: "admin123", role: "admin" },
};

export const employees: Employee[] = [
  { name: "Aarav Mehta", role: "Product Manager", department: "Product", vertical: "Digital", location: "Mumbai", points: 940, skills: ["roadmaps", "customer research", "launches"] },
  { name: "Nisha Rao", role: "People Partner", department: "HR", vertical: "Corporate", location: "Bengaluru", points: 880, skills: ["culture", "facilitation", "policy"] },
  { name: "Kabir Sethi", role: "Engineering Lead", department: "Engineering", vertical: "Digital", location: "Pune", points: 835, skills: ["platform", "security", "mentoring"] },
  { name: "Maya Iyer", role: "Regional Sales Head", department: "Sales", vertical: "Enterprise", location: "Delhi", points: 790, skills: ["enterprise deals", "forecasting", "coaching"] },
  { name: "Rohan Das", role: "Finance Controller", department: "Finance", vertical: "Corporate", location: "Kolkata", points: 710, skills: ["controls", "planning", "audit"] },
  { name: "Tara Shah", role: "Brand Storyteller", department: "Marketing", vertical: "Consumer", location: "Mumbai", points: 695, skills: ["campaigns", "events", "content"] },
];

export const announcements: Announcement[] = [
  { title: "CEO note: Q2 priorities are clarity, speed and trust", tag: "Leadership", audience: "All", urgency: "High", date: "22 May", reads: 2840 },
  { title: "Digital vertical ships unified customer pulse dashboard", tag: "Business Update", audience: "Digital", urgency: "Medium", date: "20 May", reads: 1180 },
  { title: "Bengaluru office volunteering week opens for signups", tag: "Culture", audience: "Bengaluru", urgency: "Low", date: "18 May", reads: 920 },
  { title: "Finance policy refresh: vendor onboarding checklist", tag: "Policy", audience: "Finance, Admin", urgency: "Medium", date: "17 May", reads: 640 },
];

export const leadershipOutcomes: LeadershipOutcome[] = [
  { topic: "Customer obsession", owner: "COO", outcome: "Every project review now starts with customer impact evidence.", progress: 84 },
  { topic: "Talent mobility", owner: "CHRO", outcome: "Internal gigs marketplace pilot approved for Engineering and Product.", progress: 61 },
  { topic: "Operating rhythm", owner: "CFO", outcome: "Monthly business health pack standardized across verticals.", progress: 72 },
];

export const projectWins = [
  { title: "Enterprise renewal desk saved 11 strategic accounts", team: "Sales + Product", people: "Maya, Aarav, Kabir", impact: "Rs 18.4 Cr protected ARR", status: "Company-wide" },
  { title: "HR knowledge hub reduced repeated policy queries", team: "HR + Admin", people: "Nisha, Tara", impact: "31% fewer duplicate tickets", status: "Corporate" },
  { title: "Cloud cost guardrails shipped", team: "Engineering + Finance", people: "Kabir, Rohan", impact: "12% infrastructure savings", status: "Digital restricted" },
];

export const celebrations = [
  { title: "New joinee welcome: 18 people joined this month", replies: 42, mood: "Welcome", image: "linear-gradient(135deg,#d8f3dc,#95d5b2)" },
  { title: "Customer support team crossed 98% CSAT", replies: 36, mood: "Achievement", image: "linear-gradient(135deg,#caf0f8,#90e0ef)" },
  { title: "Mumbai office sports day photo wall is live", replies: 28, mood: "Moments", image: "linear-gradient(135deg,#ffe8cc,#ffd8a8)" },
];

export const calendar = [
  { day: "Mon", label: "Leadership AMA", type: "Vision", load: 80 },
  { day: "Tue", label: "Policy clinic", type: "Hub", load: 45 },
  { day: "Wed", label: "Peer kudos hour", type: "Recognition", load: 68 },
  { day: "Thu", label: "Showcase day", type: "Business", load: 74 },
  { day: "Fri", label: "Culture circle", type: "Engagement", load: 58 },
];

export const knowledge = [
  { title: "Employee Handbook 2026", type: "Handbook", owner: "HR", updated: "May 2026", access: "All" },
  { title: "Brand and Communication Guide", type: "Policy", owner: "Marketing", updated: "Apr 2026", access: "All" },
  { title: "Secure Delivery Playbook", type: "Playbook", owner: "Engineering", updated: "May 2026", access: "Digital" },
  { title: "Vendor Empanelment SOP", type: "SOP", owner: "Finance", updated: "Mar 2026", access: "Finance, Admin" },
];

export const forums = [
  { title: "How do I find mentors outside my department?", answers: 9, status: "Answered", pool: "All" },
  { title: "Ideas for improving monthly townhall participation", answers: 14, status: "Open", pool: "All" },
  { title: "Reusable API logging standard for Digital teams", answers: 6, status: "Restricted", pool: "Digital" },
];

export const moderationQueue = [
  { item: "Duplicate celebration post from Mumbai sports day", risk: "Clutter", action: "Merge thread", owner: "Admin" },
  { item: "Unverified sales claim in public business update", risk: "Accuracy", action: "Request evidence", owner: "HR Comms" },
  { item: "Forum comment flagged for tone", risk: "Conduct", action: "Review and coach", owner: "People Partner" },
];

export const analytics = [
  { label: "Weekly active employees", value: "82%", change: "+9%" },
  { label: "Recognition posts", value: "418", change: "+22%" },
  { label: "Policy searches resolved", value: "1,240", change: "+31%" },
  { label: "Moderation SLA", value: "94%", change: "+6%" },
];

export const visibilityPools = [
  { name: "All employees", members: 2860, policy: "Default company-wide pool" },
  { name: "Digital vertical", members: 740, policy: "Product, Engineering, Data and Design updates" },
  { name: "Corporate functions", members: 420, policy: "HR, Finance, Admin and Legal content" },
  { name: "Location pools", members: 1700, policy: "Office-specific events and facilities updates" },
];

export const moderationPlaybook = [
  { title: "Duplicate and low-value posts", rule: "Merge repeated threads and preserve the highest-quality discussion.", queue: "12 open" },
  { title: "Business claim verification", rule: "Ask content owners for evidence before promoting high-reach updates.", queue: "5 open" },
  { title: "Tone and conduct coaching", rule: "Route sensitive replies to People Partners with context and suggested action.", queue: "3 open" },
  { title: "Announcement fatigue", rule: "Hold non-urgent posts when a department already has multiple priority updates.", queue: "8 watched" },
];

export const contentChannels = [
  { channel: "Leadership Desk", cadence: "Weekly", owner: "CEO Office", next: "Monday priority note", reach: "All employees" },
  { channel: "Project Footprints", cadence: "Bi-weekly", owner: "PMO", next: "Cloud cost guardrails", reach: "Digital, Finance" },
  { channel: "Culture Moments", cadence: "Daily", owner: "HR Comms", next: "New joinee carousel", reach: "All employees" },
  { channel: "Policy Shelf", cadence: "Monthly", owner: "HR + Admin", next: "Handbook refresh", reach: "Corporate functions" },
];

export const analyticsInsights = [
  { signal: "Leadership updates drive the highest dwell time", evidence: "3.8 min average read time", action: "Pin CEO/COO messages for 48 hours" },
  { signal: "Recognition spikes after Friday culture posts", evidence: "41% more appreciation clicks", action: "Schedule peer kudos prompts after events" },
  { signal: "Digital teams over-index on forum answers", evidence: "2.4x answer rate vs company average", action: "Promote experts across cross-functional topics" },
  { signal: "Policy search is concentrated on onboarding", evidence: "37% of all handbook searches", action: "Add onboarding quick links to employee home" },
];

export type GalleryItem = {
  title: string;
  category: "Events" | "Celebrations" | "Townhall" | "Culture";
  location: string;
  date: string;
  gradient: string;
  emoji: string;
};

export const gallery: GalleryItem[] = [
  { title: "Mumbai Sports Day 2026", category: "Events", location: "Mumbai", date: "Apr 2026", gradient: "linear-gradient(135deg,#d8f3dc,#52b788)", emoji: "🏆" },
  { title: "Q1 All-Hands Townhall", category: "Townhall", location: "Bengaluru", date: "Mar 2026", gradient: "linear-gradient(135deg,#caf0f8,#48cae4)", emoji: "🎤" },
  { title: "New Joinee Welcome Batch 12", category: "Celebrations", location: "All", date: "May 2026", gradient: "linear-gradient(135deg,#ffe8cc,#f4a261)", emoji: "🎉" },
  { title: "Diwali Moments — Office Across India", category: "Culture", location: "All", date: "Oct 2025", gradient: "linear-gradient(135deg,#fff3bf,#f9c74f)", emoji: "✨" },
  { title: "Bengaluru Volunteering Week", category: "Events", location: "Bengaluru", date: "May 2026", gradient: "linear-gradient(135deg,#e9d8fd,#b197fc)", emoji: "🌱" },
  { title: "Annual Leadership Offsite", category: "Culture", location: "Goa", date: "Feb 2026", gradient: "linear-gradient(135deg,#ffd6e7,#ff85a1)", emoji: "🌊" },
];
