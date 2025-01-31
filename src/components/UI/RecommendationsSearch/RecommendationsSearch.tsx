'use client'
import '../Events/Events.css'
import React, {useRef} from "react";
import CardSchoolSearch from "@/components/UI/CardSchoolSearch/CardSchoolSearch";
import {ISchool} from "@/utils/interfaces";
interface ISchools {
    schools:ISchool[]
}
const RecommendationsSearch: React.FC<ISchools> = ({schools}) => {
    const eventsRef = useRef(null);
    const scroll = (direction: string) => {
        const scrollAmount = 413;
        if (eventsRef.current) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            eventsRef.current.scrollBy({
                left: direction === 'right' ? scrollAmount : -scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="events search__recommendations">
            <div className="events__block schools__recommendations" ref={eventsRef}>
                <span style={{height: "auto"}}/>
                {schools.map((school, index) => (
                    <CardSchoolSearch key={index}
                        {...school}/>
                ))
                }
                <span style={{height: "auto"}}/>
            </div>
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
export default RecommendationsSearch;