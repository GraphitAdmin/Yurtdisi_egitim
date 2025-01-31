import Image from "next/image";
import React from "react";
import '../../UI/Event/Event.css';
import {IRelated} from "@/utils/interfaces";
import Link from "next/link";
import Button from "@/components/UI/Button/Button";

const RelatedSchool: React.FC<IRelated> = ({imgPost,title, link, description}) => {
    return (
        <Link href={link} className="events__post">
            <Image className="w-full" src={imgPost} alt="Post"/>
            <h5 style={{textAlign: 'left',marginTop:12}}>{title}</h5>
            <p style={{textAlign: 'left'}}>{description}</p>
            <Button label='School details' btnStyle={{width:'100%',padding:'12px 0',marginTop:16}}/>
        </Link>
    )
}
export default RelatedSchool