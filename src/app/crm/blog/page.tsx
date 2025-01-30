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
import {ArrowUpDown, Building, PlusCircle, NotebookPen} from 'lucide-react'
import {Button} from "@/components/crm/ui/button";
import {IBlog} from "@/utils/interfaces";

export default function AdminPanel() {
    const [blogs, setBlogs] = useState<IBlog[]>([]);
    useEffect(() => {
        const fetchJson = async () => {
            try {
                const blobUrl = 'https://i9ozanmrsquybgxg.public.blob.vercel-storage.com/jsons/blogs.json';
                const response = await fetch(blobUrl, {
                    cache: 'no-store',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch JSON');
                }
                const jsonData = await response.json();
                setBlogs(jsonData);
            } catch (err) {
                console.log(err);
            }
        };

        fetchJson().then();
    }, []);

    const [searchTerm, setSearchTerm] = useState('')
    const [sortColumn, setSortColumn] = useState<keyof IBlog>('title')
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

    const handleSort = (column: keyof IBlog) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortColumn(column)
            setSortDirection('asc')
        }
    }
    const filteredCities = useMemo(() => {
        return blogs.filter(blog =>
            blog.title.toLowerCase().includes(searchTerm.toLowerCase())

        )
    }, [searchTerm, blogs])

    const sortedBlogs = useMemo(() => {
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
                                <NotebookPen className="w-8 h-8 mr-2"/>
                                Blogs
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
                                        window.location.href = '/crm/blog/new'
                                    }} className="w-48 border-2 border-black">
                                        <PlusCircle className="mr-2 h-4 w-4"/> Add New Blog
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
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {sortedBlogs.map((blog, index) => (
                                            <TableRow
                                                onClick={() => window.location.href = `/crm/blog/${blog.title.replace(/ /g, '-').toLowerCase()}`}
                                                key={index} className="hover:bg-gray-50">
                                                <TableCell className="font-medium">{blog.title}</TableCell>
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

