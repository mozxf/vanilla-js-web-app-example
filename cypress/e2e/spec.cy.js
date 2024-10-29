import { invalidInputsTest } from "./scenarios/InvalidInputs.cy"; 
import { validInputsWithEnterTest } from "./scenarios/ValidInputsWithEnter.cy";

describe('Image registration', () => {

  invalidInputsTest()
  validInputsWithEnterTest()
})
