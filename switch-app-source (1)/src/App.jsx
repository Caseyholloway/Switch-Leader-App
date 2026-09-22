import React, { useState, useEffect } from "react";
import {
  Home, Calendar, Users, MessageCircle, BookOpen, ChevronRight,
  Bell, Gift, ArrowLeft, Heart, MessageSquare, Link2, BarChart2, Check, Camera, User, GraduationCap
} from "lucide-react";

const INK = "#F5F4F0";
const PAPER = "#0B0B0D";
const SURFACE = "#1A1A1E";
const EMBER = "#FFFFFF";
const EMBER_TEXT = "#0B0B0D";
const CORAL = "#FF6B57";
const MUTED = "#8A8D9A";

const TEAMS = [
  { id: "leadership", label: "Leadership Team" },
  { id: "small-group-guys", label: "Boys Small Group Leader" },
  { id: "small-group-girls", label: "Girls Small Group Leader" },
  { id: "host", label: "Host Team" },
  { id: "ops", label: "Ops Team" },
  { id: "cover2", label: "Cover 2" },
  { id: "tech", label: "Tech Team" },
];
const LEADERSHIP_ROLES = ["Coach", "Community Lead", "Pastor"];

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const GRADES = ["6th Grade","7th Grade","8th Grade","9th Grade","10th Grade","11th Grade","12th Grade"];
const SERVING_YEARS = Array.from({ length: 20 }, (_, i) => 2026 - i);

const STUDENT_GENDERS = [
  { id: "guys", label: "Boys", teamId: "small-group-guys" },
  { id: "girls", label: "Girls", teamId: "small-group-girls" },
];
const STUDENT_GROUPS = STUDENT_GENDERS.flatMap((g) =>
  GRADES.map((grade) => ({
    id: `${g.id}-${grade.toLowerCase().replace(" ", "-")}`,
    genderId: g.id, genderLabel: g.label, teamId: g.teamId, grade,
    label: `${g.label} — ${grade}`,
  }))
);
const SEED_STUDENTS = [];

const SCHEDULE = [
  { date: "Sep 23", title: "No Switch IRL — Family Reunion", time: "—", note: "No in-person Switch this week (Family Reunion). Intern Orientation Sept 29." },
  { date: "Sep 30", title: "Switch — SwitchFest: Silent Disco", time: "6:30–8:00pm", note: "Video · Leaders huddle 6:20pm" },
  { date: "Oct 7", title: "Switch — regular night", time: "6:30–8:00pm", note: "Series: Gospel Shaped Relationships (Acts) · Live Speak · Leaders huddle 6:20pm" },
  { date: "Oct 14", title: "Switch — Worship Night", time: "6:30–8:00pm", note: "Series: Gospel Shaped Relationships (Acts) · Combined Switch night · Video · Leaders huddle 6:20pm" },
  { date: "Oct 21", title: "Switch — regular night", time: "6:30–8:00pm", note: "Series: Gospel Shaped Relationships (Acts) · Video · Leaders huddle 6:20pm · GIE Oct 26" },
  { date: "Oct 28", title: "Switch — Small Group Theme Night", time: "6:30–8:00pm", note: "Dress up like a celebrity / tribe war · Video · Leaders huddle 6:20pm · Fall Fest Oct 31–Nov 1" },
  { date: "Nov 4", title: "Switch — regular night", time: "6:30–8:00pm", note: "Series: The Priorities of Heaven (Epistle) · Live Speak · Leaders huddle 6:20pm · Q4 Baptism Nov 7–9" },
  { date: "Nov 11", title: "Switch — regular night", time: "6:30–8:00pm", note: "Series: The Priorities of Heaven (Epistle) · Video · Leaders huddle 6:20pm" },
  { date: "Nov 18", title: "Switch — SwitchGiving", time: "6:30–8:00pm", note: "Series: The Priorities of Heaven (Epistle) · Video · Leaders huddle 6:20pm · Thanksgiving Break Nov 25–27" },
  { date: "Nov 25", title: "No Switch IRL — Thanksgiving Week", time: "—", note: "No in-person Switch this week. Inside Out Nov 30–Dec 1." },
  { date: "Dec 2", title: "Switch — regular night", time: "6:30–8:00pm", note: "Series: Final Phase (Revelation) · Live Speak · Leaders huddle 6:20pm · GIE Dec 7" },
  { date: "Dec 9", title: "Switch — regular night", time: "6:30–8:00pm", note: "Series: Final Phase (Revelation) · Video · Leaders huddle 6:20pm" },
  { date: "Dec 16", title: "Switch — The Switchies Awards", time: "6:30–8:00pm", note: "Series: Final Phase (Revelation) · Combined Switch night · Video · Leaders huddle 6:20pm" },
];

const LEADERSHIP_TEAM = [];

const SWITCH_TEAM = [];

const POSTS = [];

const PRAYER_REQUESTS = [];

const CELEBRATIONS = [];

const RESOURCES_ESSENTIAL = ["Leader handbook", "Background check portal", "Emergency procedures"];
const RESOURCES_LINKS = [
  { label: "The Switch Leader Podcast", url: "https://switchleader.podbean.com/" },
  { label: "How to Understand the Bible", url: "https://finds.life.church/can-actually-understand-bible/" },
  { label: "Culture Translator", url: "https://axis.org/the-culture-translator/" },
  { label: "Axis Parent Guides", url: "https://axis.org/parent-guides/" },
  { label: "Parenting Tools", url: "https://www.life.church/parentingtools/" },
  { label: "Craig Groeschel Leadership Podcast", url: "https://www.life.church/leadershippodcast/" },
  { label: "Stay Here Training", url: "https://www.stayherenetwork.com/" },
  { label: "The Bible Project", url: "https://bibleproject.com/" },
];

const TEEN_FAQS = [
  {
    q: "How do I know God is real?",
    a: "Faith isn't blind — Romans 1:20 points to creation itself as evidence, and Psalm 34:8 invites us to 'taste and see' God's goodness for ourselves. Faith tends to grow through experience, community, and time in Scripture, not from having every question answered first.",
  },
  {
    q: "Why does God let bad things happen?",
    a: "God doesn't promise a pain-free life, but He promises to be close in it (Psalm 34:18) and to work good even through hard things (Romans 8:28). A lot of suffering traces back to a broken world and human choices, not God wanting us to hurt — and Jesus himself wept with people in their grief (John 11:35).",
  },
  {
    q: "Is it wrong to doubt my faith?",
    a: "No — doubt shows up in every honest faith journey. Even John the Baptist, who baptized Jesus, sent someone to ask, 'Are you really the one?' (Matthew 11:2-3). God can handle our questions; bring them to Him and to a trusted leader instead of hiding them.",
  },
  {
    q: "Can I actually trust the Bible?",
    a: "It was written by dozens of authors across roughly 1,500 years, yet tells one consistent story, and its manuscripts are more numerous and better preserved than almost any other ancient text. More than that, 2 Timothy 3:16 says Scripture is 'God-breathed' — not just a history book, but something God speaks through.",
  },
  {
    q: "What happens when I die?",
    a: "For anyone who trusts in Jesus, death isn't the end. He promises eternal life with Him (John 11:25-26), and Paul describes being away from the body as being at home with the Lord (2 Corinthians 5:8).",
  },
  {
    q: "Why do I need church if I can just believe on my own?",
    a: "Faith was never meant to be a solo thing. Hebrews 10:25 tells us not to give up meeting together, and the earliest believers devoted themselves to real community (Acts 2:42). We're built to encourage and be encouraged — church is where a lot of that happens.",
  },
  {
    q: "What about other religions — are they wrong?",
    a: "Jesus made a direct claim: 'I am the way, the truth, and the life; no one comes to the Father except through me' (John 14:6). That's worth wrestling with honestly — but it also means Christianity isn't about being 'better' than anyone else, it's about a relationship only Jesus offers.",
  },
  {
    q: "Why can't I do what my friends are doing?",
    a: "God's boundaries aren't there to make life boring — they're there to protect us (1 Corinthians 6:19-20, Proverbs 4:23). Following Jesus sometimes means looking different from the crowd, but that's for our good, not a punishment.",
  },
  {
    q: "How do I know God forgives me?",
    a: "1 John 1:9 says if we confess our sins, God is faithful and just to forgive us and cleanse us. It's a promise, not a feeling — His forgiveness doesn't depend on how guilty we still feel afterward.",
  },
  {
    q: "Why didn't God answer my prayer?",
    a: "Sometimes the answer is 'not yet' or 'not that way.' Even Jesus asked God to take away His suffering and was instead given strength to endure it (Matthew 26:39). God hears every prayer (1 John 5:14-15), even when the answer isn't what we hoped for.",
  },
  {
    q: "Does God still love me if I mess up?",
    a: "Nothing can separate us from God's love (Romans 8:38-39) — not even our own failures. Romans 5:8 says Christ died for us while we were still sinners, meaning His love was never a reward for good behavior. It came first.",
  },
  {
    q: "How do I find my purpose?",
    a: "Ephesians 2:10 says we're God's handiwork, created to do good works He planned in advance. Purpose starts with knowing whose you are before it's about what you do — a good next step is simply asking God to show you your gifts and calling.",
  },
];

const API_BASE = "/api/data";

async function apiGet(key) {
  try {
    const res = await fetch(`${API_BASE}?key=${key}`);
    if (!res.ok) return undefined;
    return await res.json();
  } catch (e) {
    return undefined;
  }
}

