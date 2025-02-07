"use client"
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import axios from 'axios';
import { Github, Link2, ArrowUpRight, X, Loader2, Heart } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Card = ({ image, date, title, description, githubUrl, visitUrl, pID, fetchUserDashboard, likes }) => {

    const { data: session } = useSession();
    const { email } = useParams();
    const Email = decodeURIComponent(email);

    const [show, setShow] = useState(false)
    const [isLoading, setisLoading] = useState(false)
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(likes);

    useEffect(() => {
        // Check if user has already liked the project
        if (session?.user?.likedProjects?.includes(pID)) {
            setLiked(true);
        }
    }, [session?.user?.likedProjects, pID]);

    const handleLike = async (ID, email) => {
        try {
            const response = await axios.post(`/api/like-projects`, { email, projectId: ID });
            if (response.status === 200) {
                setLiked(response.data.liked);
                setLikeCount(response.data.likes); // Update likes count in UI
                toast.success(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to like project");
        }
    };


    const handleDelete = async (ID) => {
        try {
            setisLoading(true)
            const response = await axios.delete(`/api/delete-project/${ID}`);
            toast.success('Project deleted successfully');
            fetchUserDashboard()
            setisLoading(false)
            setShow(false);
        } catch (error) {
            setisLoading(false)
            console.error(error)
            toast.error('Error deleting project')
        }
    }

    if (show) {
        return <div className='fixed top-0 left-0 w-screen h-screen backdrop-blur-md z-50 flex justify-center items-center'>
            <div className='bg-white p-5 border-2 border-black'>
                <h1 className='text-2xl font-bold mb-4'>Delete Project</h1>
                <p className='text-gray-600'>Are you sure you want to delete this project?</p>
                <div className='flex justify-end mt-4'>
                    <button className='border-2 border-black bg-red-500 text-white px-4 py-2 mr-2' onClick={() => handleDelete(pID)}>
                        {isLoading ? <Loader2 className='animate-spin' /> :
                            "Delete"
                        }
                    </button>
                    <button className='border-2 border-black bg-gray-500 text-white px-4 py-2' onClick={() => setShow(false)}>Cancel</button>
                </div>
            </div>
        </div>
    }

    return (
        <div className="max-w-xs rounded-lg shadow-lg border border-gray-200 overflow-hidden transform transition-transform duration-300 hover:scale-[1.01] hover:shadow-2xl relative">
            {session?.user?.email === Email &&
                <div
                    className="absolute z-10 hover:scale-110 transition-all top-2 right-2 p-1 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200"
                    onClick={() => setShow(true)}>
                    <X className='size-5' />
                </div>
            }
            <div className="relative w-full">
                <a href={`/project/${pID}`}>
                    <img src={image} alt={title} layout="fill" className='object-cover hover:scale-105 transition-transform duration-300' />
                </a>
                <div
                    className="absolute z-10 items-center text-red-600 flex gap-1 hover:scale-110 transition-all bottom-2 right-2 cursor-pointer"
                    onClick={() => handleLike(pID, session?.user?.email)}>

                    {liked ? (
                        <>
                            <IconHeartFilled className='size-5 text-red-600' />
                            {likeCount}
                        </>
                    ) : (
                        <>
                            <IconHeart className='size-5 text-red-600' />
                            {likeCount}
                        </>
                    )}
                </div>

            </div>
            <div className="p-4">
                <a href={`/project/${pID}`}>
                    <h3 className="  hover:-translate-y-1 transition-all text-xl font-semibold flex items-center gap-2">{title}<ArrowUpRight /></h3>
                </a>
                <p className="  hover:-translate-y-1 transition-all  text-sm text-gray-500 mt-1">{date}</p>
                <p className="  hover:-translate-y-1 transition-all mt-2 text-gray-700">{description}</p>
                <div className="flex justify-between items-center mt-4 space-x-4">
                    <Link href={githubUrl} passHref target='_blank'>
                        <Github className="w-6 h-6 transform transition-transform duration-300 hover:scale-110" />
                    </Link>
                    <Link href={visitUrl} passHref target='_blank'>
                        <Link2 className="w-6 h-6 transform transition-transform duration-300 hover:scale-110" />
                    </Link>
                </div>
            </div>
        </div >
    );
};

export default Card;
