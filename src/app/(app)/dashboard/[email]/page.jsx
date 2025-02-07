"use client";
import Card from "@/components/ui/Card";
import axios from "axios";
import { motion } from "framer-motion"
import { CircleUserRound, CircleUserRoundIcon, Home, User2 } from "lucide-react";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";

// Skeleton Component
const Skeleton = () => (
    <div className="animate-pulse w-[90vw] flex justify-between items-center">
        <div className="flex">
            <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
            <div className="flex-1 space-y-3 py-1">
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
        </div>
        <ul className="flex items-center sm:gap-3 gap-2 sm:px-5 px-1">
            <li
                className="bg-blue-300 h-9 w-14 rounded-full animate-pulse">
            </li>
            <li
                className="bg-blue-300 h-9 w-14 rounded-full animate-pulse">
            </li>
        </ul>
    </div>
);

export default function DashboardPage() {
    const { email } = useParams();
    const Email = decodeURIComponent(email);

    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);

    function convertDate(isoDateStr) {
        const date = new Date(isoDateStr);
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-GB', options);

        // Adding 'th' to the day part
        const [day, month, year] = formattedDate.split(' ');
        return `${day}th ${month} ${year}`;
    }
    const fetchUserDashboard = async () => {
        try {
            const res = await axios.post(`/api/get-user-profile`, { email: Email });
            setResponse(res.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserDashboard();
    }, []);

    return (
        <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3 }}
            className="min-h-screen bg-[#fbfbfb] px-4 sm:px-6 lg:px-8 flex justify-center">
            <div className="container bg-red-00 sm:w-[95vw] pb-11">
                {/* Header */}
                <header className="sm:p-3 p-1 my-3 rounded-full flex items-center justify-between bg-gradient-to-tr from-[#eaf9ff] via-[#c4d9ff] to-[#c5baff] shadow-lg hover:shadow-xl hover:-translate-y-[2px] transition-all">
                    {loading ? (
                        <Skeleton />
                    ) : (
                        <>
                            <div className="flex items-center sm:gap-7 gap-3">
                                <img
                                    src={response?.profilePick}
                                    alt="profileImage"
                                    draggable={false}
                                    className="sm:size-[80px] size-[70px] rounded-full border-2 hover:-translate-y-1 transition-all"
                                />
                                <div className="userInfo text-black hover:-translate-y-1 transition-all">
                                    <p className="md:text-4xl text-xl flex items-center gap-2">
                                        <User2 />
                                        {response?.username}
                                    </p>
                                    <p className="sm:text-base text-sm">{response?.email}</p>
                                </div>
                            </div>
                            <ul className="flex items-center text-white sm:gap-3 gap-2 sm:px-5 px-1">
                                <li
                                    onClick={() => { redirect("/") }}
                                    className="bg-gradient-to-tr from-blue-400 to-blue-700 hover:-translate-y-1 transition-all p-2 rounded-full cursor-pointer">
                                    <Home />
                                </li>
                                <li
                                    onClick={() => { redirect("/profile/" + response?.email) }}
                                    className="bg-gradient-to-tr from-blue-400 to-blue-700 hover:-translate-y-1 transition-all p-2 rounded-full cursor-pointer">
                                    <CircleUserRoundIcon />
                                </li>
                            </ul>
                        </>
                    )}
                </header>
                <div className="w-fit m-auto flex flex-col gap-3 my-11">
                    <h2 className="text-2xl sm:text-4xl font-semibold text-center">Projects</h2>
                    <div className="bg-black h-[2px]"></div>
                </div>
                {/* Card Section */}
                <section className="CardSection flex flex-1 flex-wrap gap-10 items-center justify-center">
                    {
                        loading ? Array(6).fill(0).map((_, i) => (<div key={i} className="w-[300px] h-[400px] bg-gray-300 animate-pulse rounded-lg"></div>))
                            : response?.projects.length === 0 ? <p className="text-2xl text-center">No Projects Found</p> :
                                response.projects.map((e, index) => (
                                    <Card
                                        key={index}
                                        pID={e._id}
                                        image={e.image}
                                        date={convertDate(e.publishedAt)}
                                        title={e.title.length <= 20 ? e.title : e.title.slice(0, 20) + "..."}
                                        description={e.description.slice(0, 105) + "..."}
                                        githubUrl={e.SourceLink}
                                        visitUrl={e.LiveLink}
                                        fetchUserDashboard={fetchUserDashboard}
                                        likes={e.likes}
                                    />
                                ))
                    }
                </section>
            </div>
        </motion.main>
    );
}
