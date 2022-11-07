import { MigrationInterface, QueryRunner } from "typeorm";

export class origin1667848728810 implements MigrationInterface {
    name = 'origin1667848728810'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`isAvailable\` tinyint NOT NULL DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`isAvailable\``);
    }

}
