/*interface for actual post data*/
export interface IPost {
    userDetails: string
    username: string|null,
    dateTime: Date,
    keyword: string,
    mood: number,
    textBody: string,
}


export interface IGeoPosition {
    type: string,
    coordinates: number[],
}

/*interface for IGeoJson data*/
export interface IGeoJson {
    type: string,
    geometry: IGeoPosition,
    properties: IPost,
    _id: string;
}

/*geojson class, creates geoJson object out of interface*/
export class GeoJson {
    type = 'Feature';
    geometry!: IGeoPosition;
    properties!: IPost; 
    _id: string;

    constructor(properties: IPost, cord: number[], _id: string) {
        this.properties = properties;
        this.geometry = {
            type: 'Point',
            coordinates: cord,
        };
        this._id = _id;
    }
}

/*feature collection object made form geoJson array and used
to set data in the mapbox component*/
export class FeatureCollection {
    type = 'FeatureCollection';
    constructor(public features: Array<GeoJson>) {}
}

