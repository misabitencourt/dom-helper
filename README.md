# dom-helper
Window global DOM manipulation functions

# How to use

```html
<!-- HTML for sample -->
<div class="container">
    <div class="sample">
        <ul class="mylist">
            <li data-ref="item">My item</li>
        </ul>
    </div>
</div>
```

Getting single element
```javascript
// Get native dom element <div class="sample">
// First arg is an element and the second is a selector 
// Returns ONE element inside the first arg
getEl(document.body, '.sample')

// If it has an element with data-ref, the function is return if it matches
getEl(document.body, 'item')
```

Getting multiple elements
```javascript
// Same behavior as getEl, but this function returns as array of elements
let sample = getEl(document.body, '.sample')
getEls(sample, 'ul, li') // Array of native dom elements

getEls(document.body, 'div') // Array of native dom elements
```

Getting element parent up level
```javascript
let parentOfParentOfParent = elUpLevel(el, 3) // 3 levels
```

Getting limited part of tex...
```javascript
// First parameter: the text
// Second: Word size limit
// Third: Limit the text only on small screens (width = 600px is the breakpoint) 
// Fourth: true if you need to remove the dots

let str = limitText('One big and large text', 7, false, false)
console.log(str) // One big...
```

Class toggle
```javascript

let el = getEl(div, '.mydiv') // <div class="mydiv"></div>

// Just a css class toggle
elClassToggle(el, 'active') // <div class="mydiv active"></div>
elClassToggle(el, 'active') // <div class="mydiv"></div>
```

Check if element has some css class
```javascript

let el = getEl(document.body, '#my-element') // <div id="my-element" class="item active"></div>
let isActive = hasClass(el, 'active')

console.log(isActive) // true

```

Add some css class name
```javascript

let el = getEl(document.body, '#my-element') // <div id="my-element" class="item active"></div>

addClass(el, 'danger') // Add Class

console.log(el) // <div id="my-element" class="item active danger"></div>
```

Add class for element array
```javascript

// Array version of add class
let els = getEls(document.body, 'div') // Array of divs

// Add class
addClasses(els, 'active') // Add class active for all divs
```

Remove class
```javascript

let el = getEl(document.body, '#my-element') // <div id="my-element" class="item active"></div>
removeClass(el, 'active') // Remove class
console.log(el) // <div id="my-element" class="item"></div>
```

Remove class for element array
```javascript

let el = getEl(document.body, '#my-element') // <div id="my-element" class="item active"></div>
removeClass(el, 'active') // Remove class
console.log(el) // <div id="my-element" class="item"></div>
```

Remove dom element
```javascript

let el = getEl(document.body, '#my-element')
killEl(el) // Element is deleted
```

Remove dom elements (array)
```javascript

let els = getEl(list, 'li')
killEls(els) // Element is deleted
```

Create single element
```javascript

// First parameter: Tag name
// Second: className
// Third: parent element
// Forth: childrens **Nullable
// Fifth: textContent **Nullable
let el = createEl('h1', 'great-title text-primary', document.body, [], 'Hello')

// Just the required parameters
let el2 = createEl('h1', 'great-title text-primary', document.body)
el2.textContent = 'Hello'
```

Create dom tree element
```javascript

createEls('div', className, el, [

    {tag: 'div', className: 'navbar', children: [
            {tag: 'div', className: 'navbar-inner', children: [
                {tag: 'div', className: 'left'},
                {tag: 'div', className: 'center', textContent: 'Hello'},
                {tag: 'div', className: 'right'}
            ]}
        ]
    },

    {tag: 'div', className: 'toolbar', children: [
            {tag: 'div', className: 'toolbar-inner', children: [
                {tag: 'div', className: 'left'},
                {tag: 'div', className: 'center', textContent: 'Hello'},
                {tag: 'div', className: 'right'}
            ]}
        ]
    }
])
```