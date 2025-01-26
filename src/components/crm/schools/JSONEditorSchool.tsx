"use client";

import React, {useState, useEffect, ChangeEvent} from "react";
import {Button} from "@/components/crm/ui/button";
import {Input} from "@/components/crm/ui/input";
import {Textarea} from "@/components/crm/ui/textarea";
import Image from "next/image";
import {uploadImage} from "@/app/crm/students/uploadImage";
import './JSONEditor.css'
import {successToasterStyles} from "@/utils/utils";
import toast from "react-hot-toast";
import {ISchool} from "@/utils/interfaces";
import Dropdown from "@/components/UI/Dropdown/Dropdown";
import {searchTypes} from "@/data/search";
import {XIcon} from "lucide-react";

interface IJsonEditor {
    name: string;
}

const JSONEditor: React.FC<IJsonEditor> = ({name}) => {
    const [schools, setSchools] = useState<ISchool[]>([]);
    const [schoolIndex, setSchoolIndex] = useState<null | number>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const blobUrl = "https://i9ozanmrsquybgxg.public.blob.vercel-storage.com/";

    useEffect(() => {
        fetch(`${blobUrl}jsons/schools.json`, {
            cache: "no-store",
            next: {revalidate: 1},
        })
            .then((response) => response.json())
            .then((data: ISchool[]) => {
                setSchools(data);
                data.forEach((school, index) => {
                    if (school.title.toLowerCase() === name.replace(/-/g, ' ').replace(/^\w/, (char) => char.toLowerCase())) {
                        setSchoolIndex(index);
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

    const handleInputChange = (index: number, field: keyof ISchool, value: string | string[]) => {
        const updatedSchools = [...schools];
        updatedSchools[index] = {...updatedSchools[index], [field]: value};
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
            if (result.success && result.url) {
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
                                        Meta Title
                                    </h6>
                                    <Input
                                        value={school.meta_title}
                                        onChange={(e) => handleInputChange(index, "meta_title", e.target.value)}
                                        placeholder="Meta Title"
                                    />
                                </div>
                                <div className="w-full">
                                    <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                                        Meta Description
                                    </h6>
                                    <Input
                                        value={school.meta_description}
                                        onChange={(e) => handleInputChange(index, "meta_description", e.target.value)}
                                        placeholder="Meta Description"
                                    />
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
                            <Textarea
                                value={school.detailed_information}
                                onChange={(e) => handleInputChange(index, "detailed_information", e.target.value)}
                                placeholder="Detailed Information"
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
                                        City
                                    </h6>
                                    <Dropdown label={'City'} selected={school.city}
                                              setSelected={(value) => handleInputChange(index, 'city', value)}
                                              variants={['Barcelona', 'Madrid', 'Oxford', 'London',]}/>
                                </div>
                                <div className="w-full">
                                    <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                                        Country
                                    </h6>
                                    <Dropdown label={'Country'} selected={school.country}
                                              setSelected={(value) => handleInputChange(index, 'country', value)}
                                              variants={['United Kingdom', 'Spain']}/>
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
                            </div>
                        </div>
                    )
            )}
            <div className="w-full flex justify-center">
                <Button onClick={handleSave} className="w-36 border-2 border-black">
                    Save Changes
                </Button>
            </div>
        </div>
    );
};

export default JSONEditor;
