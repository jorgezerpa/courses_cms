import { MigrationInterface, QueryRunner } from "typeorm";

export class origin1674908283524 implements MigrationInterface {
    name = 'origin1674908283524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`resource\` (\`id\` int NOT NULL AUTO_INCREMENT, \`label\` varchar(255) NOT NULL, \`url\` varchar(255) NOT NULL, \`downloadUrl\` varchar(255) NULL, \`lessonId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`lesson\` DROP COLUMN \`resources\``);
        await queryRunner.query(`ALTER TABLE \`lesson\` CHANGE \`video\` \`video\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`lesson\` CHANGE \`description\` \`description\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`resource\` ADD CONSTRAINT \`FK_b849e2c59fbbf2c19fef6c87a16\` FOREIGN KEY (\`lessonId\`) REFERENCES \`lesson\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`resource\` DROP FOREIGN KEY \`FK_b849e2c59fbbf2c19fef6c87a16\``);
        await queryRunner.query(`ALTER TABLE \`lesson\` CHANGE \`description\` \`description\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`lesson\` CHANGE \`video\` \`video\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`lesson\` ADD \`resources\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP TABLE \`resource\``);
    }

}
