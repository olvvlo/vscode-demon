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
        const config = vscode.workspace.getConfiguration('demon');
        editBuilder.insert(position, formatEnumMapFromDev(text, config.keyNum));
        showInformationMessage('Map success!');
      });
    } catch (error) {
      console.log(error);
      showInformationMessage('Map error!');
    }

  }));
}

export function isNumber (num: string) {
  return typeof +num === 'number' && !Number.isNaN(+num) ? +num : num;
}

export function formatEnumMapFromDev(t: string, keyNum: number) {
  let result: any = {};
  let properties: any = {};
  let template = t.match(/[A-Z_\d]+(\(.+\))+/g) || [];
  template.forEach((item) => {
    const array = item.match(/[A-Z_\d]+|\(.+\)/g) || [];
    const vArr = array[1].replace(/\(|\)/g, '').split(',').map((v) => (v.trim().replace(/'|"/g, '')));
    const temp = vArr[keyNum];
    const kv = isNumber(temp);
    const others = vArr.filter((v) => (v !== temp));
    result[array[0]] = kv;
    properties[kv] = {
      value: kv,
      ...others.reduce((acc, curr, idx) => ({
        ...acc, [`name${idx ? idx : ''}`]: isNumber(curr)
      }), {})
    }
  });
  result.properties = properties;
  return `\n${JSON.stringify(result, null, 2).replace(/"(.+)":|"-(.+)":/g, (item) => {
    if (item.match(/"-(.+)":/)) {
      return `[${item.replace(/"|:/g, '')}]:`;
    }
    return item.replace(/"/g, '');
  })}\n`;
}

export function deactivate() {
}