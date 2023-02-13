import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { ValidationArguments } from 'class-validator/types/validation/ValidationArguments';
import { DataSource, EntityTarget } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
@ValidatorConstraint({ name: 'IsNotExist', async: true })
export class IsNotExist implements ValidatorConstraintInterface {
    constructor(
        @InjectDataSource()
        private readonly dataSource: DataSource,
    ) {}

    /**
     * It checks if the value of the property being validated is unique in the database
     * @param {string} value - the value of the field being validated
     * @param {ValidationArguments} validationArguments - ValidationArguments
     * @returns A boolean value.
     */
    async validate(value: string, validationArguments: ValidationArguments) {
        const entity = validationArguments.constraints[0] as EntityTarget<any>;
        if (!value || !entity) {
            return false;
        }
        const repo = await this.dataSource.getRepository(entity);
        if (!repo) {
            return false;
        }
        const rs = await repo.findOne({
            where: {
                [validationArguments.property]: value,
            },
        });

        return !Boolean(rs);
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return `${validationArguments.value} is taken, please try another`;
    }
}
