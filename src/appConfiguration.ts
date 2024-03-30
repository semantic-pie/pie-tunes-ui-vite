
export const config = {
    https: import.meta.env.VITE_API_HTTPS === 'enable' ? true : false,
    host: {
        domain: import.meta.env.VITE_API_HOST_DOMAIN ?? 'localhost:8080',
        streaming: import.meta.env.VITE_API_HOST_STREAMING ?? 'localhost:9999',
        // self: import.meta.env.VITE_API_HOST ?? '0.0.0.0',
    },
    // port: {
    //     domain: import.meta.env.VITE_API_PORT_DOMAIN ?? 8080,
    //     streaming: import.meta.env.VITE_API_PORT_STREAMING ?? 9999,
    //     self: import.meta.env.VITE_API_PORT ?? 3000,
    // }
}

export const userUuid = '7ea506b5-0cf4-4f7a-8781-42bf2e5fd591'

console.log("API:\n", config)