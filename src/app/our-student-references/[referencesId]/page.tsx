import Navbar from "@/components/UI/Navbar/Navbar";
import Tabs from "@/components/UI/Tabs/Tabs";
import Subscribe from "@/components/UI/FAQ/Subscribe";
import Footer from "@/components/UI/Footer/Footer";
import Reference from "@/components/blog/Reference";
import type {Metadata} from "next";

type paramsType = Promise<{ referencesId: string }>;
export async function generateMetadata({ params }: { params: paramsType }): Promise<Metadata> {
    const {referencesId} = await params
    if(referencesId){
        return {
            title: referencesId.replace(/-/g, ' ').replace(/^\w/, (char) => char.toUpperCase()),
            description: "Our students who studied abroad have listed their experiences abroad, their education and their comments about Global Overseas Education.",
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
