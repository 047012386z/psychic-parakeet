declare module 'qrcode' {
    const toDataURL: (text: string, options?: Record<string, any>) => Promise<string>;
    const toCanvas: (canvas: HTMLCanvasElement, text: string, options?: Record<string, any>) => Promise<void>;
    export { toDataURL, toCanvas };
}