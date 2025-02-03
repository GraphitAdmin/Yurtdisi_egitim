"use client"

import React, {useState, useEffect, type ChangeEvent, useMemo} from "react"
import {Button} from "@/components/crm/ui/button"
import {Input} from "@/components/crm/ui/input"
import {Textarea} from "@/components/crm/ui/textarea"
import Image from "next/image"
import {uploadImage} from "@/app/crm/uploadImage"
import toast from "react-hot-toast"
import {blobUrl, checkLogged, cleanTitle, errorToasterStyles, successToasterStyles} from "@/utils/utils"
import {ICity, ISchool} from "@/utils/interfaces"
import Dropdown from "@/components/UI/Dropdown/Dropdown";
import {searchCountries, searchTypes} from "@/data/search";
import {Editor} from "@tinymce/tinymce-react";

const JSONCreator = () => {
    checkLogged();
    const [schools, setSchools] = useState<ISchool[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [cities, setCities] = useState<ICity[]>([]);

    useEffect(() => {
        fetch(blobUrl+"jsons/schools.json", {
            cache: "no-store",
            next: {revalidate: 1},
        })
            .then((response) => response.json())
            .then((data: ISchool[]) => {
                const newSchool: ISchool = {
                    education_type: "",
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
                    image_right:"",
                    website_active:"Active"
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
            if (result.success && result.url&&result.filename) {
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
            if (result.success && result.url&&result.filename) {
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

        try {
            const response = await fetch("/api/save-schools", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(schools),
            })

            if (!response.ok) throw new Error("Failed to save")
            toast.success("Saved successfully!", successToasterStyles)
            window.location.href = "/crm/school/" + schools[schools.length - 1].title.replace(/-/g, ' ')
        } catch (err) {
            setError("Failed to save data")
            console.log(err)
        }
    }
    const filteredCities = useMemo(() => {
        console.log(cities)
        console.log(schools)
        return cities.filter(city =>
            schools[schools.length-1]&&schools[schools.length-1].country&&cleanTitle(city.country) === cleanTitle(schools[schools.length-1].country)
        )
    }, [schools,cities])
    const filteredCitiesName = useMemo(() => {
        return filteredCities.map(city => city.name)
    }, [filteredCities])
    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    return (
        <div className="space-y-4">
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
                                      }}/>
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

                        initialValue={''}
                        onEditorChange={(content) => {
                            handleInputChange(index, 'detailed_information', content)
                        }}
                    />
                    <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                        Why Choose Us
                    </h6>
                    <Textarea
                        value={school.why_block}
                        onChange={(e) => handleInputChange(index, 'why_block', e.target.value)}
                        placeholder="Why Choose Us"
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
                                      variants={searchCountries}/>
                        </div>
                        <div className="w-full">
                            <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                                City
                            </h6>
                            <Dropdown label={'City'} selected={school.city}
                                      setSelected={(value) => handleInputChange(index, 'city', value)}
                                      variants={filteredCitiesName}/>
                        </div>
                    </div>
                    <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                        Address
                    </h6>
                    <Input
                        value={school.address}
                        onChange={(e) => handleInputChange(index, 'address', e.target.value)}
                        placeholder="Address"
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
                    />
                    <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                        Accommodation
                    </h6>
                    <Input
                        value={school.accommodation}
                        onChange={(e) => handleInputChange(index, 'accommodation', e.target.value)}
                        placeholder="Accommodation"
                    />
                    <div>
                        <h6>Images</h6>
                        <div className="flex flex-wrap gap-2">
                            {school.images.map((image, imgIndex) => (
                                <Image
                                    key={imgIndex}
                                    src={blobUrl+image}
                                    alt={`School image ${imgIndex + 1}`}
                                    width={100}
                                    height={100}
                                    style={{maxHeight:'-webkit-fill-available'}}
                                />
                            ))}
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
                    <div>
                        <h6>Image Right</h6>
                        <div className="flex flex-wrap gap-2">
                            <Image
                                src={blobUrl+school.image_right}
                                alt={`School image`}
                                width={100}
                                height={100}
                            />
                        </div>
                        <input
                            id="image"
                            name="image"
                            type="file"
                            accept="image/*"
                            disabled={isUploading}
                            className="max-w-sm mt-2"
                            onChange={handleImageChange}
                        />
                    </div>
                </div>
            ))}
            <div className="w-full flex justify-center">
                <Button onClick={handleSave} className="w-36 border-2 border-black"
                >Save School</Button>
            </div>

        </div>
    )
}

export default JSONCreator

