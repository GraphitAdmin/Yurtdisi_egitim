'use client'
import React, {useEffect, useState} from "react";
import {IEvent} from "@/utils/interfaces";
import Event from "@/components/UI/Event/Event";
import './eventsContent.css'
import {blobUrl} from "@/utils/utils";
const EventsContent = () => {
    const [events,setEvents] = useState<IEvent[]>([])
    const [showEvents, setShowEvents] = useState<IEvent[]>()
    useEffect(() => {
        const fetchJson = async () => {
            const localSchools = localStorage.getItem('events')
            if (localSchools !== undefined && localSchools !== null) {
                const localArray: IEvent[] = JSON.parse(localSchools);
                setEvents(localArray)
                setShowEvents(localArray.slice(0, 9))
            }
            try {
                const schoolsUrl = blobUrl + 'jsons/events.json';
                const response = await fetch(schoolsUrl, {
                    cache: 'no-store',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch JSON');
                }
                const jsonData = await response.json();
                setEvents(jsonData);
                setShowEvents(jsonData.slice(0, 9))
                localStorage.setItem('events', JSON.stringify(jsonData));
            } catch (err) {
                console.log(err);
            }
        };
        fetchJson().then()
        console.log(events)
    }, [])
    return (
        <div className="page__container">
            <div style={{width: '100%'}}>
                <h1>Our event calendar</h1>
                <p>
                    Officials from the world&#39;s most prestigious schools that work with us visit our office.
                </p>
            </div>
            <div className="events__page">
                {
                    showEvents && showEvents.map((event, index) =>
                        <Event key={index} {...event}/>
                    )
                }
            </div>
        </div>
    )
}
export default EventsContent;