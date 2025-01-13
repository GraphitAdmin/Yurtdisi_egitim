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
export default async function Home({ params }: { params: { slug: string } }) {
    const { slug } = await params
    console.log('countries',slug)
    return (
        <div>
            <Navbar home={false}/>
            {slugsArray.includes(slug)?<>
            <Tabs/>
            <div className="page__container">
                <div style={{width:'100%'}}>
                    <h1>{slug.replace(/-/g, ' ').replace(/^\w/, (char) => char.toUpperCase())}</h1>
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
                                         link='/usa' population='54 million (approx.)'/>
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
