import { BaseEntity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { classToPlain, Exclude } from "class-transformer";

export default class Entity extends BaseEntity {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  toJSON() {
    return classToPlain(this);
  }
}
