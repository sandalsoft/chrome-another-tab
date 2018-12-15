import { omit } from "lodash";

type Bookmark = chrome.bookmarks.BookmarkTreeNode;

export const parseBookmarkTree = (bookmarkTree: Bookmark[], query?: string) => {
  const parsedBookmarksTree: Bookmark[] = [];
  const parseBookmarkNodes = (nodes: Bookmark[]) => {
    nodes.forEach(node => {
      if (node.children) {
        const parsedBookmark = {
          ...node,
          children: node.children
            .filter(child => {
              const hasValidUrl = child.url !== "chrome://bookmarks/";
              const isInQuery = query
                ? child.title.toLowerCase().includes(query.toLowerCase())
                : true;
              const isEmptyFolder =
                child.children && child.children.length === 0;
              return isInQuery && !isEmptyFolder && hasValidUrl;
            })
            .map(child => {
              return omit(child, "children");
            })
        };
        if (!!parsedBookmark.title) {
          parsedBookmarksTree.push(parsedBookmark);
        }
        parseBookmarkNodes(node.children);
      }
    });
  };
  parseBookmarkNodes(bookmarkTree);
  return parsedBookmarksTree;
};
