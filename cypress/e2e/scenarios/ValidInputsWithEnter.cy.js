import assert from 'assert'
import { RegisterForm } from "../models/RegisterForm"
import { colors } from '../models/Colors';

const registerForm = new RegisterForm();
export const validInputsWithEnterTest = () => describe('Submitting an image with valid inputs using enter key', () => {

    after(() => {
        // cy.clearAllLocalStorage()
    })
    
    const input = {
        title: "Alien BR",
        url: "https://cdn.mos.cms.futurecdn.net/eM9EvWyDxXcnQTTyH8c8p5-1200-80.jpg"
    };
    let initialListLength = 0

    it("Given I'm in image registration page", () => {
        cy.visit('/')
         registerForm.elements.cardList().should(([element]) => {
            initialListLength = element.children.length
        })
    });
    it(`When I enter ${input.title} in the title field`, () => {
        registerForm.typeTitle(input.title)
        registerForm.elements.titleInput().type('{enter}')
    });
    it(`Then I should see a check icon in the title field`, () => {
        registerForm.elements.titleInput(input.title).should(([element]) => {
           checkSuccessBorder(element)
        })
    });
    it(`When I enter ${input.url} in the url field`, () => {
        registerForm.typeUrl(input.url)
    });
    it(`Then I should see a check icon in the imageUrl field`, () => {
        registerForm.elements.imageUrlInput(input.url).should(([element]) => {
            checkSuccessBorder(element)
        })
    });
    it('Then I can hit enter to submit the form', () => {
        registerForm.elements.imageUrlInput().type('{enter}')
    })
    it('And the list of registered images should be updated with the new item', () => {
       cy.wait(500)
            registerForm.elements.cardList().should(([element]) => {
                const updatedLength = element.children.length;
                assert.strictEqual(initialListLength + 1, updatedLength)
                debugger
            })
        
    })
})


function checkSuccessBorder(element) {
    const styles = window.getComputedStyle(element);
    const border = styles.getPropertyValue("border-left-color");
    assert.strictEqual(border, colors.success)
}