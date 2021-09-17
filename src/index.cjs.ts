// Workaround for mixing named and default exports, see https://github.com/developit/microbundle/issues/712
import { mz as mehrzahl } from "./mehrzahl"
Object.assign(mehrzahl, { mz: mehrzahl })
export default mehrzahl