import Navbar from "@/components/UI/Navbar/Navbar";
import Tabs from "@/components/UI/Tabs/Tabs";
import React from "react";
import Subscribe from "@/components/UI/FAQ/Subscribe";
import Footer from "@/components/UI/Footer/Footer";
import EventsContent from "@/components/eventsContent/eventsContent";

export default function Home() {
    return (
        <div>
            <Navbar home={false}/>
            <Tabs/>
            <EventsContent/>
            <Subscribe/>
            <Footer/>
        </div>
    );
}
