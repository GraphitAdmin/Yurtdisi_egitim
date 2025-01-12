import Navbar from "@/components/UI/Navbar/Navbar";
import Tabs from "@/components/UI/Tabs/Tabs";
import Button from "@/components/UI/Button/Button";
import CardCountry from "@/components/UI/CardCountry/CardCountry";
import PageSearch from "@/components/UI/PageSearch/PageSearch";
import USA from "@/assets/countries/USA.png"
import React from "react";
export default function Home() {

    return (
        <div>
            <Navbar home={false}/>
            <Tabs/>
            <div className="page__container">
                <div style={{width:'100%'}}>
                    <h1>Foreign language schools</h1>
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
                                         imgPost={USA}
                                         language='English'
                                         link='/usa' population='54 million (approx.)'/>
                                )
                    }
                </div>
                <Button label={'Show all countries'}/>
            </div>
        </div>
    );
}
