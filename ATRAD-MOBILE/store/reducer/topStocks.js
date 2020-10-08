import {
  SET_GAINERS,
  SET_LOSERS,
  SET_TURN_OVER,
  SET_SHARE_VOLUME,
} from "../action/topStocks";

const initialState = {
  securities: [],
};

const topStocksReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GAINERS:
      return {
        securities: action.gainers,
      };
    case SET_LOSERS:
      return {
        securities: action.losers,
      };
    case SET_TURN_OVER:
      return {
        securities: action.turnOver,
      };
    case SET_SHARE_VOLUME:
      return {
        securities: action.shareVolume,
      };
  }
  return state;
};

export default topStocksReducer;
