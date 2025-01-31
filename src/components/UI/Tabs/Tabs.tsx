'use client'
import React, { useEffect, useState } from "react";
import './Tabs.css'
import Link from "next/link";

const Tabs: React.FC = () => {
    const [tabsArray, setTabsArray] = useState<string[]>([]);
    const [tabsPathArray, setTabsPathArray] = useState<string[]>([]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const tabs = window.location.pathname.split('/').slice(1);
            const formattedTabs = tabs.map((tab) =>
                tab.replace(/-/g, ' ')
                    .replace(/^\w/, (char) => char.toUpperCase())
            );
            setTabsPathArray(tabs)
            setTabsArray(formattedTabs);
        }
    }, []);

    console.log(tabsArray);
    return (
        <div className="tabs">
            <div className="home__tab">
                <Link href='/'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                            d="M5.00016 15.8333H7.50016V10.8333H12.5002V15.8333H15.0002V8.33333L10.0002 4.58333L5.00016 8.33333V15.8333ZM3.3335 17.5V7.5L10.0002 2.5L16.6668 7.5V17.5H10.8335V12.5H9.16683V17.5H3.3335Z"
                            fill="#717680"/>
                    </svg>
                </Link>

            </div>
            <div className="tab__item dots__item">
                <Link href={'/' + tabsPathArray.slice(0, tabsPathArray.length - 1).join('/')}>
                    <small style={{textTransform: 'capitalize'}}>...</small>
                </Link>
            </div>
            {tabsArray.map((tabItem, index) => {
                return (
                    <div key={index} className="tab__item">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8.40016 8L5.3335 4.93333L6.26683 4L10.2668 8L6.26683 12L5.3335 11.0667L8.40016 8Z"
                                  fill="#535862"/>
                        </svg>
                        <Link href={'/' + tabsPathArray.slice(0, index + 1).join('/')}>
                            <small style={{textTransform: 'capitalize'}}>{tabItem}</small>
                        </Link>
                    </div>
                );
            })}
        </div>
    )
}

export default Tabs;
