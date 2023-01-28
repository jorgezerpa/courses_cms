import { MigrationInterface, QueryRunner } from "typeorm";

export class origin1674906081654 implements MigrationInterface {
    name = 'origin1674906081654'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`section\` DROP COLUMN \`type\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`section\` ADD \`type\` varchar(255) NOT NULL`);
    }

}
