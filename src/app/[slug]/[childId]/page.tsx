import Navbar from "@/components/UI/Navbar/Navbar";
import Tabs from "@/components/UI/Tabs/Tabs";
import React from "react";
import '../../schools.css'
import Subscribe from "@/components/UI/FAQ/Subscribe";
import Footer from "@/components/UI/Footer/Footer";
import CountryPageContent from "@/components/countryPageContent/countryPageContent";
type paramsType = Promise<{ slug: string, childId: string }>;
export default async function Home({
                                       params,
                                   }: {
    params: paramsType;
}) {
    const {slug,childId} = await params
    console.log(slug)
    console.log(childId)
    return (
        <div>
            <Navbar home={false}/>
            <Tabs/>
            <CountryPageContent slug={slug} childId={childId}/>
            <Subscribe/>
            <Footer/>
        </div>
    );
}
