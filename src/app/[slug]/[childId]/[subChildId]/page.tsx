"use client";
import Navbar from "@/components/UI/Navbar/Navbar";
import Tabs from "@/components/UI/Tabs/Tabs";
import Button from "@/components/UI/Button/Button";
import PageSearch from "@/components/UI/PageSearch/PageSearch";
import UK from "@/assets/countries/UK.png"
import React from "react";
import '../../../schools.css'
import CardCity from "@/components/UI/CardCity/CardCity";
import Image from "next/image"
import Oxford from "@/assets/schools/Oxford.png";
import Link from "next/link";
import Abroads from "@/components/UI/Abroads/Abroads";
import Subscribe from "@/components/UI/FAQ/Subscribe";
import Footer from "@/components/UI/Footer/Footer";
type paramsType = Promise<{ slug: string, childId: string,subChildId:string }>;
export default async function Home({
                                       params,
                                   }: {
    params: paramsType;
}) {
    const {slug,childId,subChildId} = await params
    console.log(slug)
    console.log(childId)
    console.log(subChildId)
    return (
        <div>
            <Navbar home={false}/>
            <Tabs/>
            <div className="page__container">
                <div style={{width: '100%'}}>
                    <h1  style={{textTransform:'capitalize'}}>{subChildId.replace(/-/g, ' ')} {slug.replace(/-/g, ' ')}</h1>
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
                        Array.from({length: 9}, (_, index) =>
                            <CardCity key={index}
                                      title='London School'
                                      imgPost={UK}
                                      description={'Located in the southeast of England, Oxford is home to the world\'s most famous university, Oxford University. Located 80 kilometers from the capital London and accessible 24 hours a day, Oxford is the center of cultural activity in England with a student population of 30%. The historic buildings of Oxford University, spread throughout the city, attract tens of thousands of tourists to Oxford every year. The many parks in the city allow the greenery to merge with a historical texture and create fascinating, peaceful landscapes. Oxford, which also hosts many language schools for English language education, is a great destination for those who want to study in England.'}
                                      link={'/'+slug+'/'+childId+'/london'} buttonDetails={true}/>
                        )
                    }
                </div>
                <Button label={'Show all countries'}/>
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
            <Abroads/>
            <Subscribe/>
            <Footer/>
        </div>
    );
}

