"use client";
import { CircleUserRoundIcon, Code2, Home, Link2, User2, X, Pencil } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

const Theme02 = (props) => {
    const { data: session } = useSession();
    const { projectID } = useParams();
    const router = useRouter();
    const [showPreview, setShowPreview] = useState(false);
    const [Img, setImage] = useState("");

    const neumorphismStyle = {
        background: "#e0e0e0",
        boxShadow: "8px 8px 16px #bebebe, -8px -8px 16px #ffffff",
        borderRadius: "16px",
        padding: "16px"
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3 }}
            className="min-h-screen flex justify-center items-center bg-gray-200 py-6 pb-14"
        >
            {/* Image Preview Modal */}
            {showPreview && (
                <div className="fixed z-10 p-1 top-0 left-0 backdrop-blur-sm h-screen w-screen flex items-center justify-center">
                    <div className="relative flex items-center justify-center h-full md:w-1/2 w-auto">
                        <img src={Img} alt="Preview" className="object-contain" />
                        <span
                            className="bg-red-300 p-2 absolute top-2 right-2 rounded-full cursor-pointer"
                            onClick={() => setShowPreview(false)}
                        >
                            <X />
                        </span>
                    </div>
                </div>
            )}

            <div className="sm:w-[85vw] w-[95vw] flex flex-col gap-6">
                {/* Header */}
                <header className="flex justify-between items-center">
                    <div className="flex gap-3 items-center md:w-auto w-full" style={neumorphismStyle}>
                        {props.profilePick?.trim() && (
                            <img
                                src={props.profilePick}
                                alt="profile"
                                className="rounded-full size-[70px] cursor-pointer"
                                onClick={() => router.push(`/dashboard/${props.email}`)}
                            />
                        )}
                        <div className="info flex flex-col gap-1">
                            <span className="font-semibold text-3xl flex gap-1 items-center">
                                <User2 />
                                {props.username}
                            </span>
                            <span>{props.email}</span>
                        </div>
                    </div>
                    <ul className="md:flex hidden items-center gap-3">
                        <li
                            onClick={() => router.push("/")}
                            className="p-3 rounded-full cursor-pointer"
                            style={neumorphismStyle}
                        >
                            <Home />
                        </li>
                        <li
                            onClick={() => router.push(`/profile/${props.email}`)}
                            className="p-3 rounded-full cursor-pointer"
                            style={neumorphismStyle}
                        >
                            <CircleUserRoundIcon />
                        </li>
                    </ul>
                </header>

                {/* Main Project Section */}
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-2/3 flex flex-col gap-4 relative">
                        {props.image?.trim() && (
                            <img
                                src={props.image}
                                alt="Project"
                                className="w-full aspect-video object-cover rounded-lg cursor-pointer"
                                onClick={() => { setImage(props.image); setShowPreview(true); }}
                            />
                        )}
                        <h2 className="text-2xl font-bold" style={neumorphismStyle}>{props.title}</h2>
                        <p style={neumorphismStyle}>{props.description}</p>
                        {session?.user?.email === props.email && (
                        <div
                            onClick={() => router.push(`/project/${props.id}/edit`)}
                            className="cursor-pointer absolute top-4 right-4 bg-white p-2 rounded-full border-2 border-black"
                        >
                            <Pencil />
                        </div>
                    )}
                    </div>
                    <div className="w-full md:w-1/3 flex flex-col gap-4">
                        <h3 className="text-xl font-semibold" style={neumorphismStyle}>Project Details</h3>
                        <div className="p-4" style={neumorphismStyle}>
                            <p><strong>Technology used:</strong></p>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {props.tech?.map((tech, i) => (
                                    <span key={i} className="px-3 py-1 text-sm font-semibold rounded-lg" style={neumorphismStyle}>{tech}</span>
                                ))}
                            </div>
                        </div>
                        <p style={neumorphismStyle}><strong>Published At:</strong> {props.date}</p>
                    </div>
                </div>

                {/* Image Gallery */}
                <div className="flex w-full gap-4 justify-center">
                    {[props.img01, props.img02, props.img03].map((img, i) =>
                        img?.trim() && (
                            <img
                                key={i}
                                src={img}
                                alt={`Preview ${i + 1}`}
                                className="w-[30%] aspect-square object-cover rounded-lg cursor-pointer"
                                onClick={() => { setImage(img); setShowPreview(true); }}
                            />
                        )
                    )}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                    {props.source?.trim() && (
                        <a
                            href={props.source}
                            target="_blank"
                            className="flex-1 flex items-center justify-center text-lg font-semibold rounded-lg"
                            style={neumorphismStyle}
                        >
                            Source Code <Code2 />
                        </a>
                    )}
                    {props.visit?.trim() && (
                        <a
                            href={props.visit}
                            target="_blank"
                            className="flex-1 flex items-center justify-center text-lg font-semibold rounded-lg"
                            style={neumorphismStyle}
                        >
                            Live URL <Link2 />
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default Theme02;
