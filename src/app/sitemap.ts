import type { MetadataRoute } from "next"
import { blobUrl } from "@/utils/utils"
import type { IBlog, ICity, IEvent, ISchool } from "@/utils/interfaces"
import { notFound } from "next/navigation"
import { searchCountries, searchTypes } from "@/data/search"

const fetchData = async (url: string) => {
    try {
        const response = await fetch(url, {
            next: { revalidate: 600 },
        })
        if (!response.ok) {
            throw new Error("Failed to fetch JSON")
        }
        return await response.json()
    } catch (err) {
        console.log(err)
        notFound()
    }
}

const fetchSchool = () => fetchData(blobUrl + "jsons/schools.json")
const fetchBlogs = () => fetchData(blobUrl + "jsons/blogs.json")
const fetchEvents = () => fetchData(blobUrl + "jsons/events.json")
const fetchCities = () => fetchData(blobUrl + "jsons/cities.json")
const fetchReferences = () => fetchData(blobUrl + "jsons/references.json")

function sanitizeURL(text: string): string {
    return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-")
        .toLowerCase()
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [schools, blogs, events, cities, references] = await Promise.all([
        fetchSchool(),
        fetchBlogs(),
        fetchEvents(),
        fetchCities(),
        fetchReferences(),
    ])

    const eventsUrl = events.map((event: IEvent) => ({
        url: `https://eeedu.co.uk/our-event-calendar/${sanitizeURL(event.title)}`,
        priority: 0.7,
    }))
    const referencesUrl = references.map((reference: IBlog) => ({
        url: `https://eeedu.co.uk/our-student-references/${sanitizeURL(reference.title)}`,
        priority: 0.7,
    }))
    const blogsUrls = blogs.map((blog: IBlog) => ({
        url: `https://eeedu.co.uk/blog/${sanitizeURL(blog.title)}`,
        priority: 0.7,
    }))

    const schoolUrls = schools.map((school: ISchool) => ({
        url: `https://eeedu.co.uk/${school.education_type.replace(/ /g, "-").toLowerCase()}/${school.country.replace(/ /g, "-").toLowerCase()}/${school.city.replace(/ /g, "-").toLowerCase()}/${sanitizeURL(school.title)}`,
        priority: 0.7,
    }))
    const citiesURL = searchTypes.flatMap((typeSearch) =>
        cities.map((city: ICity) => ({
            url: `https://eeedu.co.uk/${sanitizeURL(typeSearch)}/${sanitizeURL(city.country)}/${sanitizeURL(city.name)}`,
            priority: 0.7,
        })),
    )
    const countriesURL = searchTypes.flatMap((typeSearch) =>
        searchCountries.map((country) => ({
            url: `https://eeedu.co.uk/${sanitizeURL(typeSearch)}/${sanitizeURL(country)}`,
            priority: 0.7,
        })),
    )
    const searchsUrl = searchTypes.map((typeSearch) => ({
        url: `https://eeedu.co.uk/${sanitizeURL(typeSearch)}`,
        priority: 0.8,
    }))

    return [
        {
            url: "https://eeedu.co.uk",
            priority: 1,
        },
        {
            url: "https://eeedu.co.uk/blog",
            priority: 0.9,
        },
        {
            url: "https://eeedu.co.uk/contact-us",
            priority: 0.9,
        },
        {
            url: "https://eeedu.co.uk/our-event-calendar",
            priority: 0.9,
        },
        {
            url: "https://eeedu.co.uk/our-student-references",
            priority: 0.9,
        },
        ...searchsUrl,
        ...countriesURL,
        ...citiesURL,
        ...schoolUrls,
        ...blogsUrls,
        ...eventsUrl,
        ...referencesUrl,
    ]
}

