export const site = {
  name: "DEMO Hospital",
  region: "West Bengal, India",
  conceptLine: "Care that puts you first.",
} as const;

export type GalleryImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

const concept =
  "Illustrative concept photograph. This is not a picture of DEMO Hospital, its rooms, or its staff.";

export const images = {
  hero: {
    src: "/images/hero.webp",
    width: 1600,
    height: 900,
    alt: `Sunlit stone courtyard with a tree and a colonnade. ${concept}`,
    caption: "Courtyard study — concept, not the hospital",
  },
  portrait: {
    src: "/images/hero-portrait.webp",
    width: 1200,
    height: 1600,
    alt: `Tall colonnade with a sage door and a brass rail. ${concept}`,
    caption: "Entry colonnade — concept, not the hospital",
  },
  corridor: {
    src: "/images/corridor.webp",
    width: 1500,
    height: 1000,
    alt: `Quiet stone corridor with window light and a wooden bench. ${concept}`,
    caption: "Corridor light — concept, not the hospital",
  },
  courtyard: {
    src: "/images/courtyard.webp",
    width: 1500,
    height: 1000,
    alt: `Enclosed garden court with a shallow water basin. ${concept}`,
    caption: "Garden court — concept, not the hospital",
  },
  facade: {
    src: "/images/facade.webp",
    width: 1600,
    height: 900,
    alt: `Low stone pavilion at dusk with warm window light. ${concept}`,
    caption: "Evening pavilion — concept, not the hospital",
  },
  light: {
    src: "/images/light.webp",
    width: 1200,
    height: 1200,
    alt: `Close view of sunlight on pale stone and linen. ${concept}`,
    caption: "Stone and linen — concept, not the hospital",
  },
} as const satisfies Record<string, GalleryImage>;

export const galleryImages: GalleryImage[] = [
  images.hero,
  images.portrait,
  images.corridor,
  images.courtyard,
  images.facade,
  images.light,
];

export type DraftDepartment = {
  slug: string;
  name: string;
  summary: string;
  services: string[];
};

export const departments: DraftDepartment[] = [
  {
    slug: "general-medicine",
    name: "General medicine",
    summary:
      "A template for adult outpatient care. DEMO Hospital has not confirmed that this department exists, or what it treats.",
    services: [
      "First conversation with a physician — template line",
      "Review of an existing problem — template line",
      "Follow-up visit — template line",
    ],
  },
  {
    slug: "womens-health",
    name: "Women's health",
    summary:
      "A template for women's health. It is not a confirmed clinic list, and it makes no promise about treatment.",
    services: [
      "Consultation — template line",
      "Follow-up visit — template line",
    ],
  },
  {
    slug: "childrens-care",
    name: "Children's care",
    summary:
      "A template for children's services. No age range, clinic time, or doctor has been confirmed.",
    services: [
      "Child health review — template line",
      "Conversation with a parent — template line",
    ],
  },
  {
    slug: "diagnostics",
    name: "Diagnostics",
    summary:
      "A template for tests and imaging. No machines, report process, or timings have been confirmed.",
    services: [
      "Sample collection — template line",
      "Imaging appointment — template line",
    ],
  },
];

export const enquiryDepartments = [
  ...departments.map((department) => ({
    value: department.slug,
    label: `${department.name} (draft placeholder)`,
  })),
  { value: "unsure", label: "Not sure yet" },
];

export type DemoDoctor = {
  slug: string;
  name: string;
  index: string;
  specialty: string;
  departmentSlug: string;
  qualification: string;
  experience: string;
  consultation: string;
};

export const doctors: DemoDoctor[] = [
  {
    slug: "sample-physician-one",
    name: "Sample Physician One",
    index: "01",
    specialty: "General medicine — demonstration specialty",
    departmentSlug: "general-medicine",
    qualification: "Demonstration text only. Not a real qualification or medical registration.",
    experience: "Not supplied. This is not a real doctor.",
    consultation: "Days, fees, and availability have not been confirmed.",
  },
  {
    slug: "sample-physician-two",
    name: "Sample Physician Two",
    index: "02",
    specialty: "Women's health — demonstration specialty",
    departmentSlug: "womens-health",
    qualification: "Demonstration text only. Not a real qualification or medical registration.",
    experience: "Not supplied. This is not a real doctor.",
    consultation: "Days, fees, and availability have not been confirmed.",
  },
  {
    slug: "sample-physician-three",
    name: "Sample Physician Three",
    index: "03",
    specialty: "Diagnostics — demonstration specialty",
    departmentSlug: "diagnostics",
    qualification: "Demonstration text only. Not a real qualification or medical registration.",
    experience: "Not supplied. This is not a real doctor.",
    consultation: "Days, fees, and availability have not been confirmed.",
  },
];

export function getDepartment(slug: string) {
  return departments.find((department) => department.slug === slug) ?? null;
}

export function getDoctor(slug: string) {
  return doctors.find((doctor) => doctor.slug === slug) ?? null;
}

export function doctorsIn(slug: string) {
  return doctors.filter((doctor) => doctor.departmentSlug === slug);
}

export const canvaBoard = {
  url: "https://canva.link/zj9su4ezpq2t68d",
  id: "DAHXzmA-Is8",
} as const;

export const imageSlots = [
  {
    file: "hero.webp",
    use: "Desktop hero",
    ratio: "16:9",
    guidance: "A real wide photograph of the hospital exterior or courtyard. No overlaid text.",
  },
  {
    file: "hero-portrait.webp",
    use: "Mobile hero",
    ratio: "3:4",
    guidance: "A tall crop of the same place, with space for the headline beside it on larger screens.",
  },
  {
    file: "corridor.webp",
    use: "About and interior",
    ratio: "3:2",
    guidance: "An interior the hospital is willing to show. Keep faces out unless people have agreed.",
  },
  {
    file: "courtyard.webp",
    use: "Gallery",
    ratio: "3:2",
    guidance: "A garden, court, or waiting area that actually belongs to the hospital.",
  },
  {
    file: "facade.webp",
    use: "Gallery",
    ratio: "16:9",
    guidance: "The building from outside, in honest light.",
  },
  {
    file: "light.webp",
    use: "Gallery detail",
    ratio: "1:1",
    guidance: "A material detail — stone, timber, linen — from the real building.",
  },
] as const;
