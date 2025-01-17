'use client'
import Image from "next/image";
import Oxford from "@/assets/schools/Test.jpeg";
import React, {useState} from "react";
import './SchoolInfo.css';
import Sevenoaks from "@/assets/schools/Sevenoaks.jpg";

const SchoolInfo = () => {
    const images=[Oxford,Sevenoaks,Oxford,Sevenoaks]
    const [isOpenOverview, setIsOpenOverview] = useState(true);
    const [isOpenDetails, setIsOpenDetails] = useState(false);
    const [isOpenVideo, setIsOpenVideo] = useState(false);
    const [isOpenMap, setIsOpenMap] = useState(false);
    const [isOpenRequest, setIsOpenRequest] = useState(false);
    const [imageIndex,setImageIndex] = useState(0);
    const schoolInfo = {
        description: "Reach Cambridge Summer School is ideal for students who want to prepare for university with English language skills!\n" +
            "Founded in 2005, Reach Cambridge is an educational institution that offers you the opportunity to study in interesting subjects in university-style classes on the campuses of Cambridge University , one of the world's leading and most prestigious universities , and provides you with a real university experience. You can see Reach Cambridge programs, offered to international students from all over the world between the ages of 14-18, as a preparation program for your university life",
        descriptionBlur: "In addition to many different and up-to-date educational programs; accommodation on the University of Cambridge campus under the supervision of university students, the opportunity to benefit from the university's social and sports facilities, the opportunity to attend conferences given by university academics, theater trips to London Global Theatre and Royal Shakespeare, the opportunity to see the most beautiful cities of England and get to know the city of Cambridge closely, this is a program where you will both learn and have an enjoyable and productive time.\n" +
            "Most of Reach Cambridge employees are students or graduates of Cambridge University. This gives our students the opportunity to experience university life up close, as well as to get more detailed information about not only Cambridge University but also university life in general, and to participate in workshops organized by the university. In addition, the points you should pay attention to in your university applications, the subtleties of preparing a high-level CV and essay, and job interview practices are among the topics you can benefit from. "
    }
    return (
        <div className="page__school__info">
            <div className="image-container" key={imageIndex}>
                <Image
                    src={images[imageIndex]}
                    alt="school"
                    className="fade-image"
                />
            </div>
            <div style={{display: "flex", justifyContent: "center",alignItems: "center",gap:12,marginTop:24}}>
                {images.map((_,index)=>
                <div className={imageIndex===index?"active__selector":"image__selector"} onClick={()=>setImageIndex(index)} key={index}>
                </div>
                )}
            </div>
            <div className="page__school__info__block">
                <div className="page__school__info__block__header" onClick={() => setIsOpenOverview(!isOpenOverview)}>
                    <h4>School Overview</h4>
                    {!isOpenOverview &&
                        <svg style={{cursor: "pointer", minHeight: 24, minWidth: 24}} xmlns="http://www.w3.org/2000/svg"
                             width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z" fill="#717680"/>
                        </svg>}
                    {isOpenOverview &&
                        <svg onClick={() => setIsOpenOverview(false)}
                             style={{cursor: "pointer", minHeight: 24, minWidth: 24}}
                             xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <g clipPath="url(#clip0_1242_14090)">
                                <mask id="mask0_1242_14090" maskUnits="userSpaceOnUse" x="0" y="0"
                                      width="24" height="24">
                                    <rect width="24" height="24" fill="#D9D9D9"/>
                                </mask>
                                <g mask="url(#mask0_1242_14090)">
                                    <path d="M5 13V11H19V13H5Z" fill="#717680"/>
                                </g>
                            </g>
                            <defs>
                                <clipPath id="clip0_1242_14090">
                                    <rect width="24" height="24" fill="#717680"/>
                                </clipPath>
                            </defs>
                        </svg>}
                </div>
                {isOpenOverview && <p>{schoolInfo.description}</p>}
            </div>


            <div className="page__school__info__block">
                <div className="page__school__info__block__header" onClick={() => setIsOpenDetails(!isOpenDetails)}>
                    <h4>Detailed information</h4>
                    {!isOpenDetails &&
                        <svg style={{cursor: "pointer", minHeight: 24, minWidth: 24}} xmlns="http://www.w3.org/2000/svg"
                             width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z" fill="#717680"/>
                        </svg>}
                    {isOpenDetails &&
                        <svg onClick={() => setIsOpenDetails(false)}
                             style={{cursor: "pointer", minHeight: 24, minWidth: 24}}
                             xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <g clipPath="url(#clip0_1242_14090)">
                                <mask id="mask0_1242_14090" maskUnits="userSpaceOnUse" x="0" y="0"
                                      width="24" height="24">
                                    <rect width="24" height="24" fill="#D9D9D9"/>
                                </mask>
                                <g mask="url(#mask0_1242_14090)">
                                    <path d="M5 13V11H19V13H5Z" fill="#717680"/>
                                </g>
                            </g>
                            <defs>
                                <clipPath id="clip0_1242_14090">
                                    <rect width="24" height="24" fill="#717680"/>
                                </clipPath>
                            </defs>
                        </svg>}
                </div>
                {isOpenDetails && <p>{schoolInfo.description}</p>}
            </div>

            <div className="page__school__info__block">
                <div className="page__school__info__block__header" onClick={() => setIsOpenVideo(!isOpenVideo)}>
                    <h4>Video</h4>
                    {!isOpenVideo &&
                        <svg style={{cursor: "pointer", minHeight: 24, minWidth: 24}} xmlns="http://www.w3.org/2000/svg"
                             width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z" fill="#717680"/>
                        </svg>}
                    {isOpenVideo &&
                        <svg onClick={() => setIsOpenVideo(false)}
                             style={{cursor: "pointer", minHeight: 24, minWidth: 24}}
                             xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <g clipPath="url(#clip0_1242_14090)">
                                <mask id="mask0_1242_14090" maskUnits="userSpaceOnUse" x="0" y="0"
                                      width="24" height="24">
                                    <rect width="24" height="24" fill="#D9D9D9"/>
                                </mask>
                                <g mask="url(#mask0_1242_14090)">
                                    <path d="M5 13V11H19V13H5Z" fill="#717680"/>
                                </g>
                            </g>
                            <defs>
                                <clipPath id="clip0_1242_14090">
                                    <rect width="24" height="24" fill="#717680"/>
                                </clipPath>
                            </defs>
                        </svg>}
                </div>
                {isOpenVideo && <>
                <iframe
                        src="https://www.youtube.com/embed/fZI47lyocSQ?si=Livmosvb_52jeKy8"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                />
                </>
                }
            </div>

            <div className="page__school__info__block">
                <div className="page__school__info__block__header" onClick={() => setIsOpenMap(!isOpenMap)}>
                    <h4>Map</h4>
                    {!isOpenMap &&
                        <svg style={{cursor: "pointer", minHeight: 24, minWidth: 24}} xmlns="http://www.w3.org/2000/svg"
                             width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z" fill="#717680"/>
                        </svg>}
                    {isOpenMap &&
                        <svg onClick={() => setIsOpenMap(false)}
                             style={{cursor: "pointer", minHeight: 24, minWidth: 24}}
                             xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <g clipPath="url(#clip0_1242_14090)">
                                <mask id="mask0_1242_14090" maskUnits="userSpaceOnUse" x="0" y="0"
                                      width="24" height="24">
                                    <rect width="24" height="24" fill="#D9D9D9"/>
                                </mask>
                                <g mask="url(#mask0_1242_14090)">
                                    <path d="M5 13V11H19V13H5Z" fill="#717680"/>
                                </g>
                            </g>
                            <defs>
                                <clipPath id="clip0_1242_14090">
                                    <rect width="24" height="24" fill="#717680"/>
                                </clipPath>
                            </defs>
                        </svg>}
                </div>
                {isOpenMap && <p>{schoolInfo.description}</p>}
            </div>

            <div className="page__school__info__block">
                <div className="page__school__info__block__header" onClick={() => setIsOpenRequest(!isOpenRequest)}>
                    <h4>Request information</h4>
                    {!isOpenRequest &&
                        <svg style={{cursor: "pointer", minHeight: 24, minWidth: 24}} xmlns="http://www.w3.org/2000/svg"
                             width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z" fill="#717680"/>
                        </svg>}
                    {isOpenRequest &&
                        <svg onClick={() => setIsOpenRequest(false)}
                             style={{cursor: "pointer", minHeight: 24, minWidth: 24}}
                             xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <g clipPath="url(#clip0_1242_14090)">
                                <mask id="mask0_1242_14090" maskUnits="userSpaceOnUse" x="0" y="0"
                                      width="24" height="24">
                                    <rect width="24" height="24" fill="#D9D9D9"/>
                                </mask>
                                <g mask="url(#mask0_1242_14090)">
                                    <path d="M5 13V11H19V13H5Z" fill="#717680"/>
                                </g>
                            </g>
                            <defs>
                                <clipPath id="clip0_1242_14090">
                                    <rect width="24" height="24" fill="#717680"/>
                                </clipPath>
                            </defs>
                        </svg>}
                </div>
                {isOpenRequest && <p>{schoolInfo.description}</p>}
            </div>
        </div>
    )
}
export default SchoolInfo;