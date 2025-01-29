import {Sidebar} from "@/components/crm/ui/sidebar"
import JSONCreatorBlog from "@/components/crm/blogs/JSONCreatorBlog";
export default async function Home() {
    return (
        <div className="min-h-screen bg-background">
            <div className="flex"><Sidebar/>
                <main className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">Create Blog</h1>
                    <JSONCreatorBlog/>
                </main>
            </div>
        </div>

    )
}

