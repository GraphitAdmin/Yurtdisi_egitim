import AbroadCard from "@/components/home/AbroadPrograms/AbroadCard";
import ImageProgram from "@/assets/home/program.jpg";
import BlockCard from "@/components/home/BlockCard/BlockCard";
import ImageCard from "@/assets/home/Illustration.png";

const References = () => {
    const references=[
        {imgPost:ImageCard,
            title:"What are TOEFL and IELTS and what are they not?",
            description:"An official from College Alpin Beau Soleil, one of the most prestigious colleges in Switzerland, founded in 1910, is coming to our office. Interested parents and students can attend the meeting by making an appointment.",
            date:"13 January 2024",
            time:'8',
            link:"",
        },
        {imgPost:ImageCard,
            title:"What are TOEFL and IELTS and what are they not?",
            description:"An official from College Alpin Beau Soleil, one of the most prestigious colleges in Switzerland, founded in 1910, is coming to our office. Interested parents and students can attend the meeting by making an appointment.",
            date:"13 January 2024",
            time:'8',
            link:"",
        },
        {imgPost:ImageCard,
            title:"What are TOEFL and IELTS and what are they not?",
            description:"An official from College Alpin Beau Soleil, one of the most prestigious colleges in Switzerland, founded in 1910, is coming to our office. Interested parents and students can attend the meeting by making an appointment.",
            date:"13 January 2024",
            time:'8',
            link:"",
        }
    ]
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
                cards={references}
                buttonText='View all information'
            />
            <BlockCard
                title='Our blog posts'
                description='Lorem ipsum dolor sit amet consectetur. Sit vulputate sed iaculis nisi nulla phasellus massa nulla tellus.'
                cards={references}
                buttonText='View all references'
            />
        </>

    )
}
export default References