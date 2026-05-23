"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import {
  Award,
  BarChart3,
  Bell,
  BookOpen,
  Building2,
  CalendarDays,
  FileText,
  Flag,
  HeartHandshake,
  Home,
  Image,
  Lightbulb,
  Library,
  LogIn,
  Megaphone,
  MessageCircle,
  Network,
  Plus,
  Search,
  Send,
  ShieldCheck,
  Smartphone,
  Target,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import {
  analytics,
  analyticsInsights,
  announcements,
  calendar,
  celebrations,
  contentChannels,
  credentials,
  employees,
  forums,
  gallery,
  knowledge,
  leadershipOutcomes,
  moderationPlaybook,
  moderationQueue,
  projectWins,
  visibilityPools,
  type Announcement,
  type Employee,
  type GalleryItem,
  type LeadershipOutcome,
  type Role,
} from "@/lib/data";

type Screen = "login" | "employee" | "mobile" | "admin" | "moderation" | "content" | "analytics";

type ForumPost = {
  title: string;
  answers: number;
  status: string;
  pool: string;
  replies: string[];
};

const icons = {
  home: Home,
  bell: Bell,
  heart: HeartHandshake,
  search: Search,
  book: BookOpen,
  shield: ShieldCheck,
  chart: BarChart3,
  users: Users,
};

const panelIcons: Record<string, LucideIcon> = {
  "Priority Updates": Megaphone,
  "Leadership Meet Outcomes": Target,
  "Project Wins and Footprints": Trophy,
  "Recognition Wall": HeartHandshake,
  "Engagement Calendar": CalendarDays,
  "Colleague Discovery": Network,
  "Knowledge and Forums": Library,
  "Gallery": Image,
  Leaderboard: Award,
  "Moderation Technique": Flag,
  "Visibility Pools": Building2,
  "Publishing Planner": FileText,
  "Participation by Department": BarChart3,
  "Moderation Playbook": ShieldCheck,
  "Escalation Lanes": Users,
  "Channel Calendar": CalendarDays,
  "Content Quality Checklist": FileText,
  "Engagement Signals": Lightbulb,
  "Recommended Actions": Target,
};

function readSession<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.sessionStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeSession(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try { window.sessionStorage.setItem(key, JSON.stringify(value)); } catch { /* noop */ }
}

