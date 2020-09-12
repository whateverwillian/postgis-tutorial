import {
	MigrationInterface, 
	QueryRunner,
	Table,
} from "typeorm";

export class CreateUsersTable1599873802240 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'users',
			columns: [
				{
					name: 'id',
					type: 'int',
					isPrimary: true,
					generationStrategy: 'increment',
				},
				{
					name: 'name',
					type: 'varchar',
				},
				{
					name: 'location',
					type: 'geography',
					spatialFeatureType: 'Point',
					srid: 4326,
				}
			]
		}));
	}
	
	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('users');
	}
}
