export interface IMovie {
    id?: string;
    name?: string;
    posterURL?: string;
    year?: number;
    rating?: number;
    isFavourite?: boolean;
    genre?: number[];
    description?: string;
}

export interface IGenre {
    id: number;
    name: string;
}
