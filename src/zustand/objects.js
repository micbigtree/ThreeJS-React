import { getObjects } from "../api";
import create from "zustand";
import produce from "immer";
import { devtools } from "zustand/middleware";
import shortid from 'shortid';

// ~~~~~~~~~~~~~~~~~~~~~~~~
// STATE
// ~~~~~~~~~~~~~~~~~~~~~~~~
//looks like the api just isn't loading. adding 1: [] below stopped it breaking. 
// But it should be loading shit from the api. but shapes api is working
const store = (set) => ({
  artboards: {
    1: [],
  },
  // LOAD OBJECTS
  loadObjects: () =>
    getObjects()
      .then((objects) =>
        set((state) => {
          state.artboards = objects.objectArtboards;
        })
      )
      .then(() => set(() => ({ objectsAreLoaded: true }))),
  //ADD OBJECT
  addObject: ({ currentArtboard, category, object }) =>
    set((state) => {
      state.artboards[currentArtboard].push({
        id: shortid.generate(),
        object: object,
        category: category,
        position: [0, 0, 0],
        destination: 2,
      });
    }),
  currentObjectArtboard: 1,
  objectsAreLoaded: true,
});
const immer = (config) => (set, get, api) =>
  config((fn) => set(produce(fn)), get, api);
export const [useObjectStore] = create(devtools(immer(store)));
