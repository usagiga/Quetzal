// ==UserScript==
// @name         Quetzal
// @namespace    https://github.com/usagiga/Quetzal
// @version      1.1
// @description  Custom CSS for made esa.io pretty.
// @author       Usagigawara
// @match        *.esa.io/posts/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    let applyCSS = () => {
       // Define CSS
       let css = `
.layout-post__main {
    margin: 0 auto;
}

.layout-post__aside-content {
    margin: 0 auto;
}
`;

        // Apply CSS into <head>
        let headElem = document.querySelector("head");
        let styleElem = document.createElement("style");
        styleElem.type = "text/css";
        styleElem.innerText = css;
        headElem.insertAdjacentElement("afterend", styleElem);
    };

    // Event handlers
    let provisionToCLoaded = (container, elem) => {
        let postContElem = document.querySelector(".layout-post__main");
        let tocContElem = container;
        let tocElem = elem;

        // Move ToC to top of the article
        postContElem.insertAdjacentElement("afterbegin", tocElem);
        tocContElem.remove();
    };
    let provisionDocStart = () => {
        applyCSS();
    };
    let provisionDocIdle = ev => {
        // Subscribe events (after DOMContentLoaded)

        // Provision when loaded ToC
        let tocObsCallback = (mrs, ob) => {
            mrs.forEach(mr => {
                if (mr.type !== "childList") return;
                mr.addedNodes.forEach(v => {
                    if (typeof(v.classList) === "undefined") return;
                    if (v.classList.contains("toc-box")) {
                        // Disconnect Mutation
                        ob.disconnect();

                        provisionToCLoaded(mr.target, v);
                        return;
                    }
                });
            });
        }
        let tocContElem = document.querySelector(".layout-post__toc");
        let tocObserver = new MutationObserver(tocObsCallback);
        tocObserver.observe(tocContElem, { childList: true });
    };

    // Subscribe events
    provisionDocStart(); // Provision when document-start
    window.addEventListener("DOMContentLoaded", provisionDocIdle); // Provision when document-idle
})();
