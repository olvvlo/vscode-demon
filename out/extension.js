'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand('extension.mapEnum', () => {
        const { Position, window: { activeTextEditor, showInformationMessage } } = vscode;
        try {
            activeTextEditor.edit((editBuilder) => {
                const selection = activeTextEditor.selection;
                const position = new Position(selection.active.line, selection.active.character);
                const text = activeTextEditor.document.getText(selection);
                const config = vscode.workspace.getConfiguration('demon');
                editBuilder.insert(position, formatEnumMapFromDev(text, config.keyNum));
                showInformationMessage('Map success!');
            });
        }
        catch (error) {
            console.log(error);
            showInformationMessage('Map error!');
        }
    }));
}
exports.activate = activate;
function isNumber(num) {
    return typeof +num === 'number' && !Number.isNaN(+num) ? +num : num;
}
exports.isNumber = isNumber;
function formatEnumMapFromDev(t, keyNum) {
    let result = {};
    let properties = {};
    let template = t.match(/[A-Z_\d]+(\(.+\))+/g) || [];
    template.forEach((item) => {
        const array = item.match(/[A-Z_\d]+|\(.+\)/g) || [];
        const vArr = array[1].replace(/\(|\)/g, '').split(',').map((v) => (v.trim().replace(/'|"/g, '')));
        const temp = vArr[keyNum];
        const kv = isNumber(temp);
        const others = vArr.filter((v) => (v !== temp));
        result[array[0]] = kv;
        properties[kv] = Object.assign({ value: kv }, others.reduce((acc, curr, idx) => (Object.assign({}, acc, { [`name${idx ? idx : ''}`]: isNumber(curr) })), {}));
    });
    result.properties = properties;
    return `\n${JSON.stringify(result, null, 2).replace(/"(.+)":|"-(.+)":/g, (item) => {
        if (item.match(/"-(.+)":/)) {
            return `[${item.replace(/"|:/g, '')}]:`;
        }
        return item.replace(/"/g, '');
    })}\n`;
}
exports.formatEnumMapFromDev = formatEnumMapFromDev;
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map