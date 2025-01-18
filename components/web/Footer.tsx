import { IconBrandX, IconBrandFacebook, IconBrandDiscord, IconBrandInstagram } from "@tabler/icons-react";

import Link from "next/link";

export const Footer = () => {
  const socials = [
    {
      id: "facebook",
      link: "https://facebook.com",
      icon: <IconBrandFacebook size={18} />,
    },
    {
      id: "twitter",
      link: "https://twitter.com",
      icon: <IconBrandX size={18} />,
    },
    {
      id: "discord",
      link: "https://discord.com",
      icon: <IconBrandDiscord size={18} />,
    },
    {
      id: "instagram",
      link: "https://instagram.com",
      icon: <IconBrandInstagram size={18} />,
    },
  ];

  return (
    <footer className="bg-purple py-12 text-white text-[0.88rem]">
      <div className="mx-auto p-5 text-center flex flex-col md:flex-row md:justify-between gap-9 items-center">
        <Link href="/" className="font-bold text-lg md:text-xl text-white">
          Clyne
        </Link>
        <div className="flex items-center justify-center gap-5">
          {socials.map((social) => (
            <a
              key={social.id}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
      <p className="text-center p-5 mt-2">
        Built with 💚 by{" "}
        <a
          href="https://treasureuzoma.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold hover:text-gray-300"
        >
          Treasure
        </a>{" "}
        and{" "}
        <a
          href="https://leowavecom.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold hover:text-gray-300"
        >
          LeoWave
        </a>
      </p>
    </footer>
  );
};
