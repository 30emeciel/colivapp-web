'use client'
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Eventcalendar, getJson, localeFr, formatDate } from '@mobiscroll/react';
import {useEffect, useMemo, useState} from "react";
import {
    MbscEventcalendarView
} from "@mobiscroll/react/dist/src/core/components/eventcalendar/eventcalendar.types.public";

export default function App() {

    const [myEvents, setEvents] = useState([]);

    const view:MbscEventcalendarView = useMemo(() => {
        return {
            timeline: {
                type: 'month',
                size: 1,
                resolutionHorizontal: 'day',
                eventList: true,
            }
        };
    }, []);

    const renderCustomDay = (args: any) => {
        const date = args.date;
        let eventOccurrence = 'none';

        if (args.events) {
            var eventNr = args.events.length;
            if (eventNr === 0) {
                eventOccurrence = 'none';
            } else if (eventNr === 1) {
                eventOccurrence = 'one';
            } else if (eventNr < 4) {
                eventOccurrence = 'few';
            } else {
                eventOccurrence = 'more';
            }
        }

        return <div className={'md-date-header md-date-header-events-' + eventOccurrence}>
            <div className="md-date-header-day-name">{formatDate('DDD', date)}</div>
            <div className="md-date-header-day-nr">{formatDate('DD', date)}</div>
        </div>;
    }

    useEffect(() => {
        getJson('https://trial.mobiscroll.com/daily-weekly-events/', (events) => {
            setEvents(events);
        }, 'jsonp');
    }, []);

    return (
        <Eventcalendar
            theme="material"
            themeVariant="light"
            locale={localeFr}
            view={view}
            data={myEvents}
            renderDay={renderCustomDay}
        />
    );
}
