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
                <AbroadCard big={true} header='Foreign Language Schools' imgCard={ImageProgram}/>
                <AbroadCard big={false} header='High School Abroad' imgCard={ImageProgram}/>
                <AbroadCard big={false} header='Summer School Abroad' imgCard={ImageProgram}/>
                <AbroadCard big={true} header='University Abroad' imgCard={ImageProgram}/>
                <AbroadCard big={true} header='Maester’s Degree' imgCard={ImageProgram}/>
                <AbroadCard big={false} header='Foreign Certificate' imgCard={ImageProgram}/>
            </div>
        </div>
    )
}
export default AbroadPrograms