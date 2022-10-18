import { MigrationInterface, QueryRunner } from "typeorm";

export class origin1666121185553 implements MigrationInterface {
    name = 'origin1666121185553'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`image\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`image\``);
    }
}
