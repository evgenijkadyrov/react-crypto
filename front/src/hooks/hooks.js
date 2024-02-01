import {useContext} from "react";
import CryptoContext from "../contex/crypto-contex.jsx";

export const useCrypto=()=>{

    return useContext(CryptoContext)
}