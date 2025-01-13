'use client'
import React from "react";
import {StaticImageData} from "next/image";
import Link from "next/link";

interface AbroadCardProps {
    big: boolean;
    header:string;
    imgCard: StaticImageData;
    link: string;
}

const AbroadCard: React.FC<AbroadCardProps> =({big,header,imgCard,link})=> {
    return(
        <Link href={link} className={big?"abroad__card big__card":"abroad__card small__card"}
             style={{
                 backgroundImage: `linear-gradient(180deg, rgba(16, 42, 86, 0.00) 19.99%, rgba(16, 42, 86, 0.70) 100%), url(${imgCard.src})`,
             }}
        >
            <h3>{header}</h3>
        </Link>
    )
}
export default AbroadCard