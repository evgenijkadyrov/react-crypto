import {Card, Layout, List, Statistic, Tag, Typography} from "antd";
import {ArrowDownOutlined, ArrowUpOutlined} from '@ant-design/icons';
import {formatName} from "../../utils.js";
import {useCrypto} from "../../hooks/hooks.js";

const siderStyle = {
    padding: '1rem',

};


export function LayoutSider() {
    const {assets} = useCrypto()

    return <Layout.Sider width="25%" style={siderStyle}>
        {assets.map(asset => (
            <Card size="small" style={{marginBottom: '1rem'}} key={asset.id}>
                <Statistic
                    title={formatName(asset.id)}
                    value={asset.totalAmount + '$'}
                    precision={2}
                    valueStyle={asset.grow ? {color: '#3f8600'} : {color: '#b72323'}}
                    prefix={asset.grow ? <ArrowUpOutlined/> : <ArrowDownOutlined/>}
                />
                <List
                    size={'small'}
                    dataSource={[
                        {title: 'Total Profit', value: asset.totalProfit, symbol: '$'},
                        {
                            title: 'Asset Amount',
                            value: asset.amount.toFixed(4),
                            symbol: ''
                        },
                        {
                            title: 'Difference',
                            value: asset.growPercent,
                            symbol: '%',
                            tag: true
                        },
                    ]}
                    renderItem={(item) => (
                        <List.Item>
                            <span>{item.title}</span>
                            <span>
                                 {item.symbol && !item.tag && <Typography.Text
                                     type={asset.grow ? 'success' : 'danger'}>
                                     {item.value + item.symbol}
                                 </Typography.Text>}
                                {!item.symbol && <span>{item.value}</span>}
                                {item.symbol && item.tag &&
                                    <Tag color={asset.grow ? 'green' : 'red'}
                                         style={{margin: 0}}>{item.value + item.symbol}</Tag>}
                            </span>
                        </List.Item>
                    )}
                />
            </Card>
        ))}

    </Layout.Sider>
}