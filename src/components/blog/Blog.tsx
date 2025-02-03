'use client'
import React, {useEffect, useState} from "react";
import Image from "next/image";
import "./Blog.css"
import {IBlog} from "@/utils/interfaces";
import {Loader2} from "lucide-react";
import {blobUrl, cleanTitle} from "@/utils/utils";

interface BlogProps {
    title: string;
}

const Blog: React.FC<BlogProps> = ({title}) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const [blog, setBlog] = useState<IBlog>()
    const [contentBlog, setContentBlog] = useState<string>('')

    useEffect(() => {
        const cleanedTitle = cleanTitle(title)
        const localSchools = localStorage.getItem('blogs')
        let localblog = ''
        if (localSchools !== undefined && localSchools !== null) {
            const localArray: IBlog[] = JSON.parse(localSchools);
            for (const blogItem of localArray) {
                if (cleanedTitle === cleanTitle(blogItem.title)) {
                    localblog = JSON.stringify(blogItem);
                    setBlog(blogItem)
                    fetch(`${blobUrl}blogs/${cleanedTitle}.txt`, {
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
                    setLoading(false);
                    break;
                }
            }
        }
        fetch(`${blobUrl}jsons/blogs.json`, {
            cache: "no-store",
            next: {revalidate: 1},
        })
            .then((response) => response.json())
            .then((data: IBlog[]) => {
                localStorage.setItem('blogs', JSON.stringify(data))
                for (const blogItem of data) {
                    if (cleanTitle(blogItem.title) === cleanedTitle) {
                        if (localblog !== JSON.stringify(blogItem)) {
                            setBlog(blogItem)
                            fetch(`${blobUrl}blogs/${cleanedTitle}.txt`, {
                                cache: "no-store",
                                next: {revalidate: 1},
                            })
                                .then((response) => response.json())
                                .then((contentTXT: string) => {
                                    setContentBlog(contentTXT)
                                    setLoading(false);
                                })
                                .catch((err) => {
                                    setLoading(false);
                                    console.error(err);
                                });
                        }
                    }
                    break;
                }
            })
            .catch((err) => {
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
    console.log('title', blog?.title)

    if (error || blog?.title === undefined) {
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
                       layout="responsive" src={blobUrl + blog?.image} alt={blog?.title}/>
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
export default Blog