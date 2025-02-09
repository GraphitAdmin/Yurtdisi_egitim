import Navbar from "@/components/UI/Navbar/Navbar";
import Tabs from "@/components/UI/Tabs/Tabs";
import Subscribe from "@/components/UI/FAQ/Subscribe";
import Footer from "@/components/UI/Footer/Footer";
import ReferencesContent from "@/components/referencesContent/referencesContent";
import type {Metadata} from "next";
export const metadata: Metadata = {
    title: "Our Student References",
    description:"Our students who studied abroad have listed their experiences abroad, their education and their comments about Global Overseas Education."
};
export default function Home() {
    return (
        <div>
            <Navbar home={false}/>
            <Tabs/>
            <ReferencesContent/>
            <Subscribe/>
            <Footer/>
        </div>
    );
}
