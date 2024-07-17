import type { FooterConfigType } from "@/types";

import {
  Facebook,
  Headset,
  Instagram,
  Mail,
  MapPin,
  Twitter,
  Youtube,
} from "lucide-react";
import { Logo } from "@/components/global";

export const footerConfig: FooterConfigType = {
  Logo,
  summary:
    "NextJS app implementing all features of an Ecommerce application - including Dashboard, POS & Online Shop features.",
  contacts: [
    {
      label: "+91 987 654 3210",
      Icon: Headset,
    },
    {
      label: "support@stockify.com",
      Icon: Mail,
    },
    {
      label:
        "Yello Valley, Campbell Building, William Street, New York, IG3 8EF",
      Icon: MapPin,
    },
  ],
  navigation: [
    {
      title: "Getting Started",
      links: [
        { name: "Introduction", path: "/introduction" },
        { name: "Documentation", path: "/docs" },
        { name: "Usage", path: "/usage" },
        { name: "Global", path: "/global" },
        { name: "API", path: "/api-docs" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Careers", path: "/careers" },
        { name: "Community", path: "/community" },
        { name: "Customers", path: "/customers" },
        { name: "Contact Us", path: "/contact" },
      ],
    },
    {
      title: "Partner",
      links: [
        { name: "For Individuals", path: "/individual" },
        { name: "For Freelancers", path: "/freelancing" },
        { name: "For Teams", path: "/teams" },
        { name: "For Enterprises", path: "/enterprise" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Support", path: "/support" },
        { name: "Security", path: "/security" },
        { name: "Help Center", path: "/help" },
        { name: "Preferences", path: "/preferences" },
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Terms of Use", path: "/terms-conditions" },
      ],
    },
  ],
  policies: [
    {
      label: "Terms & Conditions",
      path: "/terms-conditions",
    },
    {
      label: "Privacy Policy",
      path: "/privacy-policy",
    },
    {
      label: "Cookie Policy",
      path: "/cookie-policy",
    },
  ],
  mediaLinks: [
    {
      Icon: Facebook,
      path: "#",
    },
    {
      Icon: Twitter,
      path: "#",
    },
    {
      Icon: Youtube,
      path: "#",
    },
    {
      Icon: Instagram,
      path: "#",
    },
  ],
};
