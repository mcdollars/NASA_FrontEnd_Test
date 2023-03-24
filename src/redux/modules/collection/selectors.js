import { get } from "lodash";

export const collectionStateSelector = (state) =>
  get(state, 'collection')

export const collectionsSelector = (state) =>
  get(state, "collection.collections");
