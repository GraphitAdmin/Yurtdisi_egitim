import Navbar from "@/components/UI/Navbar/Navbar";
import Tabs from "@/components/UI/Tabs/Tabs";
import React from "react";
import '../../../schools.css'
import Abroads from "@/components/UI/Abroads/Abroads";
import Subscribe from "@/components/UI/FAQ/Subscribe";
import Footer from "@/components/UI/Footer/Footer";
import CityPageContent from "@/components/cityPageContent/cityPageContent";
import {blobUrl, cleanTitle} from "@/utils/utils";
import {notFound} from "next/navigation";
import {ICity} from "@/utils/interfaces";
type paramsType = Promise<{ slug: string, childId: string,subChildId:string }>;
async function fetchCityData(childId: string, subChildId: string) {
    const response = await fetch(`${blobUrl}jsons/cities.json`, {
        cache: "no-store",
        next: { revalidate: 1 },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch city data');
    }

    const data: ICity[] = await response.json();
    return data.find(cityMap =>
        cleanTitle(cityMap.name) === cleanTitle(subChildId) &&
        cleanTitle(cityMap.country) === cleanTitle(childId)
    );
}
export default async function Home({
                                       params,
                                   }: {
    params: paramsType;
}) {
    const {slug,childId,subChildId} = await params
    console.log(slug)
    console.log(childId)
    console.log(subChildId)
    const city = await fetchCityData(childId, subChildId)
    if (!city) {
        notFound()
    }
    return (
        <div>
            <Navbar home={false}/>
            <Tabs/>
            <CityPageContent slug={slug} childId={childId} subChildId={subChildId} initialCity={city}/>
            <Abroads/>
            <Subscribe/>
            <Footer/>
        </div>
    );
}

