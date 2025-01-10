import './Popular.css'
import Button from "@/components/UI/Button/Button";
import SchoolImage from "@/assets/home/Mill_School.png";
import PopularSchoolCard from "@/components/UI/PopularSchoolCard/PopularSchoolCard";

const Popular = () => {
    const popularSchools = [
        {
            imgPost: SchoolImage,
            link: '/event'
        },
        {
            imgPost: SchoolImage,
            link: '/event'
        },
        {
            imgPost: SchoolImage,
            link: '/event'
        },
        {
            imgPost: SchoolImage,
            link: '/event'
        },
        {
            imgPost: SchoolImage,
            link: '/event'
        },
        {
            imgPost: SchoolImage,
            link: '/event'
        },
    ]
    return (
        <div className="popular">
            <div>
                <h2>
                    Popular schools
                </h2>
                <p style={{color: 'var(--Courses-Gray-Gray-500)', marginTop: 8}}>
                    Lorem ipsum dolor sit amet consectetur. Sit vulputate sed iaculis nisi nulla phasellus massa nulla
                    tellus.
                </p>
            </div>
            <div className="popular__schools">
                {popularSchools.map((school, index) => (
                    <PopularSchoolCard key={index} {...school}/>
                ))}
            </div>
            <Button label='Show more'/>
        </div>
    )
}
export default Popular;