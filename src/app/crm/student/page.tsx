'use client'
import {Sidebar} from "@/components/crm/ui/sidebar"
import React, {useEffect, useMemo, useState} from "react";
import '../school/cities.css'
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
import {ArrowUpDown, Building, LucideMail, MessageSquare, Phone, PlusCircle, School, Users} from 'lucide-react'
import {Button} from "@/components/crm/ui/button";
import {IStudent} from "@/utils/interfaces";
import {blobUrl, checkLogged} from "@/utils/utils";

export default function AdminPanel() {
    checkLogged();
    const [students, setStudents] = useState<IStudent[]>([]);
    useEffect(() => {
        const fetchJson = async () => {
            try {
                const studentsUrl = blobUrl+'jsons/students.json';
                const response = await fetch(studentsUrl, {
                    cache: 'no-store',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch JSON');
                }
                const jsonData = await response.json();
                setStudents(jsonData);
            } catch (err) {
                console.log(err);
            }
        };

        fetchJson().then();
    }, []);

    const [searchTerm, setSearchTerm] = useState('')
    const [sortColumn, setSortColumn] = useState<keyof IStudent>('firstName')
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

    const handleSort = (column: keyof IStudent) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortColumn(column)
            setSortDirection('asc')
        }
    }
    const filteredStudents = useMemo(() => {
        return students.filter(student =>
            student.firstName.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [searchTerm, students])

    const sortedStudents = useMemo(() => {
        return [...filteredStudents].sort((a, b) => {
            if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
            if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
            return 0
        })
    }, [filteredStudents, sortColumn, sortDirection])

    return (
        <div className="min-h-screen bg-background">
            <div className="flex">
                <Sidebar/>
                <div className="min-h-screen w-full p-8">
                    <Card
                        className="w-full max-w-6xl mx-auto bg-white/80 backdrop-blur-sm shadow-xl rounded-xl overflow-hidden">
                        <CardHeader className="p-6">
                            <CardTitle className="text-3xl font-bold flex items-center text-black">
                                <Users className="w-8 h-8 mr-2"/>
                                Students
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div
                                className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
                                <div className="flex items-center justify-between w-full">
                                    <Input
                                        placeholder="Search student..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full md:w-64 bg-white/50 backdrop-blur-sm"
                                    />
                                    <Button onClick={() => {
                                        window.location.href = '/crm/student/new'
                                    }} className="w-48 border-2 border-black">
                                        <PlusCircle className="mr-2 h-4 w-4"/> Add Student
                                    </Button>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow overflow-hidden">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-gray-100">
                                            <TableHead onClick={() => handleSort('firstName')}
                                                       className="cursor-pointer hover:bg-gray-200">
                                                <div className="flex items-center">
                                                    <Users className="w-4 h-4 mr-2"/>
                                                    First Name
                                                    <ArrowUpDown className="w-4 h-4 ml-1"/>
                                                </div>
                                            </TableHead>
                                            <TableHead onClick={() => handleSort('lastName')}
                                                       className="cursor-pointer hover:bg-gray-200">
                                                <div className="flex items-center">
                                                    <Users className="w-4 h-4 mr-2"/>
                                                    Last Name
                                                    <ArrowUpDown className="w-4 h-4 ml-1"/>
                                                </div>
                                            </TableHead>
                                            <TableHead onClick={() => handleSort('email')}
                                                       className="cursor-pointer hover:bg-gray-200">
                                                <div className="flex items-center">
                                                    <LucideMail className="w-4 h-4 mr-2"/>
                                                    Email
                                                    <ArrowUpDown className="w-4 h-4 ml-1"/>
                                                </div>
                                            </TableHead>
                                            <TableHead onClick={() => handleSort('phone')}
                                                       className="cursor-pointer hover:bg-gray-200">
                                                <div className="flex items-center">
                                                    <Phone className="w-4 h-4 mr-2"/>
                                                    Phone
                                                    <ArrowUpDown className="w-4 h-4 ml-1"/>
                                                </div>
                                            </TableHead>
                                            <TableHead onClick={() => handleSort('programs')}
                                                       className="cursor-pointer hover:bg-gray-200">
                                                <div className="flex items-center">
                                                    <School className="w-4 h-4 mr-2"/>
                                                    Programs
                                                    <ArrowUpDown className="w-4 h-4 ml-1"/>
                                                </div>
                                            </TableHead>
                                            <TableHead onClick={() => handleSort('city')}
                                                       className="cursor-pointer hover:bg-gray-200">
                                                <div className="flex items-center">
                                                    <Building className="w-4 h-4 mr-2"/>
                                                    City
                                                    <ArrowUpDown className="w-4 h-4 ml-1"/>
                                                </div>
                                            </TableHead>
                                            <TableHead onClick={() => handleSort('country')}
                                                       className="cursor-pointer hover:bg-gray-200">
                                                <div className="flex items-center">
                                                    <Phone className="w-4 h-4 mr-2"/>
                                                    Country
                                                    <ArrowUpDown className="w-4 h-4 ml-1"/>
                                                </div>
                                            </TableHead>
                                            <TableHead className="cursor-pointer hover:bg-gray-200">
                                                <div className="flex items-center">
                                                    <MessageSquare className="w-4 h-4 mr-2"/>
                                                    Message
                                                </div>
                                            </TableHead>
                                            <TableHead className="cursor-pointer hover:bg-gray-200">
                                                <div className="flex items-center">
                                                    <Phone className="w-4 h-4 mr-2"/>
                                                    Contacted?
                                                </div>
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {sortedStudents.map((student, index) => (
                                            <TableRow
                                                onClick={() => window.location.href = `/crm/student/${student.id}`}
                                                key={index} className="hover:bg-gray-50">
                                                <TableCell className="font-medium">{student.firstName}</TableCell>
                                                <TableCell className="font-medium">{student.lastName}</TableCell>
                                                <TableCell className="font-medium">{student.email}</TableCell>
                                                <TableCell className="font-medium">{student.phone}</TableCell>
                                                <TableCell className="font-medium">{student.programs}</TableCell>
                                                <TableCell className="font-medium">{student.city}</TableCell>
                                                <TableCell className="font-medium">{student.country}</TableCell>
                                                <TableCell className="font-medium">{student.message}</TableCell>
                                                <TableCell className="font-medium">{student.isContacted?'Yes':'No'}</TableCell>
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

