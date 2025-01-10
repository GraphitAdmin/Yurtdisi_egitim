import Image from "next/image";
import React from "react";
import './CardCountry.css';
import Link from "next/link";
import {CardCountryProps} from "@/interfaces/interfaces";

const CardCountry: React.FC<CardCountryProps> = ({imgPost, title,link,capital,population,language}) => {
    return (
        <Link className="card__country" href={link}>
            <Image className="w-full" src={imgPost} alt="Country"/>
            <h4>{title}</h4>
            <div>
                <p>Capital:&nbsp;<span>{capital}</span></p>
                <p>Population:&nbsp;<span>{population}</span></p>
                <p>Official language:&nbsp;<span>{language}</span></p>
            </div>
        </Link>
    )
}
export default CardCountry