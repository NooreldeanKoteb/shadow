import { Document } from 'mongoose';

export interface Location {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface LocationWithPoint extends Document {
  type: 'Point';
  coordinates: [number, number]; // [longitude, latitude]
}

export interface LocationWithRadius extends LocationWithPoint {
  radius: number;
}

// Mongoose schema for location
export const locationSchema = {
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  }
};

// Mongoose schema for GeoJSON Point
export const pointSchema = {
  type: {
    type: String,
    enum: ['Point'],
    default: 'Point',
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
}; 