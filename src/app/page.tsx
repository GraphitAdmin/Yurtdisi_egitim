import './home.css'
import Navbar from "@/components/UI/Navbar/Navbar";
import AbroadPrograms from "@/components/home/AbroadPrograms/AbroadPrograms";
import Metrics from "@/components/home/Metrics/Metrics";
import CRM from "@/components/home/CRM/CRM";
import Popular from "@/components/home/Popular/Popular";
import Events from "@/components/home/Events/Events";
import FAQSection from "@/components/home/FAQSection/FAQSection";
import Subscribe from "@/components/UI/FAQ/Subscribe";
import HomeSearch from "@/components/home/HomeSearch/HomeSearch";
import ReviewBlock from "@/components/home/ReviewBlock/ReviewBlock";
import Companies from "@/components/home/Companies/Companies";
import References from "@/components/home/References/References";
import Gallery from "@/components/home/Gallery/Gallery";
export default function Home() {
    return (
        <div>
            <div className="home__container">
                <Navbar home={true}/>
                <div className="home__container__text">
                    <h1 style={{color: 'white'}}>
                        The gateway to world universities
                    </h1>
                    <p>Lorem ipsum dolor sit amet consectetur. Elit dignissim potenti lorem tristique consequat.
                        Ultrices
                        diam vitae mauris at ut nunc nullam.</p>
                </div>
                <HomeSearch/>
            </div>
            <Companies/>
            <AbroadPrograms/>
            <Metrics/>
            <CRM/>
            <Popular/>
            <Events/>
            <ReviewBlock/>
            <Gallery/>
            <References/>
            <FAQSection/>
            <Subscribe/>
        </div>);
}
