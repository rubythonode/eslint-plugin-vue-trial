# Disallow confusing `v-for` and `v-if` on the same element (no-confusing-v-for-v-if)

> When they exist on the same node, `v-for` has a higher priority than `v-if`. That means the `v-if` will be run on each iteration of the loop separately.
>
> https://vuejs.org/v2/guide/list.html#v-for-with-v-if

So when they exist on the same node, `v-if` directive should use the reference which is to the variables which are defined by the `v-for` directives.

## 📖 Rule Details

This rule reports the elements which have both `v-for` and `v-if` directives if the following cases:

- The `v-if` directive does not use the reference which is to the variables which are defined by the `v-for` directives.

In that case, the `v-if` should be written on the wrapper element.

👎 Examples of **incorrect** code for this rule:

```html
<template>
    <div>
        <ol>
            <li v-if="shown" v-for="item in items">{{item.message}}</li>
        </ol>
    </div>
</template>
```

👍 Examples of **correct** code for this rule:

```html
<template>
    <div>
        <ol>
            <li v-for="item in items" v-if="item.shown">{{item.message}}</li>
        </ol>
    </div>
</template>
```

```html
<template>
    <div>
        <ol v-if="shown">
            <li v-for="item in items">{{item.message}}</li>
        </ol>
    </div>
</template>
```

## 🔧 Options

Nothing.
