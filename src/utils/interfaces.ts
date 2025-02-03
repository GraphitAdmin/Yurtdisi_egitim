import {StaticImageData} from "next/image";
export interface PopularSchoolCardProps {
    imgPost:StaticImageData;
    link:string;
}
export interface IRelated {
    imgPost:string;
    title:string;
    description:string;
    link:string;
}
export interface ICountry {
    imgPost:StaticImageData;
    name:string;
    link:string;
    capital:string;
    population:string;
    language:string;
    faceMeasurement:string;
    currency:string;
    telephoneCode:string;
}
export interface CardCityProps {
    image_string:string;
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
    image_right:string;
    website_active:string;
}

export interface IBlog{
    title: string;
    image: string;
    description: string;
    "minutes_to_read": string,
    "date":string,
    "type":string
}
export interface IEvent{
    type:string;
    title:string;
    description:string;
    date:string;
    timeStart:string;
    timeEnd:string;
    location:string;
    link:string;
    image:string;
}
export interface IStudent{
    firstName:string;
    lastName:string;
    email:string;
    phone:string;
    programs:string;
    city:string;
    country:string;
    message:string;
    isContacted:boolean;
    id:string;
}

export interface ISubscriber{
    name:string;
    email:string;
}