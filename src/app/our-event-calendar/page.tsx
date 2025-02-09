import Navbar from "@/components/UI/Navbar/Navbar";
import Tabs from "@/components/UI/Tabs/Tabs";
import Subscribe from "@/components/UI/FAQ/Subscribe";
import Footer from "@/components/UI/Footer/Footer";
import EventsContent from "@/components/eventsContent/eventsContent";
import type {Metadata} from "next";
export const metadata: Metadata = {
    title: "Our Event Calendar",
    description:"Officials from the world's most prestigious schools that work with us visit our office."
};
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
