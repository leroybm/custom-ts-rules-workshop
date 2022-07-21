import * as Lint from 'tslint';
import * as ts from 'typescript';
import * as tsutils from 'tsutils';

export class Rule extends Lint.Rules.AbstractRule {
    public static metadata: Lint.IRuleMetadata = {
        ruleName: 'local-import-depth',
        description: 'local-import-depth',
        options: null,
        optionsDescription: null,
        optionExamples: [true],
        type: 'formatting',
        typescriptOnly: false,
        hasFix: false,
        requiresTypeInfo: true,
    };

    public static IMPORT_DEPTH_REGEX = /(["']\.\.\/\.\.)/i;
    public static FAILURE_STRING = 'Local imports should be absolute or have a file depth of less than 2';

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithFunction(sourceFile, walk);
    }
}

function walk(ctx: Lint.WalkContext<void>) {
    function cb(node: ts.Node): void {
        if (tsutils.isImportDeclaration(node) && Rule.IMPORT_DEPTH_REGEX.test(node.getFullText())) {
            ctx.addFailureAt(node.getStart(), node.getWidth(), Rule.FAILURE_STRING);
        }

        return ts.forEachChild(node, cb);
    }

    return ts.forEachChild(ctx.sourceFile, cb);
}