async function apiSet(key, value) {
  try {
    await fetch(`${API_BASE}?key=${key}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(value),
    });
  } catch (e) {
    // offline, or the shared backend isn't deployed yet — local copy is still saved
  }
}

function Logo() {
  return (
    <div style={{ textAlign: "center", marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
      <svg viewBox="0 0 300 300" width="44" height="44">
        <circle cx="150" cy="150" r="136" fill="none" stroke={INK} strokeWidth="18.5" />
        <path d="M98.8,114.1 L169.6,114.1 L179.1,111.8 L188.2,106.5 L196.2,97.3 L200.4,87.4 L201.2,76.8 L128.9,76.8 L121.3,78.7 L111.0,84.8 L103.4,93.9 L99.2,104.9 Z" fill={INK} />
        <path d="M98.8,131.6 L99.2,140.3 L103.8,152.1 L111.4,160.8 L120.1,166.2 L128.1,168.4 L201.2,168.4 L200.8,159.7 L196.2,147.9 L188.6,139.2 L179.9,133.8 L171.9,131.6 Z" fill={INK} />
        <path d="M98.8,223.2 L171.1,223.2 L178.7,221.3 L189.0,215.2 L196.6,206.1 L200.4,196.6 L201.2,185.9 L130.4,185.9 L120.9,188.2 L109.5,195.4 L103.8,202.7 L99.6,212.6 Z" fill={INK} />
      </svg>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 30, fontWeight: 700, color: INK }}>Switch</div>
    </div>
  );
}

function Screen({ children }) {
  return (
    <div style={{
      width: 380, maxWidth: "100%", margin: "0 auto", background: PAPER,
      borderRadius: 28, overflow: "hidden", fontFamily: "'Inter', system-ui, sans-serif",
      boxShadow: "0 1px 0 rgba(0,0,0,0.06)", border: `1px solid ${INK}14`,
      minHeight: 700, display: "flex", flexDirection: "column", position: "relative",
    }}>
      {children}
    </div>
  );
}

function Header({ title, onBack, action }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "18px 20px 14px", background: PAPER, color: INK, borderBottom: `1px solid ${INK}14`,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {onBack && (
          <button onClick={onBack} aria-label="Back" style={{
            background: "none", border: "none", color: INK, cursor: "pointer",
            padding: 4, display: "flex",
          }}><ArrowLeft size={20} /></button>
        )}
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 600 }}>{title}</span>
      </div>
      {action}
    </div>
  );
}

function PrimaryButton({ children, onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: "100%", padding: "14px 0", borderRadius: 14, border: "none",
      background: disabled ? `${INK}1f` : EMBER, color: disabled ? MUTED : EMBER_TEXT, fontWeight: 600,
      fontSize: 16, cursor: disabled ? "default" : "pointer", fontFamily: "inherit",
    }}>{children}</button>
  );
}

function TextField({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <label style={{ display: "block", marginBottom: 18 }}>
      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: MUTED, marginBottom: 6 }}>{label}</div>
      <input
        type={type} value={value} placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%", boxSizing: "border-box", padding: "14px 16px", borderRadius: 14,
          border: "none", fontSize: 16, fontFamily: "inherit", background: SURFACE, color: INK,
        }}
      />
    </label>
  );
}

function SelectField({ label, value, onChange, options, placeholder }) {
  return (
    <label style={{ display: "block", marginBottom: 18 }}>
      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: MUTED, marginBottom: 6 }}>{label}</div>
      <select value={value} onChange={(e) => onChange(e.target.value)} style={{
        width: "100%", boxSizing: "border-box", padding: "14px 16px", borderRadius: 14,
        border: "none", fontSize: 16, fontFamily: "inherit", background: SURFACE, color: value ? INK : MUTED,
      }}>
        <option value="">{placeholder}</option>
        {options.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
      </select>
    </label>
  );
}

function Card({ children, style }) {
  return (
    <div style={{
      background: SURFACE, borderRadius: 16, padding: "16px 18px", marginBottom: 14,
      border: `1px solid ${INK}14`, ...style,
    }}>{children}</div>
  );
}

function compressPhoto(file, onDone) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new window.Image();
    img.onload = () => {
      const maxDim = 220;
      let { width, height } = img;
      if (width > height && width > maxDim) { height = Math.round(height * (maxDim / width)); width = maxDim; }
      else if (height >= width && height > maxDim) { width = Math.round(width * (maxDim / height)); height = maxDim; }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      onDone(canvas.toDataURL("image/jpeg", 0.82));
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function PhotoUpload({ photo, onChange }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
      <label style={{ position: "relative", cursor: "pointer", display: "block" }}>
        <div style={{
          width: 88, height: 88, borderRadius: 44, background: SURFACE, overflow: "hidden",
          display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${INK}22`,
        }}>
          {photo
            ? <img src={photo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : <User size={36} color={MUTED} />}
        </div>
        <div style={{
          position: "absolute", bottom: 0, right: 0, width: 28, height: 28, borderRadius: 14,
          background: EMBER, display: "flex", alignItems: "center", justifyContent: "center",
          border: `2px solid ${PAPER}`,
        }}>
          <Camera size={14} color={EMBER_TEXT} />
        </div>
        <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => {
          const file = e.target.files[0];
          if (!file) return;
          compressPhoto(file, onChange);
          e.target.value = "";
        }} />
      </label>
    </div>
  );
}

