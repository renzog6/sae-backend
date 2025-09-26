// filepath: sae-backend/src/common/validators/exactly-one-of.decorator.ts
import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function ExactlyOneOf(keys: string[], validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'ExactlyOneOf',
      target: object.constructor,
      propertyName,
      constraints: [keys],
      options: validationOptions ?? {
        message: `Debe especificar exactamente uno de: ${keys.join(', ')}`,
      },
      validator: {
        validate(_: any, args: ValidationArguments) {
          const [fields] = args.constraints as [string[]];
          const obj = args.object as Record<string, unknown>;
          const count = fields.reduce((acc: number, key: string) => {
            const present = obj[key] !== undefined && obj[key] !== null;
            return acc + (present ? 1 : 0);
          }, 0);
          return count === 1;
        },
      },
    });
  };
}
