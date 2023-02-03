import { MigrationInterface, QueryRunner } from "typeorm";

export class origin1675453613310 implements MigrationInterface {
    name = 'origin1675453613310'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`client\` (\`id\` varchar(255) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_6436cc6b79593760b9ef921ef1\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`resource\` DROP FOREIGN KEY \`FK_b849e2c59fbbf2c19fef6c87a16\``);
        await queryRunner.query(`ALTER TABLE \`resource\` CHANGE \`label\` \`label\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`resource\` CHANGE \`lessonId\` \`lessonId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`lesson\` DROP FOREIGN KEY \`FK_70eb01d08acf5be68e3a17451b0\``);
        await queryRunner.query(`ALTER TABLE \`lesson\` CHANGE \`video\` \`video\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`lesson\` CHANGE \`description\` \`description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`lesson\` CHANGE \`sectionId\` \`sectionId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`section\` DROP FOREIGN KEY \`FK_c61e35b7deed3caab17e821144a\``);
        await queryRunner.query(`ALTER TABLE \`section\` CHANGE \`courseId\` \`courseId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`s3VideosBucketName\` \`s3VideosBucketName\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`s3ResourcesBucketName\` \`s3ResourcesBucketName\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`s3UserBucketName\` \`s3UserBucketName\` varchar(255) NULL`);
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
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`s3UserBucketName\` \`s3UserBucketName\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`s3ResourcesBucketName\` \`s3ResourcesBucketName\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`s3VideosBucketName\` \`s3VideosBucketName\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`section\` CHANGE \`courseId\` \`courseId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`section\` ADD CONSTRAINT \`FK_c61e35b7deed3caab17e821144a\` FOREIGN KEY (\`courseId\`) REFERENCES \`course\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lesson\` CHANGE \`sectionId\` \`sectionId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`lesson\` CHANGE \`description\` \`description\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`lesson\` CHANGE \`video\` \`video\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`lesson\` ADD CONSTRAINT \`FK_70eb01d08acf5be68e3a17451b0\` FOREIGN KEY (\`sectionId\`) REFERENCES \`section\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`resource\` CHANGE \`lessonId\` \`lessonId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`resource\` CHANGE \`label\` \`label\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`resource\` ADD CONSTRAINT \`FK_b849e2c59fbbf2c19fef6c87a16\` FOREIGN KEY (\`lessonId\`) REFERENCES \`lesson\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP INDEX \`IDX_6436cc6b79593760b9ef921ef1\` ON \`client\``);
        await queryRunner.query(`DROP TABLE \`client\``);
    }

}
