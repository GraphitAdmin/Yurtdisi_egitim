import Image from "next/image";
import React from "react";
import '../Event/Event.css';
import Link from "next/link";
import {IBlog} from "@/utils/interfaces";
import {blobUrl} from "@/utils/utils";

const Card: React.FC<IBlog> = ({image, minutes_to_read, title, date, description}) => {
    return (
        <Link className="events__post"
              href={'/blog/' + title.replace(/ /g, '-').toLowerCase()}>
            <Image width={720}
                   height={572} className="w-full" src={blobUrl+image} alt={title}/>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 8,
                width: '100%',
                marginTop: 12,
                alignItems: "center"
            }}>
                <p style={{color: 'var(--Courses-Brand-Blue-600)',maxHeight:24,minHeight:24}}>{date}</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4" fill="none">
                    <circle cx="2" cy="2" r="2" fill="var(--Courses-Brand-Blue-500)"/>
                </svg>
                <p style={{color: 'var(--Courses-Brand-Blue-600)',maxHeight:24,minHeight:24}}>{minutes_to_read} min read</p>
            </div>
            <div className="flex flex-row justify-between w-full">
                <h5 style={{textAlign: 'left', maxWidth: '90%'}}>{title}</h5>
                <svg style={{marginTop: 3}} xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                     viewBox="0 0 24 24" fill="none">
                    <path d="M6.4 18L5 16.6L14.6 7H6V5H18V17H16V8.4L6.4 18Z" fill="#102A56"/>
                </svg>
            </div>
            <p style={{textAlign: 'left'}}>{description}</p>
        </Link>
    )
}
export default Card