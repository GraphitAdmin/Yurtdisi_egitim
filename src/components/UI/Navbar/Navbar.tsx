"use client";
import Link from "next/link";
import React, {JSX, useEffect, useState} from "react";
import Logo from "@/components/UI/Logo/Logo";
import {navbarOptions} from "@/data/navbarOptions";
import SearchComponent from "@/components/UI/SearchComponent/SearchComponent";

interface NavbarProps {
    home: boolean;
}

const Dropdown: React.FC<NavbarProps> = ({home}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="navbar__dropdown__svg" width="24" height="24"
             viewBox="0 0 24 24" fill="none">
            <mask id="mask0_1_238" maskUnits="userSpaceOnUse" x="0" y="0"
                  width="24" height="24">
                <rect width="24" height="24" fill="#D9D9D9"/>
            </mask>
            <g mask="url(#mask0_1_238)">
                <path d="M12 15.4L6 9.4L7.4 8L12 12.6L16.6 8L18 9.4L12 15.4Z"
                      fill={home ? "white" : "#1A1A1A"}
                />
            </g>
        </svg>
    )
}

interface NavbarDropdownItemProps {
    name: string;
    link: string;
    suffixName:string;
    svg: JSX.Element;
}

const DropdownItem: React.FC<NavbarDropdownItemProps> = ({name,suffixName, svg, link}) => {
    return (
        <>
            <Link className="nav__dropdown__block__item" href={link}>
                {svg}
                    <small>
                        {name}&nbsp;{!name.includes('All')&&<>{suffixName}</>}
                    </small>
            </Link>
        </>
    )
}
const Navbar: React.FC<NavbarProps> = ({home}) => {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [navbarSelected, setNavbarSelected] = useState<number | null>(null);
    const [searchOpen,setSearchOpen] = useState(false);
    useEffect(() => {
        if (navbarOpen||searchOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [navbarOpen,searchOpen]);
    return (
        <>
            <nav className={home ? "nav__home" : ""} style={navbarOpen ? {border: 'none'} : {}}>
                <div className="nav__header__block">
                    <div className="nav__header">
                        <div className="nav__header__item">
                            {home ?
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                     fill="none">
                                    <mask id="mask0_1953_11128" maskUnits="userSpaceOnUse" x="0"
                                          y="0" width="20" height="20">
                                        <rect width="20" height="20" fill="#D9D9D9"/>
                                    </mask>
                                    <g mask="url(#mask0_1953_11128)">
                                        <path
                                            d="M16.625 17.5C14.8889 17.5 13.1736 17.1215 11.4792 16.3646C9.78472 15.6076 8.24306 14.5347 6.85417 13.1458C5.46528 11.7569 4.39236 10.2153 3.63542 8.52083C2.87847 6.82639 2.5 5.11111 2.5 3.375C2.5 3.125 2.58333 2.91667 2.75 2.75C2.91667 2.58333 3.125 2.5 3.375 2.5H6.75C6.94444 2.5 7.11806 2.56597 7.27083 2.69792C7.42361 2.82986 7.51389 2.98611 7.54167 3.16667L8.08333 6.08333C8.11111 6.30556 8.10417 6.49306 8.0625 6.64583C8.02083 6.79861 7.94444 6.93056 7.83333 7.04167L5.8125 9.08333C6.09028 9.59722 6.42014 10.0938 6.80208 10.5729C7.18403 11.0521 7.60417 11.5139 8.0625 11.9583C8.49306 12.3889 8.94444 12.7882 9.41667 13.1562C9.88889 13.5243 10.3889 13.8611 10.9167 14.1667L12.875 12.2083C13 12.0833 13.1632 11.9896 13.3646 11.9271C13.566 11.8646 13.7639 11.8472 13.9583 11.875L16.8333 12.4583C17.0278 12.5139 17.1875 12.6146 17.3125 12.7604C17.4375 12.9062 17.5 13.0694 17.5 13.25V16.625C17.5 16.875 17.4167 17.0833 17.25 17.25C17.0833 17.4167 16.875 17.5 16.625 17.5Z"
                                            fill="#1A1A1A"/>
                                    </g>
                                </svg> :
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                     fill="none">
                                    <mask id="mask0_1_215" maskUnits="userSpaceOnUse" x="0" y="0"
                                          width="20" height="20">
                                        <rect width="20" height="20" fill="#D9D9D9"/>
                                    </mask>
                                    <g mask="url(#mask0_1_215)">
                                        <path
                                            d="M16.625 17.5C14.8889 17.5 13.1736 17.1215 11.4792 16.3646C9.78472 15.6076 8.24306 14.5347 6.85417 13.1458C5.46528 11.7569 4.39236 10.2153 3.63542 8.52083C2.87847 6.82639 2.5 5.11111 2.5 3.375C2.5 3.125 2.58333 2.91667 2.75 2.75C2.91667 2.58333 3.125 2.5 3.375 2.5H6.75C6.94444 2.5 7.11806 2.56597 7.27083 2.69792C7.42361 2.82986 7.51389 2.98611 7.54167 3.16667L8.08333 6.08333C8.11111 6.30556 8.10417 6.49306 8.0625 6.64583C8.02083 6.79861 7.94444 6.93056 7.83333 7.04167L5.8125 9.08333C6.09028 9.59722 6.42014 10.0938 6.80208 10.5729C7.18403 11.0521 7.60417 11.5139 8.0625 11.9583C8.49306 12.3889 8.94444 12.7882 9.41667 13.1562C9.88889 13.5243 10.3889 13.8611 10.9167 14.1667L12.875 12.2083C13 12.0833 13.1632 11.9896 13.3646 11.9271C13.566 11.8646 13.7639 11.8472 13.9583 11.875L16.8333 12.4583C17.0278 12.5139 17.1875 12.6146 17.3125 12.7604C17.4375 12.9062 17.5 13.0694 17.5 13.25V16.625C17.5 16.875 17.4167 17.0833 17.25 17.25C17.0833 17.4167 16.875 17.5 16.625 17.5Z"
                                            fill="white"
                                        />
                                    </g>
                                </svg>
                            }
                            0212 227 0 227
                        </div>

                        <div className="nav__us">
                            <Link href="/contact-us">
                                <h6>
                                    Contact Us
                                </h6>
                            </Link>
                            <div className="nav__us__social">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                     fill="none">
                                    <path
                                        d="M12.6 4.43344H14.1666V1.78344C13.4081 1.70456 12.6459 1.66562 11.8833 1.66677C9.61663 1.66677 8.06663 3.05011 8.06663 5.58344V7.76677H5.5083V10.7334H8.06663V18.3334H11.1333V10.7334H13.6833L14.0666 7.76677H11.1333V5.87511C11.1333 5.00011 11.3666 4.43344 12.6 4.43344Z"
                                        fill={!home ? "#fff" : "#717680"}/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                     fill="none">
                                    <path
                                        d="M18.3332 4.83351C17.7068 5.10525 17.0444 5.28489 16.3665 5.36684C17.0816 4.93961 17.6176 4.26749 17.8748 3.47517C17.2028 3.87523 16.4671 4.15709 15.6998 4.30851C15.187 3.75232 14.504 3.38209 13.758 3.25588C13.012 3.12968 12.2453 3.25464 11.578 3.61117C10.9107 3.96769 10.3806 4.53562 10.0709 5.22587C9.76113 5.91613 9.68925 6.68967 9.8665 7.42517C8.50769 7.35645 7.17854 7.00264 5.96538 6.38673C4.75223 5.77082 3.68221 4.90659 2.82484 3.85017C2.52412 4.37532 2.3661 4.97003 2.3665 5.57517C2.36544 6.13716 2.50335 6.69069 2.76797 7.18648C3.03258 7.68227 3.41569 8.10493 3.88317 8.41684C3.33982 8.40206 2.80808 8.25626 2.33317 7.99184V8.03351C2.33724 8.82092 2.61317 9.58275 3.11427 10.1901C3.61537 10.7975 4.31088 11.2132 5.08317 11.3668C4.78588 11.4573 4.47723 11.505 4.1665 11.5085C3.95141 11.506 3.73686 11.4865 3.52484 11.4502C3.74476 12.1275 4.17036 12.7195 4.7424 13.1436C5.31444 13.5678 6.00448 13.8031 6.7165 13.8168C5.51417 14.7629 4.02974 15.2792 2.49984 15.2835C2.22128 15.2844 1.94295 15.2677 1.6665 15.2335C3.22853 16.2421 5.04885 16.7774 6.90817 16.7752C8.19125 16.7885 9.46412 16.546 10.6524 16.0619C11.8408 15.5778 12.9207 14.8617 13.8292 13.9556C14.7377 13.0494 15.4565 11.9713 15.9436 10.7843C16.4308 9.59719 16.6765 8.32495 16.6665 7.04184C16.6665 6.90017 16.6665 6.75017 16.6665 6.60017C17.3204 6.11252 17.8844 5.5147 18.3332 4.83351Z"
                                        fill={!home ? "#fff" : "#717680"}/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                     fill="none">
                                    <path
                                        d="M14.4498 4.55008C14.2521 4.55008 14.0587 4.60873 13.8943 4.71861C13.7298 4.82849 13.6016 4.98467 13.526 5.1674C13.4503 5.35012 13.4305 5.55119 13.4691 5.74517C13.5076 5.93915 13.6029 6.11734 13.7427 6.25719C13.8826 6.39704 14.0608 6.49228 14.2547 6.53087C14.4487 6.56945 14.6498 6.54965 14.8325 6.47396C15.0152 6.39827 15.1714 6.2701 15.2813 6.10565C15.3912 5.9412 15.4498 5.74786 15.4498 5.55008C15.4498 5.28486 15.3445 5.03051 15.1569 4.84297C14.9694 4.65544 14.7151 4.55008 14.4498 4.55008ZM18.2832 6.56675C18.267 5.87533 18.1375 5.19125 17.8998 4.54175C17.6879 3.98603 17.3582 3.48281 16.9332 3.06675C16.5205 2.6396 16.0161 2.3119 15.4582 2.10841C14.8104 1.86355 14.1255 1.73109 13.4332 1.71675C12.5498 1.66675 12.2665 1.66675 9.99984 1.66675C7.73317 1.66675 7.44984 1.66675 6.5665 1.71675C5.87413 1.73109 5.18929 1.86355 4.5415 2.10841C3.98457 2.31396 3.48062 2.64138 3.0665 3.06675C2.63936 3.4794 2.31165 3.98378 2.10817 4.54175C1.8633 5.18953 1.73085 5.87438 1.7165 6.56675C1.6665 7.45008 1.6665 7.73342 1.6665 10.0001C1.6665 12.2667 1.6665 12.5501 1.7165 13.4334C1.73085 14.1258 1.8633 14.8106 2.10817 15.4584C2.31165 16.0164 2.63936 16.5208 3.0665 16.9334C3.48062 17.3588 3.98457 17.6862 4.5415 17.8917C5.18929 18.1366 5.87413 18.2691 6.5665 18.2834C7.44984 18.3334 7.73317 18.3334 9.99984 18.3334C12.2665 18.3334 12.5498 18.3334 13.4332 18.2834C14.1255 18.2691 14.8104 18.1366 15.4582 17.8917C16.0161 17.6883 16.5205 17.3606 16.9332 16.9334C17.36 16.5189 17.6901 16.0152 17.8998 15.4584C18.1375 14.8089 18.267 14.1248 18.2832 13.4334C18.2832 12.5501 18.3332 12.2667 18.3332 10.0001C18.3332 7.73342 18.3332 7.45008 18.2832 6.56675ZM16.7832 13.3334C16.7771 13.8624 16.6813 14.3865 16.4998 14.8834C16.3668 15.2461 16.1531 15.5738 15.8748 15.8417C15.6045 16.1172 15.2775 16.3304 14.9165 16.4667C14.4196 16.6482 13.8955 16.744 13.3665 16.7501C12.5332 16.7917 12.2248 16.8001 10.0332 16.8001C7.8415 16.8001 7.53317 16.8001 6.69984 16.7501C6.15058 16.7604 5.60367 16.6758 5.08317 16.5001C4.73799 16.3568 4.42597 16.1441 4.1665 15.8751C3.88991 15.6074 3.67887 15.2794 3.54984 14.9167C3.34638 14.4127 3.23354 13.8767 3.2165 13.3334C3.2165 12.5001 3.1665 12.1917 3.1665 10.0001C3.1665 7.80841 3.1665 7.50008 3.2165 6.66675C3.22024 6.12596 3.31896 5.59004 3.50817 5.08341C3.65488 4.73167 3.88006 4.41813 4.1665 4.16675C4.41968 3.88022 4.73258 3.65266 5.08317 3.50008C5.59113 3.31678 6.1265 3.22098 6.6665 3.21675C7.49984 3.21675 7.80817 3.16675 9.99984 3.16675C12.1915 3.16675 12.4998 3.16675 13.3332 3.21675C13.8621 3.22282 14.3863 3.31862 14.8832 3.50008C15.2619 3.64062 15.6017 3.86912 15.8748 4.16675C16.1479 4.42273 16.3613 4.73569 16.4998 5.08341C16.685 5.59086 16.7809 6.12656 16.7832 6.66675C16.8248 7.50008 16.8332 7.80841 16.8332 10.0001C16.8332 12.1917 16.8248 12.5001 16.7832 13.3334ZM9.99984 5.72508C9.15468 5.72673 8.32897 5.97885 7.62705 6.4496C6.92513 6.92034 6.37849 7.58858 6.0562 8.36988C5.73391 9.15117 5.65044 10.0105 5.81633 10.8392C5.98222 11.6679 6.39003 12.4289 6.98823 13.0259C7.58643 13.6229 8.34818 14.0293 9.17722 14.1935C10.0063 14.3578 10.8654 14.2727 11.6461 13.9489C12.4267 13.6251 13.0939 13.0771 13.5633 12.3743C14.0327 11.6714 14.2832 10.8452 14.2832 10.0001C14.2843 9.43767 14.1742 8.88059 13.9592 8.36088C13.7442 7.84117 13.4286 7.36909 13.0306 6.97179C12.6325 6.57449 12.1598 6.25981 11.6397 6.04586C11.1195 5.8319 10.5622 5.72288 9.99984 5.72508ZM9.99984 12.7751C9.45099 12.7751 8.91448 12.6123 8.45813 12.3074C8.00178 12.0025 7.6461 11.5691 7.43607 11.062C7.22604 10.555 7.17108 9.997 7.27816 9.45871C7.38523 8.92041 7.64953 8.42595 8.03762 8.03786C8.42571 7.64977 8.92016 7.38548 9.45846 7.2784C9.99676 7.17133 10.5547 7.22628 11.0618 7.43632C11.5688 7.64635 12.0022 8.00203 12.3072 8.45837C12.6121 8.91472 12.7748 9.45124 12.7748 10.0001C12.7748 10.3645 12.7031 10.7253 12.5636 11.062C12.4241 11.3987 12.2197 11.7046 11.9621 11.9623C11.7044 12.22 11.3985 12.4244 11.0618 12.5638C10.7251 12.7033 10.3643 12.7751 9.99984 12.7751Z"
                                        fill={!home ? "#fff" : "#717680"}/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                     fill="none">
                                    <path
                                        d="M17.0585 1.66686H2.9418C2.78311 1.66466 2.62555 1.69374 2.4781 1.75243C2.33066 1.81113 2.19622 1.8983 2.08246 2.00896C1.96871 2.11962 1.87786 2.2516 1.81512 2.39737C1.75238 2.54314 1.71897 2.69985 1.7168 2.85853V17.1419C1.71897 17.3005 1.75238 17.4573 1.81512 17.603C1.87786 17.7488 1.96871 17.8808 2.08246 17.9914C2.19622 18.1021 2.33066 18.1893 2.4781 18.248C2.62555 18.3067 2.78311 18.3357 2.9418 18.3335H17.0585C17.2171 18.3357 17.3747 18.3067 17.5222 18.248C17.6696 18.1893 17.804 18.1021 17.9178 17.9914C18.0316 17.8808 18.1224 17.7488 18.1851 17.603C18.2479 17.4573 18.2813 17.3005 18.2835 17.1419V2.85853C18.2813 2.69985 18.2479 2.54314 18.1851 2.39737C18.1224 2.2516 18.0316 2.11962 17.9178 2.00896C17.804 1.8983 17.6696 1.81113 17.5222 1.75243C17.3747 1.69374 17.2171 1.66466 17.0585 1.66686ZM6.7418 15.6169H4.2418V8.11686H6.7418V15.6169ZM5.4918 7.06686C5.14702 7.06686 4.81636 6.9299 4.57256 6.6861C4.32876 6.44231 4.1918 6.11165 4.1918 5.76686C4.1918 5.42208 4.32876 5.09142 4.57256 4.84763C4.81636 4.60383 5.14702 4.46686 5.4918 4.46686C5.67488 4.4461 5.86028 4.46424 6.03586 4.5201C6.21144 4.57596 6.37325 4.66827 6.51068 4.791C6.64811 4.91373 6.75807 5.0641 6.83336 5.23227C6.90864 5.40044 6.94756 5.58261 6.94756 5.76686C6.94756 5.95112 6.90864 6.13329 6.83336 6.30146C6.75807 6.46963 6.64811 6.62 6.51068 6.74273C6.37325 6.86546 6.21144 6.95777 6.03586 7.01363C5.86028 7.06949 5.67488 7.08763 5.4918 7.06686ZM15.7585 15.6169H13.2585V11.5919C13.2585 10.5835 12.9001 9.9252 11.9918 9.9252C11.7107 9.92726 11.437 10.0154 11.2075 10.1778C10.978 10.3403 10.8039 10.5691 10.7085 10.8335C10.6433 11.0294 10.615 11.2357 10.6251 11.4419V15.6085H8.12513C8.12513 15.6085 8.12513 8.79186 8.12513 8.10853H10.6251V9.16687C10.8522 8.77279 11.1826 8.44813 11.5805 8.22787C11.9784 8.0076 12.4289 7.90007 12.8835 7.91686C14.5501 7.91686 15.7585 8.99187 15.7585 11.3002V15.6169Z"
                                        fill={!home ? "#fff" : "#717680"}/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                     fill="none">
                                    <path
                                        d="M10.2031 3.33325C10.6482 3.3357 11.7618 3.34647 12.9449 3.39386L13.3644 3.41215C14.5557 3.46855 15.7459 3.5649 16.3363 3.7295C17.1237 3.95071 17.7426 4.59617 17.9518 5.41435C18.2848 6.71359 18.3265 9.24942 18.3317 9.86309L18.3324 9.99025V9.99917C18.3324 9.99917 18.3324 10.0023 18.3324 10.0082L18.3317 10.1353C18.3265 10.749 18.2848 13.2848 17.9518 14.5841C17.7397 15.4053 17.1208 16.0508 16.3363 16.2689C15.7459 16.4335 14.5557 16.5298 13.3644 16.5863L12.9449 16.6045C11.7618 16.6519 10.6482 16.6627 10.2031 16.6652L10.0078 16.6658H9.99909C9.99909 16.6658 9.99617 16.6658 9.99042 16.6658L9.79525 16.6652C8.85325 16.66 4.9146 16.6174 3.66193 16.2689C2.8745 16.0477 2.2556 15.4023 2.0464 14.5841C1.71334 13.2848 1.6717 10.749 1.6665 10.1353V9.86309C1.6717 9.24942 1.71334 6.71359 2.0464 5.41435C2.2585 4.59314 2.8774 3.94769 3.66193 3.7295C4.9146 3.38094 8.85325 3.33844 9.79525 3.33325H10.2031ZM8.33243 7.08254V12.9158L13.3324 9.99917L8.33243 7.08254Z"
                                        fill={!home ? "#fff" : "#717680"}/>
                                </svg>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="nav__links">
                    <div>
                        {home ?
                            <Logo color="white"/> :
                            <Logo color="#1A1A1A"/>
                        }
                    </div>
                    {navbarOptions.map(
                        (navbarOption, index) =>
                            <div className="nav__dropdown" key={index}>
                                <Link href={navbarOption.link}>
                                    <sub>{navbarOption.name}</sub>
                                </Link>
                                <Dropdown home={home}/>
                                <div className="nav__dropdown__block">
                                    {navbarOption.options.map((dropdownOption, index) =>
                                        <DropdownItem key={index} link={navbarOption.link+dropdownOption.link} name={dropdownOption.name}
                                                      suffixName={navbarOption.name.toLowerCase()}
                                                      svg={dropdownOption.svg}/>
                                    )}
                                </div>
                            </div>
                    )}
                    <div style={{display: 'flex', flexDirection: 'row', gap: 20, alignItems: 'center'}}>
                        {navbarOpen ?
                            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => {
                                setNavbarOpen(false)
                            }} className="navbar__burger" style={{marginRight:5}} width="14" height="14" viewBox="0 0 14 14"
                                 fill="none">
                                <path
                                    d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z"
                                    fill={home ? "white" : "var(--Courses-Base-Black)"}/>
                            </svg>
                            : <>
                                <svg onClick={()=>setSearchOpen(true)} style={{cursor:'pointer'}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none">
                                    <mask id="mask0_1953_11181" x="0" y="0"
                                          width="24" height="24">
                                        <rect width="24" height="24" fill="#D9D9D9"/>
                                    </mask>
                                    <g mask="url(#mask0_1953_11181)">
                                        <path
                                            d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z"
                                            fill={home ? "white" : "var(--Courses-Base-Black)"}/>
                                    </g>
                                </svg>
                                <svg onClick={() => {
                                    setNavbarOpen(true)
                                }} className="navbar__burger" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                     viewBox="0 0 24 24" fill="none">
                                    <path d="M3 18V16H21V18H3ZM3 13V11H21V13H3ZM3 8V6H21V8H3Z"
                                          fill={home ? "white" : "var(--Courses-Base-Black)"}/>
                                </svg>
                            </>
                        }
                    </div>
                </div>
                {navbarOpen &&
                    <div style={{
                        position: 'fixed',
                        top: 136,
                        background: '#fff',
                        width: '100%',
                        height: 'Calc(100vh - 136px)',
                        zIndex: 999,
                        gap:20,
                        display:'flex',
                        flexDirection:"column",
                        paddingTop:16,
                        overflow:'auto'
                    }}>
                        {navbarOptions.map(
                            (navbarOption, index) =>
                                <div className="nav__dropdown__mobile" key={index}>
                                    <div onClick={() => {
                                        if (navbarSelected === index) {
                                            setNavbarSelected(null)
                                        } else {
                                            setNavbarSelected(index)
                                        }
                                    }}
                                         style={{
                                             display: "flex",
                                             flexDirection: "row",
                                             alignItems: "center",
                                             justifyContent: 'space-between',
                                             width: '100%'
                                         }}
                                    >
                                        <h4>{navbarOption.name}</h4>
                                        {navbarSelected === index ?
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                 viewBox="0 0 24 24" fill="none">
                                                <path d="M12 10.8L7.4 15.4L6 14L12 8L18 14L16.6 15.4L12 10.8Z"
                                                      fill="#1A1A1A"/>
                                            </svg> :
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                 viewBox="0 0 24 24" fill="none">
                                                <path d="M12 15.4L6 9.4L7.4 8L12 12.6L16.6 8L18 9.4L12 15.4Z"
                                                      fill="#1A1A1A"/>
                                            </svg>
                                        }
                                    </div>
                                    {navbarSelected === index &&
                                        <div className="nav__dropdown__block__mobile">
                                            {navbarOption.options.map((dropdownOption, index) =>
                                                <DropdownItem key={index} link={navbarOption.link+dropdownOption.link}
                                                              suffixName={navbarOption.name.toLowerCase()}
                                                              name={dropdownOption.name} svg={dropdownOption.svg}/>
                                            )}
                                        </div>
                                    }
                                </div>
                        )}
                        <Link href="/contact-us" className='nav__dropdown__mobile'>
                            <h4 style={{marginRight:'auto'}}>
                                Contact Us
                            </h4>
                        </Link>
                    </div>
                }
            </nav>
            {searchOpen&&
                <SearchComponent closeSearch={()=>setSearchOpen(false)}/>
            }
        </>
    )
        ;
};

export default Navbar;