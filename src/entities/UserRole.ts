import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Role } from "./Role";

@Entity("UserRole")
export class UserRole {

    @PrimaryGeneratedColumn()
    userRoleId: number;

    @Column()
    userId: number;

    @Column()
    roleId: number;

    @JoinColumn({name: "userId"})
    @ManyToOne(() => User, (user) => user.userRoles)
    user: User;

    @JoinColumn({name: "roleId"})
    @ManyToOne(() => Role, (role) => role.userRoles)
    role: Role;    

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;
}