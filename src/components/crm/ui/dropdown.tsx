"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"

interface BasicDropdownProps {
    selected:string;
    options: string[];
    onSelect: (value: string) => void;
    placeholder?: string;
}

export function Dropdown({ selected,options, onSelect, placeholder = "Select an option..." }: BasicDropdownProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredOptions, setFilteredOptions] = useState(options)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const filtered = options.filter((option) => option.toLowerCase().includes(searchTerm.toLowerCase()))
        setFilteredOptions(filtered)
    }, [searchTerm, options])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const handleToggle = () => {
        setIsOpen(!isOpen)
        if (!isOpen) {
            setSearchTerm("")
        }
    }

    const handleSelect = (option: string) => {
        onSelect(option)
        setIsOpen(false)
        setSearchTerm("")
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    return (
        <div className="relative w-96" ref={dropdownRef}>
            <button
                onClick={handleToggle}
                className="w-96 px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {selected || placeholder}
            </button>
            {isOpen && (
                <div className="absolute w-96 mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <ul className="max-h-60 overflow-auto">
                        {filteredOptions.map((option) => (
                            <li
                                key={option}
                                onClick={() => handleSelect(option)}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                                {option}
                            </li>
                        ))}
                        {filteredOptions.length === 0 && <li className="px-4 py-2 text-gray-500">No options found</li>}
                    </ul>
                </div>
            )}
        </div>
    )
}

