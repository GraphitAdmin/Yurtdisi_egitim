import Navbar from "@/components/UI/Navbar/Navbar";
import Tabs from "@/components/UI/Tabs/Tabs";
import React from "react";
import '../../../schools.css'
import Abroads from "@/components/UI/Abroads/Abroads";
import Subscribe from "@/components/UI/FAQ/Subscribe";
import Footer from "@/components/UI/Footer/Footer";
import CityPageContent from "@/components/cityPageContent/cityPageContent";
type paramsType = Promise<{ slug: string, childId: string,subChildId:string }>;
export default async function Home({
                                       params,
                                   }: {
    params: paramsType;
}) {
    const {slug,childId,subChildId} = await params
    console.log(slug)
    console.log(childId)
    console.log(subChildId)
    return (
        <div>
            <Navbar home={false}/>
            <Tabs/>
            <CityPageContent slug={slug} childId={childId} subChildId={subChildId}/>
            <Abroads/>
            <Subscribe/>
            <Footer/>
        </div>
    );
}

