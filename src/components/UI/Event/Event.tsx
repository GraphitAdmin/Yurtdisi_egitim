'use client'
import Image from "next/image";
import React, {useEffect, useState} from "react";
import './Event.css';
import Button from "@/components/UI/Button/Button";
import {IEvent} from "@/utils/interfaces";
import { PopupButton } from "react-calendly";
import {blobUrl} from "@/utils/utils";

const Event: React.FC<IEvent> = ({image,type, date, timeStart,timeEnd, title, location,link, description}) => {
    const [rootElement, setRootElement] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setRootElement(document.getElementById("__next"))
        }
    }, [])

    return (
        <div className="events__post">
            <Image  width={381}
                   height={224} className="w-full" src={blobUrl+image} alt={title}/>
            <small style={{marginTop:12}}>{type}</small>
            <h5 style={{textAlign: 'left',marginTop:8}}>{title}</h5>
            <p style={{textAlign: 'left'}}>{description}</p>
            <svg style={{marginBottom:8,maxWidth:'100%',marginTop:'auto'}} xmlns="http://www.w3.org/2000/svg" height="2" viewBox="0 0 381 2" fill="none">
                <path d="M0 1H381" stroke="#E9EAEB"/>
            </svg>
            <div style={{display: 'flex', flexDirection: 'row',gap:12,width:'100%'}}>
                <p style={{
                    color: 'var(--Courses-Base-Black)',
                    fontWeight:600
                }}>{date}</p>
                <p>{timeStart}-{timeEnd}</p>
                <p style={{
                    color: 'var(--Courses-Base-Black)',
                    fontWeight:600,
                    marginLeft:"auto"
                }}>{location}</p>
            </div>
            <div className="events__buttons">
                <PopupButton
                    url="https://calendly.com/bozhovskiy18/test"
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    rootElement={rootElement}
                    text="Book a meeting"
                    styles={{
                    width:'100%',
                        cursor: 'pointer',
                        borderRadius: 8,
                        padding: '12px 24px',
                        background: 'var(--Courses-Brand-Blue-500)',
                        color:'white',
                        whiteSpace:'nowrap',
                        fontWeight:600,fontSize:16,
                        fontFamily: 'var(--font-urbanist)'
                    }}
                />
                <Button label='School details' href={link} btnStyle={{width:'100%'}} secondary={true}/>
            </div>

        </div>
    )
}
export default Event