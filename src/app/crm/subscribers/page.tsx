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
import {ArrowUpDown, LucideMail, Users} from 'lucide-react'
import {ISubscriber} from "@/utils/interfaces";
import {blobUrl, checkLogged} from "@/utils/utils";

export default function AdminPanel() {
    checkLogged();
    const [subscribers, setSubscribers] = useState<ISubscriber[]>([]);
    useEffect(() => {
        const fetchJson = async () => {
            try {
                const studentsUrl = blobUrl+'jsons/subscribers.json';
                const response = await fetch(studentsUrl, {
                    cache: 'no-store',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch JSON');
                }
                const jsonData = await response.json();
                setSubscribers(jsonData);
            } catch (err) {
                console.log(err);
            }
        };

        fetchJson().then();
    }, []);

    const [searchTerm, setSearchTerm] = useState('')
    const [sortColumn, setSortColumn] = useState<keyof ISubscriber>('name')
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

    const handleSort = (column: keyof ISubscriber) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortColumn(column)
            setSortDirection('asc')
        }
    }
    const filteredStudents = useMemo(() => {
        return subscribers.filter(student =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase())||student.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
    }, [searchTerm, subscribers])

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
                                <LucideMail className="w-8 h-8 mr-2"/>
                                Subscribers
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div
                                className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
                                <div className="flex items-center justify-between w-full">
                                    <Input
                                        placeholder="Search subscriber..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full md:w-64 bg-white/50 backdrop-blur-sm"
                                    />
                                </div>
                            </div>
                            <div className="bg-white rounded-lg shadow overflow-hidden">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-gray-100">
                                            <TableHead onClick={() => handleSort('name')}
                                                       className="cursor-pointer hover:bg-gray-200">
                                                <div className="flex items-center">
                                                    <Users className="w-4 h-4 mr-2"/>
                                                    Name
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
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {sortedStudents.map((student, index) => (
                                            <TableRow
                                                key={index} className="hover:bg-gray-50">
                                                <TableCell className="font-medium">{student.name}</TableCell>
                                                <TableCell className="font-medium">{student.email}</TableCell>
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

