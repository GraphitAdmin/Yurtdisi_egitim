"use client";

import React, {useState, useEffect, ChangeEvent} from "react";
import {Button} from "@/components/crm/ui/button";
import {Input} from "@/components/crm/ui/input";
import {Textarea} from "@/components/crm/ui/textarea";
import Image from "next/image";
import {uploadImage} from "@/app/crm/uploadImage";
import './JSONEditor.css'
import {successToasterStyles} from "@/utils/utils";
import toast from "react-hot-toast";
import {IBlog} from "@/utils/interfaces";
import { Editor } from '@tinymce/tinymce-react';
import Dropdown from "@/components/UI/Dropdown/Dropdown";

interface IJsonEditor {
    name: string;
}

const JSONEditor: React.FC<IJsonEditor> = ({name}) => {
    const [blogs, setBlogs] = useState<IBlog[]>([]);
    const [blogIndex, setBlogIndex] = useState<null | number>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [startValue,setStartValue] = useState<string>('');
    const [contentBlog, setContentBlog] = useState<string>('');
    const blobUrl = "https://i9ozanmrsquybgxg.public.blob.vercel-storage.com/";

    useEffect(() => {
        fetch(`${blobUrl}jsons/blogs.json`, {
            cache: "no-store",
            next: {revalidate: 1},
        })
            .then((response) => response.json())
            .then((data: IBlog[]) => {
                setBlogs(data);
                data.forEach((blog, index) => {
                    const cleanedName = name
                        .replace(/[^a-zA-Z0-9 ]/g, '')
                        .replace(/-/g, '')
                        .replace(/^\w/, (char) => char.toLowerCase());
                    const cleanedTitle = blog.title
                        .replace(/[^a-zA-Z0-9 ]/g, '')
                        .replace(/-/g, '')
                        .replace(/^\w/, (char) => char.toLowerCase()).replace(/ /g, '')
                    console.log('name',cleanedName)
                    console.log('title',cleanedTitle)
                    if (cleanedTitle.toLowerCase() === cleanedName.toLowerCase()) {
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
                const cleanedTitle = blogs[blogIndex].title
                    .replace(/[^a-zA-Z0-9 ]/g, '')
                    .replace(/-/g, '')
                    .replace(/^\w/, (char) => char.toLowerCase()).replace(/ /g, '')
                console.log(cleanedTitle)
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

        try {
            const updatedBlogs = blogs.filter((_, index) => index !== blogIndex)
            const response = await fetch("/api/save-blogs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedBlogs),
            })
            if (!response.ok) throw new Error("Failed to delete")
            toast.success("Blog deleted successfully!", successToasterStyles)
            window.location.href='/crm/blog'
        } catch (err) {
            setError("Failed to delete blog")
            console.error(err)
        }
    }

    async function handleSubmit(formData: FormData) {
        setIsUploading(true);
        setError(null);
        try {
            const result = await uploadImage(formData);
            if (result.success && result.url) {
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
        <div className="space-y-4">
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
                                            />
                                        </div>
                                        <div className="w-full">
                                            <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                                                Date
                                            </h6>
                                            <Input
                                                value={blog.date}
                                                onChange={(e) => handleInputChange(index, "date", e.target.value)}
                                                placeholder="Date(example: 13 january 2024)"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <h6 style={{color: "var(--Courses-Base-Black)"}}>Image</h6>
                                        <div className="flex flex-wrap gap-2">
                                            {blog.image &&
                                                <Image
                                                    src={`https://i9ozanmrsquybgxg.public.blob.vercel-storage.com/${blog.image}`}
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
                                            disabled={isUploading}
                                            className="max-w-sm mt-2"
                                            onChange={handleFileChange}
                                        />
                                    </div>

                                    <Editor
                                        key={index}
                                        apiKey='q662md15li9b5x4ik1he15mkqnu12n32bhitaaulz2efbig4'
                                        init={{
                                            plugins: [
                                                'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'table', 'wordcount',
                                                'checklist', 'mediaembed', 'casechange', 'export', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen',
                                                'powerpaste', 'advtable', 'advcode', 'editimage', 'tinycomments', 'tableofcontents',
                                                'footnotes', 'mergetags', 'autocorrect', 'typography', 'importword', 'exportword', 'exportpdf'
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
                                    />
                                    {/*<div*/}
                                    {/*    className="test__markdown"*/}
                                    {/*    dangerouslySetInnerHTML={{__html: blog.content}}*/}
                                    {/*>*/}
                                    {/*</div>*/}
                                </div>
                        ))}
            <div className="w-full flex justify-center gap-4">
                <Button onClick={handleSave} className="w-36 border-2 border-black">
                    Save Changes
                </Button>
                <Button
                    onClick={handleDelete}
                    className="w-36 border-2 border-red-400  hover:bg-red-500 hover:text-white"
                >
                    Delete Blog
                </Button>
            </div>
        </div>
    );
};

export default JSONEditor;
