'use client'
import React, {useEffect, useMemo, useState} from "react";
import RecommendationsSearch from "@/components/UI/RecommendationsSearch/RecommendationsSearch";
import Logo from "@/components/UI/Logo/Logo";
import '@/app/schools.css'
import CardSchoolSearchResults from "@/components/UI/CardSchoolSearchResults/CardSchoolSearchResults";
import {ISchool} from "@/utils/interfaces";
import {blobUrl} from "@/utils/utils";

interface SearchComponentProps {
    closeSearch: () => void;
}

interface SearchInputProps {
    mobile: boolean;
    inputValue: string;
    setInputValue: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({mobile, inputValue, setInputValue}) => {
    return (
        <div className={mobile ? "navbar__search__input mobile" : "navbar__search__input pc"}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <mask id="mask0_1988_10812" maskUnits="userSpaceOnUse" x="0" y="0"
                      width="24" height="24">
                    <rect width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_1988_10812)">
                    <path
                        d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z"
                        fill="#1A1A1A"/>
                </g>
            </svg>
            <input placeholder='Search' value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
        </div>
    )
}
const SearchComponent: React.FC<SearchComponentProps> = ({closeSearch}) => {
    const [inputValue, setInputValue] = useState('');
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
    const schoolsSearchResults=useMemo(() => {
        return schools.filter((school)=>school.title.toLowerCase().includes(inputValue.toLowerCase()))
    }, [schools, inputValue])

    return (
        <div
            className="navbar__search"
        >
            <div className="navbar__header">
                <Logo color='#1A1A1A'/>
                <SearchInput inputValue={inputValue} setInputValue={setInputValue} mobile={false}/>
                <div style={{minWidth: 150, width: 150}}>
                    <svg style={{marginLeft: 'auto', cursor: 'pointer'}} onClick={closeSearch}
                         xmlns="http://www.w3.org/2000/svg"
                         width="24" height="24"
                         viewBox="0 0 24 24" fill="none">
                        <path
                            d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
                            fill="#1A1A1A"/>
                    </svg>
                </div>
            </div>
            <SearchInput inputValue={inputValue} setInputValue={setInputValue} mobile={true}/>
            <div className="navbar__header navbar__header__margin">
                <div className="navbar__header__results">
                    {inputValue === '' ?
                        <h4>Most Popular Searches</h4>
                        : <>
                            <h4>“{inputValue}”</h4>
                            <p style={{color: 'var(--Courses-Brand-Blue-800)'}}>{schoolsSearchResults.length} results</p>
                        </>
                    }
                </div>
            </div>
            {inputValue === ''&&
                <RecommendationsSearch schools={schools} />
            }
            <div className="page__container__countries search__paddings" style={inputValue === '' ? {opacity: 0} : {
                gap: '20px!important',
                overflow: 'auto',
                display: 'grid',
                opacity: 1,
                transition: 'opacity 1s ease-in-out'
            }}>{
                schoolsSearchResults.map((school, index) =>
                    <CardSchoolSearchResults key={index}
                        {...school}/>
                )
            }
            </div>

        </div>
    )
}
export default SearchComponent