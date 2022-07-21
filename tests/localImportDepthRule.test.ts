import { lintHelper } from '../helpers/lint-helper';
import {Rule} from '../custom-ts-rules/localImportDepthRule';

const ruleName = 'local-import-depth';
const failureString = Rule.FAILURE_STRING;

describe('No N depth local imports', () => {
    describe('RULE APPLICABLE', () => {
        it('should fail with two depth local import', () => {
            const ruleName = 'local-import-depth';
            const failureString = Rule.FAILURE_STRING;
            const sourceFile = `import { NetworkUser } from '../../network/network-users/models';`;

            const result = lintHelper({ sourceFile, ruleName }); // Creates a linter and runs over our sourceFile
            expect(result.errorCount).toBe(1);
            expect(result.failures[0].getFailure()).toBe(failureString)
        });

        it('should fail with three depth local import', () => {
            const sourceFile = `import { NetworkUser } from '../../../network/network-users/models';`;

            const result = lintHelper({ sourceFile, ruleName });
            expect(result.errorCount).toBe(1);
            expect(result.failures[0].getFailure()).toBe(failureString)
        });

        it('should fail with three five local import', () => {
            const sourceFile = `import { NetworkUser } from '../../../../../network/network-users/models';`;

            const result = lintHelper({ sourceFile, ruleName });
            expect(result.errorCount).toBe(1);
            expect(result.failures[0].getFailure()).toBe(failureString)
        });

        it('should fail when importing styles', () => {
            const sourceFile = `import '../../styles.scss';`;

            const result = lintHelper({ sourceFile, ruleName });
            expect(result.errorCount).toBe(1);
            expect(result.failures[0].getFailure()).toBe(failureString)
        });
    });

    describe('RULE NOT APPLICABLE', () => {
        it('should NOT fail with one depth local import', () => {
            const sourceFile = `import { NetworkUser } from '../network/network-users/models';`;

            const result = lintHelper({ sourceFile, ruleName });
            expect(result.errorCount).toBe(0);
        });

        it('should NOT fail with style import', () => {
            const sourceFile = `import * as React from 'react'`;

            const result = lintHelper({ sourceFile, ruleName });
            expect(result.errorCount).toBe(0);
        });

        it('should NOT fail with node_module import using `as` keyword', () => {
            const sourceFile = `import * as moment from 'moment';`;

            const result = lintHelper({ sourceFile, ruleName });
            expect(result.errorCount).toBe(0);
        });

        it('should NOT fail with node_module import with only one imported element', () => {
            const sourceFile = `import differenceBy from 'lodash-es/differenceBy';`;

            const result = lintHelper({ sourceFile, ruleName });
            expect(result.errorCount).toBe(0);
        });

        it('should NOT fail with node_module import with only one imported element', () => {
            const sourceFile = `import differenceBy from 'lodash-es/differenceBy';`;

            const result = lintHelper({ sourceFile, ruleName });
            expect(result.errorCount).toBe(0);
        });

        it('should NOT fail with node_module import with multiple imported elements', () => {
            const sourceFile = `import { async, ComponentFixture, TestBed } from '@angular/core/testing';`;

            const result = lintHelper({ sourceFile, ruleName });
            expect(result.errorCount).toBe(0);
        });
    });
});
