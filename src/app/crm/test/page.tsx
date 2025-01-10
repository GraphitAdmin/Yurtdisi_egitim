import { list } from '@vercel/blob';
import Image from "next/image"
export default async function Page() {
    const response = await list();
    console.log(response)
    return (
        <>

            {response.blobs.map((blob,id) => (
                <div key={id}>
                    <Image width="1000" height="200" src={blob.url} alt="download" />
                    <a key={blob.pathname} href={blob.downloadUrl}>
                        {blob.pathname}
                    </a>
                </div>
            ))}
        </>
    );
}