"use client"
import { IconUpload, IconUsers, IconEye } from "@tabler/icons-react"; // Import appropriate icons
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'
import {motion} from 'framer-motion'
import {
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import Image from 'next/image'
import React from 'react'
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const page = () => {
  const {data: session} = useSession();

  const Skeleton = () => (
    <img src='./images/hero01.jpg' className='h-full object-contain ' />
  );


  const items = [
    {
      title: "Showcase Your Work",
      description: "Display your projects and let the world see your creativity.",
      header: <img src='https://images.unsplash.com/photo-1485217988980-11786ced9454?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className='h-full object-cover' />,
      className: "md:col-span-2",
      icon: <IconEye className="h-6 w-6 text-neutral-500" />, // Eye icon for "Showcase"
    },
    {
      title: "Effortless Uploads",
      description: "Easily upload and manage your projects in one place.",
      header: <img src='https://plus.unsplash.com/premium_photo-1677093905912-a653c6301260?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className='h-full object-cover' />,
      className: "md:col-span-1",
      icon: <IconUpload className="h-6 w-6 text-neutral-500" />, // Upload icon for "Uploads"
    },
    {
      title: "Connect & Collaborate",
      description: "Find like-minded creators and grow your portfolio together.",
      header: <img src='https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className='h-full object-cover' />,
      className: "md:col-span-1",
      icon: <IconUsers className="h-6 w-6 text-neutral-500" />, // Users icon for "Collaboration"
    }
  ];
  


  return (
    <motion.main 
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0}}
    transition={{duration: 1.3}}
    className='min-h-screen bg-white'>
      <div className="heroSection relative">
        <img src={`./images/hero02.jpg`} alt="hero"
          className="h-screen w-full  object-cover  border border-b-black" />

        <div className="titles absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 flex flex-col items-center justify-center text-center md:text-6xl sm:text-4xl text-xl font-tinos text-black w-full">
          <p>SHOWCASE & DISCOVER</p>
          <p>AMAZING PROJECTS</p>
          <div className="input my-7">
            {/* <label htmlFor="input"
              className='cursor-pointer transition-colors bg-black hover:bg-transparent hover:border hover:text-black hover:border-black py-2 px-7 text-lg font-poppins text-white rounded-full'>
              Upload Your Projects
            </label> */}
            {/* <input className='hidden' type="file" name="input" id="input" /> */}
            <a href="/upload">
              <button
                className='cursor-pointer transition-colors bg-black hover:bg-transparent hover:text-black border border-black py-2 px-7 text-lg font-poppins text-white rounded-full'>
                Upload Your Projects
              </button>
            </a>
          </div>
          <p className='text-xl'>Share your creative work with our Community</p>
        </div>
      </div>
      <div className='px-8'>
        <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem] my-7">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              className={item.className + "border border-black text-base text-start bg-transparent backdrop-blur-sm"}
              icon={<div className="w-fit p-2 rounded-full bg-black/10">{item.icon}</div>}
            />
          ))}
        </BentoGrid>
      </div>
    </motion.main>
  )
}

export default page