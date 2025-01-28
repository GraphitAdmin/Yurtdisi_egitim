'use client'
import React, {useState} from "react";
import {GoogleMap, LoadScript, MarkerF} from "@react-google-maps/api";
import Input from "@/components/UI/Input/Input";
import Textarea from "@/components/UI/TextArea/TextArea";
import Dropdown from "@/components/UI/Dropdown/Dropdown";
import ContactUsImage from "@/assets/ContactUs.png"
import Image from "next/image";
import './ContactUs.css'

const ContactUs = () => {
    const [zoom, setZoom] = useState(12);
    const [center, setCenter] = useState({
        lat: 37.7749,
        lng: -122.4194,
    });
    const coordinates = {
        lat: 37.7749,
        lng: -122.4194,
    };
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [program, setProgram] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [message, setMessage] = useState("");
    return (<>
            <div className="page__container">
                <div style={{width: '100%'}}>
                    <h1>Overseas education consultancy</h1>
                    <p>As Global Overseas Education Consultancy, we have been providing free
                        consultancy services to our students on overseas education consultancy since 1989 .</p>
                </div>
                {process.env.NEXT_GOOGLE_API_KEY &&
                    <LoadScript googleMapsApiKey={process.env.NEXT_GOOGLE_API_KEY}>
                        <GoogleMap mapContainerStyle={{
                            width: '100%',
                            height: 500,
                            display: 'block',
                            maxHeight: '60vh',
                            borderRadius: 16
                        }}
                                   center={center} zoom={zoom}>
                            <MarkerF
                                onClick={() => {
                                    setZoom(18)
                                    setCenter(coordinates)
                                }}
                                position={coordinates}/>
                        </GoogleMap>
                    </LoadScript>
                }
            </div>
            <div className="contact__us__form__block">
                <div className="contact__us__form">
                    <div style={{flexDirection: 'column',marginBottom:24}}>
                        <h2
                        style={{color:' var(--Courses-Base-Black)',textAlign:'left'}}
                        >Information request form</h2>
                        <p style={{color: 'var(--Courses-Gray-Gray-500)',textAlign:'left'}}>
                            Lorem ipsum dolor sit amet consectetur. Quis nulla amet donec odio fusce.
                        </p>
                    </div>
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
                    <div style={{flexDirection: 'column'}}>
                        <small>
                            Country(ies) you are interested in
                        </small>
                        <Dropdown label='Select country(ies) you are interested in' setSelected={setCountry}
                                  variants={['USA', 'UK']} selected={country}/>
                    </div>
                    <Textarea value={message} setValue={setMessage} placeholder='Message'/>
                </div>
                <Image
                    src={ContactUsImage}
                    alt="ContactUs"
                    style={{height:'100%',objectFit:'cover'}}
                />
            </div>
        </>

    )
}
export default ContactUs;