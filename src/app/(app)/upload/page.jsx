"use client";
import axios from "axios";
import { CircleUserRoundIcon, Home, Plus, User2 } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { redirect, useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {

    const { projectID } = useParams();
    const [color, setColor] = useState("#000000"); // Border color
    const [textColor, setTextColor] = useState("#000000"); // Text color

    // Individual states for images
    const [mainImage, setMainImage] = useState(null);
    const [ss01, setSs01] = useState(null);
    const [ss02, setSs02] = useState(null);
    const [ss03, setSs03] = useState(null);

    // States for text fields
    const [title, setTitle] = useState("");
    const [theme, setTheme] = useState("Theme01");
    const [description, setDescription] = useState("");
    const [technology, setTechnology] = useState("");
    const [sourceCode, setSourceCode] = useState("");
    const [liveUrl, setLiveUrl] = useState("");


    const { data: session } = useSession();
    const user = session?.user;
    const router = useRouter()

    const handleImageChange = (event, setImage) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        const FormData = {
            email: user.email,
            image: mainImage,
            title: title,
            theme: theme,
            description: description,
            tech: technology,
            screenshots: { img01: ss01, img02: ss02, img03: ss03 },
            SourceLink: sourceCode,
            LiveLink: liveUrl,
        }
        // e.preventDefault()
        if (title.length < 1 || description.length < 1 || technology.length < 1 || sourceCode.length < 1 || liveUrl.length < 1) {
            toast.error("Please fill all the fields")
        } else {
            try {
                let response = await axios.post("/api/add-project", FormData)
                if (response.status === 200) {
                toast.success("Project added successfully")
                router.push("/profile")
                }
            } catch (error) {
                toast.error("Something went wrong")
            }
        }

    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            {session ? <div className="container w-full max-w-6xl p-4">
                {/* Header */}
                <header className="flex justify-between items-center p-3 border-2 shadow-md transition-all"
                    style={{ borderColor: color, color: textColor }}>
                    {!session ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            <div className="flex items-center gap-3">
                                {session && (
                                    <img
                                        onClick={() => redirect("/dashboard/" + user?.email)}
                                        src={user?.profilePick}
                                        alt="profileImage"
                                        draggable={false}
                                        className="cursor-pointer size-16 rounded-full border-2"
                                        style={{ borderColor: color }}
                                    />
                                )}
                                <div>
                                    <p className="text-xl flex items-center gap-2">
                                        <User2 /> {user?.username}
                                    </p>
                                    <p className="text-sm">{user?.email}</p>
                                </div>
                            </div>
                            <ul className="flex items-center gap-3 mt-3 md:mt-0">
                                <li onClick={() => redirect("/")} className="border-2 p-2 rounded-full cursor-pointer" style={{ borderColor: color }}>
                                    <Home />
                                </li>
                                <li onClick={() => redirect("/profile")} className="border-2 p-2 rounded-full cursor-pointer" style={{ borderColor: color }}>
                                    <CircleUserRoundIcon />
                                </li>
                            </ul>
                        </>
                    )}
                </header>

                {/* Project Section */}
                <div className="flex flex-col md:flex-row gap-4 mt-5">
                    <div className="w-full lg:w-1/2 flex flex-col gap-3">
                        <label htmlFor="titleImg" className="flex items-center justify-center cursor-pointer h-full aspect-[3/2] object-cover border-2" style={{ borderColor: color }} >
                            {mainImage ? <img src={mainImage} alt="Uploaded" className="h-full w-full object-cover" /> : <Plus />}
                        </label>
                        <input spellCheck="false" type="file" id="titleImg" className="hidden" accept="image/*" onChange={(e) => handleImageChange(e, setMainImage)} />
                        <div className="flex gap-2 justify-between">
                            {[setSs01, setSs02, setSs03].map((setImage, index) => (
                                <label key={index} htmlFor={`ss0${index + 1}`} className="flex items-center justify-center cursor-pointer w-[32%] aspect-square object-cover border-2" style={{ borderColor: color }}>
                                    {([ss01, ss02, ss03][index]) ? <img src={[ss01, ss02, ss03][index]} alt="Uploaded" className="w-full h-full object-cover" /> : <Plus />}
                                </label>
                            ))}
                            <input spellCheck="false" type="file" id="ss01" className="hidden" accept="image/*" onChange={(e) => handleImageChange(e, setSs01)} />
                            <input spellCheck="false" type="file" id="ss02" className="hidden" accept="image/*" onChange={(e) => handleImageChange(e, setSs02)} />
                            <input spellCheck="false" type="file" id="ss03" className="hidden" accept="image/*" onChange={(e) => handleImageChange(e, setSs03)} />
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 flex flex-col gap-3">
                        <input spellCheck="false" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="text-2xl font-bold border-2 p-2" style={{ borderColor: color, color: textColor }} />
                        <div className="flex gap-3">
                            <span className="border-2 border-black p-2">Set Theme</span>
                            <span className={`border-2 border-black p-2 cursor-pointer ${theme === "Theme01" ? "bg-black text-white" : ""} `} onClick={() => setTheme("Theme01")} >Theme 1</span>
                            <span className={`border-2 border-black p-2 cursor-pointer ${theme === "Theme02" ? "bg-black text-white" : ""} `} onClick={() => setTheme("Theme02")} >Theme 2</span>
                        </div>
                        <textarea spellCheck="false" value={description} onChange={(e) => setDescription(e.target.value)} className="h-full border-2 p-2" placeholder="Description" style={{ borderColor: color, color: textColor }} />
                        <div className="border-2 p-2 flex flex-col flex-wrap gap-3" style={{ borderColor: color, color: textColor }}>
                            <span className="font-semibold">Technology used:</span>
                            <input spellCheck="false" type="text" value={technology} onChange={(e) => setTechnology(e.target.value)} placeholder="separate by ," className="border-2 p-2 w-fit font-semibold" style={{ borderColor: color, color: textColor }} />
                        </div>
                    </div>
                </div>
                <div className="mt-3 flex gap-4">
                    <input spellCheck="false" value={sourceCode} onChange={(e) => setSourceCode(e.target.value)} placeholder="Source Code" type="text" className="border-2 w-full text-center p-2 font-semibold" style={{ borderColor: color, color: textColor }} />
                    <input spellCheck="false" value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} placeholder="Live URL" type="text" className="border-2 w-full text-center p-2 font-semibold" style={{ borderColor: color, color: textColor }} />
                </div>
                <button type="submit" className="save focus:ring-4 bg-green-500 w-full p-4 my-3 border-2 border-black" onClick={() => { handleSubmit() }}>Upload</button>
            </div> : <h1 className="text-2xl cursor-pointer text-center transition-all hover:bg-black hover:text-white border-2 border-black px-4 py-3" onClick={() => signIn("google", { redirect: "/profile" })} >Log In first</h1>}
        </div>
    );
};

export default Page;
