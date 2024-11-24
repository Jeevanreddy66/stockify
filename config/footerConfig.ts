import type { FooterConfigType } from "@/types/configTypes";

import {
  FacebookIcon,
  Headset,
  InstagramIcon,
  Mail,
  MapPin,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";

export const footerConfig: FooterConfigType = {
  summary:
    "A Full Stack Inventory Management Application having a 3 in 1 system (Online Store, POS & Dashboard) built with modern NextJS Tech stack.",
  contacts: [
    { label: "+91 987 654 3210", Icon: Headset },
    { label: "support@stockify.com", Icon: Mail },
    {
      label:
        "15 Golden Eve Road, Campbell Street, Seven Kings, London - ST3 6VF",
      Icon: MapPin,
    },
  ],
  navigation: [
    {
      title: "Getting Started",
      links: [
        { label: "Introduction", path: "/introduction" },
        { label: "Documentation", path: "/docs" },
        { label: "Usage", path: "/usage" },
        { label: "Global", path: "/global" },
        { label: "API", path: "/api-docs" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About us", path: "/about-us" },
        { label: "Careers", path: "/careers" },
        { label: "Community", path: "/community" },
        { label: "Customers", path: "/customers" },
        { label: "Contact us", path: "/contact-us" },
      ],
    },
    {
      title: "Partner",
      links: [
        { label: "For individuals", path: "/individuals" },
        { label: "For freelancers", path: "/freelancers" },
        { label: "For teams", path: "/teams" },
        { label: "For enterprises", path: "/enterprises" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Support", path: "/support" },
        { label: "Security", path: "/security" },
        { label: "Help Center", path: "/help-center" },
        { label: "Preferences", path: "/preferences" },
        { label: "Privacy Policy", path: "/privacy-policy" },
        { label: "Terms of Use", path: "/terms-conditions" },
      ],
    },
  ],
  policies: [
    { name: "Terms & Conditions", url: "/terms-conditions" },
    { name: "Privacy Policy", url: "/privacy-policy" },
    { name: "Cookie Policy", url: "/cookie-policy" },
  ],
  mediaLinks: [
    { Icon: FacebookIcon, href: "#" },
    { Icon: TwitterIcon, href: "#" },
    { Icon: InstagramIcon, href: "#" },
    { Icon: YoutubeIcon, href: "#" },
  ],
};
