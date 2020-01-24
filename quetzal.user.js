// ==UserScript==
// @name         Quetzal
// @namespace    https://github.com/usagiga/Quetzal
// @version      beta1.1
// @description  Custom CSS for made esa.io pretty.
// @author       Usagigawara
// @match        *.esa.io/posts/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const applyCSS = () => {
       // Define CSS
       const css = `
/* Centering Article */
.layout-post__main {
    margin: 0 auto;
}

.layout-post__aside-content {
    margin: 0 auto;
}

/* Always enableing accordion menu */
.link-with-icon {
    display: initial;
}

/* Disabling floating ToC */
.layout-post__toc {
    display: none;
}

/* Disabling border */
.post-header,
.layout-post__aside,
.viewer-action__item {
    border: 0;
}
`;

        // Apply CSS into <head>
        const headElem = document.querySelector("head");
        let styleElem = document.createElement("style");
        styleElem.type = "text/css";
        styleElem.innerText = css;
        headElem.insertAdjacentElement("afterend", styleElem);
    };

    // Helpers
    const subscribeUpdatingElem = (target, handler) => {
        const observer = new MutationObserver(handler);
        observer.observe(target, { childList: true });
    };
    const subscribeInsertingElem = (targetClass, targetParent, handler) => {
        const observerCallback = (mrs, ob) => {
            mrs.forEach(mr => {
                if (mr.type !== "childList") return;
                mr.addedNodes.forEach(v => {
                    if (typeof(v.classList) === "undefined") return;
                    if (!v.classList.contains(targetClass)) return;

                    // Disconnect Mutation
                    ob.disconnect();

                    handler(mr.target, v);
                    return;
                });
            });
        };

        subscribeUpdatingElem(targetParent, observerCallback);
    };

    // Event handlers
    const provisionToCLoaded = (container, elem) => {
        const postContElem = document.querySelector(".layout-post__main");
        const tocElem = elem;

        // Move ToC to top of the article
        postContElem.insertAdjacentElement("afterbegin", tocElem);
    };
    const provisionToCAccordionLoaded = (container, elem) => {
        const postContElem = document.querySelector(".layout-post__main");
        const accElem = elem;
        const accCaret = accElem.querySelector(".fa-caret-right");
        const tocElem = document.querySelector(".toc-box");
        const tocStyle = tocElem.getAttribute("style");

        // Move the accordion to top of the article
        postContElem.insertAdjacentElement("afterbegin", accElem);

        // Close Accordion
        if (tocStyle !== null) return;
        tocElem.setAttribute("style", "display: none;");
        accCaret.classList.remove("fa-rotate-90");
    };
    const provisionDocStart = () => {
        applyCSS();
    };
    const provisionDocIdle = ev => {
        // Subscribe events (after DOMContentLoaded)

        // Provision when loaded ToC
        const tocContElem = document.querySelector(".layout-post__toc");
        subscribeInsertingElem("toc-box", tocContElem, provisionToCLoaded);
        subscribeInsertingElem("link-with-icon", tocContElem, provisionToCAccordionLoaded);
    };

    // Subscribe events
    provisionDocStart(); // Provision when document-start
    window.addEventListener("DOMContentLoaded", provisionDocIdle); // Provision when document-idle
})();
