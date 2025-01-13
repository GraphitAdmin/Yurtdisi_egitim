'use client'
import '../Events/Events.css'
import React, { useRef} from "react";
import UK from "@/assets/countries/UK.png";
import CardSchoolSearch from "@/components/UI/CardSchoolSearch/CardSchoolSearch";

const RecommendationsSearch = () => {
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
                {Array.from({length: 9}, ((_, index) => (
                    <CardSchoolSearch key={index}
                              title='London School'
                              imgPost={UK}
                              description={'Located in the southeast of England, Oxford is home to the world\'s most famous university, Oxford University. Located 80 kilometers from the capital London and accessible 24 hours a day, Oxford is the center of cultural activity in England with a student population of 30%. The historic buildings of Oxford University, spread throughout the city, attract tens of thousands of tourists to Oxford every year. The many parks in the city allow the greenery to merge with a historical texture and create fascinating, peaceful landscapes. Oxford, which also hosts many language schools for English language education, is a great destination for those who want to study in England.'}
                              link={'/language-schools/united-kingdom/london'} buttonDetails={true}/>
                )))
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