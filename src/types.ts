import {ObjectId} from "mongodb";


export interface ScheduleEvent {
    Id: string,
    Subject: string;
    StartTime: Date;
    EndTime: Date;
    IsAllDay: boolean
    user_id: string
}

export interface User {
    _id?: string,
    display_name: string
    status: UserStatus,
}

export enum UserStatus {
    CREATED = "CREATED",
    VALIDATED = "VALIDATED",
}

export interface Reservation {
    _id?: string,
    user_id: string;
    start_date: Date;
    end_date: Date
    created_by: string
    status: ReservationStatus
}

export enum ReservationStatus {
    Created = "CREATED",
    Confirmed = "CONFIRMED"
}
