import React from 'react';
import {Layout, Spin} from "antd";
import {LayoutHeader} from "./Layout.Header.jsx";
import {LayoutSider} from "./Layout.Sider.jsx";
import {LayoutContent} from "./Layout.Content.jsx";
import {useCrypto} from "../../hooks/hooks.js";

const AppLayout = () => {
    const {loading} = useCrypto()
    if (loading) {
        return <Spin fullscreen/>
    }
    return (
        <Layout>
            <LayoutHeader/>
            <Layout>
                <LayoutSider/>
                <LayoutContent/>
            </Layout>

        </Layout>
    );
};

export default AppLayout;