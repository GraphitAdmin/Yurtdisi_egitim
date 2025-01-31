import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const errorToasterStyles = {
    style: {
        padding: '16px',
        color: '#191C21',
        background: '#FFFFFF',
    },
    iconTheme: {
        primary: '#FC4242',
        secondary: '#FFFFFF',
    },
    duration: 3000,
};

export const successToasterStyles = {
    style: {
        padding: '16px',
        color: '#191C21',
        background: '#FFFFFF',
    },
    iconTheme: {
        primary: '#009277',
        secondary: '#FFFFFF',
    },
    duration: 1500,
};

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
export const blobUrl = "https://i9ozanmrsquybgxg.public.blob.vercel-storage.com/";
