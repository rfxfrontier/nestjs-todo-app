export enum StatusEnum {
    NOT_STARTED = 0,
    IN_PROGRESS = 1,
    COMPLETED = 2,
    BLOCKED = 9,
}

export enum PriorityEnum {
    HIGH = 10,
    MEDIUM = 20,
    LOW = 30,
}

export enum SearchSortBy {
    DUE_DATE = 'DUE_DATE',
    DUE_DATE_DESC = 'DUE_DATE_DESC',
    CREATION_TIME = 'CREATION_TIME',
    CREATION_TIME_DESC = 'CREATION_TIME_DESC',
    LAST_UPDATED_TIME = 'LAST_UPDATED_TIME',
    LAST_UPDATED_TIME_DESC = 'LAST_UPDATED_TIME_DESC',
}
