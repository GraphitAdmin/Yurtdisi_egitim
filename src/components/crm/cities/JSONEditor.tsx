"use client";

import React, {useState, useEffect, ChangeEvent} from "react";
import {Button} from "@/components/crm/ui/button";
import {Input} from "@/components/crm/ui/input";
import {Textarea} from "@/components/crm/ui/textarea";
import Image from "next/image";
import {uploadImage} from "@/app/crm/uploadImage";
import '../JSONEditor.css'
import {blobUrl, successToasterStyles} from "@/utils/utils";
import toast from "react-hot-toast";
import {ICity} from "@/utils/interfaces";
import Dropdown from "@/components/UI/Dropdown/Dropdown";

interface IJsonEditor {
    name: string;
}

const JSONEditor: React.FC<IJsonEditor> = ({name}) => {
    const [cities, setCities] = useState<ICity[]>([]);
    const [cityIndex, setCityIndex] = useState<null | number>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);


    useEffect(() => {
        fetch(`${blobUrl}jsons/cities.json`, {
            cache: "no-store",
            next: {revalidate: 1},
        })
            .then((response) => response.json())
            .then((data: ICity[]) => {
                setCities(data);
                data.forEach((city, index) => {
                    if (city.name === name) {
                        setCityIndex(index);
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

    const handleInputChange = (index: number, field: keyof ICity, value: string) => {
        const updatedCities = [...cities];
        updatedCities[index] = {...updatedCities[index], [field]: value};
        setCities(updatedCities);
    };

    const handleSave = async () => {
        try {
            const response = await fetch("/api/save-cities", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cities),
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
            console.log(result)
            if (result.success && result.url) {
                setPreview(result.url);
                if (cityIndex !== null) {
                    handleInputChange(cityIndex, "image", result.filename);
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

    const handleDelete = async () => {
        if (cityIndex === null) return

        const confirmDelete = window.confirm("Are you sure you want to delete this city?")
        if (!confirmDelete) return

        try {
            const updatedCities = cities.filter((_, index) => index !== cityIndex)
            const response = await fetch("/api/save-cities", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedCities),
            })
            if (!response.ok) throw new Error("Failed to delete")
            toast.success("City deleted successfully!", successToasterStyles)
            window.location.href='/crm/city'
        } catch (err) {
            setError("Failed to delete blog")
            console.error(err)
        }
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="space-y-4">
            {cities.map(
                (city, index) =>
                    index === cityIndex && (
                        <div key={index} className="border p-4 rounded-md space-y-2">
                            <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                                Name
                            </h6>
                            <Input
                                value={city.name}
                                onChange={(e) => handleInputChange(index, "name", e.target.value)}
                                placeholder="City name"
                            />
                            <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                                Description
                            </h6>
                            <Textarea
                                value={city.description}
                                onChange={(e) =>
                                    handleInputChange(index, "description", e.target.value)
                                }
                                placeholder="Description"
                            />
                            <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                                Country
                            </h6>
                            <Dropdown label={'Country'} selected={city.country} setSelected={(value)=>handleInputChange(index, 'country',value)} variants={['United Kingdom','Spain']}/>
                            <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                                Image
                            </h6>
                            <div className="relative rounded-lg image__input">
                                {preview ? (
                                        <Image
                                            src={preview}
                                            alt={city.name}
                                            width={400}
                                            height={400}
                                        />
                                    ) :
                                    <Image
                                        width={400}
                                        height={400}
                                        src={blobUrl + city.image}
                                        alt={city.name}/>
                                }
                            </div>
                            <input
                                id="image"
                                name="image"
                                type="file"
                                accept="image/*"
                                disabled={isUploading}
                                className="max-w-sm"
                                onChange={handleFileChange}
                            />
                        </div>
                    )
            )}
            <div className="w-full flex justify-center gap-4">
                <Button onClick={handleSave} className="w-36 border-2 border-black">
                    Save Changes
                </Button>
                <Button
                    onClick={handleDelete}
                    className="w-36 border-2 border-red-400  hover:bg-red-500 hover:text-white"
                >
                    Delete City
                </Button>
            </div>
        </div>
    );
};

export default JSONEditor;
