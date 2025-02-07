"use client"
import axios from 'axios';
import { motion } from "framer-motion"
import { Loader2, Search, User2 } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export const Navbar = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");


    const { data: session } = useSession();
    const pathname = usePathname();
    const router = useRouter();

    const handleSearch = async (e) => {
        e.preventDefault();
        router.push(`/search/${searchValue.trim()}`);
        setOpen(false);
    };


    if (pathname.startsWith("/dashboard") || pathname.startsWith("/project") || pathname.startsWith("/upload")) return null

    return (
        <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3 }}
            className='absolute top-0 w-full z-10 text-black flex items-center justify-between sm:px-10 px-3 py-2  '>
            <div onClick={() => { router.push("/") }} className='cursor-pointer text-xl flex items-center gap-3'>
                <Image src="/images/logo.png" width={40} height={40} alt="Logo" />
                ProjectHub
            </div>
            <span className='flex gap-2'>
                {session && (
                    <div className="sm:flex hidden items-center border-2 border-black  ">
                        <form onSubmit={handleSearch} className="flex w-full px-2">
                            <input
                                value={searchValue}
                                onChange={(e) => { setSearchValue(e.target.value) }}
                                spellCheck="false"
                                minLength={3}
                                maxLength={12}
                                placeholder="Search Username"
                                required
                                type="text"
                                className="w-full placeholder:text-gray-900 outline-none bg-transparent transition-all text-sm sm:text-base"
                            />
                            <button
                                type="submit"
                                className="flex items-center justify-center transition-all hover:text-green-800"
                            >
                                <Search />
                            </button>
                        </form>
                    </div>
                )}

                <div className='flex gap-5 items-center'>
                    {session ?
                        <div className="relative">
                            <button
                                onClick={() => setOpen(!open)}
                                onBlur={() => setTimeout(() => setOpen(false), 200)}
                                className={`sm:px-4 px-2 sm:py-2 py-1 border-2 flex items-center justify-center gap-2 border-black 
                                hover:bg-black hover:text-white transition-all`}
                            >
                                <User2 className='size-5' /> {session.user.username} <ChevronDown size={16} />
                            </button>
                            {open && (
                                <div className={`absolute left-0 mt-2 w-full bg-white border-2 shadow-lg border-black overflow-hidden`}>
                                    <Link
                                        href={`/`}
                                        className={`block px-4 py-2  ${pathname.endsWith("/") ? "bg-black text-white" : ""}`}
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        href={`/dashboard/${session.user.email}`}
                                        className={`block px-4 py-2 border-[1.5px] border-l-0 border-r-0 border-black ${pathname.startsWith("/dashboard") ? "bg-black text-white" : ""}`}
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href="/profile"
                                        className={`block px-4 py-2 ${pathname.startsWith("/profile") ? "bg-black text-white" : ""}`}
                                    >
                                        Profile
                                    </Link>
                                    <form onSubmit={handleSearch} className='flex sm:hidden items-center pr-2 border-t-[1.5px] border-black'>
                                        <input type='text'
                                            placeholder='Search user'
                                            onChange={(e) => { setSearchValue(e.target.value) }}
                                            spellCheck="false"
                                            minLength={3}
                                            maxLength={12}
                                            onClick={() => setOpen(open)}
                                            onFocus={() => setTimeout(() => setOpen(true), 201)}
                                            className={`w-[90%] py-2 px-4 outline-none`}
                                        />
                                        <button type='submit'>
                                            <Search className='text-black' />
                                        </button>
                                    </form>


                                </div>
                            )}
                        </div>
                        :
                        <button
                            onClick={() => { setIsLoading(true); toast("Logging in..."); signIn("google", { redirect: true, callbackUrl: "/profile" }); }}
                            disabled={isLoading}
                            className="sm:px-4 px-2 sm:py-2 py-1 border-2 flex gap-2 border-black hover:bg-black hover:text-white transition-all">
                            <span >{isLoading ? <Loader2 className='size-6 animate-spin' /> : "Log In"}</span>
                        </button>
                    }
                </div>
            </span>
        </motion.nav >
    )
}
