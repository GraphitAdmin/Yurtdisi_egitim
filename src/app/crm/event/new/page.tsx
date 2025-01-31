import {Sidebar} from "@/components/crm/ui/sidebar"
import JSONCreatorEvent from "@/components/crm/events/JSONCreatorEvent";
export default async function Home() {
    return (
        <div className="min-h-screen bg-background">
            <div className="flex"><Sidebar/>
                <main className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">Create Event</h1>
                    <JSONCreatorEvent/>
                </main>
            </div>
        </div>

    )
}

