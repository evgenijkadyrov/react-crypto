import {createContext, useEffect, useState} from "react";
import {fakeFetchCrypto, fetchAssets} from "../api.js";
import {percentDifference} from "../utils.js";

const CryptoContext= createContext({
    crypto:[],
    assets:[],
    loading:false
})
 export function CryptoContextProvider({children}){
    const [loading, setLoading] = useState(false)
    const [crypto, setCrypto] = useState([])
    const [assets, setAssets] = useState([])

    useEffect(() => {
        async function preload() {
            setLoading(true)
            const {result} = await fakeFetchCrypto()
            const assets = await fetchAssets()
            setCrypto(result)
            setAssets(assets.map(asset => {

                const coin = result.find((c) => asset.id === c.id)
                return {
                    grow: asset.price < coin.price,

                    growPercent: percentDifference(asset.price, coin.price),
                    totalAmount: (asset.amount * coin.price).toFixed(2),
                    totalProfit: (asset.amount * coin.price - asset.amount * asset.price).toFixed(2),
                    name: coin.name,
                    ...asset
                }
            }))
            setLoading(false)
        }

        preload()
    }, [])

     function addAsset(newAsset){
         const coin = crypto.find((c) => newAsset.id === c.id)
        const newAssetFormat={
            grow: newAsset.price < coin.price,

            growPercent: percentDifference(+newAsset.price, coin.price),
            totalAmount: (newAsset.amount * newAsset.price).toFixed(2),
            totalProfit: (newAsset.amount * coin.price-newAsset.amount * newAsset.price ).toFixed(2),
            name: coin.name,
            ...newAsset
        }
        setAssets((prev)=> [...prev, newAssetFormat])
     }
    return <CryptoContext.Provider value={{crypto, assets, loading,addAsset}}>{children}</CryptoContext.Provider>
}
export default CryptoContext