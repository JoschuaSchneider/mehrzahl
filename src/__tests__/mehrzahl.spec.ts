import { mz } from "../mehrzahl"

describe("Mehrzahl function", () => {
  it("interpolates function expressions", () => {
    const resultSingular = mz(1)`number is ${(plural) =>
      plural ? "plural" : "singular"}`
    const resultPlural = mz(5)`number is ${(plural) =>
      plural ? "plural" : "singular"}`

    expect(resultSingular).toEqual("number is singular")
    expect(resultPlural).toEqual("number is plural")
  })

  it("interpolates singular/plural tuples", () => {
    const resultSingular = mz(1)`number is ${["singular", "plural"]}`
    const resultPlural = mz(5)`number is ${["singular", "plural"]}`

    expect(resultSingular).toEqual("number is singular")
    expect(resultPlural).toEqual("number is plural")
  })

  it("interpolates singular/plural tuples with undefined/null values", () => {
    const formatSingular = mz(1)
    const formatPlural = mz(5)

    expect(formatSingular`number is ${[null, "plural"]}`).toEqual("number is ")
    expect(formatSingular`number is ${["singular"]}`).toEqual(
      "number is singular"
    )
    expect(formatPlural`number is ${[, "plural"]}`).toEqual("number is plural")
    expect(formatPlural`number is ${["singular"]}`).toEqual("number is ")
  })

  it("interpolates singular/plural tuples and function expressions", () => {
    const resultSingular = mz(1)`number is ${["singular", "plural"]} ${(
      plural
    ) => (plural ? "pluralFunction" : "singularFunction")}`
    const resultPlural = mz(5)`number is ${["singular", "plural"]} ${(plural) =>
      plural ? "pluralFunction" : "singularFunction"}`

    expect(resultSingular).toEqual("number is singular singularFunction")
    expect(resultPlural).toEqual("number is plural pluralFunction")
  })

  it("transforms {<singular>|<plural>} syntax", () => {
    const resultSingular = mz(1)`number is {singular|plural}`

    const resultPlural = mz(5)`number is {singular|plural}`

    expect(resultSingular).toEqual("number is singular")
    expect(resultPlural).toEqual("number is plural")
  })

  it("transforms {<singular>|<plural>} syntax with empty strings", () => {
    const resultSingular = mz(1)`number is {singular|}`

    const resultPlural = mz(5)`number is {|plural}`

    expect(resultSingular).toEqual("number is singular")
    expect(resultPlural).toEqual("number is plural")
  })

  it("transforms nested groups", () => {
    const resultSingular = mz(1)`number is {singular ($value)|}`

    const resultPlural = mz(5)`number is {|plural ($value)}`

    expect(resultSingular).toEqual("number is singular (1)")
    expect(resultPlural).toEqual("number is plural (5)")
  })

  it("replaces $value", () => {
    const resultSingular = mz(1)`number is {singular ($value)|}`

    const resultPlural = mz(5)`number is {|plural ($value)}`

    expect(resultSingular).toEqual("number is singular (1)")
    expect(resultPlural).toEqual("number is plural (5)")
  })
})
