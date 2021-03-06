// ==UserScript==
// @name         Quetzal
// @namespace    https://github.com/usagiga/Quetzal
// @version      1.1
// @description  Custom CSS for made esa.io pretty.
// @author       Usagigawara
// @match        *.esa.io/*
// @grant        none
// @run-at       document-body
// ==/UserScript==

(function() {
    'use strict';

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
    const applyCSS = (css) => {
        const headElem = document.querySelector("head");
        let styleElem = document.createElement("style");
        styleElem.type = "text/css";
        styleElem.innerText = css;
        headElem.insertAdjacentElement("afterend", styleElem);
    };

    // Injections
    let injectAlways = () => {
        const applyCSSHandler = () => {
            // Define CSS
            const css = `
/* White header, search box */
.navbar-sub,
.form-control {
    background-color: inherit;
}
`;

            applyCSS(css);
        };

        // Event handlers
        const provisionDocStart = () => {
            applyCSSHandler();
        };

        // Subscribe events
        provisionDocStart(); // Provision when document-start
    };
    let injectHome = () => {
        const applyCSSHandler = () => {
            // Define CSS
            const css = `
/* Disabling scroll-bar */
.layout-home__left,
.layout-home__right,
.home__main-column {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.layout-home__left::-webkit-scrollbar,
.layout-home__right::-webkit-scrollbar,
.home__main-column {
    display:none;
}

/* White categories */
.layout-home__left,
.navbar-side ul li > a {
    color: rgba(60, 74, 96, 0.5);
    background-color: white;
    border-bottom: 0;
}

.nav-main__item.is-current.is-home .nav-main__link::after {
    border-right: 10px solid white;
}

.navbar-side ul li > a.is-parent .title .fa-plus-square,
.navbar-side ul li > a.is-parent .title .fa-minus-square,
.navbar-side ul li > a.is-parent:hover .title .fa-plus-square,
.navbar-side ul li > a.is-parent:hover .title .fa-minus-square {
    color: rgba(128,128,128,0.5);
}

.navbar-side ul li > a.active {
    background: rgba(0,0,0,0.2);
    color: rgb(60, 74, 96);

    font-weight: bold;
}

/* Disabling border */
.category-heading,
.post-list__item {
    border: 0;
}

/* Set radius into category list items */
.layout-home__left ul li > a {
    border-radius: 0 10px 10px 0;
}

/* Centering the article */
.home__main-column {
    margin: 0 auto;
}
`;

            applyCSS(css);
        };

        // Event handlers
        const provisionDocStart = () => {
            applyCSSHandler();
        };

        // Subscribe events
        provisionDocStart(); // Provision when document-start
    };
    let injectArticle = () => {
        const applyCSSHandler = () => {
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

            applyCSS(css);
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
            applyCSSHandler();
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
    };
    let injectSearch = () => {
        const applyCSSHandler = () => {
            // Define CSS
            const css = `
/* Centering Search */
.layout-search__main {
    margin: 0 auto;
}

/* Disabling manual of search option */
.layout-search__right {
    display: none;
}

/* Disabling border */
.sorter li,
.sorter li:first-child,
.search__pagenate,
.post-list__item,
.viewer-action li {
    border: 0;
}
`;

            applyCSS(css);
        };

        // Event handlers
        const provisionDocStart = () => {
            applyCSSHandler();
        };

        // Subscribe events
        provisionDocStart(); // Provision when document-start
    };
    let injectSettings = () => {
        const applyCSSHandler = () => {
            // Define CSS
            const css = `
/* Centering contents */
.layout-settings__content {
    margin: 0 auto;
}
`;

            applyCSS(css);
        };

        // Event handlers
        const provisionDocStart = () => {
            applyCSSHandler();
        };

        // Subscribe events
        provisionDocStart(); // Provision when document-start
    };
    let injectTags = () => {
        const applyCSSHandler = () => {
            // Define CSS
            const css = `
/* Centering contents */
.layout-wrapper {
    margin: 0 auto;
}
`;

            applyCSS(css);
        };

        // Event handlers
        const provisionDocStart = () => {
            applyCSSHandler();
        };

        // Subscribe events
        provisionDocStart(); // Provision when document-start
    };

    // Applying injection
    let pageUrl = new URL(window.location.href);
    let path = pageUrl.pathname;

    injectAlways();
    if (path === "/") injectHome();
    if (path === "/posts") injectSearch();
    if (path === "/tags") injectTags();
    if (
        path.indexOf("/team") !== -1 ||
        path.indexOf("/members") !== -1 ||
        path.indexOf("/user") !== -1
    ) injectSettings();
    if (path.indexOf("/posts/") !== -1) injectArticle();
})();
