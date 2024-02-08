    //define artist custom type
export type Artist = {
        name: string;
        popularity: number;
        images: Array<string>;
        id: string;
    }

//define event custom type
export type Event = {
    name: string;
    date: string;
    images: Array<string>;
    id: string;
    location:{
        venueName: string;
        city: string;
        state: string;
        addressLines: string;
        postalCode: string;
    }
    Artist?: Artist;
}