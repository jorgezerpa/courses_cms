import { MigrationInterface, QueryRunner } from "typeorm";

export class origin1666291315767 implements MigrationInterface {
    name = 'origin1666291315767'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`imageId\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`imageId\``);
    }

}
