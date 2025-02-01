"use client"
import React, {useState, useEffect, type ChangeEvent} from "react"
import {Button} from "@/components/crm/ui/button"
import {Input} from "@/components/crm/ui/input"
import {Textarea} from "@/components/crm/ui/textarea"
import Image from "next/image"
import {uploadImage} from "@/app/crm/uploadImage"
import toast from "react-hot-toast"
import {blobUrl, cleanTitle, errorToasterStyles, successToasterStyles} from "@/utils/utils"
import type {IBlog} from "@/utils/interfaces"
import '../JSONEditor.css'
import {Editor} from "@tinymce/tinymce-react";
import Dropdown from "@/components/UI/Dropdown/Dropdown";

const JSONCreator = () => {
    const [blogs, setBlogs] = useState<IBlog[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [startValue, setStartValue] = useState<string>('');
    const [contentBlog, setContentBlog] = useState<string>('')
    useEffect(() => {
        fetch(`${blobUrl}jsons/blogs.json`, {
            cache: "no-store",
            next: {revalidate: 1},
        })
            .then((response) => response.json())
            .then((data: IBlog[]) => {
                const newBlog: IBlog = {
                    title: "new",
                    image: "",
                    description: "",
                    minutes_to_read: "",
                    date: "",
                    type: "Blog"
                }
                setStartValue("")
                setBlogs([...data, newBlog])
                setLoading(false)
            })
            .catch((err) => {
                setError("Failed to load data")
                setLoading(false)
                console.error(err)
            })
    }, [])

    async function handleSubmit(formData: FormData) {
        setIsUploading(true)
        setError(null)
        try {
            const result = await uploadImage(formData)
            if (result.success && result.url) {
                handleInputChange(blogs.length - 1, "image", result.filename)
            } else {
                setError("Upload failed. Please try again.")
            }
        } catch (e) {
            setError("Something went wrong. Please try again.")
            console.error("error", e)
        } finally {
            setIsUploading(false)
        }
    }

    const handleInputChange = (index: number, field: keyof IBlog, value: unknown) => {
        const updatedSchools = [...blogs]
        updatedSchools[index] = {...updatedSchools[index], [field]: value}
        setBlogs(updatedSchools)
    }

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) {
            return
        }
        const file = event.target.files[0]
        const formData = new FormData()
        formData.append("image", file)
        await handleSubmit(formData)
    }

    const handleSave = async () => {
        const newSchool = blogs[blogs.length - 1]
        if (newSchool.title === "new" || newSchool.title === "") {
            toast.error("Change school title!", errorToasterStyles)
            return
        }

        const schoolsToCheck = blogs.slice(0, blogs.length - 1)
        const hasDuplicates = schoolsToCheck.some((school) => school.title === newSchool.title)
        if (hasDuplicates) {
            toast.error("Blog with this title already exists!", errorToasterStyles)
            return
        }

        try {
            const cleanedTitle = cleanTitle(blogs[blogs.length-1].title)
            const responseTxt = await fetch("/api/save-blog-content", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({content: contentBlog, title: cleanedTitle}),
            });
            if (!responseTxt.ok) throw new Error("Failed to save")

            const response = await fetch("/api/save-blogs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(blogs),
            })

            if (!response.ok) throw new Error("Failed to save")
            toast.success("Saved successfully!", successToasterStyles)
            window.location.href = "/crm/blog/" + blogs[blogs.length - 1].title.replace(/ /g, '-').toLowerCase()
        } catch (err) {
            setError("Failed to save data")
            console.log(err)
        }
    }

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    return (
        <div className="space-y-4">
            {blogs.map((blog, index) => (
                index === blogs.length - 1 &&
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
                                placeholder="Date(example: 13 january 2025)"
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
                            toolbar: 'undo redo | blocks | underline strikethrough | link image media table | spellcheckdialog | bullist',
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
            <div className="w-full flex justify-center">
                <Button onClick={handleSave} className="w-36 border-2 border-black">Save Blog</Button>
            </div>

        </div>
    )
}

export default JSONCreator

