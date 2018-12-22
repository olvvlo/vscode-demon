'use strict';

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

  context.subscriptions.push(vscode.commands.registerCommand('extension.mapEnum', () => {

    const { Position, window: { activeTextEditor, showInformationMessage } } = vscode;
    try {
      activeTextEditor!.edit((editBuilder) => {
        const selection = activeTextEditor!.selection;
        const position = new Position(selection.active.line, selection.active.character);
        const text = activeTextEditor!.document.getText(selection);
        editBuilder.insert(position, formatEnumMapFromDev(text));
        showInformationMessage('Map success!');
      });
    } catch (error) {
      console.log(error)
      showInformationMessage('Map error!');
    }

  }));
}

export function formatEnumMapFromDev (t: string, fn = (str: string) => (str.split(/\(|,/).filter(Boolean))) {
  const TML = t.replace(/\"/g, '').split(/\),/).filter(Boolean).map((v) => (v.trim())).reduce((acc: any, curr: any) => {
    const properties = { ...acc.properties };
    delete acc.properties;
    return {
      ...acc,
      [fn(curr)[0]]: +fn(curr)[1],
      properties: {
        ...properties,
        [fn(curr)[1]]: {
          ...fn(curr).slice(2).reduce((acc, curr, idx) => ({...acc, [`name${idx ? idx : ''}`]: curr.trim()}), {}),
          value: +fn(curr)[1]
        }
      }
    };
  }, {});
  return `\n${JSON.stringify(TML, null, 2).replace(/"(\w+)":|"-(\w+)":/g, (item) => {
    if (item.match(/"-(\w+)":/)) {
      return `[${item.replace(/"|:/g, '')}]:`;
    }
    return item.replace(/"/g, '');
  })}\n`;
}

export function deactivate() {
}