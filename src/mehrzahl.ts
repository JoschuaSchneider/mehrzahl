export type MehrzahlTaggedFormatter = (
  strings: TemplateStringsArray,
  ...valuesToInterpolate: InterpolatableValue[]
) => string

export type MehrzahlFormatterFactory = (
  amount: number
) => MehrzahlTaggedFormatter

export type InterpolationFunction = (plural: boolean, amount: number) => string

export type SingularPluralTuple = [
  singular?: string | number | null,
  plural?: string | number | null
]

export type InterpolatableValue =
  | SingularPluralTuple
  | string
  | number
  | InterpolationFunction

export const mz: MehrzahlFormatterFactory =
  (amount) =>
  (strings, ...valuesToInterpolate) => {
    const isPlural = amount > 1

    const interpolatedValues = valuesToInterpolate.map((value) => {
      if (typeof value === "function") {
        return value(isPlural, amount)
      }

      if (Array.isArray(value)) {
        return value[isPlural ? 1 : 0]?.toString() ?? ""
      }

      // ToDo: Interpolate {|} syntax
      return value.toString()
    })

    return strings.reduce(
      (result, part, index) =>
        result + part + (interpolatedValues[index] ?? ""),
      ""
    )
  }
