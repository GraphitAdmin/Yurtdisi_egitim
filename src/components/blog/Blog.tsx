'use client'
import React, {useEffect, useState} from "react";
import Image from "next/image";
import "./Blog.css"
import {IBlog} from "@/utils/interfaces";
import {Loader2} from "lucide-react";

interface BlogProps {
    title: string;
}

const Blog: React.FC<BlogProps> = ({title}) => {
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(false)

    const [blog, setBlog] = useState<IBlog>()
    const blobUrl = "https://i9ozanmrsquybgxg.public.blob.vercel-storage.com/";

    useEffect(() => {
        fetch(`${blobUrl}jsons/blogs.json`, {
            cache: "no-store",
            next: {revalidate: 1},
        })
            .then((response) => response.json())
            .then((data: IBlog[]) => {
                data.forEach((blog) => {
                    if (blog.title.toLowerCase() === title.replace(/-/g, ' ').replace(/^\w/, (char) => char.toLowerCase())) {
                        setBlog(blog)
                    }
                });
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                setError(true)
                console.error(err);
            });
    }, []);
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (error) {
        return <p className="text-red-500 text-center">{error}</p>
    }

    return (
        <div>
            <div className="blog__header">
                <div>
                    <h1 style={{textAlign: 'left'}}>{blog?.title}</h1>
                    <p style={{color: 'var(--Courses-Gray-Gray-500)', textAlign: 'left'}}>
                        {blog?.description}
                    </p>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 8,
                        width: '100%',
                        marginTop: 12,
                        alignItems: "center"
                    }}>
                        <p style={{color: 'var(--courses-brand-blue-400-brand)'}}>13 January 2024</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4" fill="none">
                            <circle cx="2" cy="2" r="2" fill="#2E90FA"/>
                        </svg>
                        {blog?.minutes_to_read &&
                            <p style={{color: 'var(--courses-brand-blue-400-brand)'}}>{blog?.minutes_to_read} min
                                read</p>
                        }
                    </div>
                </div>
                <Image   width={720}
                         height={572}
                         layout="responsive" src={blobUrl+blog?.image} alt='Passport'/>
            </div>

            <div className="page__container">
                <div
                    className="test__markdown"
                    dangerouslySetInnerHTML={{__html: blog?.content?blog.content:''}}
                >
                </div>
            </div>
        </div>
    )
}
export default Blog