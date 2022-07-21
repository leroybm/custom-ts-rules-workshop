import * as Lint from 'tslint';
import * as ts from 'typescript';

export class Rule extends Lint.Rules.AbstractRule {
    public static metadata: Lint.IRuleMetadata = {
        ruleName: 'no-todo-comment',
        description: 'no-todo-comment',
        options: null,
        optionsDescription: null,
        optionExamples: [true],
        type: 'formatting',
        typescriptOnly: false,
        hasFix: false,
        requiresTypeInfo: true,
    };

    public static COMMENT_TODO_REGEX = /((\/\*{1,2})(.|\n)*todo(.|\n)*(\*\/))|((\/\/).*todo)/i;
    public static FAILURE_STRING = 'No TODO comments';

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithFunction(sourceFile, walk);
    }
}

function walk(ctx: Lint.WalkContext<void>) {
    function cb(node: ts.Node): void {
        if (Rule.COMMENT_TODO_REGEX.test(node.getFullText())) {
            const fix = new Lint.Replacement(node.getStart(), node.getWidth(), ""); // Remove TODO

            ctx.addFailureAt(node.getStart(), node.getWidth(), Rule.FAILURE_STRING, fix);
        }

        return ts.forEachChild(node, cb);
    }

    return ts.forEachChild(ctx.sourceFile, cb);
}
