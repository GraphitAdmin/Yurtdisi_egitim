import Image from "next/image";
import React from "react";
import '../CardCountry/CardCountry.css';
import Link from "next/link";
import {CardCityProps} from "@/interfaces/interfaces";
import Button from "@/components/UI/Button/Button";

const CardSchoolSearchResults: React.FC<CardCityProps> = ({imgPost, title,link,description,buttonDetails}) => {
    return (
        <Link className="card__country" style={{gap:'8px!important'}} href={link}>
            <Image className="w-full" src={imgPost} alt="Country"/>
            <h4 style={{marginTop:12}}>{title}</h4>
            <p style={{color: 'var(--Courses-Gray-Gray-500)',textOverflow:'ellipsis',maxHeight:72,overflow:'hidden',textAlign:'left'}}>
                {description}
            </p>
            {buttonDetails&&
            <Button label={'School details'} btnStyle={{marginTop:16,width:'100%',padding:'12px 0'}}/>
            }
        </Link>
    )
}
export default CardSchoolSearchResults