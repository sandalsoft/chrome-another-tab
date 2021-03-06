import { createStandardAction } from "typesafe-actions";
import { ChromeBookmark } from "./../types/ChromeBookmark";
import { ReduxPersistedState } from "./../types/ReduxPersistedState";

export const actions = {
  // App actions
  toggleShowHiddenBookmark: createStandardAction(
    "app/TOGGLE_SHOW_HIDDEN_BOOKMARK"
  )(),
  setQuery: createStandardAction("app/SET_QUERY")<string>(),

  // Bookmark actions
  retrieveBookmarks: createStandardAction("bookmark/RETRIEVE_BOOKMARK")(),
  retrieveBookmarksSuccess: createStandardAction(
    "bookmark/RETRIEVE_BOOKMARK_SUCCESS"
  )<{
    foldersById: { [id: string]: ChromeBookmark };
    bookmarksById: { [id: string]: ChromeBookmark };
  }>(),
  hideBookmark: createStandardAction("bookmarks/HIDE_BOOKMARK")<string>(),
  showBookmark: createStandardAction("bookmarks/SHOW_BOOKMARK")<string>(),
  hideFolder: createStandardAction("bookmarks/HIDE_FOLDER")<string>(),
  showFolder: createStandardAction("bookmarks/SHOW_FOLDER")<string>(),

  // Theme actions
  goToNextTheme: createStandardAction("theme/GO_TO_NEXT_THEME")(),

  // Other
  rehydrate: createStandardAction("other/REHYDRATE_REQUEST")(),
  rehydrateSuccess: createStandardAction("other/REHYDRATE_SUCCESS")<
    ReduxPersistedState
  >()
};
