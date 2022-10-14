import { MigrationInterface, QueryRunner } from "typeorm";

export class origin1665740904017 implements MigrationInterface {
    name = 'origin1665740904017'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`auth_merchant\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`merchantId\` int NULL, UNIQUE INDEX \`REL_835fe9179e2572bbd1856eb9d6\` (\`merchantId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`payment_method\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`merchant\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_0369e7853b1a4d8e366c7b3b79\` (\`username\`), UNIQUE INDEX \`IDX_546608b3c7bf7c175d3780c38f\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cart\` (\`id\` int NOT NULL AUTO_INCREMENT, \`totalAmount\` int NOT NULL, \`clientId\` int NOT NULL, \`merchantId\` int NOT NULL, UNIQUE INDEX \`REL_4355dbbef8931576d9e362d4ae\` (\`clientId\`), UNIQUE INDEX \`REL_0f79a6a0fa4d42d394f0c1cc77\` (\`merchantId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`auth\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`clientId\` int NULL, UNIQUE INDEX \`REL_2c3f7a74773a0258b9bb0e91a5\` (\`clientId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`client\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_19385ccaeac3753e24d2eed6a4\` (\`username\`), UNIQUE INDEX \`IDX_6436cc6b79593760b9ef921ef1\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order\` (\`id\` int NOT NULL AUTO_INCREMENT, \`paymentMethodId\` int NOT NULL, \`totalAmount\` int NOT NULL, \`clientId\` int NULL, \`merchantId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`quantity\` varchar(255) NOT NULL, \`merchantId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`payment_paypal\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`merchant_payment_methods_payment_method\` (\`merchantId\` int NOT NULL, \`paymentMethodId\` int NOT NULL, INDEX \`IDX_0d66b943a761791ff223ae295d\` (\`merchantId\`), INDEX \`IDX_32131527b109a9828142a602cd\` (\`paymentMethodId\`), PRIMARY KEY (\`merchantId\`, \`paymentMethodId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cart_products_product\` (\`cartId\` int NOT NULL, \`productId\` int NOT NULL, INDEX \`IDX_e6ce39be5d354954a88ded1eba\` (\`cartId\`), INDEX \`IDX_0fc996e42b6330c97f8cffbddf\` (\`productId\`), PRIMARY KEY (\`cartId\`, \`productId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`client_payment_methods_payment_method\` (\`clientId\` int NOT NULL, \`paymentMethodId\` int NOT NULL, INDEX \`IDX_799d996cfac8583db71617b1fc\` (\`clientId\`), INDEX \`IDX_e4225b94d9867a759e8220ed0f\` (\`paymentMethodId\`), PRIMARY KEY (\`clientId\`, \`paymentMethodId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order_products_product\` (\`orderId\` int NOT NULL, \`productId\` int NOT NULL, INDEX \`IDX_1f9ea0b0e59e0d98ade4f2d5e9\` (\`orderId\`), INDEX \`IDX_d6c66c08b9c7e84a1b657797df\` (\`productId\`), PRIMARY KEY (\`orderId\`, \`productId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category_products_product\` (\`categoryId\` int NOT NULL, \`productId\` int NOT NULL, INDEX \`IDX_90d521137ff8c3e927187bcd27\` (\`categoryId\`), INDEX \`IDX_ee240b247f9f23e5d35854c186\` (\`productId\`), PRIMARY KEY (\`categoryId\`, \`productId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`auth_merchant\` ADD CONSTRAINT \`FK_835fe9179e2572bbd1856eb9d64\` FOREIGN KEY (\`merchantId\`) REFERENCES \`merchant\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_4355dbbef8931576d9e362d4ae1\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_0f79a6a0fa4d42d394f0c1cc776\` FOREIGN KEY (\`merchantId\`) REFERENCES \`merchant\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`auth\` ADD CONSTRAINT \`FK_2c3f7a74773a0258b9bb0e91a5a\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_9b27855a9c2ade186e5c55d1ec3\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_293ad75db4c3b2aa62996c75ad1\` FOREIGN KEY (\`merchantId\`) REFERENCES \`client\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`merchant_payment_methods_payment_method\` ADD CONSTRAINT \`FK_0d66b943a761791ff223ae295d1\` FOREIGN KEY (\`merchantId\`) REFERENCES \`merchant\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`merchant_payment_methods_payment_method\` ADD CONSTRAINT \`FK_32131527b109a9828142a602cdf\` FOREIGN KEY (\`paymentMethodId\`) REFERENCES \`payment_method\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cart_products_product\` ADD CONSTRAINT \`FK_e6ce39be5d354954a88ded1ebac\` FOREIGN KEY (\`cartId\`) REFERENCES \`cart\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`cart_products_product\` ADD CONSTRAINT \`FK_0fc996e42b6330c97f8cffbddfa\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`client_payment_methods_payment_method\` ADD CONSTRAINT \`FK_799d996cfac8583db71617b1fc4\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`client_payment_methods_payment_method\` ADD CONSTRAINT \`FK_e4225b94d9867a759e8220ed0fb\` FOREIGN KEY (\`paymentMethodId\`) REFERENCES \`payment_method\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_products_product\` ADD CONSTRAINT \`FK_1f9ea0b0e59e0d98ade4f2d5e99\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`order_products_product\` ADD CONSTRAINT \`FK_d6c66c08b9c7e84a1b657797dff\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`category_products_product\` ADD CONSTRAINT \`FK_90d521137ff8c3e927187bcd27d\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`category_products_product\` ADD CONSTRAINT \`FK_ee240b247f9f23e5d35854c186b\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category_products_product\` DROP FOREIGN KEY \`FK_ee240b247f9f23e5d35854c186b\``);
        await queryRunner.query(`ALTER TABLE \`category_products_product\` DROP FOREIGN KEY \`FK_90d521137ff8c3e927187bcd27d\``);
        await queryRunner.query(`ALTER TABLE \`order_products_product\` DROP FOREIGN KEY \`FK_d6c66c08b9c7e84a1b657797dff\``);
        await queryRunner.query(`ALTER TABLE \`order_products_product\` DROP FOREIGN KEY \`FK_1f9ea0b0e59e0d98ade4f2d5e99\``);
        await queryRunner.query(`ALTER TABLE \`client_payment_methods_payment_method\` DROP FOREIGN KEY \`FK_e4225b94d9867a759e8220ed0fb\``);
        await queryRunner.query(`ALTER TABLE \`client_payment_methods_payment_method\` DROP FOREIGN KEY \`FK_799d996cfac8583db71617b1fc4\``);
        await queryRunner.query(`ALTER TABLE \`cart_products_product\` DROP FOREIGN KEY \`FK_0fc996e42b6330c97f8cffbddfa\``);
        await queryRunner.query(`ALTER TABLE \`cart_products_product\` DROP FOREIGN KEY \`FK_e6ce39be5d354954a88ded1ebac\``);
        await queryRunner.query(`ALTER TABLE \`merchant_payment_methods_payment_method\` DROP FOREIGN KEY \`FK_32131527b109a9828142a602cdf\``);
        await queryRunner.query(`ALTER TABLE \`merchant_payment_methods_payment_method\` DROP FOREIGN KEY \`FK_0d66b943a761791ff223ae295d1\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_293ad75db4c3b2aa62996c75ad1\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_9b27855a9c2ade186e5c55d1ec3\``);
        await queryRunner.query(`ALTER TABLE \`auth\` DROP FOREIGN KEY \`FK_2c3f7a74773a0258b9bb0e91a5a\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_0f79a6a0fa4d42d394f0c1cc776\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_4355dbbef8931576d9e362d4ae1\``);
        await queryRunner.query(`ALTER TABLE \`auth_merchant\` DROP FOREIGN KEY \`FK_835fe9179e2572bbd1856eb9d64\``);
        await queryRunner.query(`DROP INDEX \`IDX_ee240b247f9f23e5d35854c186\` ON \`category_products_product\``);
        await queryRunner.query(`DROP INDEX \`IDX_90d521137ff8c3e927187bcd27\` ON \`category_products_product\``);
        await queryRunner.query(`DROP TABLE \`category_products_product\``);
        await queryRunner.query(`DROP INDEX \`IDX_d6c66c08b9c7e84a1b657797df\` ON \`order_products_product\``);
        await queryRunner.query(`DROP INDEX \`IDX_1f9ea0b0e59e0d98ade4f2d5e9\` ON \`order_products_product\``);
        await queryRunner.query(`DROP TABLE \`order_products_product\``);
        await queryRunner.query(`DROP INDEX \`IDX_e4225b94d9867a759e8220ed0f\` ON \`client_payment_methods_payment_method\``);
        await queryRunner.query(`DROP INDEX \`IDX_799d996cfac8583db71617b1fc\` ON \`client_payment_methods_payment_method\``);
        await queryRunner.query(`DROP TABLE \`client_payment_methods_payment_method\``);
        await queryRunner.query(`DROP INDEX \`IDX_0fc996e42b6330c97f8cffbddf\` ON \`cart_products_product\``);
        await queryRunner.query(`DROP INDEX \`IDX_e6ce39be5d354954a88ded1eba\` ON \`cart_products_product\``);
        await queryRunner.query(`DROP TABLE \`cart_products_product\``);
        await queryRunner.query(`DROP INDEX \`IDX_32131527b109a9828142a602cd\` ON \`merchant_payment_methods_payment_method\``);
        await queryRunner.query(`DROP INDEX \`IDX_0d66b943a761791ff223ae295d\` ON \`merchant_payment_methods_payment_method\``);
        await queryRunner.query(`DROP TABLE \`merchant_payment_methods_payment_method\``);
        await queryRunner.query(`DROP TABLE \`payment_paypal\``);
        await queryRunner.query(`DROP TABLE \`product\``);
        await queryRunner.query(`DROP TABLE \`category\``);
        await queryRunner.query(`DROP TABLE \`order\``);
        await queryRunner.query(`DROP INDEX \`IDX_6436cc6b79593760b9ef921ef1\` ON \`client\``);
        await queryRunner.query(`DROP INDEX \`IDX_19385ccaeac3753e24d2eed6a4\` ON \`client\``);
        await queryRunner.query(`DROP TABLE \`client\``);
        await queryRunner.query(`DROP INDEX \`REL_2c3f7a74773a0258b9bb0e91a5\` ON \`auth\``);
        await queryRunner.query(`DROP TABLE \`auth\``);
        await queryRunner.query(`DROP INDEX \`REL_0f79a6a0fa4d42d394f0c1cc77\` ON \`cart\``);
        await queryRunner.query(`DROP INDEX \`REL_4355dbbef8931576d9e362d4ae\` ON \`cart\``);
        await queryRunner.query(`DROP TABLE \`cart\``);
        await queryRunner.query(`DROP INDEX \`IDX_546608b3c7bf7c175d3780c38f\` ON \`merchant\``);
        await queryRunner.query(`DROP INDEX \`IDX_0369e7853b1a4d8e366c7b3b79\` ON \`merchant\``);
        await queryRunner.query(`DROP TABLE \`merchant\``);
        await queryRunner.query(`DROP TABLE \`payment_method\``);
        await queryRunner.query(`DROP INDEX \`REL_835fe9179e2572bbd1856eb9d6\` ON \`auth_merchant\``);
        await queryRunner.query(`DROP TABLE \`auth_merchant\``);
    }

}
