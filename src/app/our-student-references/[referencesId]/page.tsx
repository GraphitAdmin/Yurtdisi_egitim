import Navbar from "@/components/UI/Navbar/Navbar";
import Tabs from "@/components/UI/Tabs/Tabs";
import React from "react";
import Subscribe from "@/components/UI/FAQ/Subscribe";
import Footer from "@/components/UI/Footer/Footer";
import Reference from "@/components/blog/Reference";

type paramsType = Promise<{ referencesId: string }>;
export default async function Home({
                                       params,
                                   }: {
    params: paramsType;
}) {
    const {referencesId} = await params
    console.log(referencesId)
    return (
        <div>
            <Navbar home={false}/>
            <Tabs/>
            <Reference title={referencesId}/>
            <Subscribe/>
            <Footer/>
        </div>
    );
}
