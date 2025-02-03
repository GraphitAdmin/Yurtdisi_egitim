'use client'
import '../../UI/Events/Events.css'
import React, {useRef} from "react";
import {ISchool} from "@/utils/interfaces";
import RelatedSchool from "@/components/school/RelatedSchools/RelatedSchool";
interface IRelatedSchools {
    relatedSchools:ISchool[];
}
const RelatedSchools: React.FC<IRelatedSchools> =({relatedSchools})=>{
    const eventsRef = useRef(null);
    const scroll = (direction:string) => {
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
    if(relatedSchools.length === 0){
        return(<></>)
    }
    return(
        <div className="events" style={{marginBottom:64,marginTop:0,paddingTop:0}}>
            <div className="events__first">
                <div className="events__header">
                    <h2 style={{textAlign:'left',width:'100%'}}>
                        Related schools
                    </h2>
                </div>
                <p className="events__header__p">
                    Lorem ipsum dolor sit amet consectetur. Sit vulputate sed iaculis nisi nulla phasellus massa
                    nulla tellus. </p>
            </div>
            <div className="events__block" ref={eventsRef}>
                <span style={{height: "auto"}}/>
                {relatedSchools.map((relatedSchool, index) => (
                    <RelatedSchool key={index}
                                   imgPost={relatedSchool.image_right}
                                   title={relatedSchool.title}
                                   description={relatedSchool.school_overview}
                                   link={'/' + relatedSchool.education_type.replace(/ /g, '-').toLowerCase() + '/' + relatedSchool.country.replace(/ /g, '-').toLowerCase() + '/' + relatedSchool.city.replace(/ /g, '-').toLowerCase() + '/' + relatedSchool.title.replace(/ /g, '-').toLowerCase()}/>
                ))}
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
export default RelatedSchools;