'use client'
import Dropdown from "@/components/UI/Dropdown/Dropdown";
import Button from "@/components/UI/Button/Button";
import React, {useEffect, useState} from "react";
import {searchCities, searchCountries, searchPrograms, searchTypes} from "@/data/search";

const PageSearch = () => {
    const [selectedType, setSelectedType] = useState<string>('');
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [selectedProgram, setSelectedProgram] = useState<string>('');
    const [hrefLink, setHrefLink] = useState<string>('/');
    useEffect(() => {
        let link='';

        if (selectedType!=='') {
            link+='/'+selectedType.replace(/ /g, '-').toLowerCase()
        }

        if (selectedCountry!=='') {
            link+='/'+selectedCountry.replace(/ /g, '-').toLowerCase()
        }
        if (selectedCity!=='') {
            link+='/'+selectedCity.replace(/ /g, '-').toLowerCase()
        }
        if (selectedProgram!=='') {
            link+='/'+selectedProgram.replace(/ /g, '-').toLowerCase()
        }
        console.log(link)

        setHrefLink(link);
    }, [selectedCity, selectedType, selectedProgram, selectedCountry]);
    return (
        <div className="page__container__search__dropdowns">
            <Dropdown label='Education type'
                      selected={selectedType}
                      setSelected={setSelectedType}
                      variants={searchTypes}/>
            <Dropdown label='Select country'
                      selected={selectedCountry}
                      setSelected={setSelectedCountry}
                      variants={searchCountries}/>
            <Dropdown label='Select city'
                      selected={selectedCity}
                      setSelected={setSelectedCity}
                      variants={searchCities}/>
            <Dropdown label='Program type'
                      selected={selectedProgram}
                      setSelected={setSelectedProgram}
                      variants={searchPrograms}/>
            <Button href={hrefLink} label='Search' btnStyle={{width: 100, maxWidth: 50}}/>
        </div>
    )
}
export default PageSearch;