'use client'
import Card from "@/components/UI/Card/Card";
import React, {useRef} from "react";
import {IBlog} from "@/utils/interfaces";
import './BlockCard.css'
import Button from "@/components/UI/Button/Button";

interface BlockCardProps {
    title: string;
    description: string;
    cards: IBlog[];
    buttonText:string;
}

const BlockCard: React.FC<BlockCardProps> = ({title, description, cards,buttonText}) => {
    const blockRef=useRef(null);
    const scroll = (direction:string) => {
        const scrollAmount = 413;
        if (blockRef.current) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            blockRef.current.scrollBy({
                left: direction === 'right' ? scrollAmount : -scrollAmount,
                behavior: 'smooth'
            });
        }
    };
    return (
        <div className="block__card">
            <div className="block__card__header">
                <h2>{title}</h2>
                <p style={{color: 'var(--Courses-Gray-Gray-500)', textAlign: 'center', marginTop: 8}}>
                    {description}
                </p>
            </div>
            <div className="block__card__cards" ref={blockRef}>
                <span style={{height: "auto"}}/>
                {cards.map((card, index) => (
                    <Card key={index} {...card} />
                ))}
                <span style={{height: "auto"}}/>
            </div>
            <div className="rounded__buttons">
            <div onClick={() => scroll('left')} style={{cursor: 'pointer'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M10 18L4 12L10 6L11.4 7.45L7.85 11H20V13H7.85L11.4 16.55L10 18Z" fill="#717680"/>
                    </svg>
                </div>
                <div onClick={() => scroll('right')} style={{cursor: 'pointer'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M14 18L12.6 16.55L16.15 13H4V11H16.15L12.6 7.45L14 6L20 12L14 18Z" fill="#717680"/>
                    </svg>
                </div>
            </div>
            <Button href='/blog' label={buttonText}/>
        </div>
    );
};

export default BlockCard;
