import JSONEditor from '@/components/crm/cities/JSONEditor'
import {Sidebar} from "@/components/crm/ui/sidebar"

type paramsType = Promise<{ name: string }>;
export default async function Home({
                                       params,
                                   }: {
    params: paramsType;
}) {

    const {name} = await params
    return (
        <div className="min-h-screen bg-background">
            <div className="flex"><Sidebar/>
                <main className="container mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">Edit {name}</h1>
                    <JSONEditor name={name}/>
                </main>
            </div>
        </div>

    )
}

