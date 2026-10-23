/*
 * PEOPLE — the single place to add or edit people shown on the website.
 *
 * To add a person's photo, put the image in public/img/people/ and set
 *   photo: 'img/people/<file>'
 * (square or portrait images work best; faces are kept near the top).
 * If `photo` is left out, the site automatically shows the person's initials.
 *
 * `group` decides where the person appears:
 *   "leadership"  -> home page leadership messages, /administration, /about
 *   "hod"         -> Heads of Department grid (/administration and institution pages)
 *   "alumni"      -> alumni section (/student-life#alumni and home page)
 */

export type InstitutionKey = "society" | "pharmacy" | "engineering" | "polytechnic";

export type Person = {
  name: string;
  role: string;
  institution: string;
  inst?: InstitutionKey;
  group: "leadership" | "hod" | "alumni";
  photo?: string;
  qualification?: string;
  email?: string;
  /** Only use verified, published statements. */
  message?: string;
};

const ENG = "A.M. Reddy Memorial College of Engineering and Technology";
const PHARM = "A.M. Reddy Memorial College of Pharmacy";

export const PEOPLE: Person[] = [
  /* ---------- Leadership ---------- */
  {
    name: "Sri Atluri Srinivasa Reddy", role: "President, A.M. Reddy Educational Society / Chairman", institution: "A.M. Reddy Educational Institutions",
    inst: "society", group: "leadership", photo: "img/people/atluri-srinivasa-reddy.jpg",
    message: "At A.M. Reddy Group, learning is based on doing things and not merely knowing things.",
  },
  {
    name: "Smt. Dr. Atluri Santhi", role: "Chairperson / Secretary and Correspondent", institution: "A.M. Reddy Educational Institutions",
    inst: "society", group: "leadership", photo: "img/people/atluri-santhi.jpg",
  },
  {
    name: "Dr. Ch. Mallikarjun", role: "Principal", qualification: "M.Tech., Ph.D.", institution: ENG,
    inst: "engineering", group: "leadership", photo: "img/people/ch-mallikarjun.jpg", email: "principal.amreddyengineering@gmail.com",
  },
  {
    name: "To be published", role: "Principal", institution: PHARM,
    inst: "pharmacy", group: "leadership", photo: "img/people/principal-pharmacy.jpg", email: "info@amreddypharmacy.co.in",
    message: "Our college is relentlessly working to live up to its motto 'Education for Wholeness.'",
  },

  /* ---------- Heads of Department (College of Engineering) ---------- */
  { name: "Dr. A. Kishore Reddy", role: "Dean of Academics (Dept. of ECE)", institution: ENG, inst: "engineering", group: "hod", photo: "img/people/a-kishore-reddy.jpg" },
  { name: "Dr. K. Sreekar Chand", role: "Controller of Examinations & HoD, Civil Engineering", institution: ENG, inst: "engineering", group: "hod", photo: "img/people/k-sreekar-chand.jpg" },
  { name: "Dr. Merugu Anand Kumar", role: "HoD, Computer Science and Engineering", institution: ENG, inst: "engineering", group: "hod", photo: "img/people/merugu-anand-kumar.jpg" },
  { name: "Dr. M. E. Prasad", role: "HoD, CSE (Cyber Security)", institution: ENG, inst: "engineering", group: "hod", photo: "img/people/m-e-prasad.jpg" },
  { name: "Dr. K. Krishna Reddy", role: "HoD, Electrical and Electronics Engineering", institution: ENG, inst: "engineering", group: "hod", photo: "img/people/k-krishna-reddy.jpg" },
  { name: "Mr. S. K. Ganesh Kumar Pedapudi", role: "HoD, Electronics and Communication Engineering", institution: ENG, inst: "engineering", group: "hod", photo: "img/people/s-k-ganesh-kumar.jpg" },
  { name: "Mr. K. Vijaya Kumar", role: "HoD, Mechanical Engineering", institution: ENG, inst: "engineering", group: "hod", photo: "img/people/k-vijaya-kumar.jpg" },
  { name: "Dr. G. Bhaskar Reddy", role: "HoD, Basic Sciences and Humanities", institution: ENG, inst: "engineering", group: "hod", photo: "img/people/g-bhaskar-reddy.jpg" },
  { name: "Mr. B. Chinna Babu", role: "HoD, Agricultural Engineering", institution: ENG, inst: "engineering", group: "hod", photo: "img/people/b-chinna-babu.jpg" },

  /* ---------- Alumni (College of Pharmacy): add more rows here ---------- */
  ...([
    ["Mrs. N. Haritha", "Associate Scientific Lead, Novartis Health Care Pvt. Ltd."],
    ["Mrs. K. Visalakshi", "Assoc. Professor, Talla Padmavathi College of Pharmacy, Warangal"],
    ["Dr. A. Sai Balaji", "CSIR – Indian Institute of Chemical Technology"],
    ["Dr. G. Raghavendra Kumar", "Associate Professor, NIPS"],
    ["Mr. G. Satis Babu", "In-charge Pharmacist"],
    ["Mr. T. Baji Babu", "Asst. Manager (Marketing), Sun Pharma"],
  ] as const).map(([name, role], i): Person => ({ name, role, institution: PHARM, inst: "pharmacy", group: "alumni", photo: `img/people/alumni-pharmacy-${i + 1}.jpg` })),
];

export const LEADERSHIP = PEOPLE.filter((p) => p.group === "leadership");
export const HODS = PEOPLE.filter((p) => p.group === "hod");
export const ALUMNI = PEOPLE.filter((p) => p.group === "alumni");
export const hodsOf = (k: InstitutionKey) => HODS.filter((p) => p.inst === k);
export const principalOf = (k: InstitutionKey) => LEADERSHIP.find((p) => p.inst === k && p.role === "Principal");
