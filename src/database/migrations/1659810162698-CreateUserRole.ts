import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUserRole1659810162698 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: "UserRole",
                columns: [
                    {
                        name: "userRoleId",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },                  
                    {
                        name: "userId",
                        type: "integer"
                    },                    
                    {
                        name: "roleId",
                        type: "integer"
                    },                    
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updatedAt",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKUserUserRole",
                        referencedTableName: "user",
                        referencedColumnNames: ["userId"],
                        columnNames: ["userId"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                    {
                        name: "FKRoleUserRole",
                        referencedTableName: "role",
                        referencedColumnNames: ["roleId"],
                        columnNames: ["roleId"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable("UserRole");
    }

}
