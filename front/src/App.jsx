import {CryptoContextProvider} from "./contex/crypto-contex.jsx";
import AppLayout from "./components/layout/App.Layout.jsx";


export default function App() {
    return (
        <CryptoContextProvider>
                        <AppLayout/>
        </CryptoContextProvider>
    )
}
