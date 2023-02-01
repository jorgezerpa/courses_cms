import { MigrationInterface, QueryRunner } from "typeorm";

export class origin1675187741845 implements MigrationInterface {
    name = 'origin1675187741845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`s3bucketName\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`resource\` DROP FOREIGN KEY \`FK_b849e2c59fbbf2c19fef6c87a16\``);
        await queryRunner.query(`ALTER TABLE \`resource\` CHANGE \`downloadUrl\` \`downloadUrl\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`resource\` CHANGE \`lessonId\` \`lessonId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`lesson\` DROP FOREIGN KEY \`FK_70eb01d08acf5be68e3a17451b0\``);
        await queryRunner.query(`ALTER TABLE \`lesson\` CHANGE \`video\` \`video\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`lesson\` CHANGE \`description\` \`description\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`lesson\` CHANGE \`sectionId\` \`sectionId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`section\` DROP FOREIGN KEY \`FK_c61e35b7deed3caab17e821144a\``);
        await queryRunner.query(`ALTER TABLE \`section\` CHANGE \`courseId\` \`courseId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`course\` DROP FOREIGN KEY \`FK_bceb52bbd16679020822f6d6f5d\``);
        await queryRunner.query(`ALTER TABLE \`course\` CHANGE \`userId\` \`userId\` varchar(255) NULL`);
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
        await queryRunner.query(`ALTER TABLE \`course\` CHANGE \`userId\` \`userId\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`course\` ADD CONSTRAINT \`FK_bceb52bbd16679020822f6d6f5d\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`section\` CHANGE \`courseId\` \`courseId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`section\` ADD CONSTRAINT \`FK_c61e35b7deed3caab17e821144a\` FOREIGN KEY (\`courseId\`) REFERENCES \`course\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lesson\` CHANGE \`sectionId\` \`sectionId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`lesson\` CHANGE \`description\` \`description\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`lesson\` CHANGE \`video\` \`video\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`lesson\` ADD CONSTRAINT \`FK_70eb01d08acf5be68e3a17451b0\` FOREIGN KEY (\`sectionId\`) REFERENCES \`section\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`resource\` CHANGE \`lessonId\` \`lessonId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`resource\` CHANGE \`downloadUrl\` \`downloadUrl\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`resource\` ADD CONSTRAINT \`FK_b849e2c59fbbf2c19fef6c87a16\` FOREIGN KEY (\`lessonId\`) REFERENCES \`lesson\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`s3bucketName\``);
    }

}
