export const asset = (p: string) => import.meta.env.BASE_URL + p;

export const INST_NAME = "A.M. Reddy Educational Institutions";
export const SOCIETY = "Atluri Mastan Reddy Educational Society (Reg. No. 450/2003)";
export const ADDRESS = "Petlurivaripalem, Narasaraopet, Palnadu District, Andhra Pradesh";
export const PHONE = "08647-247190";
export const PHONE_TEL = "tel:+918647247190";
export const WOMEN_HELPLINE = "+91 95502 54554";
export const WOMEN_HELPLINE_TEL = "tel:+919550254554";
export const EMAIL_ENG = "principal.amreddyengineering@gmail.com";
export const EMAIL_PHARM = "info@amreddypharmacy.co.in";
export const MAP = "https://www.google.com/maps/search/?api=1&query=A.M.+Reddy+Memorial+College+of+Engineering+Petlurivaripalem+Narasaraopet";
export const UGC_GUIDELINE = "UGC Guidelines on Public Self-Disclosure by Higher Education Institutions, 2024";
export const UGC_REF = "UGC D.O. No. F.14-4/2023 (CPP-II), dated 10 June 2024";
export const LAST_UPDATED = "January 2026";
export const ANTI_RAGGING_HELPLINE = "1800-180-5522";

export type NewsItem = { date: string; title: string; tag: string };
export const NEWS: NewsItem[] = [
  { date: "23-24 Dec 2025", title: "AMR Hackathon-2025", tag: "Engineering" },
  { date: "23 Dec 2025", title: "24-hour Code Crusade coding marathon", tag: "Engineering" },
  { date: "22 Dec 2025", title: "Dental camp organised on campus", tag: "Health" },
  { date: "2-11 Jan 2026", title: "Skill-based workshop: Machine Learning in Health Care", tag: "Workshop" },
  { date: "9 Jan 2026", title: "Sankranthi Sambaralu 2026", tag: "Cultural" },
  { date: "Notice", title: "I B.Tech examination timetable released", tag: "Examinations" },
  { date: "Report", title: "IQAC Audit Report 2024-25 published", tag: "IQAC" },
  { date: "Jan 2025", title: "23 AMR students selected for Thinksysq, Bangalore", tag: "Placements" },
  { date: "15 Apr 2025", title: "Pharmacy students placed with Carro Health in pool drive", tag: "Placements" },
  { date: "Mar 2025", title: "Divis pool campus drive for pharmacy students", tag: "Placements" },
  { date: "2025", title: "National Science Day and B.Pharm Freshers Day 2025", tag: "Pharmacy" },
];

export type Program = { name: string; dur?: string; intake?: string; note?: string };
export type Institution = {
  key: "pharmacy" | "engineering" | "polytechnic";
  href: string; name: string; short: string; est: string; img: string;
  affiliation: string; approvals: string[]; principal: string; email?: string;
  summary: string; groups: { title: string; items: Program[] }[];
};

