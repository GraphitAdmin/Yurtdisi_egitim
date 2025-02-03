import Navbar from "@/components/UI/Navbar/Navbar";
import Tabs from "@/components/UI/Tabs/Tabs";
import React from "react";
import '../../schools.css';
import Subscribe from "@/components/UI/FAQ/Subscribe";
import Footer from "@/components/UI/Footer/Footer";
import CountryPageContent from "@/components/countryPageContent/countryPageContent";
import {UK,US,Austria, France, Germany, Italy, Malta, Portugal, Spain, Switzerland} from "@/data/countries_json";
import {ICountry} from "@/utils/interfaces";
import {notFound} from "next/navigation";

const childIdArray = [
    'united-kingdom',
    'united-states',
    'malta',
    'germany',
    'austria',
    'italy',
    'france',
    'portugal',
    'spain',
    'switzerland',
];

type paramsType = Promise<{ slug: string, childId: string }>;

export default async function Home({
                                       params,
                                   }: {
    params: paramsType;
}) {
    const { slug, childId } = await params;

    const countryMap: Record<string, ICountry> = {
        'united-kingdom': UK,
        'united-states': US,
        'malta': Malta,
        'germany': Germany,
        'austria': Austria,
        'italy': Italy,
        'france': France,
        'portugal': Portugal,
        'spain': Spain,
        'switzerland': Switzerland,
    };

    const countryData = countryMap[childId];
    if (!childIdArray.includes(childId)) {
        notFound()
    }
    return (
        <div>
            <Navbar home={false} />
            {childIdArray.includes(childId) && countryData &&(
                <>
                    <Tabs />
                    <CountryPageContent slug={slug} childId={childId} country={countryData} />
                </>
            )}
            <Subscribe />
            <Footer />
        </div>
    );
}
