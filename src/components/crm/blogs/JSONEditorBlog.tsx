"use client";

import React, {useState, useEffect, ChangeEvent} from "react";
import {Button} from "@/components/crm/ui/button";
import {Input} from "@/components/crm/ui/input";
import {Textarea} from "@/components/crm/ui/textarea";
import Image from "next/image";
import {uploadImage} from "@/app/crm/uploadImage";
import '../JSONEditor.css'
import {blobUrl, checkLogged, cleanTitle, successToasterStyles} from "@/utils/utils";
import toast from "react-hot-toast";
import {IBlog} from "@/utils/interfaces";
import { Editor } from '@tinymce/tinymce-react';
import Dropdown from "@/components/UI/Dropdown/Dropdown";

interface IJsonEditor {
    name: string;
}

const JSONEditor: React.FC<IJsonEditor> = ({name}) => {
     useEffect(() => {
        checkLogged();
    }, []);
    const [blogs, setBlogs] = useState<IBlog[]>([]);
    const [blogIndex, setBlogIndex] = useState<null | number>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [startValue,setStartValue] = useState<string>('');
    const [contentBlog, setContentBlog] = useState<string>('');
    useEffect(() => {
        fetch(`${blobUrl}jsons/blogs.json`, {
            cache: "no-store",
            next: {revalidate: 1},
        })
            .then((response) => response.json())
            .then((data: IBlog[]) => {
                setBlogs(data);
                data.forEach((blog, index) => {
                    const cleanedName = cleanTitle(name)
                    const cleanedTitle = cleanTitle(blog.title)
                    console.log('name',cleanedName)
                    console.log('title',cleanedTitle)
                    if (cleanedTitle === cleanedName) {
                        setBlogIndex(index);
                        fetch(`${blobUrl}blogs/${cleanedTitle}.txt`, {
                            cache: "no-store",
                            next: {revalidate: 1},
                        })
                            .then((response) => response.json())
                            .then((contentTXT: string) => {
                                setStartValue(contentTXT)
                                setContentBlog(contentTXT)
                            })
                            .catch((err) => {
                                setError("Failed to load data");
                                setLoading(false);
                                console.error(err);
                            });
                    }
                });
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to load data");
                setLoading(false);
                console.error(err);
            });
    }, [name]);

    const handleInputChange = (index: number, field: keyof IBlog, value: string | string[]) => {
        const updatedSchools = [...blogs];
        updatedSchools[index] = {...updatedSchools[index], [field]: value};
        setBlogs(updatedSchools);
    };

    const handleSave = async () => {
        try {
            console.log(blogIndex)
            if(blogIndex||blogIndex===0){
                const cleanedTitle = cleanTitle(blogs[blogIndex].title)
                const responseTxt= await fetch("/api/save-blog-content", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({content:contentBlog,title:cleanedTitle}),
                });
                if (!responseTxt.ok) throw new Error("Failed to save");
                const response = await fetch("/api/save-blogs", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(blogs),
                });
                if (!response.ok) throw new Error("Failed to save");
                toast.success('Saved successfully!', successToasterStyles);
            }
            else {
                throw new Error("Failed to save");
            }

        } catch (err) {
            setError("Failed to save data");
            console.error(err);
        }
    };
    const handleDelete = async () => {
        if (blogIndex === null) return

        const confirmDelete = window.confirm("Are you sure you want to delete this blog post?")
        if (!confirmDelete) return

        setIsDeleting(true);
        try {
            const blogToDelete = blogs[blogIndex];
            const updatedBlogs = blogs.filter((_, index) => index !== blogIndex)
            
            // Delete the blog data once
            const response = await fetch("/api/save-blogs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedBlogs),
            })
            if (!response.ok) throw new Error("Failed to delete")
            
            // Poll blogs.json every 1 second until the blog is removed
            let attempts = 0;
            const maxAttempts = 30; // Maximum 30 seconds of polling
            
            const pollForBlogRemoval = async (): Promise<boolean> => {
                attempts++;
                
                try {
                    const verifyResponse = await fetch(blobUrl + "jsons/blogs.json", {
                        cache: "no-store",
                        next: { revalidate: 1 },
                    });
                    
                    if (!verifyResponse.ok) {
                        throw new Error("Failed to fetch blogs.json");
                    }
                    
                    const savedBlogs = await verifyResponse.json();
                    const blogStillExists = savedBlogs.some((blog: IBlog) => 
                        blog.title === blogToDelete.title
                    );
                    
                    if (!blogStillExists) {
                        return true; // Blog successfully removed
                    }
                    
                    if (attempts >= maxAttempts) {
                        throw new Error("Timeout: Blog still exists after 30 seconds");
                    }
                    
                    // Wait 1 second before next attempt
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    return pollForBlogRemoval();
                    
                } catch (error) {
                    if (attempts >= maxAttempts) {
                        throw error;
                    }
                    // Wait 1 second before retry
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    return pollForBlogRemoval();
                }
            };
            
            // Start polling
            const blogRemoved = await pollForBlogRemoval();
            
            if (blogRemoved) {
                toast.success("Blog deleted successfully!", successToasterStyles)
                window.location.href='/crm/blog'
            } else {
                throw new Error("Blog deletion verification failed");
            }
            
        } catch (err) {
            setError("Failed to delete or verify deletion. Please try again.")
            console.error(err)
        } finally {
            setIsDeleting(false)
        }
    }

    async function handleSubmit(formData: FormData) {
        setIsUploading(true);
        setError(null);
        try {
            const result = await uploadImage(formData);
            if (result.success && result.url&&result.filename) {
                if (blogIndex !== null) {
                    handleInputChange(blogIndex, "image", result.filename);
                }
            } else {
                setError("Upload failed. Please try again.");
            }
        } catch (e) {
            setError("Something went wrong. Please try again.");
            console.error("error", e);
        } finally {
            setIsUploading(false);
        }
    }
    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) {
            return;
        }
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
        await handleSubmit(formData);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="space-y-4 relative">
            {/* Loading Overlay */}
            {isDeleting && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                        <p className="text-lg font-semibold">Deleting blog and verifying removal...</p>
                        <p className="text-sm text-gray-600">Please wait, this may take a few seconds</p>
                    </div>
                </div>
            )}
            
            {blogs.map((blog, index) => (
                index === blogIndex &&
                <div key={index} className="border p-4 rounded-md space-y-2">
                    <div className="flex flex-row justify-between gap-2">
                        <div className="w-full">
                            <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                                Blog Title
                            </h6>
                            <Input
                                value={blog.title}
                                onChange={(e) => handleInputChange(index, "title", e.target.value)}
                                placeholder="Title"
                                style={{height: 49}}
                                disabled={isDeleting}
                            />
                        </div>
                        <div className="w-full">
                            <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                                Type
                            </h6>
                            <Dropdown
                                selected={blog.type}
                                label="Type"
                                setSelected={(value) => handleInputChange(index, "type", value)}
                                variants={["Blog", "Useful Information"]}
                                disabled={isDeleting}
                            />
                        </div>
                    </div>
                    <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                        Description
                    </h6>
                    <Textarea
                        value={blog.description}
                        onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                        placeholder="Blog Description"
                        disabled={isDeleting}
                    />
                    <div className="flex flex-row justify-between gap-2">
                        <div className="w-full">
                            <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                                Minutes to read
                            </h6>
                            <Input
                                value={blog.minutes_to_read}
                                onChange={(e) => handleInputChange(index, "minutes_to_read", e.target.value)}
                                placeholder="Number(example: 8)"
                                disabled={isDeleting}
                            />
                        </div>
                        <div className="w-full">
                            <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                                Date
                            </h6>
                            <Input
                                value={blog.date}
                                onChange={(e) => handleInputChange(index, "date", e.target.value)}
                                placeholder="Date(example: 13 january 2025)"
                                disabled={isDeleting}
                            />
                        </div>
                    </div>

                    <div>
                        <h6 style={{color: "var(--Courses-Base-Black)"}}>Image</h6>
                        <div className="flex flex-wrap gap-2">
                            {blog.image &&
                                <Image
                                    src={blobUrl+blog.image}
                                    alt={`Blog`}
                                    width={100}
                                    height={100}
                                />
                            }
                        </div>
                        <input
                            id="image"
                            name="image"
                            type="file"
                            accept="image/*"
                            disabled={isUploading || isDeleting}
                            className="max-w-sm mt-2"
                            onChange={handleFileChange}
                        />
                    </div>

                    <Editor
                        key={index}
                        apiKey='difgncbkx5a7mg2y90vo8lfzwsxo4pjfwpt9dlrspcwx98zu'
                        init={{
                            plugins: [
                                'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'table', 'wordcount',
                                     
                                    
                                 
                            ],
                            toolbar: 'undo redo | blocks | underline strikethrough | link media table | bullist',
                            tinycomments_mode: 'embedded',
                            tinycomments_author: 'Author name',
                            mergetags_list: [
                                {value: 'First.Name', title: 'First Name'},
                                {value: 'Email', title: 'Email'},
                            ],
                            ai_request: () => {
                            },
                        }}

                        initialValue={startValue}
                        onEditorChange={(content) => {
                            setContentBlog(content)
                        }}
                        disabled={isDeleting}
                    />
                    {/*<div*/}
                    {/*    className="test__markdown"*/}
                    {/*    dangerouslySetInnerHTML={{__html: blog.content}}*/}
                    {/*>*/}
                    {/*</div>*/}
                </div>
            ))}
            <div className="w-full flex justify-center gap-4">
                <Button onClick={handleSave} className="w-36 border-2 border-black" disabled={isDeleting}>
                    Save Changes
                </Button>
                <Button
                    onClick={handleDelete}
                    className="w-36 border-2 border-red-400  hover:bg-red-500 hover:text-white"
                    disabled={isDeleting}
                >
                    {isDeleting ? 'Deleting...' : 'Delete Blog'}
                </Button>
            </div>
        </div>
    );
};

export default JSONEditor;
