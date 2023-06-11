'use client';

import {withPageAuthRequired} from '@auth0/nextjs-auth0/client';
import {Form, Input} from "antd";

export default withPageAuthRequired(function Page({user}) {
    return (<>
            <h1>Invitation</h1>
            <p>
                Tu as besoin d'un code d'invitation pour accéder à ce site.
            </p>
        <Form
            //labelCol={{ span: 4 }}
            //wrapperCol={{ span: 14 }}
            layout="vertical"
            style={{ maxWidth: 600 }}
            size="large"
        >
            <Form.Item label="Code invitation">
                <Input />
            </Form.Item>
            <Form.Item label="Comment souhaites-tu être nommé ?">
                <Input />
            </Form.Item>
        </Form>
        </>
    )
})
