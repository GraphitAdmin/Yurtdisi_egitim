import Link from "next/link"
import {Home, Users, School, FileText, Calendar, Settings, Bell, BarChart, Globe, Building} from 'lucide-react'

const navigationItems = [
    { name: "Home page", icon: Home, href: "/" },
    { name: "Students", icon: Users, href: "/students" },
    { name: "Cities", icon: Building, href: "/cities" },
    { name: "Schools", icon: School, href: "/schools" },
    { name: "Pages", icon: FileText, href: "/pages" },
    { name: "Events", icon: Calendar, href: "/events" },
    { name: "General Settings", icon: Settings, href: "/settings" },
    { name: "Reminders", icon: Bell, href: "/reminders" },
    { name: "Reports", icon: BarChart, href: "/reports" },
    { name: "Site Settings", icon: Settings, href: "/site-settings" },
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

