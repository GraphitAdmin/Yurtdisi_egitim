"use client";

import React, {useState, useEffect} from "react";
import {Button} from "@/components/crm/ui/button";
import {Input} from "@/components/crm/ui/input";
import TextArea from "@/components/UI/TextArea/TextArea";
import '../JSONEditor.css'
import {blobUrl, successToasterStyles} from "@/utils/utils";
import toast from "react-hot-toast";
import {IStudent} from "@/utils/interfaces";
import Dropdown from "@/components/UI/Dropdown/Dropdown";
import {searchCountries} from "@/data/search";
interface IJsonEditor {
    name: string;
}

const JSONEditor: React.FC<IJsonEditor> = ({name}) => {
    const [students, setStudents] = useState<IStudent[]>([]);
    const [schoolIndex, setSchoolIndex] = useState<null | number>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        fetch(`${blobUrl}jsons/students.json`, {
            cache: "no-store",
            next: {revalidate: 1},
        })
            .then((response) => response.json())
            .then((data: IStudent[]) => {
                setStudents(data);
                data.forEach((school, index) => {
                    if (school.id === name) {
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

    const handleInputChange = (index: number, field: keyof IStudent, value: string | string[]) => {
        const updatedSchools = [...students];
        updatedSchools[index] = {...updatedSchools[index], [field]: value};
        setStudents(updatedSchools);
    };

    const handleSave = async () => {
        try {
            const response = await fetch("/api/save-students", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(students),
            });
            if (!response.ok) throw new Error("Failed to save");
            toast.success('Saved successfully!', successToasterStyles);
        } catch (err) {
            setError("Failed to save data");
            console.error(err);
        }
    };

    const handleDelete = async () => {
        if (schoolIndex === null) return

        const confirmDelete = window.confirm("Are you sure you want to delete this school?")
        if (!confirmDelete) return

        try {
            const updatedCities = students.filter((_, index) => index !== schoolIndex)
            const response = await fetch("/api/save-students", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedCities),
            })
            if (!response.ok) throw new Error("Failed to delete")
            toast.success("School deleted successfully!", successToasterStyles)
            window.location.href = '/crm/student'
        } catch (err) {
            setError("Failed to delete blog")
            console.error(err)
        }
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="space-y-4">
            {students.map((school, index) => (
                name === school.id &&
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
                                              handleInputChange(index, 'isContacted', 'true')
                                          }
                                          else{
                                              handleInputChange(index, 'isContacted', 'false')
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
                            <TextArea value={school.message}
                                      setValue={(value) => handleInputChange(index, 'message', value)} placeholder='Message'
                            />
                        </div>
                    </div>

                </div>
            ))}
            <div className="w-full flex justify-center  gap-4">
                <Button onClick={handleSave} className="w-36 border-2 border-black">
                    Save Changes
                </Button>
                <Button
                    onClick={handleDelete}
                    className="w-36 border-2 border-red-400  hover:bg-red-500 hover:text-white"
                >
                    Delete School
                </Button>
            </div>
        </div>
    );
};

export default JSONEditor;
