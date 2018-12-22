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
function formatEnumMapFromDev(t, fn = (str) => (str.split(/\(|,/).filter(Boolean))) {
    const TML = t.replace(/\"/g, '').split(/\),/).filter(Boolean).map((v) => (v.trim())).reduce((acc, curr) => {
        const properties = Object.assign({}, acc.properties);
        delete acc.properties;
        return Object.assign({}, acc, { [fn(curr)[0]]: +fn(curr)[1], properties: Object.assign({}, properties, { [fn(curr)[1]]: Object.assign({}, fn(curr).slice(2).reduce((acc, curr, idx) => (Object.assign({}, acc, { [`name${idx ? idx : ''}`]: curr.trim() })), {}), { value: +fn(curr)[1] }) }) });
    }, {});
    return `\n${JSON.stringify(TML, null, 2).replace(/"(\w+)":|"-(\w+)":/g, (item) => {
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