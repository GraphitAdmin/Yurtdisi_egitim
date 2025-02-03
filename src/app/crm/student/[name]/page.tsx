import {Sidebar} from "@/components/crm/ui/sidebar"
import JSONEditorStudent from "@/components/crm/students/JSONEditorStudent";

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
                    <JSONEditorStudent name={name}/>
                </main>
            </div>
        </div>

    )
}

