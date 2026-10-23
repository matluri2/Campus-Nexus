/*
 * IMAGES — every photograph used on the website, in one place.
 *
 * To replace a photo with an edited version, either:
 *   1. overwrite the file in public/img/amr/ with the same name, or
 *   2. drop a new file into public/img/amr/ and change the path below.
 *
 * Each slot lists where it appears. People's portraits are in src/data/people.ts,
 * and logos are at the bottom of this file.
 */

const A = (f: string) => `img/amr/${f}`;

export const IMG = {
  /* Campus */
  campusAerial: A("eng-about-college.jpg"), // Home hero 1, Home campus tile, About/Contact/Engineering page headers, menu feature
  campusLawns: A("eng-gallery-gallery1.jpg"), // Home welcome, About page, Engineering card, menu feature
  campusNight: A("pharm-gallery-home-krishna.jpg"), // Gallery

  /* Academics and laboratories */
  labPresentation: A("eng-gallery-gallery4.jpg"), // Home hero 2, Research page header, Engineering page, menu feature
  labSession: A("eng-gallery-gallery7.jpg"), // Polytechnic card and page, Gallery
  labSurvey: A("eng-gallery-gallery8.jpg"), // Polytechnic page header, Institution pages
  ideathon: A("eng-campus-technical-events-ideathon-2025-amrif1.jpg"), // Home news, Gallery
  bestFromWaste: A("eng-campus-workshops-best-from-waste-2025-01.jpg"), // Home news, Gallery

  /* Libraries */
  libraryEngineering: A("eng-campus-library-2.jpg"), // Home welcome inset, Home campus tile, Disclosure header, Research page, menu feature
  libraryPharmacy: A("pharm-academics-library-1.jpg"), // Pharmacy page, Gallery

  /* Pharmacy */
  pharmacyFaculty: A("pharm-gallery-home-teachers.jpg"), // Pharmacy card on Home
  pharmacyEvent: A("pharm-gallery-ibro5.jpg"), // Pharmacy page header, Committees header
  scienceDay: A("pharm-events-science-day-2025.jpg"), // Home news, Gallery, menu feature
  freshersDay: A("pharm-events-bpharm-freshers-day-2025.jpg"), // Home news, Gallery

  /* Events */
  awardCeremony: A("eng-gallery-gallery2.jpg"), // Home admissions banner, Admissions/Administration/Notices headers, Gallery
  sankranthi: A("eng-campus-non-technical-events-sankranthi-sambaralu-2026-pongal1.jpg"), // Home news, Home campus tile, Gallery header

  /* Sports */
  sports1: A("pharm-student-life-sports-sports01.jpg"), // Home hero 3, Student Life header, menu feature
  sports2: A("pharm-student-life-sports-sports02.jpg"), // Student Life, Gallery
  sports3: A("pharm-student-life-sports-sports05.jpg"), // Student Life, Home campus tile, Gallery
  sports4: A("pharm-student-life-sports-sports08.jpg"), // Student Life

  /* Placements */
  placementThinksysq: A("eng-placements-thinksysq-01.jpg"), // Home hero 4, Home placements, Home news, Student Life, Gallery
  placementCarro: A("pharm-student-life-placements-corro-health-corro-health-placement-01.jpg"), // Home placements, Student Life
  placementDivis: A("pharm-student-life-placements-divis-lab-08032025-placement1.jpg"), // Home placements, Home news, Student Life
  placementHetero: A("pharm-student-life-placements-heterolabs-01.jpg"), // Student Life, Gallery

  /* NSS */
  nssAidsDay: A("eng-campus-nss-aidsday-2025-09.jpg"), // Student Life, Home news, Gallery
  nssMountainDay: A("eng-campus-nss-mountainday-2025-01.jpg"), // Student Life, Home campus tile, Gallery
  nssRoadSafety: A("eng-latest-events-nss-road-safety-2025.jpg"), // Student Life
} as const;

/* Logos */
export const RECRUITER_LOGOS = Array.from({ length: 8 }, (_, i) => A(`eng-recruiters-recruiters-${i + 1}.png`));
export const ACCREDITATION_LOGOS: { src: string; alt: string }[] = [
  { src: A("eng-naac.png"), alt: "NAAC" }, { src: A("eng-nba.png"), alt: "NBA" }, { src: A("eng-ugc.png"), alt: "UGC" },
  { src: A("eng-iso.jpg"), alt: "ISO 9001:2015" }, { src: A("eng-msme.png"), alt: "MSME" },
];