export default function Experience({ screen }: { screen: Screen }) {
  const [role, setRole] = useState<Role>("employee");
  const [user, setUser] = useState<Role | null>(null);
  const [notice, setNotice] = useState("");
  const [department, setDepartment] = useState("All");
  const [kudos, setKudos] = useState(0);
  const [appreciatedPosts, setAppreciatedPosts] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  // Hydrate persisted state from sessionStorage after mount
  useEffect(() => {
    setKudos(readSession("orgsphere-kudos", 0));
    setAppreciatedPosts(readSession<string[]>("orgsphere-appreciated", []));
  }, []);

  function appreciate(postTitle: string) {
    if (appreciatedPosts.includes(postTitle) || kudos >= 18) return;
    const nextPosts = [...appreciatedPosts, postTitle];
    const nextKudos = kudos + 1;
    setAppreciatedPosts(nextPosts);
    setKudos(nextKudos);
    writeSession("orgsphere-appreciated", nextPosts);
    writeSession("orgsphere-kudos", nextKudos);
  }

  const visibleAnnouncements = useMemo(
    () => announcements.filter((item) => department === "All" || item.audience.includes(department) || item.audience === "All"),
    [department]
  );

  function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "");
    const password = String(form.get("password") || "");
    const match = Object.values(credentials).find((a) => a.email === email && a.password === password);
    if (!match) {
      setNotice("We could not verify those details. Please check your email and password.");
      return;
    }
    setUser(match.role);
    window.sessionStorage.setItem("orgsphere-role", match.role);
    window.location.href = match.role === "admin" ? "/admin" : "/employee";
  }

  if (screen === "login") return <Login onSubmit={login} role={role} setRole={setRole} notice={notice} />;
  if (screen === "mobile") return <MobileExperience kudos={kudos} setKudos={(v) => { setKudos(v); writeSession("orgsphere-kudos", v); }} />;
  if (["admin", "moderation", "content", "analytics"].includes(screen)) return <AdminExperience screen={screen} />;

  const filteredPeople = employees.filter((person) =>
    `${person.name} ${person.skills.join(" ")} ${person.department}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Shell role={user || "employee"}>
      <section className="hero">
        <div>
          <p className="eyebrow">Management vision</p>
          <h1>One place to understand direction, celebrate impact and find the people who can help.</h1>
          <p>OrgSphere turns leadership intent, department work, recognition and reference knowledge into a visible engagement layer.</p>
        </div>
        <div className="hero-panel">
          <span>Q2 North Star</span>
          <strong>Customer clarity in every decision</strong>
          <p>Leadership meet outcomes are translated into tracked commitments across teams.</p>
        </div>
      </section>

      <div className="toolbar">
        {["All", "Digital", "Finance", "Bengaluru"].map((item) => (
          <button className={department === item ? "active" : ""} onClick={() => setDepartment(item)} key={item}>{item}</button>
        ))}
      </div>

      <main className="grid">
        <Panel title="Priority Updates" action="Audience filtered" icon={Megaphone}>
          {visibleAnnouncements.map((item) => <AnnouncementCard key={item.title} item={item} />)}
        </Panel>

        <Panel title="Leadership Meet Outcomes" action="Monthly rhythm" icon={Target}>
          {leadershipOutcomes.map((item) => <Progress key={item.topic} item={item} />)}
        </Panel>

        <Panel title="Project Wins and Footprints" icon={Trophy} wide>
          {projectWins.map((item) => <Win key={item.title} item={item} />)}
        </Panel>

        <Panel title="Recognition Wall" action={`${kudos} sent by you`} icon={HeartHandshake}>
          {celebrations.map((item) => (
            <div className="celebration" key={item.title}>
              <div className="image-strip" style={{ background: item.image }} />
              <div>
                <strong>{item.title}</strong>
                <span>{item.mood} | {item.replies} replies</span>
              </div>
              <button
                className={appreciatedPosts.includes(item.title) ? "is-appreciated" : ""}
                disabled={appreciatedPosts.includes(item.title)}
                onClick={() => appreciate(item.title)}
              >
                <HeartHandshake size={15} />
                {appreciatedPosts.includes(item.title) ? "Appreciated" : "Appreciate"}
              </button>
            </div>
          ))}
        </Panel>

        <Panel title="Engagement Calendar" icon={CalendarDays}>
          <div className="calendar">
            {calendar.map((item) => (
              <article className="calendar-item" key={item.day}>
                <span>{item.day}</span>
                <div className="bar-stage"><div style={{ height: `${item.load}px` }} /></div>
                <strong>{item.label}</strong>
                <small>{item.type}</small>
              </article>
            ))}
          </div>
        </Panel>

        <Panel title="Colleague Discovery" action="Break silos" icon={Network}>
          <input className="search" placeholder="Search people, skills or departments" value={query} onChange={(e) => setQuery(e.target.value)} />
          {filteredPeople.map((person) => <Person key={person.name} person={person} />)}
        </Panel>

        <Panel title="Knowledge and Forums" icon={Library} wide>
          <ForumPanel />
        </Panel>

        <Panel title="Gallery" icon={Image} wide>
          <GalleryPanel items={gallery} />
        </Panel>

        <Panel title="Leaderboard" icon={Award}>
          {employees.slice().sort((a, b) => b.points - a.points).map((person, index) => (
            <div className="leader" key={person.name}>
              <span>#{index + 1}</span>
              <strong>{person.name}</strong>
              <small>{person.points} pts</small>
            </div>
          ))}
        </Panel>
      </main>
    </Shell>
  );
}

function ForumPanel() {
  const [posts, setPosts] = useState<ForumPost[]>(
    forums.map((f) => ({ ...f, replies: [] }))
  );
  const [newQuestion, setNewQuestion] = useState("");
  const [replyTexts, setReplyTexts] = useState<Record<string, string>>({});
  const [expandedPost, setExpandedPost] = useState<string | null>(null);

  function submitQuestion() {
    const q = newQuestion.trim();
    if (!q) return;
    setPosts((prev) => [{ title: q, answers: 0, status: "Open", pool: "All", replies: [] }, ...prev]);
    setNewQuestion("");
  }

  function submitReply(postTitle: string) {
    const r = (replyTexts[postTitle] || "").trim();
    if (!r) return;
    setPosts((prev) =>
      prev.map((p) =>
        p.title === postTitle
          ? { ...p, answers: p.answers + 1, replies: [...p.replies, r], status: p.status === "Open" ? "Answered" : p.status }
          : p
      )
    );
    setReplyTexts((prev) => ({ ...prev, [postTitle]: "" }));
  }

  return (
    <div className="forum-panel">
      <div className="knowledge-list">
        {knowledge.slice(0, 3).map((item) => (
          <article className="doc" key={item.title}>
            <FileText size={17} />
            <div><strong>{item.title}</strong><small>{item.type} | {item.owner} | {item.access} | {item.updated}</small></div>
          </article>
        ))}
      </div>
      <div className="forum-ask">
        <input
          className="search"
          placeholder="Ask a question or start a discussion…"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") submitQuestion(); }}
        />
        <button className="ask-btn" onClick={submitQuestion}><Plus size={16} />Post</button>
      </div>
      {posts.map((item) => (
        <article className="forum" key={item.title}>
          <MessageCircle size={17} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <button
              className="forum-title-btn"
              onClick={() => setExpandedPost(expandedPost === item.title ? null : item.title)}
            >
              <strong>{item.title}</strong>
            </button>
            <span>{item.status} | {item.answers} answers | {item.pool}</span>
            {expandedPost === item.title && (
              <div className="forum-replies">
                {item.replies.length === 0 && <p className="forum-empty">No replies yet. Be the first to answer.</p>}
                {item.replies.map((r, i) => (
                  <div className="forum-reply" key={i}><span>You</span><p>{r}</p></div>
                ))}
                <div className="forum-reply-input">
                  <input
                    className="search"
                    placeholder="Write a reply…"
                    value={replyTexts[item.title] || ""}
                    onChange={(e) => setReplyTexts((prev) => ({ ...prev, [item.title]: e.target.value }))}
                    onKeyDown={(e) => { if (e.key === "Enter") submitReply(item.title); }}
                  />
                  <button className="ask-btn" onClick={() => submitReply(item.title)}><Send size={14} /></button>
                </div>
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

function GalleryPanel({ items }: { items: GalleryItem[] }) {
  const categories = ["All", "Events", "Celebrations", "Townhall", "Culture"];
  const [filter, setFilter] = useState("All");
  const visible = filter === "All" ? items : items.filter((i) => i.category === filter);

  return (
    <div>
      <div className="gallery-filters">
        {categories.map((c) => (
          <button key={c} className={filter === c ? "active" : ""} onClick={() => setFilter(c)}>{c}</button>
        ))}
      </div>
      <div className="gallery-grid">
        {visible.map((item) => (
          <div key={item.title} className="gallery-card" style={{ background: item.gradient }}>
            <span className="gallery-emoji">{item.emoji}</span>
            <div className="gallery-info">
              <strong>{item.title}</strong>
              <small>{item.category} · {item.location} · {item.date}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminExperience({ screen }: { screen: Screen }) {
  const title = {
    admin: "HR/Admin Command Center",
    moderation: "Moderation Queue",
    content: "Content and Visibility Controls",
    analytics: "Engagement Analytics",
    employee: "Employee",
    login: "Login",
    mobile: "Mobile",
  }[screen];

  return (
    <Shell role="admin">
      <section className="admin-head">
        <div>
          <p className="eyebrow">Governance layer</p>
          <h1>{title}</h1>
          <p>Publish, prioritize and moderate employee communication without turning the intranet into noise.</p>
        </div>
        {/* <Link className="primary link-button" href="/employee">View employee side</Link> */}
      </section>
      <main className="grid admin-grid">
        {(screen === "admin" || screen === "analytics") && analytics.map((item) => <Metric key={item.label} item={item} />)}
        {(screen === "admin" || screen === "moderation") && (
          <Panel title="Moderation Technique" icon={Flag}>
            {moderationQueue.map((item) => <Moderation key={item.item} item={item} />)}
          </Panel>
        )}
        {screen === "moderation" && (
          <Panel title="Moderation Playbook" icon={ShieldCheck} wide>
            {moderationPlaybook.map((item) => <PlaybookRule key={item.title} item={item} />)}
          </Panel>
        )}
        {screen === "moderation" && (
          <Panel title="Escalation Lanes" icon={Users}>
            {[
              { lane: "People Partner", scope: "Tone, inclusion and conduct coaching", time: "Same day" },
              { lane: "Comms Owner", scope: "Message accuracy and business claims", time: "4 hours" },
              { lane: "Admin Reviewer", scope: "Duplicates, clutter and routing", time: "2 hours" },
            ].map((item) => <Lane key={item.lane} item={item} />)}
          </Panel>
        )}
        {(screen === "admin" || screen === "content") && (
          <Panel title="Visibility Pools" icon={Building2} wide>
            {visibilityPools.map((item) => <Pool key={item.name} item={item} />)}
          </Panel>
        )}
        {(screen === "admin" || screen === "content") && (
          <Panel title="Publishing Planner" icon={FileText}>
            {announcements.map((item) => <AnnouncementCard key={item.title} item={item} />)}
          </Panel>
        )}
        {screen === "content" && (
          <Panel title="Channel Calendar" icon={CalendarDays} wide>
            {contentChannels.map((item) => <Channel key={item.channel} item={item} />)}
          </Panel>
        )}
        {screen === "content" && (
          <Panel title="Content Quality Checklist" icon={FileText}>
            {[
              "Audience is clear and restricted where needed",
              "Business update has owner, impact and proof point",
              "Recognition post names contributors visibly",
              "Policy content links to the latest document",
              "Calendar post avoids overlap with urgent announcements",
            ].map((item) => <Checklist key={item} label={item} />)}
          </Panel>
        )}
        {(screen === "admin" || screen === "analytics") && (
          <Panel title="Participation by Department" icon={BarChart3}>
            {employees.map((person) => (
              <Progress key={person.name} item={{ topic: person.department, owner: person.name, outcome: person.role, progress: Math.round(person.points / 10) }} />
            ))}
          </Panel>
        )}
        {screen === "analytics" && (
          <Panel title="Engagement Signals" icon={Lightbulb} wide>
            {analyticsInsights.map((item) => <Insight key={item.signal} item={item} />)}
          </Panel>
        )}
        {screen === "analytics" && (
          <Panel title="Recommended Actions" icon={Target}>
            {[
              { action: "Pin leadership note", impact: "Improve priority visibility" },
              { action: "Nudge low-participation departments", impact: "Balance culture reach" },
              { action: "Feature top forum answerers", impact: "Encourage knowledge sharing" },
              { action: "Move repeated HR questions into quick links", impact: "Reduce policy noise" },
            ].map((item) => <ActionCard key={item.action} item={item} />)}
          </Panel>
        )}
      </main>
    </Shell>
  );
}

function MobileExperience({ kudos, setKudos }: { kudos: number; setKudos: (value: number) => void }) {
  const [sentMobileKudos, setSentMobileKudos] = useState(false);

  return (
    <div className="mobile-stage">
      <div className="phone">
        <header><span>9:41</span><strong>OrgSphere</strong><span>···</span></header>
        <section className="mobile-hero"><p>Today</p><h2>CEO note and 3 wins need your attention</h2></section>
        {announcements.slice(0, 3).map((item) => <AnnouncementCard key={item.title} item={item} compact />)}
        <div className="mobile-card">
          <strong>Send peer appreciation</strong>
          <p>Recognize someone from another team for visible collaboration.</p>
          <button
            className={sentMobileKudos ? "is-appreciated" : ""}
            disabled={sentMobileKudos}
            onClick={() => {
              if (sentMobileKudos || kudos >= 18) return;
              setSentMobileKudos(true);
              setKudos(kudos + 1);
            }}
          >
            <HeartHandshake size={15} />
            {sentMobileKudos ? `Kudos sent (${kudos})` : `Send kudos (${kudos})`}
          </button>
        </div>
        <div className="mobile-card"><strong>Quick directory</strong>{employees.slice(0, 3).map((person) => <Person key={person.name} person={person} compact />)}</div>
        <nav className="mobile-tabs">
          <TabIcon icon={icons.home} label="Home" />
          <TabIcon icon={icons.bell} label="Updates" />
          <TabIcon icon={icons.heart} label="Appreciate" />
          <TabIcon icon={icons.search} label="Directory" />
          <TabIcon icon={icons.book} label="Hub" />
        </nav>
      </div>
      <Link className="back-link" href="/employee">Back to employee web console</Link>
    </div>
  );
}

function NavLink({ active, href, icon: Icon, label }: { active?: boolean; href: string; icon: LucideIcon; label: string }) {
  return <Link className={active ? "active" : ""} href={href}><Icon size={18} />{label}</Link>;
}

function isActivePath(pathname: string, href: string) {
  if (href === "/employee") return pathname === "/employee";
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function TabIcon({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return <span><Icon size={19} /><small>{label}</small></span>;
}

function Panel({ title, action, children, wide, icon }: { title: string; action?: string; children: ReactNode; wide?: boolean; icon?: LucideIcon }) {
  const Icon = icon || panelIcons[title];
  return (
    <section className={`panel ${wide ? "wide" : ""}`}>
      <div className="panel-head">
        <h2>{Icon ? <Icon className="panel-icon" size={18} /> : null}{title}</h2>
        {action ? <span>{action}</span> : null}
      </div>
      {children}
    </section>
  );
}

function AnnouncementCard({ item, compact }: { item: Announcement; compact?: boolean }) {
  return (
    <article className={`row-card ${compact ? "compact" : ""}`}>
      <span className={`pill ${item.urgency.toLowerCase()}`}>{item.urgency}</span>
      <div><strong>{item.title}</strong><small>{item.tag} | {item.audience} | {item.date} | {item.reads} reads</small></div>
    </article>
  );
}

function Progress({ item }: { item: LeadershipOutcome }) {
  return (
    <article className="progress-card">
      <div><strong>{item.topic}</strong><small>{item.owner} | {item.outcome}</small></div>
      <div className="bar"><span style={{ width: `${item.progress}%` }} /></div>
    </article>
  );
}

function Win({ item }: { item: (typeof projectWins)[number] }) {
  return (
    <article className="win">
      <div><strong>{item.title}</strong><small>{item.team} | {item.people}</small></div>
      <span>{item.impact}</span>
      <em>{item.status}</em>
    </article>
  );
}

function Person({ person, compact }: { person: Employee; compact?: boolean }) {
  return (
    <article className={`person ${compact ? "compact" : ""}`}>
      <span>{person.name.split(" ").map((part) => part[0]).join("")}</span>
      <div><strong>{person.name}</strong><small>{person.role} | {person.department} | {person.location}</small></div>
    </article>
  );
}

function Metric({ item }: { item: (typeof analytics)[number] }) {
  return <section className="metric"><span>{item.label}</span><strong>{item.value}</strong><em>{item.change}</em></section>;
}

function Moderation({ item }: { item: (typeof moderationQueue)[number] }) {
  return <article className="moderation"><strong>{item.item}</strong><small>{item.risk} | {item.action} | {item.owner}</small><button>Review</button></article>;
}

function Pool({ item }: { item: (typeof visibilityPools)[number] }) {
  return <article className="pool"><div><strong>{item.name}</strong><small>{item.policy}</small></div><span>{item.members} people</span></article>;
}

function PlaybookRule({ item }: { item: (typeof moderationPlaybook)[number] }) {
  return <article className="admin-detail"><div><strong>{item.title}</strong><small>{item.rule}</small></div><span>{item.queue}</span></article>;
}

function Lane({ item }: { item: { lane: string; scope: string; time: string } }) {
  return <article className="admin-detail"><div><strong>{item.lane}</strong><small>{item.scope}</small></div><span>{item.time}</span></article>;
}

function Channel({ item }: { item: (typeof contentChannels)[number] }) {
  return <article className="admin-detail"><div><strong>{item.channel}</strong><small>{item.cadence} | {item.owner} | {item.next}</small></div><span>{item.reach}</span></article>;
}

function Checklist({ label }: { label: string }) {
  return <article className="check-item"><span>OK</span><strong>{label}</strong></article>;
}

function Insight({ item }: { item: (typeof analyticsInsights)[number] }) {
  return <article className="insight"><div><strong>{item.signal}</strong><small>{item.evidence}</small></div><span>{item.action}</span></article>;
}

function ActionCard({ item }: { item: { action: string; impact: string } }) {
  return <article className="check-item"><span>Go</span><div><strong>{item.action}</strong><small>{item.impact}</small></div></article>;
}

function Shell({ children, role }: { children: ReactNode; role: Role }) {
  const pathname = usePathname();
  const employeeLinks = [
    { href: "/employee", icon: icons.home, label: "Employee home" },
    { href: "/employee/mobile-preview", icon: Smartphone, label: "Mobile app" },
  ];
  const adminLinks = [
    { href: "/admin", icon: icons.shield, label: "Admin center" },
    { href: "/admin/moderation", icon: icons.users, label: "Moderation" },
    { href: "/admin/content", icon: icons.book, label: "Content" },
    { href: "/admin/analytics", icon: icons.chart, label: "Analytics" },
  ];
  const navLinks = role === "admin" ? adminLinks : employeeLinks;

  return (
    <div className="app-shell">
      <aside>
        <div className="brand"><span>OS</span><strong>OrgSphere</strong></div>
        <nav>
          {navLinks.map((item) => (
            <NavLink active={isActivePath(pathname, item.href)} href={item.href} icon={item.icon} key={item.href} label={item.label} />
          ))}
        </nav>
        <div className="identity"><span>{role}</span><Link href="/login">Logout</Link></div>
      </aside>
      <div className="content">{children}</div>
    </div>
  );
}

function Login({ onSubmit, role, setRole, notice }: { onSubmit: (event: FormEvent<HTMLFormElement>) => void; role: Role; setRole: (role: Role) => void; notice: string }) {
  const selected = credentials[role];
  return (
    <div className="login-screen">
      <section className="login-copy">
        <p className="eyebrow">OrgSphere intranet</p>
        <h1>Connect every team to company direction, culture and impact.</h1>
        <p>A shared workplace hub for leadership updates, recognition, collaboration, knowledge and meaningful employee moments.</p>
        <div className="login-stats">
          <span><Library size={20} /><strong>18</strong> modules</span>
          <span><ShieldCheck size={20} /><strong>4</strong> visibility pools</span>
          <span><Users size={20} /><strong>2</strong> role journeys</span>
        </div>
      </section>
      <form className="login-card" onSubmit={onSubmit}>
        <div className="role-toggle">
          <button type="button" className={role === "employee" ? "active" : ""} onClick={() => setRole("employee")}>Employee</button>
          <button type="button" className={role === "admin" ? "active" : ""} onClick={() => setRole("admin")}>HR/Admin</button>
        </div>
        <label>Email<input name="email" defaultValue={selected.email} /></label>
        <label>Password<input name="password" defaultValue={selected.password} type="password" /></label>
        {notice ? <p className="notice">{notice}</p> : null}
        <button className="primary"><LogIn size={17} />Enter workspace</button>
      </form>
    </div>
  );
}
