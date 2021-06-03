import { getObjects } from "../api";
import create from "zustand";
import produce from "immer";
import { devtools } from "zustand/middleware";
import shortid from "shortid";

// ~~~~~~~~~~~~~~~~~~~~~~~~
// STATE
// ~~~~~~~~~~~~~~~~~~~~~~~~
//looks like the api just isn't loading. adding 1: [] below stopped it breaking.
// But it should be loading shit from the api. but shapes api is working
const store = (set) => ({
  editorMode: true,
  switchModes: () =>
    set((state) => {
      state.editorMode = !state.editorMode;
    }),
  artboards: { 1: [] },
  currentObjectArtboard: 1,
  objectsAreLoaded: false,
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
  addObject: ({ currentObjectArtboard, category, object }) =>
    set((state) => {
      state.artboards[currentObjectArtboard].push({
        id: shortid.generate(),
        object: object,
        category: category,
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
        destination: 2
      });
    }),
  // REMOVE OBJECT
  removeObject: ({ currentObjectArtboard, id }) =>
    set((state) => {
      state.artboards[currentObjectArtboard].splice(
        state.artboards[currentObjectArtboard].find((x) => x.id === id),
        1
      );
    }),
  // UPDATE POSITION OF OBJECT
  updateObjectPosition: ({ id, currentObjectArtboard, position }) =>
    set((state) => {
      state.artboards[currentObjectArtboard].find(
        (x) => x.id === id
      ).position = position;
    }),
  // UPDATE ROTATION OF OBJECT
  updateObjectRotation: ({ id, currentObjectArtboard, rotation }) =>
    set((state) => {
      state.artboards[currentObjectArtboard].find(
        (x) => x.id === id
      ).rotation = rotation;
    }),
  // UPDATE SCALE OF OBJECT
  updateObjectScale: ({ id, currentObjectArtboard, scale }) =>
    set((state) => {
      state.artboards[currentObjectArtboard].find(({ id }) => id).scale = scale;
    }),
  // SELECT DIFFERENT ARTBOARD
  updateArtboard: (artboard) => {
    set((state) => {
      state.currentObjectArtboard = artboard;
    });
  },
  // UPDATE SHAPE'S CLICK DESTINATION
  updateDestination: ({ id, currentObjectArtboard, destination }) =>
    set((state) => {
      console.log(destination);
      state.artboards[currentObjectArtboard].find(
        (x) => x.id === id
      ).destination = destination;
      console.log(
        state.artboards[currentObjectArtboard].find((x) => x.id === id)
          .destination
      );
    }),
  // ADD A NEW ARTBOARD
  addArtboard: () =>
    set((state) => {
      let newNumber = Object.keys(state.artboards).length + 1;
      state.artboards[newNumber] = [
        ...state.artboards[Object.keys(state.artboards).length]
      ];
    }),
  // REMOVE AN EXISTING ARTBOARD
  // AND SET CURRENT ARTBOARD TO A LEFTOVER ARTBOARD
  // OR CREATE A NEW BLANK IF THERE ARE NONE
  removeArtboard: (key) =>
    set((state) => {
      delete state.artboards[key];
    })
});
const immer = (config) => (set, get, api) =>
  config((fn) => set(produce(fn)), get, api);
export const [useObjectStore] = create(devtools(immer(store)));
