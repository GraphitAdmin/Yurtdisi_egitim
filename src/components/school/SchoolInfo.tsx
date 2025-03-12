'use client'
import Image from "next/image";
import React, {useEffect, useRef, useState} from "react";
import './SchoolInfo.css';
import {GoogleMap, LoadScript, MarkerF} from "@react-google-maps/api";
import {motion, AnimatePresence} from "framer-motion"
import '../ContactUs/ContactUs.css'
import ContactUsForm from "@/components/ContactUs/ContactUsForm/ContactUsForm";
import {ISchool} from "@/utils/interfaces";
import {blobUrl} from "@/utils/utils";

interface SchoolInfoSchool {
    school: ISchool;
}
const convertToDecimal = (coordinateString:string) => {
    console.log('coordinateString',coordinateString);
    const regex = /([0-9.-]+)°\s*([NSEW])/;
    const match = coordinateString.match(regex);
    console.log('match',match)
    if (!match) return Number(coordinateString);
    console.log('match',match)
    let degrees = parseFloat(match[1]);
    const direction= match[2];

    if (direction === 'S' || direction === 'W') {
        degrees = -degrees;
    }
    console.log('degres',degrees)
    return Number(degrees);
};
const SchoolInfo: React.FC<SchoolInfoSchool> = ({school}) => {
    const [isOpenOverview, setIsOpenOverview] = useState(true);
    const [isOpenWhy, setIsOpenWhy] = useState(false);

    const [isOpenDetails, setIsOpenDetails] = useState(false);
    const [isOpenVideo, setIsOpenVideo] = useState(false);
    const [isOpenMap, setIsOpenMap] = useState(false);
    const [isOpenRequest, setIsOpenRequest] = useState(false);
    const [zoom, setZoom] = useState(12);
    const [center, setCenter] = useState({
        lat: convertToDecimal(school.coordinates_on_the_map.latitude),
        lng: convertToDecimal(school.coordinates_on_the_map.longitude),
    });
    const coordinates = {
        lat: convertToDecimal(school.coordinates_on_the_map.latitude),
        lng: convertToDecimal(school.coordinates_on_the_map.longitude),
    };
    const [activeIndex, setActiveIndex] = useState(0)
    const [showTransition, setShowTransition] = useState(false)
    const [transitionStart, setTransitionStart] = useState(0)

    useEffect(() => {
        if (showTransition) {
            const timer = setTimeout(() => {
                setShowTransition(false)
            }, 500)
            return () => clearTimeout(timer)
        }
    }, [showTransition])

    const handleDotClick = (index: number) => {
        if (index > activeIndex) {
            handleSlide(index)
            setTransitionStart(activeIndex - 1)
            setActiveIndex(index)
            setShowTransition(true)
        } else if (activeIndex > index) {
            handleSlide(index)
            setTransitionStart(activeIndex - 1)
            setActiveIndex(index)
            setShowTransition(true)
        }
    }
    const imagesRef = useRef(null)
    const handleSlide = (index: number) => {
        if (imagesRef.current) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const containerWidth = imagesRef.current.clientWidth
            const scrollPosition = index * containerWidth
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            imagesRef.current.scrollTo({
                left: scrollPosition,
                behavior: "smooth",
            })
        }
    };
    console.log(school)
    return (
        <div className="page__school__info">
            <div className="image-container" ref={imagesRef}>
                {school.images.map((image, index) => (
                    <Image
                        key={index}
                        src={blobUrl + image}
                        height={480}
                        width={955}
                        alt={`Image ${index + 1}`}
                        loading="lazy"
                        className="page__school__info__img"
                    />
                ))}
            </div>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 12,
                marginTop: 24,
                position: 'relative'
            }}>
                <AnimatePresence>
                    {showTransition && (
                        <motion.div
                            className="absolute h-2 rounded-full"
                            style={{
                                maxWidth: 28,
                                width: 28,
                                background: 'var(--courses-brand-blue-400-brand)'
                            }}
                            initial={
                                {x: transitionStart * 20}
                            }
                            animate={activeIndex > transitionStart ? {x: (activeIndex - 2) * 20} : {x: (activeIndex - 1) * 20}}
                            exit={{opacity: 0}}
                            transition={{
                                type: "spring",
                                stiffness: 700,
                                damping: 40,
                                opacity: {duration: 0.4}
                            }}
                        />
                    )}
                </AnimatePresence>

                {Array.from({length: school.images.length}).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={`w-2 h-2 rounded-full transition-colors duration-200 hover:opacity-75 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 padding__fix`}
                        style={activeIndex === index ? {
                            borderRadius: 8,
                            background: 'var(--courses-brand-blue-400-brand)',
                            maxWidth: 8, maxHeight: 8
                        } : {
                            borderRadius: 8, background: '#D5D7DA',
                            maxWidth: 8, maxHeight: 8
                        }}
                        aria-label={`Go to slide ${index + 1}`}
                        aria-current={activeIndex === index ? "true" : "false"}
                    />
                ))}
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
                <div style={isOpenOverview ? {display: 'block'} : {display: 'none'}}>
                    <p>
                        {school.school_overview}
                    </p>
                </div>
            </div>
            <div className="page__school__info__block">
                <div className="page__school__info__block__header" onClick={() => setIsOpenWhy(!isOpenWhy)}>
                    <h4>Why {school.title}?</h4>
                    {!isOpenWhy &&
                        <svg style={{cursor: "pointer", minHeight: 24, minWidth: 24}} xmlns="http://www.w3.org/2000/svg"
                             width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z" fill="#717680"/>
                        </svg>}
                    {isOpenWhy &&
                        <svg onClick={() => setIsOpenWhy(false)}
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

                <div style={isOpenWhy ? {display: 'block'} : {display: 'none'}}>
                    <ul style={{marginTop: 8}}>
                        {school.why_block && school.why_block.trim() !== "" && (
                            school.why_block
                                .split("\n")
                                .map((group, index) => (
                                    group.trim() === "" ? (
                                        <p key={index}></p>
                                    ) : (
                                        <p key={index}>{group}</p>
                                    )
                                ))
                        )}
                    </ul>
                </div>
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
                             xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                             fill="none">
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
                <div
                    style={isOpenDetails ? {display: 'block', marginTop: 16} : {display: 'none'}}
                    dangerouslySetInnerHTML={{__html: school.detailed_information}}
                ></div>
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
                <iframe
                    style={isOpenVideo ? {display: 'block'} : {display: 'none'}}
                    src={school.video_url}
                    title="YouTube video player"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                />
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
                {process.env.NEXT_GOOGLE_API_KEY &&
                    <LoadScript googleMapsApiKey={process.env.NEXT_GOOGLE_API_KEY}>
                        <GoogleMap mapContainerStyle={
                            isOpenMap ? {
                                    width: '100%',
                                    height: 500,
                                    display: 'block',
                                    maxHeight: '60vh',
                                    marginTop: 32
                                } :
                                {width: '100%', height: 500, display: 'none', maxHeight: '60vh', marginTop: 32}}
                                   center={center} zoom={zoom}>
                            <MarkerF
                                onClick={() => {
                                    setZoom(18)
                                    setCenter(coordinates)
                                }}
                                position={coordinates}/>
                        </GoogleMap>
                    </LoadScript>
                }
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
                {isOpenRequest &&
                    <ContactUsForm/>}
            </div>
        </div>
    )
}
export default SchoolInfo;