export default function SwitchLeaderApp() {
  const [screen, setScreen] = useState("welcome");
  const [tab, setTab] = useState("home");
  const [form, setForm] = useState({
    name: "", phone: "", photo: "", team: null, grade: "", leadershipRole: "", month: "", day: "", started: "", startedMonth: "", startedYear: "", startedUnsure: false,
    drink: "", coffee: "", snack: "", notifications: null,
  });
  const [error, setError] = useState("");
  const [teamDetail, setTeamDetail] = useState(null);
  const [expandedPerson, setExpandedPerson] = useState(null);
  const [draft, setDraft] = useState("");
  const [posts, setPosts] = useState(POSTS);
  const [openReplyIndex, setOpenReplyIndex] = useState(null);
  const [replyDraft, setReplyDraft] = useState("");
  const [chatSubTab, setChatSubTab] = useState("updates");
  const [prayerDraft, setPrayerDraft] = useState("");
  const [prayerAnon, setPrayerAnon] = useState(false);
  const [prayerRequests, setPrayerRequests] = useState(PRAYER_REQUESTS);
  const [celebrationDraft, setCelebrationDraft] = useState("");
  const [celebrations, setCelebrations] = useState(CELEBRATIONS);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLogin, setAdminLogin] = useState(false);
  const [adminCode, setAdminCode] = useState("");
  const [adminError, setAdminError] = useState("");
  const [reconnectPhone, setReconnectPhone] = useState("");
  const [reconnectError, setReconnectError] = useState("");
  const [showAddHome, setShowAddHome] = useState(false);
  const [viewingImage, setViewingImage] = useState(null);
  const [eventDetail, setEventDetail] = useState(null);
  const [eventGuides, setEventGuides] = useState({});
  const [announcements, setAnnouncements] = useState([
    { body: "Welcome to the new Switch Leader app! Check here for anything urgent leadership needs you to know.", time: "1d ago" },
  ]);
  const [announcementDraft, setAnnouncementDraft] = useState("");
  const [resourcesSubTab, setResourcesSubTab] = useState("links");
  const [openFaq, setOpenFaq] = useState(null);
  const [confirmRemove, setConfirmRemove] = useState(null);
  const [students, setStudents] = useState(SEED_STUDENTS);
  const [studentGroupDetail, setStudentGroupDetail] = useState(null);
  const [expandedStudent, setExpandedStudent] = useState(null);
  const [addingStudent, setAddingStudent] = useState(false);
  const [studentDraft, setStudentDraft] = useState({ name: "", studentPhone: "", parentName: "", parentPhone: "" });
  const [confirmRemoveStudent, setConfirmRemoveStudent] = useState(null);
  const [confirmClearAll, setConfirmClearAll] = useState(false);
  const [checkedStorage, setCheckedStorage] = useState(false);
  const [roster, setRoster] = useState({
    leadership: [...LEADERSHIP_TEAM],
    switch: [...SWITCH_TEAM],
  });

  function teamLabel(teamId) {
    const found = TEAMS.find((t) => t.id === teamId);
    return found ? found.label : "Switch Team";
  }

  function upsert(list, entry) {
    const idx = list.findIndex((p) => p.phone && entry.phone && p.phone === entry.phone);
    if (idx >= 0) {
      const copy = [...list];
      copy[idx] = { ...copy[idx], ...entry };
      return copy;
    }
    return [...list, entry];
  }

  function removeFromRoster(person, listKey) {
    const matches = (p) => (person.phone ? p.phone === person.phone : p.name === person.name);
    setRoster((r) => ({ ...r, [listKey]: r[listKey].filter((p) => !matches(p)) }));
    setExpandedPerson(null);
  }

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("switchLeaderProfile");
      if (saved) {
        const parsed = JSON.parse(saved);
        setForm((f) => ({ ...f, ...parsed }));
        setScreen("app");
      }
      const savedRoster = window.localStorage.getItem("switchTeamRoster");
      if (savedRoster) setRoster(JSON.parse(savedRoster));
      const savedGuides = window.localStorage.getItem("switchEventGuides");
      if (savedGuides) setEventGuides(JSON.parse(savedGuides));
      const savedAnnouncements = window.localStorage.getItem("switchAnnouncements");
      if (savedAnnouncements) setAnnouncements(JSON.parse(savedAnnouncements));
      const savedStudents = window.localStorage.getItem("switchStudents");
      if (savedStudents) setStudents(JSON.parse(savedStudents));
      const savedPosts = window.localStorage.getItem("switchPosts");
      if (savedPosts) setPosts(JSON.parse(savedPosts));
      const savedPrayer = window.localStorage.getItem("switchPrayerRequests");
      if (savedPrayer) setPrayerRequests(JSON.parse(savedPrayer));
      const savedCelebrations = window.localStorage.getItem("switchCelebrations");
      if (savedCelebrations) setCelebrations(JSON.parse(savedCelebrations));
    } catch (e) {
      // storage unavailable — just start at onboarding with seed data
    }

    // Pull the shared, server-side copy if it's available (once the backend is deployed).
    // Falls back to whatever was just loaded from this device if the server has nothing yet.
    (async () => {
      const [r, s, p, pr, c, a] = await Promise.all([
        apiGet("roster"), apiGet("students"), apiGet("posts"),
        apiGet("prayerRequests"), apiGet("celebrations"), apiGet("announcements"),
      ]);
      if (r) setRoster(r);
      if (s) setStudents(s);
      if (p) setPosts(p);
      if (pr) setPrayerRequests(pr);
      if (c) setCelebrations(c);
      if (a) setAnnouncements(a);
      setCheckedStorage(true);
    })();
  }, []);

  // Poll the shared backend every 20s so everyone's phone stays reasonably in sync.
  useEffect(() => {
    if (!checkedStorage) return;
    const interval = setInterval(async () => {
      const [r, s, p, pr, c, a] = await Promise.all([
        apiGet("roster"), apiGet("students"), apiGet("posts"),
        apiGet("prayerRequests"), apiGet("celebrations"), apiGet("announcements"),
      ]);
      if (r) setRoster(r);
      if (s) setStudents(s);
      if (p) setPosts(p);
      if (pr) setPrayerRequests(pr);
      if (c) setCelebrations(c);
      if (a) setAnnouncements(a);
    }, 20000);
    return () => clearInterval(interval);
  }, [checkedStorage]);

  useEffect(() => {
    if (!checkedStorage) return;
    try {
      window.localStorage.setItem("switchTeamRoster", JSON.stringify(roster));
    } catch (e) {
      // storage unavailable — roster changes won't survive a refresh
    }
    apiSet("roster", roster);
  }, [roster, checkedStorage]);

  useEffect(() => {
    if (!checkedStorage) return;
    try {
      window.localStorage.setItem("switchEventGuides", JSON.stringify(eventGuides));
    } catch (e) {
      // storage unavailable — guide list won't survive a refresh
    }
  }, [eventGuides, checkedStorage]);

  useEffect(() => {
    if (!checkedStorage) return;
    try {
      window.localStorage.setItem("switchAnnouncements", JSON.stringify(announcements));
    } catch (e) {
      // storage unavailable — announcements won't survive a refresh
    }
    apiSet("announcements", announcements);
  }, [announcements, checkedStorage]);

  useEffect(() => {
    if (!checkedStorage) return;
    try {
      window.localStorage.setItem("switchStudents", JSON.stringify(students));
    } catch (e) {
      // storage unavailable — student roster won't survive a refresh
    }
    apiSet("students", students);
  }, [students, checkedStorage]);

  useEffect(() => {
    if (!checkedStorage) return;
    try {
      window.localStorage.setItem("switchPosts", JSON.stringify(posts));
    } catch (e) {}
    apiSet("posts", posts);
  }, [posts, checkedStorage]);

  useEffect(() => {
    if (!checkedStorage) return;
    try {
      window.localStorage.setItem("switchPrayerRequests", JSON.stringify(prayerRequests));
    } catch (e) {}
    apiSet("prayerRequests", prayerRequests);
  }, [prayerRequests, checkedStorage]);

  useEffect(() => {
    if (!checkedStorage) return;
    try {
      window.localStorage.setItem("switchCelebrations", JSON.stringify(celebrations));
    } catch (e) {}
    apiSet("celebrations", celebrations);
  }, [celebrations, checkedStorage]);

  function findByPhone(phone) {
    const all = [
      ...roster.leadership.map((p) => ({ ...p, listId: "leadership" })),
      ...roster.switch.map((p) => ({ ...p, listId: "switch" })),
    ];
    return all.find((p) => p.phone && phone && p.phone.trim() === phone.trim());
  }

  function reconnectDevice(phone) {
    const match = findByPhone(phone);
    if (!match) return false;
    const updated = { name: match.name, phone: match.phone, team: match.teamId || (match.listId === "leadership" ? "leadership" : null) };
    setForm((f) => ({ ...f, ...updated }));
    try {
      window.localStorage.setItem("switchLeaderProfile", JSON.stringify({ ...form, ...updated }));
    } catch (e) {}
    setScreen("app");
    return true;
  }

  function finishOnboarding() {
    try {
      window.localStorage.setItem("switchLeaderProfile", JSON.stringify(form));
    } catch (e) {
      // storage unavailable — app still works, just won't remember next visit
    }
    const entry = {
      name: form.name, phone: form.phone, photo: form.photo || null,
      role: form.team === "leadership" ? form.leadershipRole : teamLabel(form.team), teamId: form.team,
      grade: (form.team === "small-group-guys" || form.team === "small-group-girls") ? form.grade : null,
      birthday: form.month && form.day ? `${form.month} ${form.day}` : "—",
      started: form.startedUnsure ? "Not sure" : (form.startedMonth && form.startedYear ? `${form.startedMonth} ${form.startedYear}` : "—"),
      drink: form.drink || "—", coffee: form.coffee || "—", snack: form.snack || "—",
    };
    setRoster((r) => form.team === "leadership"
      ? { ...r, leadership: upsert(r.leadership, entry) }
      : { ...r, switch: upsert(r.switch, entry) });
    setScreen("app");
  }

  function clearAllTestData() {
    try {
      window.localStorage.removeItem("switchTeamRoster");
      window.localStorage.removeItem("switchStudents");
      window.localStorage.removeItem("switchEventGuides");
      window.localStorage.removeItem("switchAnnouncements");
      window.localStorage.removeItem("switchPosts");
      window.localStorage.removeItem("switchPrayerRequests");
      window.localStorage.removeItem("switchCelebrations");
    } catch (e) {}
    setRoster({ leadership: [], switch: [] });
    setStudents([]);
    setEventGuides({});
    setAnnouncements([]);
    setPosts([]);
    setPrayerRequests([]);
    setCelebrations([]);
    apiSet("roster", { leadership: [], switch: [] });
    apiSet("students", []);
    apiSet("announcements", []);
    apiSet("posts", []);
    apiSet("prayerRequests", []);
    apiSet("celebrations", []);
  }

  function resetDevice() {
    try { window.localStorage.removeItem("switchLeaderProfile"); } catch (e) {}
    setForm({
      name: "", phone: "", photo: "", team: null, grade: "", leadershipRole: "", month: "", day: "", started: "", startedMonth: "", startedYear: "", startedUnsure: false,
      drink: "", coffee: "", snack: "", notifications: null,
    });
    setIsAdmin(false);
    setAdminLogin(false);
    setAdminCode("");
    setTab("home");
    setScreen("welcome");
  }

  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));

  const steps = ["welcome", "profile", "notifications", "done"];
  const stepIndex = steps.indexOf(screen);

  function next() {
    if (screen === "welcome") {
      if (!form.name.trim() || !form.phone.trim()) {
        setError("Enter your name and phone number first.");
        return;
      }
    }
    if (screen === "profile" && !form.team) {
      setError("Pick a team to continue.");
      return;
    }
    if (screen === "profile" && (!form.month || !form.day)) {
      setError("Add your birth month and day.");
      return;
    }
    if (screen === "profile" && (form.team === "small-group-guys" || form.team === "small-group-girls") && !form.grade) {
      setError("Choose the grade you lead a small group for.");
      return;
    }
    if (screen === "profile" && form.team === "leadership" && !form.leadershipRole) {
      setError("Choose your leadership role.");
      return;
    }
    setError("");
    setScreen(steps[stepIndex + 1]);
  }

  function StepDots() {
    return (
      <div style={{ display: "flex", gap: 6, justifyContent: "center", margin: "6px 0 18px" }}>
        {steps.slice(0, 3).map((s, i) => (
          <div key={s} style={{
            width: 8, height: 8, borderRadius: 4,
            background: i <= stepIndex ? EMBER : `${INK}22`,
          }} />
        ))}
      </div>
    );
  }

  // ---- Onboarding screens ----
  if (!checkedStorage) {
    return <Screen><div style={{ flex: 1 }} /></Screen>;
  }

  if (screen !== "app") {
    return (
      <Screen>
        <div style={{ padding: "32px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
          <Logo />

          {screen !== "done" && screen !== "reconnect" && !(screen === "welcome" && adminLogin) && <StepDots />}

          {screen === "reconnect" && (
            <>
              <button onClick={() => setScreen("welcome")} style={{
                background: "none", border: "none", color: MUTED, fontSize: 13, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 4, fontFamily: "inherit", padding: 0, marginBottom: 14,
              }}><ArrowLeft size={14} /> Back</button>
              <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 600, color: INK, margin: "0 0 8px" }}>
                Reconnect with your phone
              </h1>
              <p style={{ fontSize: 13, color: MUTED, margin: "0 0 18px" }}>
                Enter the phone number you used when you signed up, and we'll pull up your profile.
              </p>
              <TextField label="Phone number" value={reconnectPhone} onChange={setReconnectPhone} placeholder="(555) 010-0182" type="tel" />
              {reconnectError && <div style={{ color: CORAL, fontSize: 13, margin: "-8px 0 12px" }}>{reconnectError}</div>}
            </>
          )}

          {screen === "welcome" && !adminLogin && (
            <>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", color: MUTED, marginBottom: 8 }}>WELCOME</div>
              <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 700, color: INK, margin: "0 0 20px" }}>
                Let's get you set up.
              </h1>
              <TextField label="Your name" value={form.name} onChange={set("name")} placeholder="First and last name" />
              <TextField label="Phone number" value={form.phone} onChange={set("phone")} placeholder="(405) 555-1234" type="tel" />
            </>
          )}

          {screen === "welcome" && adminLogin && (
            <>
              <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 600, color: INK, margin: "12px 0 20px" }}>
                Leadership access
              </h1>
              <p style={{ fontSize: 13, color: MUTED, margin: "0 0 16px" }}>
                Enter the leadership access code to unlock the admin roster (birthdays, anniversaries, favorites for the whole team).
              </p>
              <TextField label="Access code" value={adminCode} onChange={setAdminCode} placeholder="Ask Casey for this" />
              {adminError && <div style={{ color: CORAL, fontSize: 13, margin: "0 0 12px" }}>{adminError}</div>}
              <button onClick={() => setAdminLogin(false)} style={{
                background: "none", border: "none", color: MUTED, fontSize: 13, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 4, fontFamily: "inherit", padding: 0,
              }}><ArrowLeft size={14} /> Back</button>
            </>
          )}

          {screen === "profile" && (
            <>
              <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", color: MUTED, marginBottom: 16 }}>LEADER PROFILE</div>
              <div style={{ background: SURFACE, borderRadius: 20, padding: "20px 18px", border: `1px solid ${INK}14` }}>
                <PhotoUpload photo={form.photo} onChange={set("photo")} />
                <TextField label="Name" value={form.name} onChange={set("name")} placeholder="First and last name" />
                <TextField label="Phone number" value={form.phone} onChange={set("phone")} placeholder="(405) 555-1234" type="tel" />
                <SelectField label="Team" value={form.team} onChange={set("team")} options={TEAMS} placeholder="Choose your team" />
                {form.team === "leadership" && (
                  <SelectField label="Leadership role" value={form.leadershipRole} onChange={set("leadershipRole")}
                    options={LEADERSHIP_ROLES.map((r) => ({ id: r, label: r }))} placeholder="Which role?" />
                )}
                {(form.team === "small-group-guys" || form.team === "small-group-girls") && (
                  <SelectField label="Grade" value={form.grade} onChange={set("grade")}
                    options={GRADES.map((g) => ({ id: g, label: g }))} placeholder="Which grade do you lead?" />
                )}
                <div style={{ display: "flex", gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <SelectField label="Birthday month" value={form.month} onChange={set("month")}
                      options={MONTHS.map((m) => ({ id: m, label: m }))} placeholder="Month" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <SelectField label="Day" value={form.day} onChange={set("day")}
                      options={Array.from({ length: 31 }, (_, i) => i + 1).map((d) => ({ id: String(d), label: String(d) }))} placeholder="Day" />
                  </div>
                </div>
                {StartedField()}
                <TextField label="Favorite drink" value={form.drink} onChange={set("drink")} placeholder="e.g., Dr Pepper" />
                <TextField label="Coffee order" value={form.coffee} onChange={set("coffee")} placeholder="e.g., Iced vanilla latte" />
                <TextField label="Favorite snack" value={form.snack} onChange={set("snack")} placeholder="e.g., Hot Cheetos" />
              </div>
            </>
          )}

          {screen === "notifications" && (
            <div style={{ textAlign: "center", paddingTop: 20 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 28, background: `${EMBER}33`, margin: "0 auto 16px",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}><Bell size={26} color={INK} /></div>
              <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 600, color: INK, margin: "0 0 8px" }}>
                Turn on Switch alerts
              </h1>
              <p style={{ fontSize: 14, color: MUTED, margin: "0 0 24px" }}>
                Get a heads-up about huddles, schedule changes, and prayer needs.
              </p>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => { set("notifications")(false); setScreen("done"); }} style={{
                  flex: 1, padding: "12px 0", borderRadius: 12, border: `1px solid ${INK}33`,
                  background: SURFACE, color: INK, fontFamily: "inherit", cursor: "pointer",
                }}>Not now</button>
                <button onClick={() => { set("notifications")(true); setScreen("done"); }} style={{
                  flex: 1, padding: "12px 0", borderRadius: 12, border: "none",
                  background: EMBER, color: EMBER_TEXT, fontWeight: 600, fontFamily: "inherit", cursor: "pointer",
                }}>Turn on</button>
              </div>
            </div>
          )}

          {screen === "done" && (
            <div style={{ textAlign: "center", paddingTop: 20 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 28, background: `${EMBER}33`, margin: "0 auto 16px",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}><Check size={26} color={INK} /></div>
              <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 600, color: INK, margin: "0 0 8px" }}>
                You're all set
              </h1>
              <p style={{ fontSize: 14, color: MUTED, margin: "0 0 24px" }}>
                The Switch leader app is ready for {form.name.split(" ")[0] || "you"}.
              </p>
            </div>
          )}

          {error && <div style={{ color: CORAL, fontSize: 13, margin: "0 0 12px" }}>{error}</div>}

          <div style={{ marginTop: "auto", paddingTop: 12 }}>
            <PrimaryButton
              disabled={
                screen === "welcome" && !adminLogin ? !(form.name.trim() && form.phone.trim())
                : screen === "profile" ? !(form.team && form.month && form.day && ((form.team !== "small-group-guys" && form.team !== "small-group-girls") || form.grade) && (form.team !== "leadership" || form.leadershipRole))
                : screen === "reconnect" ? !reconnectPhone.trim()
                : false
              }
              onClick={
                screen === "done" ? finishOnboarding
                : screen === "welcome" && adminLogin ? () => {
                    if (adminCode.trim().toLowerCase() !== "switch") {
                      setAdminError("That code isn't right. Try 'switch' for this prototype.");
                      return;
                    }
                    setIsAdmin(true);
                    setForm((f) => ({ ...f, name: f.name || "Casey", team: f.team || "leadership" }));
                    setScreen("app");
                    setTab("teams");
                  }
                : screen === "reconnect" ? () => {
                    if (!reconnectPhone.trim()) { setReconnectError("Enter your phone number."); return; }
                    const ok = reconnectDevice(reconnectPhone);
                    if (!ok) setReconnectError("We couldn't find that number. Try leader orientation instead.");
                  }
                : next
              }>
              {screen === "done" ? "Start using the app" : screen === "reconnect" ? "Find my profile" : screen === "welcome" && adminLogin ? "Sign in" : "Continue"}
            </PrimaryButton>
          </div>

          {screen === "welcome" && !adminLogin && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 22, textAlign: "center" }}>
              <button onClick={() => { setScreen("reconnect"); setReconnectError(""); setReconnectPhone(""); }} style={{
                background: "none", border: "none", color: INK, fontWeight: 700, fontSize: 16,
                textDecoration: "underline", cursor: "pointer", fontFamily: "inherit",
              }}>Already set up? Reconnect with your phone ›</button>
              <button onClick={() => { setAdminLogin(true); setAdminError(""); }} style={{
                background: "none", border: "none", color: MUTED, fontWeight: 600, fontSize: 14,
                textDecoration: "underline", cursor: "pointer", fontFamily: "inherit",
              }}>Staff or leadership? Sign in</button>
            </div>
          )}
        </div>
      </Screen>
    );
  }

  // ---- Main app ----
  const firstName = form.name.split(" ")[0] || "there";

  function TabButton({ id, icon: Icon, label }) {
    const active = tab === id;
    return (
      <button onClick={() => { setTab(id); setTeamDetail(null); setStudentGroupDetail(null); }} style={{
        flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
        padding: "10px 0 8px", background: "none", border: "none", cursor: "pointer",
        color: active ? EMBER : `${INK}66`, fontFamily: "inherit", minWidth: 0,
      }}>
        <Icon size={19} />
        <span style={{ fontSize: 10, whiteSpace: "nowrap" }}>{label}</span>
      </button>
    );
  }



  function renderWithMentions(text) {
    const allNames = [...roster.leadership, ...roster.switch].map((p) => p.name.split(" ")[0]);
    const parts = text.split(/(@[A-Za-z]+)/g);
    return parts.map((part, i) => {
      if (part.startsWith("@")) {
        const match = allNames.find((n) => n.toLowerCase() === part.slice(1).toLowerCase());
        if (match) return <span key={i} style={{ color: EMBER, fontWeight: 700 }}>{part}</span>;
      }
      return part;
    });
  }

  function StartedField() {
    return (
      <div style={{ marginBottom: 4 }}>
        {!form.startedUnsure && (
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1 }}>
              <SelectField label="Started month" value={form.startedMonth} onChange={set("startedMonth")}
                options={MONTHS.map((m) => ({ id: m, label: m }))} placeholder="Month" />
            </div>
            <div style={{ flex: 1 }}>
              <SelectField label="Started year" value={form.startedYear} onChange={set("startedYear")}
                options={SERVING_YEARS.map((y) => ({ id: String(y), label: String(y) }))} placeholder="Year" />
            </div>
          </div>
        )}
        <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: form.startedUnsure ? 0 : -6, marginBottom: 18, color: MUTED, fontSize: 13, cursor: "pointer" }}>
          <input type="checkbox" checked={form.startedUnsure} onChange={(e) => set("startedUnsure")(e.target.checked)} />
          I'm not quite sure
        </label>
      </div>
    );
  }

  function HomeTab() {
    const notifCards = [
      { id: "home-screen", emoji: "📲", label: "Add to Your Home Screen" },
      !form.notifications && { id: "alerts", emoji: "🔔", label: "Turn on Switch Alerts" },
      { id: "profile", emoji: "👤", label: "Set Up Your Profile" },
    ].filter(Boolean);

    const now = new Date();
    const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const currentMonthAbbr = MONTHS[now.getMonth()];

    function daysUntil(monthIndex, day) {
      let target = new Date(todayMidnight.getFullYear(), monthIndex, day);
      if (target < todayMidnight) target = new Date(todayMidnight.getFullYear() + 1, monthIndex, day);
      return Math.round((target - todayMidnight) / 86400000);
    }

    const allPeople = [...roster.leadership, ...roster.switch];

    const birthdayEntries = allPeople.map((p) => {
      if (!p.birthday || p.birthday === "—") return null;
      const [monAbbr, dayStr] = p.birthday.split(" ");
      const monthIndex = MONTHS.indexOf(monAbbr);
      const day = parseInt(dayStr, 10);
      if (monthIndex === -1 || isNaN(day)) return null;
      const days = daysUntil(monthIndex, day);
      if (days > 6) return null;
      return { name: p.name, type: "birthday", days, dateLabel: p.birthday };
    }).filter(Boolean);

    const anniversaryEntries = allPeople.map((p) => {
      if (!p.started || p.started === "—" || p.started === "Not sure") return null;
      const [monAbbr, yearStr] = p.started.split(" ");
      if (monAbbr !== currentMonthAbbr) return null;
      const year = parseInt(yearStr, 10);
      if (isNaN(year)) return null;
      const years = now.getFullYear() - year;
      if (years <= 0) return null;
      return { name: p.name, type: "anniversary", years, dateLabel: `${monAbbr} ${now.getFullYear()}` };
    }).filter(Boolean);

    const thisWeekBirthdays = birthdayEntries
      .sort((a, b) => a.days - b.days)
      .map((e) => ({ ...e, isToday: e.days === 0 }));

    const thisMonthAnniversaries = anniversaryEntries.sort((a, b) => a.years - b.years);

    return (
      <div style={{ padding: "18px 18px 8px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <svg viewBox="0 0 300 300" width="38" height="38">
              <circle cx="150" cy="150" r="136" fill="none" stroke={INK} strokeWidth="18.5" />
              <path d="M98.8,114.1 L169.6,114.1 L179.1,111.8 L188.2,106.5 L196.2,97.3 L200.4,87.4 L201.2,76.8 L128.9,76.8 L121.3,78.7 L111.0,84.8 L103.4,93.9 L99.2,104.9 Z" fill={INK} />
              <path d="M98.8,131.6 L99.2,140.3 L103.8,152.1 L111.4,160.8 L120.1,166.2 L128.1,168.4 L201.2,168.4 L200.8,159.7 L196.2,147.9 L188.6,139.2 L179.9,133.8 L171.9,131.6 Z" fill={INK} />
              <path d="M98.8,223.2 L171.1,223.2 L178.7,221.3 L189.0,215.2 L196.6,206.1 L200.4,196.6 L201.2,185.9 L130.4,185.9 L120.9,188.2 L109.5,195.4 L103.8,202.7 L99.6,212.6 Z" fill={INK} />
            </svg>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 700, color: INK }}>Switch</div>
          </div>
          <div style={{ textAlign: "right", fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: MUTED, lineHeight: 1.5 }}>
            SOUTH TULSA<br />SWITCH LEADER APP
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 22 }}>
          {notifCards.map((c) => (
            <button key={c.id} onClick={() => {
              if (c.id === "alerts") {
                set("notifications")(true);
                try {
                  window.localStorage.setItem("switchLeaderProfile", JSON.stringify({ ...form, notifications: true }));
                } catch (e) {}
              } else if (c.id === "home-screen") {
                setShowAddHome(true);
              } else if (c.id === "profile") {
                setTab("editProfile");
              }
            }} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 14,
              background: SURFACE, border: "none", borderRadius: 16, padding: "16px 18px",
              cursor: "pointer", fontFamily: "inherit", textAlign: "left",
            }}>
              <span style={{ fontSize: 20 }}>{c.emoji}</span>
              <span style={{ flex: 1, fontSize: 16, fontWeight: 700, color: INK }}>{c.label}</span>
              <ChevronRight size={18} color={MUTED} />
            </button>
          ))}
        </div>

        {(announcements.length > 0 || isAdmin) && (
          <>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: MUTED, marginBottom: 10 }}>ANNOUNCEMENTS</div>
            {announcements.length === 0 && (
              <div style={{ fontSize: 13, color: MUTED, marginBottom: 14 }}>No announcements right now.</div>
            )}
            {announcements.map((a, i) => (
              <Card key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                  <div style={{ fontSize: 14, color: INK, flex: 1 }}>{a.body}</div>
                  {isAdmin && (
                    <button onClick={() => setAnnouncements(announcements.filter((_, idx) => idx !== i))} style={{
                      background: "none", border: "none", color: MUTED, cursor: "pointer",
                      fontFamily: "inherit", fontSize: 16, padding: 0, lineHeight: 1, flexShrink: 0,
                    }}>×</button>
                  )}
                </div>
                <div style={{ fontSize: 12, color: MUTED, marginTop: 6 }}>{a.time}</div>
              </Card>
            ))}
            {isAdmin && (
              <Card>
                <textarea value={announcementDraft} onChange={(e) => setAnnouncementDraft(e.target.value)}
                  placeholder="Post an announcement to all leaders..."
                  style={{
                    width: "100%", minHeight: 48, border: "none", resize: "none", fontFamily: "inherit",
                    fontSize: 14, outline: "none", boxSizing: "border-box", background: "transparent", color: INK,
                  }} />
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                  <button onClick={() => {
                    if (!announcementDraft.trim()) return;
                    setAnnouncements([{ body: announcementDraft, time: "just now" }, ...announcements]);
                    setAnnouncementDraft("");
                  }} style={{
                    padding: "8px 16px", borderRadius: 10, border: "none", background: EMBER,
                    color: EMBER_TEXT, fontWeight: 600, fontFamily: "inherit", cursor: "pointer", fontSize: 13,
                  }}>Post</button>
                </div>
              </Card>
            )}
          </>
        )}

        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: MUTED, marginBottom: 10 }}>THIS WEEK AT SWITCH</div>
        <Card>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{
              width: 18, height: 18, borderRadius: 5, border: `2px solid ${INK}55`, flexShrink: 0, marginTop: 3,
            }} />
            <div>
              <div style={{ fontWeight: 700, color: INK, marginBottom: 4 }}>{SCHEDULE[0].title}</div>
              <div style={{ fontSize: 14, color: MUTED }}>{SCHEDULE[0].note}</div>
            </div>
          </div>
        </Card>

        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: MUTED, margin: "18px 0 10px" }}>BIRTHDAYS THIS WEEK</div>
        {thisWeekBirthdays.length === 0 && (
          <div style={{ fontSize: 13, color: MUTED, marginBottom: 14 }}>No birthdays this week.</div>
        )}
        {thisWeekBirthdays.map((b) => (
          <Card key={b.name} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px" }}>
            <span style={{ fontSize: 20 }}>🎂</span>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: INK }}>{b.name}</span>
            </div>
            {b.isToday
              ? <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.05em", color: CORAL }}>TODAY</span>
              : <span style={{ fontSize: 14, color: MUTED }}>{b.dateLabel}</span>}
          </Card>
        ))}

        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", color: MUTED, margin: "18px 0 10px" }}>
          {now.toLocaleString("en-US", { month: "long" }).toUpperCase()} SERVING ANNIVERSARIES
        </div>
        {thisMonthAnniversaries.length === 0 && (
          <div style={{ fontSize: 13, color: MUTED, marginBottom: 14 }}>No serving anniversaries this month.</div>
        )}
        {thisMonthAnniversaries.map((a) => (
          <Card key={a.name} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px" }}>
            <span style={{ fontSize: 20 }}>🎉</span>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: INK }}>{a.name}</span>
              <span style={{ fontSize: 14, color: MUTED, marginLeft: 8 }}>{a.years} yr{a.years !== 1 ? "s" : ""}</span>
            </div>
          </Card>
        ))}

        <button onClick={resetDevice} style={{
          background: "none", border: "none", color: MUTED, fontSize: 12, textDecoration: "underline",
          cursor: "pointer", fontFamily: "inherit", padding: "10px 0 6px", display: "block",
        }}>Not you? Reset this device</button>

        {isAdmin && !confirmClearAll && (
          <button onClick={() => setConfirmClearAll(true)} style={{
            background: "none", border: "none", color: CORAL, fontSize: 12, textDecoration: "underline",
            cursor: "pointer", fontFamily: "inherit", padding: "4px 0 6px", display: "block",
          }}>Clear all test data (roster, students, chat)</button>
        )}
        {isAdmin && confirmClearAll && (
          <div style={{ marginTop: 8 }}>
            <div style={{ fontSize: 13, color: INK, marginBottom: 10 }}>
              This removes every leader, student, chat post, prayer request, celebration, and announcement — for everyone on this device. This can't be undone. Are you sure?
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setConfirmClearAll(false)} style={{
                flex: 1, padding: "10px 0", borderRadius: 10, border: `1px solid ${INK}33`,
                background: "none", color: INK, fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit",
              }}>Cancel</button>
              <button onClick={() => { clearAllTestData(); setConfirmClearAll(false); }} style={{
                flex: 1, padding: "10px 0", borderRadius: 10, border: "none",
                background: CORAL, color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit",
              }}>Clear everything</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  function EditProfileTab() {
    return (
      <div style={{ padding: "18px 18px 8px" }}>
        <div style={{ background: SURFACE, borderRadius: 20, padding: "20px 18px", border: `1px solid ${INK}14` }}>
          <PhotoUpload photo={form.photo} onChange={set("photo")} />
          <TextField label="Name" value={form.name} onChange={set("name")} placeholder="First and last name" />
          <TextField label="Phone number" value={form.phone} onChange={set("phone")} placeholder="(405) 555-1234" type="tel" />
          <SelectField label="Team" value={form.team} onChange={set("team")} options={TEAMS} placeholder="Choose your team" />
          {form.team === "leadership" && (
            <SelectField label="Leadership role" value={form.leadershipRole} onChange={set("leadershipRole")}
              options={LEADERSHIP_ROLES.map((r) => ({ id: r, label: r }))} placeholder="Which role?" />
          )}
          {(form.team === "small-group-guys" || form.team === "small-group-girls") && (
            <SelectField label="Grade" value={form.grade} onChange={set("grade")}
              options={GRADES.map((g) => ({ id: g, label: g }))} placeholder="Which grade do you lead?" />
          )}
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1 }}>
              <SelectField label="Birthday month" value={form.month} onChange={set("month")}
                options={MONTHS.map((m) => ({ id: m, label: m }))} placeholder="Month" />
            </div>
            <div style={{ flex: 1 }}>
              <SelectField label="Day" value={form.day} onChange={set("day")}
                options={Array.from({ length: 31 }, (_, i) => i + 1).map((d) => ({ id: String(d), label: String(d) }))} placeholder="Day" />
            </div>
          </div>
          {StartedField()}
          <TextField label="Favorite drink" value={form.drink} onChange={set("drink")} placeholder="e.g., Dr Pepper" />
          <TextField label="Coffee order" value={form.coffee} onChange={set("coffee")} placeholder="e.g., Iced vanilla latte" />
          <TextField label="Favorite snack" value={form.snack} onChange={set("snack")} placeholder="e.g., Hot Cheetos" />
        </div>
        <div style={{ marginTop: 16 }}>
          <PrimaryButton onClick={() => { finishOnboarding(); setTab("home"); }}>Save changes</PrimaryButton>
        </div>
      </div>
    );
  }

  function CalendarTab() {
    if (eventDetail) {
      const event = SCHEDULE.find((s) => s.date === eventDetail);
      const guides = eventGuides[eventDetail] || [];
      return (
        <div style={{ padding: "18px 18px 8px" }}>
          <button onClick={() => setEventDetail(null)} style={{
            background: "none", border: "none", color: MUTED, fontSize: 13, marginBottom: 12,
            cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontFamily: "inherit", padding: 0,
          }}><ArrowLeft size={14} /> Back</button>

          <Card>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ fontWeight: 700, color: INK, fontSize: 16 }}>{event.title}</div>
              <div style={{ fontSize: 13, color: MUTED }}>{event.date}</div>
            </div>
            <div style={{ fontSize: 13, color: MUTED, marginTop: 2 }}>{event.time}</div>
            <div style={{ fontSize: 13, color: INK, marginTop: 6 }}>{event.note}</div>
          </Card>

          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: MUTED, margin: "18px 0 10px" }}>
            LEADER GUIDES
          </div>

          {guides.length === 0 && (
            <div style={{ fontSize: 13, color: MUTED, marginBottom: 14 }}>No leader guides uploaded for this night yet.</div>
          )}
          {guides.map((g, i) => {
            const isLegacy = typeof g === "string";
            const name = isLegacy ? g : g.name;
            return (
              <Card key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px" }}>
                <BookOpen size={16} color={MUTED} />
                {isLegacy ? (
                  <span style={{ flex: 1, fontSize: 14, color: MUTED, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {name} <span style={{ fontSize: 11 }}>(needs re-upload)</span>
                  </span>
                ) : g.dataUrl.startsWith("data:image/") ? (
                  <button onClick={() => setViewingImage(g)} style={{
                    flex: 1, fontSize: 14, color: INK, overflow: "hidden", textOverflow: "ellipsis",
                    whiteSpace: "nowrap", textAlign: "left", background: "none", border: "none",
                    padding: 0, cursor: "pointer", fontFamily: "inherit",
                  }}>{name}</button>
                ) : (
                  <a href={g.dataUrl} target="_blank" rel="noopener noreferrer" style={{
                    flex: 1, fontSize: 14, color: INK, overflow: "hidden", textOverflow: "ellipsis",
                    whiteSpace: "nowrap", textDecoration: "none",
                  }}>{name}</a>
                )}
                {isAdmin && (
                  <button onClick={() => {
                    setEventGuides((eg) => ({ ...eg, [eventDetail]: eg[eventDetail].filter((_, idx) => idx !== i) }));
                  }} style={{
                    background: "none", border: "none", color: MUTED, cursor: "pointer", fontFamily: "inherit", fontSize: 16, padding: 0,
                  }}>×</button>
                )}
              </Card>
            );
          })}

          {isAdmin ? (
            <label style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              background: SURFACE, border: `1px dashed ${INK}33`, borderRadius: 14,
              padding: "16px 18px", cursor: "pointer", fontFamily: "inherit", color: INK, fontWeight: 700, fontSize: 15,
            }}>
              <BookOpen size={18} color={INK} />
              Upload a leader guide
              <input type="file" multiple style={{ display: "none" }} onChange={(e) => {
                const files = Array.from(e.target.files);
                e.target.value = "";
                if (files.length === 0) return;
                const maxSize = 4 * 1024 * 1024;
                const okFiles = files.filter((f) => f.size <= maxSize);
                const tooBig = files.filter((f) => f.size > maxSize);
                if (tooBig.length > 0) {
                  alert(`${tooBig.map((f) => f.name).join(", ")} ${tooBig.length > 1 ? "are" : "is"} over 4MB and won't be uploaded. Try a smaller file.`);
                }
                if (okFiles.length === 0) return;
                Promise.all(okFiles.map((f) => new Promise((resolve, reject) => {
                  const reader = new FileReader();
                  reader.onload = (ev) => resolve({ name: f.name, dataUrl: ev.target.result });
                  reader.onerror = reject;
                  reader.readAsDataURL(f);
                }))).then((results) => {
                  setEventGuides((eg) => ({ ...eg, [eventDetail]: [...(eg[eventDetail] || []), ...results] }));
                });
              }} />
            </label>
          ) : (
            guides.length > 0 && (
              <div style={{ fontSize: 12, color: MUTED }}>Only leadership can upload or remove guides.</div>
            )
          )}
        </div>
      );
    }
    return (
      <div style={{ padding: "18px 18px 8px" }}>
        <div style={{ fontSize: 12, color: MUTED, marginBottom: 12 }}>Semester schedule</div>
        {SCHEDULE.map((s) => (
          <button key={s.date} onClick={() => setEventDetail(s.date)} style={{
            display: "block", width: "100%", background: "none", border: "none", padding: 0,
            textAlign: "left", cursor: "pointer", fontFamily: "inherit",
          }}>
            <Card>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ fontWeight: 600, color: INK, fontSize: 14 }}>{s.title}</div>
                <div style={{ fontSize: 13, color: MUTED }}>{s.date}</div>
              </div>
              <div style={{ fontSize: 13, color: MUTED, marginTop: 2 }}>{s.time}</div>
              <div style={{ fontSize: 13, color: INK, marginTop: 6 }}>{s.note}</div>
            </Card>
          </button>
        ))}
      </div>
    );
  }

  function StudentRosterTab() {
    if (studentGroupDetail) {
      const group = STUDENT_GROUPS.find((g) => g.id === studentGroupDetail);
      const groupStudents = students.filter((s) => s.groupId === studentGroupDetail);
      const leaders = roster.switch.filter((p) => p.teamId === group.teamId && p.grade === group.grade);
      const isMyGroup = leaders.some((l) => l.phone && form.phone && l.phone === form.phone);
      const canManage = isAdmin || isMyGroup;
      return (
        <div style={{ padding: "18px 18px 8px" }}>
          <button onClick={() => { setStudentGroupDetail(null); setExpandedStudent(null); setAddingStudent(false); setConfirmRemoveStudent(null); }} style={{
            background: "none", border: "none", color: MUTED, fontSize: 13, marginBottom: 12,
            cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontFamily: "inherit",
          }}><ArrowLeft size={14} /> Back</button>

          <div style={{ fontWeight: 700, color: INK, fontSize: 18, marginBottom: 4 }}>{group.label}</div>
          <div style={{ fontSize: 13, color: MUTED, marginBottom: 16 }}>
            {leaders.length > 0 ? `Led by ${leaders.map((l) => l.name).join(", ")}` : "No leader assigned yet"}
          </div>

          {groupStudents.length === 0 && (
            <div style={{ fontSize: 13, color: MUTED, marginBottom: 14 }}>No students added to this group yet.</div>
          )}
          {groupStudents.map((s) => {
            const isOpen = expandedStudent === s.id;
            return (
              <Card key={s.id} style={{ padding: 0, overflow: "hidden" }}>
                <button onClick={() => setExpandedStudent(isOpen ? null : s.id)} style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 12, background: "none",
                  border: "none", cursor: "pointer", fontFamily: "inherit", padding: "14px 16px", textAlign: "left",
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 18, background: `${EMBER}44`, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 600, color: INK,
                  }}>{s.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, color: INK }}>{s.name}</div>
                    <div style={{ fontSize: 12, color: MUTED }}>{s.studentPhone || "No cell on file"}</div>
                  </div>
                  <ChevronRight size={16} color={MUTED} style={{ transform: isOpen ? "rotate(90deg)" : "none" }} />
                </button>
                {isOpen && (
                  <div style={{ padding: "0 16px 16px" }}>
                    <div style={{ fontSize: 13, color: MUTED, marginBottom: 6 }}>
                      Student cell: <span style={{ color: INK }}>{s.studentPhone || "—"}</span>
                    </div>
                    <div style={{ fontSize: 13, color: MUTED, marginBottom: canManage ? 12 : 0 }}>
                      Parent: <span style={{ color: INK }}>{s.parentName || "—"}</span>
                      {s.parentPhone && <span style={{ color: INK }}> · {s.parentPhone}</span>}
                    </div>
                    {canManage && confirmRemoveStudent !== s.id && (
                      <button onClick={() => setConfirmRemoveStudent(s.id)} style={{
                        marginTop: 12, background: "none", border: "none", color: CORAL, fontSize: 13,
                        fontWeight: 600, cursor: "pointer", fontFamily: "inherit", padding: 0,
                      }}>Remove student</button>
                    )}
                    {canManage && confirmRemoveStudent === s.id && (
                      <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${INK}14` }}>
                        <div style={{ fontSize: 13, color: INK, marginBottom: 10 }}>Remove {s.name} from this group?</div>
                        <div style={{ display: "flex", gap: 10 }}>
                          <button onClick={() => setConfirmRemoveStudent(null)} style={{
                            flex: 1, padding: "10px 0", borderRadius: 10, border: `1px solid ${INK}33`,
                            background: "none", color: INK, fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit",
                          }}>Cancel</button>
                          <button onClick={() => {
                            setStudents(students.filter((st) => st.id !== s.id));
                            setConfirmRemoveStudent(null);
                            setExpandedStudent(null);
                          }} style={{
                            flex: 1, padding: "10px 0", borderRadius: 10, border: "none",
                            background: CORAL, color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit",
                          }}>Remove</button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            );
          })}

          {canManage && !addingStudent && (
            <button onClick={() => setAddingStudent(true)} style={{
              width: "100%", padding: "14px 0", borderRadius: 14, border: `1px dashed ${INK}33`,
              background: SURFACE, color: INK, fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "inherit",
            }}>+ Add a student</button>
          )}
          {canManage && addingStudent && (
            <Card>
              <TextField label="Student name" value={studentDraft.name} onChange={(v) => setStudentDraft((d) => ({ ...d, name: v }))} placeholder="First and last name" />
              <TextField label="Student cell phone" value={studentDraft.studentPhone} onChange={(v) => setStudentDraft((d) => ({ ...d, studentPhone: v }))} placeholder="(405) 555-1234" type="tel" />
              <TextField label="Parent name" value={studentDraft.parentName} onChange={(v) => setStudentDraft((d) => ({ ...d, parentName: v }))} placeholder="First and last name" />
              <TextField label="Parent cell phone" value={studentDraft.parentPhone} onChange={(v) => setStudentDraft((d) => ({ ...d, parentPhone: v }))} placeholder="(405) 555-1234" type="tel" />
              <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                <button onClick={() => { setAddingStudent(false); setStudentDraft({ name: "", studentPhone: "", parentName: "", parentPhone: "" }); }} style={{
                  flex: 1, padding: "12px 0", borderRadius: 12, border: `1px solid ${INK}33`,
                  background: "none", color: INK, fontWeight: 600, fontFamily: "inherit", cursor: "pointer",
                }}>Cancel</button>
                <button onClick={() => {
                  if (!studentDraft.name.trim()) return;
                  setStudents([...students, {
                    id: `s-${Date.now()}`, name: studentDraft.name, grade: group.grade,
                    studentPhone: studentDraft.studentPhone, parentName: studentDraft.parentName,
                    parentPhone: studentDraft.parentPhone, groupId: studentGroupDetail,
                  }]);
                  setStudentDraft({ name: "", studentPhone: "", parentName: "", parentPhone: "" });
                  setAddingStudent(false);
                }} style={{
                  flex: 1, padding: "12px 0", borderRadius: 12, border: "none",
                  background: EMBER, color: EMBER_TEXT, fontWeight: 700, fontFamily: "inherit", cursor: "pointer",
                }}>Save</button>
              </div>
            </Card>
          )}
        </div>
      );
    }

    return (
      <div style={{ padding: "18px 18px 8px" }}>
        <div style={{ fontSize: 12, color: MUTED, marginBottom: 16 }}>Tap a grade to see that group's roster.</div>
        {STUDENT_GENDERS.map((g) => (
          <div key={g.id} style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: MUTED, marginBottom: 10 }}>{g.label.toUpperCase()}</div>
            {STUDENT_GROUPS.filter((grp) => grp.genderId === g.id).map((grp) => {
              const count = students.filter((s) => s.groupId === grp.id).length;
              return (
                <button key={grp.id} onClick={() => setStudentGroupDetail(grp.id)} style={{
                  width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                  background: SURFACE, border: `1px solid ${INK}14`, borderRadius: 14,
                  padding: "14px 18px", marginBottom: 10, cursor: "pointer", fontFamily: "inherit",
                }}>
                  <span style={{ fontWeight: 700, color: INK, fontSize: 15 }}>{grp.grade}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 12, color: MUTED }}>{count} student{count !== 1 ? "s" : ""}</span>
                    <ChevronRight size={16} color={MUTED} />
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    );
  }

  function TeamsTab() {
    if (teamDetail) {
      const list = teamDetail === "leadership"
        ? roster.leadership
        : roster.switch.filter((p) => p.teamId === teamDetail);
      const teamLabelText = teamDetail === "leadership"
        ? "Switch Leadership Team"
        : (TEAMS.find((t) => t.id === teamDetail) || {}).label || "Team";
      return (
        <div style={{ padding: "18px 18px 8px" }}>
          <button onClick={() => { setTeamDetail(null); setExpandedPerson(null); setConfirmRemove(null); }} style={{
            background: "none", border: "none", color: MUTED, fontSize: 13, marginBottom: 12,
            cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontFamily: "inherit",
          }}><ArrowLeft size={14} /> Back</button>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ fontWeight: 600, color: INK }}>{teamLabelText}</div>
            {isAdmin && (
              <span style={{
                fontSize: 11, color: INK, background: `${INK}1f`, padding: "3px 8px", borderRadius: 8,
              }}>Admin view</span>
            )}
          </div>
          {list.length === 0 && (
            <div style={{ fontSize: 13, color: MUTED }}>No one's signed up for this team yet.</div>
          )}
          {list.map((p) => {
            const isOpen = expandedPerson === p.name;
            return (
              <Card key={p.name} style={{ padding: 0, overflow: "hidden" }}>
                <button onClick={() => setExpandedPerson(isOpen ? null : p.name)} style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 12, background: "none",
                  border: "none", cursor: "pointer", fontFamily: "inherit", padding: "16px 18px", textAlign: "left",
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 18, background: `${EMBER}44`, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
                    fontSize: 13, fontWeight: 600, color: INK,
                  }}>
                    {p.photo
                      ? <img src={p.photo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      : p.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, color: INK }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: MUTED }}>{p.role}</div>
                  </div>
                  <ChevronRight size={16} color={MUTED} style={{ transform: isOpen ? "rotate(90deg)" : "none" }} />
                </button>
                {isOpen && (
                  <div style={{ padding: "0 18px 16px" }}>
                    <div style={{ fontSize: 13, color: MUTED, marginBottom: 10 }}>
                      {p.phone || "No phone number on file"}
                    </div>
                    {p.phone && (
                      <div style={{ display: "flex", gap: 10, marginBottom: (isAdmin || p.grade) ? 12 : 0 }}>
                        <a href={`tel:${p.phone}`} style={{
                          flex: 1, textAlign: "center", padding: "10px 0", borderRadius: 10,
                          background: EMBER, color: EMBER_TEXT, fontWeight: 600, fontSize: 13,
                          textDecoration: "none", fontFamily: "inherit",
                        }}>Call</a>
                        <a href={`sms:${p.phone}`} style={{
                          flex: 1, textAlign: "center", padding: "10px 0", borderRadius: 10,
                          border: `1px solid ${INK}33`, color: INK, fontWeight: 600, fontSize: 13,
                          textDecoration: "none", fontFamily: "inherit",
                        }}>Text</a>
                      </div>
                    )}
                    {p.grade && (
                      <div style={{ fontSize: 13, color: MUTED, marginBottom: isAdmin ? 12 : 0 }}>
                        <span style={{ color: MUTED }}>Grade </span><span style={{ color: INK }}>{p.grade}</span>
                      </div>
                    )}
                    {isAdmin && (
                      <div style={{
                        paddingTop: 12, borderTop: `1px solid ${INK}14`,
                        display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 12px", fontSize: 12,
                      }}>
                        <div><span style={{ color: MUTED }}>Birthday </span><span style={{ color: INK }}>{p.birthday}</span></div>
                        <div><span style={{ color: MUTED }}>Serving since </span><span style={{ color: INK }}>{p.started}</span></div>
                        <div><span style={{ color: MUTED }}>Drink </span><span style={{ color: INK }}>{p.drink}</span></div>
                        <div><span style={{ color: MUTED }}>Coffee </span><span style={{ color: INK }}>{p.coffee || "—"}</span></div>
                        <div><span style={{ color: MUTED }}>Snack </span><span style={{ color: INK }}>{p.snack}</span></div>
                      </div>
                    )}
                    {isAdmin && confirmRemove !== p.name && (
                      <button onClick={() => setConfirmRemove(p.name)} style={{
                        marginTop: 12, background: "none", border: "none", color: CORAL, fontSize: 13,
                        fontWeight: 600, cursor: "pointer", fontFamily: "inherit", padding: 0,
                      }}>Remove from team</button>
                    )}
                    {isAdmin && confirmRemove === p.name && (
                      <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${INK}14` }}>
                        <div style={{ fontSize: 13, color: INK, marginBottom: 10 }}>Remove {p.name} from this team?</div>
                        <div style={{ display: "flex", gap: 10 }}>
                          <button onClick={() => setConfirmRemove(null)} style={{
                            flex: 1, padding: "10px 0", borderRadius: 10, border: `1px solid ${INK}33`,
                            background: "none", color: INK, fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit",
                          }}>Cancel</button>
                          <button onClick={() => {
                            removeFromRoster(p, teamDetail === "leadership" ? "leadership" : "switch");
                            setConfirmRemove(null);
                          }} style={{
                            flex: 1, padding: "10px 0", borderRadius: 10, border: "none",
                            background: CORAL, color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer", fontFamily: "inherit",
                          }}>Remove</button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      );
    }
    return (
      <div style={{ padding: "18px 18px 8px" }}>
        <button onClick={() => { setTeamDetail("leadership"); setExpandedPerson(null); setConfirmRemove(null); }} style={{
          width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
          background: SURFACE, border: `1px solid ${INK}14`, borderRadius: 14,
          padding: "16px 18px", marginBottom: 20, cursor: "pointer", fontFamily: "inherit",
        }}>
          <span style={{ fontWeight: 700, color: INK, fontSize: 16 }}>Switch Leadership Team</span>
          <ChevronRight size={18} color={MUTED} />
        </button>

        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: MUTED, marginBottom: 12 }}>
          TAP YOUR TEAM FOR MORE INFORMATION
        </div>
        {TEAMS.filter((t) => t.id !== "leadership").map((t) => (
          <button key={t.id} onClick={() => { setTeamDetail(t.id); setExpandedPerson(null); setConfirmRemove(null); }} style={{
            width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
            background: SURFACE, border: `1px solid ${INK}14`, borderRadius: 14,
            padding: "16px 18px", marginBottom: 12, cursor: "pointer", fontFamily: "inherit",
          }}>
            <span style={{ fontWeight: 700, color: INK, fontSize: 16 }}>{t.label}</span>
            <ChevronRight size={18} color={MUTED} />
          </button>
        ))}
      </div>
    );
  }

  function ChatTab() {
    return (
      <div style={{ padding: "18px 18px 8px" }}>
        <div style={{ display: "flex", gap: 6, background: SURFACE, borderRadius: 12, padding: 4, marginBottom: 14 }}>
          {[
            { id: "updates", label: "Updates" },
            { id: "prayer", label: "Prayer" },
            { id: "celebrations", label: "Celebrations" },
          ].map((t) => (
            <button key={t.id} onClick={() => setChatSubTab(t.id)} style={{
              flex: 1, padding: "9px 0", borderRadius: 9, border: "none", cursor: "pointer",
              fontFamily: "inherit", fontSize: 13, fontWeight: 700,
              background: chatSubTab === t.id ? EMBER : "transparent",
              color: chatSubTab === t.id ? EMBER_TEXT : MUTED,
            }}>{t.label}</button>
          ))}
        </div>

        {chatSubTab === "updates" && (
          <>
            <div style={{ fontSize: 12, color: MUTED, marginBottom: 12 }}>
              Only Switch leaders can post here. Everyone can read, like, and comment.
            </div>
            {posts.map((p, i) => (
              <Card key={i}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ fontWeight: 600, color: INK, fontSize: 14 }}>{p.author}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ fontSize: 12, color: MUTED }}>{p.time}</div>
                    {isAdmin && (
                      <button onClick={() => setPosts(posts.filter((_, idx) => idx !== i))} style={{
                        background: "none", border: "none", color: MUTED, cursor: "pointer",
                        fontFamily: "inherit", fontSize: 16, padding: 0, lineHeight: 1,
                      }}>×</button>
                    )}
                  </div>
                </div>
                <div style={{ fontSize: 14, color: INK, margin: "6px 0 10px" }}>{renderWithMentions(p.body)}</div>
                <div style={{ display: "flex", gap: 18, fontSize: 13 }}>
                  <button onClick={() => {
                    const updated = [...posts];
                    updated[i] = { ...updated[i], liked: !updated[i].liked, likes: updated[i].likes + (updated[i].liked ? -1 : 1) };
                    setPosts(updated);
                  }} style={{
                    display: "flex", alignItems: "center", gap: 5, background: "none", border: "none",
                    color: p.liked ? CORAL : MUTED, cursor: "pointer", fontFamily: "inherit", padding: 0, fontSize: 13,
                  }}>
                    <Heart size={14} fill={p.liked ? CORAL : "none"} /> {p.likes}
                  </button>
                  <button onClick={() => { setOpenReplyIndex(openReplyIndex === i ? null : i); setReplyDraft(""); }} style={{
                    display: "flex", alignItems: "center", gap: 5, background: "none", border: "none",
                    color: MUTED, cursor: "pointer", fontFamily: "inherit", padding: 0, fontSize: 13,
                  }}>
                    <MessageSquare size={14} /> {p.replies.length}
                  </button>
                </div>

                {p.replies.length > 0 && (
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${INK}14`, display: "flex", flexDirection: "column", gap: 10 }}>
                    {p.replies.map((r, ri) => (
                      <div key={ri}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: INK }}>{r.author} <span style={{ fontWeight: 400, color: MUTED }}>· {r.time}</span></div>
                        <div style={{ fontSize: 13, color: INK, marginTop: 2 }}>{renderWithMentions(r.body)}</div>
                      </div>
                    ))}
                  </div>
                )}

                {openReplyIndex === i && (
                  <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                    <input value={replyDraft} onChange={(e) => setReplyDraft(e.target.value)} placeholder="Write a reply..."
                      style={{
                        flex: 1, padding: "10px 12px", borderRadius: 10, border: "none",
                        background: PAPER, color: INK, fontFamily: "inherit", fontSize: 13, outline: "none",
                      }} />
                    <button onClick={() => {
                      if (!replyDraft.trim()) return;
                      const updated = [...posts];
                      updated[i] = { ...updated[i], replies: [...updated[i].replies, { author: firstName, body: replyDraft, time: "just now" }] };
                      setPosts(updated);
                      setReplyDraft("");
                      setOpenReplyIndex(null);
                    }} style={{
                      padding: "8px 14px", borderRadius: 10, border: "none", background: EMBER,
                      color: EMBER_TEXT, fontWeight: 600, fontFamily: "inherit", cursor: "pointer", fontSize: 13,
                    }}>Send</button>
                  </div>
                )}
              </Card>
            ))}
            <Card>
              <textarea value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Post an update to Switch Updates..."
                style={{
                  width: "100%", minHeight: 56, border: "none", resize: "none", fontFamily: "inherit",
                  fontSize: 14, outline: "none", boxSizing: "border-box", background: "transparent", color: INK,
                }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                <div style={{ display: "flex", gap: 14, color: MUTED }}>
                  <BarChart2 size={16} /><Link2 size={16} />
                </div>
                <button onClick={() => {
                  if (!draft.trim()) return;
                  setPosts([{ author: firstName, time: "just now", body: draft, likes: 0, liked: false, replies: [] }, ...posts]);
                  setDraft("");
                }} style={{
                  padding: "8px 16px", borderRadius: 10, border: "none", background: EMBER,
                  color: EMBER_TEXT, fontWeight: 600, fontFamily: "inherit", cursor: "pointer", fontSize: 13,
                }}>Send</button>
              </div>
            </Card>
          </>
        )}

        {chatSubTab === "prayer" && (
          <>
            <div style={{ fontSize: 12, color: MUTED, marginBottom: 12 }}>
              A quieter space for leaders to share and pray for each other and their students.
            </div>
            {prayerRequests.map((p, i) => (
              <Card key={i}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ fontWeight: 600, color: INK, fontSize: 14 }}>{p.author}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ fontSize: 12, color: MUTED }}>{p.time}</div>
                    {isAdmin && (
                      <button onClick={() => setPrayerRequests(prayerRequests.filter((_, idx) => idx !== i))} style={{
                        background: "none", border: "none", color: MUTED, cursor: "pointer",
                        fontFamily: "inherit", fontSize: 16, padding: 0, lineHeight: 1,
                      }}>×</button>
                    )}
                  </div>
                </div>
                <div style={{ fontSize: 14, color: INK, margin: "6px 0 10px" }}>{p.body}</div>
                <button onClick={() => {
                  const updated = [...prayerRequests];
                  updated[i] = { ...updated[i], praying: updated[i].praying + 1 };
                  setPrayerRequests(updated);
                }} style={{
                  display: "flex", alignItems: "center", gap: 6, background: "none", border: "none",
                  color: MUTED, fontSize: 13, cursor: "pointer", fontFamily: "inherit", padding: 0,
                }}>🙏 Praying ({p.praying})</button>
              </Card>
            ))}
            <Card>
              <textarea value={prayerDraft} onChange={(e) => setPrayerDraft(e.target.value)} placeholder="Share a prayer request..."
                style={{
                  width: "100%", minHeight: 56, border: "none", resize: "none", fontFamily: "inherit",
                  fontSize: 14, outline: "none", boxSizing: "border-box", background: "transparent", color: INK,
                }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 6, color: MUTED, fontSize: 13, cursor: "pointer" }}>
                  <input type="checkbox" checked={prayerAnon} onChange={(e) => setPrayerAnon(e.target.checked)} />
                  Post anonymously
                </label>
                <button onClick={() => {
                  if (!prayerDraft.trim()) return;
                  setPrayerRequests([{ author: prayerAnon ? "Anonymous" : firstName, time: "just now", body: prayerDraft, praying: 0 }, ...prayerRequests]);
                  setPrayerDraft("");
                  setPrayerAnon(false);
                }} style={{
                  padding: "8px 16px", borderRadius: 10, border: "none", background: EMBER,
                  color: EMBER_TEXT, fontWeight: 600, fontFamily: "inherit", cursor: "pointer", fontSize: 13,
                }}>Send</button>
              </div>
            </Card>
          </>
        )}

        {chatSubTab === "celebrations" && (
          <>
            <div style={{ fontSize: 12, color: MUTED, marginBottom: 12 }}>
              Share a win, a story, or shout out another leader.
            </div>
            {celebrations.map((c, i) => (
              <Card key={i}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div style={{ fontWeight: 600, color: INK, fontSize: 14 }}>{c.author}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ fontSize: 12, color: MUTED }}>{c.time}</div>
                    {isAdmin && (
                      <button onClick={() => setCelebrations(celebrations.filter((_, idx) => idx !== i))} style={{
                        background: "none", border: "none", color: MUTED, cursor: "pointer",
                        fontFamily: "inherit", fontSize: 16, padding: 0, lineHeight: 1,
                      }}>×</button>
                    )}
                  </div>
                </div>
                <div style={{ fontSize: 14, color: INK, margin: "6px 0 10px" }}>{renderWithMentions(c.body)}</div>
                <button onClick={() => {
                  const updated = [...celebrations];
                  updated[i] = { ...updated[i], cheers: updated[i].cheers + 1 };
                  setCelebrations(updated);
                }} style={{
                  display: "flex", alignItems: "center", gap: 6, background: "none", border: "none",
                  color: MUTED, fontSize: 13, cursor: "pointer", fontFamily: "inherit", padding: 0,
                }}>🙌 Cheers ({c.cheers})</button>
              </Card>
            ))}
            <Card>
              <textarea value={celebrationDraft} onChange={(e) => setCelebrationDraft(e.target.value)} placeholder="Share a win or shout out a leader..."
                style={{
                  width: "100%", minHeight: 56, border: "none", resize: "none", fontFamily: "inherit",
                  fontSize: 14, outline: "none", boxSizing: "border-box", background: "transparent", color: INK,
                }} />
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                <button onClick={() => {
                  if (!celebrationDraft.trim()) return;
                  setCelebrations([{ author: firstName, time: "just now", body: celebrationDraft, cheers: 0 }, ...celebrations]);
                  setCelebrationDraft("");
                }} style={{
                  padding: "8px 16px", borderRadius: 10, border: "none", background: EMBER,
                  color: EMBER_TEXT, fontWeight: 600, fontFamily: "inherit", cursor: "pointer", fontSize: 13,
                }}>Send</button>
              </div>
            </Card>
          </>
        )}
      </div>
    );
  }

  function ResourcesTab() {
    return (
      <div style={{ padding: "18px 18px 8px" }}>
        <div style={{ display: "flex", gap: 6, background: SURFACE, borderRadius: 12, padding: 4, marginBottom: 16 }}>
          {[
            { id: "links", label: "Resources" },
            { id: "faq", label: "FAQ" },
          ].map((t) => (
            <button key={t.id} onClick={() => setResourcesSubTab(t.id)} style={{
              flex: 1, padding: "9px 0", borderRadius: 9, border: "none", cursor: "pointer",
              fontFamily: "inherit", fontSize: 14, fontWeight: 700,
              background: resourcesSubTab === t.id ? EMBER : "transparent",
              color: resourcesSubTab === t.id ? EMBER_TEXT : MUTED,
            }}>{t.label}</button>
          ))}
        </div>

        {resourcesSubTab === "links" && (
          <>
            <div style={{ fontSize: 12, color: MUTED, marginBottom: 8 }}>Leader essentials</div>
            <Card>
              {RESOURCES_ESSENTIAL.map((r, i) => (
                <div key={r} style={{
                  display: "flex", justifyContent: "space-between", padding: "10px 0",
                  borderTop: i > 0 ? `1px solid ${INK}14` : "none",
                }}>
                  <span style={{ fontSize: 14, color: INK }}>{r}</span>
                  <ChevronRight size={16} color={MUTED} />
                </div>
              ))}
            </Card>
            <div style={{ fontSize: 12, color: MUTED, margin: "16px 0 8px" }}>Helpful resources</div>
            <Card>
              {RESOURCES_LINKS.map((r, i) => (
                <a key={r.label} href={r.url} target="_blank" rel="noopener noreferrer" style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0",
                  borderTop: i > 0 ? `1px solid ${INK}14` : "none", textDecoration: "none",
                }}>
                  <span style={{ fontSize: 14, color: INK }}>{r.label}</span>
                  <Link2 size={16} color={MUTED} />
                </a>
              ))}
            </Card>
          </>
        )}

        {resourcesSubTab === "faq" && (
          <>
            <div style={{ fontSize: 12, color: MUTED, marginBottom: 12 }}>
              Questions students often bring up, with a biblical starting point for each.
            </div>
            {TEEN_FAQS.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <Card key={i} style={{ padding: 0, overflow: "hidden" }}>
                  <button onClick={() => setOpenFaq(isOpen ? null : i)} style={{
                    width: "100%", display: "flex", alignItems: "center", gap: 10, background: "none",
                    border: "none", cursor: "pointer", fontFamily: "inherit", padding: "14px 16px", textAlign: "left",
                  }}>
                    <span style={{ flex: 1, fontSize: 14, fontWeight: 700, color: INK }}>{f.q}</span>
                    <ChevronRight size={16} color={MUTED} style={{ transform: isOpen ? "rotate(90deg)" : "none", flexShrink: 0 }} />
                  </button>
                  {isOpen && (
                    <div style={{ padding: "0 16px 16px", fontSize: 13.5, color: MUTED, lineHeight: 1.5 }}>{f.a}</div>
                  )}
                </Card>
              );
            })}
          </>
        )}
      </div>
    );
  }

  return (
    <Screen>
      <Header
        title={tab === "editProfile" ? "Leader Profile" : (isAdmin ? "Switch · Admin" : "Switch")}
        onBack={tab === "editProfile" ? () => setTab("home") : undefined}
        action={<Bell size={18} color={INK} />}
      />
      <div style={{ flex: 1, overflowY: "auto", background: PAPER }}>
        {tab === "home" && HomeTab()}
        {tab === "calendar" && CalendarTab()}
        {tab === "teams" && TeamsTab()}
        {tab === "students" && StudentRosterTab()}
        {tab === "chat" && ChatTab()}
        {tab === "resources" && ResourcesTab()}
        {tab === "editProfile" && EditProfileTab()}
      </div>
      <div style={{ display: "flex", background: PAPER, borderTop: `1px solid ${INK}14` }}>
        <TabButton id="home" icon={Home} label="Home" />
        <TabButton id="calendar" icon={Calendar} label="Calendar" />
        <TabButton id="teams" icon={Users} label="Teams" />
        <TabButton id="students" icon={GraduationCap} label="Students" />
        <TabButton id="chat" icon={MessageCircle} label="Chat" />
        <TabButton id="resources" icon={BookOpen} label="Resources" />
      </div>

      {showAddHome && (
        <div style={{
          position: "absolute", inset: 0, background: PAPER, zIndex: 50,
          display: "flex", flexDirection: "column", padding: "48px 26px 24px", overflowY: "auto",
        }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 40 }}>
            <Logo />
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", color: MUTED, marginBottom: 14 }}>GET THE APP</div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 700, color: INK, margin: "0 0 14px", lineHeight: 1.2 }}>
            Add the Switch Leader App to your Home Screen
          </h2>
          <p style={{ fontSize: 15, color: MUTED, margin: "0 0 28px" }}>Takes 10 seconds, and it's how you'll get alerts.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 22, fontSize: 16, color: INK, marginBottom: 32 }}>
            <div>1. Tap the <strong>Share</strong> button at the bottom of Safari.</div>
            <div>2. Choose <strong>Add to Home Screen</strong>.</div>
            <div>3. Tap <strong>Add</strong>, then open the Switch Leader App from the new icon.</div>
          </div>
          <button onClick={() => setShowAddHome(false)} style={{
            background: "none", border: "none", color: MUTED, fontWeight: 700, fontSize: 16,
            textDecoration: "underline", cursor: "pointer", fontFamily: "inherit", alignSelf: "center",
          }}>Close</button>
        </div>
      )}

      {viewingImage && (
        <div style={{
          position: "absolute", inset: 0, background: "rgba(0,0,0,0.92)", zIndex: 60,
          display: "flex", flexDirection: "column",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 18px" }}>
            <span style={{ color: "#fff", fontSize: 14, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginRight: 12 }}>
              {viewingImage.name}
            </span>
            <button onClick={() => setViewingImage(null)} style={{
              background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer",
              fontFamily: "inherit", padding: 0, lineHeight: 1, flexShrink: 0,
            }}>×</button>
          </div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", overflow: "auto", padding: "0 12px 20px" }}>
            <img src={viewingImage.dataUrl} alt={viewingImage.name} style={{
              maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: 8,
            }} />
          </div>
        </div>
      )}
    </Screen>
  );
}
