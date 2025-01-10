'use client'
import Dropdown from "@/components/UI/Dropdown/Dropdown";
import Button from "@/components/UI/Button/Button";

const HomeSearch = () => {
    const dosmth=(value:string[])=>{
        console.log(value);
    }
    return (
        <div className="home__container__search">
            <h5>Search for a school abroad</h5>
            <div className="home__container__search__dropdowns">
                <Dropdown label='Education type'
                          selected={['Education type']}
                          setSelected={dosmth}
                          variants={[]}/>
                <Dropdown label='Education type'
                          selected={['Education type']}
                          setSelected={dosmth}
                          variants={[]}/>
                <Dropdown label='Education type'
                          selected={['Education type']}
                          setSelected={dosmth}
                          variants={[]}/>
                <Dropdown label='Education type'
                          selected={['Education type']}
                          setSelected={dosmth}
                          variants={[]}/>
                <Button label='Search' btnStyle={{maxWidth:'100%'}}/>
            </div>
        </div>
    )
}
export default HomeSearch