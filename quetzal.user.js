// ==UserScript==
// @name         Quetzal
// @namespace    https://github.com/usagiga/Quetzal
// @version      1.0
// @description  Custom CSS for made esa.io pretty.
// @author       Usagigawara
// @match        *.esa.io/posts/*
// @grant        none
// @run-at        document-start
// ==/UserScript==

(function() {
    'use strict';

    // Define CSS
    let css = `
.layout-post__main {
    margin: 0 auto;
}
`;

    // Apply CSS into <head>
    let styleElem = document.createElement("style");
    styleElem.type = "text/css";
    styleElem.innerText = css;
    document.head.appendChild(styleElem);
})();
