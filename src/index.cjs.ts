// Workaround for mixing named and default exports, see https://github.com/developit/microbundle/issues/712
import { mz as mehrzahl, zm } from "./mehrzahl"
Object.assign(mehrzahl, { mz: mehrzahl, zm })
export default mehrzahl
