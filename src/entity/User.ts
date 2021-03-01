import { Entity as TOEntity, Column } from "typeorm";
import Entity from "./Entity";

@TOEntity({ name: "users" })
export class User extends Entity {
  //   constructor(user: Partial<User>) {
  //     super();
  //     Object.assign(this, user);
  //   }

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ unique: true, nullable: false })
  email: string;
}
