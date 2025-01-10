'use client';
import Image from "next/image";
import Illustration from "@/assets/home/Illustration.png";
import Careers from "@/assets/home/Careers.webp";
import Button from "@/components/UI/Button/Button";
import './CRM.css';
import {useEffect, useRef, useState} from "react";
import useMobile from "@/hooks/useMobile";


const CRM = () => {
    const [index, setIndex] = useState(0);
    const [visible, setVisible] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const isMobile = useMobile(768);
    const crmRef = useRef<HTMLDivElement | null>(null);

    const clearExistingTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    const handleSlide = (direction: 'left' | 'right') => {
        if (crmRef.current) {
            const newIndex = direction === 'right' ? index + 1 : index - 1;
            const normalizedIndex = (newIndex + 4) % 4;
            const transformValue = `translateX(-${normalizedIndex * 100}vw)`;
            crmRef.current.style.transition = 'transform 1s ease';
            crmRef.current.style.transform = transformValue;
            setIndex(normalizedIndex);
        }
    };

    const changeIndex = (direction: 'left' | 'right') => {
        if (!isMobile) {
            clearExistingTimeout();
            setIndex((prevIndex) => {
                return direction === 'right' ? (prevIndex + 1) % 4 : (prevIndex + 4 - 1) % 4;
            });
            handleSlide(direction);
        } else {
            const newIndex = direction === 'right' ? index + 1 : index - 1;
            setIndex((prevIndex) => {
                return direction === 'right' ? (prevIndex + 1) % 4 : (prevIndex + 4 - 1) % 4;
            });
            const normalizedIndex = (newIndex + 4) % 4;
            const scrollValue = normalizedIndex * window.innerWidth;
            console.log(scrollValue)
            if (crmRef.current) {
                crmRef.current.scrollLeft = scrollValue;
            }
        }
    };

    useEffect(() => {
        setVisible(false);
        const timer = setTimeout(() => {
            setVisible(true);
        }, 500);

        return () => clearTimeout(timer);
    }, [index]);

    useEffect(() => {
        timeoutRef.current = setTimeout(() => {
            changeIndex('right');
        }, 10000);

        return () => clearExistingTimeout();
    }, [index]);
    return (
        <>
            <div className="CRM">
                <div>
                    <h2>Discounted foreign language schools</h2>
                    <p style={{
                        width: '100%',
                        display: 'block',
                        color: 'var(--Courses-Gray-Gray-500)',
                    }}>
                        Lorem ipsum dolor sit amet consectetur. Sit vulputate sed iaculis nisi nulla phasellus massa
                        nulla tellus.
                    </p>
                </div>
                <div className="CRM__blocks" ref={crmRef}>
                    {/* Block 1 */}
                    <div className={`CRM__block ${index === 0 ? 'active' : ''}`}>
                        <div onClick={() => changeIndex('left')} className="CRM__block__arrow" style={{left: -56}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"
                                 fill="none">
                                <path
                                    d="M16.737 24L26.2324 6.06424L29.7676 7.9358L21.263 24L29.7676 40.0642L26.2324 41.9358L16.737 24Z"
                                    fill="#1A1A1A"/>
                            </svg>
                        </div>
                        <div onClick={() => changeIndex('right')} className="CRM__block__arrow" style={{right: -56}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"
                                 fill="none">
                                <path
                                    d="M31.263 24L21.7676 6.06424L18.2324 7.9358L26.737 24L18.2324 40.0642L21.7676 41.9358L31.263 24Z"
                                    fill="#1A1A1A"/>
                            </svg>
                        </div>
                        <Image
                            src={Illustration}
                            alt="Illustration"
                            className={`w-full CRM__block__image ${visible ? 'visible' : ''}`}
                        />
                        <div className={`CRM__block__description ${visible ? 'visible' : ''}`}>
                            <div>
                                <h5>
                                    Discounted UK Language School
                                </h5>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur. Turpis nulla non ut in eu id nisi pretium
                                    eros. Tincidunt nunc in egestas lectus venenatis egestas a quis massa. Viverra eget
                                    diam in blandit at sed. Turpis neque nisi lectus arcu turpis tellus montes
                                    malesuada. Placerat convallis vulputate vitae consectetur fermentum. Facilisis proin
                                    arcu quis tellus enim. Euismod aliquam mauris non vulputate odio amet. Ornare enim
                                    fermentum amet eu nisl quis odio interdum magna. Magna turpis turpis volutpat nibh
                                    vitae praesent placerat venenatis ac.
                                </p>
                            </div>
                            <Button href='/case-studies' label='Learn more'
                                    btnStyle={{padding: '12px 24px'}}/>
                        </div>
                    </div>

                    {/* Block 2 */}
                    <div className={`CRM__block ${index === 1 ? 'active' : ''}`}>
                        <div onClick={() => changeIndex('left')} className="CRM__block__arrow" style={{left: -56}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"
                                 fill="none">
                                <path
                                    d="M16.737 24L26.2324 6.06424L29.7676 7.9358L21.263 24L29.7676 40.0642L26.2324 41.9358L16.737 24Z"
                                    fill="#1A1A1A"/>
                            </svg>
                        </div>
                        <div onClick={() => changeIndex('right')} className="CRM__block__arrow" style={{right: -56}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"
                                 fill="none">
                                <path
                                    d="M31.263 24L21.7676 6.06424L18.2324 7.9358L26.737 24L18.2324 40.0642L21.7676 41.9358L31.263 24Z"
                                    fill="#1A1A1A"/>
                            </svg>
                        </div>
                        <Image
                            src={Careers}
                            alt="Illustration"
                            className={`w-full CRM__block__image ${visible ? 'visible' : ''}`}
                        />
                        <div className={`CRM__block__description ${visible ? 'visible' : ''}`}>
                            <div>
                                <h5>Revolutionising Streaming Performance: Scalable Data Platform for Telecom
                                    Leaders</h5>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur. Turpis nulla non ut in eu id nisi pretium
                                    eros. Tincidunt nunc in egestas lectus venenatis egestas a quis massa. Viverra eget
                                    diam in blandit at sed. Turpis neque nisi lectus arcu turpis tellus montes
                                    malesuada. Placerat convallis vulputate vitae consectetur fermentum. Facilisis proin
                                    arcu quis tellus enim. Euismod aliquam mauris non vulputate odio amet. Ornare enim
                                    fermentum amet eu nisl quis odio interdum magna. Magna turpis turpis volutpat nibh
                                    vitae praesent placerat venenatis ac.
                                </p>
                            </div>
                            <Button href='/case-studies' label='Learn more'/>
                        </div>
                    </div>

                    {/* Block 3 */}
                    <div className={`CRM__block ${index === 2 ? 'active' : ''}`}>
                        <div onClick={() => changeIndex('left')} className="CRM__block__arrow" style={{left: -56}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"
                                 fill="none">
                                <path
                                    d="M16.737 24L26.2324 6.06424L29.7676 7.9358L21.263 24L29.7676 40.0642L26.2324 41.9358L16.737 24Z"
                                    fill="#1A1A1A"/>
                            </svg>
                        </div>
                        <div onClick={() => changeIndex('right')} className="CRM__block__arrow" style={{right: -56}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"
                                 fill="none">
                                <path
                                    d="M31.263 24L21.7676 6.06424L18.2324 7.9358L26.737 24L18.2324 40.0642L21.7676 41.9358L31.263 24Z"
                                    fill="#1A1A1A"/>
                            </svg>
                        </div>
                        <Image
                            src={Illustration}
                            alt="Illustration"
                            className={`w-full CRM__block__image ${visible ? 'visible' : ''}`}
                        />
                        <div className={`CRM__block__description ${visible ? 'visible' : ''}`}>
                            <div>
                                <h5>Building Empathy at Scale: Mental Health Chatbot for Accessible Support
                                </h5>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur. Turpis nulla non ut in eu id nisi pretium
                                    eros. Tincidunt nunc in egestas lectus venenatis egestas a quis massa. Viverra eget
                                    diam in blandit at sed. Turpis neque nisi lectus arcu turpis tellus montes
                                    malesuada. Placerat convallis vulputate vitae consectetur fermentum. Facilisis proin
                                    arcu quis tellus enim. Euismod aliquam mauris non vulputate odio amet. Ornare enim
                                    fermentum amet eu nisl quis odio interdum magna. Magna turpis turpis volutpat nibh
                                    vitae praesent placerat venenatis ac.
                                </p>
                            </div>
                            <Button href='/case-studies' label='Learn more'/>
                        </div>
                    </div>
                    {/* Block 4 */}
                    <div className={`CRM__block ${index === 3 ? 'active' : ''}`}>
                        <div onClick={() => changeIndex('left')} className="CRM__block__arrow" style={{left: -56}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"
                                 fill="none">
                                <path
                                    d="M16.737 24L26.2324 6.06424L29.7676 7.9358L21.263 24L29.7676 40.0642L26.2324 41.9358L16.737 24Z"
                                    fill="#1A1A1A"/>
                            </svg>
                        </div>
                        <div onClick={() => changeIndex('right')} className="CRM__block__arrow" style={{right: -56}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"
                                 fill="none">
                                <path
                                    d="M31.263 24L21.7676 6.06424L18.2324 7.9358L26.737 24L18.2324 40.0642L21.7676 41.9358L31.263 24Z"
                                    fill="#1A1A1A"/>
                            </svg>
                        </div>
                        <Image
                            src={Careers}
                            alt="Illustration"
                            className={`w-full CRM__block__image ${visible ? 'visible' : ''}`}
                        />
                        <div className={`CRM__block__description ${visible ? 'visible' : ''}`}>
                            <div>
                                <h5>
                                    Shaping Operational Efficiency: Data Solutions Driving Global Expansion
                                </h5>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur. Turpis nulla non ut in eu id nisi pretium
                                    eros. Tincidunt nunc in egestas lectus venenatis egestas a quis massa. Viverra eget
                                    diam in blandit at sed. Turpis neque nisi lectus arcu turpis tellus montes
                                    malesuada. Placerat convallis vulputate vitae consectetur fermentum. Facilisis proin
                                    arcu quis tellus enim. Euismod aliquam mauris non vulputate odio amet. Ornare enim
                                    fermentum amet eu nisl quis odio interdum magna. Magna turpis turpis volutpat nibh
                                    vitae praesent placerat venenatis ac.
                                </p>
                            </div>
                            <Button href='/case-studies' label='Learn more'/>
                        </div>
                    </div>
                </div>
                <div
                    className="mobile CRM__block__mobile__arrows">
                    <div onClick={() => changeIndex('left')}
                         style={{position: "relative", top: 0, left: 0}} className="CRM__block__arrow__border">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M10 18L4 12L10 6L11.4 7.45L7.85 11H20V13H7.85L11.4 16.55L10 18Z" fill="black"/>
                        </svg>
                    </div>
                    <div onClick={() => changeIndex('right')}
                         style={{position: "relative"}} className="CRM__block__arrow__border">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M14 18L12.6 16.55L16.15 13H4V11H16.15L12.6 7.45L14 6L20 12L14 18Z" fill="black"/>
                        </svg>
                    </div>
                </div>

            </div>
        </>
    );
};

export default CRM;
