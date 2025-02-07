"use client";
import Theme01 from "@/components/themes/Theme01";
import Theme02 from "@/components/themes/Theme02";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
    const { projectID } = useParams();
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [color, setColor] = useState("#000000"); // Border color
    const [textColor, setTextColor] = useState("#000000"); // Text color
    const [theme, setTheme] = useState(""); // Theme

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/fetch-project-details/${projectID}`);
                setResponse(response.data);
                setTheme(response.data.project.theme);
            } catch (error) {
                console.error("Error fetching project details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjectDetails();
    }, [projectID]);


    const makeTechArr = (data) => {
        const arr = data.split(",");
        return arr;
    }
    function convertDate(isoDateStr) {
        const date = new Date(isoDateStr);
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-GB', options);

        // Adding 'th' to the day part
        const [day, month, year] = formattedDate.split(' ');
        return `${day}th ${month} ${year}`;
    }

    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <Loader2 className="animate-spin size-16 text-gray-500" />
                </div>
            ) : theme === "Theme01" ? (
                <Theme01
                    id={response?.project?._id}
                    email={response?.userData?.email}
                    username={response?.userData?.username}
                    profilePick={response?.userData?.profilePick}
                    image={response?.project?.image}
                    img01={response?.project?.screenshots.img01}
                    img02={response?.project?.screenshots.img02}
                    img03={response?.project?.screenshots.img03}
                    title={response?.project?.title}
                    description={response?.project?.description}
                    date={convertDate(response?.project?.publishedAt)}
                    tech={makeTechArr(response?.project?.tech)}
                    source={response?.project?.SourceLink}
                    visit={response?.project?.LiveLink}
                />
            ) : theme === "Theme02" ? (
                <Theme02
                    id={response?.project?._id}
                    email={response?.userData?.email}
                    username={response?.userData?.username}
                    profilePick={response?.userData?.profilePick}
                    image={response?.project?.image}
                    img01={response?.project?.screenshots.img01}
                    img02={response?.project?.screenshots.img02}
                    img03={response?.project?.screenshots.img03}
                    title={response?.project?.title}
                    description={response?.project?.description}
                    date={convertDate(response?.project?.publishedAt)}
                    tech={makeTechArr(response?.project?.tech)}
                    source={response?.project?.SourceLink}
                    visit={response?.project?.LiveLink}
                />
            ) : (
                <div className="flex justify-center items-center h-screen">
                    <Loader2 className="animate-spin size-16 text-gray-500" />
                </div>
            )}
        </>
    );

};

export default Page;
