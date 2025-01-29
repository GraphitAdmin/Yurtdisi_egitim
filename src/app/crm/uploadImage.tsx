'use server'
import {put} from "@vercel/blob";
import {revalidatePath} from "next/cache";

export async function uploadImage(formData: FormData) {
    const file = formData.get('image') as File
    const filename = `${file.name}`

    try {
        console.log('ok')
        console.log(filename)
        console.log(file)
        const blob = await put(filename, file, {
            access: 'public',
            addRandomSuffix: false
        })
        console.log('blob',blob)
        revalidatePath('/')
        return { url: blob.url, success: true,filename }
    } catch (error) {
        console.log('not ok',error)

        return { error: 'Upload failed', success: false }
    }
}

