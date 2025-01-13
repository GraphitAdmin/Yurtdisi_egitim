import './AbroadPrograms.css'
import AbroadCard from "@/components/home/AbroadPrograms/AbroadCard";
import ImageProgram from "@/assets/home/program.jpg"
const AbroadPrograms =()=> {
    return(
        <div className="abroad__programs">
            <h2>
                Our study abroad programs
            </h2>
            <div className="abroad__programs__cards">
                <AbroadCard link='/language-schools' big={true} header='Foreign Language Schools' imgCard={ImageProgram}/>
                <AbroadCard link='/high-schools' big={false} header='High School Abroad' imgCard={ImageProgram}/>
                <AbroadCard link='/summer-schools' big={false} header='Summer School Abroad' imgCard={ImageProgram}/>
                <AbroadCard link='/universities' big={true} header='University Abroad' imgCard={ImageProgram}/>
                <AbroadCard link='/foundation-programs' big={true} header='Maester’s Degree' imgCard={ImageProgram}/>
                <AbroadCard link='/certificates' big={false} header='Foreign Certificate' imgCard={ImageProgram}/>
            </div>
        </div>
    )
}
export default AbroadPrograms