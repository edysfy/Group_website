export interface IPost {
    username: string,
    dateTime: string,
    keyword: string,
    mood: string,
    textBody: string,
}

export interface IGeoPosition {
    type: string,
    coordinates: Number[],
}

export interface IGeoJson {
    type: string,
    geometry: IGeoPosition,
    properties: IPost,
    _id: string;
}

export class GeoJson implements IGeoJson {
    type = 'Feature';
    geometry!: IGeoPosition;
    properties!: IPost; 
    _id: string;

    constructor(properties: IPost, cord: Number[], _id: string) {
        this.properties = properties;
        this.geometry = {
            type: 'Point',
            coordinates: cord,
        };
        this._id = _id;
    }
}

export class FeatureCollection {
    type = 'FeatureCollection'
    constructor(public features: Array<GeoJson>) {
        
    }
}