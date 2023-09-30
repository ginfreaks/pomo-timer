import React from 'react'
import Link from "next/link"


export const footerLinks = [
    {
      title: "About",
      links: [
        { title: "How it works", url: "/" },
        { title: "Featured", url: "/" },
        { title: "Partnership", url: "/" },
        { title: "Bussiness Relation", url: "/" },
      ],
    },
    {
      title: "Company",
      links: [
        { title: "Events", url: "/" },
        { title: "Blog", url: "/" },
        { title: "Podcast", url: "/" },
        { title: "Invite a friend", url: "/" },
      ],
    },
    {
      title: "Socials",
      links: [
        { title: "Discord", url: "/" },
        { title: "Instagram", url: "/" },
        { title: "Twitter", url: "/" },
        { title: "Facebook", url: "/" },
      ],
    },
  ];

const Footer = () => {
  return (
    <footer className="flex flex-col text-sm mx-auto mt-40">
    <div className="flex justify-between items-center flex-wrap mt-10 border-t border-opacity-40 text-white border-gray-100  py-5">
        <p>@2023 PomoTimer. All Rights Reserved</p>
        <div className="flex justify-between items-center ">
            <Link href="/">
                Terms of Use
            </Link>
        </div>
    </div>
 
</footer>
  )
}

export default Footer