'use client'
import Button from "@/components/UI/Button/Button";
import React, {useState} from "react";
import Input from "@/components/UI/Input/Input";
import './Modal.css'

interface ModalProps {
    closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({closeModal}) => {
    const [email, setEmail] = useState("");
    return (
        <div className="modal__window">
            <div className="modal">
                <div className="w-full flex flex-row justify-between">
                    <h5 style={{color:'var(--Courses-Base-Black)'}}>
                        Receive more information
                    </h5>
                    <svg onClick={closeModal} xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                         viewBox="0 0 24 24" fill="none">
                        <path
                            d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
                            fill="#A4A7AE"/>
                    </svg>
                </div>
                <p style={{color:'var(--Courses-Gray-Gray-600)',textAlign:'left',marginTop:4}}>
                    Lorem ipsum dolor sit amet consectetur. Diam tristique sed sit egestas viverra tempor. Sem dolor
                    ullamcorper elementum faucibus.
                </p>
                <div className="w-full">
                    <small style={{color: 'var(--Courses-Base-Black)',marginBottom:4}}>
                        Email
                    </small>
                    <Input placeholder='email@gmail.com' setValue={setEmail} value={email}/>
                </div>
                <div className="modal__buttons">
                    <Button onClick={closeModal} label='Cancel' secondary={true}/>
                    <Button onClick={closeModal} label='Confirm'/>
                </div>
            </div>
        </div>
    )
}
export default Modal;