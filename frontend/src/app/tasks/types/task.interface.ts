export interface TaskInterface {
    id: number;
    title: string;
    description: string;
    status: string;
    created_at?: Date; //optional
    updated_at?: Date; //optional
}
