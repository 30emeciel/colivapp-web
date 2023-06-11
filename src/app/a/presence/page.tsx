'use client';
// pages/_app.js
import React from 'react';
import {Avatar, Button, List, Typography} from 'antd';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';

const { Title } = Typography;

const data = [
    {
        title: 'Solenne',
    },
    {
        title: 'Zohra',
    },
    {
        title: 'Alyosha',
    },
    {
        title: 'Someone',
    },
];





export default function App() {



    return <>
        <Title>Presence</Title>

        <List
            itemLayout="vertical"
            dataSource={data}
            renderItem={(item, index) => (
                <List.Item actions={[<Button>Ejecter</Button>, <Button>Check-out</Button>]}>
                    <List.Item.Meta
                        avatar={<Avatar src={`https://joesch.moe/api/v1/random?key=${index}`}/>}
                        title={<a href="https://ant.design">{item.title}</a>}
                    />
                </List.Item>
            )}
        />


    </>;
}