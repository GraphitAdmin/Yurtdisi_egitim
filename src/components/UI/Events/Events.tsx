'use client'
import './Events.css'
import Button from "@/components/UI/Button/Button";
import Event from "@/components/UI/Event/Event";
import ImageEvent from "@/assets/home/Illustration.png"
import {useEffect, useRef, useState} from "react";
import {IEvent} from "@/utils/interfaces";
const Events =()=>{
    const eventsRef = useRef(null);
    const [events, setEvents] = useState<IEvent[]>([])
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
    useEffect(()=>{
        setEvents([
            {
                imgPost:ImageEvent,
                type:'Language education',
                title:'College Alpin Beau Soleil',
                description:'An official from College Alpin Beau Soleil, one of the most prestigious colleges in Switzerland, founded in 1910, is coming to our office. Interested parents and students can attend the meeting by making an appointment.',
                date:'01.01.2025',
                time:'10:00 - 15:00',
                location:'Switzerland',
                link:'/our-event-calendar'
            },
            {
                imgPost:ImageEvent,
                type:'Language education',
                title:'College Alpin Beau Soleil',
                description:'An official from College Alpin Beau Soleil, one of the most prestigious colleges in Switzerland, founded in 1910, is coming to our office. Interested parents and students can attend the meeting by making an appointment.',
                date:'01.01.2025',
                time:'10:00 - 15:00',
                location:'Switzerland',
                link:'/our-event-calendar'
            },{
                imgPost:ImageEvent,
                type:'Language education',
                title:'College Alpin Beau Soleil',
                description:'An official from College Alpin Beau Soleil, one of the most prestigious colleges in Switzerland, founded in 1910, is coming to our office. Interested parents and students can attend the meeting by making an appointment.',
                date:'01.01.2025',
                time:'10:00 - 15:00',
                location:'Switzerland',
                link:'/our-event-calendar'
            },{
                imgPost:ImageEvent,
                type:'Language education',
                title:'College Alpin Beau Soleil',
                description:'An official from College Alpin Beau Soleil, one of the most prestigious colleges in Switzerland, founded in 1910, is coming to our office. Interested parents and students can attend the meeting by making an appointment.',
                date:'01.01.2025',
                time:'10:00 - 15:00',
                location:'Switzerland',
                link:'/our-event-calendar'
            },{
                imgPost:ImageEvent,
                type:'Language education',
                title:'College Alpin Beau Soleil',
                description:'An official from College Alpin Beau Soleil, one of the most prestigious colleges in Switzerland, founded in 1910, is coming to our office. Interested parents and students can attend the meeting by making an appointment.',
                date:'01.01.2025',
                time:'10:00 - 15:00',
                location:'Switzerland',
                link:'/our-event-calendar'
            },
        ])
    },[])
    return(
        <div className="events">
            <div className="events__first">
                <div className="events__header">
                    <h2>
                        Upcoming events
                    </h2>
                    <Button href='/our-event-calendar' label="View more"/>
                </div>
                <p className="events__header__p">
                    Lorem ipsum dolor sit amet consectetur. Sit vulputate sed iaculis nisi nulla phasellus massa
                    nulla tellus. </p>
            </div>
            <div className="events__block" ref={eventsRef}>
                <span style={{height: "auto"}}/>
                {events.map((event, index) => (
                    <Event key={index} {...event}/>
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
export default Events;