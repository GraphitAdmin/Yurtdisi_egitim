import { list } from '@vercel/blob'

async function testBlobList() {
    try {
        console.log('Attempting to list blobs...')
        const blobs = await list()
        console.log('Blobs retrieved successfully:', blobs)
    } catch (error) {
        console.error('Error listing blobs:', error)
    }
}

testBlobList()