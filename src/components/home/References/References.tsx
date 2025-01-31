'use client'
import AbroadCard from "@/components/home/AbroadPrograms/AbroadCard";
import ImageProgram from "@/assets/home/program.jpg";
import BlockCard from "@/components/home/BlockCard/BlockCard";
import {useEffect, useState} from "react";
import {IBlog} from "@/utils/interfaces"
const References = () => {
    const [blogs,setBlogs]=useState<IBlog[]>([])
    const [useful,setUseful]=useState<IBlog[]>([])

    const blobUrl = "https://i9ozanmrsquybgxg.public.blob.vercel-storage.com/";

    useEffect(() => {
        fetch(`${blobUrl}jsons/blogs.json`, {
            cache: "no-store",
            next: {revalidate: 1},
        })
            .then((response) => response.json())
            .then((data: IBlog[]) => {
                setUseful(data.reverse().filter((blog)=>blog.type==='Useful Information').slice(0, 3))
                setBlogs(data.reverse().filter((blog)=>blog.type==='Blog').slice(0, 3))
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
                <div className="abroad__programs__cards">
                    <AbroadCard link='/references' big={true} header='References from Overseas Educational Institutions' imgCard={ImageProgram}/>
                    <AbroadCard link='/references' big={false} header='Summer schools abroad with Bilfen' imgCard={ImageProgram}/>
                    <AbroadCard link='/references' big={false} header='International projects with Bilfen' imgCard={ImageProgram}/>
                    <AbroadCard link='/references' big={true} header='Our student’s references' imgCard={ImageProgram}/>
                </div>
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