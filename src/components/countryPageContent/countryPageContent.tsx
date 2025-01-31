'use client'
import PageSearch from "@/components/UI/PageSearch/PageSearch";
import CardCity from "@/components/UI/CardCity/CardCity";
import London from "@/assets/cities/London.png";
import Oxford from "@/assets/schools/Test.jpeg";
import Sevenoaks from "@/assets/schools/Sevenoaks.jpg";
import Button from "@/components/UI/Button/Button";
import Image from "next/image";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {CardCityProps, ICountry} from "@/utils/interfaces";

interface CountryPageContentProps {
    slug: string;
    childId: string;
    country:ICountry;
}

const CountryPageContent: React.FC<CountryPageContentProps> = ({slug, childId,country}) => {
    const cities = [
        {
            title: 'London',
            imgPost: London,
            description: 'Located in the southeast of England, Oxford is home to the world\'s most famous university, Oxford University. Located 80 kilometers from the capital London and accessible 24 hours a day, Oxford is the center of cultural activity in England with a student population of 30%. The historic buildings of Oxford University, spread throughout the city, attract tens of thousands of tourists to Oxford every year. The many parks in the city allow the greenery to merge with a historical texture and create fascinating, peaceful landscapes. Oxford, which also hosts many language schools for English language education, is a great destination for those who want to study in England.',
            link: '/' + slug + '/' + childId + '/london',
            buttonDetails: false
        },
        {
            title: 'Oxford',
            imgPost: Oxford,
            description: 'Located in the southeast of England, Oxford is home to the world\'s most famous university, Oxford University. Located 80 kilometers from the capital London and accessible 24 hours a day, Oxford is the center of cultural activity in England with a student population of 30%. The historic buildings of Oxford University, spread throughout the city, attract tens of thousands of tourists to Oxford every year. The many parks in the city allow the greenery to merge with a historical texture and create fascinating, peaceful landscapes. Oxford, which also hosts many language schools for English language education, is a great destination for those who want to study in England.',
            link: '/' + slug + '/' + childId + '/oxford',
            buttonDetails: false
        },
        {
            title: 'Sevenoaks',
            imgPost: Sevenoaks,
            description: 'Located in the southeast of England, Oxford is home to the world\'s most famous university, Oxford University. Located 80 kilometers from the capital London and accessible 24 hours a day, Oxford is the center of cultural activity in England with a student population of 30%. The historic buildings of Oxford University, spread throughout the city, attract tens of thousands of tourists to Oxford every year. The many parks in the city allow the greenery to merge with a historical texture and create fascinating, peaceful landscapes. Oxford, which also hosts many language schools for English language education, is a great destination for those who want to study in England.',
            link: '/' + slug + '/' + childId + '/sevenoaks',
            buttonDetails: false
        },
        {
            title: 'Sevenoaks',
            imgPost: Sevenoaks,
            description: 'Located in the southeast of England, Oxford is home to the world\'s most famous university, Oxford University. Located 80 kilometers from the capital London and accessible 24 hours a day, Oxford is the center of cultural activity in England with a student population of 30%. The historic buildings of Oxford University, spread throughout the city, attract tens of thousands of tourists to Oxford every year. The many parks in the city allow the greenery to merge with a historical texture and create fascinating, peaceful landscapes. Oxford, which also hosts many language schools for English language education, is a great destination for those who want to study in England.',
            link: '/' + slug + '/' + childId + '/sevenoaks',
            buttonDetails: false
        },
        {
            title: 'London',
            imgPost: London,
            description: 'Located in the southeast of England, Oxford is home to the world\'s most famous university, Oxford University. Located 80 kilometers from the capital London and accessible 24 hours a day, Oxford is the center of cultural activity in England with a student population of 30%. The historic buildings of Oxford University, spread throughout the city, attract tens of thousands of tourists to Oxford every year. The many parks in the city allow the greenery to merge with a historical texture and create fascinating, peaceful landscapes. Oxford, which also hosts many language schools for English language education, is a great destination for those who want to study in England.',
            link: '/' + slug + '/' + childId + '/london',
            buttonDetails: false
        },
        {
            title: 'Oxford',
            imgPost: Oxford,
            description: 'Located in the southeast of England, Oxford is home to the world\'s most famous university, Oxford University. Located 80 kilometers from the capital London and accessible 24 hours a day, Oxford is the center of cultural activity in England with a student population of 30%. The historic buildings of Oxford University, spread throughout the city, attract tens of thousands of tourists to Oxford every year. The many parks in the city allow the greenery to merge with a historical texture and create fascinating, peaceful landscapes. Oxford, which also hosts many language schools for English language education, is a great destination for those who want to study in England.',
            link: '/' + slug + '/' + childId + '/oxford',
            buttonDetails: false
        }
    ]
    const [showCitiesButton, setShowCitiesButton] = useState(false)

    const [showCities, setShowCities] = useState<CardCityProps[]>()
    useEffect(() => {
        setShowCities(cities.slice(0, 9))
    }, [])
    return (
        <div className="page__container">
            <div style={{width: '100%'}}>
                <h1 style={{textTransform: 'capitalize'}}>{childId.replace(/-/g, ' ')} {slug.replace(/-/g, ' ')}</h1>
                <p>
                    You can find everything you want to know before you start researching&nbsp;
                    <span style={{fontWeight: 600}}>
                        language education abroad here.
                    </span>
                </p>
            </div>
            <PageSearch/>
            <div className="page__country__schools">
                <div className="page__country__schools__schools">
                    {
                        showCities && showCities.map((city, index) =>
                            <CardCity key={index}
                                      title={city.title}
                                      imgPost={city.imgPost}
                                      description={city.description}
                                      link={city.link} buttonDetails={false}/>
                        )
                    }
                </div>
                {!showCitiesButton&&cities.length>9 &&
                    <div className="page__country__schools__button__tablet">
                        <Button onClick={() => {
                            setShowCitiesButton(true)
                            setShowCities(cities)
                        }} label={'Show all cities'}/>
                    </div>
                }
                <div className="page__country__schools__country">
                    <div className="page__country__schools__country__info">
                        <Image src={country.imgPost} alt='UK'/>
                        <p style={{
                            fontWeight: 400,
                            color: 'var(--Courses-Gray-Gray-500)',
                            marginTop: 10
                        }}>
                            Country
                        </p>
                        <p
                            style={{color: 'var(--Courses-Base-Black)'}}
                        >
                            {country.name}
                        </p>
                        <p style={{
                            fontWeight: 400,
                            color: 'var(--Courses-Gray-Gray-500)',
                            marginTop: 6
                        }}>
                            Capital
                        </p>
                        <p
                            style={{color: 'var(--Courses-Base-Black)'}}
                        >
                            {country.capital}
                        </p>
                        <p style={{
                            fontWeight: 400,
                            color: 'var(--Courses-Gray-Gray-500)',
                            marginTop: 6
                        }}>
                            Face measurement
                        </p>
                        <p
                            style={{color: 'var(--Courses-Base-Black)'}}
                        >
                            130,279 km²
                        </p>
                        <p style={{
                            fontWeight: 400,
                            color: 'var(--Courses-Gray-Gray-500)',
                            marginTop: 6
                        }}>
                            Population
                        </p>
                        <p
                            style={{color: 'var(--Courses-Base-Black)'}}
                        >
                            {country.population}
                        </p>
                        <p style={{
                            fontWeight: 400,
                            color: 'var(--Courses-Gray-Gray-500)',
                            marginTop: 6
                        }}>
                            Official language
                        </p>
                        <p
                            style={{color: 'var(--Courses-Base-Black)'}}
                        >
                            {country.language}
                        </p>
                        <p style={{
                            fontWeight: 400,
                            color: 'var(--Courses-Gray-Gray-500)',
                            marginTop: 6
                        }}>
                            Currency
                        </p>
                        <p
                            style={{color: 'var(--Courses-Base-Black)'}}
                        >
                            GBP (Pound)
                        </p>
                        <p style={{
                            fontWeight: 400,
                            color: 'var(--Courses-Gray-Gray-500)',
                            marginTop: 6
                        }}>
                            Telephone code
                        </p>
                        <p
                            style={{color: 'var(--Courses-Base-Black)'}}
                        >
                            +44
                        </p>
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
            {!showCitiesButton&&cities.length>9 &&
                <div className="page__country__schools__button">
                    <Button onClick={() => {
                        setShowCitiesButton(true)
                        setShowCities(cities)
                    }}  label={'Show all cities'}/>
                </div>
            }

        </div>
    )
}
export default CountryPageContent;