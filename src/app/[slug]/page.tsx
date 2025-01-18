import Navbar from "@/components/UI/Navbar/Navbar";
import Tabs from "@/components/UI/Tabs/Tabs";
import Button from "@/components/UI/Button/Button";
import CardCountry from "@/components/UI/CardCountry/CardCountry";
import PageSearch from "@/components/UI/PageSearch/PageSearch";
import UK from "@/assets/countries/UK.png"
import React from "react";
import Subscribe from "@/components/UI/FAQ/Subscribe";
import Footer from "@/components/UI/Footer/Footer";
import CountriesPageContent from "@/components/countriesPageContent/countriesPageContent";
const slugsArray=[
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
    return (
        <div>
            <Navbar home={false}/>
            {slugsArray.includes(slug)?<>
            <Tabs/>
                    <CountriesPageContent slug={slug}/>
                </>:
                <>
                <h1>Error</h1>
                </>
            }
            <Subscribe/>
            <Footer/>
        </div>
    );
}
