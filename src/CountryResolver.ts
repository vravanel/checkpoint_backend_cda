import {
  Arg,
  Args,
  ArgsType,
  Field,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Country } from "./country";

@ArgsType()
export class CreateCountry {
  @Field({ nullable: true })
  code!: string;

  @Field({ nullable: true })
  name!: string;

  @Field({ nullable: true })
  emoji!: string;

  @Field()
  continentCode!: string;
}

@Resolver()
export class CountryResolver {
  @Query(() => [Country])
  getCountries() {
    return Country.getCountries();
  }

  @Query(() => Country, { nullable: true })
  getCountriesByCode(@Arg("code") code: string) {
    return Country.getCountryByCode(code);
  }

  @Mutation(() => Country)
  createCountry(@Args() args: CreateCountry) {
    return Country.createCountry(args) || null;
  }

  @Query(() => [Country])
  async getCountriesByContinentCode(
    @Arg("continentCode") continentCode: string
  ) {
    return Country.getCountriesByContinentCode(continentCode);
  }
}
