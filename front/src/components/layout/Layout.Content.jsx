import {Layout} from "antd";
import Typography from "antd/lib/typography/Typography.js";
import {useCrypto} from "../../hooks/hooks.js";
import {PortfolioChart} from "../PortfolioChart.jsx";
import {AssetsTable} from "../AssetsTable.jsx";
const contentStyle = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    color: '#fff',
    backgroundColor: '#001529',
};
export function LayoutContent(){
    const {assets,crypto}=useCrypto()

    const cryptoPriceMap= crypto.reduce((acc,c)=>{
        acc[c.id]=c.price
        return acc
    },{})




    const totalCosts=assets.map(asset=> (asset.amount*cryptoPriceMap[asset.id])).reduce((acc,el)=>(acc+=el),0 ).toFixed(2)


    return  <Layout.Content style={contentStyle}>
        <Typography.Title level={3} style={{color:'#fff', textAlign:'left', marginTop:'10px'}}>Total cost coins: {totalCosts} $</Typography.Title>
        <PortfolioChart/>
        <AssetsTable/>
    </Layout.Content>
}