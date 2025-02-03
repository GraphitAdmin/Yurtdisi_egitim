import Image from "next/image";
import React from "react";
import '../CardCountry/CardCountry.css';
import Link from "next/link";
import {CardCityProps} from "@/utils/interfaces";
import Button from "@/components/UI/Button/Button";
import {blobUrl} from "@/utils/utils";

const CardCity: React.FC<CardCityProps> = ({image_string, title, link, description, buttonDetails}) => {
    return (
        <Link className={buttonDetails ? "card__country card__school" : "card__country card__city"} style={{gap: '8px!important'}}
              href={link}>
            <Image width={273} height={152} className="w-full" src={blobUrl+image_string} alt={title}/>
            <h4 style={{marginTop: 12}}>{title}</h4>
            <p style={{
                color: 'var(--Courses-Gray-Gray-500)',
                textOverflow: 'ellipsis',
                maxHeight: 72,
                minHeight:72,
                overflow: 'hidden',
                textAlign: 'left'
            }}>
                {description}
            </p>
            {buttonDetails &&
                <Button label={'School details'} btnStyle={{marginTop: 16, width: '100%', padding: '12px 0'}}/>
            }
        </Link>
    )
}
export default CardCity