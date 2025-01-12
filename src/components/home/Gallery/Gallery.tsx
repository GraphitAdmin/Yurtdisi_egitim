'use client'
import Image from "next/image";
import ImageCard from "@/assets/home/Illustration.png";
import Button from "@/components/UI/Button/Button";
import {useState} from "react";

const Gallery =()=>{
    const [showAll,setShowAll] = useState(false)
    return<>
        <div className="abroad__programs" style={{paddingBottom: '0!important'}}>
            <div>
                <h2>
                    Gallery
                </h2>
                <p style={{marginTop: 16, color: 'var(--Courses-Gray-Gray-500)'}}>
                    From our University, High School and Language Schools
                </p>
            </div>
            <div className={showAll ? "gallery__block show__all" : "gallery__block"}>
                <div className={showAll ? "gallery__block__background__none" : "gallery__block__background"}/>
                <Image src={ImageCard} alt=""/>
                <Image src={ImageCard} alt=""/>
                <Image src={ImageCard} alt=""/>
                <Image src={ImageCard} alt=""/>
                <Image src={ImageCard} alt=""/>
                <Image src={ImageCard} alt=""/>
                <Image src={ImageCard} alt=""/>
                <Image src={ImageCard} alt=""/>
                <Image src={ImageCard} alt=""/>
                <Image src={ImageCard} alt=""/>
                <Image src={ImageCard} alt=""/>
                <Image src={ImageCard} alt=""/>
            </div>
            <Button label={showAll ? 'Collapse' : 'Load more'} onClick={() => setShowAll(!showAll)}/>
        </div>
    </>
}
export default Gallery;
