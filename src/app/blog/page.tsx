import Navbar from "@/components/UI/Navbar/Navbar";
import Tabs from "@/components/UI/Tabs/Tabs";
import React from "react";
import Subscribe from "@/components/UI/FAQ/Subscribe";
import Footer from "@/components/UI/Footer/Footer";
import BlogsContent from "@/components/blogsContent/blogsContent";

export default function Home() {
    return (
        <div>
            <Navbar home={false}/>
            <Tabs/>
            <BlogsContent/>
            <Subscribe/>
            <Footer/>
        </div>
    );
}
