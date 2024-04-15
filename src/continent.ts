import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Country } from "./country";
import { CreateContinent } from "./ContinentResolver";

@ObjectType()
@Entity()
export class Continent extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ length: 3 })
  code!: string;

  @Field(() => [Country])
  @OneToMany(() => Country, (country) => country.continent)
  countries?: Country[];

  constructor(continent?: Partial<Continent>) {
    super();
    if (continent) {
      if (!continent.code) {
        throw new Error("Le code du pays ne peut pas être vide");
      }
      this.code = continent.code;
    }
  }

  static async getContinents(): Promise<Continent[]> {
    const continents = await Continent.find();
    return continents;
  }

  static async createContinent(
    continentInformations: CreateContinent
  ): Promise<Continent> {
    const newContinent = new Continent(continentInformations);
    const saveContinent = await newContinent.save();
    return saveContinent;
  }
}
