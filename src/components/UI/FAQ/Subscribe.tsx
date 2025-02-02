'use client'
import './Subscribe.css'
import Input from "@/components/UI/Input/Input";
import Button from "@/components/UI/Button/Button";
import {useState} from "react";
import {blobUrl, errorToasterStyles, successToasterStyles} from "@/utils/utils";
import {ISubscriber} from "@/utils/interfaces";
import toast from "react-hot-toast";
const Subscribe = () => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [sending,setSending]=useState(false);
    const handleSave = async () => {
        try {
            setSending(true);
            const studentsUrl = blobUrl + 'jsons/subscribers.json';
            const response = await fetch(studentsUrl, {
                cache: 'no-store',
            });
            if (!response.ok) {
                throw new Error('Failed to fetch JSON');
            }
            const jsonData = await response.json();
            const newStudent:ISubscriber= {
                name:name,
                email: email
            }
            const students=[newStudent,...jsonData]
            try {
                const response = await fetch("/api/save-subscribers", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(students),
                })

                if (!response.ok) throw new Error("Failed to save")
                setSending(false);
                toast.success("Subscribed successfully!", successToasterStyles)
            } catch (err) {
                toast.error("Failed to subscribe",errorToasterStyles)
                console.log(err)
                setSending(false);
            }
        } catch (err) {
            console.log(err);
            toast.error("Failed to sent message",errorToasterStyles)
            setSending(false);
        }
    }
    return (
        <div className="subscribe">
            <div className="subscribe__container">
                <h2>
                    Let our e-bulletins reach you first
                </h2>
                <div>
                    <Input placeholder='Enter your name' setValue={setName} value={name}/>
                    <Input placeholder='Enter your email' setValue={setEmail} value={email}/>
                    <Button onClick={handleSave} label={sending?'Subscribing':'Subscribe'}/>
                </div>
            </div>
        </div>
    )
}
export default Subscribe;