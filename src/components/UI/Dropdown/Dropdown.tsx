'use client'
import React, {useState, useEffect, useRef} from "react";
import './Dropdown.css';

interface DropdownProps {
    label: string;
    selected: string;
    setSelected: (value: string) => void;
    variants: string[];
    disabled?: boolean;
    textDisabled?: string;
}

const Dropdown: React.FC<DropdownProps> = ({label, selected, setSelected, variants, disabled, textDisabled}) => {
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
            <p>{selected !== '' ? selected : label}</p>
            {isOpen ?
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 10.8L7.4 15.4L6 14L12 8L18 14L16.6 15.4L12 10.8Z" fill="#717680"/>
                </svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                    <mask id="mask0_12_29235" maskUnits="userSpaceOnUse" x="0" y="0" width="25"
                          height="24">
                        <rect x="0.25" width="24" height="24" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_12_29235)">
                        <path d="M12.25 15.4L6.25 9.4L7.65 8L12.25 12.6L16.85 8L18.25 9.4L12.25 15.4Z" fill="#717680"/>
                    </g>
                </svg>}
            {isOpen && (
                <div className="dropdown__select">{
                    disabled&&textDisabled ? <p style={{padding:'8px 0'}}>{textDisabled}</p> :
                        variants.map((variant, index) => (
                            <div
                                className="dropdown__select__item"
                                key={index}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (selected === variant) {
                                        setSelected('');
                                    } else {
                                        setSelected(variant);
                                    }
                                    setIsOpen(false);
                                }}
                            >
                                <p>{variant}</p>
                                {selected === variant &&
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none">
                                        <path
                                            d="M9.5501 18.0001L3.8501 12.3001L5.2751 10.8751L9.5501 15.1501L18.7251 5.9751L20.1501 7.4001L9.5501 18.0001Z"
                                            fill="#2E90FA"/>
                                    </svg>
                                }
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
