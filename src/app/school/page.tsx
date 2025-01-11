'use client'
import Navbar from "@/components/UI/Navbar/Navbar";
import Tabs from "@/components/UI/Tabs/Tabs";
import Dropdown from "@/components/UI/Dropdown/Dropdown";
import Button from "@/components/UI/Button/Button";
import CardCountry from "@/components/UI/CardCountry/CardCountry";
import USA from "@/assets/countries/USA.png"
import React from "react";
export default function Home() {
    const dosmth=(value:string[])=>{
        console.log(value);
    }
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
                <div className="page__container__search__dropdowns">
                    <Dropdown label='Education type'
                              selected={['Education type']}
                              setSelected={dosmth}
                              variants={[]}/>
                    <Dropdown label='Education type'
                              selected={['Education type']}
                              setSelected={dosmth}
                              variants={[]}/>
                    <Dropdown label='Education type'
                              selected={['Education type']}
                              setSelected={dosmth}
                              variants={[]}/>
                    <Dropdown label='Education type'
                              selected={['Education type']}
                              setSelected={dosmth}
                              variants={[]}/>
                    <Button label='Search' btnStyle={{width:100,maxWidth:50}}/>
                </div>
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
