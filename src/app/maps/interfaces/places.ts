export interface PlacesResponse {
  type: string;
  query: string[];
  features: Feature[];
  attribution: string;
}

export interface Feature {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: Properties;
  text: string;
  place_name: string;
  matching_place_name: string;
  center: number[];
  geometry: Geometry;
  address?: string;
  context: Context[];
  bbox?: number[];
}

export interface Context {
  id: string;
  mapbox_id: string;
  text: string;
  wikidata?: Wikidata;
  short_code?: ShortCode;
}

export enum ShortCode {
  Us = 'us',
  UsDc = 'US-DC',
}

export enum Wikidata {
  Q30 = 'Q30',
  Q3551781 = 'Q3551781',
  Q61 = 'Q61',
}

export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface Properties {
  accuracy?: string;
  mapbox_id: string;
}
