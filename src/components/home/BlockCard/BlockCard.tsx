import Card from "@/components/UI/Card/Card";
import React from "react";
import {CardProps} from "@/interfaces/interfaces";
import './BlockCard.css'
import Button from "@/components/UI/Button/Button";

interface BlockCardProps {
    title: string;
    description: string;
    cards: CardProps[];
    buttonText:string;
}

const BlockCard: React.FC<BlockCardProps> = ({title, description, cards,buttonText}) => {
    return (
        <div className="block__card">
            <div>
                <h2>{title}</h2>
                <p style={{color: 'var(--Courses-Gray-Gray-500)', textAlign: 'center',marginTop:8}}>
                    {description}
                </p>
            </div>
            <div className="block__card__cards">
                {cards.map((card, index) => (
                    <Card key={index} {...card} />
                ))}
            </div>
            <Button label={buttonText}/>
        </div>
    );
};

export default BlockCard;
