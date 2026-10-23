/* Real photographs from the official A.M. Reddy websites, stored in public/img/amr/ */
export const GALLERY_CATS = ["Campus", "Academics & Labs", "Library", "Events & Festivals", "Sports", "Placements", "NSS"] as const;
export type GalleryCat = (typeof GALLERY_CATS)[number];
export type Photo = { src: string; cap: string; cat: GalleryCat };

const A = (f: string) => `img/amr/${f}`;
const range = (n: number, from = 1) => Array.from({ length: n }, (_, i) => i + from);
const pad = (n: number) => String(n).padStart(2, "0");

export const PHOTOS: Photo[] = [
  { src: A("eng-about-college.jpg"), cap: "Aerial view of the campus, Petlurivaripalem", cat: "Campus" },
  { src: A("eng-gallery-gallery1.jpg"), cap: "Campus lawns and academic blocks", cat: "Campus" },
  { src: A("pharm-gallery-home-krishna.jpg"), cap: "Campus illuminated for a celebration", cat: "Campus" },
  { src: A("eng-gallery-gallery4.jpg"), cap: "Students presenting in the laboratory", cat: "Academics & Labs" },
  { src: A("eng-gallery-gallery3.jpg"), cap: "Project exhibition", cat: "Academics & Labs" },
  { src: A("eng-gallery-gallery7.jpg"), cap: "Engineering laboratory session", cat: "Academics & Labs" },
  { src: A("eng-gallery-gallery8.jpg"), cap: "Surveying field practice, Civil Engineering", cat: "Academics & Labs" },
  { src: A("eng-gallery-gallery6.jpg"), cap: "Students at an industry interaction", cat: "Academics & Labs" },
  { src: A("eng-campus-technical-events-ideathon-2025-amrif1.jpg"), cap: "Ideathon 2025, AMR Incubation Foundation", cat: "Academics & Labs" },
  { src: A("eng-campus-workshops-best-from-waste-2025-01.jpg"), cap: "Best from Waste workshop 2025", cat: "Academics & Labs" },
  ...range(8).map((i) => ({ src: A(`eng-gallery-amrif${i}.jpg`), cap: "AMR Incubation Foundation programme", cat: "Academics & Labs" as GalleryCat })),
  ...range(9).map((i) => ({ src: A(`eng-campus-library-${i}.jpg`), cap: "Central library, College of Engineering", cat: "Library" as GalleryCat })),
  ...range(3).map((i) => ({ src: A(`pharm-academics-library-${i}.jpg`), cap: "Library, College of Pharmacy", cat: "Library" as GalleryCat })),
  { src: A("eng-gallery-gallery5.jpg"), cap: "Library stacks", cat: "Library" },
  { src: A("eng-gallery-gallery2.jpg"), cap: "Award ceremony on campus", cat: "Events & Festivals" },
  ...[1, 2, 3, 4, 6, 7, 20].map((i) => ({ src: A(`eng-campus-non-technical-events-sankranthi-sambaralu-2026-pongal${i}.jpg`), cap: "Sankranthi Sambaralu 2026", cat: "Events & Festivals" as GalleryCat })),
  { src: A("eng-campus-non-technical-events-sankranthi-sambaralu-2026-amrif21.jpg"), cap: "Sankranthi Sambaralu 2026", cat: "Events & Festivals" },
  { src: A("pharm-events-bpharm-freshers-day-2025.jpg"), cap: "B.Pharm Freshers Day 2025", cat: "Events & Festivals" },
  { src: A("pharm-events-science-day-2025.jpg"), cap: "National Science Day 2025, College of Pharmacy", cat: "Events & Festivals" },
  { src: A("pharm-events-sankranthi-celebrations-2025.jpg"), cap: "Sankranthi celebrations 2025, College of Pharmacy", cat: "Events & Festivals" },
  ...range(10).map((i) => ({ src: A(`pharm-gallery-${pad(i)}.jpg`), cap: "College of Pharmacy event", cat: "Events & Festivals" as GalleryCat })),
  ...range(8).map((i) => ({ src: A(`pharm-gallery-ibro${i}.jpg`), cap: "IBRO programme, College of Pharmacy", cat: "Events & Festivals" as GalleryCat })),
  ...range(7).map((i) => ({ src: A(`pharm-gallery-pongal${i}.jpg`), cap: "Pongal celebrations, College of Pharmacy", cat: "Events & Festivals" as GalleryCat })),
  ...range(8).map((i) => ({ src: A(`pharm-gallery-amtz-${pad(i)}.jpg`), cap: "AMTZ programme, College of Pharmacy", cat: "Events & Festivals" as GalleryCat })),
  ...range(4).map((i) => ({ src: A(`pharm-gallery-med-${pad(i)}.jpg`), cap: "College of Pharmacy outreach", cat: "Events & Festivals" as GalleryCat })),
  ...range(4).map((i) => ({ src: A(`pharm-gallery-bwf-${pad(i)}.jpg`), cap: "College of Pharmacy event", cat: "Events & Festivals" as GalleryCat })),
  { src: A("pharm-gallery-home-teachers.jpg"), cap: "Faculty of the College of Pharmacy", cat: "Events & Festivals" },
  ...range(12).map((i) => ({ src: A(`pharm-student-life-sports-sports${pad(i)}.jpg`), cap: "Sports meet", cat: "Sports" as GalleryCat })),
  { src: A("eng-placements-thinksysq-01.jpg"), cap: "Thinksysq, Bangalore: 23 students selected", cat: "Placements" },
  ...[0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => ({ src: A(`eng-placements-placement-activity-${pad(i)}.jpg`), cap: "Placement activity, College of Engineering", cat: "Placements" as GalleryCat })),
  ...range(3).map((i) => ({ src: A(`pharm-student-life-placements-corro-health-corro-health-placement-${pad(i)}.jpg`), cap: "Carro Health placement drive", cat: "Placements" as GalleryCat })),
  ...range(2).map((i) => ({ src: A(`pharm-student-life-placements-divis-lab-08032025-placement${i}.jpg`), cap: "Divis pool campus drive, 8 March 2025", cat: "Placements" as GalleryCat })),
  ...range(4).map((i) => ({ src: A(`pharm-student-life-placements-heterolabs-${pad(i)}.jpg`), cap: "Hetero Labs placement drive", cat: "Placements" as GalleryCat })),
  ...range(4).map((i) => ({ src: A(`pharm-student-life-placements-placement${pad(i)}.jpg`), cap: "Pharmacy placement drive", cat: "Placements" as GalleryCat })),
  { src: A("eng-campus-nss-aidsday-2025-09.jpg"), cap: "NSS: World AIDS Day awareness 2025", cat: "NSS" },
  { src: A("eng-campus-nss-mountainday-2025-01.jpg"), cap: "NSS: International Mountain Day 2025", cat: "NSS" },
  { src: A("eng-latest-events-nss-road-safety-2025.jpg"), cap: "NSS: Road safety awareness 2025", cat: "NSS" },
  { src: A("eng-latest-events-nss-sivarathri-2025.jpg"), cap: "NSS: Sivarathri service 2025", cat: "NSS" },
];

