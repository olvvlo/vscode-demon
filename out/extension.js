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
                editBuilder.insert(position, formatEnumMapFromDev(text));
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
function formatEnumMapFromDev(t) {
    let result = {};
    let properties = {};
    let template = t.match(/[A-Z]+(\(.+\))+/g) || [];
    template.forEach((item) => {
        const array = item.match(/[A-Z]+|\(.+\)/g) || [];
        const vArr = array[1].replace(/\(|\)/g, '').split(',').map((v) => (v.trim().replace(/'|"/g, '')));
        const temp = vArr.find((v) => (+v === 0 || !!(+v)));
        const kv = temp ? +temp : vArr[0];
        const others = vArr.filter((v) => (v !== (temp || vArr[0])));
        result[array[0]] = kv;
        properties[kv] = Object.assign({ value: kv }, others.reduce((acc, curr, idx) => (Object.assign({}, acc, { [`name${idx ? idx : ''}`]: curr })), {}));
    });
    result.properties = properties;
    return `\n${JSON.stringify(result, null, 2).replace(/"(\w+)":|"-(\w+)":/g, (item) => {
        if (item.match(/"-(\w+)":/)) {
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