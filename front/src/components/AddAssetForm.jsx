import React, {useRef, useState} from 'react';
import {
    Button,
    DatePicker,
    Divider,
    Form,
    InputNumber,
    Result,
    Select,
    Space
} from "antd";
import {useCrypto} from "../hooks/hooks.js";
import {CoinInfo} from "./CoinInfo.jsx";


const validateMessages = {
    required: '${label} is required!',
    types: {
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be more ${min}',
    },
};

export const AddAssetForm = ({onCloseResult}) => {
    const [form] = Form.useForm()
    const {crypto, addAsset} = useCrypto()
    const [coin, setCoin] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const ref=useRef()
    if (submitted) {
        return (
            <Result
                status="success"
                title="Successfully Added Coin!"
                subTitle={`You added ${ref.current.amount} coin ${coin.name} by price ${ref.current.price}$`}
                extra={[
                    <Button type="primary" key="back" onClick={onCloseResult}>
                        Go Back
                    </Button>,

                ]}
            />
        )
    }
    if (!coin) {
        return (
            <Select

                style={{
                    width: '100%',
                }}
                placeholder='Select coin'
                onSelect={(value) => setCoin(crypto.find(el => {
                    return el.id === value
                }))}

                options={crypto.map(coin => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon
                }))}
                optionRender={(option) => (
                    <Space>
                        <img src={option.data.icon} alt={option.data.label} width={'15px'}
                             height={'15px'}/>
                        {option.value}
                    </Space>
                )}
            />
        )
    }
    const onFinish = (values) => {
        const newAsset= {
            id: coin.id,
            amount: values.amount,
            price: values.price,
            date: values.date,
        }
        ref.current= newAsset
        addAsset(newAsset)
        setSubmitted(true)
    }

    function handleChangeAmount(value) {
        const price = form.getFieldValue('price')
        form.setFieldsValue({
            totalPrice: +(value * price).toFixed(2)
        })
    }

    function handleChangePrice(value) {
        const amount = form.getFieldValue('amount')

        form.setFieldsValue({
            totalPrice: +(amount * value).toFixed(2)
        })
    }

    return <Form form={form}
                 name="basic"
                 labelCol={{span: 4,}}
                 wrapperCol={{span: 10,}}
                 initialValues={{price: coin.price.toFixed(2)}}
                 onFinish={onFinish}
                 validateMessages={validateMessages}
                 style={{
                     maxWidth: 600,
                 }}
    >
        <CoinInfo coin={coin} withSymbol={false}/>
        <Divider/>
        <Form.Item
            label="Amount"
            name="amount"
            rules={[
                {
                    required: true,
                    type: "number",
                    min: 0.00001,
                },
            ]}

        >
            <InputNumber placeholder={'Enter coin amount'} style={{width: '100%'}}
                         onChange={handleChangeAmount}/>
        </Form.Item>

        <Form.Item
            label="Price"
            name="price"
        >
            <InputNumber onChange={handleChangePrice} style={{width: '100%'}}/>
        </Form.Item>
        <Form.Item
            label="Total price"
            name="totalPrice"

        >
            <InputNumber disabled style={{width: '100%'}}/>
        </Form.Item>
        <Form.Item
            label="Date&time"
            name="date"

        >
            <DatePicker showTime style={{width: '100%'}}/>
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>
    </Form>
};

