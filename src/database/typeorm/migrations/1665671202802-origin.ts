import { MigrationInterface, QueryRunner } from "typeorm";

export class origin1665671202802 implements MigrationInterface {
    name = 'origin1665671202802'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`auth\` DROP FOREIGN KEY \`FK_2c3f7a74773a0258b9bb0e91a5a\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_4355dbbef8931576d9e362d4ae1\``);
        await queryRunner.query(`ALTER TABLE \`cart\` CHANGE \`clientId\` \`clientId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`auth\` CHANGE \`clientId\` \`clientId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`auth_merchant\` DROP FOREIGN KEY \`FK_835fe9179e2572bbd1856eb9d64\``);
        await queryRunner.query(`ALTER TABLE \`auth_merchant\` CHANGE \`merchantId\` \`merchantId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_9b27855a9c2ade186e5c55d1ec3\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_293ad75db4c3b2aa62996c75ad1\``);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`clientId\` \`clientId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`merchantId\` \`merchantId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_4355dbbef8931576d9e362d4ae1\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`auth\` ADD CONSTRAINT \`FK_2c3f7a74773a0258b9bb0e91a5a\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`auth_merchant\` ADD CONSTRAINT \`FK_835fe9179e2572bbd1856eb9d64\` FOREIGN KEY (\`merchantId\`) REFERENCES \`merchant\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_9b27855a9c2ade186e5c55d1ec3\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_293ad75db4c3b2aa62996c75ad1\` FOREIGN KEY (\`merchantId\`) REFERENCES \`client\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_293ad75db4c3b2aa62996c75ad1\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_9b27855a9c2ade186e5c55d1ec3\``);
        await queryRunner.query(`ALTER TABLE \`auth_merchant\` DROP FOREIGN KEY \`FK_835fe9179e2572bbd1856eb9d64\``);
        await queryRunner.query(`ALTER TABLE \`auth\` DROP FOREIGN KEY \`FK_2c3f7a74773a0258b9bb0e91a5a\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_4355dbbef8931576d9e362d4ae1\``);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`merchantId\` \`merchantId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`clientId\` \`clientId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_293ad75db4c3b2aa62996c75ad1\` FOREIGN KEY (\`merchantId\`) REFERENCES \`client\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_9b27855a9c2ade186e5c55d1ec3\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`auth_merchant\` CHANGE \`merchantId\` \`merchantId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`auth_merchant\` ADD CONSTRAINT \`FK_835fe9179e2572bbd1856eb9d64\` FOREIGN KEY (\`merchantId\`) REFERENCES \`merchant\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`auth\` CHANGE \`clientId\` \`clientId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`cart\` CHANGE \`clientId\` \`clientId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_4355dbbef8931576d9e362d4ae1\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`auth\` ADD CONSTRAINT \`FK_2c3f7a74773a0258b9bb0e91a5a\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
