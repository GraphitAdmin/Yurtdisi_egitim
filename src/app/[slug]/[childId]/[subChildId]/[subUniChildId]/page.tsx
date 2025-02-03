import Navbar from "@/components/UI/Navbar/Navbar";
import Tabs from "@/components/UI/Tabs/Tabs";
import Link from "next/link";
import Image from "next/image";
import Subscribe from "@/components/UI/FAQ/Subscribe";
import Footer from "@/components/UI/Footer/Footer";
import SchoolInfo from "@/components/school/SchoolInfo";
import RelatedSchools from "@/components/school/RelatedSchools/RelatedSchools";
import {ISchool} from "@/utils/interfaces";
import {blobUrl, cleanTitle} from "@/utils/utils";
import {notFound} from "next/navigation";
import React from "react";

const fetchSchool = async (subUniChildId: string) => {
    let schoolFinded = false;
    const cleanedName = cleanTitle(subUniChildId)
    try {
        const schoolsUrl = blobUrl + 'jsons/schools.json';
        const response = await fetch(schoolsUrl, {
            cache: 'no-store',
        });
        if (!response.ok) {
            throw new Error('Failed to fetch JSON');
        }
        const jsonData = await response.json();
        localStorage.setItem('schools', JSON.stringify(jsonData));
        for (const school of jsonData) {
            const cleanedTitle = cleanTitle(school.title)
            console.log('name', cleanedName)
            console.log('title', cleanedTitle)
            if (cleanedTitle === cleanedName) {
                schoolFinded = true
                return school;
            }
        }
        if (schoolFinded === false) {
            notFound()
        }
    } catch (err) {
        console.log(err);
        notFound()
    }
}
type paramsType = Promise<{ slug: string, childId: string, subChildId: string, subUniChildId: string }>;
export default async function Home({
                                       params,
                                   }: {
    params: paramsType;
}) {
    const {subUniChildId} = await params
    const school:ISchool = await fetchSchool(subUniChildId)
    return (
        <div>
            <Navbar home={false}/>
            <Tabs/>
            <div className="page__container">
                {subUniChildId &&
                    <div style={{width: '100%'}}>
                        <h1 style={{textTransform: 'capitalize'}}>{subUniChildId.replace(/-/g, ' ')}</h1>
                    </div>
                }
                {school !== null &&
                    <div className="page__school">
                        <SchoolInfo school={school}/>
                        <div className="page__school__right">
                            <div className="page__school__right__info">
                                <Image width='273' height={152} src={blobUrl + school.image_right} alt="MillSchool"/>
                                {school.title &&
                                    <div>
                                        <p>School</p>
                                        <p>{school.title}</p>
                                    </div>
                                }
                                {school.city &&
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
                                        <a style={{color: 'var(--courses-brand-blue-400-brand)'}}
                                           href={school.website}>{school.website.replace('https://', '')}</a>
                                    </div>
                                }
                                {school.capacity &&
                                    <div>
                                        <p>Capacity</p>
                                        <p>{school.capacity}</p>
                                    </div>
                                }
                                {school.age_group &&
                                    <div>
                                        <p>Age group</p>
                                        <p>{school.age_group}</p>
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
                }
            </div>
            {school !== null &&
                <RelatedSchools/>
            }
            <Subscribe/>
            <Footer/>
        </div>
    )
        ;
}

