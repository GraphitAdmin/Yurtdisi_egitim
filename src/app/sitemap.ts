import {MetadataRoute} from 'next'
import {blobUrl} from "@/utils/utils";
import {IBlog, ICity, IEvent, ISchool} from "@/utils/interfaces";
import {notFound} from "next/navigation";
import {searchCountries, searchTypes} from "@/data/search";

const fetchSchool = async () => {
    try {
        const schoolsUrl = blobUrl + 'jsons/schools.json';
        const response = await fetch(schoolsUrl, {
            cache: 'no-store',
        });
        if (!response.ok) {
            throw new Error('Failed to fetch JSON');
        }
        const jsonData: ISchool[] = await response.json();
        return jsonData;
    } catch (err) {
        console.log(err);
        notFound()
    }
}
const fetchBlogs = async () => {
    try {
        const schoolsUrl = blobUrl + 'jsons/blogs.json';
        const response = await fetch(schoolsUrl, {
            cache: 'no-store',
        });
        if (!response.ok) {
            throw new Error('Failed to fetch JSON');
        }
        const jsonData: IBlog[] = await response.json();
        return jsonData;
    } catch (err) {
        console.log(err);
        notFound()
    }
}
const fetchEvents = async () => {
    try {
        const schoolsUrl = blobUrl + 'jsons/events.json';
        const response = await fetch(schoolsUrl, {
            cache: 'no-store',
        });
        if (!response.ok) {
            throw new Error('Failed to fetch JSON');
        }
        const jsonData: IEvent[] = await response.json();
        return jsonData;
    } catch (err) {
        console.log(err);
        notFound()
    }
}
const fetchCities = async () => {
    try {
        const schoolsUrl = blobUrl + 'jsons/cities.json';
        const response = await fetch(schoolsUrl, {
            cache: 'no-store',
        });
        if (!response.ok) {
            throw new Error('Failed to fetch JSON');
        }
        const jsonData: ICity[] = await response.json();
        return jsonData;
    } catch (err) {
        console.log(err);
        notFound()
    }
}

const fetchReferences = async () => {
    try {
        const schoolsUrl = blobUrl + 'jsons/references.json';
        const response = await fetch(schoolsUrl, {
            cache: 'no-store',
        });
        if (!response.ok) {
            throw new Error('Failed to fetch JSON');
        }
        const jsonData: IBlog[] = await response.json();
        return jsonData;
    } catch (err) {
        console.log(err);
        notFound()
    }
}

function sanitizeURL(text: string): string {
    return text
        .normalize("NFD") // Normalize accents (if any)
        .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
        .replace(/[^\w\s-]/g, "") // Remove non-word characters except spaces and hyphens
        .trim()
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .toLowerCase();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const schools = await fetchSchool();
    const blogs = await fetchBlogs();
    const events = await fetchEvents();
    const cities = await fetchCities();
    const references = await fetchReferences();

    const eventsUrl = events.map((event: IEvent) => ({
        url: `https://eeeducation.vercel.app/our-event-calendar/${sanitizeURL(event.title)}`,
        priority: 0.7,
    }));
    const referencesUrl = references.map((reference: IBlog) => ({
        url: `https://eeeducation.vercel.app/our-student-references/${sanitizeURL(reference.title)}`,
        priority: 0.7,
    }));
    const blogsUrls = blogs.map((blog: IBlog) => ({
        url: `https://eeeducation.vercel.app/blog/${sanitizeURL(blog.title)}`,
        priority: 0.7,
    }));

    const schoolUrls = schools.map((school: ISchool) => ({
        url: `https://eeeducation.vercel.app/${school.education_type.replace(/ /g, '-').toLowerCase()}/${school.country.replace(/ /g, '-').toLowerCase()}/${school.city.replace(/ /g, '-').toLowerCase()}/${sanitizeURL(school.title)}`,
        priority: 0.7,
    }));
    const citiesURL = searchTypes.flatMap((typeSearch) => cities.map((city: ICity) => ({
            url: `https://eeeducation.vercel.app/${sanitizeURL(typeSearch)}/${sanitizeURL(city.country)}/${sanitizeURL(city.name)}`,
            priority: 0.7,
        }))
    );
    const countriesURL = searchTypes.flatMap((typeSearch) => searchCountries.map((country) => ({
            url: `https://eeeducation.vercel.app/${sanitizeURL(typeSearch)}/${sanitizeURL(country)}`,
            priority: 0.7,
        }))
    );
    const searchsUrl = searchTypes.map((typeSearch) => ({
        url: `https://eeeducation.vercel.app/${sanitizeURL(typeSearch)}`,
        priority: 0.8,
    }))

    return [
        {
            url: 'https://eeeducation.vercel.app',
            priority: 1,
        },
        {
            url: 'https://eeeducation.vercel.app/blog',
            priority: 0.9,
        },
        {
            url: 'https://eeeducation.vercel.app/contact-us',
            priority: 0.9,
        },
        {
            url: 'https://eeeducation.vercel.app/our-event-calendar',
            priority: 0.9,
        },
        {
            url: 'https://eeeducation.vercel.app/our-student-references',
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