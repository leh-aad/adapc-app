import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PlaceReducer from './PlaceReducer';
import RatingReducer from './RatingReducer';
import GameReducer from './GameReducer';

export default combineReducers({
    auth: AuthReducer,
    place: PlaceReducer,
    rate: RatingReducer,
    game: GameReducer
});

