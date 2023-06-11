'use client';
import {Content, Footer, Header} from "antd/es/layout/layout";
import {Breadcrumb, Button, Col, Dropdown, Layout, Menu, MenuProps, Row, Skeleton, Space, Spin, Steps} from "antd";
import {
    ContactsTwoTone,
    DownOutlined, HomeOutlined,
    LoadingOutlined,
    SmileOutlined,
    SolutionOutlined,
    UserOutlined
} from "@ant-design/icons";
import {useUser} from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import {redirect} from "next/navigation";


export default function Client() {
    const { user, error, isLoading } = useUser();
    const items: MenuProps['items'] = [
        {
            label: 'Log out',
            key: '1',
            danger: true,
            icon: <UserOutlined />,
        }
    ]
    const onClick: MenuProps['onClick'] = ({ key }) => {
        redirect("/api/auth/logout")
    };

    return <>
        <Layout className="layout">
            <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
                <div className="demo-logo" />
                <Row wrap={false}>
                    <Col flex="auto"></Col>
                    <Col>
                        {
                            isLoading ? <Spin />
                            :
                            user && <Space wrap={false}>
                        <Dropdown.Button type="primary" icon={<DownOutlined />} menu={{items, onClick }}><Link href="/a/"><HomeOutlined /> Entrer</Link></Dropdown.Button>
                    </Space>}</Col>
                </Row>
            </Header>
            <Content style={{ padding: '20px 50px' }}>

                {isLoading ? <Skeleton loading={true}/> :
                    !user &&
                    <Steps
                        items={[
                            {
                                title: 'Créer un compte',
                                status: 'finish',
                                icon: <UserOutlined />,
                            },
                            {
                                title: 'Qui es-tu ?',
                                status: 'finish',
                                icon: <UserOutlined />,
                            },
                            {
                                title: 'Vérification',
                                description: "Attends que ton compte soit validé",
                                status: 'process',
                                icon: <SolutionOutlined />,
                            },
                            {
                                title: 'Enjoy!',
                                status: 'wait',
                                icon: <SmileOutlined />,
                            },
                        ]}
                    />                }
            </Content>
            <Footer style={{ textAlign: 'center' }}>Coliv'App ©2023</Footer>
        </Layout>
    </>
}
