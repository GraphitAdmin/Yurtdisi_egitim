'use client'
import PageSearch from "@/components/UI/PageSearch/PageSearch";
import CardCity from "@/components/UI/CardCity/CardCity";
import Image from "next/image";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {ICity, ISchool} from "@/utils/interfaces";
import {blobUrl, cleanTitle} from "@/utils/utils";

interface CityPageContentProps {
    slug: string;
    childId: string;
    subChildId: string;
    initialCity: ICity;
    cities: ICity[];
}

const CityPageContent: React.FC<CityPageContentProps> = ({slug, childId, subChildId, initialCity, cities}) => {
    const [schools, setSchools] = useState<ISchool[]>([]);
    const [city] = useState<ICity>(initialCity);
    useEffect(() => {
        const fetchJson = async () => {
            const localSchools = localStorage.getItem('schools')
            if (localSchools !== undefined && localSchools !== null) {
                const filteredSchools = JSON.parse(localSchools).filter((school: ISchool) => cleanTitle(school.city) === cleanTitle(subChildId) && cleanTitle(slug) === cleanTitle(school.education_type) && school.website_active === 'Active');
                setSchools(filteredSchools);
            }
            try {
                const schoolsUrl = blobUrl + 'jsons/schools.json';
                const response = await fetch(schoolsUrl, {
                    cache: 'no-store',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch JSON');
                }
                const jsonData = await response.json();
                const filteredSchools = jsonData.filter((school: ISchool) => cleanTitle(school.city) === cleanTitle(subChildId) && cleanTitle(slug) === cleanTitle(school.education_type));
                setSchools(filteredSchools);
                localStorage.setItem('schools', JSON.stringify(jsonData));
            } catch (err) {
                console.log(err);
            }
        };
        fetchJson().then();
    }, []);

    return (
        <>
            <div className="page__container">
                <div style={{width: '100%'}}>
                    <h1 style={{textTransform: 'capitalize'}}>{subChildId.replace(/-/g, ' ')} {slug.replace(/-/g, ' ')}</h1>
                    <p>
                        You can find everything you want to know before you start researching&nbsp;
                        <span style={{fontWeight: 600}}>
                        language education abroad here.
                    </span>
                    </p>
                </div>
                <PageSearch/>
                {
                    schools.length > 0 ?
                        <div className="page__country__schools__schools">
                            {
                                schools.map((school, index) =>
                                    <CardCity key={index}
                                              title={school.title}
                                              description={school.school_overview}
                                              link={'/' + slug + '/' + childId + '/' + subChildId + '/' + school.title.replace(/ /g, '-').toLowerCase()}
                                              buttonDetails={true}
                                              image_string={school.image_right}/>
                                )
                            }
                        </div> : <h3 style={{color: 'var(--Courses-Base-Black)', width: '100%'}}>
                            Oops! Soon new schools will appear here.
                            Try returning to the homepage or using the menu to find what you need.
                        </h3>}
            </div>
            <div className="about__school">
                {city &&
                    <>
                        <div>
                            <h2>
                                About {city.name}
                            </h2>
                            <p>
                                {city.description}
                            </p>
                            {cities.length > 0 && <>
                                <h5 style={{textTransform: 'capitalize'}}>
                                    {childId.replace(/-/g, ' ')}&nbsp;{slug.replace(/-/g, ' ')}
                                </h5>
                                {cities.map((cityMap, index) =>
                                    <Link style={{textTransform: "capitalize"}}
                                          href={'/' + slug + '/' + childId + '/' + cityMap.name.replace(/ /g, '-').toLowerCase()}
                                          key={index}>
                                        {cityMap.name}&nbsp;{slug.replace(/-/g, ' ')}
                                    </Link>)}
                            </>}
                        </div>
                        <Image width={720} height={756} src={blobUrl + city.image} alt={city.name} unoptimized={true}/>
                    </>}
            </div>
        </>
    )
}
export default CityPageContent;