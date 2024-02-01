import React from 'react';
import { Table } from 'antd';
import {useCrypto} from "../hooks/hooks.js";

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
        sortDirections: ['descend'],
    },
    {
        title: 'Price',
        dataIndex: 'price',
        sorter: (a, b) => a.price - b.price,
        defaultSortOrder: 'descend',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        sorter: (a, b) => a.price - b.price,
        defaultSortOrder: 'descend',}


];

export const AssetsTable = () => {
    const {assets}=useCrypto()
    const data = assets.map(el=>({
        key: el.id,
        name: el.name,
        amount:el.amount,
        price: el.price
    }))
    return (
        <div style={{marginTop:'15px',marginRight:'10px'}}>
            <Table columns={columns} dataSource={data}  />
        </div>

    );
};

