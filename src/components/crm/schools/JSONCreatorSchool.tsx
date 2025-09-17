"use client"

import React, {useState, useEffect, type ChangeEvent, useMemo} from "react"
import {Button} from "@/components/crm/ui/button"
import {Input} from "@/components/crm/ui/input"
import {Textarea} from "@/components/crm/ui/textarea"
import Image from "next/image"
import {uploadImage} from "@/app/crm/uploadImage"
import toast from "react-hot-toast"
import {blobUrl, checkLogged, cleanTitle, errorToasterStyles} from "@/utils/utils"
import {ICity, ISchool} from "@/utils/interfaces"
import Dropdown from "@/components/UI/Dropdown/Dropdown";
import {searchCountries, searchTypes} from "@/data/search";
import {Editor} from "@tinymce/tinymce-react";

const JSONCreator = () => {
    useEffect(() => {
        checkLogged();
    }, []);
    const [schools, setSchools] = useState<ISchool[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [cities, setCities] = useState<ICity[]>([]);

    useEffect(() => {
        fetch(blobUrl + "jsons/schools.json", {
            cache: "no-store",
            next: {revalidate: 1},
        })
            .then((response) => response.json())
            .then((data: ISchool[]) => {
                const newSchool: ISchool = {
                    education_type: "Language Schools",
                    title: "new",
                    images: [],
                    school_overview: "",
                    detailed_information: "",
                    why_block: "",
                    video_url: "",
                    coordinates_on_the_map: {
                        latitude: "",
                        longitude: "",
                    },
                    city: "",
                    country: "",
                    address: "",
                    website: "",
                    capacity: "",
                    age_group: "",
                    programs: [],
                    accommodation: "",
                    image_right: "",
                    website_active: "Active",
                    discount_pdf: '',
                    promotions_pdf: '',
                }
                setSchools([...data, newSchool])
                setLoading(false)
            })
            .catch((err) => {
                setError("Failed to load data")
                setLoading(false)
                console.error(err)
            })
        fetch(`${blobUrl}jsons/cities.json`, {
            cache: "no-store",
            next: {revalidate: 1},
        })
            .then((response) => response.json())
            .then((data: ICity[]) => {
                setCities(data)
            })
            .catch((err) => {
                setError("Failed to load data");
                setLoading(false);
                console.error(err);
            });
    }, [])

    async function handleSubmit(formData: FormData) {
        setIsUploading(true)
        setError(null)
        try {
            const result = await uploadImage(formData)
            if (result.success && result.url && result.filename) {
                handleInputChange(schools.length - 1, "images", [...schools[schools.length - 1].images, result.filename])
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

    const handleInputChange = (index: number, field: keyof ISchool, value: unknown) => {
        const updatedSchools = [...schools]
        updatedSchools[index] = {...updatedSchools[index], [field]: value}
        setSchools(updatedSchools)
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

    async function handleFileSubmit(formData: FormData) {
        setIsUploading(true)
        setError(null)
        try {
            const result = await uploadImage(formData)
            if (result.success && result.url && result.filename) {
                handleInputChange(schools.length - 1, "image_right", result.filename)
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

    const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) {
            return
        }
        const file = event.target.files[0]
        const formData = new FormData()
        formData.append("image", file)
        await handleFileSubmit(formData)
    }
    const handlePdfChange = async (event: ChangeEvent<HTMLInputElement>, field: "discount_pdf" | "promotions_pdf") => {
        if (!event.target.files || event.target.files.length === 0) {
            return
        }
        const file = event.target.files[0]
        if (file.type !== "application/pdf") {
            setError("Please upload a PDF file")
            return
        }
        const formData = new FormData()
        formData.append("file", file)
        setError(null)
        try {
            const response = await fetch("/api/uploadPDF", {
                method: "POST",
                body: formData,
            })
            const result = await response.json()
            if (result.success && result.url) {
                handleInputChange(schools.length - 1, field, result.url)
            } else {
                setError("Upload failed. Please try again.")
            }
        } catch (e) {
            setError("Something went wrong. Please try again.")
            console.error("error", e)
        }
    }

    const handleSave = async () => {
        const newSchool = schools[schools.length - 1]
        if (newSchool.title === "new" || newSchool.title === "") {
            toast.error("Change school title!", errorToasterStyles)
            return
        }

        const schoolsToCheck = schools.slice(0, schools.length - 1)
        const hasDuplicates = schoolsToCheck.some((school) => school.title === newSchool.title)
        if (hasDuplicates) {
            toast.error("School with this title already exists!", errorToasterStyles)
            return
        }

        setIsSaving(true)
        try {
            // Save the school data once
            const response = await fetch("/api/save-schools", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(schools),
            })

            if (!response.ok) throw new Error("Failed to save")
            
            // Poll schools.json every 1 second until the new school appears
            let attempts = 0
            const maxAttempts = 60 // Maximum 30 seconds of polling
            
            const pollForSchool = async (): Promise<boolean> => {
                attempts++
                
                try {
                    const verifyResponse = await fetch(blobUrl + "jsons/schools.json", {
                        cache: "no-store",
                        next: { revalidate: 1 },
                    })
                    
                    if (!verifyResponse.ok) {
                        throw new Error("Failed to fetch schools.json")
                    }
                    
                    const savedSchools = await verifyResponse.json()
                    const schoolExists = savedSchools.some((school: ISchool) => 
                        school.title === newSchool.title && school.title !== "new"
                    )
                    
                    if (schoolExists) {
                        return true
                    }
                    
                    if (attempts >= maxAttempts) {
                        throw new Error("Timeout: School not found after 30 seconds")
                    }
                    
                    // Wait 1 second before next attempt
                    await new Promise(resolve => setTimeout(resolve, 1000))
                    return pollForSchool()
                    
                } catch (error) {
                    if (attempts >= maxAttempts) {
                        throw error
                    }
                    // Wait 1 second before retry
                    await new Promise(resolve => setTimeout(resolve, 1000))
                    return pollForSchool()
                }
            }
            
            // Start polling
            const schoolFound = await pollForSchool()
            
            if (schoolFound) {
                window.location.href = "/crm/school/" + schools[schools.length - 1].title.replace(/ /g, '-')
            } else {
                throw new Error("School verification failed")
            }
            
        } catch (err) {
            setError("Failed to save or verify data. Please try again.")
            console.log(err)
        } finally {
            setIsSaving(false)
        }
    }
    const filteredCities = useMemo(() => {
        console.log(cities)
        console.log(schools)
        return cities.filter(city =>
            schools[schools.length - 1] && schools[schools.length - 1].country && cleanTitle(city.country) === cleanTitle(schools[schools.length - 1].country)
        )
    }, [schools, cities])
    const filteredCitiesName = useMemo(() => {
        return filteredCities.map(city => city.name)
    }, [filteredCities])
    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    return (
        <div className="space-y-4 relative">
            {/* Loading Overlay */}
            {isSaving && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                        <p className="text-lg font-semibold">Saving school and verifying data...</p>
                        <p className="text-sm text-gray-600">Please wait, this may take a few seconds</p>
                    </div>
                </div>
            )}
            
            {schools.map((school, index) => (
                index === schools.length - 1 &&
                <div key={index} className="border p-4 rounded-md space-y-2">
                    <div className="flex flex-row justify-between gap-2">

                        <div className="w-full">
                            <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                                School Title
                            </h6>
                            <Input
                                value={school.title}
                                onChange={(e) => handleInputChange(index, "title", e.target.value)}
                                placeholder="Title"
                                style={{height: 49}}
                                disabled={isSaving}
                            />
                        </div>
                        <div className="w-full">
                            <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                                Education Type
                            </h6>
                            <Dropdown label='Education Type' selected={school.education_type}
                                      variants={searchTypes}
                                      setSelected={(value) => {
                                          handleInputChange(index, "education_type", value)
                                      }}
                                      disabled={isSaving}/>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between gap-2">
                        <div className="w-full">
                            <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                                Website Active
                            </h6>
                            <Dropdown label='Website Active' selected={school.website_active}
                                      setSelected={(value) => handleInputChange(index, "website_active", value)}
                                      variants={['Active', 'Disabled']}
                                      disabled={isSaving}
                            />
                        </div>
                        <div className="w-full">
                        </div>
                    </div>
                    <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                        School Overview
                    </h6>
                    <Textarea
                        value={school.school_overview}
                        onChange={(e) => handleInputChange(index, 'school_overview', e.target.value)}
                        placeholder="School Overview"
                        disabled={isSaving}
                    />
                    <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                        Detailed Information
                    </h6>
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
                        initialValue={''}
                        onEditorChange={(content) => {
                            handleInputChange(index, 'detailed_information', content)
                        }}
                        disabled={isSaving}
                    />
                    <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                        Why Choose Us
                    </h6>
                    <Textarea
                        value={school.why_block}
                        onChange={(e) => handleInputChange(index, 'why_block', e.target.value)}
                        placeholder="Why Choose Us"
                        disabled={isSaving}
                    />
                    <div className="flex flex-row justify-between gap-2">
                        <div className="w-full">
                            <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                                Website URL
                            </h6>
                            <Input
                                value={school.website}
                                onChange={(e) => handleInputChange(index, "website", e.target.value)}
                                placeholder="Website"
                                disabled={isSaving}
                            />
                        </div>
                        <div className="w-full">
                            <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                                Video URL:
                            </h6>
                            <Input
                                value={school.video_url}
                                onChange={(e) => handleInputChange(index, "video_url", e.target.value)}
                                placeholder="Video URL"
                                disabled={isSaving}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row justify-between gap-2">
                        <div className="w-full">
                            <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                                Latitude:
                            </h6>
                            <Input
                                value={school.coordinates_on_the_map.latitude}
                                onChange={(e) => handleInputChange(index, "coordinates_on_the_map", {
                                    ...school.coordinates_on_the_map,
                                    latitude: e.target.value
                                })}
                                placeholder="Latitude"
                                disabled={isSaving}
                            />
                        </div>
                        <div className="w-full">
                            <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                                Longitude:
                            </h6>
                            <Input
                                value={school.coordinates_on_the_map.longitude}
                                onChange={(e) => handleInputChange(index, "coordinates_on_the_map", {
                                    ...school.coordinates_on_the_map,
                                    longitude: e.target.value
                                })}
                                placeholder="Longitude"
                                disabled={isSaving}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row justify-between gap-2">
                        <div className="w-full">
                            <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                                Country
                            </h6>
                            <Dropdown label={'Country'} selected={school.country}
                                      setSelected={(value) => handleInputChange(index, 'country', value)}
                                      variants={searchCountries}
                                      disabled={isSaving}/>
                        </div>
                        <div className="w-full">
                            <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                                City
                            </h6>
                            <Dropdown label={'City'} selected={school.city}
                                      setSelected={(value) => handleInputChange(index, 'city', value)}
                                      variants={filteredCitiesName}
                                      disabled={isSaving}/>
                        </div>
                    </div>
                    <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                        Address
                    </h6>
                    <Input
                        value={school.address}
                        onChange={(e) => handleInputChange(index, 'address', e.target.value)}
                        placeholder="Address"
                        disabled={isSaving}
                    />
                    <div className="flex flex-row justify-between gap-2">
                        <div className="w-full">
                            <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                                Capacity
                            </h6>
                            <Input
                                value={school.capacity}
                                onChange={(e) => handleInputChange(index, "capacity", e.target.value)}
                                placeholder="Capacity"
                                disabled={isSaving}
                            />
                        </div>
                        <div className="w-full">

                            <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                                Age Group
                            </h6>
                            <Input
                                value={school.age_group}
                                onChange={(e) => handleInputChange(index, "age_group", e.target.value)}
                                placeholder="Age Group"
                                disabled={isSaving}
                            />
                        </div>
                    </div>
                    <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                        Programs
                    </h6>
                    <Input
                        value={school.programs.join(', ')}
                        onChange={(e) => handleInputChange(index, 'programs', e.target.value.split(', '))}
                        placeholder="Programs (comma-separated)"
                        disabled={isSaving}
                    />
                    <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                        Accommodation
                    </h6>
                    <Input
                        value={school.accommodation}
                        onChange={(e) => handleInputChange(index, 'accommodation', e.target.value)}
                        placeholder="Accommodation"
                        disabled={isSaving}
                    />
                    <div>
                        <h6>Images</h6>
                        <div className="flex flex-wrap gap-2">
                            {school.images.map((image, imgIndex) => (
                                <Image
                                    key={imgIndex}
                                    src={blobUrl + image}
                                    alt={school.title}
                                    width={100}
                                    height={100}
                                    style={{maxHeight: '-webkit-fill-available'}}
                                    unoptimized={true}
                                />
                            ))}
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
                    <div>
                        <h6>Image Right</h6>
                        <div className="flex flex-wrap gap-2">
                            {school.image_right &&
                                <Image
                                    src={blobUrl + school.image_right}
                                    alt={school.title}
                                    width={100}
                                    height={100}
                                    unoptimized={true}
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
                            onChange={handleImageChange}
                        />
                    </div>
                    <div>
                        <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>Discount PDF</h6>
                        <div className="flex items-center gap-2">
                            {school?.discount_pdf && (
                                <a
                                    href={school.discount_pdf}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                >
                                    View current PDF
                                </a>
                            )}
                            <input
                                id="discount_pdf"
                                name="discount_pdf"
                                type="file"
                                accept="application/pdf"
                                disabled={isUploading || isSaving}
                                className="max-w-sm mt-2"
                                onChange={(e) => handlePdfChange(e, "discount_pdf")}
                            />
                        </div>
                    </div>
                    <div>
                        <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>Promotions PDF</h6>
                        <div className="flex items-center gap-2">
                            {school?.promotions_pdf && (
                                <a
                                    href={school.promotions_pdf}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                >
                                    View current PDF
                                </a>
                            )}
                            <input
                                id="promotions_pdf"
                                name="promotions_pdf"
                                type="file"
                                accept="application/pdf"
                                disabled={isUploading || isSaving}
                                className="max-w-sm mt-2"
                                onChange={(e) => handlePdfChange(e, "promotions_pdf")}
                            />
                        </div>
                    </div>
                </div>
            ))}
            <div className="w-full flex justify-center">
                <Button onClick={handleSave} className="w-36 border-2 border-black" disabled={isSaving}
                >{isSaving ? 'Saving...' : 'Save School'}</Button>
            </div>

        </div>
    )
}

export default JSONCreator

