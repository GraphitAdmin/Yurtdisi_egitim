import Image from "next/image";
import React from "react";
import '../CardCountry/CardCountry.css';
import Link from "next/link";
import {ISchool} from "@/utils/interfaces";
import Button from "@/components/UI/Button/Button";
import {blobUrl} from "@/utils/utils";

const CardSchoolSearchResults: React.FC<ISchool> = ({images, title, country,city,education_type, school_overview}) => {
    return (
        <Link className="card__country" style={{gap:'8px!important'}} href={
            '/'+education_type.replace(/ /g, '-').toLowerCase()+'/'+
            country.replace(/ /g, '-').toLowerCase()+'/'+
            city.replace(/ /g, '-').toLowerCase()+'/'+
            title.replace(/ /g, '-').toLowerCase()+'/'
        }>
            <Image className="w-full"
                   width={720}
                   height={572} src={blobUrl + images[0]} alt="School"/>
            <h4 style={{marginTop:12,textAlign:"left",maxHeight:64,minHeight:64}}>{title}</h4>
            <p style={{color: 'var(--Courses-Gray-Gray-500)',textOverflow:'ellipsis',maxHeight:48,minHeight:48,overflow:'hidden',textAlign:'left'}}>
                {school_overview}
            </p>
            <Button label={'School details'} btnStyle={{marginTop:"12",width:'100%',padding:'12px 0'}}/>
        </Link>
    )
}
export default CardSchoolSearchResults