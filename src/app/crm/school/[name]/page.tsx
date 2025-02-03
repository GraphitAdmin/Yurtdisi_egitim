import {Sidebar} from "@/components/crm/ui/sidebar"
import JSONEditorSchool from "@/components/crm/schools/JSONEditorSchool";

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
                    <h1 className="text-2xl font-bold mb-4">Edit {name.replace(/-/g, ' ').replace(/^\w/, (char) => char.toUpperCase())}</h1>
                    <JSONEditorSchool name={name}/>
                </main>
            </div>
        </div>

    )
}

