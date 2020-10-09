import { getPreviewCameras } from "../api";
import create from "zustand";
import produce from "immer";
import { devtools } from "zustand/middleware";

// ~~~~~~~~~~~~~~~~~~~~~~~~
// STATE 
// ~~~~~~~~~~~~~~~~~~~~~~~~

const store = (set) => ({
  // CAMERAS
  cameraArtboards: {},
  currentCameraArtboard: 1,
  cameraIsLoaded: false,
  // UPDATE POSITION OF CAMERA
  updateCameraPosition: ({ currentArtboard, position }) =>
    set((state) => {
      state.cameraArtboards[currentArtboard].position = position;
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
  // LOAD PREVIEW CAMERAS
  loadPreviewCameras: () =>
    getPreviewCameras()
      .then((cameras) =>
        set((state) => {
          state.cameraArtboards = cameras.cameraArtboards;
        })
      )
      .then(() => set(() => ({ cameraIsLoaded: true }))),
});
const immer = (config) => (set, get, api) =>
  config((fn) => set(produce(fn)), get, api);
export const [useCameraStore] = create(devtools(immer(store)));