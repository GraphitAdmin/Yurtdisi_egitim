"use client";

import React, {useState, useEffect, ChangeEvent, useMemo} from "react";
import {Button} from "@/components/crm/ui/button";
import {Input} from "@/components/crm/ui/input";
import {Textarea} from "@/components/crm/ui/textarea";
import Image from "next/image";
import {uploadImage} from "@/app/crm/uploadImage";
import './JSONEditor.css'
import {blobUrl, cleanTitle, successToasterStyles} from "@/utils/utils";
import toast from "react-hot-toast";
import {ICity, ISchool} from "@/utils/interfaces";
import Dropdown from "@/components/UI/Dropdown/Dropdown";
import {searchCountries, searchTypes} from "@/data/search";
import {XIcon} from "lucide-react";
import {Editor} from "@tinymce/tinymce-react";

interface IJsonEditor {
    name: string;
}

const JSONEditor: React.FC<IJsonEditor> = ({name}) => {
    const [schools, setSchools] = useState<ISchool[]>([]);
    const [schoolIndex, setSchoolIndex] = useState<null | number>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [startValue, setStartValue] = useState<string>('');
    const [cities, setCities] = useState<ICity[]>([]);
    useEffect(() => {
        fetch(`${blobUrl}jsons/schools.json`, {
            cache: "no-store",
            next: {revalidate: 1},
        })
            .then((response) => response.json())
            .then((data: ISchool[]) => {
                setSchools(data);
                data.forEach((school, index) => {
                    if (school.title.toLowerCase() === name.replace(/-/g, ' ').toLowerCase()) {
                        setSchoolIndex(index);
                        setStartValue(school.detailed_information)
                    }
                });
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to load data");
                setLoading(false);
                console.error(err);
            });
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
    }, [name]);

    const handleInputChange = (index: number, field: keyof ISchool, value: string | string[]) => {
        const updatedSchools = [...schools];
        updatedSchools[index] = {...updatedSchools[index], [field]: value};
        console.log(updatedSchools[index]);
        setSchools(updatedSchools);
    };

    const handleSave = async () => {
        try {
            const response = await fetch("/api/save-schools", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(schools),
            });
            if (!response.ok) throw new Error("Failed to save");
            toast.success('Saved successfully!', successToasterStyles);
        } catch (err) {
            setError("Failed to save data");
            console.error(err);
        }
    };

    async function handleSubmit(formData: FormData) {
        setIsUploading(true);
        setError(null);
        try {
            const result = await uploadImage(formData);
            if (result.success && result.url && result.filename) {
                if (schoolIndex !== null) {
                    const updatedImages = [...schools[schoolIndex].images, result.filename];
                    handleInputChange(schoolIndex, "images", updatedImages);
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

    const handleRemoveImage = async (schoolId: number, imageID: string) => {
        const updatedSchools = schools.map((school, id) => {
            if (id === schoolId) {
                return {
                    ...school,
                    images: school.images.filter((img) => img !== imageID),
                }
            }
            return school
        })

        setSchools(updatedSchools)
    }
    const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) {
            return
        }
        const file = event.target.files[0]
        console.log(file)
        const formData = new FormData()
        formData.append("image", file)
        await handleFileSubmit(formData)
    }

    async function handleFileSubmit(formData: FormData) {
        setIsUploading(true)
        setError(null)
        try {
            const result = await uploadImage(formData)
            console.log(result)
            console.log(schoolIndex)
            if (result.success && result.url && schoolIndex !== null && result.filename) {
                handleInputChange(schoolIndex, "image_right", result.filename)
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


    const handleDelete = async () => {
        if (schoolIndex === null) return

        const confirmDelete = window.confirm("Are you sure you want to delete this school?")
        if (!confirmDelete) return

        try {
            const updatedCities = schools.filter((_, index) => index !== schoolIndex)
            const response = await fetch("/api/save-schools", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedCities),
            })
            if (!response.ok) throw new Error("Failed to delete")
            toast.success("School deleted successfully!", successToasterStyles)
            window.location.href = '/crm/school'
        } catch (err) {
            setError("Failed to delete blog")
            console.error(err)
        }
    }
    const filteredCities = useMemo(() => {
        console.log(cities)
        console.log(schools)
        return cities.filter(city =>
            (schoolIndex||schoolIndex===0)&&schools[schoolIndex].country&& cleanTitle(city.country) === cleanTitle(schools[schoolIndex].country)
        )
    }, [schools,cities,schoolIndex])
    console.log(schoolIndex)
    console.log(filteredCities)
    const filteredCitiesName = useMemo(() => {
        return filteredCities.map(city => city.name)
    }, [filteredCities])
    console.log(filteredCitiesName)

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="space-y-4">
            {schools.map(
                (school, index) =>
                    index === schoolIndex && (
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
                                onChange={(e) => handleInputChange(index, "school_overview", e.target.value)}
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

                                initialValue={startValue}
                                onEditorChange={(content) => {
                                    handleInputChange(index, 'detailed_information', content)
                                }}
                            />
                            <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                                Why choose us:
                            </h6>
                            <Textarea
                                value={school.why_block}
                                onChange={(e) => handleInputChange(index, "why_block", e.target.value)}
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
                                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                            // @ts-expect-error
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
                                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                            // @ts-expect-error
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
                                onChange={(e) => handleInputChange(index, "address", e.target.value)}
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
                                onChange={(e) => handleInputChange(index, "programs", e.target.value.split(', '))}
                                placeholder="Programs (comma-separated)"
                            />
                            <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                                Accommodation
                            </h6>
                            <Input
                                value={school.accommodation}
                                onChange={(e) => handleInputChange(index, "accommodation", e.target.value)}
                                placeholder="Accommodation"
                            />
                            <div>
                                <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                                    Images
                                </h6>
                                <div className="flex flex-wrap gap-2">
                                    {school.images.map((image, imgIndex) => (
                                        <div key={imgIndex} className="image__crm">
                                            <Image
                                                src={blobUrl + image}
                                                width={250}
                                                height={250}
                                                alt={school.title}
                                                style={{maxHeight: '-webkit-fill-available'}}
                                            />
                                            <XIcon onClick={() => handleRemoveImage(index, image)}
                                                   className="image__crm__x" style={{width: 125, height: 125}}/>
                                        </div>
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
                                <div>
                                    <h6>Image Right</h6>
                                    <div className="flex flex-wrap gap-2">
                                        <Image
                                            src={blobUrl + school.image_right}
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
                        </div>
                    )
            )}
            <div className="w-full flex justify-center  gap-4">
                <Button onClick={handleSave} className="w-36 border-2 border-black">
                    Save Changes
                </Button>
                <Button
                    onClick={handleDelete}
                    className="w-36 border-2 border-red-400  hover:bg-red-500 hover:text-white"
                >
                    Delete School
                </Button>
            </div>
        </div>
    );
};

export default JSONEditor;
