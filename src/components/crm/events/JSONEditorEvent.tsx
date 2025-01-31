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
import {IEvent, ISchool} from "@/utils/interfaces";
import {Dropdown} from "@/components/crm/ui/dropdown";
import DropdownDefault from "@/components/UI/Dropdown/Dropdown"

interface IJsonEditor {
    name: string;
}

const JSONEditor: React.FC<IJsonEditor> = ({name}) => {
    const [events, setEvents] = useState<IEvent[]>([]);
    const [eventIndex, setEventIndex] = useState<null | number>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
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
                    const cleanedName = name
                        .replace(/[^a-zA-Z0-9 ]/g, '')
                        .replace(/-/g, '')
                        .replace(/^\w/, (char) => char.toLowerCase());
                    const cleanedTitle = event.title
                        .replace(/[^a-zA-Z0-9 ]/g, '')
                        .replace(/-/g, '')
                        .replace(/^\w/, (char) => char.toLowerCase()).replace(/ /g, '')
                    if (cleanedTitle.toLowerCase() === cleanedName.toLowerCase()) {
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

        try {
            const updatedBlogs = events.filter((_, index) => index !== eventIndex)
            const response = await fetch("/api/save-events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedBlogs),
            })
            if (!response.ok) throw new Error("Failed to delete")
            toast.success("Event deleted successfully!", successToasterStyles)
            window.location.href = '/crm/event'
        } catch (err) {
            setError("Failed to delete event")
            console.error(err)
        }
    }

    async function handleSubmit(formData: FormData) {
        setIsUploading(true);
        setError(null);
        try {
            const result = await uploadImage(formData);
            if (result.success && result.url) {
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
        <div className="space-y-4">
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
                                />
                            }
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
            ))}
            <div className="w-full flex justify-center gap-4">
                <Button onClick={handleSave} className="w-36 border-2 border-black">
                    Save Changes
                </Button>
                <Button
                    onClick={handleDelete}
                    className="w-36 border-2 border-red-400  hover:bg-red-500 hover:text-white"
                >
                    Delete Event
                </Button>
            </div>
        </div>
    );
};

export default JSONEditor;
