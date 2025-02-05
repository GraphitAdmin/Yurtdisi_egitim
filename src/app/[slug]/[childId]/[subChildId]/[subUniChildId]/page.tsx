import Navbar from "@/components/UI/Navbar/Navbar";
import Tabs from "@/components/UI/Tabs/Tabs";
import Subscribe from "@/components/UI/FAQ/Subscribe";
import Footer from "@/components/UI/Footer/Footer";
import {ISchool} from "@/utils/interfaces";
import {blobUrl, cleanTitle} from "@/utils/utils";
import {notFound} from "next/navigation";
import React from "react";
import SchoolPageContent from "@/components/schoolPageContent/schoolPageContent";

const fetchSchool = async (slug: string, childId: string, subUniChildId: string, subChildId: string) => {
    const cleanedName = cleanTitle(subUniChildId)
    try {
        const schoolsUrl = blobUrl + 'jsons/schools.json';
        const response = await fetch(schoolsUrl, {
            cache: 'no-store',
        });
        if (!response.ok) {
            throw new Error('Failed to fetch JSON');
        }
        const jsonData: ISchool[] = await response.json();
        const relatedSchools = jsonData.filter((school: ISchool) => cleanTitle(school.city) === cleanTitle(subChildId) && school.website_active === 'Active' && cleanTitle(school.title) !== cleanedName);
        const moreSchools = jsonData.filter((school: ISchool) => cleanTitle(school.country) === cleanTitle(childId) && cleanTitle(school.education_type) === cleanTitle(slug) && school.website_active === 'Active' && cleanTitle(school.title) !== cleanedName);
        // console.log(relatedSchools)
        // console.log(moreSchools)
        // console.log(jsonData)
        // console.log(cleanTitle(childId))
        // console.log(cleanTitle(slug))
        for (const school of jsonData) {
            const cleanedTitle = cleanTitle(school.title)
            console.log('name', cleanedName)
            console.log('title', cleanedTitle)
            if (cleanedTitle === cleanedName) {
                return {school, relatedSchools, moreSchools};
            }
        }
    } catch (err) {
        console.log(err);
        notFound()
    }
}
type paramsType = Promise<{ slug: string, childId: string, subChildId: string, subUniChildId: string }>;
export default async function Home({
                                       params,
                                   }: {
    params: paramsType;
}) {
    const {slug, childId, subUniChildId, subChildId} = await params
    const data = await fetchSchool(slug, childId, subUniChildId, subChildId)
    if (!data || !data.school) {
        notFound()
    }
    return (
        <div>
            <Navbar home={false}/>
            <Tabs/>
            <SchoolPageContent subUniChildId={subUniChildId} school={data.school} relatedSchools={data.relatedSchools}
                               moreSchools={data.moreSchools}/>
            <Subscribe/>
            <Footer/>
        </div>
    );
}

