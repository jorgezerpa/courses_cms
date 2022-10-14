import { MigrationInterface, QueryRunner } from "typeorm";

export class origin1665740651259 implements MigrationInterface {
    name = 'origin1665740651259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_8ef45624bce016fb1aa211c8e45\``);
        await queryRunner.query(`DROP INDEX \`REL_8ef45624bce016fb1aa211c8e4\` ON \`cart\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP COLUMN \`merchantIdId\``);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD \`merchantId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD UNIQUE INDEX \`IDX_0f79a6a0fa4d42d394f0c1cc77\` (\`merchantId\`)`);
        await queryRunner.query(`ALTER TABLE \`auth_merchant\` DROP FOREIGN KEY \`FK_835fe9179e2572bbd1856eb9d64\``);
        await queryRunner.query(`ALTER TABLE \`auth_merchant\` CHANGE \`merchantId\` \`merchantId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_4355dbbef8931576d9e362d4ae1\``);
        await queryRunner.query(`ALTER TABLE \`cart\` CHANGE \`clientId\` \`clientId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`auth\` DROP FOREIGN KEY \`FK_2c3f7a74773a0258b9bb0e91a5a\``);
        await queryRunner.query(`ALTER TABLE \`auth\` CHANGE \`clientId\` \`clientId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_9b27855a9c2ade186e5c55d1ec3\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_293ad75db4c3b2aa62996c75ad1\``);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`clientId\` \`clientId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`merchantId\` \`merchantId\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_0f79a6a0fa4d42d394f0c1cc77\` ON \`cart\` (\`merchantId\`)`);
        await queryRunner.query(`ALTER TABLE \`auth_merchant\` ADD CONSTRAINT \`FK_835fe9179e2572bbd1856eb9d64\` FOREIGN KEY (\`merchantId\`) REFERENCES \`merchant\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_4355dbbef8931576d9e362d4ae1\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_0f79a6a0fa4d42d394f0c1cc776\` FOREIGN KEY (\`merchantId\`) REFERENCES \`merchant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`auth\` ADD CONSTRAINT \`FK_2c3f7a74773a0258b9bb0e91a5a\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_9b27855a9c2ade186e5c55d1ec3\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_293ad75db4c3b2aa62996c75ad1\` FOREIGN KEY (\`merchantId\`) REFERENCES \`client\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_293ad75db4c3b2aa62996c75ad1\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_9b27855a9c2ade186e5c55d1ec3\``);
        await queryRunner.query(`ALTER TABLE \`auth\` DROP FOREIGN KEY \`FK_2c3f7a74773a0258b9bb0e91a5a\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_0f79a6a0fa4d42d394f0c1cc776\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_4355dbbef8931576d9e362d4ae1\``);
        await queryRunner.query(`ALTER TABLE \`auth_merchant\` DROP FOREIGN KEY \`FK_835fe9179e2572bbd1856eb9d64\``);
        await queryRunner.query(`DROP INDEX \`REL_0f79a6a0fa4d42d394f0c1cc77\` ON \`cart\``);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`merchantId\` \`merchantId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`clientId\` \`clientId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_293ad75db4c3b2aa62996c75ad1\` FOREIGN KEY (\`merchantId\`) REFERENCES \`client\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_9b27855a9c2ade186e5c55d1ec3\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`auth\` CHANGE \`clientId\` \`clientId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`auth\` ADD CONSTRAINT \`FK_2c3f7a74773a0258b9bb0e91a5a\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cart\` CHANGE \`clientId\` \`clientId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_4355dbbef8931576d9e362d4ae1\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`auth_merchant\` CHANGE \`merchantId\` \`merchantId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`auth_merchant\` ADD CONSTRAINT \`FK_835fe9179e2572bbd1856eb9d64\` FOREIGN KEY (\`merchantId\`) REFERENCES \`merchant\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP INDEX \`IDX_0f79a6a0fa4d42d394f0c1cc77\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP COLUMN \`merchantId\``);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD \`merchantIdId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_8ef45624bce016fb1aa211c8e4\` ON \`cart\` (\`merchantIdId\`)`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_8ef45624bce016fb1aa211c8e45\` FOREIGN KEY (\`merchantIdId\`) REFERENCES \`merchant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
