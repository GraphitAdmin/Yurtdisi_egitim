import Navbar from "@/components/UI/Navbar/Navbar"
import Tabs from "@/components/UI/Tabs/Tabs"
import Subscribe from "@/components/UI/FAQ/Subscribe"
import Footer from "@/components/UI/Footer/Footer"
import type {ISchool} from "@/utils/interfaces"
import {blobUrl, cleanTitle} from "@/utils/utils"
import {notFound} from "next/navigation"
import SchoolPageContent from "@/components/schoolPageContent/schoolPageContent"
import type {Metadata} from "next"

type paramsType = Promise<{ slug: string, childId: string, subChildId: string, subUniChildId: string }>;

const fetchSchool = async (slug: string, childId: string, subUniChildId: string, subChildId: string) => {
    const cleanedName = cleanTitle(subUniChildId)
    try {
        const schoolsUrl = blobUrl + "jsons/schools.json"
        const response = await fetch(schoolsUrl, {
            cache: "no-store",
        })
        if (!response.ok) {
            throw new Error("Failed to fetch JSON")
        }
        const jsonData: ISchool[] = await response.json()
        const relatedSchools = jsonData.filter(
            (school: ISchool) =>
                cleanTitle(school.city) === cleanTitle(subChildId) &&
                school.website_active === "Active" &&
                cleanTitle(school.title) !== cleanedName,
        )
        const moreSchools = jsonData.filter(
            (school: ISchool) =>
                cleanTitle(school.country) === cleanTitle(childId) &&
                cleanTitle(school.education_type) === cleanTitle(slug) &&
                school.website_active === "Active" &&
                cleanTitle(school.title) !== cleanedName,
        )

        for (const school of jsonData) {
            const cleanedTitle = cleanTitle(school.title)
            if (cleanedTitle === cleanedName) {
                return {school, relatedSchools, moreSchools}
            }
        }
    } catch (err) {
        console.error(err)
        notFound()
    }
}

export async function generateMetadata({ params }: { params: paramsType }): Promise<Metadata> {
    const {slug, childId, subUniChildId, subChildId} = await params
    const data = await fetchSchool(slug, childId, subUniChildId, subChildId)

    if (!data) {
        notFound()
    }

    const title = `${subUniChildId.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())} - ${childId.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}`
    const description = data.school.school_overview.slice(0,158) || `Learn about ${title}`

    return {
        title,
        description,
    }
}
export default async function Home({
                                       params,
                                   }: {
    params: paramsType;
}) {
    const {slug, childId, subUniChildId, subChildId} = await params
    const data = await fetchSchool(slug, childId, subUniChildId, subChildId)

    if (!data || !data.school) {
        notFound()
    }

    return (
        <div>
            <Navbar home={false}/>
            <Tabs/>
            <SchoolPageContent
                subUniChildId={subUniChildId}
                school={data.school}
                relatedSchools={data.relatedSchools}
                moreSchools={data.moreSchools}
            />
            <Subscribe/>
            <Footer/>
        </div>
    )
}