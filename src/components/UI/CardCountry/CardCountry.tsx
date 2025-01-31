import Image from "next/image";
import React from "react";
import './CardCountry.css';
import Link from "next/link";
import {ICountry} from "@/utils/interfaces";

const CardCountry: React.FC<ICountry> = ({imgPost, name,link,capital,population,language}) => {
    console.log(link)
    return (
        <Link className="card__country" href={link}>
            <Image className="w-full" src={imgPost} alt="Country"/>
            <h4>{name}</h4>
            <div>
                <p>Capital:&nbsp;<span>{capital}</span></p>
                <p>Population:&nbsp;<span>{population}</span></p>
                <p>Official language:&nbsp;<span>{language}</span></p>
            </div>
        </Link>
    )
}
export default CardCountry