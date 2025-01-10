'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Loader2 } from 'lucide-react'

interface BlobImage {
    url: string
    pathname: string
}

export default function Images() {
    const [images, setImages] = useState<BlobImage[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch('/api/images');
                const text = await response.text(); // Get raw response text
                console.log('Raw response:', text);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = JSON.parse(text); // Manually parse JSON
                setImages(data.blobs);
            } catch (err) {
                console.error('Error fetching images:', err);
                setError(`Failed to load images: ${err.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        fetchImages()
    }, [])

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (error) {
        return <p className="text-red-500 text-center">{error}</p>
    }

    return (
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
                <div key={image.pathname} className="relative aspect-square">
                    <Image
                        src={image.url}
                        alt={`Image ${image.pathname}`}
                        fill
                        className="object-cover rounded-lg"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                </div>
            ))}
        </section>
    )
}

