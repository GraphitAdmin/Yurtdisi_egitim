import {allCountries, Australian, Canada, Germany, Irish, Malta, UK, US} from "@/data/countries";

export const navbarOptions = [
    {
        name: 'Language schools',
        options: [
            UK,
            US,
            Canada,
            Malta,
            Irish,
            Australian,
            Germany,
            allCountries
        ]
    },
    {
        name: 'Summer schools',
        options: [
            UK,
            allCountries
        ]
    },
    {
        name: 'High schools',
        options: [
            UK,
            allCountries
        ]
    },
    {
        name: 'University',
        options: [
            UK,
            allCountries
        ]
    },
    {
        name: 'Foundation programs',
        options: [
            UK,
            allCountries
        ]
    },
    {
        name: 'Certificate',
        options: [
            UK,
            allCountries
        ]
    }

]