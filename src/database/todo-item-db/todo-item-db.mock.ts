export const qrMock = {
    startTransaction: () => jest.fn(),
    commitTransaction: () => jest.fn(),
    rollbackTransaction: () => jest.fn(),
    release: () => jest.fn(),
    manager: {
        findOneOrFail: jest.fn(),
        update: jest.fn(),
    },
};

export const TodoItemRepositoryMock = {
    find: jest.fn(),
    findOne: jest.fn(),
    findOneOrFail: jest.fn(),
};

export const DataSourceMock = {
    createQueryRunner: jest.fn(),
};
