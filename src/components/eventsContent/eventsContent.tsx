'use client'
import Button from "@/components/UI/Button/Button";
import React, {useEffect, useState} from "react";
import {IEvent} from "@/utils/interfaces";
import Event from "@/components/UI/Event/Event";
import './eventsContent.css'
const EventsContent = () => {
    const [events,setEvents] = useState<IEvent[]>([])
    const [showCountriesButton, setShowCountriesButton] = useState(false)

    const [showEvents, setShowEvents] = useState<IEvent[]>()
    useEffect(() => {
        setShowEvents(events.slice(0, 9))
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
            {!showCountriesButton &&
                <Button onClick={() => {
                    setShowCountriesButton(true)
                    setShowEvents(events)
                }} label={'Show all events'}/>
            }
        </div>
    )
}
export default EventsContent;