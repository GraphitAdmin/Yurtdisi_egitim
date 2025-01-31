'use client'
import React, {useEffect, useState} from "react";
import {IBlog} from "@/utils/interfaces";
import '../eventsContent/eventsContent.css'
import {Loader2} from "lucide-react";
import {blobUrl} from "@/utils/utils";
import CardReference from "@/components/UI/CardReference/CardReference";

const ReferencesContent = () => {
    const [blogs,setBlogs]=useState<IBlog[]>([]);
    const [loading,setLoading]=useState(true);
    const [showEvents, setShowEvents] = useState<IBlog[]>()

    useEffect(() => {
        fetch(`${blobUrl}jsons/references.json`, {
            cache: "no-store",
            next: {revalidate: 1},
        })
            .then((response) => response.json())
            .then((data: IBlog[]) => {
                setBlogs(data);
                setShowEvents(data.slice(0, 9))
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                console.error(err);
            });
        console.log(blogs)
    }, []);
    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary"/>
            </div>
        )
    }
    return (
        <div className="page__container">
            <div style={{width: '100%'}}>
                <h1>Our student references</h1>
                <p>
                    Our students who studied abroad have listed their experiences abroad, their education and their comments about Global Overseas Education.
                </p>
            </div>
            <div className="events__page">
                {
                    showEvents && showEvents.map((blog, index) =>
                        <CardReference key={index} {...blog} />
                    )
                }
            </div>
        </div>
    )
}
export default ReferencesContent;