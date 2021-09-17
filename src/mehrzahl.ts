export type MehrzahlTaggedFormatter = (
  strings: TemplateStringsArray,
  ...valuesToInterpolate: InterpolatableValue[]
) => string

export type MehrzahlFormatterFactory = (
  amount: number,
  delimiter?: string
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

const DEFAULT_DELIMITER = "|"
const GROUPING_REGEX = /\{(.*?)\}/g

export const mz: MehrzahlFormatterFactory =
  (amount, delimiter = DEFAULT_DELIMITER) =>
  (strings, ...valuesToInterpolate) => {
    const isPlural = amount > 1

    const formatGroupSyntax = (value: string) =>
      value.replace(GROUPING_REGEX, (_, firstSubmatch) => {
        if (typeof firstSubmatch === "string") {
          const [singular, plural] = firstSubmatch.split(delimiter)
          return isPlural ? plural : singular
        }

        return firstSubmatch
      })

    if (strings.length === 1) {
      return formatGroupSyntax(strings[0]).replace("$value", amount.toString())
    }

    const interpolatedValues = valuesToInterpolate.map((value) => {
      if (typeof value === "function") {
        return value(isPlural, amount)
      }

      if (Array.isArray(value)) {
        return value[isPlural ? 1 : 0]?.toString() ?? ""
      }

      return value.toString()
    })

    return formatGroupSyntax(
      strings.reduce(
        (result, part, index) =>
          result + part + (interpolatedValues[index] ?? ""),
        ""
      )
    ).replace("$value", amount.toString())
  }
