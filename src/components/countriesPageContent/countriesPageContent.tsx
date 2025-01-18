'use client'
import PageSearch from "@/components/UI/PageSearch/PageSearch";
import Button from "@/components/UI/Button/Button";
import UK from "@/assets/countries/UK.png";
import US from "@/assets/countries/US.png";
import Canada from "@/assets/countries/Canada.png";
import Germany from "@/assets/countries/Germany.webp";
import React, {useEffect, useState} from "react";
import {CardCountryProps} from "@/utils/interfaces";
import CardCountry from "@/components/UI/CardCountry/CardCountry";

interface CountriesPageContentProps {
    slug: string;
}

const CountriesPageContent: React.FC<CountriesPageContentProps> = ({slug}) => {
    const countries = [
        {
            title: 'United Kingdom',
            capital: 'London',
            imgPost: UK,
            language: 'English',
            link: '/' + slug + '/united-kingdom',
            population: '54 million (approx.)'
        },
        {
            title: 'United States',
            capital: 'Washington',
            imgPost: US,
            language: 'English',
            link: '/' + slug + '/united-states',
            population: '335 million (approx.)'
        },
        {
            title: 'Canada',
            capital: 'Ottawa',
            imgPost: Canada,
            language: 'English',
            link: '/' + slug + '/canada',
            population: '40 million (approx.)'
        },
        {
            title: 'Germany',
            capital: 'Berlin',
            imgPost: Germany,
            language: 'Germany',
            link: '/' + slug + '/germany',
            population: '85 million (approx.)'
        },
        {
            title: 'United Kingdom',
            capital: 'London',
            imgPost: UK,
            language: 'English',
            link: '/' + slug + '/united-kingdom',
            population: '54 million (approx.)'
        },
        {
            title: 'United States',
            capital: 'Washington',
            imgPost: US,
            language: 'English',
            link: '/' + slug + '/united-states',
            population: '335 million (approx.)'
        },
        {
            title: 'Canada',
            capital: 'Ottawa',
            imgPost: Canada,
            language: 'English',
            link: '/' + slug + '/canada',
            population: '40 million (approx.)'
        },
        {
            title: 'Germany',
            capital: 'Berlin',
            imgPost: Germany,
            language: 'Germany',
            link: '/' + slug + '/germany',
            population: '85 million (approx.)'
        },
        {
            title: 'United Kingdom',
            capital: 'London',
            imgPost: UK,
            language: 'English',
            link: '/' + slug + '/united-kingdom',
            population: '54 million (approx.)'
        },
        {
            title: 'United States',
            capital: 'Washington',
            imgPost: US,
            language: 'English',
            link: '/' + slug + '/united-states',
            population: '335 million (approx.)'
        },
        {
            title: 'Canada',
            capital: 'Ottawa',
            imgPost: Canada,
            language: 'English',
            link: '/' + slug + '/canada',
            population: '40 million (approx.)'
        },
        {
            title: 'Germany',
            capital: 'Berlin',
            imgPost: Germany,
            language: 'Germany',
            link: '/' + slug + '/germany',
            population: '85 million (approx.)'
        },
    ]
    const [showCountriesButton, setShowCountriesButton] = useState(false)

    const [showCountries, setShowCountries] = useState<CardCountryProps[]>()
    useEffect(() => {
        setShowCountries(countries.slice(0, 8))
    }, [])
    return (
        <div className="page__container">
            <div style={{width: '100%'}}>
                <h1 style={{textTransform: 'capitalize'}}>{slug.replace(/-/g, ' ')}</h1>
                <p>
                    You can find everything you want to know before you start researching&nbsp;
                    <span style={{fontWeight: 600}}>
                        language education abroad here.
                    </span>
                </p>
            </div>
            <PageSearch/>
            <div className="page__container__countries">
                {
                    showCountries&&showCountries.map((country, index) =>
                        <CardCountry key={index}
                                     title={country.title}
                                     capital={country.capital}
                                     imgPost={country.imgPost}
                                     language={country.language}
                                     link={country.link} population={country.population}/>
                    )
                }
            </div>
            {!showCountriesButton &&
                <Button onClick={() => {
                    setShowCountriesButton(true)
                    setShowCountries(countries)
                }} label={'Show all countries'}/>
            }
        </div>
    )
}
export default CountriesPageContent;