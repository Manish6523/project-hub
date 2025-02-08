"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Github, Linkedin, Instagram, Edit, LogOutIcon, X, Share2 } from "lucide-react";
import {motion} from "framer-motion"
import axios from "axios";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const { data: session, status, update } = useSession();
    const router = useRouter();
    const [show, setShow] = useState(false);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [gitURL, setGitUrl] = useState("");
    const [linkedinUrl, setLinkedinUrl] = useState("");
    const [instagramUrl, setInstagramUrl] = useState("");

    useEffect(() => {
        if (session) {
            setEmail(session.user.email);
            setUsername(session.user.username);
            setGitUrl(session.user.gitURL || "");
            setLinkedinUrl(session.user.linkedInURL || "");
            setInstagramUrl(session.user.instaURL || "");
        }
    }, [session]);

    const handleLogout = () => {
        toast("Logging out...");
        signOut({ redirect: true, callbackUrl: "/" });
    };

    const updateProfile = async () => {
        try {
            await axios.post(`/api/update-profile`, { email, username, gitURL:gitURL, linkedInURL: linkedinUrl, instaURL: instagramUrl });
            toast.success("Profile updated successfully!");
            await update();
        } catch (error) {
            console.log("Error updating profile: ", error);
            toast.error("Error updating profile!");
        }
    };

    if (status === "loading") {
        return (
            <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 p-6">
                <div className="p-8 rounded-3xl shadow-2xl border bg-white text-center max-w-md w-full animate-pulse">
                    <div className="bg-gray-200 h-32 w-32 mx-auto rounded-full"></div>
                    <div className="mt-6 h-6 w-24 bg-gray-200 mx-auto rounded-md"></div>
                    <div className="mt-4 h-4 w-48 bg-gray-200 mx-auto rounded-md"></div>
                    <div className="mt-6 h-10 w-40 bg-blue-600 mx-auto rounded-md"></div>
                </div>
            </div>
        );
    }

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3 }}
            className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 p-5">
            {session ? (
                <>
                    {/* Profile Card */}
                    <div
                        className={`p-8 rounded-3xl shadow-2xl border bg-white text-center max-w-md w-full relative transition-all duration-500 ${show ? "scale-95 opacity-50 blur-sm" : "scale-100 opacity-100"
                            }`}
                    >
                        <button className="absolute top-4 right-4 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition" onClick={handleLogout}>
                            <LogOutIcon className="text-gray-700" />
                        </button>

                        <button className="absolute top-4 left-4 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition" onClick={() => setShow(true)}>
                            <Edit className="text-gray-700" />
                        </button>

                        {session.user.profilePick && (
                            <img
                                src={session?.user?.profilePick}
                                alt="Profile Picture"
                                width={130}
                                height={130}
                                className="rounded-full border-4 border-blue-500 shadow-lg mx-auto"
                            />
                        )}

                        <h2 className="sm:text-3xl text-xl font-semibold mt-5 text-gray-800 flex items-center justify-center gap-3">
                            {session?.user?.username} <Share2 onClick={()=>{navigator.clipboard.writeText(window.location.href+"/"+session?.user?.email); toast.success("Link copied to clipboard")}} className="cursor-pointer" />
                        </h2>
                        <p className="text-gray-500 sm:text-lg text-base">{session?.user?.email}</p>

                        <button
                            className="mt-6 px-6 py-3 bg-blue-600 sm:text-base text-sm text-white rounded-xl shadow-md hover:bg-blue-700 transition"
                            onClick={() => redirect("/dashboard/" + session?.user?.email)}
                        >
                            View My Projects
                        </button>

                        <button
                            className="m-2 px-6 py-3 bg-blue-600 sm:text-base text-sm text-white rounded-xl shadow-md hover:bg-blue-700 transition"
                            onClick={() => redirect("/upload")}
                        >
                            Upload
                        </button>

                        {/* Social Links */}
                        <div className="mt-6 flex justify-center space-x-6">
                            <a href={gitURL} target="_blank" className="p-2 rounded-full border text-black border-blue-600 hover:text-white hover:bg-blue-600 transition">
                                <Github className="sm:size-6 size-5" />
                            </a>
                            <a href={linkedinUrl} target="_blank" className="p-2 rounded-full border text-black border-blue-600 hover:text-white hover:bg-blue-600 transition">
                                <Linkedin className="sm:size-6 size-5" />
                            </a>
                            <a href={instagramUrl} target="_blank" className="p-2 rounded-full border text-black border-blue-600 hover:text-white hover:bg-blue-600 transition">
                                <Instagram className="sm:size-6 size-5" />
                            </a>
                        </div>
                    </div>

                    {/* Profile Edit Modal */}
                    <div className={`fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md transition-opacity duration-500 ${show ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                        <div className={`p-8 rounded-3xl shadow-2xl border bg-white text-center max-w-md w-full transition-transform duration-500 ${show ? "scale-100" : "scale-95"}`}>
                            <button className="absolute top-4 right-4 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition" onClick={() => setShow(false)}>
                                <X className="text-gray-700" />
                            </button>

                            {session.user.profilePick && (
                                <img
                                    src={session?.user?.profilePick}
                                    alt="Profile Picture"
                                    width={130}
                                    height={130}
                                    className="rounded-full border-4 border-blue-500 shadow-lg mx-auto"
                                />
                            )}

                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full border text-center text-2xl mt-5 text-gray-800 p-2 rounded-lg"
                                placeholder="Username"
                            />

                            <div className="mt-6 flex flex-col gap-3">
                                <input type="text" value={gitURL} onChange={(e) => setGitUrl(e.target.value)} className="w-full border p-2 rounded-lg" placeholder="GitHub URL" />
                                <input type="text" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} className="w-full border p-2 rounded-lg" placeholder="LinkedIn URL" />
                                <input type="text" value={instagramUrl} onChange={(e) => setInstagramUrl(e.target.value)} className="w-full border p-2 rounded-lg" placeholder="Instagram URL" />

                                <button className="w-full px-5 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition" onClick={() => { updateProfile(); setShow(false); }}>
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <h1 className="text-2xl cursor-pointer text-center border-2 border-black px-4 py-3 hover:bg-black hover:text-white transition" onClick={() => signIn("google", { redirect: "/profile" })}>
                    Log In First
                </h1>
            )}
        </motion.main>
    );
}
