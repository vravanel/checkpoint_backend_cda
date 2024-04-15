import { Field, ObjectType, ID } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CreateCountry } from "./CountryResolver";
import { Continent } from "./continent";

@Entity()
@ObjectType()
export class Country extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ nullable: true, length: 3 })
  @Field({ nullable: true })
  code?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  emoji?: string;

  @Field(() => Continent)
  @ManyToOne(() => Continent, (continent) => continent.countries)
  continent!: Continent;

  constructor(country?: Partial<Country>) {
    super();
    if (country) {
      if (!country.code) {
        throw new Error("Le code du pays ne peut pas être vide");
      }
      this.code = country.code;
      if (!country.name) {
        throw new Error("Le nom du pays ne peut pas être vide");
      }
      this.name = country.name;
      if (!country.emoji) {
        throw new Error("Emoji ne peut pas être vide");
      }
      this.emoji = country.emoji;

      if (country.continent) {
        this.continent = country.continent;
      }
    }
  }

  static async getCountries(): Promise<Country[]> {
    const countries = await Country.find();
    return countries;
  }

  static async getCountryByCode(code: string): Promise<Country | null> {
    const country = await Country.findOne({ where: { code: code } });
    if (!country) {
      throw new Error("Le code demandé n'existe pas");
    }
    return country;
  }

  static async createCountry(
    countryInformations: CreateCountry
  ): Promise<Country> {
    const newCountry = new Country(countryInformations);
    const continent = await Continent.findOne({
      where: { code: countryInformations.continentCode },
    });

    if (!continent) {
      throw new Error("Le code de continent spécifié n'existe pas");
    } else {
      newCountry.continent = continent;
    }

    const saveCountry = await newCountry.save();
    return saveCountry;
  }

  static async getCountriesByContinentCode(
    continentCode: string
  ): Promise<Country[] | undefined> {
    const continent = await Continent.findOne({
      where: { code: continentCode },
      relations: ["countries"],
    });
    if (!continent) {
      throw new Error("Le code de continent spécifié n'existe pas");
    }

    return continent.countries;
  }
}
