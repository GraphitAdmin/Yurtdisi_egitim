import Image from "next/image";
import React from "react";
import '../Event/Event.css';
import Link from "next/link";
import {blobUrl} from "@/utils/utils";
import {IBlog} from "@/utils/interfaces";

const CardReference: React.FC<IBlog> = ({image, title, description}) => {
    return (
        <Link className="events__post"
              href={'/our-student-references/' + title.replace(/ /g, '-').toLowerCase()}>
            <Image width={720}
                   height={572} className="w-full" src={blobUrl+image} alt={title}/>
            <div className="flex flex-row justify-between w-full" style={{marginTop:12}}>
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
export default CardReference