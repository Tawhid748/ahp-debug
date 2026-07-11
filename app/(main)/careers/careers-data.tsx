// Hardcoded careers/job data. Add or edit positions here.
// (Replaces the Convex api.careers.getActiveCareers query.)

export interface Career {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "internship";
  description: string;
  requirements: string[];
  salaryMin?: number;
  salaryMax?: number;
}

export const CAREERS: Career[] = [
  {
    _id: "1",
    title: "Brand Marketing Manager",
    department: "Marketing",
    location: "Ronkonkoma, NY",
    type: "full-time",
    description:
      "Lead brand strategy and campaigns across our fragrance portfolio. You'll own positioning, creative direction, and go-to-market plans for both wholesale and e-commerce channels, working closely with sales and leadership to grow brand awareness.",
    requirements: ["5+ yrs marketing", "Brand strategy", "Fragrance/beauty"],
    salaryMin: 75000,
    salaryMax: 95000,
  },
  {
    _id: "2",
    title: "Wholesale Account Executive",
    department: "Sales",
    location: "Ronkonkoma, NY",
    type: "full-time",
    description:
      "Manage and grow relationships with retail and distribution partners across North America. Drive new business, negotiate terms, and ensure clients receive best-in-class service and product availability.",
    requirements: ["B2B sales", "Account management", "Negotiation"],
    salaryMin: 60000,
    salaryMax: 85000,
  },
  {
    _id: "3",
    title: "Warehouse Operations Associate",
    department: "Operations",
    location: "Ronkonkoma, NY",
    type: "full-time",
    description:
      "Support daily warehouse operations including receiving, inventory management, order fulfillment, and shipping. Ensure accuracy and efficiency across the fulfillment pipeline.",
    requirements: ["Inventory", "Order fulfillment", "Attention to detail"],
  },
  {
    _id: "4",
    title: "Full-Stack Developer",
    department: "Technology",
    location: "Remote / Ronkonkoma, NY",
    type: "full-time",
    description:
      "Build and maintain our e-commerce and internal tooling. Work across the stack with Next.js, TypeScript, and modern data tooling to ship features that power our wholesale and DTC operations.",
    requirements: ["Next.js", "TypeScript", "React", "3+ yrs"],
    salaryMin: 90000,
    salaryMax: 130000,
  },
  {
    _id: "5",
    title: "E-Commerce Marketing Intern",
    department: "Marketing",
    location: "Ronkonkoma, NY",
    type: "internship",
    description:
      "Support our e-commerce team with content creation, listing optimization, and campaign analytics. A great entry point into the fragrance industry and digital marketing.",
    requirements: ["Marketing student", "Social media", "Analytics"],
  },
];
