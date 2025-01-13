import Image from "next/image";
import React from "react";
import '../Event/Event.css';
import {IAbroad} from "@/interfaces/interfaces";
import Link from "next/link";
const Abroad: React.FC<IAbroad> = ({imgPost, date, time, title,link, description}) => {
    return (
        <Link href={link} className="events__post abroad__post">
            <Image className="w-full" src={imgPost} alt="Post"/>
            <div style={{display: 'flex', flexDirection: 'row', gap: 8,
                width: '100%',alignItems:"center",
            marginTop:12}}>
                <p style={{
                    color: 'var(--courses-brand-blue-400-brand)',
                    fontWeight: 600,
                    fontSize: '14px',
                }}>{date}</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4" fill="none">
                    <circle cx="2" cy="2" r="2" fill="#2E90FA"/>
                </svg>
                <p style={{
                    color: 'var(--courses-brand-blue-400-brand)',
                    fontWeight: 600,
                    fontSize: '14px',
                }}>{time} min read</p>
            </div>
            <div style={{display: "flex", justifyContent: 'space-between', gap: 16, width: '100%'}}>
                <h5 style={{textAlign: 'left'}}>{title}</h5>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M6.4 18L5 16.6L14.6 7H6V5H18V17H16V8.4L6.4 18Z"
                          style={{fill:"var(--Courses-Brand-Blue-800)"}}
                          fill="var(--Courses-Brand-Blue-800)"/>
                </svg>
            </div>
            <p style={{textAlign: 'left'}}>{description}</p>
        </Link>
    )
}
export default Abroad