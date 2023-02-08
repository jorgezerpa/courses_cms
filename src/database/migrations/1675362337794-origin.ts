import { MigrationInterface, QueryRunner } from "typeorm";

export class origin1675362337794 implements MigrationInterface {
    name = 'origin1675362337794'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`resource\` (\`id\` int NOT NULL AUTO_INCREMENT, \`label\` varchar(255) NULL, \`key\` varchar(255) NOT NULL, \`tag\` varchar(255) NOT NULL, \`lessonId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`lesson\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`video\` varchar(255) NULL, \`description\` text NULL, \`sectionId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`section\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`courseId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(255) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`s3Identifier\` varchar(255) NOT NULL, \`s3VideosBucketName\` varchar(255) NULL, \`s3ResourcesBucketName\` varchar(255) NULL, \`s3UserBucketName\` varchar(255) NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`course\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`userId\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`resource\` ADD CONSTRAINT \`FK_b849e2c59fbbf2c19fef6c87a16\` FOREIGN KEY (\`lessonId\`) REFERENCES \`lesson\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lesson\` ADD CONSTRAINT \`FK_70eb01d08acf5be68e3a17451b0\` FOREIGN KEY (\`sectionId\`) REFERENCES \`section\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`section\` ADD CONSTRAINT \`FK_c61e35b7deed3caab17e821144a\` FOREIGN KEY (\`courseId\`) REFERENCES \`course\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`course\` ADD CONSTRAINT \`FK_bceb52bbd16679020822f6d6f5d\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`course\` DROP FOREIGN KEY \`FK_bceb52bbd16679020822f6d6f5d\``);
        await queryRunner.query(`ALTER TABLE \`section\` DROP FOREIGN KEY \`FK_c61e35b7deed3caab17e821144a\``);
        await queryRunner.query(`ALTER TABLE \`lesson\` DROP FOREIGN KEY \`FK_70eb01d08acf5be68e3a17451b0\``);
        await queryRunner.query(`ALTER TABLE \`resource\` DROP FOREIGN KEY \`FK_b849e2c59fbbf2c19fef6c87a16\``);
        await queryRunner.query(`DROP TABLE \`course\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`section\``);
        await queryRunner.query(`DROP TABLE \`lesson\``);
        await queryRunner.query(`DROP TABLE \`resource\``);
    }

}