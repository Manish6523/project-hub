"use client";
import { IconHeartFilled } from "@tabler/icons-react";
import axios from "axios";
import { motion } from "framer-motion"
import { Share2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
    const params = useParams();
    const Email = decodeURIComponent(params.email);

    const router = useRouter();

    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);

    const copyProfileUrl = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success("profile url copied")
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("/api/get-user-profile", { email: Email });
                setResponse(response?.data.data);
                console.log(response?.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3 }}
            className="min-h-screen bg-gray-100 flex flex-col items-center py-14 px-3">
            {/* Profile Card */}
            <div className="relative bg-white rounded-2xl shadow-lg p-6 w-full max-w-md text-center ">
                <div onClick={() => copyProfileUrl()} className="cursor-pointer absolute top-4 right-4 rounded-full hover:bg-black/70 hover:text-white p-2 transition-colors duration-200">
                    <Share2 />
                </div>
                {loading ? (
                    <div className="animate-pulse">
                        <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto"></div>
                        <div className="w-32 h-5 bg-gray-300 mt-4 mx-auto rounded"></div>
                        <div className="w-48 h-4 bg-gray-300 mt-2 mx-auto rounded"></div>
                    </div>
                ) : (
                    <>
                        <img
                            src={response?.profilePick}
                            alt="Profile Picture"
                            width={120}
                            height={120}
                            className="rounded-full mx-auto"
                        />
                        <h2 className="text-xl font-semibold mt-3">{response?.username}</h2>
                        <p className="text-gray-600">{response?.email}</p>
                    </>
                )}

                {/* Social Media Links */}
                <div className="flex justify-center gap-4 mt-4">
                    {loading ? (
                        <div className="w-64 h-4 bg-gray-300 mx-auto rounded"></div>
                    ) : (
                        <>
                            <a href={response?.gitURL} target="_blank" className="text-gray-700 hover:text-black">
                                🐙 GitHub
                            </a>
                            <a href={response?.instaURL} target="_blank" className="text-gray-700 hover:text-pink-600">
                                📸 Instagram
                            </a>
                            <a href={response?.linkedInURL} target="_blank" className="text-gray-700 hover:text-blue-600">
                                🔗 LinkedIn
                            </a>
                        </>
                    )}
                </div>
            </div>

            {/* Projects Section */}
            <div className="mt-6 w-full max-w-4xl">
                <h3 className="text-lg font-semibold mb-4 text-center">Recent Projects</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {loading
                        ? [1, 2].map((_, index) => (
                            <div key={index} className="bg-white p-3 rounded-lg shadow-md animate-pulse">
                                <div className="w-full h-52 bg-gray-300 rounded-lg"></div>
                                <div className="w-32 h-5 bg-gray-300 mt-3 mx-auto rounded"></div>
                            </div>
                        ))
                        : response?.projects.slice(0, 2).map((project, index) => (
                            <div key={index} className="relative bg-white p-3 rounded-lg shadow-md">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    width={600}
                                    height={400}
                                    className="rounded-lg w-full h-auto"
                                />
                                <p className="text-center mt-3 font-medium">{project.title}</p>
                                <div className="absolute z-10 items-center font-bold text-red-600 flex gap-1 hover:scale-110 transition-all top-5 right-5 cursor-pointer">
                                    <IconHeartFilled /> {project.likes}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            {
                response && response.projects.length > 2 ?
                    <button onClick={() => router.push("/dashboard/" + response.email)} className="bg-white shadow-xl w-fit p-4 mx-auto my-7 rounded-lg text-black hover:bg-gray-200">view More</button>
                    : ""
            }
        </motion.main>
    );
};

export default ProfilePage;
