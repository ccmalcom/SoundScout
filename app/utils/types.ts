    //define artist custom type
export type Artist = {
        name: string;
        popularity: number;
        images: Array<Image>;
        id: string;
    }

//define event custom type
export type Event = {
    name: string;
    date: string;
    images: Array<Image>;
    id: string;
    location:{
        venueName: string;
        city: string;
        state: string;
        addressLines: string;
        postalCode: string;
    }
    artist?: string;
}

export type Track = {
    name: string;
    album: string;
    // artist: string;
    popularity: number;
    id: string;
    images: Array<Image>;
}

export type Image={
    url: string;
    height: number;
    width: number;
}

export type User = {
    display_name: string;
    images: Array<Image>;
}