import {StaticImageData} from "next/image";
export interface PopularSchoolCardProps {
    imgPost:StaticImageData;
    link:string;
}
export interface CardProps {
    imgPost:StaticImageData;
    title:string;
    description:string;
    time:string;
    link:string;
    date:string;
}
export interface IEvent {
    imgPost:StaticImageData;
    type:string;
    title:string;
    description:string;
    date:string;
    time:string;
    location:string;
    link:string;
}
export interface IAbroad {
    imgPost:StaticImageData;
    title:string;
    description:string;
    date:string;
    time:string;
    link:string;
}
export interface IRelated {
    imgPost:StaticImageData;
    title:string;
    description:string;
    link:string;
}
export interface CardCountryProps {
    imgPost:StaticImageData;
    title:string;
    link:string;
    capital:string;
    population:string;
    language:string;
}
export interface CardCityProps {
    imgPost:StaticImageData;
    title:string;
    link:string;
    description:string;
    buttonDetails:boolean;
}
export interface IPopularSchool {
    imgPost:StaticImageData;
    link:string;
}
export interface ICity {
    name: string;
    description: string;
    country: string;
    image: string;
}
export interface ISchool{
    education_type: string;
    title: string;
    images: string[];
    school_overview: string;
    detailed_information: string;
    why_block: string;
    video_url: string;
    coordinates_on_the_map: {
        latitude: string;
        longitude: string;
    };
    city: string;
    country: string;
    address: string;
    website: string;
    capacity: string;
    age_group: string;
    programs: string[];
    accommodation: string;
    meta_title: string;
    meta_description: string;
}

export interface IBlog{
    title: string;
    image: string;
    description: string;
    "minutes_to_read": string,
    "meta_title": string,
    "meta_description": string,
    "content":string,
    "date":string
}