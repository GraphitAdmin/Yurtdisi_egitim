import Navbar from "@/components/UI/Navbar/Navbar";
import Tabs from "@/components/UI/Tabs/Tabs";
import '../../schools.css';
import Subscribe from "@/components/UI/FAQ/Subscribe";
import Footer from "@/components/UI/Footer/Footer";
import CountryPageContent from "@/components/countryPageContent/countryPageContent";
import {UK,US,Austria, France, Germany, Italy, Malta, Portugal, Spain, Switzerland} from "@/data/countries_json";
import {ICountry} from "@/utils/interfaces";
import {notFound} from "next/navigation";
import type {Metadata} from "next";

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
export async function generateMetadata({ params }: { params: paramsType }): Promise<Metadata> {
    const {slug,childId} = await params
    if(childIdArray.includes(childId)){
        return {
            title:childId.replace(/-/g, ' ')
                    .replace(/\b\w/g, (char) => char.toUpperCase()) + ' ' +
                slug.replace(/-/g, ' ')
                    .replace(/\b\w/g, (char) => char.toUpperCase()),
            description: "You can find everything you want to know before you start researching language education abroad here.",
        }
    }
    else{
        return {
            title: 'Not Found'
        }
    }
}

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
