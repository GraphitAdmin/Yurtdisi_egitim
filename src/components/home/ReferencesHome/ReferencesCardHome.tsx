'use client'
import React from "react";
import Link from "next/link";
import {IBlog} from "@/utils/interfaces";
import {blobUrl} from "@/utils/utils";

interface AbroadCardProps {
    big: boolean;
    blog:IBlog
}

const ReferencesCardHome: React.FC<AbroadCardProps> =({big,blog})=> {
    return(
        <Link href={'/our-student-references/'+blog.title.replace(/ /g, '-').toLowerCase()} className={big?"abroad__card big__card":"abroad__card small__card"}
             style={{
                 backgroundImage: `linear-gradient(180deg, rgba(16, 42, 86, 0.00) 19.99%, rgba(16, 42, 86, 0.70) 100%), url(${blobUrl+blog.image})`,
             }}
        >
            <h3>{blog.title}</h3>
        </Link>
    )
}
export default ReferencesCardHome