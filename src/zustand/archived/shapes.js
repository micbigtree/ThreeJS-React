import { getShapes } from "../api";
import create from "zustand";
import produce from "immer";
import { devtools } from "zustand/middleware";

// ~~~~~~~~~~~~~~~~~~~~~~~~
// STATE
// ~~~~~~~~~~~~~~~~~~~~~~~~

const store = (set) => ({
  editorMode: true,
  switchModes: () =>
    set((state) => {
      state.editorMode = !state.editorMode;
    }),
  artboards: {},
  currentArtboard: 1,
  shapesAreLoaded: false,
  // LOAD SHAPES
  loadShapes: () =>
    getShapes()
      .then((shapes) =>
        set((state) => {
          state.artboards = shapes.artboards;
        })
      )
      .then(() => set(() => ({ shapesAreLoaded: true }))),
  // UPDATE POSITION OF SHAPE
  updatePosition: ({ id, currentArtboard, position }) =>
    set((state) => {
      state.artboards[currentArtboard].find(
        (x) => x.id === id
      ).position = position;
    }),
  // ADD A NEW SHAPE
  addShape: ({ currentArtboard, shape }) =>
    set((state) => {
      state.artboards[currentArtboard].push({
        id:
          state.artboards[currentArtboard].length > 0
            ? state.artboards[currentArtboard][
                state.artboards[currentArtboard].length - 1
              ].id + 1
            : 1,
        shape: shape,
        position:
          state.artboards[currentArtboard].length > 0
            ? [
                state.artboards[currentArtboard][
                  state.artboards[currentArtboard].length - 1
                ].position[0] + 1,
                state.artboards[currentArtboard][
                  state.artboards[currentArtboard].length - 1
                ].position[1],
                state.artboards[currentArtboard][
                  state.artboards[currentArtboard].length - 1
                ].position[2]
              ]
            : [1, 0, 1]
      });
    }),
  // REMOVE A SHAPE
  removeShape: ({ currentArtboard, id }) =>
    set((state) => {
      state.artboards[currentArtboard].splice(
        state.artboards[currentArtboard].find((x) => x.id === id),
        1
      );
    }),
  // SELECT DIFFERENT ARTBOARD
  updateArtboard: (artboard) => {
    set((state) => {
      state.currentArtboard = artboard;
    });
  },
  // ADD A NEW ARTBOARD
  addArtboard: () =>
    set((state) => {
      let newNumber = Object.keys(state.artboards).length + 1;
      state.artboards[newNumber] = [];
    }),
  // REMOVE AN EXISTING ARTBOARD
  // AND SET CURRENT ARTBOARD TO A LEFTOVER ARTBOARD
  // OR CREATE A NEW BLANK IF THERE ARE NONE
  removeArtboard: (key) =>
    console.log("delete artboard request sent") &&
    set((state) => {
      delete state.artboards[key];
    }),

  // UPDATE SHAPE'S CLICK DESTINATION
  updateDestination: ({ id, currentArtboard, destination }) =>
    set((state) => {
      console.log(destination);
      state.artboards[currentArtboard].find(
        (x) => x.id === id
      ).destination = destination;
      console.log(
        state.artboards[currentArtboard].find((x) => x.id === id).destination
      );
    })
});
const immer = (config) => (set, get, api) =>
  config((fn) => set(produce(fn)), get, api);
export const [useShapeStore] = create(devtools(immer(store)));
