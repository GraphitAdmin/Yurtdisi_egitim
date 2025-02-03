"use client"
import React, {useState, useEffect, type ChangeEvent} from "react"
import {Button} from "@/components/crm/ui/button"
import {Input} from "@/components/crm/ui/input"
import {Textarea} from "@/components/crm/ui/textarea"
import Image from "next/image"
import {uploadImage} from "@/app/crm/uploadImage"
import toast from "react-hot-toast"
import {blobUrl, checkLogged, errorToasterStyles, successToasterStyles} from "@/utils/utils"
import type {IEvent, ISchool} from "@/utils/interfaces"
import '../JSONEditor.css'
import {Dropdown} from "@/components/crm/ui/dropdown";
import DropdownDefault from "@/components/UI/Dropdown/Dropdown";

const JSONCreator = () => {
     useEffect(() => {
        checkLogged();
    }, []);
    const [events, setEvents] = useState<IEvent[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [schoolTitle, setSchoolTitle] = useState<string>('');
    const [schools,setSchools] = useState<ISchool[]>([])
    const [schoolsTitles,setSchoolsTitles] = useState<string[]>([])

    useEffect(() => {
        fetch(`${blobUrl}jsons/events.json`, {
            cache: "no-store",
            next: {revalidate: 1},
        })
            .then((response) => response.json())
            .then((data: IEvent[]) => {
                const newEvent: IEvent = {
                    title: "new",
                    image: "",
                    description: "",
                    date: "",
                    type: "Language Education",
                    timeEnd: '',
                    timeStart: '',
                    location: '',
                    link: ''
                }
                setEvents([...data, newEvent])
                setLoading(false)
            })
            .catch((err) => {
                setError("Failed to load data")
                setLoading(false)
                console.error(err)
            })
    }, [])
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
    async function handleSubmit(formData: FormData) {
        setIsUploading(true)
        setError(null)
        try {
            const result = await uploadImage(formData)
            if (result.success && result.url&&result.filename) {
                handleInputChange(events.length - 1, "image", result.filename)
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

    const handleInputChange = (index: number, field: keyof IEvent, value: unknown) => {
        const updatedSchools = [...events]
        updatedSchools[index] = {...updatedSchools[index], [field]: value}
        setEvents(updatedSchools)
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

    const handleSave = async () => {
        const newSchool = events[events.length - 1]
        if (newSchool.title === "new" || newSchool.title === "") {
            toast.error("Change event title!", errorToasterStyles)
            return
        }

        const schoolsToCheck = events.slice(0, events.length - 1)
        const hasDuplicates = schoolsToCheck.some((school) => school.title === newSchool.title)
        if (hasDuplicates) {
            toast.error("Event with this title already exists!", errorToasterStyles)
            return
        }

        try {
            const response = await fetch("/api/save-events", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(events),
            })

            if (!response.ok) throw new Error("Failed to save")
            toast.success("Saved successfully!", successToasterStyles)
            window.location.href = "/crm/event/" + events[events.length - 1].title.replace(/ /g, '-').toLowerCase()
        } catch (err) {
            setError("Failed to save data")
            console.log(err)
        }
    }

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    return (
        <div className="space-y-4">
            {events.map((event, index) => (
                index === events.length - 1 &&
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
                                    const eventSchool=schools.find((school)=>e===school.title);
                                    const link='/'+eventSchool?.education_type.replace(/ /g, '-').toLowerCase()
                                    +'/'+eventSchool?.country.replace(/ /g, '-').toLowerCase()
                                        +'/'+eventSchool?.city.replace(/ /g, '-').toLowerCase()
                                        +'/'+eventSchool?.title.replace(/ /g, '-').toLowerCase()
                                    handleInputChange(index, "location", eventSchool?.country)
                                    handleInputChange(index, "link", link)
                                    setSchoolTitle(e)
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
            <div className="w-full flex justify-center">
                <Button onClick={handleSave} className="w-36 border-2 border-black">Save Event</Button>
            </div>

        </div>
    )
}

export default JSONCreator

