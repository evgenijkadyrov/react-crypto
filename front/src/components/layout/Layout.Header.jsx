import {Button, Layout, Modal, Select, Space, Typography} from "antd";
import {useCrypto} from "../../hooks/hooks.js";
import {useEffect, useState} from "react";
import {Drawer} from "antd/lib";
import {CoinInfoModal} from "../CoinInfoModal.jsx";
import {AddAssetForm} from "../AddAssetForm.jsx";

const headerStyle = {
    textAlign: 'center',
    width: '100%',
    color: '#fff',
    height: 64,
    paddingInline: '1rem',
    lineHeight: '64px',
    backgroundColor: '#4096ff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
};


export function LayoutHeader() {
    const [select, setSelect] = useState(false)
    const [modal, setModal] = useState(false)
    const [drawer, setDrawer] = useState(false)
    const [coin, setCoin] = useState({})
    const {crypto} = useCrypto()

    const handleSelect = (value) => {
        setCoin(crypto.find(coin => coin.id === value))
        setModal(true)


    };
    useEffect(() => {
        function keypress(e) {
            if (e.key === '/') {
                setSelect((prev) => !prev)
            }
        }

        document.addEventListener('keypress', keypress)
        return () => document.removeEventListener('keypress', keypress)
    }, [])
    return <Layout.Header style={headerStyle}>
        <Select
            open={select}
            style={{
                width: 250,
            }}
            value='open/close'
            onSelect={handleSelect}
            onClick={() => setSelect((prev => !prev))}
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
        <Button type={'primary'} onClick={()=>setDrawer(true)}>Add Asset</Button>
        <Modal open={modal} onCancel={() => setModal(false)}
               footer={false}>
           <CoinInfoModal coin={coin}/>

        </Modal>
        <Drawer title="Add Asset" onClose={()=>setDrawer(false)} open={drawer} width={600} destroyOnClose >

          <AddAssetForm onCloseResult={()=>setDrawer(false)} />
        </Drawer>
    </Layout.Header>
}