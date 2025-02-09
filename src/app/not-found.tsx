import './not-found.css'
import Navbar from "@/components/UI/Navbar/Navbar";
import Subscribe from "@/components/UI/FAQ/Subscribe";
import Footer from "@/components/UI/Footer/Footer";
import Button from "@/components/UI/Button/Button";
export default function Home() {
    return (
        <div>
            <Navbar home={false}/>
            <div className="not__found">
                <div className="not__found__block">
                    <h1 style={{color: 'var(--Courses-Base-Black)'}}>Page not found</h1>
                    <p style={{color: 'var(--Courses-Base-Black)'}}>Oops! The page you’re looking for doesn’t exist. Try
                        returning to the homepage or using the menu to find what you need.</p>
                </div>
                <Button label={'Go back to Home page'} href="/"/>
            </div>
            <h3>Not found</h3>
            <Subscribe/>
            <Footer/>
        </div>
    );
}
