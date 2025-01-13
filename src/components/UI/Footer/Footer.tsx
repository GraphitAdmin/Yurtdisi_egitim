'use client'
import Link from "next/link";
import Logo from "@/components/UI/Logo/Logo";

const Footer = () => {
    return (
        <>
            <footer>
                <div className="footer__main">
                    <div className="footer__header">
                        <div>
                            <Logo color='var(--courses-brand-blue-400-brand)'/>
                        </div>
                        <div>
                            <div className="social__circle">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                     fill="none">
                                    <path
                                        d="M14.4493 4.5513C14.2516 4.5513 14.0582 4.60995 13.8938 4.71983C13.7293 4.82971 13.6012 4.98589 13.5255 5.16862C13.4498 5.35134 13.43 5.55241 13.4686 5.74639C13.5071 5.94037 13.6024 6.11856 13.7422 6.25841C13.8821 6.39826 14.0603 6.4935 14.2543 6.53209C14.4482 6.57067 14.6493 6.55087 14.832 6.47518C15.0148 6.39949 15.1709 6.27132 15.2808 6.10687C15.3907 5.94242 15.4494 5.74908 15.4494 5.5513C15.4494 5.28609 15.344 5.03173 15.1565 4.8442C14.9689 4.65666 14.7146 4.5513 14.4493 4.5513V4.5513ZM18.2827 6.56797C18.2665 5.87655 18.137 5.19247 17.8993 4.54297C17.6875 3.98725 17.3577 3.48403 16.9327 3.06797C16.52 2.64082 16.0156 2.31312 15.4577 2.10964C14.8099 1.86477 14.1251 1.73231 13.4327 1.71797C12.5494 1.66797 12.266 1.66797 9.99935 1.66797C7.73268 1.66797 7.44935 1.66797 6.56602 1.71797C5.87364 1.73231 5.1888 1.86477 4.54102 2.10964C3.98408 2.31518 3.48013 2.6426 3.06602 3.06797C2.63887 3.48062 2.31116 3.985 2.10768 4.54297C1.86282 5.19075 1.73036 5.8756 1.71602 6.56797C1.66602 7.4513 1.66602 7.73464 1.66602 10.0013C1.66602 12.268 1.66602 12.5513 1.71602 13.4346C1.73036 14.127 1.86282 14.8118 2.10768 15.4596C2.31116 16.0176 2.63887 16.522 3.06602 16.9346C3.48013 17.36 3.98408 17.6874 4.54102 17.893C5.1888 18.1378 5.87364 18.2703 6.56602 18.2846C7.44935 18.3346 7.73268 18.3346 9.99935 18.3346C12.266 18.3346 12.5494 18.3346 13.4327 18.2846C14.1251 18.2703 14.8099 18.1378 15.4577 17.893C16.0156 17.6895 16.52 17.3618 16.9327 16.9346C17.3596 16.5201 17.6896 16.0165 17.8993 15.4596C18.137 14.8101 18.2665 14.1261 18.2827 13.4346C18.2827 12.5513 18.3327 12.268 18.3327 10.0013C18.3327 7.73464 18.3327 7.4513 18.2827 6.56797V6.56797ZM16.7827 13.3346C16.7766 13.8636 16.6808 14.3877 16.4993 14.8846C16.3663 15.2473 16.1526 15.575 15.8743 15.843C15.6041 16.1184 15.277 16.3317 14.916 16.468C14.4191 16.6494 13.895 16.7452 13.366 16.7513C12.5327 16.793 12.2243 16.8013 10.0327 16.8013C7.84102 16.8013 7.53268 16.8013 6.69935 16.7513C6.15009 16.7616 5.60318 16.677 5.08268 16.5013C4.7375 16.358 4.42548 16.1453 4.16602 15.8763C3.88942 15.6086 3.67839 15.2806 3.54935 14.918C3.3459 14.4139 3.23305 13.8779 3.21602 13.3346C3.21602 12.5013 3.16602 12.193 3.16602 10.0013C3.16602 7.80964 3.16602 7.5013 3.21602 6.66797C3.21975 6.12718 3.31847 5.59126 3.50768 5.08464C3.65439 4.73289 3.87957 4.41935 4.16602 4.16797C4.41919 3.88144 4.73209 3.65388 5.08268 3.5013C5.59064 3.31801 6.12601 3.2222 6.66602 3.21797C7.49935 3.21797 7.80768 3.16797 9.99935 3.16797C12.191 3.16797 12.4993 3.16797 13.3327 3.21797C13.8617 3.22404 14.3858 3.31984 14.8827 3.5013C15.2614 3.64185 15.6013 3.87034 15.8743 4.16797C16.1474 4.42395 16.3608 4.73691 16.4993 5.08464C16.6846 5.59208 16.7804 6.12779 16.7827 6.66797C16.8243 7.5013 16.8327 7.80964 16.8327 10.0013C16.8327 12.193 16.8243 12.5013 16.7827 13.3346ZM9.99935 5.7263C9.15419 5.72795 8.32848 5.98007 7.62656 6.45082C6.92464 6.92156 6.378 7.5898 6.05571 8.3711C5.73342 9.15239 5.64995 10.0117 5.81584 10.8404C5.98174 11.6691 6.38955 12.4301 6.98775 13.0271C7.58595 13.6242 8.34769 14.0305 9.17673 14.1948C10.0058 14.359 10.8649 14.2739 11.6456 13.9501C12.4262 13.6263 13.0934 13.0783 13.5628 12.3755C14.0322 11.6727 14.2827 10.8465 14.2827 10.0013C14.2838 9.43889 14.1737 8.88181 13.9587 8.3621C13.7437 7.84239 13.4281 7.37031 13.0301 6.97301C12.632 6.57571 12.1593 6.26103 11.6392 6.04708C11.1191 5.83312 10.5618 5.7241 9.99935 5.7263V5.7263ZM9.99935 12.7763C9.45051 12.7763 8.91399 12.6136 8.45764 12.3086C8.0013 12.0037 7.64562 11.5703 7.43558 11.0632C7.22555 10.5562 7.1706 9.99822 7.27767 9.45993C7.38474 8.92163 7.64904 8.42717 8.03713 8.03908C8.42522 7.65099 8.91968 7.3867 9.45797 7.27962C9.99627 7.17255 10.5542 7.2275 11.0613 7.43754C11.5684 7.64757 12.0018 8.00325 12.3067 8.45959C12.6116 8.91594 12.7743 9.45246 12.7743 10.0013C12.7743 10.3657 12.7026 10.7266 12.5631 11.0632C12.4237 11.3999 12.2193 11.7058 11.9616 11.9635C11.7039 12.2212 11.398 12.4256 11.0613 12.5651C10.7246 12.7045 10.3638 12.7763 9.99935 12.7763V12.7763Z"
                                        fill="white"/>
                                </svg>
                            </div>
                            <div className="social__circle"
                                 onClick={() => window.open("https://www.linkedin.com/company/graphit-co-uk/?viewAsMember=true", "_blank")}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"
                                     fill="none">
                                    <path
                                        d="M17.0585 1.66809H2.9418C2.78311 1.66588 2.62555 1.69496 2.4781 1.75366C2.33066 1.81235 2.19622 1.89952 2.08246 2.01018C1.96871 2.12084 1.87786 2.25282 1.81512 2.39859C1.75238 2.54436 1.71897 2.70107 1.7168 2.85975V17.1431C1.71897 17.3018 1.75238 17.4585 1.81512 17.6042C1.87786 17.75 1.96871 17.882 2.08246 17.9927C2.19622 18.1033 2.33066 18.1905 2.4781 18.2492C2.62555 18.3079 2.78311 18.337 2.9418 18.3348H17.0585C17.2171 18.337 17.3747 18.3079 17.5222 18.2492C17.6696 18.1905 17.804 18.1033 17.9178 17.9927C18.0316 17.882 18.1224 17.75 18.1851 17.6042C18.2479 17.4585 18.2813 17.3018 18.2835 17.1431V2.85975C18.2813 2.70107 18.2479 2.54436 18.1851 2.39859C18.1224 2.25282 18.0316 2.12084 17.9178 2.01018C17.804 1.89952 17.6696 1.81235 17.5222 1.75366C17.3747 1.69496 17.2171 1.66588 17.0585 1.66809V1.66809ZM6.7418 15.6181H4.2418V8.11809H6.7418V15.6181ZM5.4918 7.06809C5.14702 7.06809 4.81636 6.93112 4.57256 6.68732C4.32876 6.44353 4.1918 6.11287 4.1918 5.76809C4.1918 5.4233 4.32876 5.09264 4.57256 4.84885C4.81636 4.60505 5.14702 4.46809 5.4918 4.46809C5.67488 4.44732 5.86028 4.46546 6.03586 4.52132C6.21144 4.57718 6.37325 4.66949 6.51068 4.79222C6.64811 4.91495 6.75807 5.06532 6.83336 5.23349C6.90864 5.40166 6.94756 5.58383 6.94756 5.76809C6.94756 5.95234 6.90864 6.13451 6.83336 6.30268C6.75807 6.47085 6.64811 6.62122 6.51068 6.74395C6.37325 6.86668 6.21144 6.95899 6.03586 7.01485C5.86028 7.07071 5.67488 7.08885 5.4918 7.06809V7.06809ZM15.7585 15.6181H13.2585V11.5931C13.2585 10.5848 12.9001 9.92642 11.9918 9.92642C11.7107 9.92848 11.437 10.0167 11.2075 10.1791C10.978 10.3415 10.8039 10.5703 10.7085 10.8348C10.6433 11.0306 10.615 11.2369 10.6251 11.4431V15.6098H8.12513C8.12513 15.6098 8.12513 8.79309 8.12513 8.10975H10.6251V9.16809C10.8522 8.77401 11.1826 8.44935 11.5805 8.22909C11.9784 8.00882 12.4289 7.9013 12.8835 7.91809C14.5501 7.91809 15.7585 8.99309 15.7585 11.3014V15.6181Z"
                                        fill="white"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="footer__body">
                        <div>
                            <Link href='/text'><h6>Language schools</h6></Link>
                            <Link href='/text'><p>UK Language schools</p></Link>
                            <Link href='/text'><p>UK Language schools</p></Link>
                            <Link href='/text'><p>UK Language schools</p></Link>
                            <Link href='/text'><p>UK Language schools</p></Link>
                            <Link href='/text'><p>UK Language schools</p></Link>
                        </div>
                        <div>
                            <Link href='/text'><h6>Language schools</h6></Link>
                            <Link href='/text'><p>UK Language schools</p></Link>
                            <Link href='/text'><p>UK Language schools</p></Link>
                            <Link href='/text'><p>UK Language schools</p></Link>
                            <Link href='/text'><p>UK Language schools</p></Link>
                        </div>
                        <div>
                            <Link href='/text'><h6>Language schools</h6></Link>
                            <Link href='/text'><p>UK Language schools</p></Link>
                            <Link href='/text'><p>UK Language schools</p></Link>
                        </div>
                        <div>
                            <Link href='/text'><h6>Language schools</h6></Link>
                            <Link href='/text'><p>UK Language schools</p></Link>
                            <Link href='/text'><p>UK Language schools</p></Link>
                            <Link href='/text'><p>UK Language schools</p></Link>
                        </div>
                        <div>
                            <Link href='/text'><h6>Language schools</h6></Link>
                            <Link href='/text'><p>UK Language schools</p></Link>
                            <Link href='/text'><p>UK Language schools</p></Link>
                            <Link href='/text'><p>UK Language schools</p></Link>
                            <Link href='/text'><p>UK Language schools</p></Link>
                        </div>
                        <div>
                            <Link href='/text'><h6>Company</h6></Link>
                            <Link href='/about-us'><p>About us</p></Link>
                            <Link href='/contact-us'><p>Contact us</p></Link>
                        </div>

                    </div>
                </div>
                <span style={{
                    height: 2,
                    background: 'var(--Courses-Gray-Gray-200)',
                    width: '100%',
                    maxWidth: 1600
                }}/>
                <div className="footer__bottom">
                    <p>Copyright 2022</p>
                    <div>
                        <p>Privacy policy</p>
                        <p>Cookies</p>
                    </div>
                </div>
            </footer>
        </>
    )
        ;
};

export default Footer;