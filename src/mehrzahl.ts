export type MehrzahlTaggedFormatter = (
  strings: TemplateStringsArray,
  ...valuesToInterpolate: InterpolatableValue[]
) => string

export type MehrzahlFormatterFactory = (
  amount: number,
  delimiter?: string
) => MehrzahlTaggedFormatter

export type ReversedMerzahlFormatter = (
  amount: number,
  delimiter?: string
) => string

export type ReversedMehrzahlFormatterFactory = (
  strings: TemplateStringsArray,
  ...valuesToInterpolate: InterpolatableValue[]
) => ReversedMerzahlFormatter

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

const formatGroupSyntax = (
  value: string,
  isPlural: boolean,
  delimiter: string
) =>
  value.replace(GROUPING_REGEX, (_, firstSubmatch) => {
    if (typeof firstSubmatch === "string") {
      return firstSubmatch.split(delimiter)[isPlural ? 1 : 0]
    }
    return firstSubmatch
  })

export const mz: MehrzahlFormatterFactory =
  (amount, delimiter = DEFAULT_DELIMITER) =>
  (strings, ...valuesToInterpolate) => {
    return mehrzahl(
      amount,
      delimiter,
      strings,
      ...valuesToInterpolate
    )
  }

  // reverse of mz
  export const zm: ReversedMehrzahlFormatterFactory =
  (strings, ...valuesToInterpolate) =>
  (amount, delimiter = DEFAULT_DELIMITER) => {
    return mehrzahl(
      amount,
      delimiter,
      strings,
      ...valuesToInterpolate
    )
  }

  const mehrzahl = (
    amount: number,
    delimiter: string,
    strings: TemplateStringsArray,
    ...valuesToInterpolate: InterpolatableValue[]
  ) => {
      const isPlural = amount !== 1
      const amountString = amount.toString()
  
      const interpolatedValues = valuesToInterpolate.map((value) => {
        if (typeof value === "function") {
          return value(isPlural, amount)
        }
  
        if (Array.isArray(value)) {
          return value[isPlural ? 1 : 0] ?? ""
        }
        return value
      })
  
      return formatGroupSyntax(
        strings.reduce(
          (result, part, index) =>
            result + part + (interpolatedValues[index] ?? ""),
          ""
        ),
        isPlural,
        delimiter
      ).replace("$value", amountString)
  }
  