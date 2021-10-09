# mehrzahl

[![npm version](https://badgen.net/npm/v/mehrzahl)](https://www.npmjs.com/package/mehrzahl)
![Bundlephobia Minzipped Size](https://badgen.net/bundlephobia/minzip/mehrzahl)
![build workflow](https://github.com/JoschuaSchneider/mehrzahl/actions/workflows/build.yml/badge.svg?branch=main)
![test workflow](https://github.com/JoschuaSchneider/mehrzahl/actions/workflows/test.yml/badge.svg?branch=main)
![TypeScript](https://badgen.net/badge/-/TypeScript/blue?icon=typescript&label)
![License: MIT](https://badgen.net/npm/license/mehrzahl)

Tiny utility to format parts of a template string in singular or plural.

### Installation

```bash
npm i mehrzahl
```
```bash
yarn add mehrzahl
```

### Usage

```ts
import { mz } from "mehrzahl"
// import mz from "mehrzahl" // default import

const str = mz(1)`There {was|were} $value person{|s} at this event.`
// str = "There was 1 person at this event."
const str = mz(5)`There {was|were} $value person{|s} at this event.`
// str = "There were 5 persons at this event."
```
#### Reversed

```ts
import { zm } from "mehrzahl"
// import zm from "mehrzahl" // default import

const template = zm`There {was|were} $value person{|s} at this event.`
template(5)
// There were 5 persons at this event.
template(0)
// There was 1 person at this event.
```

💡 `$value` is replaced by the amount specified.

#### Singular/Plural tuples

```ts
const str = mz(1)`There ${['was', 'were']} $value person${[,'s']} at this event.`
// str = "There was 1 person at this event."
const str = mz(5)`There ${['was', 'were']} $value person${[,'s']} at this event.`
// str = "There were 5 persons at this event."
```

💡 Left or right value of the delimiter `|` can be omitted:
`{|plural}` or `{singular|}`

💡 First or second value of tuples can be omitted:
`[,'plural']` or `['singular']`

**Singular/Plural formatter function**

```ts
const wasWereFormatter = (plural) => plural ? 'were' : 'was'
const personPersonsFormatter = (plural) => plural ? 'persons' : 'person'

const str = mz(1)`There ${wasWereFormatter} $value ${personPersonsFormatter} at this event.`
// str = "There was 1 person at this event."
const str = mz(5)`There ${wasWereFormatter} $value ${personPersonsFormatter} at this event.`
// str = "There were 5 persons at this event."
```

#### Customizing the delimiter
Pass your custom delimiter as a second argument.
```ts
const str = mz(1, ';')`There {was;were} $value person{;s} at this event.`
```

## Contributions

Contributions are always welcome.

Feel free to open issues or pull requests!