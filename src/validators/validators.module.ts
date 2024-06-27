import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IsExist } from './is-exist.validator';
import { IsNotExist } from './is-not-exist.validator';
import { PasswordConfirmValidator } from './password-confirm.validator';
import { UniqueEmailValidator } from './unique-email.validator';
import { UserEntity } from '../entities';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [PasswordConfirmValidator, UniqueEmailValidator, IsExist, IsNotExist],
  exports: [PasswordConfirmValidator, UniqueEmailValidator, IsExist, IsNotExist],
})
export class ValidatorsModule {}
