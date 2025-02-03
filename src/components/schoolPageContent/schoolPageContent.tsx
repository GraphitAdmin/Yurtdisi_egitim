'use client'
import PageSearch from "@/components/UI/PageSearch/PageSearch";
import CardCity from "@/components/UI/CardCity/CardCity";
import Button from "@/components/UI/Button/Button";
import Image from "next/image";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {ICity, ICountry} from "@/utils/interfaces";
import {blobUrl, cleanTitle} from "@/utils/utils";

interface CountryPageContentProps {
    slug: string;
    childId: string;
    country: ICountry;
}

const SchoolPageContent: React.FC<CountryPageContentProps> = ({slug, childId, country}) => {
    const [cities, setCities] = useState<ICity[]>([])
    const [showCitiesButton, setShowCitiesButton] = useState(false)
    const [showCities,setShowCities] = useState<ICity[]>([])
    useEffect(() => {
        const fetchJson = async () => {
            const localCities = localStorage.getItem('cities')
            if (localCities !== undefined && localCities !== null) {
                const filteredCities = JSON.parse(localCities).filter((city:ICity)=>cleanTitle(childId)===cleanTitle(city.country));
                setCities(filteredCities);
                setShowCities(filteredCities.slice(0, 9))
            }
            try {
                const citiesUrl = blobUrl + 'jsons/cities.json';
                const response = await fetch(citiesUrl, {
                    cache: 'no-store',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch JSON');
                }
                const jsonData = await response.json();
                const filteredCities = jsonData.filter((city:ICity)=>cleanTitle(childId)===cleanTitle(city.country));
                setCities(filteredCities);
                setShowCities(filteredCities.slice(0, 9))
                localStorage.setItem('cities', JSON.stringify(jsonData));
            } catch (err) {
                console.log(err);
            }
        };

        fetchJson().then();
    }, []);
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
                                      title={city.name}
                                      image_string={city.image}
                                      description={city.description}
                                      link={'/'+slug+'/'+'/'+childId+'/'+city.name.replace(/ /g, '-').toLowerCase()} buttonDetails={false}/>
                        )
                    }
                </div>
                {!showCitiesButton && cities.length > 9 &&
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
            {!showCitiesButton && cities.length > 9 &&
                <div className="page__country__schools__button">
                    <Button onClick={() => {
                        setShowCitiesButton(true)
                        setShowCities(cities)
                    }} label={'Show all cities'}/>
                </div>
            }

        </div>
    )
}
export default SchoolPageContent;