import Navbar from "@/components/UI/Navbar/Navbar";
import Tabs from "@/components/UI/Tabs/Tabs";
import Button from "@/components/UI/Button/Button";
import CardCountry from "@/components/UI/CardCountry/CardCountry";
import PageSearch from "@/components/UI/PageSearch/PageSearch";
import UK from "@/assets/countries/UK.png"
import React from "react";
import Subscribe from "@/components/UI/FAQ/Subscribe";
import Footer from "@/components/UI/Footer/Footer";
const slugsArray=[
    'language-schools',
    'high-schools',
    'summer-schools',
    'universities',
    'foundation-programs',
    'certificates'
]
type paramsType = Promise<{ slug: string }>;
export default async function Home({
                                       params,
                                   }: {
    params: paramsType;
}) {
    const {slug} = await params
    console.log(slug)
    return (
        <div>
            <Navbar home={false}/>
            {slugsArray.includes(slug)?<>
            <Tabs/>
            <div className="page__container">
                <div style={{width:'100%'}}>
                    <h1 style={{textTransform:'capitalize'}}>{slug.replace(/-/g, ' ')}</h1>
                    <p>
                        You can find everything you want to know before you start researching&nbsp;
                        <span style={{fontWeight: 600}}>
                        language education abroad here.
                    </span>
                    </p>
                </div>
               <PageSearch/>
                <div className="page__container__countries">
                    {
                        Array.from({length: 10}, (_, index) =>
                            <CardCountry key={index}
                                         title='United Kingdom'
                                         capital='London'
                                         imgPost={UK}
                                         language='English'
                                         link={'/'+slug+'/united-kingdom'} population='54 million (approx.)'/>
                                )
                    }
                </div>
                <Button label={'Show all countries'}/>
            </div>
                </>:
                <>
                <h1>Error</h1>
                </>
            }
            <Subscribe/>
            <Footer/>
        </div>
    );
}
