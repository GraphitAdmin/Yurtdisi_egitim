import React, {useState} from 'react';
import {Button} from "@/components/crm/ui/button"
import {Check, ChevronsUpDown} from 'lucide-react'
import {cn} from "@/utils/utils"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/crm/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/crm/ui/popover"

interface DropdownProps {
    options: string[];
    onSelect: (value: string) => void;
    placeholder?: string;
    selected?:string;
}

export function Dropdown({options, onSelect, placeholder = "Select an option...",selected}: DropdownProps) {
    const [open, setOpen] = useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {selected
                        ? options.find((option) => option === selected)
                        : placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Search options..."/>
                    <CommandEmpty>No option found.</CommandEmpty>
                    <CommandGroup>
                        {options&&options.map((option,index) => (
                            <CommandItem
                                key={index}
                                onSelect={() => {
                                    onSelect(option)
                                    setOpen(false)
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        selected === option ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {option}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}