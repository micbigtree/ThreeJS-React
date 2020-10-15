import { getShapes } from "../api";
import create from "zustand";
import produce from "immer";
import { devtools } from "zustand/middleware";

// ~~~~~~~~~~~~~~~~~~~~~~~~
// STATE
// ~~~~~~~~~~~~~~~~~~~~~~~~

const store = (set) => ({
  objectArtboards: {
    1: [
    ],
    2: [
      {
        name: "ship_dark",
        category: "pirates",
        position: [2, 0, 1],
        destination: 2,
      },
    ],
  },
  addObject: ({ currentArtboard, category, name }) =>
    set((state) => {
      state.objectArtboards[currentArtboard].push({
        name: name,
        category: category,
        position: [0, 0, 0],
        destination: 2,
      });
    }),
  currentObjectArtboard: 1,
  objectsAreLoaded: false,
});
const immer = (config) => (set, get, api) =>
  config((fn) => set(produce(fn)), get, api);
export const [useObjectStore] = create(devtools(immer(store)));
