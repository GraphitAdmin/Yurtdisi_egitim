'use client'

import React, {useState, useEffect, ChangeEvent} from 'react';
import {Button} from "@/components/crm/ui/button";
import {Input} from "@/components/crm/ui/input";
import {Textarea} from "@/components/crm/ui/textarea";
import Image from "next/image";
import {uploadImage} from "@/app/crm/uploadImage";
import toast from "react-hot-toast";
import {blobUrl, checkLogged, errorToasterStyles, successToasterStyles} from "@/utils/utils";
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


        try {
            const response = await fetch('/api/save-cities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cities),
            });

            if (!response.ok) throw new Error('Failed to save');
            toast.success('Saved successfully!', successToasterStyles);
            window.location.href = '/crm/city/' + cities[cities.length - 1].name;
        } catch (err) {
            setError('Failed to save data');
            console.log(err);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="space-y-4">
            {cities.map((city, index) => (
                index === cities.length - 1 &&
                <div key={index} className="border p-4 rounded-md space-y-2">
                    <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>Name</h6>
                    <Input
                        value={city.name || ''}
                        onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                        placeholder="City name"
                    />
                    <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>Description</h6>
                    <Textarea
                        value={city.description || ''}
                        onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                        placeholder="Description"
                    />
                    <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>Country</h6>
                    <Dropdown label={'Country'} selected={city.country} setSelected={(value)=>handleInputChange(index, 'country',value)} variants={searchCountries}/>
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
                        disabled={isUploading}
                        className="max-w-sm"
                        onChange={handleFileChange}
                    />
                </div>
            ))}
            <div className="w-full flex justify-center">
                <Button onClick={handleSave} className="w-36 border-2 border-black">
                    Save city
                </Button>
            </div>
        </div>
    )
}

export default JSONCreator;