export const INSTITUTIONS: Institution[] = [
  {
    key: "pharmacy", href: "/pharmacy", short: "College of Pharmacy", est: "2004", img: "img/pharmacy.jpg",
    name: "A.M. Reddy Memorial College of Pharmacy",
    affiliation: "Permanently affiliated to Acharya Nagarjuna University",
    approvals: ["Approved by PCI, New Delhi", "NAAC", "UGC 2(f) and 12(B)", "ISO 9001:2015"],
    principal: "To be published", email: EMAIL_PHARM,
    summary: "A private self-financed college offering undergraduate, doctoral-practice and postgraduate pharmacy programmes, with a curriculum built on Outcome Based Education and academic MoUs with institutions abroad.",
    groups: [
      { title: "Undergraduate and Pharm.D", items: [{ name: "B.Pharm", dur: "4 years", intake: "100" }, { name: "Pharm.D", dur: "6 years", intake: "30" }] },
      { title: "M.Pharm", items: [
        { name: "M.Pharm, Pharmaceutics", dur: "2 years", intake: "15" },
        { name: "M.Pharm, Pharmacology", dur: "2 years", intake: "15" },
        { name: "M.Pharm, Pharmaceutical Analysis", dur: "2 years", intake: "15" },
        { name: "M.Pharm, Regulatory Affairs", dur: "2 years", intake: "15" },
      ] },
    ],
  },
  {
    key: "engineering", href: "/engineering", short: "College of Engineering", est: "2008", img: "img/engineering.jpg",
    name: "A.M. Reddy Memorial College of Engineering and Technology",
    affiliation: "Autonomous. Permanently affiliated to JNTUK, Kakinada",
    approvals: ["Approved by AICTE, New Delhi", "Autonomous", "NAAC", "NBA", "UGC", "ISO 9001:2015", "MSME"],
    principal: "Dr. Ch. Mallikharjun, M.Tech., Ph.D.", email: EMAIL_ENG,
    summary: "An autonomous engineering college offering nine B.Tech branches and M.Tech programmes in Civil Engineering, supported by the Department of Basic Sciences and Humanities.",
    groups: [
      { title: "B.Tech", items: [
        { name: "Computer Science and Engineering", intake: "180", note: "Established 2008. Six laboratories with 368 air-conditioned systems and an incubation centre." },
        { name: "CSE (Artificial Intelligence and Machine Learning)" },
        { name: "CSE (Data Science)" },
        { name: "CSE (Cyber Security)" },
        { name: "Robotics and Artificial Intelligence" },
        { name: "Electronics and Communication Engineering" },
        { name: "Electrical and Electronics Engineering", intake: "60", note: "Established 2008." },
        { name: "Civil Engineering", intake: "60", note: "Started 2009." },
        { name: "Agricultural Engineering" },
      ] },
      { title: "M.Tech (Civil Engineering)", items: [{ name: "M.Tech, Structural Design", dur: "2 years" }, { name: "M.Tech, Transportation Engineering", dur: "2 years" }] },
    ],
  },
  {
    key: "polytechnic", href: "/polytechnic", short: "Polytechnic", est: "2013", img: "img/workshop.jpg",
    name: "Polytechnic (Diploma in Engineering)",
    affiliation: "Offered under A.M. Reddy Memorial College of Engineering and Technology",
    approvals: ["Diploma in Engineering"],
    principal: "Dr. K. Krishna Reddy, M.Tech., Ph.D.",
    summary: "Diploma programmes focused on practical, workshop-based technician training, providing a route into industry or a foundation for further engineering study.",
    groups: [
      { title: "Diploma branches", items: [
        { name: "Civil Engineering (DCE)", intake: "60", note: "Started 2013." },
        { name: "Electrical Engineering" },
        { name: "Mechanical Engineering" },
        { name: "Electronics and Communication Engineering" },
        { name: "Computer Science and Engineering", note: "Diploma in Computer Engineering since 2022-23." },
        { name: "Cloud Computing and Big Data" },
      ] },
    ],
  },
];

export const LEADERS = [
  { name: "Smt. Dr. Atluri Santhi", role: "Chairperson, Secretary and Correspondent", inst: "A.M. Reddy Educational Institutions", contact: PHONE },
  { name: "Sri A. Srinivasa Reddy", role: "Founding Chairman (2008)", inst: "College of Engineering and Technology" },
  { name: "Dr. Ch. Mallikharjun", role: "Principal", inst: "College of Engineering and Technology", quals: "M.Tech., Ph.D.", contact: EMAIL_ENG },
  { name: "Dr. K. Krishna Reddy", role: "Principal, Diploma", inst: "Polytechnic", quals: "M.Tech., Ph.D." },
];

export const OFFICERS = [
  "Principal, College of Pharmacy", "Finance Officer", "Controller of Examinations", "Chief Vigilance Officer",
  "Ombudsperson", "Registrar / Administrative Officer", "Central Public Information Officer (RTI)", "First Appellate Authority (RTI)",
];

export const BODIES = [
  { id: "governing-body", name: "Governing Body" },
  { id: "academic-council", name: "Academic Council" },
  { id: "board-of-studies", name: "Boards of Studies" },
  { id: "finance-committee", name: "Finance Committee" },
];

export type Committee = { id: string; name: string; purpose: string; contact?: string; extra?: string[] };
export const COMMITTEES: Committee[] = [
  { id: "anti-ragging", name: "Anti-Ragging Cell and Squad", purpose: "Ragging in any form is strictly prohibited on campus and in hostels, in accordance with the UGC Regulations on Curbing the Menace of Ragging in Higher Educational Institutions, 2009. Complaints are acted upon promptly and confidentially.", extra: [`National Anti-Ragging Helpline (toll free, 24x7): ${ANTI_RAGGING_HELPLINE}`, "Email: helpline@antiragging.in", "Online undertaking and complaints: www.antiragging.in"] },
  { id: "icc", name: "Internal Complaints Committee (ICC)", purpose: "Constituted under the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 and the UGC Regulations, 2015, to receive and redress complaints of sexual harassment.", extra: [`Women helpline: ${WOMEN_HELPLINE}`] },
  { id: "sgrc", name: "Student Grievance Redressal Committee (SGRC)", purpose: "Constituted under the UGC (Redressal of Grievances of Students) Regulations, 2023, to address grievances relating to admission, examinations, fees, facilities and conduct." },
  { id: "ombudsperson", name: "Ombudsperson", purpose: "Hears appeals from students who are not satisfied with the decision of the Student Grievance Redressal Committee, as provided under the UGC Regulations, 2023." },
  { id: "equal-opportunity", name: "Equal Opportunity Cell", purpose: "Promotes equity and inclusion for students from disadvantaged groups and oversees support for students with disabilities." },
  { id: "sedg", name: "Socio-Economically Disadvantaged Groups (SEDG) Cell", purpose: "Facilitates academic, financial and social support for students from socio-economically disadvantaged groups, in line with NEP 2020." },
  { id: "iqac", name: "Internal Quality Assurance Cell (IQAC)", purpose: "Plans, monitors and documents quality initiatives across the institutions. The IQAC Audit Report 2024-25 has been published." },
  { id: "grievance", name: "General Grievance Cell", purpose: "Receives grievances from students, parents and staff that fall outside the purview of other statutory committees and routes them for timely resolution." },
  { id: "sc-st-cell", name: "SC/ST Cell", purpose: "Safeguards the interests of students and staff from Scheduled Castes and Scheduled Tribes and monitors implementation of reservation policy." },
];

