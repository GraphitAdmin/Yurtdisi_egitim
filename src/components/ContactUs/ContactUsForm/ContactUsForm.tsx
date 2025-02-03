'use client'
import Input from "@/components/UI/Input/Input";
import Textarea from "@/components/UI/TextArea/TextArea";
import Button from "@/components/UI/Button/Button";
import React, {useState} from "react";
import {searchTypes,searchCountries} from "@/data/search";
import DropdownMany from "@/components/UI/DropdownMany/DropdownMany";
import {IStudent} from "@/utils/interfaces";
import toast from "react-hot-toast";
import {blobUrl, errorToasterStyles, successToasterStyles} from "@/utils/utils";
interface ContactUsFormProps {
    isContactUs?: boolean;
}
const ContactUsForm: React.FC<ContactUsFormProps>  = ({isContactUs}) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [programs, setPrograms] = useState<string[]>([]);
    const [city, setCity] = useState("");
    const [countries, setCountries] = useState<string[]>([]);
    const [message, setMessage] = useState("");
    const [sending,setSending] = useState(false);

    const handleSave = async () => {
        try {
            setSending(true);
            const studentsUrl = blobUrl + 'jsons/students.json';
            const response = await fetch(studentsUrl, {
                cache: 'no-store',
            });
            if (!response.ok) {
                throw new Error('Failed to fetch JSON');
            }
            const jsonData = await response.json();
            const newStudent:IStudent= {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                programs: programs.join(', '),
                city: city,
                country: countries.join(', '),
                message: message,
                isContacted: false,
                id:jsonData.length.toString()
            }
            const students=[newStudent,...jsonData]
            try {
                const response = await fetch("/api/save-students", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(students),
                })

                if (!response.ok) throw new Error("Failed to save")
                setSending(false);
                toast.success("Message sent successfully!", successToasterStyles)
            } catch (err) {
                toast.error("Failed to save message",errorToasterStyles)
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
        <div className="contact__us__form">
            {isContactUs&&
            <div style={{flexDirection: 'column', marginBottom: 24}}>
                <h2
                    style={{color: ' var(--Courses-Base-Black)', textAlign: 'left'}}
                >Information request form</h2>
                <p style={{color: 'var(--Courses-Gray-Gray-500)', textAlign: 'left'}}>
                    Lorem ipsum dolor sit amet consectetur. Quis nulla amet donec odio fusce.
                </p>
            </div>
            }
            <div>
                <div>
                    <small>First name</small>
                    <Input placeholder="First name" setValue={setFirstName} value={firstName}/>
                </div>
                <div>
                    <small>Last name</small>
                    <Input placeholder="Last name" setValue={setLastName} value={lastName}/>
                </div>
            </div>
            <div>
                <div>
                    <small>Email</small>
                    <Input placeholder="mail@gmail.com" setValue={setEmail} value={email}/>
                </div>
                <div>
                    <small>Phone number</small>
                    <Input placeholder="Phone number" setValue={setPhone} value={phone}/>
                </div>
            </div>
            <div>
                <div>
                    <small>Your city</small>
                    <Input placeholder="Your city" setValue={setCity} value={city}/>
                </div>
                <div>
                    <small>Program(s) you are interested in</small>
                    <DropdownMany variants={searchTypes} setSelected={setPrograms}
                           selected={programs} label='Program(s) you are interested in'/>
                </div>
            </div>
            <div style={{flexDirection: 'column', gap: 0}}>
                <small>
                    Country(ies) you are interested in
                </small>
                <DropdownMany label='Select country(ies) you are interested in' setSelected={setCountries}
                          variants={searchCountries} selected={countries}/>
            </div>
            <div style={{flexDirection: 'column', gap: 0}}>
                <small>
                    Message
                </small>
                <Textarea value={message} setValue={setMessage} placeholder='Message'/>
            </div>
            <Button onClick={handleSave} label={!sending?'Send message':'Sending message...'} disabled={sending} btnStyle={{width: '100%', padding: '12px 0'}}
                    btnDivStyle={{justifyContent: 'center'}}
            />
        </div>
    )
}
export default ContactUsForm;