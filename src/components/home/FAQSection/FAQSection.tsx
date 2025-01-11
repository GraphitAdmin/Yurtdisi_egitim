import './FAQSection.css'
import FAQBlock from "@/components/home/FAQSection/FAQBlock/FAQBlock";

const FAQSection = () => {
    return (
        <div className="faqSection">
            <div>
                <h2>
                    Frequent asked questions
                </h2>
                <p
                    style={{color: 'var(--Courses-Gray-600)', marginTop: 8}}
                >
                    Lorem ipsum dolor sit amet consectetur. Felis sollicitudin ac at sapien.
                </p>
            </div>
            <div style={{width:'100%',maxWidth:1062}}>
                <FAQBlock header="Lorem ipsum dolor sit amet consectetur?"
                          description="AI holds transformative potential, and with it comes responsibility. Graphit helps clients design, deploy, and manage AI in a way that builds trust, mitigates risks, and maximizes value—ensuring AI serves as a force for good."/>
                <FAQBlock header="Lorem ipsum dolor sit amet consectetur?"
                          description="We are dedicated to creating meaningful impact for our clients, our people, and the communities we serve. At Graphit, we believe in responsible leadership that drives progress, supports sustainability, and builds a better future for all."
                />
                <FAQBlock header="Lorem ipsum dolor sit amet consectetur?"
                          description="We partner with clients to integrate sustainability into their transformations, helping them achieve environmental, social, and governance (ESG) goals. Our own operations reflect this commitment, as we work to minimize our environmental footprint and contribute positively to society."/>
                <FAQBlock header="Lorem ipsum dolor sit amet consectetur?"
                          description="We value diverse perspectives and experiences as essential drivers of innovation. By fostering an inclusive environment, we attract and empower individuals with unique insights, enabling us to deliver creative, effective solutions for our clients."/>
                <FAQBlock header="Lorem ipsum dolor sit amet consectetur?"
                          description="At Graphit, integrity is at the heart of everything we do. Our team is united by a commitment to doing what’s right, providing exceptional value for our clients while upholding the highest ethical standards. This dedication to ethical business practices is what sets us apart."/>
            </div>
        </div>
    )
}
export default FAQSection;