export type Disc = { label: string; href: string | null };
export type DiscSection = { id: string; letter: string; title: string; items: Disc[] };
export const DISCLOSURE: DiscSection[] = [
  { id: "about", letter: "a", title: "About the HEI", items: [
    { label: "Overview of the institution", href: "/about#overview" },
    { label: "Act and Statutes / Memorandum of Association", href: null },
    { label: "Institutional Development Plan", href: null },
    { label: "Affiliating universities (JNTUK; Acharya Nagarjuna University)", href: "/about#affiliations" },
    { label: "Accreditation and ranking status (NAAC, NBA, NIRF)", href: "/about#approvals" },
    { label: "Recognition and approvals (UGC 2(f), 12(B), AICTE, PCI)", href: "/about#approvals" },
    { label: "Annual reports", href: null },
    { label: "Annual accounts with audit report", href: null },
    { label: "Sponsoring body details", href: "/about#society" },
  ] },
  { id: "administration", letter: "b", title: "Administration", items: [
    { label: "Chairperson, Secretary and Correspondent", href: "/administration#leadership" },
    { label: "Principals", href: "/administration#leadership" },
    { label: "Finance Officer", href: null },
    { label: "Controller of Examinations", href: null },
    { label: "Chief Vigilance Officer", href: null },
    { label: "Ombudsperson", href: "/committees#ombudsperson" },
    { label: "Governing Body composition", href: "/administration#bodies" },
    { label: "Academic Council / Boards of Studies / Finance Committee", href: "/administration#bodies" },
    { label: "Internal Complaints Committee", href: "/committees#icc" },
    { label: "Academic leadership (Heads of Department)", href: null },
  ] },
  { id: "academics", letter: "c", title: "Academics", items: [
    { label: "Programmes offered", href: "/admissions#programmes" },
    { label: "Academic calendar", href: null },
    { label: "Examination regulations", href: null },
    { label: "Departments", href: "/engineering#programmes" },
    { label: "Faculty and staff details", href: null },
    { label: "Internal Quality Assurance Cell (IQAC)", href: "/committees#iqac" },
    { label: "Library", href: "/research#facilities" },
    { label: "Academic collaborations (MoUs)", href: "/research#collaborations" },
  ] },
  { id: "admissions", letter: "d", title: "Admissions and Fee", items: [
    { label: "Prospectus with fee structure", href: null },
    { label: "Admission process", href: "/admissions#process" },
    { label: "Fee refund policy", href: null },
  ] },
  { id: "research", letter: "e", title: "Research", items: [
    { label: "Research and Development cell", href: "/research#rnd" },
    { label: "Incubation centre / entrepreneurship", href: "/research#incubation" },
    { label: "Central facilities", href: "/research#facilities" },
  ] },
  { id: "student-life", letter: "f", title: "Student Life", items: [
    { label: "Sports", href: "/student-life#sports" },
    { label: "NCC / NSS", href: "/student-life#nss" },
    { label: "Hostels (boys and girls)", href: "/student-life#hostels" },
    { label: "Placement cell", href: "/student-life#placements" },
    { label: "Student Grievance Redressal Committee and Ombudsperson", href: "/committees#sgrc" },
    { label: "Health facilities", href: "/student-life#health" },
    { label: "Internal Complaints Committee", href: "/committees#icc" },
    { label: "Anti-Ragging Cell", href: "/committees#anti-ragging" },
    { label: "Equal Opportunity Cell", href: "/committees#equal-opportunity" },
    { label: "SEDG Cell", href: "/committees#sedg" },
    { label: "Facilities for differently-abled persons", href: null },
  ] },
  { id: "alumni", letter: "g", title: "Alumni", items: [{ label: "Alumni association", href: null }] },
  { id: "information", letter: "h", title: "Information Corner", items: [
    { label: "RTI: CPIO and Appellate Authority", href: "/notices#rti" },
    { label: "Circulars and notices", href: "/notices#notices" },
    { label: "Announcements", href: "/notices#notices" },
    { label: "Newsletters", href: null },
    { label: "News, events and achievements", href: "/notices#news" },
    { label: "Job openings", href: "/notices#careers" },
    { label: "Reservation roster", href: null },
  ] },
  { id: "gallery", letter: "i", title: "Picture Gallery", items: [{ label: "Photographs of campus and events", href: "/gallery" }] },
  { id: "contact", letter: "j", title: "Contact", items: [
    { label: "Phone, official email and address", href: "/contact#contact" },
    { label: "Location map", href: "/contact#map" },
    { label: "Telephone directory", href: "/contact#directory" },
  ] },
];

