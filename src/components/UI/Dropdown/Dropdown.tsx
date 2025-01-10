'use client'
import React, { useState, useEffect, useRef } from "react";
import './Dropdown.css';

interface DropdownProps {
    label: string;
    selected: string[];
    setSelected: (value: string[]) => void;
    variants: string[];
}

const Dropdown: React.FC<DropdownProps> = ({ label, selected, setSelected, variants }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Закриття дропдауну при кліку поза ним
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="dropdown" ref={dropdownRef} onClick={() => setIsOpen(!isOpen)}>
                <p>{selected.length > 0 ? selected.join(", ") : label}</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                <mask id="mask0_12_29235" maskUnits="userSpaceOnUse" x="0" y="0" width="25"
                      height="24">
                    <rect x="0.25" width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_12_29235)">
                    <path d="M12.25 15.4L6.25 9.4L7.65 8L12.25 12.6L16.85 8L18.25 9.4L12.25 15.4Z" fill="#717680"/>
                </g>
            </svg>
            {isOpen && (
                <div className="dropdown__select">
                    {variants.map((variant, index) => (
                        <div
                            className="dropdown__select__item"
                            key={index}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (selected.includes(variant)) {
                                    setSelected(selected.filter((item) => item !== variant));
                                } else {
                                    setSelected([...selected, variant]);
                                }
                            }}
                        >
                            {!selected.includes(variant) ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                                    <path
                                        d="M4.16667 18C3.70833 18 3.31597 17.8368 2.98958 17.5104C2.66319 17.184 2.5 16.7917 2.5 16.3333V4.66667C2.5 4.20833 2.66319 3.81597 2.98958 3.48958C3.31597 3.16319 3.70833 3 4.16667 3H15.8333C16.2917 3 16.684 3.16319 17.0104 3.48958C17.3368 3.81597 17.5 4.20833 17.5 4.66667V16.3333C17.5 16.7917 17.3368 17.184 17.0104 17.5104C16.684 17.8368 16.2917 18 15.8333 18H4.16667ZM4.16667 16.3333H15.8333V4.66667H4.16667V16.3333Z"
                                        fill="#F23704"
                                    />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                                    <path
                                        d="M8.83333 14L14.7083 8.125L13.5417 6.95833L8.83333 11.6667L6.45833 9.29167L5.29167 10.4583L8.83333 14ZM4.16667 18C3.70833 18 3.31597 17.8368 2.98958 17.5104C2.66319 17.184 2.5 16.7917 2.5 16.3333V4.66667C2.5 4.20833 2.66319 3.81597 2.98958 3.48958C3.31597 3.16319 3.70833 3 4.16667 3H15.8333C16.2917 3 16.684 3.16319 17.0104 3.48958C17.3368 3.81597 17.5 4.20833 17.5 4.66667V16.3333C17.5 16.7917 17.3368 17.184 17.0104 17.5104C16.684 17.8368 16.2917 18 15.8333 18H4.16667Z"
                                        fill="#F23704"
                                    />
                                </svg>
                            )}
                            <p>{variant}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
