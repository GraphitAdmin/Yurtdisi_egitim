'use client'
import {Sidebar} from "@/components/crm/ui/sidebar"
import React, {useEffect, useMemo, useState} from "react";
import './cities.css'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/crm/ui/table"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/crm/ui/card"
import {Input} from "@/components/crm/ui/input"
import {ArrowUpDown, Building, Map, PlusCircle, School} from 'lucide-react'
import {Button} from "@/components/crm/ui/button";
import {ISchool} from "@/utils/interfaces";
import {blobUrl, checkLogged} from "@/utils/utils";

export default function AdminPanel() {
    checkLogged();
    const [schools, setSchools] = useState<ISchool[]>([]);
    useEffect(() => {
        const fetchJson = async () => {
            try {
                const schoolsUrl = blobUrl+'jsons/schools.json';
                const response = await fetch(schoolsUrl, {
                    cache: 'no-store',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch JSON');
                }
                const jsonData = await response.json();
                setSchools(jsonData);
            } catch (err) {
                console.log(err);
            }
        };

        fetchJson().then();
    }, []);

    const [searchTerm, setSearchTerm] = useState('')
    const [sortColumn, setSortColumn] = useState<keyof ISchool>('title')
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

    const handleSort = (column: keyof ISchool) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortColumn(column)
            setSortDirection('asc')
        }
    }
    const filteredCities = useMemo(() => {
        return schools.filter(school =>
            school.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            school.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
            school.city.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [searchTerm, schools])

    const sortedCities = useMemo(() => {
        return [...filteredCities].sort((a, b) => {
            if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
            if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
            return 0
        })
    }, [filteredCities, sortColumn, sortDirection])

    return (
        <div className="min-h-screen bg-background">
            <div className="flex">
                <Sidebar/>
                <div className="min-h-screen w-full p-8">
                    <Card
                        className="w-full max-w-6xl mx-auto bg-white/80 backdrop-blur-sm shadow-xl rounded-xl overflow-hidden">
                        <CardHeader className="p-6">
                            <CardTitle className="text-3xl font-bold flex items-center text-black">
                                <School className="w-8 h-8 mr-2"/>
                                Schools
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div
                                className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
                                <div className="flex items-center justify-between w-full">
                                    <Input
                                        placeholder="Search school..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full md:w-64 bg-white/50 backdrop-blur-sm"
                                    />
                                    <Button onClick={() => {
                                        window.location.href = '/crm/school/new'
                                    }} className="w-48 border-2 border-black">
                                        <PlusCircle className="mr-2 h-4 w-4"/> Add New School
                                    </Button>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow overflow-hidden">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-gray-100">
                                            <TableHead onClick={() => handleSort('title')}
                                                       className="cursor-pointer hover:bg-gray-200">
                                                <div className="flex items-center">
                                                    <Building className="w-4 h-4 mr-2"/>
                                                    Name
                                                    <ArrowUpDown className="w-4 h-4 ml-1"/>
                                                </div>
                                            </TableHead>
                                            <TableHead onClick={() => handleSort('country')}
                                                       className="cursor-pointer hover:bg-gray-200">
                                                <div className="flex items-center">
                                                    <Map className="w-4 h-4 mr-2"/>
                                                    Country
                                                    <ArrowUpDown className="w-4 h-4 ml-1"/>
                                                </div>
                                            </TableHead>
                                            <TableHead onClick={() => handleSort('city')}
                                                       className="cursor-pointer hover:bg-gray-200">
                                                <div className="flex items-center">
                                                    <Map className="w-4 h-4 mr-2"/>
                                                    City
                                                    <ArrowUpDown className="w-4 h-4 ml-1"/>
                                                </div>
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {sortedCities.map((school, index) => (
                                            <TableRow
                                                onClick={() => window.location.href = `/crm/school/${school.title.replace(/ /g, '-').toLowerCase()}`}
                                                key={index} className="hover:bg-gray-50">
                                                <TableCell className="font-medium">{school.title}</TableCell>
                                                <TableCell>{school.country}</TableCell>
                                                <TableCell>{school.city}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

