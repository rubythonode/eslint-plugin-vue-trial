/**
 * @author Toru Nagashima
 * @copyright 2016 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict"

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const RuleTester = require("eslint").RuleTester
const rule = require("../../../lib/rules/no-invalid-v-for")

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const tester = new RuleTester({
    parser: "vue-eslint-parser",
    parserOptions: {ecmaVersion: 2015},
})

tester.run("no-invalid-v-for", rule, {
    valid: [
        {
            filename: "test.vue",
            code: "",
        },
        {
            filename: "test.vue",
            code: "<template><div><div v-for=\"x in list\"></div></div></template>",
        },
        {
            filename: "test.vue",
            code: "<template><div><div v-for=\"x of list\"></div></div></template>",
        },
        {
            filename: "test.vue",
            code: "<template><div><div v-for=\"(x, i, k) in list\"></div></div></template>",
        },
        {
            filename: "test.vue",
            code: "<template><div><div v-for=\"(x, i, k) of list\"></div></div></template>",
        },
        {
            filename: "test.vue",
            code: "<template><div><div v-for=\"({id, name}, i, k) of list\"></div></div></template>",
        },
        {
            filename: "test.vue",
            code: "<template><div><div v-for=\"([id, name], i, k) of list\"></div></div></template>",
        },
        {
            filename: "test.vue",
            code: "<template><div><your-component v-for=\"x in list\" :key=\"x.id\"></your-component></div></template>",
            errors: ["'v-for' directives on custom elements require 'v-bind:key' directives."],
        },
    ],
    invalid: [
        {
            filename: "test.vue",
            code: "<template v-for=\"x in list\"><div></div></template>",
            errors: ["The root element can't have 'v-for' directives."],
        },
        {
            filename: "test.vue",
            code: "<template><div v-for=\"x in list\"></div></template>",
            errors: ["The root element can't have 'v-for' directives."],
        },
        {
            filename: "test.vue",
            code: "<template><div><div v-for:aaa=\"x in list\"></div></div></template>",
            errors: ["'v-for' directives require no argument."],
        },
        {
            filename: "test.vue",
            code: "<template><div><div v-for.aaa=\"x in list\"></div></div></template>",
            errors: ["'v-for' directives require no modifier."],
        },
        {
            filename: "test.vue",
            code: "<template><div><div v-for></div></div></template>",
            errors: ["'v-for' directives require that attribute value."],
        },
        {
            filename: "test.vue",
            code: "<template><div><div v-for=\"(,a,b) in list\"></div></div></template>",
            errors: ["Invalid alias ''."],
        },
        {
            filename: "test.vue",
            code: "<template><div><div v-for=\"(a,,b) in list\"></div></div></template>",
            errors: ["Invalid alias ''."],
        },
        {
            filename: "test.vue",
            code: "<template><div><div v-for=\"(a,b,,) in list\"></div></div></template>",
            errors: ["Invalid alias ''."],
        },
        {
            filename: "test.vue",
            code: "<template><div><div v-for=\"(a,{b,c}) in list\"></div></div></template>",
            errors: ["Invalid alias '{b,c}'."],
        },
        {
            filename: "test.vue",
            code: "<template><div><div v-for=\"(a,b,{c,d}) in list\"></div></div></template>",
            errors: ["Invalid alias '{c,d}'."],
        },
        {
            filename: "test.vue",
            code: "<template><div><your-component v-for=\"x in list\"></your-component></div></template>",
            errors: ["'v-for' directives on custom elements require 'v-bind:key' directives."],
        },
    ],
})
