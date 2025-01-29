import Navbar from "@/components/UI/Navbar/Navbar";
import Tabs from "@/components/UI/Tabs/Tabs";
import React from "react";
import Subscribe from "@/components/UI/FAQ/Subscribe";
import Footer from "@/components/UI/Footer/Footer";
import Blog from "@/components/blog/Blog";

type paramsType = Promise<{ blogId: string }>;
export default async function Home({
                                       params,
                                   }: {
    params: paramsType;
}) {
    const {blogId} = await params
    console.log(blogId)
    return (
        <div>
            <Navbar home={false}/>
            <Tabs/>
            <Blog title={blogId}/>
            <Subscribe/>
            <Footer/>
        </div>
    );
}
