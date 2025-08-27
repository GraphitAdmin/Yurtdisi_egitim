"use client"
import React, {useState, useEffect, type ChangeEvent} from "react"
import {Button} from "@/components/crm/ui/button"
import {Input} from "@/components/crm/ui/input"
import {Textarea} from "@/components/crm/ui/textarea"
import Image from "next/image"
import {uploadImage} from "@/app/crm/uploadImage"
import toast from "react-hot-toast"
import {blobUrl, checkLogged, cleanTitle, errorToasterStyles} from "@/utils/utils"
import type {IBlog} from "@/utils/interfaces"
import '../JSONEditor.css'
import {Editor} from "@tinymce/tinymce-react";

const JSONCreator = () => {
     useEffect(() => {
        checkLogged();
    }, []);
    const [blogs, setBlogs] = useState<IBlog[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [startValue, setStartValue] = useState<string>('');
    const [contentBlog, setContentBlog] = useState<string>('')
    useEffect(() => {
        fetch(`${blobUrl}jsons/references.json`, {
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
                    type: ""
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
            if (result.success && result.url&&result.filename) {
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
            toast.error("Reference with this title already exists!", errorToasterStyles)
            return
        }

        setIsSaving(true);
        try {
            const cleanedTitle = cleanTitle(blogs[blogs.length-1].title)
            const responseTxt = await fetch("/api/save-references-content", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({content: contentBlog, title: cleanedTitle}),
            });
            if (!responseTxt.ok) throw new Error("Failed to save")

            // Save the reference data once
            const response = await fetch("/api/save-references", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(blogs),
            })

            if (!response.ok) throw new Error("Failed to save")
            
            // Poll references.json every 1 second until the new reference appears
            let attempts = 0;
            const maxAttempts = 60; // Maximum 30 seconds of polling
            
            const pollForReference = async (): Promise<boolean> => {
                attempts++;
                
                try {
                    const verifyResponse = await fetch(blobUrl + "jsons/references.json", {
                        cache: "no-store",
                        next: { revalidate: 1 },
                    });
                    
                    if (!verifyResponse.ok) {
                        throw new Error("Failed to fetch references.json");
                    }
                    
                    const savedReferences = await verifyResponse.json();
                    const referenceExists = savedReferences.some((reference: IBlog) => 
                        reference.title === newSchool.title && reference.title !== "new"
                    );
                    
                    if (referenceExists) {
                        return true;
                    }
                    
                    if (attempts >= maxAttempts) {
                        throw new Error("Timeout: Reference not found after 30 seconds");
                    }
                    
                    // Wait 1 second before next attempt
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    return pollForReference();
                    
                } catch (error) {
                    if (attempts >= maxAttempts) {
                        throw error;
                    }
                    // Wait 1 second before retry
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    return pollForReference();
                }
            };
            
            // Start polling
            const referenceFound = await pollForReference();
            
            if (referenceFound) {
                window.location.href = "/crm/reference/" + blogs[blogs.length - 1].title.replace(/ /g, '-').toLowerCase()
            } else {
                throw new Error("Reference verification failed");
            }
            
        } catch (err) {
            setError("Failed to save or verify data. Please try again.")
            console.log(err)
        } finally {
            setIsSaving(false)
        }
    }

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    return (
        <div className="space-y-4 relative">
            {/* Loading Overlay */}
            {isSaving && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                        <p className="text-lg font-semibold">Saving reference and verifying data...</p>
                        <p className="text-sm text-gray-600">Please wait, this may take a few seconds</p>
                    </div>
                </div>
            )}
            
            {blogs.map((blog, index) => (
                index === blogs.length - 1 &&
                <div key={index} className="border p-4 rounded-md space-y-2">
                    <div className="flex flex-row justify-between gap-2">
                        <div className="w-full">
                            <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                                Reference Title
                            </h6>
                            <Input
                                value={blog.title}
                                onChange={(e) => handleInputChange(index, "title", e.target.value)}
                                placeholder="Title"
                                style={{height: 49}}
                                disabled={isSaving}
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
                        disabled={isSaving}
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
                                disabled={isSaving}
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
                                disabled={isSaving}
                            />
                        </div>
                    </div>
                    <div>
                        <h6 style={{color: "var(--Courses-Base-Black)"}}>Image</h6>
                        <div className="flex flex-wrap gap-2">
                            {blog.image &&
                                <Image
                                    src={blobUrl+blog.image}
                                    alt={`References`}
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
                            disabled={isUploading || isSaving}
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
                        disabled={isSaving}
                    />
                </div>
            ))}
            <div className="w-full flex justify-center">
                <Button onClick={handleSave} className="w-36 border-2 border-black" disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Reference'}
                </Button>
            </div>

        </div>
    )
}

export default JSONCreator

