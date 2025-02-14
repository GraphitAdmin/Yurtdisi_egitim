'use client'
import PageSearch from "@/components/UI/PageSearch/PageSearch";
import CardCity from "@/components/UI/CardCity/CardCity";
import Button from "@/components/UI/Button/Button";
import Image from "next/image";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {ICity, ICountry} from "@/utils/interfaces";
import {blobUrl, cleanTitle} from "@/utils/utils";
import {navbarOptions} from "@/data/navbarOptions";
interface CountryPageContentProps {
    slug: string;
    childId: string;
    country: ICountry;
}

const CountryPageContent: React.FC<CountryPageContentProps> = ({slug, childId, country}) => {
    const [cities, setCities] = useState<ICity[]>([])
    const [showCitiesButton, setShowCitiesButton] = useState(false)
    const [showCities, setShowCities] = useState<ICity[]>([])
    useEffect(() => {
        const fetchJson = async () => {
            const localCities = localStorage.getItem('cities')
            if (localCities !== undefined && localCities !== null) {
                const filteredCities = JSON.parse(localCities).filter((city: ICity) => cleanTitle(childId) === cleanTitle(city.country));
                setCities(filteredCities);
                console.log('here')
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
                const filteredCities = jsonData.filter((city: ICity) => cleanTitle(childId) === cleanTitle(city.country));
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
                {
                    showCities.length > 0 ?
                        <div className="page__country__schools__schools">
                            {showCities.map((city, index) =>
                            <CardCity key={index}
                                      title={city.name}
                                      image_string={city.image}
                                      description={city.description}
                                      link={'/' + slug + '/' + '/' + childId + '/' + city.name.replace(/ /g, '-').toLowerCase()}
                                      buttonDetails={false}/>
                            )}
                        </div> :
                        <h3 style={{color: 'var(--Courses-Base-Black)', width: '100%'}}>
                            Oops! Soon new cities will appear here.
                            Try returning to the homepage or using the menu to find what you need.
                        </h3>
                }
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
                        <Image src={country.imgPost} alt={country+" flag"}/>
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
                            {country.faceMeasurement} km²
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
                            {country.currency}
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
                            {country.telephoneCode}
                        </p>
                    </div>
                    <div className="page__country__schools__country__recommendations">
                        <h5 style={{marginBottom: 4}}>Foreign language schools</h5>
                        {navbarOptions[0].options.map((countryOption,index)=>
                        !country.link.includes(countryOption.link)&& <Link key={index} href={'/'+slug+countryOption.link}><p>{countryOption.name}&nbsp;{slug.replace(/-/g, ' ')}</p></Link>)}
                    </div>
                </div>
            </div>
            {
                !showCitiesButton && cities.length > 9 &&
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
export default CountryPageContent;