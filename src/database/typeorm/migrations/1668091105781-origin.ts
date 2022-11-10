import { MigrationInterface, QueryRunner } from "typeorm";

export class origin1668091105781 implements MigrationInterface {
    name = 'origin1668091105781'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` ADD \`image\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` ADD \`imageId\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`imageId\``);
        await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`image\``);
    }

}
