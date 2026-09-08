import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Base } from "./base.entity";
import { Category } from "./category.entity";

@Entity("accommodations")
export class Accommodation extends Base {
  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "int" })
  capacity: number;

  @Column({ type: "text", array: true, default: [] })
  images: string[];

  @ManyToOne(() => Category, (category) => category.accommodations, { onDelete: "CASCADE" })
  @JoinColumn({ name: "category_id" })
  category: Category;
}