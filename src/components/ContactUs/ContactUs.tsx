'use client'
import React, {useState} from "react";
import {GoogleMap, LoadScript, MarkerF} from "@react-google-maps/api";
import ContactUsImage from "@/assets/ContactUs.png"
import Image from "next/image";
import './ContactUs.css'
import ContactUsForm from "@/components/ContactUs/ContactUsForm/ContactUsForm";

const ContactUs = () => {
    const [zoom, setZoom] = useState(12);
    const [center, setCenter] = useState({
        lat: 37.7749,
        lng: -122.4194,
    });
    const coordinates = {
        lat: 37.7749,
        lng: -122.4194,
    };
    const coordinates2 = {
        lat: 47.7749,
        lng: -112.4194,
    };
    return (<>
            <div className="page__container">
                <div style={{width: '100%'}}>
                    <h1>Overseas education consultancy</h1>
                    <p>As Global Overseas Education Consultancy, we have been providing free
                        consultancy services to our students on overseas education consultancy since 1989.</p>
                </div>
                {process.env.NEXT_GOOGLE_API_KEY &&
                    <LoadScript googleMapsApiKey={process.env.NEXT_GOOGLE_API_KEY}>
                        <GoogleMap mapContainerStyle={{
                            width: '100%',
                            height: 500,
                            display: 'block',
                            maxHeight: '60vh',
                            borderRadius: 16
                        }}
                                   center={center} zoom={zoom}>
                            <MarkerF
                                onClick={() => {
                                    setZoom(18)
                                    setCenter(coordinates)
                                }}
                                position={coordinates}/>
                            <MarkerF
                                onClick={() => {
                                    setZoom(18)
                                    setCenter(coordinates2)
                                }}
                                position={coordinates2}/>
                        </GoogleMap>
                    </LoadScript>
                }
                <div className="contact__us__info">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M12 12C12.55 12 13.0208 11.8042 13.4125 11.4125C13.8042 11.0208 14 10.55 14 10C14 9.45 13.8042 8.97917 13.4125 8.5875C13.0208 8.19583 12.55 8 12 8C11.45 8 10.9792 8.19583 10.5875 8.5875C10.1958 8.97917 10 9.45 10 10C10 10.55 10.1958 11.0208 10.5875 11.4125C10.9792 11.8042 11.45 12 12 12ZM12 19.35C14.0333 17.4833 15.5417 15.7875 16.525 14.2625C17.5083 12.7375 18 11.3833 18 10.2C18 8.38333 17.4208 6.89583 16.2625 5.7375C15.1042 4.57917 13.6833 4 12 4C10.3167 4 8.89583 4.57917 7.7375 5.7375C6.57917 6.89583 6 8.38333 6 10.2C6 11.3833 6.49167 12.7375 7.475 14.2625C8.45833 15.7875 9.96667 17.4833 12 19.35ZM12 22C9.31667 19.7167 7.3125 17.5958 5.9875 15.6375C4.6625 13.6792 4 11.8667 4 10.2C4 7.7 4.80417 5.70833 6.4125 4.225C8.02083 2.74167 9.88333 2 12 2C14.1167 2 15.9792 2.74167 17.5875 4.225C19.1958 5.70833 20 7.7 20 10.2C20 11.8667 19.3375 13.6792 18.0125 15.6375C16.6875 17.5958 14.6833 19.7167 12 22Z"
                                fill="#2E90FA"/>
                        </svg>
                        <h5 style={{color: 'var(--Courses-Base-Black)'}}>
                            Besiktas - Center
                        </h5>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                 fill="none">
                                <mask id="mask0_2157_10556" maskUnits="userSpaceOnUse" x="0"
                                      y="0" width="20" height="20">
                                    <rect width="20" height="20" fill="#D9D9D9"/>
                                </mask>
                                <g mask="url(#mask0_2157_10556)">
                                    <path
                                        d="M16.625 17.5C14.8889 17.5 13.1736 17.1215 11.4792 16.3646C9.78472 15.6076 8.24306 14.5347 6.85417 13.1458C5.46528 11.7569 4.39236 10.2153 3.63542 8.52083C2.87847 6.82639 2.5 5.11111 2.5 3.375C2.5 3.125 2.58333 2.91667 2.75 2.75C2.91667 2.58333 3.125 2.5 3.375 2.5H6.75C6.94444 2.5 7.11806 2.56597 7.27083 2.69792C7.42361 2.82986 7.51389 2.98611 7.54167 3.16667L8.08333 6.08333C8.11111 6.30556 8.10417 6.49306 8.0625 6.64583C8.02083 6.79861 7.94444 6.93056 7.83333 7.04167L5.8125 9.08333C6.09028 9.59722 6.42014 10.0938 6.80208 10.5729C7.18403 11.0521 7.60417 11.5139 8.0625 11.9583C8.49306 12.3889 8.94444 12.7882 9.41667 13.1562C9.88889 13.5243 10.3889 13.8611 10.9167 14.1667L12.875 12.2083C13 12.0833 13.1632 11.9896 13.3646 11.9271C13.566 11.8646 13.7639 11.8472 13.9583 11.875L16.8333 12.4583C17.0278 12.5139 17.1875 12.6146 17.3125 12.7604C17.4375 12.9062 17.5 13.0694 17.5 13.25V16.625C17.5 16.875 17.4167 17.0833 17.25 17.25C17.0833 17.4167 16.875 17.5 16.625 17.5Z"
                                        fill="#535862"/>
                                </g>
                            </svg>
                            <p>
                                +90 212 227 0 227
                            </p>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20"
                                 fill="none">
                                <mask id="mask0_2157_10561" maskUnits="userSpaceOnUse" x="0"
                                      y="0" width="21" height="20">
                                    <rect x="0.5" width="20" height="20" fill="#D9D9D9"/>
                                </mask>
                                <g mask="url(#mask0_2157_10561)">
                                    <path
                                        d="M15.5 6H5.5V3H15.5V6ZM15.2456 10.5C15.4569 10.5 15.6354 10.4285 15.7812 10.2856C15.9271 10.1427 16 9.96562 16 9.75437C16 9.54313 15.9285 9.36458 15.7856 9.21875C15.6427 9.07292 15.4656 9 15.2544 9C15.0431 9 14.8646 9.07146 14.7188 9.21437C14.5729 9.35729 14.5 9.53438 14.5 9.74563C14.5 9.95688 14.5715 10.1354 14.7144 10.2812C14.8573 10.4271 15.0344 10.5 15.2456 10.5ZM14 15.5V12.5H7V15.5H14ZM15.5 17H5.5V14H2.5V9C2.5 8.44444 2.69444 7.97222 3.08333 7.58333C3.47222 7.19444 3.94444 7 4.5 7H16.5C17.0556 7 17.5278 7.19444 17.9167 7.58333C18.3056 7.97222 18.5 8.44444 18.5 9V14H15.5V17Z"
                                        fill="#535862"/>
                                </g>
                            </svg>
                            <p>0212 327 51 30</p>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20"
                                 fill="none">
                                <mask id="mask0_2157_10566" maskUnits="userSpaceOnUse" x="0"
                                      y="0" width="21" height="20">
                                    <rect x="0.5" width="20" height="20" fill="#D9D9D9"/>
                                </mask>
                                <g mask="url(#mask0_2157_10566)">
                                    <path
                                        d="M4 16C3.59722 16 3.24653 15.8507 2.94792 15.5521C2.64931 15.2535 2.5 14.9028 2.5 14.5V5.5C2.5 5.09722 2.64931 4.74653 2.94792 4.44792C3.24653 4.14931 3.59722 4 4 4H17C17.4167 4 17.7708 4.14931 18.0625 4.44792C18.3542 4.74653 18.5 5.09722 18.5 5.5V14.5C18.5 14.9028 18.3542 15.2535 18.0625 15.5521C17.7708 15.8507 17.4167 16 17 16H4ZM10.5 11L17 7.27083V5.5L10.5 9.22917L4 5.5V7.27083L10.5 11Z"
                                        fill="#535862"/>
                                </g>
                            </svg>
                            <p>
                                global@global-yurtdisiegitim.com
                            </p>
                        </div>
                        <p onClick={()=>{
                            setCenter(coordinates)
                            setZoom(14)
                        }} style={{fontWeight: 600, color: 'var(--courses-brand-blue-400-brand)'}}>
                            Cihannuma District Dortyuzlucesme Street Gunes Apartment No:2/3 Barbaros Boulevard 34353
                            Besiktas - Istanbul
                        </p>
                    </div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M12 12C12.55 12 13.0208 11.8042 13.4125 11.4125C13.8042 11.0208 14 10.55 14 10C14 9.45 13.8042 8.97917 13.4125 8.5875C13.0208 8.19583 12.55 8 12 8C11.45 8 10.9792 8.19583 10.5875 8.5875C10.1958 8.97917 10 9.45 10 10C10 10.55 10.1958 11.0208 10.5875 11.4125C10.9792 11.8042 11.45 12 12 12ZM12 19.35C14.0333 17.4833 15.5417 15.7875 16.525 14.2625C17.5083 12.7375 18 11.3833 18 10.2C18 8.38333 17.4208 6.89583 16.2625 5.7375C15.1042 4.57917 13.6833 4 12 4C10.3167 4 8.89583 4.57917 7.7375 5.7375C6.57917 6.89583 6 8.38333 6 10.2C6 11.3833 6.49167 12.7375 7.475 14.2625C8.45833 15.7875 9.96667 17.4833 12 19.35ZM12 22C9.31667 19.7167 7.3125 17.5958 5.9875 15.6375C4.6625 13.6792 4 11.8667 4 10.2C4 7.7 4.80417 5.70833 6.4125 4.225C8.02083 2.74167 9.88333 2 12 2C14.1167 2 15.9792 2.74167 17.5875 4.225C19.1958 5.70833 20 7.7 20 10.2C20 11.8667 19.3375 13.6792 18.0125 15.6375C16.6875 17.5958 14.6833 19.7167 12 22Z"
                                fill="#2E90FA"/>
                        </svg>
                        <h5 style={{color: 'var(--Courses-Base-Black)'}}>
                            Atasehir
                        </h5>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                 fill="none">
                                <mask id="mask0_2157_10556" maskUnits="userSpaceOnUse" x="0"
                                      y="0" width="20" height="20">
                                    <rect width="20" height="20" fill="#D9D9D9"/>
                                </mask>
                                <g mask="url(#mask0_2157_10556)">
                                    <path
                                        d="M16.625 17.5C14.8889 17.5 13.1736 17.1215 11.4792 16.3646C9.78472 15.6076 8.24306 14.5347 6.85417 13.1458C5.46528 11.7569 4.39236 10.2153 3.63542 8.52083C2.87847 6.82639 2.5 5.11111 2.5 3.375C2.5 3.125 2.58333 2.91667 2.75 2.75C2.91667 2.58333 3.125 2.5 3.375 2.5H6.75C6.94444 2.5 7.11806 2.56597 7.27083 2.69792C7.42361 2.82986 7.51389 2.98611 7.54167 3.16667L8.08333 6.08333C8.11111 6.30556 8.10417 6.49306 8.0625 6.64583C8.02083 6.79861 7.94444 6.93056 7.83333 7.04167L5.8125 9.08333C6.09028 9.59722 6.42014 10.0938 6.80208 10.5729C7.18403 11.0521 7.60417 11.5139 8.0625 11.9583C8.49306 12.3889 8.94444 12.7882 9.41667 13.1562C9.88889 13.5243 10.3889 13.8611 10.9167 14.1667L12.875 12.2083C13 12.0833 13.1632 11.9896 13.3646 11.9271C13.566 11.8646 13.7639 11.8472 13.9583 11.875L16.8333 12.4583C17.0278 12.5139 17.1875 12.6146 17.3125 12.7604C17.4375 12.9062 17.5 13.0694 17.5 13.25V16.625C17.5 16.875 17.4167 17.0833 17.25 17.25C17.0833 17.4167 16.875 17.5 16.625 17.5Z"
                                        fill="#535862"/>
                                </g>
                            </svg>
                            <p>
                                +90 212 227 0 227
                            </p>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20"
                                 fill="none">
                                <mask id="mask0_2157_10561" maskUnits="userSpaceOnUse" x="0"
                                      y="0" width="21" height="20">
                                    <rect x="0.5" width="20" height="20" fill="#D9D9D9"/>
                                </mask>
                                <g mask="url(#mask0_2157_10561)">
                                    <path
                                        d="M15.5 6H5.5V3H15.5V6ZM15.2456 10.5C15.4569 10.5 15.6354 10.4285 15.7812 10.2856C15.9271 10.1427 16 9.96562 16 9.75437C16 9.54313 15.9285 9.36458 15.7856 9.21875C15.6427 9.07292 15.4656 9 15.2544 9C15.0431 9 14.8646 9.07146 14.7188 9.21437C14.5729 9.35729 14.5 9.53438 14.5 9.74563C14.5 9.95688 14.5715 10.1354 14.7144 10.2812C14.8573 10.4271 15.0344 10.5 15.2456 10.5ZM14 15.5V12.5H7V15.5H14ZM15.5 17H5.5V14H2.5V9C2.5 8.44444 2.69444 7.97222 3.08333 7.58333C3.47222 7.19444 3.94444 7 4.5 7H16.5C17.0556 7 17.5278 7.19444 17.9167 7.58333C18.3056 7.97222 18.5 8.44444 18.5 9V14H15.5V17Z"
                                        fill="#535862"/>
                                </g>
                            </svg>
                            <p>0212 327 51 30</p>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20"
                                 fill="none">
                                <mask id="mask0_2157_10566" maskUnits="userSpaceOnUse" x="0"
                                      y="0" width="21" height="20">
                                    <rect x="0.5" width="20" height="20" fill="#D9D9D9"/>
                                </mask>
                                <g mask="url(#mask0_2157_10566)">
                                    <path
                                        d="M4 16C3.59722 16 3.24653 15.8507 2.94792 15.5521C2.64931 15.2535 2.5 14.9028 2.5 14.5V5.5C2.5 5.09722 2.64931 4.74653 2.94792 4.44792C3.24653 4.14931 3.59722 4 4 4H17C17.4167 4 17.7708 4.14931 18.0625 4.44792C18.3542 4.74653 18.5 5.09722 18.5 5.5V14.5C18.5 14.9028 18.3542 15.2535 18.0625 15.5521C17.7708 15.8507 17.4167 16 17 16H4ZM10.5 11L17 7.27083V5.5L10.5 9.22917L4 5.5V7.27083L10.5 11Z"
                                        fill="#535862"/>
                                </g>
                            </svg>
                            <p>
                                atasehir@global-yurtdisiegitim.com
                            </p>
                        </div>
                        <p
                            onClick={()=>{
                                setCenter(coordinates2)
                                setZoom(14)
                            }}
                            style={{fontWeight: 600, color: 'var(--courses-brand-blue-400-brand)'}}>
                            Flora Residence Kucukbakkalkoy Mah. Defne Street No: 1 Floor: 3 D: 307 Atasehir – Istanbul
                        </p>
                    </div>
                </div>
            </div>
            <div className="contact__us__form__block">
                <ContactUsForm isContactUs={true}/>
                <Image
                    src={ContactUsImage}
                    alt="ContactUs"
                    style={{height: '100%', objectFit: 'cover'}}
                />
            </div>
        </>

    )
}
export default ContactUs;