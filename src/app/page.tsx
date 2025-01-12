'use client'
import './home.css'
import Navbar from "@/components/UI/Navbar/Navbar";
import AbroadPrograms from "@/components/home/AbroadPrograms/AbroadPrograms";
import Metrics from "@/components/home/Metrics/Metrics";
import CRM from "@/components/home/CRM/CRM";
import Popular from "@/components/home/Popular/Popular";
import Events from "@/components/home/Events/Events";
import BlockCard from "@/components/home/BlockCard/BlockCard";
import ImageCard from "@/assets/home/Illustration.png";
import FAQSection from "@/components/home/FAQSection/FAQSection";
import Subscribe from "@/components/UI/FAQ/Subscribe";
import HomeSearch from "@/components/home/HomeSearch/HomeSearch";
import ReviewBlock from "@/components/home/ReviewBlock/ReviewBlock";
import Companies from "@/components/home/Companies/Companies";
import AbroadCard from "@/components/home/AbroadPrograms/AbroadCard";
import ImageProgram from "@/assets/home/program.jpg";
import Image from "next/image"
import Button from "@/components/UI/Button/Button";
import {useState} from "react";
export default function Home() {
    const references=[
        {imgPost:ImageCard,
            title:"What are TOEFL and IELTS and what are they not?",
            description:"An official from College Alpin Beau Soleil, one of the most prestigious colleges in Switzerland, founded in 1910, is coming to our office. Interested parents and students can attend the meeting by making an appointment.",
            date:"13 January 2024",
            time:'8',
            link:"",
        },
        {imgPost:ImageCard,
            title:"What are TOEFL and IELTS and what are they not?",
            description:"An official from College Alpin Beau Soleil, one of the most prestigious colleges in Switzerland, founded in 1910, is coming to our office. Interested parents and students can attend the meeting by making an appointment.",
            date:"13 January 2024",
            time:'8',
            link:"",
        },
        {imgPost:ImageCard,
            title:"What are TOEFL and IELTS and what are they not?",
            description:"An official from College Alpin Beau Soleil, one of the most prestigious colleges in Switzerland, founded in 1910, is coming to our office. Interested parents and students can attend the meeting by making an appointment.",
            date:"13 January 2024",
            time:'8',
            link:"",
        }
    ]
    const [showAll,setShowAll] = useState(false)
    return (
        <div>
            <div className="home__container">
                <Navbar home={true}/>
                <div className="home__container__text">
                    <h1 style={{color: 'white'}}>
                        The gateway to world universities
                    </h1>
                    <p>Lorem ipsum dolor sit amet consectetur. Elit dignissim potenti lorem tristique consequat.
                        Ultrices
                        diam vitae mauris at ut nunc nullam.</p>
                </div>
                <HomeSearch/>
            </div>
            <Companies/>
            <AbroadPrograms/>
            <Metrics/>
            <CRM/>
            <Popular/>
            <Events/>
            <ReviewBlock/>
            <div className="abroad__programs" style={{paddingBottom:'0!important'}}>
                <div>
                    <h2>
                        Gallery
                    </h2>
                    <p style={{marginTop: 16,color: 'var(--Courses-Gray-Gray-500)'}}>
                        From our University, High School and Language Schools
                    </p>
                </div>
                <div className={showAll?"gallery__block show__all":"gallery__block"}>
                    <div className={showAll?"gallery__block__background__none":"gallery__block__background"}/>
                    <Image src={ImageCard} alt=""/>
                    <Image src={ImageCard} alt=""/>
                    <Image src={ImageCard} alt=""/>
                    <Image src={ImageCard} alt=""/>
                    <Image src={ImageCard} alt=""/>
                    <Image src={ImageCard} alt=""/>
                    <Image src={ImageCard} alt=""/>
                    <Image src={ImageCard} alt=""/>
                    <Image src={ImageCard} alt=""/>
                    <Image src={ImageCard} alt=""/>
                    <Image src={ImageCard} alt=""/>
                    <Image src={ImageCard} alt=""/>
                </div>
                <Button label={showAll?'Collapse':'Load more'} onClick={()=>setShowAll(!showAll)}/>
            </div>
            <div className="abroad__programs">
                <h2>
                    Our References
                </h2>
                <div className="abroad__programs__cards">
                    <AbroadCard big={true} header='Foreign Language Schools' imgCard={ImageProgram}/>
                    <AbroadCard big={false} header='High School Abroad' imgCard={ImageProgram}/>
                    <AbroadCard big={false} header='Summer School Abroad' imgCard={ImageProgram}/>
                    <AbroadCard big={true} header='University Abroad' imgCard={ImageProgram}/>
                </div>
            </div>
            <BlockCard
                title='Useful information'
                description='Lorem ipsum dolor sit amet consectetur. Sit vulputate sed iaculis nisi nulla phasellus massa nulla tellus.'
                cards={references}
                buttonText='View all information'
            />
            <BlockCard
                title='Our blog posts'
                description='Lorem ipsum dolor sit amet consectetur. Sit vulputate sed iaculis nisi nulla phasellus massa nulla tellus.'
                cards={references}
                buttonText='View all references'
            />
            <FAQSection/>
            <Subscribe/>
        </div>);
}
