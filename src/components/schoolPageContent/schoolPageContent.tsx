'use client'
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {ISchool} from "@/utils/interfaces";
import {blobUrl} from "@/utils/utils";
import SchoolInfo from "@/components/school/SchoolInfo";
import RelatedSchools from "@/components/school/RelatedSchools/RelatedSchools";

interface SchoolPageContentProps {
    subUniChildId: string;
    school: ISchool;
}

const SchoolPageContent: React.FC<SchoolPageContentProps> = ({ subUniChildId, school}) => {
    return (
        <>
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
                                <Image width='273' height={152} src={blobUrl + school.image_right} alt={school.title}/>
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
        </>

    )
}
export default SchoolPageContent;