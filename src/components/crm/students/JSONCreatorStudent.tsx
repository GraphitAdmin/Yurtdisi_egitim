"use client"

import React, {useState, useEffect,} from "react"
import {Button} from "@/components/crm/ui/button"
import {Input} from "@/components/crm/ui/input"
import Textarea from "@/components/UI/TextArea/TextArea"
import toast from "react-hot-toast"
import {blobUrl, errorToasterStyles, successToasterStyles} from "@/utils/utils"
import {IStudent} from "@/utils/interfaces"
import Dropdown from "@/components/UI/Dropdown/Dropdown";
import {searchCountries} from "@/data/search";
import '../JSONEditor.css'

const JSONCreator = () => {
    const [students, setStudents] = useState<IStudent[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetch(blobUrl + "jsons/students.json", {
            cache: "no-store",
            next: {revalidate: 1},
        })
            .then((response) => response.json())
            .then((data: IStudent[]) => {
                const newStudent: IStudent = {
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    programs: "",
                    city: "",
                    country: "",
                    message: "",
                    isContacted: false,
                    id: data.length.toString(),
                }
                setStudents([...data, newStudent])
                setLoading(false)
            })
            .catch((err) => {
                setError("Failed to load data")
                setLoading(false)
                console.error(err)
            })
    }, [])


    const handleInputChange = (index: number, field: keyof IStudent, value: unknown) => {
        const updatedSchools = [...students]
        updatedSchools[index] = {...updatedSchools[index], [field]: value}
        setStudents(updatedSchools)
    }

    const handleSave = async () => {
        const newSchool = students[students.length - 1]
        if (newSchool.lastName === "new") {
            toast.error("Change student name!", errorToasterStyles)
            return
        }
        try {
            const response = await fetch("/api/save-students", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(students),
            })

            if (!response.ok) throw new Error("Failed to save")
            toast.success("Saved successfully!", successToasterStyles)
            window.location.href = "/crm/student/"
        } catch (err) {
            setError("Failed to save data")
            console.log(err)
        }
    }
    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    return (
        <div className="space-y-4">
            {students.map((school, index) => (
                index === students.length - 1 &&
                <div key={index} className="border p-4 rounded-md space-y-2">
                    <div className="flex flex-row justify-between gap-2">
                        <div className="w-full">
                            <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                                First Name
                            </h6>
                            <Input
                                value={school.firstName}
                                onChange={(e) => handleInputChange(index, "firstName", e.target.value)}
                                placeholder="Firt Name"
                                style={{height: 49}}
                            />
                        </div>
                        <div className="w-full">
                            <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                                Last Name
                            </h6>
                            <Input
                                value={school.lastName}
                                onChange={(e) => handleInputChange(index, "lastName", e.target.value)}
                                placeholder="Last Name"
                                style={{height: 49}}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row justify-between gap-2">
                        <div className="w-full">
                            <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                                Email
                            </h6>
                            <Input
                                value={school.email}
                                onChange={(e) => handleInputChange(index, "email", e.target.value)}
                                placeholder="Email"
                                style={{height: 49}}
                            />
                        </div>
                        <div className="w-full">
                            <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                                Phone
                            </h6>
                            <Input
                                value={school.phone}
                                onChange={(e) => handleInputChange(index, "phone", e.target.value)}
                                placeholder="Phone"
                                style={{height: 49}}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row justify-between gap-2">
                        <div className="w-full">
                            <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                                Programs
                            </h6>
                            <Input
                                value={school.programs}
                                onChange={(e) => handleInputChange(index, "programs", e.target.value)}
                                placeholder="Programs"
                                style={{height: 49}}
                            />
                        </div>
                        <div className="w-full">
                            <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                                City
                            </h6>
                            <Input
                                value={school.city}
                                onChange={(e) => handleInputChange(index, "city", e.target.value)}
                                placeholder="City"
                                style={{height: 49}}
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
                                Is contacted?
                            </h6>
                            <Dropdown label={'Is Contacted'} selected={school.isContacted?'Yes':'No'}
                                      setSelected={(value) => {
                                          if(value==='Yes'){
                                              handleInputChange(index, 'isContacted', true)
                                          }
                                          else{
                                              handleInputChange(index, 'isContacted', false)
                                          }
                                     }}
                                      variants={['Yes', 'No']}/>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between gap-2">
                        <div className="w-full">
                            <h6 style={{textAlign: "left", color: "var(--Courses-Base-Black)"}}>
                                Message
                            </h6>
                            <Textarea value={school.message} setValue={(value) => handleInputChange(index, 'message', value)} placeholder='Message'
                            />
                        </div>
                    </div>

                </div>
            ))}
            <div className="w-full flex justify-center">
                <Button onClick={handleSave} className="w-36 border-2 border-black"
                >Save Student</Button>
            </div>
        </div>
    )
}

export default JSONCreator

