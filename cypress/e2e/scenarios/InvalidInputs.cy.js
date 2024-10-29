import assert from 'assert'
import { colors } from '../models/Colors';
import { RegisterForm } from '../models/RegisterForm';

const registerForm = new RegisterForm();

/** Test case for when user tries to submit the form without title or URL values */
export const invalidInputsTest = () => describe('Submitting an image with invalid inputs', () => {

    after(() => {
      cy.clearAllLocalStorage()
    })

    const input = {
      title: '',
      url: ''
    };

    it("Given i'm in the image registration page", () => {
      cy.visit('/')
    })
    it(`When I enter ${input.title} in the title field`, () => {
      registerForm.typeTitle(input.title)
    });
    it(`When I enter ${input.url} in the url field`, () => {
      registerForm.typeUrl(input.url)
    });
    it(`Then I click the submit button`, () => {
      registerForm.clickSubmit()
    });
    it(`Then I should see "Please type a title for the image" message above the title field`, () => {
      const expectedError = 'Please type a title for the image.'
      registerForm.elements.titleFeedback().should('contain', expectedError)
      // registerForm.elements.titleFeedback().should(element => {
      //   debugger
      // })
    });
    it(`Then I should see "Please type a valid URL" message above the title field`, () => {
      const expectedError = 'Please type a valid URL'
      registerForm.elements.urlFeedback().should('contain', expectedError)
    });
    it(`Then I should see an exclamation icon in the title and URL fields`, () => {
      registerForm.elements.titleInput().should(([element]) => {
        const styles = window.getComputedStyle(element);
        const border = styles.getPropertyValue('border-right-color');
        assert.strictEqual(border, colors.error)
       
      })
    });
  })