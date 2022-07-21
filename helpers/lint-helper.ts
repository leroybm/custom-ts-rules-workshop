import { Linter, Configuration } from 'tslint';
import * as TSLintConfig from '../tslint.json';

// This utility helps to test ts-lint custom rules
export const lintHelper = ({ sourceFile, ruleName }: { sourceFile: string, ruleName: string }) => {
    const lint = new Linter( { fix: false });

    const getRuleOptions = TSLintConfig.rules[ruleName];
    lint.lint('', sourceFile, Configuration.parseConfigFile({
        rules: {
            [ruleName]: Array.isArray(getRuleOptions) ? [...getRuleOptions] : getRuleOptions,
        },
        rulesDirectory: TSLintConfig.rulesDirectory,
    }));

    return lint.getResult();
};

// This utility helps to retrieve error lines
export const getErrorLines = (failures: any[]) => {
    return failures.map((failure) => {
        const start = failure.startPosition.position;
        const end = failure.endPosition.position;
        return failure.sourceFile.text.substr(start, failure.sourceFile.text.length - end);
    });
};
