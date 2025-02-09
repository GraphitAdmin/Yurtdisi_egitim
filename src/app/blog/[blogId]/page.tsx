import Navbar from "@/components/UI/Navbar/Navbar";
import Tabs from "@/components/UI/Tabs/Tabs";
import Subscribe from "@/components/UI/FAQ/Subscribe";
import Footer from "@/components/UI/Footer/Footer";
import Blog from "@/components/blog/Blog";
import type {Metadata} from "next";

type paramsType = Promise<{ blogId: string }>;
type Params = {
    blogId: string
}
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const {blogId} = params
    if(blogId){
        return {
            title: blogId.replace(/-/g, ' ').replace(/^\w/, (char) => char.toUpperCase()),
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
