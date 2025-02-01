'use client'
import Dropdown from "@/components/UI/Dropdown/Dropdown";
import Button from "@/components/UI/Button/Button";
import {searchCountries, searchTypes} from "@/data/search";
import React, {useEffect, useMemo, useState} from "react";
import {ICity, ISchool} from "@/utils/interfaces";
import {blobUrl} from "@/utils/utils";

const HomeSearch = () => {
    const [selectedType, setSelectedType] = useState<string>('');
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [selectedProgram, setSelectedProgram] = useState<string>('');
    const [hrefLink, setHrefLink] = useState<string>('/');
    const [cities, setCities] = useState<ICity[]>([]);
    useEffect(() => {
        const fetchJson = async () => {
            const localCities=localStorage.getItem('cities')
            if(localCities!==undefined&&localCities!==null){
                setCities(JSON.parse(localCities));
            }
            try {
                const citiesUrl = blobUrl+'jsons/cities.json';
                const response = await fetch(citiesUrl, {
                    cache: 'no-store',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch JSON');
                }
                const jsonData = await response.json();
                setCities(jsonData);
                localStorage.setItem('cities', JSON.stringify(jsonData));
            } catch (err) {
                console.log(err);
            }
        };

        fetchJson().then();
    }, []);
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
    useEffect(() => {
        let link='';

        if (selectedType!=='') {
            link+='/'+selectedType.replace(/ /g, '-').toLowerCase()
            if (selectedCountry!=='') {
                link+='/'+selectedCountry.replace(/ /g, '-').toLowerCase()
                if (selectedCity!=='') {
                    link+='/'+selectedCity.replace(/ /g, '-').toLowerCase()
                    if (selectedProgram!=='') {
                        link+='/'+selectedProgram.replace(/ /g, '-').toLowerCase()
                    }
                }
            }
        }

        console.log(link)

        setHrefLink(link);
    }, [selectedCity, selectedType, selectedProgram, selectedCountry]);
    useEffect(() => {
        setSelectedCity('')
        setSelectedCountry('')
        setSelectedProgram('')
    }, [selectedType]);
    useEffect(() => {
        setSelectedCity('')
        setSelectedProgram('')
    }, [selectedCountry]);
    useEffect(() => {
        setSelectedProgram('')
    }, [selectedCity]);
    const filteredCities = useMemo(() => {
        return [...cities].filter((a) => {
           return a.country===selectedCountry;
        })
    }, [cities, selectedCountry])
    const filteredTitlesCities= useMemo(() => {
        return [...filteredCities].map((a) => a.name)
    }, [ filteredCities])
    const filteredSchools = useMemo(() => {
        return [...schools].filter((a) => {
            return a.city===selectedCity&&a.education_type===selectedType;
        })
    }, [schools,selectedType, selectedCity])
    const filteredTitlesSchools= useMemo(() => {
        return [...filteredSchools].map((a) => a.title)
    }, [filteredSchools])
    return (
        <div className="home__container__search">
            <h5>Search for a school abroad</h5>
            <div className="home__container__search__dropdowns">
                <Dropdown label='Education type'
                          selected={selectedType}
                          setSelected={setSelectedType}
                          variants={searchTypes}/>
                <Dropdown label='Select country'
                          selected={selectedCountry}
                          setSelected={setSelectedCountry}
                          disabled={selectedType===''}
                          textDisabled='Choose Type First'
                          variants={searchCountries}/>
                <Dropdown label='Select city'
                          selected={selectedCity}
                          setSelected={setSelectedCity}
                          disabled={selectedCountry===''}
                          textDisabled='Choose Country First'
                          variants={filteredTitlesCities}/>
                <Dropdown label='Program'
                          selected={selectedProgram}
                          setSelected={setSelectedProgram}
                          disabled={selectedCity===''}
                          textDisabled='Choose City First'
                          variants={filteredTitlesSchools}/>
                <Button href={hrefLink} label='Search' btnStyle={{maxWidth:'100%'}}/>
            </div>
        </div>
    )
}
export default HomeSearch