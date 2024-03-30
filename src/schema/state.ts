import mongoose from "mongoose";
import * as THREE from "three";

type urlsType = {
  characterUrl?: string | undefined;
  vehicleUrl?: string | undefined;
  airplaneUrl?: string | undefined;
  wheelUrl?: string | undefined;
};

export type stateType = {
  username: string;
  position: THREE.Vector3;
  euler: THREE.Euler;
  currentAnimation: string;
  urls: urlsType;
};

const stateSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    position: {
      type: THREE.Vector3,
      required: false,
    },
    euler: {
      type: THREE.Euler,
      required: false,
    },
    currentAnimation: {
      type: String,
      required: false,
    },
    urls: {
      type: Object,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    autoCreate: true,
  }
);

export const State = mongoose.model("State", stateSchema);
