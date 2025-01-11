'use client'
import './Popular.css'
import Button from "@/components/UI/Button/Button";
import SchoolImage from "@/assets/home/Mill_School.png";
import PopularSchoolCard from "@/components/UI/PopularSchoolCard/PopularSchoolCard";
import {useEffect, useRef, useState} from "react";
import {IPopularSchool} from "@/interfaces/interfaces";

const Popular = () => {
    const schoolsRef = useRef(null);
    const [popularSchools, setPopularSchools] = useState<IPopularSchool[]>([])
    useEffect(() => {
        setPopularSchools([
            {
                imgPost: SchoolImage,
                link: '/event'
            },
            {
                imgPost: SchoolImage,
                link: '/event'
            },
            {
                imgPost: SchoolImage,
                link: '/event'
            },
            {
                imgPost: SchoolImage,
                link: '/event'
            },
            {
                imgPost: SchoolImage,
                link: '/event'
            },
            {
                imgPost: SchoolImage,
                link: '/event'
            },
        ])
    }, [])
    const scroll = (direction: string) => {
        if (schoolsRef.current) {
            const scrollAmount=window.innerWidth-48;
            console.log(scrollAmount)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            schoolsRef.current.scrollBy({
                left: direction === 'right' ? scrollAmount : -scrollAmount,
                behavior: 'smooth'
            });
        }
    };
    return (
        <div className="popular">
            <div>
                <h2>
                    Popular schools
                </h2>
                <p style={{color: 'var(--Courses-Gray-Gray-500)', marginTop: 8}}>
                    Lorem ipsum dolor sit amet consectetur. Sit vulputate sed iaculis nisi nulla phasellus massa nulla
                    tellus.
                </p>
            </div>
            <div className="popular__schools" ref={schoolsRef}>
                {popularSchools.map((school, index) => (
                    <PopularSchoolCard key={index} {...school}/>
                ))}
            </div>
            <Button label='Show more'/>
            <div className="rounded__buttons">
                <div onClick={() => scroll('left')} style={{cursor: 'pointer'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M10 18L4 12L10 6L11.4 7.45L7.85 11H20V13H7.85L11.4 16.55L10 18Z" fill="#717680"/>
                    </svg>
                </div>
                <div onClick={() => scroll('right')} style={{cursor: 'pointer'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M14 18L12.6 16.55L16.15 13H4V11H16.15L12.6 7.45L14 6L20 12L14 18Z" fill="#717680"/>
                    </svg>
                </div>
            </div>
        </div>
    )
}
export default Popular;