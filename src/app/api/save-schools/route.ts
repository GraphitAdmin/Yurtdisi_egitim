import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import {revalidatePath} from "next/cache";

export async function POST(request: Request) {
    const cities = await request.json();

    try {
        const { url } = await put('jsons/schools.json', JSON.stringify(cities,null,2), {
            access: 'public',
            addRandomSuffix: false,
            cacheControlMaxAge: 0
        });
        revalidatePath("/")
        return NextResponse.json({ success: true, url });
    } catch (error) {
        console.error('Error saving to Vercel Blob:', error);
        return NextResponse.json({ success: false, error: 'Failed to save data' }, { status: 500 });
    }
}

