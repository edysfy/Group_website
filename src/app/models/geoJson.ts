export interface IPost {
    username: string,
    dateTime: string,
    keyword: string,
    mood: string,
    textBody: string,
}

export interface IGeoPosition {
    type: string,
    coordinates: number[],
}

export interface IGeoJson {
    type: string,
    location: IGeoPosition,
    properties: IPost,
    _id: string;
}

export class GeoJson implements IGeoJson {
    type = 'Feature';
    location!: IGeoPosition;
    properties!: IPost; 
    _id: string;

    constructor(properties: IPost, cord: number[], _id: string) {
        this.properties = properties;
        this.location = {
            type: 'Point',
            coordinates: cord,
        };
        this._id = _id;
    }
}

