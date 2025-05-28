"use client";

import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

// Define types for better organization
type FooterLinkSection = {
  title: string;
  links: {
    text: string;
    href: string;
  }[];
};

type SocialLink = {
  icon: React.ReactNode;
  href: string;
  label: string;
};

const Footer = () => {
  // Footer navigation sections
  const footerSections: FooterLinkSection[] = [
    {
      title: "Shop",
      links: [
        { text: "New Arrivals", href: "/new-arrivals" },
        { text: "Best Sellers", href: "/best-sellers" },
        { text: "Sale", href: "/sale" },
      ],
    },
    {
      title: "Customer Service",
      links: [
        { text: "Contact Us", href: "/contact" },
        { text: "FAQs", href: "/faqs" },
        { text: "Shipping & Returns", href: "/shipping-returns" },
      ],
    },
    {
      title: "About",
      links: [
        { text: "Our Story", href: "/about" },
        { text: "Blog", href: "/blog" },
        { text: "Careers", href: "/careers" },
      ],
    },
  ];

  // Social media links
  const socialLinks: SocialLink[] = [
    {
      icon: <Facebook size={20} />,
      href: "https://facebook.com",
      label: "Facebook",
    },
    {
      icon: <Twitter size={20} />,
      href: "https://twitter.com",
      label: "Twitter",
    },
    {
      icon: <Instagram size={20} />,
      href: "https://instagram.com",
      label: "Instagram",
    },
    {
      icon: <Linkedin size={20} />,
      href: "https://linkedin.com",
      label: "LinkedIn",
    },
  ];

  return (
    <footer className="bg-zinc-900 text-white">
      <div className="w-full max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold tracking-tighter">
              Trendora
            </Link>
            <p className="mt-4 text-sm text-zinc-300">
              Discover the latest fashion trends and elevate your style with our
              curated collection of clothing and accessories.
            </p>
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer navigation */}
          {footerSections.map((section, index) => (
            <div key={index} className="col-span-1">
              <h3 className="text-sm font-semibold uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-300 hover:text-white transition-colors"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-zinc-800 text-sm text-zinc-400 flex flex-col md:flex-row justify-between items-center">
          <p>
            &copy; {new Date().getFullYear()} Trendora. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
