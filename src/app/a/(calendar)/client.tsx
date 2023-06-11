'use client';
import React, {useEffect, useState} from 'react';
import {useUser} from '@auth0/nextjs-auth0/client';

import {
    TimelineViews, TimelineMonth, ScheduleComponent, ViewsDirective, ViewDirective,
    Inject, EventSettingsModel, Resize, DragAndDrop, Month, EventRenderedArgs, PopupOpenEventArgs
} from '@syncfusion/ej2-react-schedule';
import {ActionEventArgs} from "@syncfusion/ej2-schedule/src/schedule/base/interface";
import {WithId} from "mongodb";
import {DatePicker, Space, Select } from "antd";
import dayjs from "dayjs";
import {Reservation, ScheduleEvent, User} from "types";

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

export default function Client({usersById, reservations}: {usersById: Map<string, WithId<User>>, reservations: WithId<Reservation>[]}) {

    const user = useUser()

    const [curStartDate, setCurStartData] = useState(dayjs())

    const [data, setData] = useState<ScheduleEvent[]>([])
    useEffect(() => {

        let events = reservations.map((resa) : ScheduleEvent => ({
            Id: resa._id,
            Subject: usersById.get(resa.user_id)!.display_name,
            StartTime: resa.start_date,
            EndTime: resa.end_date,
            IsAllDay: true,
            user_id: resa.user_id
        }))
        setData(events)

    }, [reservations])

    function onEventRendered(args: EventRenderedArgs): void {
        let user_id = args.data.user_id as string;
        if (!args.element || !user_id) {
            return;
        }
        args.element.style.backgroundColor = getUserColor(user_id);
    }


    async function onActionComplete(args: ActionEventArgs) {
        switch (args.requestType ) {
            case "eventCreated": {
                break
            }
        }
    }

    const eventSettings: EventSettingsModel = { dataSource: data};

    return <>
        <ScheduleComponent
            showQuickInfo={false}
            readonly={true}
            firstDayOfWeek={1} /* dateFormat='dd-MMM-yyyy' */  rowAutoHeight={true} eventSettings={eventSettings} height="800px" width='auto'
            eventRendered={onEventRendered}
            actionComplete={onActionComplete}
        >
            <ViewsDirective>
                <ViewDirective option='Month' /*numberOfWeeks={4}*//>
            </ViewsDirective>
            <Inject services={[Month]} />
        </ScheduleComponent>
    </>
}
