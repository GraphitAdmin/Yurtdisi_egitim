"use client";

import React, {useState, useEffect, ChangeEvent} from "react";
import {Button} from "@/components/crm/ui/button";
import {Input} from "@/components/crm/ui/input";
import {Textarea} from "@/components/crm/ui/textarea";
import Image from "next/image";
import {uploadImage} from "@/app/crm/uploadImage";
import '../JSONEditor.css'
import {blobUrl, checkLogged, successToasterStyles} from "@/utils/utils";
import toast from "react-hot-toast";
import {ICity} from "@/utils/interfaces";
import Dropdown from "@/components/UI/Dropdown/Dropdown";
import {searchCountries} from "@/data/search";

interface IJsonEditor {
    name: string;
}

const JSONEditor: React.FC<IJsonEditor> = ({name}) => {
     useEffect(() => {
        checkLogged();
    }, []);
    const [cities, setCities] = useState<ICity[]>([]);
    const [cityIndex, setCityIndex] = useState<null | number>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
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
                    if (city.name.includes(name)) {
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
            if (result.success && result.url && result.filename) {
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

        setIsDeleting(true);
        try {
            const cityToDelete = cities[cityIndex];
            const updatedCities = cities.filter((_, index) => index !== cityIndex)
            
            // Delete the city data once
            const response = await fetch("/api/save-cities", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedCities),
            })
            if (!response.ok) throw new Error("Failed to delete")
            
            // Poll cities.json every 1 second until the city is removed
            let attempts = 0;
            const maxAttempts = 30; // Maximum 30 seconds of polling
            
            const pollForCityRemoval = async (): Promise<boolean> => {
                attempts++;
                
                try {
                    const verifyResponse = await fetch(blobUrl + "jsons/cities.json", {
                        cache: "no-store",
                        next: { revalidate: 1 },
                    });
                    
                    if (!verifyResponse.ok) {
                        throw new Error("Failed to fetch cities.json");
                    }
                    
                    const savedCities = await verifyResponse.json();
                    const cityStillExists = savedCities.some((city: ICity) => 
                        city.name === cityToDelete.name
                    );
                    
                    if (!cityStillExists) {
                        return true; // City successfully removed
                    }
                    
                    if (attempts >= maxAttempts) {
                        throw new Error("Timeout: City still exists after 30 seconds");
                    }
                    
                    // Wait 1 second before next attempt
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    return pollForCityRemoval();
                    
                } catch (error) {
                    if (attempts >= maxAttempts) {
                        throw error;
                    }
                    // Wait 1 second before retry
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    return pollForCityRemoval();
                }
            };
            
            // Start polling
            const cityRemoved = await pollForCityRemoval();
            
            if (cityRemoved) {
                toast.success("City deleted successfully!", successToasterStyles)
                window.location.href='/crm/city'
            } else {
                throw new Error("City deletion verification failed");
            }
            
        } catch (err) {
            setError("Failed to delete or verify deletion. Please try again.")
            console.error(err)
        } finally {
            setIsDeleting(false)
        }
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="space-y-4 relative">
            {/* Loading Overlay */}
            {isDeleting && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                        <p className="text-lg font-semibold">Deleting city and verifying removal...</p>
                        <p className="text-sm text-gray-600">Please wait, this may take a few seconds</p>
                    </div>
                </div>
            )}
            
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
                                disabled={isDeleting}
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
                                disabled={isDeleting}
                            />
                            <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                                Country
                            </h6>
                            <Dropdown label={'Country'} selected={city.country} setSelected={(value)=>handleInputChange(index, 'country',value)} variants={searchCountries} disabled={isDeleting}/>
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
                                            unoptimized={true}
                                        />
                                    ) :
                                    <Image
                                        width={400}
                                        height={400}
                                        src={blobUrl + city.image}
                                        alt={city.name}
                                        unoptimized={true}/>
                                }
                            </div>
                            <input
                                id="image"
                                name="image"
                                type="file"
                                accept="image/*"
                                disabled={isUploading || isDeleting}
                                className="max-w-sm"
                                onChange={handleFileChange}
                            />
                        </div>
                    )
            )}
            <div className="w-full flex justify-center gap-4">
                <Button onClick={handleSave} className="w-36 border-2 border-black" disabled={isDeleting}>
                    Save Changes
                </Button>
                <Button
                    onClick={handleDelete}
                    className="w-36 border-2 border-red-400  hover:bg-red-500 hover:text-white"
                    disabled={isDeleting}
                >
                    {isDeleting ? 'Deleting...' : 'Delete City'}
                </Button>
            </div>
        </div>
    );
};

export default JSONEditor;
