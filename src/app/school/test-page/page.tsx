import Navbar from "@/components/UI/Navbar/Navbar";
import '../../home.css'
import Tabs from "@/components/UI/Tabs/Tabs";

export default function Home() {
    return (
        <div >
            <Navbar home={false}/>
            <Tabs/>
            <h1>Foreign language schools</h1>
        </div>
    );
}
