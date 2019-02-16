import axios from 'axios'
import { ADD_TO_CART } from '../Constants/ActionTypes'

export const addToCart = ( bookChoice ) => {
    return {
        type: ADD_TO_CART, 
        payload: {
            book: bookChoice
        }
    }
}