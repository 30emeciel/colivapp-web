'use client';

import {List} from "antd";
import React from "react";
import {WithId} from "mongodb";

export default function Listing({collection}:{collection:WithId<Restaurant>[]}) {


    return <List
        itemLayout="horizontal"
        dataSource={collection}
        renderItem={(item, index) => (
            <List.Item>
                <List.Item.Meta
                    title={item.name}
                    description={"id=" + item._id + " cuisine=" + item.cuisine}
                />
            </List.Item>
        )}
    />
}