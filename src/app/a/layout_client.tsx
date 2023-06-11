'use client';
import {
    Button,
    Col,
    ConfigProvider,
    DatePicker, Divider,
    Form,
    Input,
    Layout,
    Menu,
    MenuProps,
    Modal,
    Radio,
    Row,
    Space, Steps
} from 'antd';
import React, {useState} from "react";
import {CalendarOutlined, EditTwoTone, FormOutlined, UnorderedListOutlined} from "@ant-design/icons";
import {usePathname, useRouter} from "next/navigation";
import TextArea from "antd/es/input/TextArea";
import dayjs, {Dayjs} from "dayjs";
import {CollectionCreateForm} from "../../components/new/client";

const { Header, Content, Footer } = Layout;




export default function LayoutClient({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    const pathname = usePathname();
    const router = useRouter();
    const selected_key = (pathname ? new Map([
        ['/a/(calendar)', 'calendar'],
        ['/a/reservations', 'reservations'],
    ]).get(pathname) : 'calendar') ?? "calendar"

    const [openNewReservationFormModal, setOpenNewReservationFormModal] = useState(false);

    const onCreate = () => {

        setOpenNewReservationFormModal(false);
    };

    const onMenuSelect: MenuProps['onClick'] = (e) => {
        //console.log('click ', e);
        switch (e.key) {
            case 'calendar': {
                router.push('/a/(calendar)')
                break
            }
            case 'reservations': {
                router.push('/a/reservations')
                break
            }

        }

    }    ;

    function onNewReservationButtonClick() {
        setOpenNewReservationFormModal(true)
    }


    return (
        <ConfigProvider
            theme={{ token: {  borderRadius: 6,
                    colorPrimary: '#b217ff' } }}
        >
        <Layout>
            <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
                <div
                    style={{
                        float: 'left',
                        width: 120,
                        height: 31,
                        margin: '16px 24px 16px 0',
                        background: 'rgba(255, 255, 255, 0.2)',
                    }}
                />
                <Row wrap={false}>
                    <Col flex="auto">
                 <Menu
                     onClick={onMenuSelect}
                     theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[selected_key]}
                    items={[
                        {
                            key: "calendar",
                            label: "Calendrier",
                            icon: <CalendarOutlined />,
                        },
                        {
                            key: "reservations",
                            label: "Mes réservations",
                            icon: <UnorderedListOutlined />,
                        }]}
                />
                    </Col>
                    <Col>
                        <Button type="primary" onClick={onNewReservationButtonClick}><FormOutlined /> Nouvelle réservation</Button>
                    </Col>
                </Row>
            </Header>
            <Content className="site-layout" style={{ padding: '0 50px' }}>

                {children}
            </Content>
            <CollectionCreateForm
                open={openNewReservationFormModal}
                onCreate={onCreate}
                onCancel={() => {
                    setOpenNewReservationFormModal(false);
                }}
            />
            <Footer style={{ textAlign: 'center' }}>Coliv'App ©2023</Footer>
        </Layout>
        </ConfigProvider>
    )
}

// //<Breadcrumb style={{ margin: '16px 0' }} items={[{title: "Maison"}, {title: "Coucou"}]} />
