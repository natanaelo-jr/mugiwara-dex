export interface ImageResponse {
    id: number
    name: string
    image: string
    type: "character" | "portrait" | "fruit" | "crew"
    created_at: string
}

export interface ImageResponsePage {
    images: ImageResponse[]
    total: number
    page: number
    per_page: number
    total_pages: number
}
