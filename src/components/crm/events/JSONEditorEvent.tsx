"use client";

import React, {useState, useEffect, ChangeEvent} from "react";
import {Button} from "@/components/crm/ui/button";
import {Input} from "@/components/crm/ui/input";
import {Textarea} from "@/components/crm/ui/textarea";
import Image from "next/image";
import {uploadImage} from "@/app/crm/uploadImage";
import '../JSONEditor.css'
import {blobUrl, checkLogged, cleanTitle, successToasterStyles} from "@/utils/utils";
import toast from "react-hot-toast";
import {IEvent, ISchool} from "@/utils/interfaces";
import {Dropdown} from "@/components/crm/ui/dropdown";
import DropdownDefault from "@/components/UI/Dropdown/Dropdown"

interface IJsonEditor {
    name: string;
}

const JSONEditor: React.FC<IJsonEditor> = ({name}) => {
     useEffect(() => {
        checkLogged();
    }, []);
    const [events, setEvents] = useState<IEvent[]>([]);
    const [eventIndex, setEventIndex] = useState<null | number>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [schoolTitle, setSchoolTitle] = useState<string>('');
    const [schools, setSchools] = useState<ISchool[]>([])
    const [schoolsTitles, setSchoolsTitles] = useState<string[]>([])
    useEffect(() => {
        fetch(`${blobUrl}jsons/events.json`, {
            cache: "no-store",
            next: {revalidate: 1},
        })
            .then((response) => response.json())
            .then((data: IEvent[]) => {
                setEvents(data);
                data.forEach((event, index) => {
                    const cleanedName = cleanTitle(name)
                    const cleanedTitle = cleanTitle(event.title)
                    if (cleanedTitle=== cleanedName) {
                        setEventIndex(index);
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
    useEffect(() => {
        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
        }

        function handleLoad() {
            console.log("Page fully loaded");
            fetch(`${blobUrl}jsons/schools.json`, {
                cache: "no-store",
                next: {revalidate: 1},
            })
                .then((response) => response.json())
                .then((data: ISchool[]) => {
                    setSchools(data)
                    const titles = data.map(school => school.title);
                    setSchoolsTitles(titles);
                    setLoading(false)
                })
                .catch((err) => {
                    setError("Failed to load data")
                    setLoading(false)
                    console.error(err)
                })
        }

        return () => window.removeEventListener('load', handleLoad);
    }, []);
    useEffect(() => {
        console.log(schools)
        console.log(eventIndex)
        if (schools && (eventIndex||eventIndex===0)) {
            console.log('here')
            schools.map(
                (school) => {
                    console.log(events[eventIndex].link.replace(/-/g, ''))
                    console.log(school.title.replace(/[^a-zA-Z0-9 ]/g, '').replace(/-/g, '').toLowerCase().replace(/ /g, ''))
                    if (events[eventIndex].link.replace(/-/g, '').toLowerCase().includes(school.title.replace(/[^a-zA-Z0-9 ]/g, '').replace(/-/g, '').toLowerCase().replace(/ /g, ''))) {
                        setSchoolTitle(school.title)
                    }
                }
            )
        }
    }, [schools, eventIndex]);
    const handleInputChange = (index: number, field: keyof IEvent, value: string | string[]) => {
        const updatedSchools = [...events];
        updatedSchools[index] = {...updatedSchools[index], [field]: value};
        setEvents(updatedSchools);
    };

    const handleSave = async () => {
        try {
            const response = await fetch("/api/save-events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(events),
            });
            if (!response.ok) throw new Error("Failed to save");
            toast.success('Saved successfully!', successToasterStyles);

        } catch (err) {
            setError("Failed to save data");
            console.error(err);
        }
    };
    const handleDelete = async () => {
        if (eventIndex === null) return

        const confirmDelete = window.confirm("Are you sure you want to delete this event?")
        if (!confirmDelete) return

        setIsDeleting(true);
        try {
            const eventToDelete = events[eventIndex];
            const updatedEvents = events.filter((_, index) => index !== eventIndex)
            
            // Delete the event data once
            const response = await fetch("/api/save-events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedEvents),
            })
            if (!response.ok) throw new Error("Failed to delete")
            
            // Poll events.json every 1 second until the event is removed
            let attempts = 0;
            const maxAttempts = 30; // Maximum 30 seconds of polling
            
            const pollForEventRemoval = async (): Promise<boolean> => {
                attempts++;
                
                try {
                    const verifyResponse = await fetch(blobUrl + "jsons/events.json", {
                        cache: "no-store",
                        next: { revalidate: 1 },
                    });
                    
                    if (!verifyResponse.ok) {
                        throw new Error("Failed to fetch events.json");
                    }
                    
                    const savedEvents = await verifyResponse.json();
                    const eventStillExists = savedEvents.some((event: IEvent) => 
                        event.title === eventToDelete.title
                    );
                    
                    if (!eventStillExists) {
                        return true; // Event successfully removed
                    }
                    
                    if (attempts >= maxAttempts) {
                        throw new Error("Timeout: Event still exists after 30 seconds");
                    }
                    
                    // Wait 1 second before next attempt
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    return pollForEventRemoval();
                    
                } catch (error) {
                    if (attempts >= maxAttempts) {
                        throw error;
                    }
                    // Wait 1 second before retry
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    return pollForEventRemoval();
                }
            };
            
            // Start polling
            const eventRemoved = await pollForEventRemoval();
            
            if (eventRemoved) {
                toast.success("Event deleted successfully!", successToasterStyles)
                window.location.href = '/crm/event'
            } else {
                throw new Error("Event deletion verification failed");
            }
            
        } catch (err) {
            setError("Failed to delete or verify deletion. Please try again.")
            console.error(err)
        } finally {
            setIsDeleting(false)
        }
    }

    async function handleSubmit(formData: FormData) {
        setIsUploading(true);
        setError(null);
        try {
            const result = await uploadImage(formData);
            if (result.success && result.url&&result.filename) {
                if (eventIndex !== null) {
                    handleInputChange(eventIndex, "image", result.filename);
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="space-y-4 relative">
            {/* Loading Overlay */}
            {isDeleting && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                        <p className="text-lg font-semibold">Deleting event and verifying removal...</p>
                        <p className="text-sm text-gray-600">Please wait, this may take a few seconds</p>
                    </div>
                </div>
            )}
            
            {events.map((event, index) => (
                index === eventIndex &&
                <div key={index} className="border p-4 rounded-md space-y-2">
                    <div className="flex flex-row justify-between gap-2">
                        <div className="w-full">
                            <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                                Event Title
                            </h6>
                            <Input
                                value={event.title}
                                onChange={(e) => handleInputChange(index, "title", e.target.value)}
                                placeholder="Title"
                                style={{height: 49}}
                                disabled={isDeleting}
                            />
                        </div>
                        <div className="w-full">
                            <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                                Type
                            </h6>
                            <DropdownDefault
                                selected={event.type}
                                label="Type"
                                setSelected={(value) => handleInputChange(index, "type", value)}
                                variants={["Language education",
                                    'High school education',
                                    'Summer school education',
                                    'University education',
                                    "Degree education",
                                    "Certificate education",
                                ]}
                                disabled={isDeleting}
                            />
                        </div>
                    </div>
                    <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                        Description
                    </h6>
                    <Textarea
                        value={event.description}
                        onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                        placeholder="Event Description"
                        disabled={isDeleting}
                    />
                    <div className="flex flex-row justify-between gap-2">
                        <div className="w-full">
                            <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                                Date
                            </h6>
                            <Input
                                value={event.date}
                                onChange={(e) => handleInputChange(index, "date", e.target.value)}
                                placeholder="Date(example: 01.01.2025)"
                                disabled={isDeleting}
                            />
                        </div>
                        <div className="w-full">
                            <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                                Start Time
                            </h6>
                            <Input
                                value={event.timeStart}
                                onChange={(e) => handleInputChange(index, "timeStart", e.target.value)}
                                placeholder="Start Time(example: 13:00)"
                                disabled={isDeleting}
                            />
                        </div>
                        <div className="w-full">
                            <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                                End Time
                            </h6>
                            <Input
                                value={event.timeEnd}
                                onChange={(e) => handleInputChange(index, "timeEnd", e.target.value)}
                                placeholder="End Time(example: 14:00)"
                                disabled={isDeleting}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row justify-between gap-2">
                        <div className="w-full">
                            <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                                School
                            </h6>
                            <Dropdown
                                selected={schoolTitle}
                                onSelect={(e) => {
                                    console.log(e)
                                    const eventSchool = schools.find((school) => e === school.title);
                                    const link = '/' + eventSchool?.education_type.replace(/ /g, '-').toLowerCase()
                                        + '/' + eventSchool?.country.replace(/ /g, '-').toLowerCase()
                                        + '/' + eventSchool?.city.replace(/ /g, '-').toLowerCase()
                                        + '/' + eventSchool?.title.replace(/ /g, '-').toLowerCase()
                                    if (eventSchool) {
                                        handleInputChange(index, "location", eventSchool?.country)
                                        handleInputChange(index, "link", link)
                                        setSchoolTitle(e)
                                    }
                                }
                                }
                                placeholder='Select School' options={schoolsTitles}/>
                        </div>
                    </div>
                    <div>
                        <h6 style={{color: "var(--Courses-Base-Black)"}}>Image</h6>
                        <div className="flex flex-wrap gap-2">
                            {event.image &&
                                <Image
                                    src={blobUrl + event.image}
                                    alt={`event`}
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
                            disabled={isUploading || isDeleting}
                            className="max-w-sm mt-2"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
            ))}
            <div className="w-full flex justify-center gap-4">
                <Button onClick={handleSave} className="w-36 border-2 border-black" disabled={isDeleting}>
                    Save Changes
                </Button>
                <Button
                    onClick={handleDelete}
                    className="w-36 border-2 border-red-400  hover:bg-red-500 hover:text-white"
                    disabled={isDeleting}
                >
                    {isDeleting ? 'Deleting...' : 'Delete Event'}
                </Button>
            </div>
        </div>
    );
};

export default JSONEditor;
