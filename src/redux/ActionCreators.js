import * as ActionTypes from "./ActionType";
// import moi thu(*) duoc export trong action types duoi dang action types(as ActionTypes)
export const addComment = (dishId, rating, author, comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: {
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment,
  },
});
