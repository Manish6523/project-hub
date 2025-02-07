"use client";
import { CircleUserRoundIcon, Code2, Edit, Home, Link2, Pencil, User2, X } from "lucide-react";
import { redirect, useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion"
import React, { useState } from "react";
import { useSession } from "next-auth/react";

const Theme01 = (props) => {

    const { data: session } = useSession();
    const Router = useRouter();

    const { projectID } = useParams();
    const [loading, setLoading] = useState(true);
    const [color, setColor] = useState("#000000"); // Border color
    const [textColor, setTextColor] = useState("#000000"); // Text color

    const [showPreview, setShowPreview] = useState(false);
    const [Img, setImg] = useState(props.image);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3 }}
            className="min-h-screen flex justify-center bg-gray-100">
            {
                <div className={`fixed p-1 z-10 ${showPreview ? "top-0" : "-top-[500%]"} transition-all left-0 backdrop-blur-sm h-screen w-screen flex items-center justify-center`}>
                    <div className="relative flex items-center justify-center h-full md:w-1/2 w-auto">
                        <img src={Img} alt="" className="object-contain" />
                        <span className="bg-red-300 p-2 absolute top-2 right-2 rounded-full cursor-pointer"
                            onClick={() => { setShowPreview(false) }}
                        > <X /> </span>
                    </div>
                </div>
            }
            <div className="container w-full max-w-6xl p-4">
                {/* Header */}
                <header className="flex justify-between items-center p-3 border-2 shadow-lg rounded-xl transition-all bg-white"
                    style={{ borderColor: color, color: textColor }}>
                    {!loading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            <div className="flex items-center gap-3">
                                {props && (
                                    <img
                                        src={props.profilePick}
                                        onClick={() => redirect(`/dashboard/+${props.email}`)}
                                        alt="profileImage"
                                        draggable={false}
                                        className="hover:-translate-y-1 transition-all cursor-pointer size-16 rounded-full border-2 shadow-md hover:shadow-xl"
                                        style={{ borderColor: color }}
                                    />
                                )}
                                <div>
                                    <p className="text-xl flex items-center gap-2">
                                        <User2 /> {props.username}
                                    </p>
                                    <p className="text-sm">{props.email}</p>
                                </div>
                            </div>
                            <ul className="sm:flex items-center gap-3 mt-3 md:mt-0 hidden">
                                <li onClick={() => redirect("/")} className="hover:-translate-y-1 transition-all border-2 p-2 rounded-full cursor-pointer shadow-md hover:shadow-xl bg-white" style={{ borderColor: color }}>
                                    <Home />
                                </li>
                                <li onClick={() => redirect("/profile/" + props.email)} className="hover:-translate-y-1 transition-all border-2 p-2 rounded-full cursor-pointer shadow-md hover:shadow-xl bg-white" style={{ borderColor: color }}>
                                    <CircleUserRoundIcon />
                                </li>
                            </ul>
                        </>
                    )}
                </header>

                {/* Project Section */}
                <div className="flex flex-col md:flex-row gap-4 mt-5">
                    <div className="relative w-full lg:w-1/2 flex flex-col gap-3">
                        <img src={props.image}
                            onClick={() => { setImg(props.image); setShowPreview(true) }}
                            alt="" className="h-full aspect-[3/2] object-cover border-2 rounded-lg hover:scale-[1.01] transition-all shadow-lg hover:shadow-2xl bg-white" style={{ borderColor: color }} />
                        <div className="flex gap-2 justify-between cursor-pointer">
                            {props.img01 && props.img01.trim() !== "" &&  <img src={props.img01} onClick={() => { setImg(props.img01); setShowPreview(true) }} alt="" className="w-[32%] aspect-square object-cover border-2 rounded-lg hover:scale-[1.01] transition-all shadow-md hover:shadow-xl bg-white" style={{ borderColor: color }} />}
                            {props.img02 && props.img02.trim() !== "" &&  <img src={props.img02} onClick={() => { setImg(props.img02); setShowPreview(true) }} alt="" className="w-[32%] aspect-square object-cover border-2 rounded-lg hover:scale-[1.01] transition-all shadow-md hover:shadow-xl bg-white" style={{ borderColor: color }} />}
                            {props.img03 && props.img03.trim() !== "" &&  <img src={props.img03} onClick={() => { setImg(props.img03); setShowPreview(true) }} alt="" className="w-[32%] aspect-square object-cover border-2 rounded-lg hover:scale-[1.01] transition-all shadow-md hover:shadow-xl bg-white" style={{ borderColor: color }} />}
                        </div>
                        {session?.user?.email === props.email &&
                            <div onClick={()=>{Router.push("/project/"+props.id+"/edit")}} className="cursor-pointer absolute top-4 right-4 bg-white p-2 rounded-full border-2 border-black ">
                                <Pencil className="cursor-pointer" onClick={()=>{Router.push("/project/"+props.id+"/edit")}} />
                            </div>
                        }
                    </div>
                    <div className="w-full lg:w-1/2 flex flex-col gap-3">
                        <h1 className="hover:-translate-y-1 transition-all text-2xl font-bold border-2 p-2 shadow-md hover:shadow-xl bg-white rounded-lg"
                            style={{ borderColor: color, color: textColor }}>
                            {props.title}
                        </h1>
                        <p className="hover:-translate-y-1 transition-all border-2 p-2 shadow-md hover:shadow-xl bg-white rounded-lg"
                            style={{ borderColor: color, color: textColor }}>
                            <span className="font-semibold">Published At:</span> {props.date}
                        </p>
                        <p className="h-full hover:-translate-y-1 transition-all border-2 p-2 shadow-md hover:shadow-xl bg-white rounded-lg"
                            style={{ borderColor: color, color: textColor }}>
                            {props.description}
                        </p>
                        <div className="border-2 p-2 flex flex-col flex-wrap gap-3 shadow-md hover:shadow-xl bg-white rounded-lg"
                            style={{ borderColor: color, color: textColor }}>
                            <span className="font-semibold">Technology used:</span>
                            <div className="flex gap-3 flex-wrap">
                                {
                                    props.tech.map((tech, i) => {
                                        return <span key={i} className="hover:-translate-y-1 transition-all border-2 p-2 w-fit font-semibold shadow-md hover:shadow-xl bg-white rounded-lg"
                                            style={{ borderColor: color, color: textColor }}>{tech}</span>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-3 flex gap-4">
                    <a href={props.source} target="_blank" className="hover:-translate-y-1 transition-all flex items-center justify-center gap-2 border-2 w-full hover:bg-black hover:text-white text-center p-2 font-semibold shadow-lg hover:shadow-xl bg-white rounded-lg"
                        style={{ borderColor: color }}>
                        Source Code <Code2 />
                    </a>
                    <a href={props.visit} target="_blank" className="hover:-translate-y-1 transition-all flex items-center justify-center gap-2 border-2 w-full hover:bg-black hover:text-white text-center p-2 font-semibold shadow-lg hover:shadow-xl bg-white rounded-lg"
                        style={{ borderColor: color }}>
                        Live Url <Link2 />
                    </a>
                </div>

            </div>
        </motion.div>
    );
};

export default Theme01;
