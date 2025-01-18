import Image from "next/image";
import React from "react";
import './PopularSchoolCard.css';
import Link from "next/link";
import {PopularSchoolCardProps} from "@/utils/interfaces";
import Button from "@/components/UI/Button/Button";

const PopularSchoolCard: React.FC<PopularSchoolCardProps> = ({imgPost,link}) => {
    return (
        <Link className="popular__school__card" href={link}>
            <Image className="h-full" src={imgPost} alt="Post"/>
            <div className="popular__school__card__button">
                <Button label='Learn More'/>
            </div>
        </Link>
    )
}
export default PopularSchoolCard