import {
  VIEW_CART_REQUEST,
  VIEW_CART_SUCCESS,
  VIEW_CART_FAIL,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_FAIL,
  DELETE_FROM_CART_REQUEST,
  DELETE_FROM_CART_SUCCESS,
  DELETE_FROM_CART_FAIL,
  UPDATE_CART_REQUEST,
  UPDATE_CART_SUCCESS,
  UPDATE_CART_FAIL,
} from "../constants/cartConstants";

const viewCartInitialState = {
  cart: null,
  loading: true,
  error: null,
};

const addToCartInitialState = {
  cart: null,
  loading: false,
  error: null,
};

const deleteFromCartInitialState = {
  cart: null,
  loading: false,
  error: null,
};

const updateCartInitialState = {
  cart: null,
  loading: false,
  error: null,
};

export const getCartReducer = (state = viewCartInitialState, action) => {
  switch (action.type) {
    case VIEW_CART_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case VIEW_CART_SUCCESS:
      return {
        ...state,
        cart: action.payload,
        loading: false,
        error: null,
      };
    case VIEW_CART_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const addToCartReducer = (state = addToCartInitialState, action) => {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        cart: action.payload,
        loading: false,
        error: null,
      };
    case ADD_TO_CART_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const deleteFromCartReducer = (
  state = deleteFromCartInitialState,
  action
) => {
  switch (action.type) {
    case DELETE_FROM_CART_REQUEST:
      console.log("reqqqqqqqqqqq");
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_FROM_CART_SUCCESS:
      return {
        ...state,
        cart: action.payload,
        loading: false,
        error: null,
      };
    case DELETE_FROM_CART_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const updateCartReducer = (state = updateCartInitialState, action) => {
  switch (action.type) {
    case UPDATE_CART_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_CART_SUCCESS:
      return {
        ...state,
        cart: action.payload,
        loading: false,
        error: null,
      };
    case UPDATE_CART_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
