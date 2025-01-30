'use client'
import PageSearch from "@/components/UI/PageSearch/PageSearch";
import CardCity from "@/components/UI/CardCity/CardCity";
import London from "@/assets/cities/London.png";
import Oxford from "@/assets/schools/Test.jpeg";
import Sevenoaks from "@/assets/schools/Sevenoaks.jpg";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CityPageContentProps {
    slug: string;
    childId: string;
    subChildId: string;
}

const CityPageContent: React.FC<CityPageContentProps> = ({slug, childId, subChildId}) => {
    const schools = [
        {
            title: 'London',
            imgPost: London,
            description: 'Located in the southeast of England, Oxford is home to the world\'s most famous university, Oxford University. Located 80 kilometers from the capital London and accessible 24 hours a day, Oxford is the center of cultural activity in England with a student population of 30%. The historic buildings of Oxford University, spread throughout the city, attract tens of thousands of tourists to Oxford every year. The many parks in the city allow the greenery to merge with a historical texture and create fascinating, peaceful landscapes. Oxford, which also hosts many language schools for English language education, is a great destination for those who want to study in England.',
            link: '/' + slug + '/' + childId + '/london'+'/example-international-academy',
        },
        {
            title: 'Oxford',
            imgPost: Oxford,
            description: 'Located in the southeast of England, Oxford is home to the world\'s most famous university, Oxford University. Located 80 kilometers from the capital London and accessible 24 hours a day, Oxford is the center of cultural activity in England with a student population of 30%. The historic buildings of Oxford University, spread throughout the city, attract tens of thousands of tourists to Oxford every year. The many parks in the city allow the greenery to merge with a historical texture and create fascinating, peaceful landscapes. Oxford, which also hosts many language schools for English language education, is a great destination for those who want to study in England.',
            link: '/' + slug + '/' + childId + '/oxford'+'/example-international-academy',
        },
        {
            title: 'Sevenoaks',
            imgPost: Sevenoaks,
            description: 'Located in the southeast of England, Oxford is home to the world\'s most famous university, Oxford University. Located 80 kilometers from the capital London and accessible 24 hours a day, Oxford is the center of cultural activity in England with a student population of 30%. The historic buildings of Oxford University, spread throughout the city, attract tens of thousands of tourists to Oxford every year. The many parks in the city allow the greenery to merge with a historical texture and create fascinating, peaceful landscapes. Oxford, which also hosts many language schools for English language education, is a great destination for those who want to study in England.',
            link: '/' + slug + '/' + childId + '/sevenoaks'+'/example-international-academy',
        },
        {
            title: 'Sevenoaks',
            imgPost: Sevenoaks,
            description: 'Located in the southeast of England, Oxford is home to the world\'s most famous university, Oxford University. Located 80 kilometers from the capital London and accessible 24 hours a day, Oxford is the center of cultural activity in England with a student population of 30%. The historic buildings of Oxford University, spread throughout the city, attract tens of thousands of tourists to Oxford every year. The many parks in the city allow the greenery to merge with a historical texture and create fascinating, peaceful landscapes. Oxford, which also hosts many language schools for English language education, is a great destination for those who want to study in England.',
            link: '/' + slug + '/' + childId + '/sevenoaks'+'/example-international-academy',
        },
        {
            title: 'London',
            imgPost: London,
            description: 'Located in the southeast of England, Oxford is home to the world\'s most famous university, Oxford University. Located 80 kilometers from the capital London and accessible 24 hours a day, Oxford is the center of cultural activity in England with a student population of 30%. The historic buildings of Oxford University, spread throughout the city, attract tens of thousands of tourists to Oxford every year. The many parks in the city allow the greenery to merge with a historical texture and create fascinating, peaceful landscapes. Oxford, which also hosts many language schools for English language education, is a great destination for those who want to study in England.',
            link: '/' + slug + '/' + childId + '/london'+'/example-international-academy',
        },
        {
            title: 'Oxford',
            imgPost: Oxford,
            description: 'Located in the southeast of England, Oxford is home to the world\'s most famous university, Oxford University. Located 80 kilometers from the capital London and accessible 24 hours a day, Oxford is the center of cultural activity in England with a student population of 30%. The historic buildings of Oxford University, spread throughout the city, attract tens of thousands of tourists to Oxford every year. The many parks in the city allow the greenery to merge with a historical texture and create fascinating, peaceful landscapes. Oxford, which also hosts many language schools for English language education, is a great destination for those who want to study in England.',
            link: '/' + slug + '/' + childId + '/oxford'+'/example-international-academy',
        },
        {
            title: 'Sevenoaks',
            imgPost: Sevenoaks,
            description: 'Located in the southeast of England, Oxford is home to the world\'s most famous university, Oxford University. Located 80 kilometers from the capital London and accessible 24 hours a day, Oxford is the center of cultural activity in England with a student population of 30%. The historic buildings of Oxford University, spread throughout the city, attract tens of thousands of tourists to Oxford every year. The many parks in the city allow the greenery to merge with a historical texture and create fascinating, peaceful landscapes. Oxford, which also hosts many language schools for English language education, is a great destination for those who want to study in England.',
            link: '/' + slug + '/' + childId + '/sevenoaks'+'/example-international-academy',
        },
        {
            title: 'Oxford',
            imgPost: Oxford,
            description: 'Located in the southeast of England, Oxford is home to the world\'s most famous university, Oxford University. Located 80 kilometers from the capital London and accessible 24 hours a day, Oxford is the center of cultural activity in England with a student population of 30%. The historic buildings of Oxford University, spread throughout the city, attract tens of thousands of tourists to Oxford every year. The many parks in the city allow the greenery to merge with a historical texture and create fascinating, peaceful landscapes. Oxford, which also hosts many language schools for English language education, is a great destination for those who want to study in England.',
            link: '/' + slug + '/' + childId + '/oxford'+'/example-international-academy',
        },
        {
            title: 'Sevenoaks',
            imgPost: Sevenoaks,
            description: 'Located in the southeast of England, Oxford is home to the world\'s most famous university, Oxford University. Located 80 kilometers from the capital London and accessible 24 hours a day, Oxford is the center of cultural activity in England with a student population of 30%. The historic buildings of Oxford University, spread throughout the city, attract tens of thousands of tourists to Oxford every year. The many parks in the city allow the greenery to merge with a historical texture and create fascinating, peaceful landscapes. Oxford, which also hosts many language schools for English language education, is a great destination for those who want to study in England.',
            link: '/' + slug + '/' + childId + '/sevenoaks'+'/example-international-academy',
        },
        {
            title: 'London',
            imgPost: London,
            description: 'Located in the southeast of England, Oxford is home to the world\'s most famous university, Oxford University. Located 80 kilometers from the capital London and accessible 24 hours a day, Oxford is the center of cultural activity in England with a student population of 30%. The historic buildings of Oxford University, spread throughout the city, attract tens of thousands of tourists to Oxford every year. The many parks in the city allow the greenery to merge with a historical texture and create fascinating, peaceful landscapes. Oxford, which also hosts many language schools for English language education, is a great destination for those who want to study in England.',
            link: '/' + slug + '/' + childId + '/london'+'/example-international-academy',
        },
        {
            title: 'Oxford',
            imgPost: Oxford,
            description: 'Located in the southeast of England, Oxford is home to the world\'s most famous university, Oxford University. Located 80 kilometers from the capital London and accessible 24 hours a day, Oxford is the center of cultural activity in England with a student population of 30%. The historic buildings of Oxford University, spread throughout the city, attract tens of thousands of tourists to Oxford every year. The many parks in the city allow the greenery to merge with a historical texture and create fascinating, peaceful landscapes. Oxford, which also hosts many language schools for English language education, is a great destination for those who want to study in England.',
            link: '/' + slug + '/' + childId + '/oxford'+'/example-international-academy',
        },
        {
            title: 'London',
            imgPost: London,
            description: 'Located in the southeast of England, Oxford is home to the world\'s most famous university, Oxford University. Located 80 kilometers from the capital London and accessible 24 hours a day, Oxford is the center of cultural activity in England with a student population of 30%. The historic buildings of Oxford University, spread throughout the city, attract tens of thousands of tourists to Oxford every year. The many parks in the city allow the greenery to merge with a historical texture and create fascinating, peaceful landscapes. Oxford, which also hosts many language schools for English language education, is a great destination for those who want to study in England.',
            link: '/' + slug + '/' + childId + '/london'+'/example-international-academy',
        },
    ]
    return (
        <>
            <div className="page__container">
                <div style={{width: '100%'}}>
                    <h1 style={{textTransform: 'capitalize'}}>{subChildId.replace(/-/g, ' ')} {slug.replace(/-/g, ' ')}</h1>
                    <p>
                        You can find everything you want to know before you start researching&nbsp;
                        <span style={{fontWeight: 600}}>
                        language education abroad here.
                    </span>
                    </p>
                </div>
                <PageSearch/>
                <div className="page__country__schools__schools">
                    {
                        schools.map((school, index) =>
                            <CardCity key={index}
                                      title={school.title+' Language School'}
                                      imgPost={school.imgPost}
                                      description={school.description}
                                      link={school.link} buttonDetails={true}/>
                        )
                    }
                </div>
            </div>
            <div className="about__school">
                <div>
                    <h2>
                        About Oxford
                    </h2>
                    <p>
                        Located in the southeast of England, Oxford is home to the world&#39;s most famous university,
                        Oxford University. Located 80 kilometers from the capital London and accessible 24 hours a day,
                        Oxford is the center of cultural activity in England with a student population of 30%. The
                        historic buildings of Oxford University, spread throughout the city, attract tens of thousands
                        of tourists to Oxford every year. The many parks in the city allow the greenery to merge with a
                        historical texture and create fascinating, peaceful landscapes. Oxford, which also hosts many
                        language schools for English language education, is a great destination for those who want to
                        study in England.
                    </p>
                    <h5>
                        UK language schools
                    </h5>
                    <Link href={'/smth'}>
                        Bath Language Schools
                    </Link>
                    <Link href={'/smth'}>
                        Belfast | Northern Ireland Language Schools
                    </Link>
                    <Link href={'/smth'}>
                        Birmingham Language Schools
                    </Link>
                    <Link href={'/smth'}>
                        Bournemouth Language Schools
                    </Link>
                </div>
                <Image src={Oxford} alt="school"/>
            </div>
        </>
    )
}
export default CityPageContent;