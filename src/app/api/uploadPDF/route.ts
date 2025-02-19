import { put } from "@vercel/blob"
import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function POST(request: Request) {
    const formData = await request.formData()
    const file = formData.get("file") as File
    console.log('one')
    if (!file) {
        return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 })
    }
    console.log('one')

    if (file.type !== "application/pdf") {
        return NextResponse.json({ success: false, error: "File must be a PDF" }, { status: 400 })
    }
    console.log('one')

    try {
        console.log('one')
        const filename = `pdfs/${file.name}`
        const { url } = await put(filename, file, {
            access: "public",
            addRandomSuffix: false,
            cacheControlMaxAge: 0,
        })
        console.log('one')
        console.log(url)
        revalidatePath("/")
        return NextResponse.json({ success: true, url })
    } catch (error) {
        console.error("Error saving PDF to Vercel Blob:", error)
        return NextResponse.json({ success: false, error: "Failed to save PDF" }, { status: 500 })
    }
}

