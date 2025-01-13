import Navbar from "@/components/UI/Navbar/Navbar";
import Tabs from "@/components/UI/Tabs/Tabs";
import Button from "@/components/UI/Button/Button";
import CardCountry from "@/components/UI/CardCountry/CardCountry";
import PageSearch from "@/components/UI/PageSearch/PageSearch";
import USA from "@/assets/countries/USA.png"
import React from "react";
import './schools.css'
import Link from "next/link";
import Image from "next/image";
export default function Home() {

    return (
        <div>
            <Navbar home={false}/>
            <Tabs/>
            <div className="page__container">
                <div style={{width: '100%'}}>
                    <h1>Foreign language schools</h1>
                    <p>
                        You can find everything you want to know before you start researching&nbsp;
                        <span style={{fontWeight: 600}}>
                        language education abroad here.
                    </span>
                    </p>
                </div>
                <PageSearch/>
                <div className="page__country__schools">
                    <div className="page__country__schools__schools">
                        {
                            Array.from({length: 9}, (_, index) =>
                                <CardCountry key={index}
                                             title='United Kingdom'
                                             capital='London'
                                             imgPost={USA}
                                             language='English'
                                             link='/usa' population='54 million (approx.)'/>
                            )
                        }
                    </div>
                    <div className="page__country__schools__country">
                        <div className="page__country__schools__country__info">
                            <Image src={USA} alt='usa'/>
                            <p style={{
                                fontWeight: 400,
                                color: 'var(--Courses-Gray-Gray-500)',
                                marginTop: 10
                            }}>
                                Country
                            </p>
                            <p
                                style={{color: 'var(--Courses-Base-Black)'}}
                            >
                                United Kingdom
                            </p>
                            <p style={{
                                fontWeight: 400,
                                color: 'var(--Courses-Gray-Gray-500)',
                                marginTop: 6
                            }}>
                                Capital
                            </p>
                            <p
                                style={{color: 'var(--Courses-Base-Black)'}}
                            >
                                London
                            </p>
                            <p style={{
                                fontWeight: 400,
                                color: 'var(--Courses-Gray-Gray-500)',
                                marginTop: 6
                            }}>
                                Face measurement
                            </p>
                            <p
                                style={{color: 'var(--Courses-Base-Black)'}}
                            >
                                130,279 km²
                            </p>
                            <p style={{
                                fontWeight: 400,
                                color: 'var(--Courses-Gray-Gray-500)',
                                marginTop: 6
                            }}>
                                Population
                            </p>
                            <p
                                style={{color: 'var(--Courses-Base-Black)'}}
                            >
                                54 million (approx.)
                            </p>
                            <p style={{
                                fontWeight: 400,
                                color: 'var(--Courses-Gray-Gray-500)',
                                marginTop: 6
                            }}>
                                Official language
                            </p>
                            <p
                                style={{color: 'var(--Courses-Base-Black)'}}
                            >
                                English
                            </p>
                            <p style={{
                                fontWeight: 400,
                                color: 'var(--Courses-Gray-Gray-500)',
                                marginTop: 6
                            }}>
                                Currency
                            </p>
                            <p
                                style={{color: 'var(--Courses-Base-Black)'}}
                            >
                                GBP (Pound)
                            </p>
                            <p style={{
                                fontWeight: 400,
                                color: 'var(--Courses-Gray-Gray-500)',
                                marginTop: 6
                            }}>
                                Telephone code
                            </p>
                            <p
                                style={{color: 'var(--Courses-Base-Black)'}}
                            >
                                +44
                            </p>
                        </div>
                        <div className="page__country__schools__country__recommendations">
                            <h5 style={{marginBottom: 4}}>Foreign language schools</h5>
                            <Link href={'/smth'}><p>
                                UK language schools</p>
                            </Link>
                            <Link href={'/smth'}><p>
                                UK language schools</p>
                            </Link>
                            <Link href={'/smth'}><p>
                                UK language schools</p>
                            </Link>
                            <Link href={'/smth'}><p>
                                UK language schools</p>
                            </Link>
                            <Link href={'/smth'}><p>
                                UK language schools</p>
                            </Link>
                            <div style={{display: 'flex', flexDirection: 'row', gap: 8}}>
                                <p style={{
                                    fontWeight: 600,
                                    color: 'var(--courses-brand-blue-400-brand, #2E90FA)'
                                }}>Show more</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     fill="none">
                                    <path d="M12 15.4L6 9.4L7.4 8L12 12.6L16.6 8L18 9.4L12 15.4Z" fill="#2E90FA"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <Button btnStyle={{marginRight:'Calc(25% + 10px)'}} label={'Show all countries'}/>
            </div>
        </div>
    );
}
