import { lintHelper } from '../helpers/lint-helper';
import {Rule} from '../custom-ts-rules/noTodoCommentRule';

const ruleName = Rule.metadata.ruleName;
const failureString = Rule.FAILURE_STRING;

describe('No TODO comment', () => {
    describe('RULE APPLICABLE', () => {
        it('should fail with line comment', () => {
            const sourceFile = `// TODO`;

            const result = lintHelper({ sourceFile, ruleName });
            expect(result.errorCount).toBe(1);
            expect(result.failures[0].getFailure()).toBe(failureString)
        });

        it('should fail with block comment', () => {
            const sourceFile = `/* TODO */`;

            const result = lintHelper({ sourceFile, ruleName });
            expect(result.errorCount).toBe(1);
            expect(result.failures[0].getFailure()).toBe(failureString)
        });

        it('should fail with multi line block comment', () => {
            const sourceFile = `
                /*
                    TODO
                */
            `;

            const result = lintHelper({ sourceFile, ruleName });
            expect(result.errorCount).toBe(1);
            expect(result.failures[0].getFailure()).toBe(failureString)
        });

        it('should fail with JSDoc comment', () => {
            const sourceFile = `
                /**
                  * TODO: Fix stuff
                  */
            `;

            const result = lintHelper({ sourceFile, ruleName });
            expect(result.errorCount).toBe(1);
            expect(result.failures[0].getFailure()).toBe(failureString)
        });

        it('should fail with JSDoc comment using property', () => {
            const sourceFile = `
                /**
                  * @todo Fix stuff
                  */
            `;

            const result = lintHelper({ sourceFile, ruleName });
            expect(result.errorCount).toBe(1);
            expect(result.failures[0].getFailure()).toBe(failureString)
        });
    });

    describe('RULE NOT APPLICABLE', () => {
        it('should NOT fail with a simple line comment', () => {
            const sourceFile = `// Variable to hold data`;

            const result = lintHelper({ sourceFile, ruleName });
            expect(result.errorCount).toBe(0);
        });

        it('should NOT fail with a simple block comment', () => {
            const sourceFile = `/* Variable to hold data */`;

            const result = lintHelper({ sourceFile, ruleName });
            expect(result.errorCount).toBe(0);
        });

        it('should NOT fail with a simple multi line comment', () => {
            const sourceFile = `
                /*
                    Variable to hold data
                */
            `;

            const result = lintHelper({ sourceFile, ruleName });
            expect(result.errorCount).toBe(0);
        });

        it('should NOT fail with a JSDoc comment', () => {
            const sourceFile = `
                /**
                  *  Variable to hold data
                  */
            `;

            const result = lintHelper({ sourceFile, ruleName });
            expect(result.errorCount).toBe(0);
        });

        it('should NOT fail with a JSDoc property', () => {
            const sourceFile = `
                /**
                  * @property data Variable to hold data
                  */
            `;

            const result = lintHelper({ sourceFile, ruleName });
            expect(result.errorCount).toBe(0);
        });

        it('should NOT fail with a variable todo', () => {
            const sourceFile = `
                const checkTodoList = true;
            `;

            const result = lintHelper({ sourceFile, ruleName });
            expect(result.errorCount).toBe(0);
        });

        it('should NOT fail with a function todo', () => {
            const sourceFile = `
                function checkTodoList () { /* pending */ }
            `;

            const result = lintHelper({ sourceFile, ruleName });
            expect(result.errorCount).toBe(0);
        });

        it('should NOT fail with a string todo', () => {
            const sourceFile = `
                console.log('TODO list data:', todoData);
            `;

            const result = lintHelper({ sourceFile, ruleName });
            expect(result.errorCount).toBe(0);
        });

        it('should NOT fail with a comment before something with todo', () => {
            const sourceFile = `
                // Debugging log
                console.log('TODO list data:', this.todos);
                
                /*
                    Here we are doing complex operations ...
                */
                const result = this.checkTodoList();
                
                /**
                  * Function to check every item
                  * 
                  * @param force
                  */
                checkTodoList(force?: boolean) {
                    this.todos.forEach(todo => todo.check(force));
                }
            `;

            const result = lintHelper({ sourceFile, ruleName });
            expect(result.errorCount).toBe(0);
        });
    });
});
