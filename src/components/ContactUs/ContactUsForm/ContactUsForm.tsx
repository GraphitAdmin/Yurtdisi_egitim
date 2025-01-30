'use client'
import Input from "@/components/UI/Input/Input";
import Dropdown from "@/components/UI/Dropdown/Dropdown";
import Textarea from "@/components/UI/TextArea/TextArea";
import Button from "@/components/UI/Button/Button";
import React, {useState} from "react";
interface ContactUsFormProps {
    isContactUs?: boolean;
}
const ContactUsForm: React.FC<ContactUsFormProps>  = ({isContactUs}) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [program, setProgram] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [message, setMessage] = useState("");
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
                    <Input placeholder="Program(s) you are interested in" setValue={setProgram}
                           value={program}/>
                </div>
            </div>
            <div style={{flexDirection: 'column', gap: 0}}>
                <small>
                    Country(ies) you are interested in
                </small>
                <Dropdown label='Select country(ies) you are interested in' setSelected={setCountry}
                          variants={['USA', 'UK']} selected={country}/>
            </div>
            <div style={{flexDirection: 'column', gap: 0}}>
                <small>
                    Message
                </small>
                <Textarea value={message} setValue={setMessage} placeholder='Message'/>
            </div>
            <Button label='Send message' btnStyle={{width: '100%', padding: '12px 0'}}
                    btnDivStyle={{justifyContent: 'center'}}
            />
        </div>
    )
}
export default ContactUsForm;