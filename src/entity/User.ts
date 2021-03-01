import { Entity as TOEntity, Column, BeforeInsert } from "typeorm";
import bcrypt from "bcrypt";
import Entity from "./Entity";

@TOEntity({ name: "users" })
export class User extends Entity {
  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }

  @Column({ unique: true, nullable: false, length: 20 })
  username: string;

  @Column({ unique: true, nullable: false, length: 100 })
  email: string;

  @Column({ unique: true, nullable: false })
  password: string;

  @Column({ nullable: true })
  imageUrl: string;

  @BeforeInsert()
  async hashPassword() {
    console.log("before..");
    this.password = await bcrypt.hash(this.password, 6);
  }
}
