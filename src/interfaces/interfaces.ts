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
export interface CardCountryProps {
    imgPost:StaticImageData;
    title:string;
    link:string;
    capital:string;
    population:string;
    language:string;
}