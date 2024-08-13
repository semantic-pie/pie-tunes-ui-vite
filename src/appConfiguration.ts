
export const config = {
    https: import.meta.env.VITE_API_HTTPS === 'enable' ? true : false,
    host: {
        domain: import.meta.env.VITE_API_HOST_DOMAIN ?? 'localhost:8080',
        streaming: import.meta.env.VITE_API_HOST_STREAMING ?? 'localhost:8080',
        snoopy: import.meta.env.VITE_API_HOST_SNOOPY ?? 'localhost:8080',
        rec: import.meta.env.VITE_API_HOST_REC ?? 'localhost:8080'
    }
}

export const CONSTANTS = {
    ENTITY_PER_PAGE: 20
}

console.log("API:\n", config)