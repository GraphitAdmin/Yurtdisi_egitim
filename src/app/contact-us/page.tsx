import Navbar from "@/components/UI/Navbar/Navbar";
import Tabs from "@/components/UI/Tabs/Tabs";
import Subscribe from "@/components/UI/FAQ/Subscribe";
import Footer from "@/components/UI/Footer/Footer";
import ContactUs from "@/components/ContactUs/ContactUs";
import type {Metadata} from "next";
export const metadata: Metadata = {
    title: "Contact us",
    description:"As Global Overseas Education Consultancy, we have been providing free consultancy services to our students on overseas education consultancy since 1989."
};
export default function Home() {
    return (
        <div>
            <Navbar home={false}/>
            <Tabs/>
            <ContactUs/>
            <Subscribe/>
            <Footer/>
        </div>
    );
}
