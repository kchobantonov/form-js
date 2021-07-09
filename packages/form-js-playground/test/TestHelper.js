// @ts-ignore-next-line
import formCSS from '@bpmn-io/form-js/dist/assets/form-js.css';

// @ts-ignore-next-line
import formEditorCSS from '@bpmn-io/form-js/dist/assets/form-js-editor.css';

// @ts-ignore-next-line
import dragulaCSS from '@bpmn-io/form-js/dist/assets/dragula.css';

// @ts-ignore-next-line
import testCSS from './test.css';

export function isSingleStart(topic) {

  // @ts-ignore-next-line
  return window.__env__ && window.__env__.SINGLE_START === topic;
}

export function insertStyles() {
  insertCSS('form-js.css', formCSS);
  insertCSS('form-js-editor.css', formEditorCSS);
  insertCSS('dragula.css', dragulaCSS);
  insertCSS('test.css', testCSS);
}

export function insertCSS(name, css) {
  if (document.querySelector('[data-css-file="' + name + '"]')) {
    return;
  }

  const head = document.head || document.getElementsByTagName('head')[0];
  const style = document.createElement('style');
  style.setAttribute('data-css-file', name);

  style.type = 'text/css';
  style.appendChild(document.createTextNode(css));

  head.appendChild(style);
}