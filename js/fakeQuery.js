'use strict';
export function jq() {
  return {
    elem: {
      newElem: (elemType) => {
        return document.createElement(elemType);
      },
      getElemId: (id) => {
        return document.getElementById(id);
      },
      getElemSelector: function (selector) {
        return document.querySelector(selector);
      },
      append: (parent, child) => {
        parent.appendChild(child);
      }
    }
  };
}

