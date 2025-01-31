import PageSearch from "@/components/UI/PageSearch/PageSearch";
import React from "react";
import CardCountry from "@/components/UI/CardCountry/CardCountry";
import {UK, US,Austria, France, Germany, Italy, Malta, Portugal, Spain, Switzerland} from "@/data/countries_json";

interface CountriesPageContentProps {
    slug: string;
}

const CountriesPageContent: React.FC<CountriesPageContentProps> = ({slug}) => {
    const countries = [
        UK,
        US,
        Malta,
        Germany,
        Austria,
        Italy,
        France,
        Portugal,
        Spain,
        Switzerland,
    ]

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
                    countries.map((country, index) =>
                        <CardCountry key={index}
                                     {...country}
                                     link={`/${slug}${country.link}`}
                        />
                    )
                }
            </div>
        </div>
    )
}
export default CountriesPageContent;