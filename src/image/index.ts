/**
 * Loads an image.
 * @param url The URL to load.
 * @returns The loaded image.
 */
export function load(url: string): Promise<ImageBitmapSource> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            resolve(img);
        }
        img.onerror = reject;
        img.src = url;
    });
}

/**
 * Loads an ImageBitmap.
 * @param url The URL to load.
 * @returns The loaded ImageBitmap.
 */
export async function loadBitmap(url: string): Promise<ImageBitmap> {
    return await createImageBitmap(await load(url));
}