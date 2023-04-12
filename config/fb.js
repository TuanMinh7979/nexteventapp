
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getApps } from 'firebase/app';

import pk from "./pk.json" assert { type: "json" };;

let app;

if (!getApps().length) {
  app = initializeApp(pk);
} else {
  app = getApps()[0];
}

export const auth = getAuth(app);
