import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { BaseCustomEntity } from "./base-custom-entity";
import { UserEntity } from "./user.entity";

@Entity({ name: "profile" })
export class ProfileEntity extends BaseCustomEntity {
	@Column({ type: "varchar", length: 50, unique: true, nullable: false })
	username: string;

	@Column({ type: "varchar", length: 120, nullable: true })
	bio: string;

	@Column({ type: "varchar", length: 255, nullable: false })
	image: string;

	@Column({ type: "int", nullable: false, default: 0 })
	followingCount: number;

	@Column({ type: "int", nullable: false, default: 0 })
	followersCount: number;

	@OneToOne(
		() => UserEntity,
		(user) => user.profile,
		{
			onDelete: "CASCADE",
		},
	)
	@JoinColumn({ name: "user_id" })
	user: UserEntity;
}
