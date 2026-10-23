/* Picture gallery and dated event photos. Paths come from src/data/images.ts. */
import { IMG } from "./images";
export { RECRUITER_LOGOS, ACCREDITATION_LOGOS } from "./images";

export const GALLERY_CATS = ["Campus", "Academics & Labs", "Library", "Events", "Sports", "Placements", "NSS"] as const;
export type GalleryCat = (typeof GALLERY_CATS)[number];
export type Photo = { src: string; cap: string; cat: GalleryCat };

export const PHOTOS: Photo[] = [
  { src: IMG.campusAerial, cap: "Aerial view of the campus, Petlurivaripalem", cat: "Campus" },
  { src: IMG.campusLawns, cap: "Campus lawns and academic blocks", cat: "Campus" },
  { src: IMG.campusNight, cap: "Campus illuminated for a celebration", cat: "Campus" },
  { src: IMG.labPresentation, cap: "Students presenting in the laboratory", cat: "Academics & Labs" },
  { src: IMG.labSession, cap: "Engineering laboratory session", cat: "Academics & Labs" },
  { src: IMG.labSurvey, cap: "Surveying field practice, Civil Engineering", cat: "Academics & Labs" },
  { src: IMG.ideathon, cap: "Ideathon 2025, AMR Incubation Foundation", cat: "Academics & Labs" },
  { src: IMG.bestFromWaste, cap: "Best from Waste workshop 2025", cat: "Academics & Labs" },
  { src: IMG.libraryEngineering, cap: "Central library, College of Engineering", cat: "Library" },
  { src: IMG.libraryPharmacy, cap: "Library, College of Pharmacy", cat: "Library" },
  { src: IMG.awardCeremony, cap: "Award ceremony on campus", cat: "Events" },
  { src: IMG.sankranthi, cap: "Sankranthi Sambaralu 2026", cat: "Events" },
  { src: IMG.scienceDay, cap: "National Science Day 2025, College of Pharmacy", cat: "Events" },
  { src: IMG.freshersDay, cap: "B.Pharm Freshers Day 2025", cat: "Events" },
  { src: IMG.sports2, cap: "Sports meet", cat: "Sports" },
  { src: IMG.sports3, cap: "Sports meet", cat: "Sports" },
  { src: IMG.placementThinksysq, cap: "Thinksysq, Bangalore: 23 students selected", cat: "Placements" },
  { src: IMG.placementHetero, cap: "Hetero Labs placement drive", cat: "Placements" },
  { src: IMG.nssAidsDay, cap: "NSS: World AIDS Day awareness 2025", cat: "NSS" },
  { src: IMG.nssMountainDay, cap: "NSS: International Mountain Day 2025", cat: "NSS" },
];

/* Dated event photographs */
export const EVENT_PHOTOS: { src: string; title: string; date: string; tag: string }[] = [
  { src: IMG.sankranthi, title: "Sankranthi Sambaralu 2026", date: "9 Jan 2026", tag: "Cultural" },
  { src: IMG.ideathon, title: "Ideathon 2025 at the AMR Incubation Foundation", date: "2025", tag: "Engineering" },
  { src: IMG.scienceDay, title: "National Science Day 2025, College of Pharmacy", date: "2025", tag: "Pharmacy" },
  { src: IMG.freshersDay, title: "B.Pharm Freshers Day 2025", date: "2025", tag: "Pharmacy" },
  { src: IMG.placementThinksysq, title: "23 AMR students selected for Thinksysq, Bangalore", date: "Jan 2025", tag: "Placements" },
  { src: IMG.placementDivis, title: "Divis pool campus drive for pharmacy students", date: "8 Mar 2025", tag: "Placements" },
  { src: IMG.nssAidsDay, title: "NSS World AIDS Day awareness programme", date: "2025", tag: "NSS" },
  { src: IMG.bestFromWaste, title: "Best from Waste workshop", date: "2025", tag: "Workshop" },
];
