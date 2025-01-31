'use client'
import React, {useEffect, useState} from "react";
import Image from "next/image";
import "./Blog.css"
import {IBlog} from "@/utils/interfaces";
import {Loader2} from "lucide-react";
import {blobUrl} from "@/utils/utils";

interface BlogProps {
    title: string;
}

const Reference: React.FC<BlogProps> = ({title}) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const [blog, setBlog] = useState<IBlog>()
    const [contentBlog, setContentBlog] = useState<string>('')

    useEffect(() => {
        fetch(`${blobUrl}jsons/references.json`, {
            cache: "no-store",
            next: {revalidate: 1},
        })
            .then((response) => response.json())
            .then((data: IBlog[]) => {
                data.forEach((blog) => {
                    const cleanedName = title
                        .replace(/[^a-zA-Z0-9 ]/g, '')
                        .replace(/-/g, '')
                        .replace(/^\w/, (char) => char.toLowerCase());
                    const cleanedTitle = blog.title
                        .replace(/[^a-zA-Z0-9 ]/g, '')
                        .replace(/-/g, '')
                        .replace(/^\w/, (char) => char.toLowerCase()).replace(/ /g, '')
                    console.log('name', cleanedName)
                    console.log('title', cleanedTitle)
                    if (cleanedTitle.toLowerCase() === cleanedName.toLowerCase()) {
                        setBlog(blog)
                        fetch(`${blobUrl}references/${cleanedTitle}.txt`, {
                            cache: "no-store",
                            next: {revalidate: 1},
                        })
                            .then((response) => response.json())
                            .then((contentTXT: string) => {
                                setContentBlog(contentTXT)
                            })
                            .catch((err) => {
                                setLoading(false);
                                console.error(err);
                            });
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
                <Loader2 className="h-8 w-8 animate-spin text-primary"/>
            </div>
        )
    }
    console.log('title',blog?.title)

    if (error||blog?.title===undefined) {
        return <h1>Error</h1>
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
                        <p style={{color: 'var(--courses-brand-blue-400-brand)'}}>13 January 2025</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4" fill="none">
                            <circle cx="2" cy="2" r="2" fill="#2E90FA"/>
                        </svg>
                        {blog?.minutes_to_read &&
                            <p style={{color: 'var(--courses-brand-blue-400-brand)'}}>{blog?.minutes_to_read} min
                                read</p>
                        }
                    </div>
                </div>
                <Image width={720}
                       height={572}
                       layout="responsive" src={blobUrl + blog?.image} alt='Passport'/>
            </div>

            <div className="page__container" style={{justifyContent: 'center'}}>
                <div
                    className="test__markdown"
                    dangerouslySetInnerHTML={{__html: contentBlog ? contentBlog : ''}}
                >
                </div>
            </div>
        </div>
    )
}
export default Reference