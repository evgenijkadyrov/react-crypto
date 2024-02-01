import React from 'react';
import {Divider, Tag, Typography} from "antd";
import {CoinInfo} from "./CoinInfo.jsx";

export const CoinInfoModal = ({coin}) => {
    return (
        <>
            <CoinInfo coin={coin} withSymbol/>
            <Divider/>
            <Typography.Paragraph>
                <Typography.Text strong>Price change:</Typography.Text>

            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong style={{marginRight: '10px'}}>
                    1hour
                </Typography.Text>
                <Tag
                    color={coin.priceChange1h > 0 ? 'green' : 'red'}>{coin.priceChange1h}%</Tag>
                <Typography.Text strong style={{marginRight: '10px'}}>
                    1day
                </Typography.Text>
                <Tag
                    color={coin.priceChange1d > 0 ? 'green' : 'red'}>{coin.priceChange1d}%</Tag>
                <Typography.Text strong style={{marginRight: '10px'}}>
                    1week
                </Typography.Text>
                <Tag
                    color={coin.priceChange1w > 0 ? 'green' : 'red'}>{coin.priceChange1w}%</Tag>
            </Typography.Paragraph>
            <Divider/>
            <Typography.Paragraph>
                <Typography.Text strong
                                 style={{marginRight: '10px'}}>Price</Typography.Text>
                <Typography.Text>{coin.price.toFixed(2)}$</Typography.Text>
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong style={{marginRight: '10px'}}>Market
                    Cap</Typography.Text>
                <Typography.Text>{coin.marketCap.toFixed(2)}$</Typography.Text>
            </Typography.Paragraph>
            {coin.contractAddress && <Typography.Paragraph>
                <Typography.Text strong style={{marginRight: '10px'}}>Contract
                    address</Typography.Text>
                <Typography.Text>{coin.contractAddress}$</Typography.Text>
            </Typography.Paragraph>}
        </>
    );
};

