export interface DirectionsRespose {
  routes: Route[];
  waypoints: Waypoint[];
  code: string;
  uuid: string;
}

export interface Route {
  weight_name: string;
  weight: number;
  duration: number;
  distance: number;
  legs: Leg[];
  geometry: Geometry;
}

export interface Geometry {
  coordinates: Array<number[]>;
  type: Type;
}

export enum Type {
  LineString = 'LineString',
}

export interface Leg {
  notifications: Notification[];
  via_waypoints: any[];
  admins: Admin[];
  weight: number;
  duration: number;
  steps: Step[];
  distance: number;
  summary: string;
}

export interface Admin {
  iso_3166_1_alpha3: string;
  iso_3166_1: string;
}

export interface Notification {
  details: Details;
  subtype: string;
  type: string;
  geometry_index_end: number;
  geometry_index_start: number;
}

export interface Details {
  actual_value: string;
  message: string;
}

export interface Step {
  intersections: Intersection[];
  maneuver: Maneuver;
  name: string;
  duration: number;
  distance: number;
  driving_side: DrivingSide;
  weight: number;
  mode: Mode;
  geometry: Geometry;
  destinations?: string;
  ref?: string;
}

export enum DrivingSide {
  Left = 'left',
  Right = 'right',
  SlightLeft = 'slight left',
  SlightRight = 'slight right',
  Straight = 'straight',
}

export interface Intersection {
  mapbox_streets_v8?: MapboxStreetsV8;
  classes?: ClassElement[];
  bearings: number[];
  entry: boolean[];
  admin_index: number;
  out?: number;
  geometry_index: number;
  location: number[];
  in?: number;
  duration?: number;
  turn_weight?: number;
  turn_duration?: number;
  weight?: number;
  lanes?: Lane[];
  traffic_signal?: boolean;
  is_urban?: boolean;
  toll_collection?: TollCollection;
}

export enum ClassElement {
  Motorway = 'motorway',
  Restricted = 'restricted',
  Toll = 'toll',
  Tunnel = 'tunnel',
}

export interface Lane {
  indications: DrivingSide[];
  valid: boolean;
  active: boolean;
  valid_indication?: DrivingSide;
}

export interface MapboxStreetsV8 {
  class: MapboxStreetsV8Class;
}

export enum MapboxStreetsV8Class {
  Motorway = 'motorway',
  MotorwayLink = 'motorway_link',
  Primary = 'primary',
  PrimaryLink = 'primary_link',
  Secondary = 'secondary',
  SecondaryLink = 'secondary_link',
  Service = 'service',
  Street = 'street',
  Tertiary = 'tertiary',
  Trunk = 'trunk',
  TrunkLink = 'trunk_link',
}

export interface TollCollection {
  type: string;
}

export interface Maneuver {
  type: string;
  instruction: string;
  bearing_after: number;
  bearing_before: number;
  location: number[];
  modifier?: DrivingSide;
}

export enum Mode {
  Driving = 'driving',
}

export interface Waypoint {
  distance: number;
  name: string;
  location: number[];
}
