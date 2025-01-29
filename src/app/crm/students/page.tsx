'use client'
import { Sidebar } from "@/components/crm/ui/sidebar"
export default function AdminPanel() {

    return (
        <div className="min-h-screen bg-background">
            <div className="flex">
                <Sidebar />
                <main className="flex-1 p-4">
                   Students
                </main>
            </div>
        </div>
    )
}

