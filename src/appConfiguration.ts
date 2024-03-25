
export const config = {
    https: import.meta.env.VITE_API_HTTPS ? true : false,
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

console.log("API:\n", config)