import {allCountries, Australian, Canada, Germany, Irish, Malta, UK, US} from "@/data/countries";

export const navbarOptions = [
    {
        name: 'Language schools',
        link:'/language-schools',
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
        link:'/summer-schools',
        options: [
            UK,
            allCountries
        ]
    },
    {
        name: 'High schools',
        link:'/high-schools',
        options: [
            UK,
            allCountries
        ]
    },
    {
        name: 'University',
        link:'/universities',
        options: [
            UK,
            allCountries
        ]
    },
    {
        name: 'Foundation programs',
        link:'/foundation-programs',
        options: [
            UK,
            allCountries
        ]
    },
    {
        name: 'Certificate',
        link:'/certificates',
        options: [
            UK,
            allCountries
        ]
    }

]