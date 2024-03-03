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
    save: jest.fn(),
    find: jest.fn(),
    findAndCount: jest.fn(),
    findOne: jest.fn(),
    findOneOrFail: jest.fn(),
};

export const DataSourceMock = {
    createQueryRunner: jest.fn(),
};
