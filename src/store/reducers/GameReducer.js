import { FIRST_LOGIN, FIFTH_LOGIN, TENTH_LOGIN, POINTS_100, POINTS_250, POINTS_500, POINTS_750, POINTS_1000, GET_LEADERBOARD, FIRST_RATE, FIFTH_RATE, FOOD_BADGE, SCHOOL_BADGE, GET_RANKING } from "../actions/types";

const INITIAL_STATE = {
    medal: '',
    leaderboard: [],
    rank: 0,
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case FIRST_LOGIN:
            return { ...state, medal: FIRST_LOGIN}
        case FIFTH_LOGIN:
            return { ...state, medal: FIFTH_LOGIN}
        case TENTH_LOGIN:
            return { ...state, medal: TENTH_LOGIN}
        case POINTS_100:
            return { ...state, medal: POINTS_100}
        case POINTS_250:
            return { ...state, medal: POINTS_250}
        case POINTS_500:
            return { ...state, medal: POINTS_500}
        case POINTS_750:
            return { ...state, medal: POINTS_750}
        case POINTS_1000:
            return { ...state, medal: POINTS_1000}
        case FIRST_RATE:
            return { ...state, medal: FIRST_RATE}
        case FIFTH_RATE:
            return { ...state, medal: FIFTH_RATE}
        case FOOD_BADGE:
            return { ...state, medal: FOOD_BADGE}
        case SCHOOL_BADGE:
            return { ...state, medal: SCHOOL_BADGE}
        case GET_LEADERBOARD: 
            return { ...state, leaderboard: action.payload}
        case GET_RANKING:
            return { ...state, rank: action.payload}
        default:
            return { ...state, medal: ''}
    }
}