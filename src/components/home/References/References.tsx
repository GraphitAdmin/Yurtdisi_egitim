'use client'
import BlockCard from "@/components/home/BlockCard/BlockCard";
import {useEffect, useState} from "react";
import {IBlog} from "@/utils/interfaces"
import {blobUrl} from "@/utils/utils";
import ReferencesCardHome from "@/components/home/ReferencesHome/ReferencesCardHome";

const References = () => {
    const [blogs, setBlogs] = useState<IBlog[]>([])
    const [useful, setUseful] = useState<IBlog[]>([])
    const [references, setReferences] = useState<IBlog[]>([])
    useEffect(() => {
        fetch(`${blobUrl}jsons/blogs.json`, {
            cache: "no-store",
            next: {revalidate: 1},
        })
            .then((response) => response.json())
            .then((data: IBlog[]) => {
                setUseful(data.reverse().filter((blog) => blog.type === 'Useful Information').slice(0, 3))
                setBlogs(data.reverse().filter((blog) => blog.type === 'Blog').slice(0, 3))
            })
            .catch((err) => {
                console.error(err);
            });
        fetch(`${blobUrl}jsons/references.json`, {
            cache: "no-store",
            next: {revalidate: 1},
        })
            .then((response) => response.json())
            .then((data: IBlog[]) => {
                setReferences(data.reverse().slice(0, 4))
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);
    return (
        <>
            <div className="abroad__programs">
                <h2>
                    Our References
                </h2>
                {references.length > 0 &&
                    <div className="abroad__programs__cards">
                        <ReferencesCardHome blog={references[0]} big={true} />
                        <ReferencesCardHome blog={references[1]}big={false} />
                        <ReferencesCardHome blog={references[2]} big={false} />
                        <ReferencesCardHome blog={references[3]} big={true} />
                    </div>
                }
            </div>
            <BlockCard
                title='Useful information'
                description='Lorem ipsum dolor sit amet consectetur. Sit vulputate sed iaculis nisi nulla phasellus massa nulla tellus.'
                cards={useful}
                buttonText='View all information'
            />
            <BlockCard
                title='Our blog posts'
                description='Lorem ipsum dolor sit amet consectetur. Sit vulputate sed iaculis nisi nulla phasellus massa nulla tellus.'
                cards={blogs}
                buttonText='View all blogs'
            />
        </>

    )
}
export default References