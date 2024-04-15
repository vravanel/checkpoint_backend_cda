import { Args, ArgsType, Field, Mutation, Query, Resolver } from "type-graphql";
import { Continent } from "./continent";
import { Country } from "./country";

@ArgsType()
export class CreateContinent {
  @Field({ nullable: true })
  code!: string;
}

@Resolver()
export class ContinentResolver {
  @Query(() => [Continent])
  getContinents() {
    return Continent.getContinents();
  }

  @Mutation(() => Country)
  createContinent(@Args() args: CreateContinent) {
    return Continent.createContinent(args) || null;
  }
}
