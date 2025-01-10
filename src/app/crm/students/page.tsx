'use client'
import { Sidebar } from "@/components/crm/sidebar"
import {useState} from "react";
import Image from 'next/image'
import {uploadImage} from "@/app/crm/students/uploadImage";
import Images from "@/app/crm/students/Images";

export default function AdminPanel() {
    const [isUploading, setIsUploading] = useState(false)
    const [preview, setPreview] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    async function handleSubmit(formData: FormData) {
        setIsUploading(true)
        setError(null)
        console.log('submit')
        try {
            const result = await uploadImage(formData)

            if (result.success && result.url) {
                console.log('preview')

                setPreview(result.url)
            } else {
                console.log('upload failed')
                setError('Upload failed. Please try again.')
            }
        } catch (e) {
            setError('Something went wrong. Please try again.')
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="flex">
                <Sidebar />
                <main className="flex-1 p-4">
                   School
                    <label htmlFor="image">School Image</label>
                    <div className="flex flex-col gap-4">
                        {preview && (
                            <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-lg border">
                                <Image
                                    src={preview}
                                    alt="Uploaded image"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <form action={handleSubmit} className="flex items-center gap-4">
                            <input
                                id="image"
                                name="image"
                                type="file"
                                accept="image/*"
                                disabled={isUploading}
                                className="max-w-sm"
                            />
                            <button type="submit" disabled={isUploading}>
                                {isUploading ? (
                                    <>
                                        Uploading...
                                    </>
                                ) : (
                                    <>
                                        Upload
                                    </>
                                )}
                            </button>
                        </form>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                    </div>
                    <Images/>
                </main>
            </div>
        </div>
    )
}

