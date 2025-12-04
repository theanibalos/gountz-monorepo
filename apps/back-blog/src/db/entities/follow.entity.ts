import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { BaseCustomEntity } from "./base-custom-entity";
import { UserEntity } from "./user.entity";

@Entity({ name: "follow" })
@Index(["followerId", "followingId"], { unique: true })
export class FollowEntity extends BaseCustomEntity {
	@Column({ type: "varchar", nullable: false, name: "follower_id" })
	followerId: string;

	@Column({ type: "varchar", nullable: false, name: "following_id" })
	followingId: string;

	@ManyToOne(() => UserEntity, {
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "follower_id" })
	follower: UserEntity;

	@ManyToOne(() => UserEntity, {
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "following_id" })
	following: UserEntity;
}
