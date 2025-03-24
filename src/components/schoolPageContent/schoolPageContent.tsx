'use client'
import Image from "next/image";
import Link from "next/link";
import React, {useMemo, useState} from "react";
import {ISchool} from "@/utils/interfaces";
import {blobUrl} from "@/utils/utils";
import SchoolInfo from "@/components/school/SchoolInfo";
import RelatedSchools from "@/components/school/RelatedSchools/RelatedSchools";
import Button from "@/components/UI/Button/Button";

interface SchoolPageContentProps {
    subUniChildId: string;
    school: ISchool;
    relatedSchools: ISchool[];
    moreSchools: ISchool[];
}

const SchoolPageContent: React.FC<SchoolPageContentProps> = ({subUniChildId, school, relatedSchools, moreSchools}) => {
    const [showMore, setShowMore] = useState(false);
    console.log(moreSchools)
    const schoolsToShow = useMemo(() => {
        if (showMore === true) {
            return moreSchools
        } else {
            return moreSchools.slice(0, 7)
        }
    }, [showMore, moreSchools])
    console.log(schoolsToShow)
    return (
        <>
            <div className="page__container">
                {subUniChildId &&
                    <div style={{width: '100%'}}>
                        <h1 style={{textTransform: 'capitalize'}}>{school.title}</h1>
                    </div>
                }
                {school !== null &&
                    <div className="page__school">
                        <SchoolInfo school={school}/>
                        <div className="small__screens">
                            {school.promotions_pdf &&
                                <Button href={school.promotions_pdf} btnStyle={{width: '100%', padding: '12px 0'}}
                                        label={'Schools promotion'} promotionSVG={true}/>}
                            {school.discount_pdf &&
                                <Button href={school.discount_pdf} secondary={true}
                                        btnStyle={{width: '100%', padding: '12px 0'}} label={'Schools price list'}
                                        priceSVG={true}/>
                            }
                        </div>
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
                                           href={school.website.includes('https://')?school.website:'https://'+school.website}>{school.website.replace('https://', '')}</a>
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
                            <div className="big__screens">
                                {school.promotions_pdf &&
                                    <Button href={school.promotions_pdf} btnStyle={{width: '100%', padding: '12px 0'}}
                                            label={'Schools promotion'} promotionSVG={true}/>}
                            </div>
                            <div className="big__screens">
                                {school.discount_pdf &&
                                    <Button href={school.discount_pdf} secondary={true}
                                            btnStyle={{width: '100%', padding: '12px 0'}} label={'Schools price list'}
                                            priceSVG={true}/>
                                }
                            </div>


                            {moreSchools && moreSchools.length > 0 &&
                                <div className="page__country__schools__country__recommendations">
                                    <h5 style={{
                                        marginBottom: 4,
                                        textAlign: "left"
                                    }}>{school.country} {school.education_type.toLowerCase()}</h5>
                                    {schoolsToShow.map((schoolMap, index) =>
                                        <Link key={index}
                                              href={'/' + schoolMap.education_type.toLowerCase().replace(/ /g, '-') + '/' + schoolMap.country.toLowerCase().replace(/ /g, '-') + '/' + schoolMap.city.toLowerCase().replace(/ /g, '-') + '/' + schoolMap.title.replace(/ /g, '-').toLowerCase()}>
                                            <p>
                                                {schoolMap.title}</p>
                                        </Link>)
                                    }
                                    {moreSchools.length > 7 &&
                                        <div style={{display: 'flex', flexDirection: 'row', gap: 4, cursor: "pointer"}}>
                                            <p style={{
                                                fontWeight: 600,
                                                color: 'var(--courses-brand-blue-400-brand, #2E90FA)'
                                            }}
                                               onClick={() => setShowMore(!showMore)}>{showMore ? "Show less" : "Show more"}</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                 viewBox="0 0 24 24"
                                                 fill="none">
                                                <path d="M12 15.4L6 9.4L7.4 8L12 12.6L16.6 8L18 9.4L12 15.4Z"
                                                      fill="#2E90FA"/>
                                            </svg>
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                }
            </div>
            {school !== null &&
                <RelatedSchools relatedSchools={relatedSchools}/>
            }
        </>

    )
}
export default SchoolPageContent;