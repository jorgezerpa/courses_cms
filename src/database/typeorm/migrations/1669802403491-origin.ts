import { MigrationInterface, QueryRunner } from "typeorm";

export class origin1669802403491 implements MigrationInterface {
    name = 'origin1669802403491'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`widget\` DROP FOREIGN KEY \`FK_50d20a9245a0889ae33988230ed\``);
        await queryRunner.query(`ALTER TABLE \`widget\` DROP FOREIGN KEY \`FK_76f6cae4b0fa5a3597ce7548891\``);
        await queryRunner.query(`ALTER TABLE \`widget\` DROP FOREIGN KEY \`FK_bc3376ee2907f2b327dbd4647e9\``);
        await queryRunner.query(`ALTER TABLE \`widget\` DROP FOREIGN KEY \`FK_19425141273ead8b70f69bd2429\``);
        await queryRunner.query(`ALTER TABLE \`widget\` CHANGE \`videoId\` \`videoId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`widget\` CHANGE \`imageId\` \`imageId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`widget\` CHANGE \`fileId\` \`fileId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`widget\` CHANGE \`sectionId\` \`sectionId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`section\` DROP FOREIGN KEY \`FK_b5811a8be4864172f1748c862f6\``);
        await queryRunner.query(`ALTER TABLE \`section\` CHANGE \`programId\` \`programId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`widget\` ADD CONSTRAINT \`FK_bc3376ee2907f2b327dbd4647e9\` FOREIGN KEY (\`videoId\`) REFERENCES \`video\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`widget\` ADD CONSTRAINT \`FK_50d20a9245a0889ae33988230ed\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`widget\` ADD CONSTRAINT \`FK_76f6cae4b0fa5a3597ce7548891\` FOREIGN KEY (\`fileId\`) REFERENCES \`file\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`widget\` ADD CONSTRAINT \`FK_19425141273ead8b70f69bd2429\` FOREIGN KEY (\`sectionId\`) REFERENCES \`section\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`section\` ADD CONSTRAINT \`FK_b5811a8be4864172f1748c862f6\` FOREIGN KEY (\`programId\`) REFERENCES \`program\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`section\` DROP FOREIGN KEY \`FK_b5811a8be4864172f1748c862f6\``);
        await queryRunner.query(`ALTER TABLE \`widget\` DROP FOREIGN KEY \`FK_19425141273ead8b70f69bd2429\``);
        await queryRunner.query(`ALTER TABLE \`widget\` DROP FOREIGN KEY \`FK_76f6cae4b0fa5a3597ce7548891\``);
        await queryRunner.query(`ALTER TABLE \`widget\` DROP FOREIGN KEY \`FK_50d20a9245a0889ae33988230ed\``);
        await queryRunner.query(`ALTER TABLE \`widget\` DROP FOREIGN KEY \`FK_bc3376ee2907f2b327dbd4647e9\``);
        await queryRunner.query(`ALTER TABLE \`section\` CHANGE \`programId\` \`programId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`section\` ADD CONSTRAINT \`FK_b5811a8be4864172f1748c862f6\` FOREIGN KEY (\`programId\`) REFERENCES \`program\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`widget\` CHANGE \`sectionId\` \`sectionId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`widget\` CHANGE \`fileId\` \`fileId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`widget\` CHANGE \`imageId\` \`imageId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`widget\` CHANGE \`videoId\` \`videoId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`widget\` ADD CONSTRAINT \`FK_19425141273ead8b70f69bd2429\` FOREIGN KEY (\`sectionId\`) REFERENCES \`section\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`widget\` ADD CONSTRAINT \`FK_bc3376ee2907f2b327dbd4647e9\` FOREIGN KEY (\`videoId\`) REFERENCES \`video\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`widget\` ADD CONSTRAINT \`FK_76f6cae4b0fa5a3597ce7548891\` FOREIGN KEY (\`fileId\`) REFERENCES \`file\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`widget\` ADD CONSTRAINT \`FK_50d20a9245a0889ae33988230ed\` FOREIGN KEY (\`imageId\`) REFERENCES \`image\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
