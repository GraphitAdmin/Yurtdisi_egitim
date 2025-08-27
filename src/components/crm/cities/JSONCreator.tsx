'use client'

import React, {useState, useEffect, ChangeEvent} from 'react';
import {Button} from "@/components/crm/ui/button";
import {Input} from "@/components/crm/ui/input";
import {Textarea} from "@/components/crm/ui/textarea";
import Image from "next/image";
import {uploadImage} from "@/app/crm/uploadImage";
import toast from "react-hot-toast";
import {blobUrl, checkLogged, errorToasterStyles} from "@/utils/utils";
import {ICity} from "@/utils/interfaces";
import Dropdown from "@/components/UI/Dropdown/Dropdown";
import '../JSONEditor.css'
import {searchCountries} from "@/data/search";

const JSONCreator = () => {
     useEffect(() => {
        checkLogged();
    }, []);
    const [cities, setCities] = useState<ICity[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [preview, setPreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetch(blobUrl+'jsons/cities.json', {
            cache: 'no-store',
            next: {revalidate: 1}
        })
            .then(response => response.json())
            .then((data: ICity[]) => {
                const newCity: ICity = {
                    name: 'new',
                    description: '',
                    country: 'United Kingdom',
                    image: ''
                }
                setCities([...data, newCity]);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to load data');
                setLoading(false);
                console.error(err);
            })
    }, []);

    async function handleSubmit(formData: FormData) {
        setIsUploading(true);
        setError(null);
        try {
            const result = await uploadImage(formData);
            console.log(result)
            if (result.success && result.url&&result.filename) {
                setPreview(result.url);
                handleInputChange(cities.length - 1, "image", result.filename);
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

    const handleInputChange = (index: number, field: keyof ICity, value: string) => {
        const updatedCities = [...cities];
        updatedCities[index] = {...updatedCities[index], [field]: value};
        setCities(updatedCities);
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

    const handleSave = async () => {
        const newCity = cities[cities.length - 1];
        console.log(newCity);
        if (newCity.name === 'new' || newCity.name === '' || !newCity.name) {
            toast.error('Change city name!', errorToasterStyles);
            return;
        } else if (newCity.description === '' || !newCity.description) {
            toast.error('Change city description!', errorToasterStyles);
            return;
        } else if (newCity.image === '' || !newCity.image) {
            toast.error('Change city image!', errorToasterStyles);
            return;
        }

        const citiesToCheck = cities.slice(0, cities.length - 1);
        const hasDuplicates = citiesToCheck.some((name) => name.name === newCity.name);
        console.log(citiesToCheck, cities);
        console.log(citiesToCheck);
        if (hasDuplicates) {
            toast.error('City with this name already exist!', errorToasterStyles);
            return;
        }

        setIsSaving(true);
        try {
            // Save the city data once
            const response = await fetch('/api/save-cities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cities),
            });

            if (!response.ok) throw new Error('Failed to save');
            
            // Poll cities.json every 1 second until the new city appears
            let attempts = 0;
            const maxAttempts = 60; // Maximum 30 seconds of polling
            
            const pollForCity = async (): Promise<boolean> => {
                attempts++;
                
                try {
                    const verifyResponse = await fetch(blobUrl + 'jsons/cities.json', {
                        cache: 'no-store',
                        next: { revalidate: 1 },
                    });
                    
                    if (!verifyResponse.ok) {
                        throw new Error('Failed to fetch cities.json');
                    }
                    
                    const savedCities = await verifyResponse.json();
                    const cityExists = savedCities.some((city: ICity) => 
                        city.name === newCity.name && city.name !== 'new'
                    );
                    
                    if (cityExists) {
                        return true;
                    }
                    
                    if (attempts >= maxAttempts) {
                        throw new Error('Timeout: City not found after 30 seconds');
                    }
                    
                    // Wait 1 second before next attempt
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    return pollForCity();
                    
                } catch (error) {
                    if (attempts >= maxAttempts) {
                        throw error;
                    }
                    // Wait 1 second before retry
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    return pollForCity();
                }
            };
            
            // Start polling
            const cityFound = await pollForCity();
            
            if (cityFound) {
                window.location.href = '/crm/city/' + cities[cities.length - 1].name;
            } else {
                throw new Error('City verification failed');
            }
            
        } catch (err) {
            setError('Failed to save or verify data. Please try again.');
            console.log(err);
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="space-y-4 relative">
            {/* Loading Overlay */}
            {isSaving && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                        <p className="text-lg font-semibold text-gray-600">Saving city and verifying data...</p>
                        <p className="text-sm text-gray-600">Please wait, this may take a few seconds</p>
                    </div>
                </div>
            )}
            
            {cities.map((city, index) => (
                index === cities.length - 1 &&
                <div key={index} className="border p-4 rounded-md space-y-2">
                    <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>Name</h6>
                    <Input
                        value={city.name || ''}
                        onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                        placeholder="City name"
                        disabled={isSaving}
                    />
                    <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>Description</h6>
                    <Textarea
                        value={city.description || ''}
                        onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                        placeholder="Description"
                        disabled={isSaving}
                    />
                    <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>Country</h6>
                    <Dropdown label={'Country'} selected={city.country} setSelected={(value)=>handleInputChange(index, 'country',value)} variants={searchCountries} disabled={isSaving}/>
                    <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>Image</h6>
                    <div className="relative rounded-lg image__input">
                        {preview && (
                            <Image
                                src={preview}
                                alt='New city'
                                width={400}
                                height={400}
                            />
                        )}
                    </div>
                    <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        disabled={isUploading || isSaving}
                        className="max-w-sm"
                        onChange={handleFileChange}
                    />
                </div>
            ))}
            <div className="w-full flex justify-center">
                <Button onClick={handleSave} className="w-36 border-2 border-black" disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save city'}
                </Button>
            </div>
        </div>
    )
}

export default JSONCreator;