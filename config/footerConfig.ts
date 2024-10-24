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

import { Logo } from "@/components/global";

export const footerConfig: FooterConfigType = {
  Logo,
  summary:
    "A Full Stack Next JS Ecommerce application - Involving in 3 big systems ( For Online Shop, POS & Admin Dashboard ).",
  contacts: [
    { label: "+91 987 654 3210", Icon: Headset },
    { label: "support @stockify.com", Icon: Mail },
    {
      label:
        "Yello Valley, Campbell Building Street, Westminister, UK - ST3 6TR",
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
        { name: "Blogs", path: "/blogs" },
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
        { name: "For Individuals", path: "/individuals" },
        { name: "For Freelancers", path: "/freelancers" },
        { name: "For Teams", path: "/teams" },
        { name: "For Enterprises", path: "/enterprises" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Support", path: "/support" },
        { name: "Security", path: "/security" },
        { name: "Help Center", path: "/help-center" },
        { name: "Preferences", path: "/preferences" },
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Terms of Use", path: "/terms-conditions" },
      ],
    },
  ],
  policies: [
    { item: "Terms & Conditions", url: "/terms-conditions" },
    { item: "Privacy Policy", url: "/privacy-policy" },
    { item: "Cookie Policy", url: "/cookie-policy" },
  ],
  mediaLinks: [
    { Icon: FacebookIcon, path: "#" },
    { Icon: TwitterIcon, path: "#" },
    { Icon: InstagramIcon, path: "#" },
    { Icon: YoutubeIcon, path: "#" },
  ],
};
