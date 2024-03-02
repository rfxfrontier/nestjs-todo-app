import { UserRole } from 'src/user/dto/user.enum';
import { StatusEnum } from '../todo.enum';
import { NormalUpdateValidator } from './normal-update-validator';

export class AdminUpdateValidator extends NormalUpdateValidator {
    protected userRole = UserRole.ADMIN;

    protected getStatusTransitionMatrix(): Record<StatusEnum, StatusEnum[]> {
        return {
            [StatusEnum.NOT_STARTED]: [
                StatusEnum.NOT_STARTED,
                StatusEnum.IN_PROGRESS,
            ],
            [StatusEnum.IN_PROGRESS]: [
                StatusEnum.IN_PROGRESS,
                StatusEnum.COMPLETED,
                StatusEnum.BLOCKED,
            ],
            [StatusEnum.COMPLETED]: [
                StatusEnum.IN_PROGRESS,
                StatusEnum.COMPLETED,
            ],
            [StatusEnum.BLOCKED]: [StatusEnum.IN_PROGRESS, StatusEnum.BLOCKED],
        };
    }
}
