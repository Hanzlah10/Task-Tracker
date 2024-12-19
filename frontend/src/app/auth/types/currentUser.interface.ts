export interface CurrentUserInterface {
    id: number;
    username: string;
    email: string;
    created_at: string;
    updated_at: string;
    refreshToken?: string | null;
}

