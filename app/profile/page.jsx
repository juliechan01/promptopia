'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

const MyProfile = () => {
    const { data: session } = useSession();
    const [ posts, setPosts ] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchPosts = async() => {
            const res = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await res.json();
            setPosts(data);
        };

        if(session?.user.id) fetchPosts();
    }, [session?.user.id]);

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=$(post_.id`);
    }
    
    const handleDelete = async(post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

        if(hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, { method: 'DELETE' });

                const filteredPosts = myPosts.filter((p) => p._id !== post._id);
                setPosts(filteredPosts);
            } catch(err) {
                console.log(err);
            }
        }
        router.push(``)
    }

    return (
        <Profile 
        name="My"
        desc="Welcome to your personalized profile page."
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        />
    )
}

export default MyProfile;