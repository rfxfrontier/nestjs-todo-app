import { ApiProperty } from '@nestjs/swagger';

export class OperationCompleteRespDto {
    @ApiProperty({
        example: true,
        description: 'Boolean indicates operation is success',
    })
    isSuccess: boolean;
}
