'use client'
import Image from "next/image";
import Oxford from "@/assets/schools/Test.jpeg";
import Sevenoaks from "@/assets/schools/Sevenoaks.jpg";
import React, {useEffect, useRef, useState} from "react";
import './SchoolInfo.css';
import Button from "@/components/UI/Button/Button";
import {GoogleMap, LoadScript, MarkerF} from "@react-google-maps/api";
import {motion, AnimatePresence} from "framer-motion"
import Input from "@/components/UI/Input/Input";
import Dropdown from "@/components/UI/Dropdown/Dropdown";
import Textarea from "@/components/UI/TextArea/TextArea";
import '../ContactUs/ContactUs.css'

interface SchoolInfoProps {
    openModal: () => void
}

const SchoolInfo: React.FC<SchoolInfoProps> = ({openModal}) => {
    const images = [Oxford, Sevenoaks, Oxford, Sevenoaks]
    const [isOpenOverview, setIsOpenOverview] = useState(true);
    const [isOpenDetails, setIsOpenDetails] = useState(false);
    const [isOpenVideo, setIsOpenVideo] = useState(false);
    const [isOpenMap, setIsOpenMap] = useState(false);
    const [isOpenRequest, setIsOpenRequest] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [program, setProgram] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [message, setMessage] = useState("");
    const schoolInfo = {
        description: "Reach Cambridge Summer School is ideal for students who want to prepare for university with English language skills!\n" +
            "Founded in 2005, Reach Cambridge is an educational institution that offers you the opportunity to study in interesting subjects in university-style classes on the campuses of Cambridge University , one of the world's leading and most prestigious universities , and provides you with a real university experience. You can see Reach Cambridge programs, offered to international students from all over the world between the ages of 14-18, as a preparation program for your university life" + "\n\nIn addition to many different and up-to-date educational programs; accommodation on the University of Cambridge campus under the supervision of university students, the opportunity to benefit from the university's social and sports facilities, the opportunity to attend conferences given by university academics, theater trips to London Global Theatre and Royal Shakespeare, the opportunity to see the most beautiful cities of England and get to know the city of Cambridge closely, this is a program where you will both learn and have an enjoyable and productive time.\n" +
            "Most of Reach Cambridge employees are students or graduates of Cambridge University. This gives our students the opportunity to experience university life up close, as well as to get more detailed information about not only Cambridge University but also university life in general, and to participate in workshops organized by the university. In addition, the points you should pay attention to in your university applications, the subtleties of preparing a high-level CV and essay, and job interview practices are among the topics you can benefit from. "
    }
    const [zoom, setZoom] = useState(12);
    const [center, setCenter] = useState({
        lat: 37.7749,
        lng: -122.4194,
    });
    const coordinates = {
        lat: 37.7749,
        lng: -122.4194,
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

    return (
        <div className="page__school__info">
            <div className="image-container" ref={imagesRef}>
                {images.map((image, index) => (
                    <Image
                        key={index}
                        src={image}
                        alt={`Image ${index + 1}`}
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

                {Array.from({length: images.length}).map((_, index) => (
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
                <p style={isOpenOverview ? {display: 'block'} : {display: 'none'}}>
                    <span className="page__school__info__blur">
                        <Button label='I want more info' onClick={openModal}/>
                    </span>
                    {schoolInfo.description}
                </p>
                <div style={isOpenOverview ? {display: 'block'} : {display: 'none'}}>
                    <h5 style={{textAlign: 'left', color: 'var(--Courses-Base-Black'}}>Why School Name?</h5>
                    <ul>
                        <li> • In addition to many different and up-to-date educational programs;</li>
                        <li> • accommodation on the University of Cambridge campus under the supervision of university
                            students
                        </li>
                        <li> • the opportunity to benefit from the university&#39;s social and sports facilities, the
                            opportunity to attend conferences given by university academics, theater trips to London
                            Global Theatre and Royal Shakespeare,
                        </li>
                        <li> • the opportunity to see the most beautiful cities of England and get to know the city of
                            Cambridge closely, this is a program where you will both learn and have an enjoyable and
                            productive time.
                        </li>
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
                <p
                    style={isOpenDetails ? {display: 'block'} : {display: 'none'}}
                >{schoolInfo.description}</p>
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
                    src="https://www.youtube.com/embed/fZI47lyocSQ?si=Livmosvb_52jeKy8"
                    title="YouTube video player"
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
                <div className="contact__us__form"
                     style={isOpenRequest ?
                         {display:'flex'} :
                         {display:'none'}
                     }>
                    <div>
                        <div>
                            <small>First name</small>
                            <Input placeholder="First name" setValue={setFirstName} value={firstName}/>
                        </div>
                        <div>
                            <small>Last name</small>
                            <Input placeholder="Last name" setValue={setLastName} value={lastName}/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <small>Email</small>
                            <Input placeholder="mail@gmail.com" setValue={setEmail} value={email}/>
                        </div>
                        <div>
                            <small>Phone number</small>
                            <Input placeholder="Phone number" setValue={setPhone} value={phone}/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <small>Your city</small>
                            <Input placeholder="Your city" setValue={setCity} value={city}/>
                        </div>
                        <div>
                            <small>Program(s) you are interested in</small>
                            <Input placeholder="Program(s) you are interested in" setValue={setProgram}
                                   value={program}/>
                        </div>
                    </div>
                    <div style={{flexDirection: 'column'}}>
                        <small>
                            Country(ies) you are interested in
                        </small>
                        <Dropdown label='Select country(ies) you are interested in' setSelected={setCountry}
                                  variants={['USA', 'UK']} selected={country}/>
                    </div>
                    <Textarea value={message} setValue={setMessage} placeholder='Message'/>
                    <Button label='Send message' btnStyle={{width: '100%', padding: '12px 0', textAlign: 'center'}}
                            btnDivStyle={{justifyContent: 'center'}}/>
                </div>
            </div>
        </div>
    )
}
export default SchoolInfo;