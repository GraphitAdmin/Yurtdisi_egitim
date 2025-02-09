import Navbar from "@/components/UI/Navbar/Navbar";
import Tabs from "@/components/UI/Tabs/Tabs";
import Subscribe from "@/components/UI/FAQ/Subscribe";
import Footer from "@/components/UI/Footer/Footer";
import CountriesPageContent from "@/components/countriesPageContent/countriesPageContent";
import {notFound} from "next/navigation";
import type {Metadata} from "next";
const slugsArray = [
    'language-schools',
    'high-schools',
    'summer-schools',
    'universities',
    'foundation-programs',
    'certificates'
]
type paramsType = Promise<{ slug: string }>;
type Params = {
    slug: string
}
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const {slug} = params
    if(slugsArray.includes(slug)){
        return {
            title: slug.replace(/-/g, ' ').replace(/^\w/, (char) => char.toUpperCase()),
            description: "Officials from the world's most prestigious schools that work with us visit our office.",
        }
    }
    else{
        return {
            title: 'Not Found'
        }
    }
}
export default async function Home({
                                       params,
                                   }: {
    params: paramsType;
}) {
    const {slug} = await params
    console.log(slug)
    if (!slugsArray.includes(slug)) {
        notFound()
    }
    return (
        <div>
            <Navbar home={false}/>
            {slugsArray.includes(slug) && <>
                    <Tabs/>
                    <CountriesPageContent slug={slug}/>
                </>}
            <Subscribe/>
            <Footer/>
        </div>
    );
}
