import Navbar from "@/components/UI/Navbar/Navbar";
import Tabs from "@/components/UI/Tabs/Tabs";
import Subscribe from "@/components/UI/FAQ/Subscribe";
import Footer from "@/components/UI/Footer/Footer";
import BlogsContent from "@/components/blogsContent/blogsContent";
import type {Metadata} from "next";
export const metadata: Metadata = {
    title: "Our blog posts",
    description:"All the topics you are curious about about education abroad are on this page."
};
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
