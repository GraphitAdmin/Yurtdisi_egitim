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
}

const CityPageContent: React.FC<CityPageContentProps> = ({slug, childId, subChildId}) => {
    const [schools, setSchools] = useState<ISchool[]>([]);
    const [city, setCity] = useState<ICity>();
    useEffect(() => {
        const fetchJson = async () => {
            const localSchools = localStorage.getItem('schools')
            if (localSchools !== undefined && localSchools !== null) {
                const filteredSchools = JSON.parse(localSchools).filter((school: ISchool) => cleanTitle(school.city) === cleanTitle(subChildId) && cleanTitle(slug) === cleanTitle(school.education_type));
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
                console.log(filteredSchools)
                localStorage.setItem('schools', JSON.stringify(jsonData));
            } catch (err) {
                console.log(err);
            }
        };
        fetchJson().then();
        fetch(`${blobUrl}jsons/cities.json`, {
            cache: "no-store",
            next: {revalidate: 1},
        })
            .then((response) => response.json())
            .then((data: ICity[]) => {
                for (const cityMap of data) {
                    if (cleanTitle(cityMap.name) === cleanTitle(subChildId)) {
                        setCity(cityMap);
                        break;
                    }
                }
            })
            .catch((err) => {
                console.error(err);
            });
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
                </div>
            </div>
            {city &&
                <div className="about__school">
                    <div>
                        <h2>
                            About {city.name}
                        </h2>
                        <p>
                            {city.description}
                        </p>
                        <h5>
                            {childId}&nbsp;{slug}
                        </h5>
                        <Link href={'/smth'}>
                            Bath Language Schools
                        </Link>
                        <Link href={'/smth'}>
                            Belfast | Northern Ireland Language Schools
                        </Link>
                        <Link href={'/smth'}>
                            Birmingham Language Schools
                        </Link>
                        <Link href={'/smth'}>
                            Bournemouth Language Schools
                        </Link>
                    </div>
                    <Image width={720} height={756} src={blobUrl + city.image} alt="school"/>
                </div>
            }
        </>
    )
}
export default CityPageContent;