export const RECRUITER_LOGOS = range(8).map((i) => A(`eng-recruiters-recruiters-${i}.png`));
export const ACCREDITATION_LOGOS: { src: string; alt: string }[] = [
  { src: A("eng-naac.png"), alt: "NAAC" }, { src: A("eng-nba.png"), alt: "NBA" }, { src: A("eng-ugc.png"), alt: "UGC" },
  { src: A("eng-iso.jpg"), alt: "ISO 9001:2015" }, { src: A("eng-msme.png"), alt: "MSME" },
];

/* Dated event photographs (small thumbnails from the official sites) */
export const EVENT_PHOTOS: { src: string; title: string; date: string; tag: string }[] = [
  { src: A("eng-campus-non-technical-events-sankranthi-sambaralu-2026-pongal1.jpg"), title: "Sankranthi Sambaralu 2026", date: "9 Jan 2026", tag: "Cultural" },
  { src: A("eng-campus-technical-events-ideathon-2025-amrif1.jpg"), title: "Ideathon 2025 at the AMR Incubation Foundation", date: "2025", tag: "Engineering" },
  { src: A("pharm-events-science-day-2025.jpg"), title: "National Science Day 2025, College of Pharmacy", date: "2025", tag: "Pharmacy" },
  { src: A("pharm-events-bpharm-freshers-day-2025.jpg"), title: "B.Pharm Freshers Day 2025", date: "2025", tag: "Pharmacy" },
  { src: A("eng-placements-thinksysq-01.jpg"), title: "23 AMR students selected for Thinksysq, Bangalore", date: "Jan 2025", tag: "Placements" },
  { src: A("pharm-events-divis-campus-drive-08032025.jpg"), title: "Divis pool campus drive for pharmacy students", date: "8 Mar 2025", tag: "Placements" },
  { src: A("eng-campus-nss-aidsday-2025-09.jpg"), title: "NSS World AIDS Day awareness programme", date: "2025", tag: "NSS" },
  { src: A("eng-campus-workshops-best-from-waste-2025-01.jpg"), title: "Best from Waste workshop", date: "2025", tag: "Workshop" },
];
