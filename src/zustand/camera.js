import create from "zustand";
import produce from "immer";
import { devtools } from "zustand/middleware";

// ~~~~~~~~~~~~~~~~~~~~~~~~
// STATE
// ~~~~~~~~~~~~~~~~~~~~~~~~

const store = (set) => ({
  currentCameraArtboard: 1,
  // CAMERAS
  cameraArtboards: {
    1: {
      position: [0, 0, 3],
    },
    2: {
      position: [1, 5, 6],
    },
  },
  // UPDATE POSITION OF CAMERA
  updateCameraPosition: ({ currentArtboard, position }) =>
    set((state) => {
      const startTime = performance.now();
      state.cameraArtboards[currentArtboard].position = position;
      const duration = performance.now() - startTime;
      console.log(
        "updateCameraPosition took" + duration + "ms, from" + startTime
      );
    }),
  // ADD A NEW CAMERA ARTBOARD
  addCameraArtboard: () =>
    set((state) => {
      let newNumber = Object.keys(state.cameraArtboards).length + 1;
      state.cameraArtboards[newNumber] = {
        position: [0, 0, 0],
      };
    }),
  // REMOVE AN EXISTING ARTBOARD
  // AND SET CURRENT ARTBOARD TO A LEFTOVER ARTBOARD
  // OR CREATE A NEW BLANK IF THERE ARE NONE
  removeCameraArtboard: (key) =>
    set((state) => {
      delete state.cameraArtboards[key];
    }),
  // SELECT DIFFERENT CAMERA ARTBOARD
  updateCameraArtboard: (artboard) => {
    set((state) => {
      state.currentCameraArtboard = artboard;
    });
  },
});
const immer = (config) => (set, get, api) =>
  config((fn) => set(produce(fn)), get, api);
export const [useCameraStore] = create(devtools(immer(store)));
