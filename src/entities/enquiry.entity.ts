import { Column, Entity } from "typeorm";
import { Base } from "./base.entity";


@Entity("enquiries")
export class Enquiry extends Base {
  @Column({nullable:false})
  name: string;

  @Column({nullable: false})
  email: string;

  @Column({ type: "date" , nullable:false})
  date: Date;

  @Column({nullable: false})
  guests: number;

  @Column({ type: "text", nullable: true })
  message: string;
}