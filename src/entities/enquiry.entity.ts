import { Column, Entity } from "typeorm";
import { Base } from "./base.entity";


@Entity("enquiries")
export class Enquiry extends Base {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ type: "date" })
  date: Date;

  @Column()
  guests: number;

  @Column({ type: "text", nullable: true })
  message: string;

 
}