import React, { useReducer } from 'react';
import { CASE_GET_FAVOR } from "../helpers/cases"



export const favorContext = React.createContext();

const INIT_STATE = {
    favor: {},
    favorLength: 0,
}

const reducer = (state = INIT_STATE, action) => {
    switch (action.type) {
      case CASE_GET_FAVOR:
        return { ...state, favor: action.payload,
        favorLength: action.payload.products.length };
      default: return state;
    }
  };

  const FavorContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INIT_STATE);

    async function addProductToFavor(product) {
         let favor = await JSON.parse(localStorage.getItem("favor"));
        if (!favor) {
          favor = {
            products: [],
          };
        }
        let newProduct = {
          item: product,
        };
        let filteredFavor = favor.products.filter(
          (item) => item.item.id === product.id
        );
        if (filteredFavor.length > 0) {
          favor.products = favor.products.filter(
            (item) => item.item.id !== product.id
          );
        } else {
          favor.products.push(newProduct);
        }
        localStorage.setItem("favor", JSON.stringify(favor));
        getFavor()
    }

    async function getFavor() {
        let favor = await JSON.parse(localStorage.getItem("favor"));
        if (!favor) {
          favor = {
            products: [],
          };
        }
        dispatch({
          type: CASE_GET_FAVOR,
          payload: favor,
        });
    }

    async function deleteFromFavor(id) {
        let favor = await JSON.parse(localStorage.getItem("favor"));
        if (!favor) {
          favor = {
            products: [],
          };
        }
        favor.products = favor.products.filter((item) => item.item.id !== id);
        localStorage.setItem("favor", JSON.stringify(favor));
        getFavor();
      }

    async function checkItemInFavor(id) {
        let favor = await JSON.parse(localStorage.getItem("favor"));
        if (!favor) {
            favor = {
            products: [],
          };
        }
        let filteredFavor = favor.products.filter((item) => item.item.id === id);
        return filteredFavor.length > 0 ? true : false;
    }

    // function changeProductCount(count, id){
    //     if(count<=0){
    //       count=1
    //     }
    //     let cart =JSON.parse(localStorage.getItem('cart'))
    //     cart.products = cart.products.map((item)=>{
    //       if(item.item.id === id){
    //         item.count = count
    //         item.subPrice = calcSubPrice(item)
    //       }
    //       return item
    //     })
    //     cart.totalPrice = calcTotalPrice(cart.products)
    //     localStorage.setItem('cart', JSON.stringify(cart))
    //     getCart()
    // }

    return (
        <favorContext.Provider
          value={{
            favor: state.favor,
            favorLength: state.favorLength,
            addProductToFavor,
            getFavor,
            deleteFromFavor,
            checkItemInFavor,
          }}
        >
          {children}
        </favorContext.Provider>
    );
  }

  export default FavorContextProvider;