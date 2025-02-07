"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion"

const SearchResults = () => {
    const { username } = useParams();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`/api/search/${username}`);
                if (!res.ok) throw new Error("Failed to fetch users");
                const data = await res.json();
                setUsers(data.users);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching users:", error);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3 }}
            className="min-h-screen pt-20 flex justify-center">
            <div className=" sm:w-[80vw] w-[95vw]">
                <h1 className="text-2xl font-bold mb-4">Search Results for "{username || "lol"}"</h1>
                <div className="containerCard flex flex-wrap flex-1 justify-center gap-5 py-5">
                    {loading ? <Loader2 className="animate-spin size-14" /> :
                        users.length > 0 ?
                            (users.map((user) => {
                                return (
                                    <div key={user._id} className="card sm:w-[80%] md:w-fit w-[90%]  bg-white flex flex-col sm:gap-7 gap-2 border-2 p-3 min-w-4xl border-black  hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 ">
                                        <div className="flex items-center sm:gap-5 gap-2 font-semibold flex-1 flex-wrap">
                                            {users &&
                                                <img
                                                    draggable="false"
                                                    src={user?.profilePick} alt=""
                                                    className="rounded-full border-2 border-black"
                                                />
                                            }
                                            <div className="info flex flex-1 flex-col font-semibold w-full border-2 border-black py-1 px-3">
                                                <span className="text-lg">Name: {user.username}</span>
                                                <span className="text-sm font-normal" >Email: {user.email}</span>
                                                <span className="text-sm font-normal" >Total projects: {user.projects.length}</span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => router.push(`/dashboard/${user.email}`)}
                                            className="font-semibold border-2 hover:-translate-y-[2px] border-black px-5 py-2 hover:bg-black hover:text-white transition-all duration-300">Dashboard</button>
                                    </div>
                                )
                            })) : (<h1 className="text-2xl font-bold mb-4 text-black">No users found</h1>)
                    }
                </div>
            </div>
        </motion.div>
    );
};

export default SearchResults;
