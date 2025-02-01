'use client'
import PageSearch from "@/components/UI/PageSearch/PageSearch";
import CardCity from "@/components/UI/CardCity/CardCity";
import Oxford from "@/assets/schools/Test.jpeg";
import Image from "next/image";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {ISchool} from "@/utils/interfaces";
import {blobUrl} from "@/utils/utils";

interface CityPageContentProps {
    slug: string;
    childId: string;
    subChildId: string;
}

const CityPageContent: React.FC<CityPageContentProps> = ({slug, childId, subChildId}) => {
    const [schools, setSchools] = useState<ISchool[]>([]);
    useEffect(() => {
        const fetchJson = async () => {
            const localSchools=localStorage.getItem('schools')
            if(localSchools!==undefined&&localSchools!==null) {
                setSchools(JSON.parse(localSchools));
            }
            try {
                const schoolsUrl = blobUrl+'jsons/schools.json';
                const response = await fetch(schoolsUrl, {
                    cache: 'no-store',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch JSON');
                }
                const jsonData = await response.json();
                setSchools(jsonData);
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
                <div className="page__country__schools__schools">
                    {
                        schools.map((school, index) =>
                            <CardCity key={index}
                                      title={school.title}
                                      description={school.school_overview}
                                      link={'/'+slug+'/'+childId+'/'+subChildId+'/'+school.title.replace(/ /g, '-').toLowerCase()}
                                      buttonDetails={true}
                                      image_string={school.image_right}/>
                        )
                    }
                </div>
            </div>
            <div className="about__school">
                <div>
                    <h2>
                        About Oxford
                    </h2>
                    <p>
                        Located in the southeast of England, Oxford is home to the world&#39;s most famous university,
                        Oxford University. Located 80 kilometers from the capital London and accessible 24 hours a day,
                        Oxford is the center of cultural activity in England with a student population of 30%. The
                        historic buildings of Oxford University, spread throughout the city, attract tens of thousands
                        of tourists to Oxford every year. The many parks in the city allow the greenery to merge with a
                        historical texture and create fascinating, peaceful landscapes. Oxford, which also hosts many
                        language schools for English language education, is a great destination for those who want to
                        study in England.
                    </p>
                    <h5>
                        UK language schools
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
                <Image src={Oxford} alt="school"/>
            </div>
        </>
    )
}
export default CityPageContent;