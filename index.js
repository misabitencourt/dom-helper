window.getEl = (el, ref) => {
    el = el || window.document.body
    let result = el.querySelector(`[data-ref='${ref || ''}']`)
    if (result) {
        return result
    }

    return el.querySelector(ref)
}

window.getParent = (el, selector) => {
    if (! (el && selector)) {
        return null;
    }

    let parent = el.parentElement;
    do {
        if (! parent) {
            return null;
        } else if (parent.matches(selector)) {
            return parent;
        }
        parent = parent.parentElement;
    } while (true);
}

window.getParents = (el, selector) => {
    let result = [];

    if (! (el && selector)) {
        return result;
    }

    let parent = el.parentElement;
    while (parent) {        
        parent.matches(selector) && result.push(parent);        
        parent = parent.parentElement;
    }

    return result;
}

window.elUpLevel = (el, levels) => {
    if (!(el && levels) || isNaN(levels) || levels<0) {
        return el
    }

    let result = el;
    for (let i=0; i<levels; i++) {
        result = result.parentElement || result
    }

    return result;
}

window.limitText = (str, size, onlyXs, removeDots) => {
    if (onlyXs && (window.innerWidth > 600)) {
        size *= 2
    }

    if (str.length < size) {
        return str
    }

    return `${str.substr(0, size-1)}${removeDots ? '' : '...'}`
}

window.elClassToggle = (el, className) => {
    if (! (el && className)) {
        return
    }
    if (el.classList && el.classList.toggle) {
        return el.classList.toggle(className)
    }
    
    // Damn IE10
    el.className = el.className.indexOf(className) === -1 ?
                    (el.className += ` ${className}`) :
                    el.className.split(className).join('');
}

window.hasClass = (el, className) => {
    return (el.className || '').indexOf(className) !== -1
}

window.addClasses = (els, className) => {
    els.forEach((el) => addClass(el, className))
}

window.removeClasses = (els, className) => {
    els.forEach((el) => removeClass(el, className))
}

window.addClass = (el, className) => {
    if (! (el && className)) {
        return;
    }

    el.className = el.className || ''
    el.className += ` ${className}`

    return el;
}

window.removeClass = (el, className) => {
    if (! (el && className)) {
        return;
    }

    el.className = el.className || ''
    el.className = el.className.split(className).join('')

    return el;
}

window.getEls = (el, selector) => {
    if (! (el && selector)) {
        return;
    }

    let result = []
    let els = el.querySelectorAll(selector)
    for (let i=0; i<els.length; i++) {
        result.push(els[i])
    }

    return result
}

window.killEl = (el) => {
    if (! (el && el.parentElement)) {
        return;
    }

    el.parentElement.removeChild(el)
}

window.killEls = (els) => {
    els.forEach((el) => killEl(el))
}

window.createEl = (tagName, className, parent, textContent) => {
    let el = document.createElement(tagName)
    el.className = className || ''
    if (textContent) {
        el.textContent = textContent
    }
    parent.appendChild(el)

    return el;
}

window.createEls = (tagName, className, parent, childs, textContent) => {
    let el = createEl(tagName, className, parent, textContent);

    (parent || document.body).appendChild(el);
    (childs || []).forEach((child) => {
        let childEl = createEls(child.tag, child.className, 
                                el, child.children, child.textContent);
        if (child.bootstrap) {
            child.bootstrap(child)
        }
        if (child.on && child.on.length === 2) {
            childEl.addEventListener(child.on[0], child.on[1].bind(child))
        }
        if (child.type) {
            childEl.type = child.type
            childEl.name = child.name
        }
        if (child.attrs) {
            for (let i in child.attrs) {
                childEl.setAttribute(i, child.attrs[i])
            }
        }
    })
    
    return el
}

window.elRemoveEvt = (el) => {
    let clone = el.cloneNode()
    clone.innerHTML = el.innerHTML
    if (! el.parentNode) {
        return null
    }
    el.parentNode.replaceChild(clone, el)

    return clone
}


export default 1