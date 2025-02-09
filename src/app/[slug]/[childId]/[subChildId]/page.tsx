import Navbar from "@/components/UI/Navbar/Navbar";
import Tabs from "@/components/UI/Tabs/Tabs";
import '../../../schools.css'
import Abroads from "@/components/UI/Abroads/Abroads";
import Subscribe from "@/components/UI/FAQ/Subscribe";
import Footer from "@/components/UI/Footer/Footer";
import CityPageContent from "@/components/cityPageContent/cityPageContent";
import {blobUrl, cleanTitle} from "@/utils/utils";
import {notFound} from "next/navigation";
import {ICity} from "@/utils/interfaces";
import type {Metadata} from "next";

type paramsType = Promise<{ slug: string, childId: string, subChildId: string }>;

export async function generateMetadata({params}: { params: paramsType }): Promise<Metadata> {
    const {slug, subChildId} = await params
    return {
        title: subChildId.replace(/-/g, ' ')
                .replace(/\b\w/g, (char) => char.toUpperCase()) + ' ' +
            slug.replace(/-/g, ' ')
                .replace(/\b\w/g, (char) => char.toUpperCase()),
        description: "You can find everything you want to know before you start researching language education abroad here.",
    }
}

async function fetchCityData(childId: string, subChildId: string) {
    const response = await fetch(`${blobUrl}jsons/cities.json`, {
        cache: "no-store",
        next: {revalidate: 1},
    });

    if (!response.ok) {
        throw new Error('Failed to fetch city data');
    }

    const data: ICity[] = await response.json();
    return {
        city: data.find(cityMap =>
            cleanTitle(cityMap.name) === cleanTitle(subChildId) &&
            cleanTitle(cityMap.country) === cleanTitle(childId)
        ),
        cities: data.filter((cityMap: ICity) => cleanTitle(cityMap.country) === cleanTitle(childId) && cleanTitle(cityMap.name) !== cleanTitle(subChildId))
    }
}

export default async function Home({
                                       params,
                                   }: {
    params: paramsType;
}) {
    const {slug, childId, subChildId} = await params
    console.log(slug)
    console.log(childId)
    console.log(subChildId)
    const data = await fetchCityData(childId, subChildId)
    if (!data || !data.city) {
        notFound()
    }
    return (
        <div>
            <Navbar home={false}/>
            <Tabs/>
            <CityPageContent slug={slug} childId={childId} subChildId={subChildId} initialCity={data.city}
                             cities={data.cities ? data.cities : []}/>
            <Abroads/>
            <Subscribe/>
            <Footer/>
        </div>
    );
}

