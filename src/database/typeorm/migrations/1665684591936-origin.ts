import { MigrationInterface, QueryRunner } from "typeorm";

export class origin1665684591936 implements MigrationInterface {
    name = 'origin1665684591936'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`cart_products_product\` (\`cartId\` int NOT NULL, \`productId\` int NOT NULL, INDEX \`IDX_e6ce39be5d354954a88ded1eba\` (\`cartId\`), INDEX \`IDX_0fc996e42b6330c97f8cffbddf\` (\`productId\`), PRIMARY KEY (\`cartId\`, \`productId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`auth_merchant\` DROP FOREIGN KEY \`FK_835fe9179e2572bbd1856eb9d64\``);
        await queryRunner.query(`ALTER TABLE \`auth_merchant\` CHANGE \`merchantId\` \`merchantId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_4355dbbef8931576d9e362d4ae1\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_8ef45624bce016fb1aa211c8e45\``);
        await queryRunner.query(`ALTER TABLE \`cart\` CHANGE \`clientId\` \`clientId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`cart\` CHANGE \`merchantIdId\` \`merchantIdId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`auth\` DROP FOREIGN KEY \`FK_2c3f7a74773a0258b9bb0e91a5a\``);
        await queryRunner.query(`ALTER TABLE \`auth\` CHANGE \`clientId\` \`clientId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_9b27855a9c2ade186e5c55d1ec3\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_293ad75db4c3b2aa62996c75ad1\``);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`clientId\` \`clientId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`merchantId\` \`merchantId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`auth_merchant\` ADD CONSTRAINT \`FK_835fe9179e2572bbd1856eb9d64\` FOREIGN KEY (\`merchantId\`) REFERENCES \`merchant\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_4355dbbef8931576d9e362d4ae1\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_8ef45624bce016fb1aa211c8e45\` FOREIGN KEY (\`merchantIdId\`) REFERENCES \`merchant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`auth\` ADD CONSTRAINT \`FK_2c3f7a74773a0258b9bb0e91a5a\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_9b27855a9c2ade186e5c55d1ec3\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_293ad75db4c3b2aa62996c75ad1\` FOREIGN KEY (\`merchantId\`) REFERENCES \`client\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cart_products_product\` ADD CONSTRAINT \`FK_e6ce39be5d354954a88ded1ebac\` FOREIGN KEY (\`cartId\`) REFERENCES \`cart\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`cart_products_product\` ADD CONSTRAINT \`FK_0fc996e42b6330c97f8cffbddfa\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart_products_product\` DROP FOREIGN KEY \`FK_0fc996e42b6330c97f8cffbddfa\``);
        await queryRunner.query(`ALTER TABLE \`cart_products_product\` DROP FOREIGN KEY \`FK_e6ce39be5d354954a88ded1ebac\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_293ad75db4c3b2aa62996c75ad1\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_9b27855a9c2ade186e5c55d1ec3\``);
        await queryRunner.query(`ALTER TABLE \`auth\` DROP FOREIGN KEY \`FK_2c3f7a74773a0258b9bb0e91a5a\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_8ef45624bce016fb1aa211c8e45\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_4355dbbef8931576d9e362d4ae1\``);
        await queryRunner.query(`ALTER TABLE \`auth_merchant\` DROP FOREIGN KEY \`FK_835fe9179e2572bbd1856eb9d64\``);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`merchantId\` \`merchantId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`clientId\` \`clientId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_293ad75db4c3b2aa62996c75ad1\` FOREIGN KEY (\`merchantId\`) REFERENCES \`client\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_9b27855a9c2ade186e5c55d1ec3\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`auth\` CHANGE \`clientId\` \`clientId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`auth\` ADD CONSTRAINT \`FK_2c3f7a74773a0258b9bb0e91a5a\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cart\` CHANGE \`merchantIdId\` \`merchantIdId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`cart\` CHANGE \`clientId\` \`clientId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_8ef45624bce016fb1aa211c8e45\` FOREIGN KEY (\`merchantIdId\`) REFERENCES \`merchant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_4355dbbef8931576d9e362d4ae1\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`auth_merchant\` CHANGE \`merchantId\` \`merchantId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`auth_merchant\` ADD CONSTRAINT \`FK_835fe9179e2572bbd1856eb9d64\` FOREIGN KEY (\`merchantId\`) REFERENCES \`merchant\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP INDEX \`IDX_0fc996e42b6330c97f8cffbddf\` ON \`cart_products_product\``);
        await queryRunner.query(`DROP INDEX \`IDX_e6ce39be5d354954a88ded1eba\` ON \`cart_products_product\``);
        await queryRunner.query(`DROP TABLE \`cart_products_product\``);
    }

}
