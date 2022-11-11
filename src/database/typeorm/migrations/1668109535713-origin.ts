import { MigrationInterface, QueryRunner } from "typeorm";

export class origin1668109535713 implements MigrationInterface {
    name = 'origin1668109535713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`cart\` (\`id\` int NOT NULL AUTO_INCREMENT, \`totalAmmount\` int NOT NULL DEFAULT '0', \`merchantId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_0f79a6a0fa4d42d394f0c1cc776\` FOREIGN KEY (\`merchantId\`) REFERENCES \`merchant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE TABLE \`cart_products_product\` (\`cartId\` int NOT NULL, \`productId\` int NOT NULL, INDEX \`IDX_e6ce39be5d354954a88ded1eba\` (\`cartId\`), INDEX \`IDX_0fc996e42b6330c97f8cffbddf\` (\`productId\`), PRIMARY KEY (\`cartId\`, \`productId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`cart_products_product\` ADD CONSTRAINT \`FK_e6ce39be5d354954a88ded1ebac\` FOREIGN KEY (\`cartId\`) REFERENCES \`cart\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`cart_products_product\` ADD CONSTRAINT \`FK_0fc996e42b6330c97f8cffbddfa\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart_products_product\` DROP FOREIGN KEY \`FK_0fc996e42b6330c97f8cffbddfa\``);
        await queryRunner.query(`ALTER TABLE \`cart_products_product\` DROP FOREIGN KEY \`FK_e6ce39be5d354954a88ded1ebac\``);
        await queryRunner.query(`DROP TABLE \`cart_products_product\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_0f79a6a0fa4d42d394f0c1cc776\``);
        await queryRunner.query(`DROP TABLE \`cart\``);
    }

}
