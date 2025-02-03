import Navbar from "@/components/UI/Navbar/Navbar";
import Tabs from "@/components/UI/Tabs/Tabs";
import React from "react";
import Subscribe from "@/components/UI/FAQ/Subscribe";
import Footer from "@/components/UI/Footer/Footer";
import CountriesPageContent from "@/components/countriesPageContent/countriesPageContent";
import {notFound} from "next/navigation";

const slugsArray = [
    'language-schools',
    'high-schools',
    'summer-schools',
    'universities',
    'foundation-programs',
    'certificates'
]
type paramsType = Promise<{ slug: string }>;
export default async function Home({
                                       params,
                                   }: {
    params: paramsType;
}) {
    const {slug} = await params
    console.log(slug)
    if (!slugsArray.includes(slug)) {
        notFound()
    }
    return (
        <div>
            <Navbar home={false}/>
            {slugsArray.includes(slug) && <>
                    <Tabs/>
                    <CountriesPageContent slug={slug}/>
                </>}
            <Subscribe/>
            <Footer/>
        </div>
    );
}
