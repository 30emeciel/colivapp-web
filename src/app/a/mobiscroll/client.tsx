'use client';
import {Badge, Button, DatePicker, Modal, Select, Space, Tag, Typography} from 'antd';

import {
    Eventcalendar,
    formatDate,
    localeFr,
    MbscCalendarEvent,
    MbscEventcalendarView,
    MbscResource
} from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import {WithId} from "mongodb";
import {Reservation, User} from "types";
import React, {useEffect, useMemo, useState} from "react";
import {MbscCalendarDayData} from "@mobiscroll/react/dist/src/core/shared/calendar-view/calendar-day";

import {
    MbscEventClickEvent,
    MbscEventCreatedEvent
} from "@mobiscroll/react/dist/src/core/components/eventcalendar/eventcalendar.types.public";
import dayjs from "dayjs";
import '../../polyfills'
import {
    CheckCircleTwoTone,
    CheckOutlined,
    CloseOutlined,
    DeleteOutlined,
    LeftOutlined,
    RollbackOutlined
} from "@ant-design/icons";


const { RangePicker } = DatePicker;

const colors = [
    'green',
    'pink',
    'blue',
    'yellow',
    'orange',
    'cyan',
    'red',
    'purple',
    'magenta',
    'volcano',
    'gold',
    'lime',
];

const mapUserToColor = new Map<string, string>
function getUserColor(user_id: string) {
    let c = mapUserToColor.get(user_id)
    if (!c) {
        c = colors.pop()
        if (!c)
            c = "black"
        mapUserToColor.set(user_id, c)
    }
    return c
}

export default function Client(
    {users, reservations, createReservation, deleteReservation}:
        {users: WithId<User>[], reservations: WithId<Reservation>[], createReservation:(args: Reservation) => Promise<void>, deleteReservation:(args: string) => Promise<void>}) {

    const usersById = users.groupByToMapUnique((it) => it._id)
    const view = useMemo<MbscEventcalendarView>(() => {
        return {
            calendar: {
                type: 'month',
                labels: "all",
                eventList: true
            },

        };
    }, []);

    const [events, setEvents] = useState<MbscCalendarEvent[]>([])
    useEffect(() => {

        let events = reservations.map((resa):MbscCalendarEvent  => {
            const u = usersById.get(resa.user_id)!
            return {
                _id: resa._id,
                title: u.display_name,
                color: getUserColor(u._id),
                start: resa.start_date,
                end: resa.end_date,
                allDay: true,
                created_by: resa.created_by,
                user_id: resa.user_id,
        }
        })
        setEvents(events)

    }, [reservations])

    const renderCustomDay = (args: MbscCalendarDayData) => {
        const nb_pax = args.events?.length ?? 0;

        return <>{nb_pax > 0 && <Tag color="green">{nb_pax}/12</Tag>}</>
    }

    const [currentReservation, setCurrentReservation] = useState<Reservation>()
    const [openEditEventDialog, setOpenEditEventDialog] = useState(false);
    const [confirmLoadingEditEventDialog, setConfirmLoadingEditEventDialog] = useState(false);
    const [allowDelete, setAllowDelete] = useState(false)
    const [deletingLoading, setDeletingLoading] = useState(false)

    const handleOk = async () => {
        if (!currentReservation)
            return
        setConfirmLoadingEditEventDialog(true);
        await createReservation(currentReservation)
        setOpenEditEventDialog(false);
        setConfirmLoadingEditEventDialog(false);
    };
    const handleDelete = async () => {
        if (!currentReservation || !currentReservation._id)
            return
        setDeletingLoading(true);
        await deleteReservation(currentReservation._id)
        setOpenEditEventDialog(false);
        setDeletingLoading(false);
    };
    const handleCancel = () => {
        setOpenEditEventDialog(false);
    };

    function onEventCreate(args:MbscEventCreatedEvent) {
        const event = args.event
        setCurrentReservation({
            start_date: event.start as Date,
            end_date: event.end as Date,
            created_by: "",
            user_id: ""
        })
        setAllowDelete(false)
        setOpenEditEventDialog(true)
        return true

    }

    function onEventClick(args: MbscEventClickEvent) {
        const event = args.event
        setCurrentReservation({
            _id: event._id,
            start_date: event.start as Date,
            end_date: event.end as Date,
            created_by: event.created_by,
            user_id: event.user_id
        })
        setAllowDelete(true)
        setOpenEditEventDialog(true)
    }


    return <>

        <Eventcalendar
            theme="material"
            themeVariant="light"
            locale={localeFr}
            view={view}
            data={events}
            clickToCreate="double"
            dragToMove={true}
            dragToResize={true}
            dragToCreate={true}
            height="auto"
            renderDayContent={renderCustomDay}
            onEventCreate={onEventCreate}
            onEventClick={onEventClick}
        />


        <Modal
            title="Modifier une réservation"
            open={openEditEventDialog}
            onOk={handleOk}
            confirmLoading={confirmLoadingEditEventDialog}
            onCancel={handleCancel}
            footer={[
                allowDelete && <Button danger

                        icon={<DeleteOutlined />}
                        key="delete"
                        loading={deletingLoading}
                        onClick={handleDelete}>
                        Delete
                </Button>,
                <Button disabled={deletingLoading} key="back" onClick={handleCancel} icon={<CloseOutlined />}>
                    Cancel
                </Button>,
                <Button disabled={deletingLoading} key="submit" type="primary" loading={confirmLoadingEditEventDialog} onClick={handleOk} icon={<CheckCircleTwoTone  />}>
                    OK
                </Button>,
            ]}
        >
            <Space direction="vertical" size={12}>
                <div>{currentReservation?.start_date?.toString()} - {currentReservation?.end_date?.toString()}</div>
                <Select
                    showSearch
                    placeholder="Sélectionne un·e pax"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    value={currentReservation?.user_id}
                    onChange={(it: string) => {
                        if (!currentReservation)
                            return
                        currentReservation.user_id = it
                        setCurrentReservation(currentReservation)
                    }}
                    options={users.map((it) => ({
                        label: it.display_name,
                        value: it._id
                    }))}
                />
            </Space>
        </Modal>
    </>;
}
