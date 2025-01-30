import Link from "next/link"
import {Users, School, FileText, Calendar, Settings, Globe, Building,NotebookPen} from 'lucide-react'

const navigationItems = [
    { name: "Students", icon: Users, href: "/students" },
    { name: "Cities", icon: Building, href: "/city" },
    { name: "Schools", icon: School, href: "/school" },
    { name: "Blogs", icon: NotebookPen, href: "/blog" },
    { name: "Events", icon: Calendar, href: "/event" },
    { name: "Sitemap", icon: FileText, href: "/sitemap" },
    { name: "General Settings", icon: Settings, href: "/settings" },
]

export function Sidebar() {
    return (
        <aside className="w-64 min-h-screen bg-background border-r">
            <div className="p-4 border-b">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <Globe className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <span className="font-semibold">Eeeducation</span>
                </div>
            </div>
            <nav className="p-2" style={{alignItems: "flex-start"}}>
                {navigationItems.map((item) => (
                    <Link
                        key={item.name}
                        href={`/crm${item.href}`}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md"
                    >
                        <item.icon className="w-4 h-4" />
                        {item.name}
                    </Link>
                ))}
            </nav>
        </aside>
    )
}

