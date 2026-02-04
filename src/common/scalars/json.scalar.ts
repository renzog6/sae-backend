import { Scalar, CustomScalar } from "@nestjs/graphql";
import { GraphQLScalarType, Kind } from "graphql";

@Scalar("JSON")
export class GraphQLJSON implements CustomScalar<any, any> {
  description =
    "The `JSON` scalar type represents JSON values as specified by ECMA-404";

  // Return the same instance to avoid duplicate type registrations
  private static instance = new GraphQLScalarType({
    name: "JSON",
    description:
      "The `JSON` scalar type represents JSON values as specified by ECMA-404",
    serialize(value: any) {
      return value;
    },
    parseValue(value: any) {
      return value;
    },
    parseLiteral(ast: any) {
      if (ast.kind === Kind.OBJECT) {
        return this.parseObjectLiteral(ast);
      }
      return null;
    },
  });

  get type() {
    return GraphQLJSON.instance;
  }

  parseObjectLiteral(ast: any): Record<string, any> {
    const value: Record<string, any> = {};
    if (ast.fields) {
      ast.fields.forEach((field: any) => {
        const key = field.name.value;
        let fieldValue: any;
        switch (field.value.kind) {
          case "StringValue":
            fieldValue = field.value.value;
            break;
          case "IntValue":
            fieldValue = parseInt(field.value.value, 10);
            break;
          case "FloatValue":
            fieldValue = parseFloat(field.value.value);
            break;
          case "BooleanValue":
            fieldValue = field.value.value;
            break;
          case "ObjectValue":
            fieldValue = this.parseObjectLiteral(field.value);
            break;
          case "ListValue":
            fieldValue = field.value.values.map((v: any) => {
              switch (v.kind) {
                case "StringValue":
                  return v.value;
                case "IntValue":
                  return parseInt(v.value, 10);
                case "FloatValue":
                  return parseFloat(v.value);
                case "BooleanValue":
                  return v.value;
                case "ObjectValue":
                  return this.parseObjectLiteral(v);
                case "ListValue":
                  return v.values.map((lv: any) => lv.value);
                default:
                  return null;
              }
            });
            break;
          case "NullValue":
            fieldValue = null;
            break;
          default:
            fieldValue = null;
        }
        value[key] = fieldValue;
      });
    }
    return value;
  }

  serialize(value: any): any {
    return value;
  }

  parseValue(value: any): any {
    return value;
  }

  parseLiteral(ast: any): any {
    if (ast.kind === Kind.OBJECT) {
      return this.parseObjectLiteral(ast);
    }
    return null;
  }
}
