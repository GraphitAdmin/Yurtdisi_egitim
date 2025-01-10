'use client'
import './Subscribe.css'
import Input from "@/components/UI/Input/Input";
import Button from "@/components/UI/Button/Button";
import {useState} from "react";
const Subscribe = () => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    return(
        <div className="subscribe">
            <div className="subscribe__container">
                <h2>
                    Let our e-bulletins reach you first
                </h2>
                <div>
                    <Input placeholder='Enter your name' setValue={setName} value={name}/>
                    <Input placeholder='Enter your email' setValue={setEmail} value={email}/>
                    <Button label='Subscribe'/>
                </div>
            </div>
        </div>
    )
}
export default Subscribe;