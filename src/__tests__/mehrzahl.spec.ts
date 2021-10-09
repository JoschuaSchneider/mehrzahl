import { mz, zm } from "../mehrzahl"

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

describe("ZM function", () => {
  it("interpolates function expressions", () => {
    const resultSingular = zm`number is ${(plural) =>
      plural ? "plural" : "singular"}`(1)
    const resultPlural = zm`number is ${(plural) =>
      plural ? "plural" : "singular"}`(5)

    expect(resultSingular).toEqual("number is singular")
    expect(resultPlural).toEqual("number is plural")
  })

  it("interpolates singular/plural tuples", () => {
    const resultSingular = zm`number is ${["singular", "plural"]}`(1)
    const resultPlural = zm`number is ${["singular", "plural"]}`(5)

    expect(resultSingular).toEqual("number is singular")
    expect(resultPlural).toEqual("number is plural")
  })

  it("interpolates singular/plural tuples with undefined/null values", () => {
    const formatSingular1 = zm`number is ${[null, "plural"]}`
    const formatSingular2 = zm`number is ${["singular"]}`
    const formatPlural1 = zm`number is ${[, "plural"]}`
    const formatPlural2 = zm`number is ${["singular"]}`

    expect(formatSingular1(1)).toEqual("number is ")
    expect(formatSingular2(1)).toEqual("number is singular")
    expect(formatPlural1(5)).toEqual("number is plural")
    expect(formatPlural2(5)).toEqual("number is ")
  })

  it("interpolates singular/plural tuples and function expressions", () => {
    const resultSingular = zm`number is ${["singular", "plural"]} ${(
      plural
    ) => (plural ? "pluralFunction" : "singularFunction")}`(1)
    const resultPlural = zm`number is ${["singular", "plural"]} ${(plural) =>
      plural ? "pluralFunction" : "singularFunction"}`(5)

    expect(resultSingular).toEqual("number is singular singularFunction")
    expect(resultPlural).toEqual("number is plural pluralFunction")
  })

  it("transforms {<singular>|<plural>} syntax", () => {
    const resultSingular = zm`number is {singular|plural}`(1)

    const resultPlural = zm`number is {singular|plural}`(5)

    expect(resultSingular).toEqual("number is singular")
    expect(resultPlural).toEqual("number is plural")
  })

  it("transforms {<singular>|<plural>} syntax with empty strings", () => {
    const resultSingular = zm`number is {singular|}`(1)

    const resultPlural = zm`number is {|plural}`(5)

    expect(resultSingular).toEqual("number is singular")
    expect(resultPlural).toEqual("number is plural")
  })

  it("transforms nested groups", () => {
    const resultSingular = zm`number is {singular ($value)|}`(1)

    const resultPlural = zm`number is {|plural ($value)}`(5)

    expect(resultSingular).toEqual("number is singular (1)")
    expect(resultPlural).toEqual("number is plural (5)")
  })

  it("replaces $value", () => {
    const resultSingular = zm`number is {singular ($value)|}`(1)

    const resultPlural = zm`number is {|plural ($value)}`(5)

    expect(resultSingular).toEqual("number is singular (1)")
    expect(resultPlural).toEqual("number is plural (5)")
  })

})