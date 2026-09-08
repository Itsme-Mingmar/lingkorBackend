import {
  Column,
  Entity,
  OneToMany,
} from "typeorm";

import { Base } from "./base.entity";
import { Accommodation } from "./accomodation.entity";
import { Space } from "./space.entity";

@Entity("categories")
export class Category extends Base {
  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  slug: string;

  @OneToMany(() => Accommodation, (accommodation) => accommodation.category)
  accommodations: Accommodation[];

  @OneToMany(() => Space, (space) => space.category)
  spaces: Space[];
}