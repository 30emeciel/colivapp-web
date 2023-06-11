import dayjs, {Dayjs} from "dayjs";
import React, {useState} from "react";
import {DatePicker, Divider, Form, Modal, Space, Steps} from "antd";
import {EditTwoTone} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import {createOwnReservation} from "./actions";
import {ReservationStatus} from "types";

const { RangePicker } = DatePicker;

interface Values {
    dates: [Dayjs, Dayjs];
    note: string;
}
interface CollectionCreateFormProps {
    open: boolean;
    onCreate: () => void;
    onCancel: () => void;
}
export const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
                                                                       open,
                                                                       onCreate,
                                                                       onCancel,
                                                                   }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)

    const steps = [
        {
            'title': "Détails",
            'icon': <EditTwoTone />,
            'content':                 <Form
                form={form}
                layout="vertical"
                name="new_reservation"
                initialValues={{ dates: [dayjs(), dayjs().add(2, "days")] }}
            >


                <Form.Item
                    label="Tes dates :"
                    name="dates"
                    rules={[{type: 'array', required: true, message: 'Choisis tes dates!' }]}
                >
                    <RangePicker />
                </Form.Item>
                <Form.Item
                    label="Un mot ?"
                    name="note"
                >
                    <TextArea rows={2} />
                </Form.Item>
            </Form>
        },

    ]
    const items = steps.map((item) => ({ key: item.title, title: item.title }));
    return (
        <Modal
            open={open}
            title="Nouvelle réservation"
            okText="Réserver"
            cancelText="Annuler"
            onCancel={onCancel}
            confirmLoading={loading}
            onOk={async () => {
                form
                    .validateFields()
                    .then(async (values) => {
                        setLoading(true)
                        form.resetFields();
                        const rangeValue = values.dates;
                        const [start_date, end_date] = rangeValue

                        console.log('Received values of form: ', start_date.format('YYYY-MM-DD'), " ", end_date.format('YYYY-MM-DD'));
                        const adyen_session_date = await createOwnReservation({
                            start_date: start_date.toDate(),
                            end_date: end_date.toDate(),

                        })
                        onCreate()
                        setLoading(false)


                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Space direction="vertical">
                <Steps items={items} />
                <Divider />
                {steps[0].content}
            </Space>
        </Modal>
    );
};
