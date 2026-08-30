import { Column, Entity } from "typeorm";
import { Base } from "./base.entity";

@Entity("journals")
export class Journal extends Base {
  @Column()
  title: string;

  @Column()
  tag: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: "jsonb" })
  description: string;

  @Column({ nullable: true })
  coverImage?: string | null;

  @Column({ type: "timestamp" })
  publishedAt: Date;

  @Column({ type: "int" })
  readingTime: number;
}
