"use client"

import React, {useState, useEffect,} from "react"
import {Button} from "@/components/crm/ui/button"
import {Input} from "@/components/crm/ui/input"
import Textarea from "@/components/UI/TextArea/TextArea"
import toast from "react-hot-toast"
import {blobUrl, checkLogged, errorToasterStyles} from "@/utils/utils"
import {IStudent} from "@/utils/interfaces"
import Dropdown from "@/components/UI/Dropdown/Dropdown";
import {searchCountries} from "@/data/search";
import '../JSONEditor.css'

const JSONCreator = () => {
     useEffect(() => {
        checkLogged();
    }, []);
    const [students, setStudents] = useState<IStudent[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isSaving, setIsSaving] = useState(false)

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
        
        setIsSaving(true);
        try {
            // Save the student data once
            const response = await fetch("/api/save-students", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(students),
            })

            if (!response.ok) throw new Error("Failed to save")
            
            // Poll students.json every 1 second until the new student appears
            let attempts = 0;
            const maxAttempts = 30; // Maximum 30 seconds of polling
            
            const pollForStudent = async (): Promise<boolean> => {
                attempts++;
                
                try {
                    const verifyResponse = await fetch(blobUrl + "jsons/students.json", {
                        cache: "no-store",
                        next: { revalidate: 1 },
                    });
                    
                    if (!verifyResponse.ok) {
                        throw new Error("Failed to fetch students.json");
                    }
                    
                    const savedStudents = await verifyResponse.json();
                    const studentExists = savedStudents.some((student: IStudent) => 
                        student.firstName === newSchool.firstName && 
                        student.lastName === newSchool.lastName &&
                        student.email === newSchool.email
                    );
                    
                    if (studentExists) {
                        return true;
                    }
                    
                    if (attempts >= maxAttempts) {
                        throw new Error("Timeout: Student not found after 30 seconds");
                    }
                    
                    // Wait 1 second before next attempt
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    return pollForStudent();
                    
                } catch (error) {
                    if (attempts >= maxAttempts) {
                        throw error;
                    }
                    // Wait 1 second before retry
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    return pollForStudent();
                }
            };
            
            // Start polling
            const studentFound = await pollForStudent();
            
            if (studentFound) {
                window.location.href = "/crm/student/"
            } else {
                throw new Error("Student verification failed");
            }
            
        } catch (err) {
            setError("Failed to save or verify data. Please try again.")
            console.log(err)
        } finally {
            setIsSaving(false)
        }
    }
    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>

    return (
        <div className="space-y-4 relative">
            {/* Loading Overlay */}
            {isSaving && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                        <p className="text-lg font-semibold">Saving student and verifying data...</p>
                        <p className="text-sm text-gray-600">Please wait, this may take a few seconds</p>
                    </div>
                </div>
            )}
            
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
                                disabled={isSaving}
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
                                disabled={isSaving}
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
                                disabled={isSaving}
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
                                disabled={isSaving}
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
                                disabled={isSaving}
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
                                disabled={isSaving}
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
                                      variants={searchCountries}
                                      disabled={isSaving}/>
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
                                      variants={['Yes', 'No']}
                                      disabled={isSaving}/>
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
                <Button onClick={handleSave} className="w-36 border-2 border-black" disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Student'}
                </Button>
            </div>
        </div>
    )
}

export default JSONCreator

