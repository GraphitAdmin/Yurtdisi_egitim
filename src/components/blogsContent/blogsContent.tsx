'use client'
import Button from "@/components/UI/Button/Button";
import React, {useEffect, useState} from "react";
import {CardProps} from "@/utils/interfaces";
import '../eventsContent/eventsContent.css'
import ImageCard from "@/assets/home/Illustration.png";
import Card from "@/components/UI/Card/Card";

const BlogsContent = () => {
    const blogs = [
        {
            imgPost: ImageCard,
            title: "What are TOEFL and IELTS and what are they not?",
            description: "An official from College Alpin Beau Soleil, one of the most prestigious colleges in Switzerland, founded in 1910, is coming to our office. Interested parents and students can attend the meeting by making an appointment.",
            date: "13 January 2024",
            time: '8',
            link: "",
        },
        {
            imgPost: ImageCard,
            title: "What are TOEFL and IELTS and what are they not?",
            description: "An official from College Alpin Beau Soleil, one of the most prestigious colleges in Switzerland, founded in 1910, is coming to our office. Interested parents and students can attend the meeting by making an appointment.",
            date: "13 January 2024",
            time: '8',
            link: "",
        },
        {
            imgPost: ImageCard,
            title: "What are TOEFL and IELTS and what are they not?",
            description: "An official from College Alpin Beau Soleil, one of the most prestigious colleges in Switzerland, founded in 1910, is coming to our office. Interested parents and students can attend the meeting by making an appointment.",
            date: "13 January 2024",
            time: '8',
            link: "",
        },
        {
            imgPost: ImageCard,
            title: "What are TOEFL and IELTS and what are they not?",
            description: "An official from College Alpin Beau Soleil, one of the most prestigious colleges in Switzerland, founded in 1910, is coming to our office. Interested parents and students can attend the meeting by making an appointment.",
            date: "13 January 2024",
            time: '8',
            link: "",
        },
        {
            imgPost: ImageCard,
            title: "What are TOEFL and IELTS and what are they not?",
            description: "An official from College Alpin Beau Soleil, one of the most prestigious colleges in Switzerland, founded in 1910, is coming to our office. Interested parents and students can attend the meeting by making an appointment.",
            date: "13 January 2024",
            time: '8',
            link: "",
        },
        {
            imgPost: ImageCard,
            title: "What are TOEFL and IELTS and what are they not?",
            description: "An official from College Alpin Beau Soleil, one of the most prestigious colleges in Switzerland, founded in 1910, is coming to our office. Interested parents and students can attend the meeting by making an appointment.",
            date: "13 January 2024",
            time: '8',
            link: "",
        },
        {
            imgPost: ImageCard,
            title: "What are TOEFL and IELTS and what are they not?",
            description: "An official from College Alpin Beau Soleil, one of the most prestigious colleges in Switzerland, founded in 1910, is coming to our office. Interested parents and students can attend the meeting by making an appointment.",
            date: "13 January 2024",
            time: '8',
            link: "",
        },
        {
            imgPost: ImageCard,
            title: "What are TOEFL and IELTS and what are they not?",
            description: "An official from College Alpin Beau Soleil, one of the most prestigious colleges in Switzerland, founded in 1910, is coming to our office. Interested parents and students can attend the meeting by making an appointment.",
            date: "13 January 2024",
            time: '8',
            link: "",
        },
        {
            imgPost: ImageCard,
            title: "What are TOEFL and IELTS and what are they not?",
            description: "An official from College Alpin Beau Soleil, one of the most prestigious colleges in Switzerland, founded in 1910, is coming to our office. Interested parents and students can attend the meeting by making an appointment.",
            date: "13 January 2024",
            time: '8',
            link: "",
        }, {
            imgPost: ImageCard,
            title: "What are TOEFL and IELTS and what are they not?",
            description: "An official from College Alpin Beau Soleil, one of the most prestigious colleges in Switzerland, founded in 1910, is coming to our office. Interested parents and students can attend the meeting by making an appointment.",
            date: "13 January 2024",
            time: '8',
            link: "",
        },
        {
            imgPost: ImageCard,
            title: "What are TOEFL and IELTS and what are they not?",
            description: "An official from College Alpin Beau Soleil, one of the most prestigious colleges in Switzerland, founded in 1910, is coming to our office. Interested parents and students can attend the meeting by making an appointment.",
            date: "13 January 2024",
            time: '8',
            link: "",
        },
        {
            imgPost: ImageCard,
            title: "What are TOEFL and IELTS and what are they not?",
            description: "An official from College Alpin Beau Soleil, one of the most prestigious colleges in Switzerland, founded in 1910, is coming to our office. Interested parents and students can attend the meeting by making an appointment.",
            date: "13 January 2024",
            time: '8',
            link: "",
        }, {
            imgPost: ImageCard,
            title: "What are TOEFL and IELTS and what are they not?",
            description: "An official from College Alpin Beau Soleil, one of the most prestigious colleges in Switzerland, founded in 1910, is coming to our office. Interested parents and students can attend the meeting by making an appointment.",
            date: "13 January 2024",
            time: '8',
            link: "",
        },
        {
            imgPost: ImageCard,
            title: "What are TOEFL and IELTS and what are they not?",
            description: "An official from College Alpin Beau Soleil, one of the most prestigious colleges in Switzerland, founded in 1910, is coming to our office. Interested parents and students can attend the meeting by making an appointment.",
            date: "13 January 2024",
            time: '8',
            link: "",
        },
        {
            imgPost: ImageCard,
            title: "What are TOEFL and IELTS and what are they not?",
            description: "An official from College Alpin Beau Soleil, one of the most prestigious colleges in Switzerland, founded in 1910, is coming to our office. Interested parents and students can attend the meeting by making an appointment.",
            date: "13 January 2024",
            time: '8',
            link: "",
        },


    ]
    const [showCountriesButton, setShowCountriesButton] = useState(false)

    const [showEvents, setShowEvents] = useState<CardProps[]>()
    useEffect(() => {
        setShowEvents(blogs.slice(0, 9))
    }, [])
    return (
        <div className="page__container">
            <div style={{width: '100%'}}>
                <h1>Our blog posts</h1>
                <p>
                    All the topics you are curious about about education abroad are on this page.
                </p>
            </div>
            <div className="events__page">
                {
                    showEvents && showEvents.map((blog, index) =>
                        <Card key={index} {...blog} />
                    )
                }
            </div>
            {!showCountriesButton &&
                <Button onClick={() => {
                    setShowCountriesButton(true)
                    setShowEvents(blogs)
                }} label={'Show all blogs'}/>
            }
        </div>
    )
}
export default BlogsContent;