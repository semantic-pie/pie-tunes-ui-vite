import { pieApiClient } from "@/api/client"

export const loadUserOrUndefined = () => pieApiClient.getUser().then(response => response.meta.status === 200 ? response.data : undefined)