'use client'
import React, {useEffect, useState} from "react";
import {IBlog} from "@/utils/interfaces";
import '../eventsContent/eventsContent.css'
import Card from "@/components/UI/Card/Card";
import {Loader2} from "lucide-react";
import {blobUrl} from "@/utils/utils";

const BlogsContent = () => {
    const [blogs,setBlogs]=useState<IBlog[]>([]);
    const [loading,setLoading]=useState(true);
    const [showEvents, setShowEvents] = useState<IBlog[]>()

    useEffect(() => {
        const localBlogs = localStorage.getItem('blogs')
        if (localBlogs !== undefined && localBlogs !== null) {
            const localArray: IBlog[] = JSON.parse(localBlogs);
            setBlogs(localArray)
            setShowEvents(localArray.slice(0, 9))
            setLoading(false)
        }
        fetch(`${blobUrl}jsons/blogs.json`, {
            cache: "no-store",
            next: {revalidate: 1},
        })
            .then((response) => response.json())
            .then((data: IBlog[]) => {
                setBlogs(data);
                setShowEvents(data.slice(0, 9))
                localStorage.setItem('blogs', JSON.stringify(blogs));
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                console.error(err);
            });
        console.log(blogs)
    }, []);
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary"/>
            </div>
        )
    }
    return (
        <div className="page__container">
            <div style={{width: '100%'}}>
                <h1>Our blog posts</h1>
                <p>
                    All the topics you are curious about about education abroad are on this page.
                </p>
            </div>
            <div className="events__page">
                {
                    showEvents && showEvents.map((blog, index) =>
                        <Card key={index} {...blog} />
                    )
                }
            </div>
        </div>
    )
}
export default BlogsContent;