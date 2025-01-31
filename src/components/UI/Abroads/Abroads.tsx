'use client'
import '../Events/Events.css'
import Button from "@/components/UI/Button/Button";
import React, {useEffect, useRef, useState} from "react";
import {IBlog} from "@/utils/interfaces";
import Card from "@/components/UI/Card/Card";
const Abroads =()=>{
    const eventsRef = useRef(null);
    const [blogs, setBlogs] = useState<IBlog[]>([])
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
    const blobUrl = "https://i9ozanmrsquybgxg.public.blob.vercel-storage.com/";

    useEffect(() => {
        fetch(`${blobUrl}jsons/blogs.json`, {
            cache: "no-store",
            next: {revalidate: 1},
        })
            .then((response) => response.json())
            .then((data: IBlog[]) => {
                setBlogs(data.slice(0, 9));
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);
    return(
        <div className="events" style={{marginBottom:64}}>
            <div className="events__first">
                <div className="events__header">
                    <h2 style={{textAlign:'left'}}>
                        About language schools abroad
                    </h2>
                    <Button label="View all blogs"/>
                </div>
                <p className="events__header__p">
                    Lorem ipsum dolor sit amet consectetur. Sit vulputate sed iaculis nisi nulla phasellus massa
                    nulla tellus. </p>
            </div>
            <div className="events__block" ref={eventsRef}>
                <span style={{height: "auto"}}/>
                {blogs.map((blog, index) => (
                    <Card key={index} {...blog} />
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
export default Abroads;