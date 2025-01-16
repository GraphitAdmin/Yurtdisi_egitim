import Navbar from "@/components/UI/Navbar/Navbar";
import Tabs from "@/components/UI/Tabs/Tabs";
import React from "react";
import '@/app/schools.css'
import Image from "next/image"
import Link from "next/link";
import Subscribe from "@/components/UI/FAQ/Subscribe";
import Footer from "@/components/UI/Footer/Footer";
import MillSchool from "@/assets/home/Mill_School.png"
import SchoolInfo from "@/components/school/SchoolInfo";
import Related from "@/components/school/RelatedSchools/RelatedSchools";
type paramsType = Promise<{ slug: string, childId: string, subChildId: string, subUniChildId: string }>;
export default async function Home({
                                       params,
                                   }: {
    params: paramsType;
}) {
    const {slug, childId, subChildId, subUniChildId} = await params
    console.log(slug)
    console.log(childId)
    console.log(subChildId)
    console.log(subUniChildId)
    const school={
        school:'Kaplan International Colleges',
        city:'Oxford',
        address:'3-4 Southampton Pl, WC1A 2DA',
        website:'https://www.kaplaninternational.com/',
        capacity:'250 Students',
        age:'16+',
        programs:'English Language Education',
        accommodation:'Homestay, Studio, Dormitory'
    }
    return (
        <div>
            <Navbar home={false}/>
            <Tabs/>
            <div className="page__container">
                <div style={{width: '100%'}}>
                    <h1 style={{textTransform: 'capitalize'}}>{subUniChildId.replace(/-/g, ' ')} {subChildId.replace(/-/g, ' ')} {slug.replace(/-/g, ' ')}</h1>
                </div>
                <div className="page__school">
                    <SchoolInfo/>
                    <div className="page__school__right">
                        <div className="page__school__right__info">
                            <Image src={MillSchool} alt="MillSchool"/>
                            {school.school&&
                            <div>
                                <p>School</p>
                                <p>{school.school}</p>
                            </div>
                            }
                            {school.city&&
                                <div>
                                    <p>City</p>
                                    <p>{school.city}</p>
                                </div>
                            }
                            {school.address &&
                                <div>
                                    <p>Address</p>
                                    <p>{school.address}</p>
                                </div>
                            }
                            {school.website &&
                                <div>
                                    <p>Website</p>
                                    <a style={{color: 'var(--courses-brand-blue-400-brand)'}} href={school.website}>{school.website.replace('https://','')}</a>
                                </div>
                            }
                            {school.capacity &&
                                <div>
                                    <p>Capacity</p>
                                    <p>{school.capacity}</p>
                                </div>
                            }
                            {school.age &&
                                <div>
                                    <p>Age group</p>
                                    <p>{school.age}</p>
                                </div>
                            }
                            {school.programs &&
                                <div>
                                    <p>Programs</p>
                                    <p>{school.programs}</p>
                                </div>
                            }
                            {school.accommodation &&
                                <div>
                                    <p>Accommodation</p>
                                    <p>{school.accommodation}</p>
                                </div>
                            }
                        </div>
                        <div className="page__country__schools__country__recommendations">
                        <h5 style={{marginBottom: 4}}>Foreign language schools</h5>
                            <Link href={'/smth'}><p>
                                UK language schools</p>
                            </Link>
                            <Link href={'/smth'}><p>
                                UK language schools</p>
                            </Link>
                            <Link href={'/smth'}><p>
                                UK language schools</p>
                            </Link>
                            <Link href={'/smth'}><p>
                                UK language schools</p>
                            </Link>
                            <Link href={'/smth'}><p>
                                UK language schools</p>
                            </Link>
                            <div style={{display: 'flex', flexDirection: 'row', gap: 4, cursor: "pointer"}}>
                                <p style={{
                                    fontWeight: 600,
                                    color: 'var(--courses-brand-blue-400-brand, #2E90FA)'
                                }}>Show more</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none">
                                    <path d="M12 15.4L6 9.4L7.4 8L12 12.6L16.6 8L18 9.4L12 15.4Z" fill="#2E90FA"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Related/>
            <Subscribe/>
            <Footer/>
        </div>
    )
        ;
}

