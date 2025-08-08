import { ImageResponse } from "@/lib/types/images"
import api from "@/lib/api"

export async function uploadImage(
    file: File, type: "character" | "portrait" | "fruit" | "crew", name: string
): Promise<ImageResponse> {

    const data = new FormData();
    data.append("image", file);
    data.append("type", type);
    data.append("name", name);

    return api.post<ImageResponse>("api/content/images/", data).then(response => {
        console.log(response)
        return response.data
    }).catch(error => { throw error })
}
