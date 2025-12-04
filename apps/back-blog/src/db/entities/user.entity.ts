import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { BaseCustomEntity } from "./base-custom-entity";
import { FollowEntity } from "./follow.entity";
import { ProfileEntity } from "./profile.entity";

@Entity({ name: "user" })
export class UserEntity extends BaseCustomEntity {
	@Column({ nullable: false, unique: true, type: "varchar", length: 255 })
	email: string;

	@Column({ nullable: false, type: "varchar" })
	password: string;

	@OneToOne(
		() => ProfileEntity,
		(profile) => profile.user,
		{
			cascade: true,
			eager: false,
		},
	)
	profile: ProfileEntity;

	@OneToMany(
		() => FollowEntity,
		(follow) => follow.follower,
	)
	following: FollowEntity[];

	@OneToMany(
		() => FollowEntity,
		(follow) => follow.following,
	)
	followers: FollowEntity[];
}
