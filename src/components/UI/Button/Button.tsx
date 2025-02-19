"use client";

import './Button.css';
import React from 'react';
import Link from 'next/link';

interface ButtonProps {
    label: string;
    onClick?: () => void;
    href?: string;
    btnStyle?: React.CSSProperties;
    btnDivStyle?: React.CSSProperties;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    secondary?: boolean;
    promotionSVG?: boolean;
    priceSVG?: boolean;
}

const Button: React.FC<ButtonProps> = ({
                                           label,
                                           onClick,
                                           href,
                                           btnStyle,
                                           btnDivStyle,
                                           disabled = false,
                                           type = 'button',
                                           secondary = false,
                                           priceSVG = false,
                                           promotionSVG = false,
                                       }) => {
    const handleClick = () => {
        if (!disabled && onClick) {
            onClick();
        }
    };

    const ButtonContent = (
        <button
            style={{...btnStyle}}
            className={`myBtn  ${secondary ? 'secondary' : ''} ${disabled ? 'disabled' : ''}`}
            onClick={handleClick}
            disabled={disabled}
            type={type}
        >
            <div style={{...btnDivStyle}} className="myBtn__label">
                {label}
            </div>
        </button>
    );
    const ButtonContentPrice = (
        <button
            style={{...btnStyle,display:'flex',gap:8,flexDirection:"row"}}
            className={`myBtn  ${secondary ? 'secondary' : ''} ${disabled ? 'disabled' : ''}`}
            onClick={handleClick}
            disabled={disabled}
            type={type}
        >
            <div style={{...btnDivStyle, display: 'flex', gap: 8,flexDirection:'row'}} className="myBtn__label">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                    <path
                        d="M21.9 14.25L14.75 21.4C14.55 21.6 14.325 21.75 14.075 21.85C13.825 21.95 13.575 22 13.325 22C13.075 22 12.825 21.95 12.575 21.85C12.325 21.75 12.1 21.6 11.9 21.4L3.075 12.575C2.89167 12.3917 2.75 12.1792 2.65 11.9375C2.55 11.6958 2.5 11.4417 2.5 11.175V4C2.5 3.45 2.69583 2.97917 3.0875 2.5875C3.47917 2.19583 3.95 2 4.5 2H11.675C11.9417 2 12.2 2.05417 12.45 2.1625C12.7 2.27083 12.9167 2.41667 13.1 2.6L21.9 11.425C22.1 11.625 22.2458 11.85 22.3375 12.1C22.4292 12.35 22.475 12.6 22.475 12.85C22.475 13.1 22.4292 13.3458 22.3375 13.5875C22.2458 13.8292 22.1 14.05 21.9 14.25ZM13.325 20L20.475 12.85L11.65 4H4.5V11.15L13.325 20ZM7 8C7.41667 8 7.77083 7.85417 8.0625 7.5625C8.35417 7.27083 8.5 6.91667 8.5 6.5C8.5 6.08333 8.35417 5.72917 8.0625 5.4375C7.77083 5.14583 7.41667 5 7 5C6.58333 5 6.22917 5.14583 5.9375 5.4375C5.64583 5.72917 5.5 6.08333 5.5 6.5C5.5 6.91667 5.64583 7.27083 5.9375 7.5625C6.22917 7.85417 6.58333 8 7 8Z"
                        fill="#1A1A1A"/>
                </svg>
                {label}
            </div>
        </button>
    );
    const ButtonContentPromotion = (
        <button
            style={{...btnStyle, display: 'flex', gap: 8,flexDirection:'row'}}
            className={`myBtn`}
            onClick={handleClick}
            disabled={disabled}
            type={type}
        >
            <div style={{...btnDivStyle, display: 'flex', gap: 8,flexDirection:'row'}} className="myBtn__label">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="20" viewBox="0 0 17 20" fill="none">
                    <path
                        d="M0.5 17V15H2.5V8C2.5 6.61667 2.91667 5.3875 3.75 4.3125C4.58333 3.2375 5.66667 2.53333 7 2.2V1.5C7 1.08333 7.14583 0.729167 7.4375 0.4375C7.72917 0.145833 8.08333 0 8.5 0C8.91667 0 9.27083 0.145833 9.5625 0.4375C9.85417 0.729167 10 1.08333 10 1.5V2.2C11.3333 2.53333 12.4167 3.2375 13.25 4.3125C14.0833 5.3875 14.5 6.61667 14.5 8V15H16.5V17H0.5ZM8.5 20C7.95 20 7.47917 19.8042 7.0875 19.4125C6.69583 19.0208 6.5 18.55 6.5 18H10.5C10.5 18.55 10.3042 19.0208 9.9125 19.4125C9.52083 19.8042 9.05 20 8.5 20ZM4.5 15H12.5V8C12.5 6.9 12.1083 5.95833 11.325 5.175C10.5417 4.39167 9.6 4 8.5 4C7.4 4 6.45833 4.39167 5.675 5.175C4.89167 5.95833 4.5 6.9 4.5 8V15Z"
                        fill="white"/>
                </svg>
                {label}
            </div>
        </button>
    );
    if (priceSVG&&href) {
        return (
            <Link href={href} className="button__href" target="_blank" rel="noopener noreferrer">
                {ButtonContentPrice}
            </Link>
        );
    }
    if (promotionSVG&&href) {
        return (
            <Link href={href} className="button__href"  target="_blank" rel="noopener noreferrer">
                {ButtonContentPromotion}
            </Link>
        );
    }
    if (href) {
        return (
            <Link href={href} className="button__href" passHref>
                {ButtonContent}
            </Link>
        );
    }

    return ButtonContent;
};

export default Button;