export const NAV_MENUS: { label: string; items: { label: string; href: string; desc?: string }[] }[] = [
  { label: "About", items: [
    { label: "Overview", href: "/about", desc: "History, vision and mission" },
    { label: "Sponsoring Society", href: "/about#society" },
    { label: "Approvals and Accreditation", href: "/about#approvals" },
    { label: "Administration", href: "/administration", desc: "Leadership and governing bodies" },
  ] },
  { label: "Institutions", items: [
    { label: "College of Pharmacy", href: "/pharmacy", desc: "Est. 2004 / Acharya Nagarjuna University" },
    { label: "College of Engineering and Technology", href: "/engineering", desc: "Est. 2008 / Autonomous / JNTUK" },
    { label: "Polytechnic", href: "/polytechnic", desc: "Diploma in Engineering" },
  ] },
  { label: "Academics", items: [
    { label: "Programmes", href: "/admissions#programmes" },
    { label: "Research and Development", href: "/research" },
    { label: "Incubation Centre", href: "/research#incubation" },
    { label: "IQAC", href: "/committees#iqac" },
  ] },
  { label: "Admissions", items: [
    { label: "Admission Process", href: "/admissions#process" },
    { label: "Eligibility and Fee", href: "/admissions#fee" },
    { label: "Admission Enquiry", href: "/admissions#enquire" },
  ] },
  { label: "Student Life", items: [
    { label: "Facilities and Hostels", href: "/student-life" },
    { label: "Placements", href: "/student-life#placements" },
    { label: "Committees and Cells", href: "/committees" },
    { label: "Picture Gallery", href: "/gallery" },
  ] },
  { label: "Information Corner", items: [
    { label: "Notices and Circulars", href: "/notices#notices" },
    { label: "News and Events", href: "/notices#news" },
    { label: "Right to Information", href: "/notices#rti" },
    { label: "Careers", href: "/notices#careers" },
    { label: "UGC Public Self-Disclosure", href: "/disclosure" },
  ] },
];

export type SearchEntry = { group: string; label: string; href: string; keywords?: string };
const PAGES: SearchEntry[] = [
  ["Home", "/"], ["About the Institutions", "/about"], ["Administration", "/administration"], ["College of Pharmacy", "/pharmacy"],
  ["College of Engineering and Technology", "/engineering"], ["Polytechnic", "/polytechnic"], ["Admissions", "/admissions"],
  ["Admission Enquiry Form", "/admissions#enquire"], ["Research and Development", "/research"], ["Student Life", "/student-life"],
  ["Committees and Cells", "/committees"], ["Information Corner", "/notices"], ["Picture Gallery", "/gallery"], ["Contact Us", "/contact"],
  ["UGC Public Self-Disclosure", "/disclosure"],
].map(([label, href]) => ({ group: "Pages", label, href }));

export const SEARCH_INDEX: SearchEntry[] = [
  ...PAGES,
  ...INSTITUTIONS.flatMap((i) => i.groups.flatMap((g) => g.items.map((p) => ({ group: "Programmes", label: p.name, href: `${i.href}#programmes`, keywords: i.short })))),
  ...COMMITTEES.map((c) => ({ group: "Committees", label: c.name, href: `/committees#${c.id}` })),
  ...DISCLOSURE.flatMap((s) => s.items.map((d) => ({ group: "Disclosure", label: `${s.letter.toUpperCase()}. ${d.label}`, href: d.href ?? `/disclosure#${s.id}`, keywords: s.title }))),
  ...NEWS.map((n) => ({ group: "Notices and News", label: n.title, href: "/notices#news", keywords: `${n.tag} ${n.date}` })),
];
