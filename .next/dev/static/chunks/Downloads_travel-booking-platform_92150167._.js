(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Downloads/travel-booking-platform/components/ui/label.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Label",
    ()=>Label
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/@radix-ui/react-label/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
function Label({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "label",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-booking-platform/components/ui/label.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = Label;
;
var _c;
__turbopack_context__.k.register(_c, "Label");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/travel-booking-platform/components/ui/form.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Form",
    ()=>Form,
    "FormControl",
    ()=>FormControl,
    "FormDescription",
    ()=>FormDescription,
    "FormField",
    ()=>FormField,
    "FormItem",
    ()=>FormItem,
    "FormLabel",
    ()=>FormLabel,
    "FormMessage",
    ()=>FormMessage,
    "useFormField",
    ()=>useFormField
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/components/ui/label.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const Form = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormProvider"];
const FormFieldContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"]({});
const FormField = ({ ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FormFieldContext.Provider, {
        value: {
            name: props.name
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Controller"], {
            ...props
        }, void 0, false, {
            fileName: "[project]/Downloads/travel-booking-platform/components/ui/form.tsx",
            lineNumber: 40,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-booking-platform/components/ui/form.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = FormField;
const useFormField = ()=>{
    _s();
    const fieldContext = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](FormFieldContext);
    const itemContext = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](FormItemContext);
    const { getFieldState } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormContext"])();
    const formState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormState"])({
        name: fieldContext.name
    });
    const fieldState = getFieldState(fieldContext.name, formState);
    if (!fieldContext) {
        throw new Error('useFormField should be used within <FormField>');
    }
    const { id } = itemContext;
    return {
        id,
        name: fieldContext.name,
        formItemId: `${id}-form-item`,
        formDescriptionId: `${id}-form-item-description`,
        formMessageId: `${id}-form-item-message`,
        ...fieldState
    };
};
_s(useFormField, "uYMhrJS1fbT4Yzmfu2feET1emX0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormContext"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFormState"]
    ];
});
const FormItemContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"]({});
function FormItem({ className, ...props }) {
    _s1();
    const id = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"]();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FormItemContext.Provider, {
        value: {
            id
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            "data-slot": "form-item",
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('grid gap-2', className),
            ...props
        }, void 0, false, {
            fileName: "[project]/Downloads/travel-booking-platform/components/ui/form.tsx",
            lineNumber: 81,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-booking-platform/components/ui/form.tsx",
        lineNumber: 80,
        columnNumber: 5
    }, this);
}
_s1(FormItem, "WhsuKpSQZEWeFcB7gWlfDRQktoQ=");
_c1 = FormItem;
function FormLabel({ className, ...props }) {
    _s2();
    const { error, formItemId } = useFormField();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
        "data-slot": "form-label",
        "data-error": !!error,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('data-[error=true]:text-destructive', className),
        htmlFor: formItemId,
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-booking-platform/components/ui/form.tsx",
        lineNumber: 97,
        columnNumber: 5
    }, this);
}
_s2(FormLabel, "Z4R+rKjylfAcqmbRnqWEg1TfTcg=", false, function() {
    return [
        useFormField
    ];
});
_c2 = FormLabel;
function FormControl({ ...props }) {
    _s3();
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"], {
        "data-slot": "form-control",
        id: formItemId,
        "aria-describedby": !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`,
        "aria-invalid": !!error,
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-booking-platform/components/ui/form.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
_s3(FormControl, "mI3rlmONcPPBVtOc6UefMrXAJ6w=", false, function() {
    return [
        useFormField
    ];
});
_c3 = FormControl;
function FormDescription({ className, ...props }) {
    _s4();
    const { formDescriptionId } = useFormField();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        "data-slot": "form-description",
        id: formDescriptionId,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground text-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-booking-platform/components/ui/form.tsx",
        lineNumber: 129,
        columnNumber: 5
    }, this);
}
_s4(FormDescription, "573aRXA8dloSrMaQM9SdAF4A9NI=", false, function() {
    return [
        useFormField
    ];
});
_c4 = FormDescription;
function FormMessage({ className, ...props }) {
    _s5();
    const { error, formMessageId } = useFormField();
    const body = error ? String(error?.message ?? '') : props.children;
    if (!body) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        "data-slot": "form-message",
        id: formMessageId,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-destructive text-sm', className),
        ...props,
        children: body
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-booking-platform/components/ui/form.tsx",
        lineNumber: 147,
        columnNumber: 5
    }, this);
}
_s5(FormMessage, "WONNS8VCMr8LShuUovb8QgOmMVY=", false, function() {
    return [
        useFormField
    ];
});
_c5 = FormMessage;
;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "FormField");
__turbopack_context__.k.register(_c1, "FormItem");
__turbopack_context__.k.register(_c2, "FormLabel");
__turbopack_context__.k.register(_c3, "FormControl");
__turbopack_context__.k.register(_c4, "FormDescription");
__turbopack_context__.k.register(_c5, "FormMessage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/travel-booking-platform/components/ui/select.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Select",
    ()=>Select,
    "SelectContent",
    ()=>SelectContent,
    "SelectGroup",
    ()=>SelectGroup,
    "SelectItem",
    ()=>SelectItem,
    "SelectLabel",
    ()=>SelectLabel,
    "SelectScrollDownButton",
    ()=>SelectScrollDownButton,
    "SelectScrollUpButton",
    ()=>SelectScrollUpButton,
    "SelectSeparator",
    ()=>SelectSeparator,
    "SelectTrigger",
    ()=>SelectTrigger,
    "SelectValue",
    ()=>SelectValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/@radix-ui/react-select/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as CheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDownIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUpIcon$3e$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript) <export default as ChevronUpIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
function Select({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "select",
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-booking-platform/components/ui/select.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
_c = Select;
function SelectGroup({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"], {
        "data-slot": "select-group",
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-booking-platform/components/ui/select.tsx",
        lineNumber: 18,
        columnNumber: 10
    }, this);
}
_c1 = SelectGroup;
function SelectValue({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Value"], {
        "data-slot": "select-value",
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-booking-platform/components/ui/select.tsx",
        lineNumber: 24,
        columnNumber: 10
    }, this);
}
_c2 = SelectValue;
function SelectTrigger({ className, size = 'default', children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "select-trigger",
        "data-size": size,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        ...props,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icon"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
                    className: "size-4 opacity-50"
                }, void 0, false, {
                    fileName: "[project]/Downloads/travel-booking-platform/components/ui/select.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/travel-booking-platform/components/ui/select.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/travel-booking-platform/components/ui/select.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_c3 = SelectTrigger;
function SelectContent({ className, children, position = 'popper', ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
            "data-slot": "select-content",
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md', position === 'popper' && 'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1', className),
            position: position,
            ...props,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollUpButton, {}, void 0, false, {
                    fileName: "[project]/Downloads/travel-booking-platform/components/ui/select.tsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Viewport"], {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('p-1', position === 'popper' && 'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1'),
                    children: children
                }, void 0, false, {
                    fileName: "[project]/Downloads/travel-booking-platform/components/ui/select.tsx",
                    lineNumber: 73,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollDownButton, {}, void 0, false, {
                    fileName: "[project]/Downloads/travel-booking-platform/components/ui/select.tsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Downloads/travel-booking-platform/components/ui/select.tsx",
            lineNumber: 61,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-booking-platform/components/ui/select.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
}
_c4 = SelectContent;
function SelectLabel({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
        "data-slot": "select-label",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground px-2 py-1.5 text-xs', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-booking-platform/components/ui/select.tsx",
        lineNumber: 93,
        columnNumber: 5
    }, this);
}
_c5 = SelectLabel;
function SelectItem({ className, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Item"], {
        "data-slot": "select-item",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute right-2 flex size-3.5 items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__["CheckIcon"], {
                        className: "size-4"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/travel-booking-platform/components/ui/select.tsx",
                        lineNumber: 117,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Downloads/travel-booking-platform/components/ui/select.tsx",
                    lineNumber: 116,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Downloads/travel-booking-platform/components/ui/select.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemText"], {
                children: children
            }, void 0, false, {
                fileName: "[project]/Downloads/travel-booking-platform/components/ui/select.tsx",
                lineNumber: 120,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/travel-booking-platform/components/ui/select.tsx",
        lineNumber: 107,
        columnNumber: 5
    }, this);
}
_c6 = SelectItem;
function SelectSeparator({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
        "data-slot": "select-separator",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-border pointer-events-none -mx-1 my-1 h-px', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-booking-platform/components/ui/select.tsx",
        lineNumber: 130,
        columnNumber: 5
    }, this);
}
_c7 = SelectSeparator;
function SelectScrollUpButton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollUpButton"], {
        "data-slot": "select-scroll-up-button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex cursor-default items-center justify-center py-1', className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUpIcon$3e$__["ChevronUpIcon"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/Downloads/travel-booking-platform/components/ui/select.tsx",
            lineNumber: 151,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-booking-platform/components/ui/select.tsx",
        lineNumber: 143,
        columnNumber: 5
    }, this);
}
_c8 = SelectScrollUpButton;
function SelectScrollDownButton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollDownButton"], {
        "data-slot": "select-scroll-down-button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex cursor-default items-center justify-center py-1', className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/Downloads/travel-booking-platform/components/ui/select.tsx",
            lineNumber: 169,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-booking-platform/components/ui/select.tsx",
        lineNumber: 161,
        columnNumber: 5
    }, this);
}
_c9 = SelectScrollDownButton;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "Select");
__turbopack_context__.k.register(_c1, "SelectGroup");
__turbopack_context__.k.register(_c2, "SelectValue");
__turbopack_context__.k.register(_c3, "SelectTrigger");
__turbopack_context__.k.register(_c4, "SelectContent");
__turbopack_context__.k.register(_c5, "SelectLabel");
__turbopack_context__.k.register(_c6, "SelectItem");
__turbopack_context__.k.register(_c7, "SelectSeparator");
__turbopack_context__.k.register(_c8, "SelectScrollUpButton");
__turbopack_context__.k.register(_c9, "SelectScrollDownButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/travel-booking-platform/components/ui/badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge,
    "badgeVariants",
    ()=>badgeVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])('inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden', {
    variants: {
        variant: {
            default: 'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
            secondary: 'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
            destructive: 'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
            outline: 'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
});
function Badge({ className, variant, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : 'span';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "badge",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Downloads/travel-booking-platform/components/ui/badge.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c = Badge;
;
var _c;
__turbopack_context__.k.register(_c, "Badge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/travel-booking-platform/lib/local-db.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// IndexedDB setup and CRUD operations for all tables
__turbopack_context__.s([
    "TABLES",
    ()=>TABLES,
    "agentStatusDB",
    ()=>agentStatusDB,
    "auditLogsDB",
    ()=>auditLogsDB,
    "bookingsDB",
    ()=>bookingsDB,
    "disputesDB",
    ()=>disputesDB,
    "initDB",
    ()=>initDB,
    "kycDB",
    ()=>kycDB,
    "loginHistoryDB",
    ()=>loginHistoryDB,
    "notificationsDB",
    ()=>notificationsDB,
    "promotionalBannersDB",
    ()=>promotionalBannersDB,
    "refundsDB",
    ()=>refundsDB,
    "scheduledReportsDB",
    ()=>scheduledReportsDB,
    "transactionsDB",
    ()=>transactionsDB,
    "walletDepositRequestsDB",
    ()=>walletDepositRequestsDB
]);
const DB_NAME = "TravelBookingDB";
const DB_VERSION = 2;
const TABLES = {
    BOOKINGS: "bookings",
    TRANSACTIONS: "transactions",
    REFUNDS: "refunds",
    DISPUTES: "disputes",
    KYC_DOCUMENTS: "kyc_documents",
    NOTIFICATIONS: "notifications",
    LOGIN_HISTORY: "login_history",
    AUDIT_LOGS: "audit_logs",
    SCHEDULED_REPORTS: "scheduled_reports",
    PROMOTIONAL_BANNERS: "promotional_banners",
    WALLET_DEPOSIT_REQUESTS: "wallet_deposit_requests",
    AGENT_STATUS: "agent_status"
};
// Database initialization
let dbInstance = null;
async function initDB() {
    if (dbInstance) return dbInstance;
    return new Promise((resolve, reject)=>{
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onerror = ()=>reject(request.error);
        request.onsuccess = ()=>{
            dbInstance = request.result;
            resolve(dbInstance);
        };
        request.onupgradeneeded = (event)=>{
            const db = event.target.result;
            // Create object stores
            if (!db.objectStoreNames.contains(TABLES.BOOKINGS)) {
                const bookingsStore = db.createObjectStore(TABLES.BOOKINGS, {
                    keyPath: "id"
                });
                bookingsStore.createIndex("bookingId", "bookingId", {
                    unique: true
                });
                bookingsStore.createIndex("agentId", "agentId");
                bookingsStore.createIndex("status", "status");
                bookingsStore.createIndex("date", "date");
            }
            if (!db.objectStoreNames.contains(TABLES.TRANSACTIONS)) {
                const txStore = db.createObjectStore(TABLES.TRANSACTIONS, {
                    keyPath: "id"
                });
                txStore.createIndex("date", "date");
                txStore.createIndex("type", "type");
                txStore.createIndex("status", "status");
                txStore.createIndex("bookingId", "bookingId");
            }
            if (!db.objectStoreNames.contains(TABLES.REFUNDS)) {
                const refundsStore = db.createObjectStore(TABLES.REFUNDS, {
                    keyPath: "id"
                });
                refundsStore.createIndex("refundId", "refundId", {
                    unique: true
                });
                refundsStore.createIndex("bookingId", "bookingId");
                refundsStore.createIndex("status", "status");
            }
            if (!db.objectStoreNames.contains(TABLES.DISPUTES)) {
                const disputesStore = db.createObjectStore(TABLES.DISPUTES, {
                    keyPath: "id"
                });
                disputesStore.createIndex("disputeId", "disputeId", {
                    unique: true
                });
                disputesStore.createIndex("status", "status");
            }
            if (!db.objectStoreNames.contains(TABLES.KYC_DOCUMENTS)) {
                const kycStore = db.createObjectStore(TABLES.KYC_DOCUMENTS, {
                    keyPath: "id"
                });
                kycStore.createIndex("userId", "userId");
                kycStore.createIndex("status", "status");
            }
            if (!db.objectStoreNames.contains(TABLES.NOTIFICATIONS)) {
                const notifStore = db.createObjectStore(TABLES.NOTIFICATIONS, {
                    keyPath: "id"
                });
                notifStore.createIndex("userId", "userId");
                notifStore.createIndex("read", "read");
                notifStore.createIndex("createdAt", "createdAt");
            }
            if (!db.objectStoreNames.contains(TABLES.LOGIN_HISTORY)) {
                const loginStore = db.createObjectStore(TABLES.LOGIN_HISTORY, {
                    keyPath: "id"
                });
                loginStore.createIndex("userId", "userId");
                loginStore.createIndex("loginTime", "loginTime");
            }
            if (!db.objectStoreNames.contains(TABLES.AUDIT_LOGS)) {
                const auditStore = db.createObjectStore(TABLES.AUDIT_LOGS, {
                    keyPath: "id"
                });
                auditStore.createIndex("timestamp", "timestamp");
                auditStore.createIndex("userId", "userId");
                auditStore.createIndex("module", "module");
                auditStore.createIndex("action", "action");
            }
            if (!db.objectStoreNames.contains(TABLES.SCHEDULED_REPORTS)) {
                const reportsStore = db.createObjectStore(TABLES.SCHEDULED_REPORTS, {
                    keyPath: "id"
                });
                reportsStore.createIndex("reportId", "reportId", {
                    unique: true
                });
                reportsStore.createIndex("status", "status");
            }
            if (!db.objectStoreNames.contains(TABLES.PROMOTIONAL_BANNERS)) {
                const bannersStore = db.createObjectStore(TABLES.PROMOTIONAL_BANNERS, {
                    keyPath: "id"
                });
                bannersStore.createIndex("active", "active");
            }
            if (!db.objectStoreNames.contains(TABLES.WALLET_DEPOSIT_REQUESTS)) {
                const depositStore = db.createObjectStore(TABLES.WALLET_DEPOSIT_REQUESTS, {
                    keyPath: "id"
                });
                depositStore.createIndex("requestId", "requestId", {
                    unique: true
                });
                depositStore.createIndex("agentId", "agentId");
                depositStore.createIndex("status", "status");
            }
            if (!db.objectStoreNames.contains(TABLES.AGENT_STATUS)) {
                const statusStore = db.createObjectStore(TABLES.AGENT_STATUS, {
                    keyPath: "id"
                });
                statusStore.createIndex("agentId", "agentId", {
                    unique: true
                });
                statusStore.createIndex("status", "status");
            }
        };
    });
}
// Helper to generate IDs
function generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
function generateBookingId(type) {
    const prefix = type === "FLIGHT" ? "FL" : "HT";
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    return `${prefix}-${date}-${random}`;
}
function generatePNR() {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
}
// Generic CRUD functions
async function create(table, data) {
    const db = await initDB();
    // Check if object store exists
    if (!db.objectStoreNames.contains(table)) {
        throw new Error(`Object store "${table}" does not exist. Please upgrade the database.`);
    }
    const tx = db.transaction(table, "readwrite");
    const store = tx.objectStore(table);
    const newData = {
        ...data,
        id: generateId()
    };
    return new Promise((resolve, reject)=>{
        const request = store.add(newData);
        request.onsuccess = ()=>resolve(newData);
        request.onerror = ()=>reject(request.error);
    });
}
async function read(table, id) {
    const db = await initDB();
    // Check if object store exists
    if (!db.objectStoreNames.contains(table)) {
        console.warn(`Object store "${table}" does not exist. Returning undefined.`);
        return undefined;
    }
    const tx = db.transaction(table, "readonly");
    const store = tx.objectStore(table);
    return new Promise((resolve, reject)=>{
        const request = store.get(id);
        request.onsuccess = ()=>resolve(request.result);
        request.onerror = ()=>reject(request.error);
    });
}
async function readAll(table) {
    const db = await initDB();
    // Check if object store exists
    if (!db.objectStoreNames.contains(table)) {
        console.warn(`Object store "${table}" does not exist. Returning empty array.`);
        return [];
    }
    const tx = db.transaction(table, "readonly");
    const store = tx.objectStore(table);
    return new Promise((resolve, reject)=>{
        const request = store.getAll();
        request.onsuccess = ()=>resolve(request.result || []);
        request.onerror = ()=>reject(request.error);
    });
}
async function update(table, id, data) {
    const db = await initDB();
    // Check if object store exists
    if (!db.objectStoreNames.contains(table)) {
        throw new Error(`Object store "${table}" does not exist. Please upgrade the database.`);
    }
    const tx = db.transaction(table, "readwrite");
    const store = tx.objectStore(table);
    return new Promise((resolve, reject)=>{
        const getRequest = store.get(id);
        getRequest.onsuccess = ()=>{
            const existing = getRequest.result;
            if (!existing) {
                reject(new Error("Record not found"));
                return;
            }
            const updated = {
                ...existing,
                ...data,
                id
            };
            const putRequest = store.put(updated);
            putRequest.onsuccess = ()=>resolve(updated);
            putRequest.onerror = ()=>reject(putRequest.error);
        };
        getRequest.onerror = ()=>reject(getRequest.error);
    });
}
async function remove(table, id) {
    const db = await initDB();
    // Check if object store exists
    if (!db.objectStoreNames.contains(table)) {
        throw new Error(`Object store "${table}" does not exist. Please upgrade the database.`);
    }
    const tx = db.transaction(table, "readwrite");
    const store = tx.objectStore(table);
    return new Promise((resolve, reject)=>{
        const request = store.delete(id);
        request.onsuccess = ()=>resolve();
        request.onerror = ()=>reject(request.error);
    });
}
async function search(table, query) {
    const all = await readAll(table);
    return all.filter(query);
}
async function filter(table, filters) {
    const all = await readAll(table);
    return all.filter((item)=>{
        return Object.entries(filters).every(([key, value])=>{
            if (value === undefined || value === null || value === "all") return true;
            return item[key] === value;
        });
    });
}
const bookingsDB = {
    create: async (data)=>{
        const now = new Date().toISOString();
        const bookingId = generateBookingId(data.type);
        const pnr = generatePNR();
        return create(TABLES.BOOKINGS, {
            ...data,
            bookingId,
            pnr,
            createdAt: now,
            updatedAt: now
        });
    },
    read: (id)=>read(TABLES.BOOKINGS, id),
    readAll: ()=>readAll(TABLES.BOOKINGS),
    update: (id, data)=>update(TABLES.BOOKINGS, id, {
            ...data,
            updatedAt: new Date().toISOString()
        }),
    delete: (id)=>remove(TABLES.BOOKINGS, id),
    search: (query)=>search(TABLES.BOOKINGS, query),
    filter: (filters)=>filter(TABLES.BOOKINGS, filters)
};
const transactionsDB = {
    create: async (data)=>{
        return create(TABLES.TRANSACTIONS, {
            ...data,
            createdAt: new Date().toISOString()
        });
    },
    read: (id)=>read(TABLES.TRANSACTIONS, id),
    readAll: ()=>readAll(TABLES.TRANSACTIONS),
    update: (id, data)=>update(TABLES.TRANSACTIONS, id, data),
    delete: (id)=>remove(TABLES.TRANSACTIONS, id),
    search: (query)=>search(TABLES.TRANSACTIONS, query),
    filter: (filters)=>filter(TABLES.TRANSACTIONS, filters)
};
const refundsDB = {
    create: async (data)=>{
        const now = new Date().toISOString();
        const refundId = `REF-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
        return create(TABLES.REFUNDS, {
            ...data,
            refundId,
            status: "Initiated",
            timeline: [
                {
                    stage: "Initiated",
                    date: now,
                    status: "completed"
                }
            ],
            createdAt: now,
            updatedAt: now
        });
    },
    read: (id)=>read(TABLES.REFUNDS, id),
    readAll: ()=>readAll(TABLES.REFUNDS),
    update: (id, data)=>update(TABLES.REFUNDS, id, {
            ...data,
            updatedAt: new Date().toISOString()
        }),
    delete: (id)=>remove(TABLES.REFUNDS, id),
    search: (query)=>search(TABLES.REFUNDS, query),
    filter: (filters)=>filter(TABLES.REFUNDS, filters)
};
const disputesDB = {
    create: async (data)=>{
        const now = new Date().toISOString();
        const disputeId = `DSP-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 3)}`;
        return create(TABLES.DISPUTES, {
            ...data,
            disputeId,
            status: "Raised",
            messages: [],
            createdAt: now,
            updatedAt: now
        });
    },
    read: (id)=>read(TABLES.DISPUTES, id),
    readAll: ()=>readAll(TABLES.DISPUTES),
    update: (id, data)=>update(TABLES.DISPUTES, id, {
            ...data,
            updatedAt: new Date().toISOString()
        }),
    delete: (id)=>remove(TABLES.DISPUTES, id),
    search: (query)=>search(TABLES.DISPUTES, query),
    filter: (filters)=>filter(TABLES.DISPUTES, filters)
};
const kycDB = {
    create: async (data)=>{
        const now = new Date().toISOString();
        return create(TABLES.KYC_DOCUMENTS, {
            ...data,
            status: "Pending",
            createdAt: now,
            updatedAt: now
        });
    },
    read: (id)=>read(TABLES.KYC_DOCUMENTS, id),
    readAll: ()=>readAll(TABLES.KYC_DOCUMENTS),
    update: (id, data)=>update(TABLES.KYC_DOCUMENTS, id, {
            ...data,
            updatedAt: new Date().toISOString()
        }),
    delete: (id)=>remove(TABLES.KYC_DOCUMENTS, id),
    search: (query)=>search(TABLES.KYC_DOCUMENTS, query),
    filter: (filters)=>filter(TABLES.KYC_DOCUMENTS, filters)
};
const notificationsDB = {
    create: async (data)=>{
        return create(TABLES.NOTIFICATIONS, {
            ...data,
            read: false,
            createdAt: new Date().toISOString()
        });
    },
    read: (id)=>read(TABLES.NOTIFICATIONS, id),
    readAll: ()=>readAll(TABLES.NOTIFICATIONS),
    update: (id, data)=>update(TABLES.NOTIFICATIONS, id, data),
    delete: (id)=>remove(TABLES.NOTIFICATIONS, id),
    search: (query)=>search(TABLES.NOTIFICATIONS, query),
    filter: (filters)=>filter(TABLES.NOTIFICATIONS, filters)
};
const loginHistoryDB = {
    create: async (data)=>{
        return create(TABLES.LOGIN_HISTORY, data);
    },
    read: (id)=>read(TABLES.LOGIN_HISTORY, id),
    readAll: ()=>readAll(TABLES.LOGIN_HISTORY),
    update: (id, data)=>update(TABLES.LOGIN_HISTORY, id, data),
    delete: (id)=>remove(TABLES.LOGIN_HISTORY, id),
    search: (query)=>search(TABLES.LOGIN_HISTORY, query),
    filter: (filters)=>filter(TABLES.LOGIN_HISTORY, filters)
};
const auditLogsDB = {
    create: async (data)=>{
        return create(TABLES.AUDIT_LOGS, {
            ...data,
            timestamp: new Date().toISOString()
        });
    },
    read: (id)=>read(TABLES.AUDIT_LOGS, id),
    readAll: ()=>readAll(TABLES.AUDIT_LOGS),
    update: (id, data)=>update(TABLES.AUDIT_LOGS, id, data),
    delete: (id)=>remove(TABLES.AUDIT_LOGS, id),
    search: (query)=>search(TABLES.AUDIT_LOGS, query),
    filter: (filters)=>filter(TABLES.AUDIT_LOGS, filters)
};
const scheduledReportsDB = {
    create: async (data)=>{
        const reportId = `RPT-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
        return create(TABLES.SCHEDULED_REPORTS, {
            ...data,
            reportId,
            status: "Scheduled",
            createdAt: new Date().toISOString()
        });
    },
    read: (id)=>read(TABLES.SCHEDULED_REPORTS, id),
    readAll: ()=>readAll(TABLES.SCHEDULED_REPORTS),
    update: (id, data)=>update(TABLES.SCHEDULED_REPORTS, id, data),
    delete: (id)=>remove(TABLES.SCHEDULED_REPORTS, id),
    search: (query)=>search(TABLES.SCHEDULED_REPORTS, query),
    filter: (filters)=>filter(TABLES.SCHEDULED_REPORTS, filters)
};
const promotionalBannersDB = {
    create: async (data)=>{
        const now = new Date().toISOString();
        return create(TABLES.PROMOTIONAL_BANNERS, {
            ...data,
            clicks: 0,
            createdAt: now,
            updatedAt: now
        });
    },
    read: (id)=>read(TABLES.PROMOTIONAL_BANNERS, id),
    readAll: ()=>readAll(TABLES.PROMOTIONAL_BANNERS),
    update: (id, data)=>update(TABLES.PROMOTIONAL_BANNERS, id, {
            ...data,
            updatedAt: new Date().toISOString()
        }),
    delete: (id)=>remove(TABLES.PROMOTIONAL_BANNERS, id),
    search: (query)=>search(TABLES.PROMOTIONAL_BANNERS, query),
    filter: (filters)=>filter(TABLES.PROMOTIONAL_BANNERS, filters)
};
const walletDepositRequestsDB = {
    create: async (data)=>{
        const now = new Date().toISOString();
        const requestId = `DEP-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
        return create(TABLES.WALLET_DEPOSIT_REQUESTS, {
            ...data,
            requestId,
            status: "Pending",
            createdAt: now,
            updatedAt: now
        });
    },
    read: (id)=>read(TABLES.WALLET_DEPOSIT_REQUESTS, id),
    readAll: ()=>readAll(TABLES.WALLET_DEPOSIT_REQUESTS),
    update: (id, data)=>update(TABLES.WALLET_DEPOSIT_REQUESTS, id, {
            ...data,
            updatedAt: new Date().toISOString()
        }),
    delete: (id)=>remove(TABLES.WALLET_DEPOSIT_REQUESTS, id),
    search: (query)=>search(TABLES.WALLET_DEPOSIT_REQUESTS, query),
    filter: (filters)=>filter(TABLES.WALLET_DEPOSIT_REQUESTS, filters)
};
const agentStatusDB = {
    create: async (data)=>{
        const now = new Date().toISOString();
        return create(TABLES.AGENT_STATUS, {
            ...data,
            status: data.status || "Active",
            createdAt: now,
            updatedAt: now
        });
    },
    read: (id)=>read(TABLES.AGENT_STATUS, id),
    readByAgentId: async (agentId)=>{
        const all = await readAll(TABLES.AGENT_STATUS);
        return all.find((s)=>s.agentId === agentId);
    },
    readAll: ()=>readAll(TABLES.AGENT_STATUS),
    update: (id, data)=>update(TABLES.AGENT_STATUS, id, {
            ...data,
            updatedAt: new Date().toISOString()
        }),
    updateByAgentId: async (agentId, data)=>{
        const existing = await agentStatusDB.readByAgentId(agentId);
        if (existing) {
            return update(TABLES.AGENT_STATUS, existing.id, {
                ...data,
                updatedAt: new Date().toISOString()
            });
        }
        // Create if doesn't exist
        return agentStatusDB.create({
            agentId,
            ...data
        });
    },
    delete: (id)=>remove(TABLES.AGENT_STATUS, id),
    search: (query)=>search(TABLES.AGENT_STATUS, query),
    filter: (filters)=>filter(TABLES.AGENT_STATUS, filters)
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/travel-booking-platform/lib/audit-utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Audit logging utilities
__turbopack_context__.s([
    "audit",
    ()=>audit,
    "logAction",
    ()=>logAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$local$2d$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/lib/local-db.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/lib/store.ts [app-client] (ecmascript)");
;
;
// Get mock IP address (in real app, this would come from request)
function getMockIPAddress() {
    return `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
}
async function logAction(action, module, recordId, previousValue, newValue) {
    try {
        const store = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppStore"].getState();
        const userId = store.currentUser.id;
        const role = store.currentUser.role;
        await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$local$2d$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["auditLogsDB"].create({
            userId,
            role,
            action,
            module,
            recordId,
            previousValue,
            newValue,
            ipAddress: getMockIPAddress()
        });
    } catch (error) {
        console.error("Failed to log action:", error);
    }
}
const audit = {
    create: (module, recordId, newValue)=>logAction("Create", module, recordId, undefined, newValue),
    update: (module, recordId, previousValue, newValue)=>logAction("Update", module, recordId, previousValue, newValue),
    delete: (module, recordId, previousValue)=>logAction("Delete", module, recordId, previousValue, undefined),
    approve: (module, recordId, newValue)=>logAction("Approve", module, recordId, undefined, newValue),
    reject: (module, recordId, newValue)=>logAction("Reject", module, recordId, undefined, newValue),
    reveal: (module, recordId)=>logAction("Reveal", module, recordId, undefined, undefined)
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/travel-booking-platform/lib/wallet-utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Wallet utility functions for balance management, validations, and operations
__turbopack_context__.s([
    "MAX_ADD_FUNDS",
    ()=>MAX_ADD_FUNDS,
    "MIN_ADD_FUNDS",
    ()=>MIN_ADD_FUNDS,
    "calculateBalanceFromTransactions",
    ()=>calculateBalanceFromTransactions,
    "createTransaction",
    ()=>createTransaction,
    "formatTimeAgo",
    ()=>formatTimeAgo,
    "getBudgetAlertStatus",
    ()=>getBudgetAlertStatus,
    "getBudgetUsage",
    ()=>getBudgetUsage,
    "getLastUpdatedTimestamp",
    ()=>getLastUpdatedTimestamp,
    "getMonthlyBudget",
    ()=>getMonthlyBudget,
    "getMonthlySpend",
    ()=>getMonthlySpend,
    "getWalletBalance",
    ()=>getWalletBalance,
    "hasSufficientBalance",
    ()=>hasSufficientBalance,
    "maskEmail",
    ()=>maskEmail,
    "maskPhone",
    ()=>maskPhone,
    "setLastUpdatedTimestamp",
    ()=>setLastUpdatedTimestamp,
    "setMonthlyBudget",
    ()=>setMonthlyBudget,
    "setWalletBalance",
    ()=>setWalletBalance,
    "validateAddFundsAmount",
    ()=>validateAddFundsAmount
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$local$2d$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/lib/local-db.ts [app-client] (ecmascript)");
;
const WALLET_BALANCE_KEY = "wallet_balance";
const MONTHLY_BUDGET_KEY = "monthly_budget";
const MIN_ADD_FUNDS = 100;
const MAX_ADD_FUNDS = 500000;
function getWalletBalance() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const stored = localStorage.getItem(WALLET_BALANCE_KEY);
    return stored ? parseFloat(stored) : 100000 // Default balance
    ;
}
function setWalletBalance(balance) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    localStorage.setItem(WALLET_BALANCE_KEY, balance.toString());
}
function getLastUpdatedTimestamp() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const stored = localStorage.getItem("wallet_last_updated");
    return stored ? new Date(stored) : new Date();
}
function setLastUpdatedTimestamp() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    localStorage.setItem("wallet_last_updated", new Date().toISOString());
}
async function calculateBalanceFromTransactions() {
    const transactions = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$local$2d$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transactionsDB"].readAll();
    const completedTransactions = transactions.filter((tx)=>tx.status === "Completed");
    // Get the latest transaction with balanceAfter, or calculate from all transactions
    const sortedTransactions = completedTransactions.sort((a, b)=>new Date(b.date).getTime() - new Date(a.date).getTime());
    if (sortedTransactions.length > 0 && sortedTransactions[0].balanceAfter !== undefined) {
        return sortedTransactions[0].balanceAfter;
    }
    // Fallback: calculate from all transactions
    return completedTransactions.reduce((balance, tx)=>{
        if (tx.type === "CREDIT" || tx.type === "REFUND") {
            return balance + Math.abs(tx.amount);
        } else if (tx.type === "DEBIT") {
            return balance - Math.abs(tx.amount);
        }
        return balance;
    }, 0);
}
function validateAddFundsAmount(amount) {
    if (isNaN(amount) || amount <= 0) {
        return {
            valid: false,
            error: "Amount must be greater than 0"
        };
    }
    if (amount < MIN_ADD_FUNDS) {
        return {
            valid: false,
            error: `Minimum amount is ₹${MIN_ADD_FUNDS.toLocaleString("en-IN")}`
        };
    }
    if (amount > MAX_ADD_FUNDS) {
        return {
            valid: false,
            error: `Maximum amount is ₹${MAX_ADD_FUNDS.toLocaleString("en-IN")} per transaction`
        };
    }
    return {
        valid: true
    };
}
function hasSufficientBalance(requiredAmount) {
    const balance = getWalletBalance();
    return balance >= requiredAmount;
}
async function createTransaction(data) {
    const currentBalance = getWalletBalance();
    let newBalance = currentBalance;
    if (data.type === "CREDIT" || data.type === "REFUND") {
        newBalance = currentBalance + Math.abs(data.amount);
    } else if (data.type === "DEBIT") {
        newBalance = currentBalance - Math.abs(data.amount);
    }
    const transaction = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$local$2d$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transactionsDB"].create({
        ...data,
        balanceAfter: newBalance
    });
    // Update wallet balance
    setWalletBalance(newBalance);
    setLastUpdatedTimestamp();
    return transaction;
}
function getMonthlyBudget() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const stored = localStorage.getItem(MONTHLY_BUDGET_KEY);
    return stored ? parseFloat(stored) : null;
}
function setMonthlyBudget(budget) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (budget === null) {
        localStorage.removeItem(MONTHLY_BUDGET_KEY);
    } else {
        localStorage.setItem(MONTHLY_BUDGET_KEY, budget.toString());
    }
}
async function getMonthlySpend() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const transactions = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$local$2d$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transactionsDB"].readAll();
    const monthlyDebits = transactions.filter((tx)=>{
        const txDate = new Date(tx.date);
        return tx.type === "DEBIT" && tx.status === "Completed" && txDate >= startOfMonth && txDate <= endOfMonth;
    });
    return monthlyDebits.reduce((sum, tx)=>sum + Math.abs(tx.amount), 0);
}
async function getBudgetUsage() {
    const budget = getMonthlyBudget();
    if (budget === null) {
        return {
            percentage: 0,
            spent: 0,
            budget: null
        };
    }
    const spent = await getMonthlySpend();
    const percentage = spent / budget * 100;
    return {
        percentage,
        spent,
        budget
    };
}
function getBudgetAlertStatus(percentage) {
    if (percentage >= 100) return "error";
    if (percentage >= 80) return "warning";
    return "none";
}
function maskPhone(phone) {
    if (!phone || phone.length < 4) return phone;
    return `**${phone.slice(-4)}`;
}
function maskEmail(email) {
    if (!email) return email;
    const [local, domain] = email.split("@");
    if (!domain) return email;
    if (local.length <= 2) return `${local[0]}**@${domain}`;
    return `${local.slice(0, 2)}**@${domain}`;
}
function formatTimeAgo(date) {
    const diff = Math.floor((new Date().getTime() - date.getTime()) / 1000 / 60);
    if (diff < 1) return "Just now";
    if (diff === 1) return "1 minute ago";
    if (diff < 60) return `${diff} minutes ago`;
    const hours = Math.floor(diff / 60);
    if (hours === 1) return "1 hour ago";
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return "1 day ago";
    return `${days} days ago`;
}
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RefundsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f40$hookform$2f$resolvers$2f$zod$2f$dist$2f$zod$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/@hookform/resolvers/zod/dist/zod.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/zod/v3/types.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/date-fns/format.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/components/ui/form.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/components/ui/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$local$2d$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/lib/local-db.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/lib/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$audit$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/lib/audit-utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$wallet$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/travel-booking-platform/lib/wallet-utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const refundSchema = __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["object"]({
    bookingId: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"]().min(1, "Please select a booking"),
    reason: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"]().min(1, "Reason is required"),
    type: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enum"]([
        "FULL",
        "PARTIAL"
    ]),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$zod$2f$v3$2f$types$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"]().optional()
});
function RefundsPage() {
    _s();
    const { currentUser } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppStore"])();
    const [bookings, setBookings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [refunds, setRefunds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [activeRequest, setActiveRequest] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const form = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForm"])({
        resolver: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f40$hookform$2f$resolvers$2f$zod$2f$dist$2f$zod$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["zodResolver"])(refundSchema),
        defaultValues: {
            type: "FULL"
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RefundsPage.useEffect": ()=>{
            loadData();
        }
    }["RefundsPage.useEffect"], []);
    const loadData = async ()=>{
        try {
            setLoading(true);
            const [allBookings, allRefunds] = await Promise.all([
                __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$local$2d$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bookingsDB"].readAll(),
                __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$local$2d$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["refundsDB"].readAll()
            ]);
            setBookings(allBookings.filter((b)=>b.status !== "CANCELLED"));
            setRefunds(allRefunds.sort((a, b)=>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
        } catch (error) {
            console.error("Failed to load data:", error);
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to load data");
        } finally{
            setLoading(false);
        }
    };
    // Calculate refund amount based on selection
    const selectedBookingId = form.watch("bookingId");
    const selectedBooking = bookings.find((b)=>b.id === selectedBookingId);
    const refundType = form.watch("type");
    const estimatedRefund = selectedBooking ? refundType === "FULL" ? selectedBooking.amount : selectedBooking.amount * 0.8 : 0;
    async function onSubmit(values) {
        try {
            const booking = bookings.find((b)=>b.id === values.bookingId);
            if (!booking) {
                __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Booking not found");
                return;
            }
            const refund = await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$local$2d$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["refundsDB"].create({
                bookingId: values.bookingId,
                reason: values.reason,
                type: values.type,
                amount: estimatedRefund,
                description: values.description
            });
            await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$audit$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["audit"].create("refunds", refund.id, {
                bookingId: values.bookingId,
                amount: estimatedRefund
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Refund request initiated successfully", {
                description: `Request ID: ${refund.refundId}`
            });
            form.reset();
            await loadData();
        } catch (error) {
            console.error("Failed to create refund:", error);
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to create refund request");
        }
    }
    const handleProcessRefund = async (refundId)=>{
        try {
            const refund = refunds.find((r)=>r.id === refundId);
            if (!refund) return;
            // Update to Processing
            await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$local$2d$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["refundsDB"].update(refundId, {
                status: "Processing",
                timeline: [
                    ...refund.timeline,
                    {
                        stage: "Processing",
                        date: new Date().toISOString(),
                        status: "completed"
                    }
                ]
            });
            await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$audit$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["audit"].update("refunds", refundId, {
                status: "Initiated"
            }, {
                status: "Processing"
            });
            // Simulate processing delay
            setTimeout(async ()=>{
                await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$local$2d$db$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["refundsDB"].update(refundId, {
                    status: "Completed",
                    timeline: [
                        ...refund.timeline,
                        {
                            stage: "Processing",
                            date: new Date().toISOString(),
                            status: "completed"
                        },
                        {
                            stage: "Completed",
                            date: new Date().toISOString(),
                            status: "completed"
                        }
                    ]
                });
                // Credit wallet using wallet utilities
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$wallet$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createTransaction"])({
                    date: new Date().toISOString().split("T")[0],
                    description: `Refund for Booking ${refund.bookingId}`,
                    amount: refund.amount,
                    type: "REFUND",
                    status: "Completed",
                    paymentMethod: "Refund",
                    productType: "Refund",
                    bookingId: refund.bookingId
                });
                await __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$audit$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["audit"].update("refunds", refundId, {
                    status: "Processing"
                }, {
                    status: "Completed"
                });
                await loadData();
                __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Refund processed successfully");
            }, 2000);
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info("Processing refund...");
            await loadData();
        } catch (error) {
            console.error("Failed to process refund:", error);
            __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to process refund");
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "container max-w-6xl py-8 space-y-8 animate-in fade-in duration-500",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-serif font-bold",
                        children: "Refund Management"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                        lineNumber: 156,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted-foreground mt-1",
                        children: "Initiate and track refund requests for cancellations and issues."
                    }, void 0, false, {
                        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                lineNumber: 155,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid lg:grid-cols-3 gap-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-1 space-y-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                            className: "border-t-4 border-t-primary",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                            children: "New Refund Request"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                            lineNumber: 165,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                            children: "Select a booking to initiate a refund"
                                        }, void 0, false, {
                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                            lineNumber: 166,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                    lineNumber: 164,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Form"], {
                                        ...form,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                            onSubmit: form.handleSubmit(onSubmit),
                                            className: "space-y-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                                                    control: form.control,
                                                    name: "bookingId",
                                                    render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                                    children: "Select Booking"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                    lineNumber: 176,
                                                                    columnNumber: 25
                                                                }, void 0),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                                                    onValueChange: field.onChange,
                                                                    defaultValue: field.value,
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                                    placeholder: "Search Booking ID..."
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                                    lineNumber: 180,
                                                                                    columnNumber: 31
                                                                                }, void 0)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                                lineNumber: 179,
                                                                                columnNumber: 29
                                                                            }, void 0)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                            lineNumber: 178,
                                                                            columnNumber: 27
                                                                        }, void 0),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                            children: bookings.map((booking)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                    value: booking.id,
                                                                                    children: [
                                                                                        booking.type,
                                                                                        " - ",
                                                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$date$2d$fns$2f$format$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(booking.date), "MMM d"),
                                                                                        " (₹",
                                                                                        booking.amount.toLocaleString("en-IN"),
                                                                                        ")"
                                                                                    ]
                                                                                }, booking.id, true, {
                                                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                                    lineNumber: 185,
                                                                                    columnNumber: 31
                                                                                }, void 0))
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                            lineNumber: 183,
                                                                            columnNumber: 27
                                                                        }, void 0)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                    lineNumber: 177,
                                                                    columnNumber: 25
                                                                }, void 0),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                    lineNumber: 191,
                                                                    columnNumber: 25
                                                                }, void 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                            lineNumber: 175,
                                                            columnNumber: 23
                                                        }, void 0)
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                    lineNumber: 171,
                                                    columnNumber: 19
                                                }, this),
                                                selectedBooking && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-3 bg-muted/50 rounded-lg text-sm space-y-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-muted-foreground",
                                                                    children: "Original Amount:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                    lineNumber: 199,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-medium",
                                                                    children: [
                                                                        "₹",
                                                                        selectedBooking.amount.toLocaleString("en-IN")
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                    lineNumber: 200,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                            lineNumber: 198,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-between",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-muted-foreground",
                                                                    children: "Booking Date:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                    lineNumber: 203,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: selectedBooking.date
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                    lineNumber: 204,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                            lineNumber: 202,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                    lineNumber: 197,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                                                    control: form.control,
                                                    name: "reason",
                                                    render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                                    children: "Reason"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                    lineNumber: 214,
                                                                    columnNumber: 25
                                                                }, void 0),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                                                    onValueChange: field.onChange,
                                                                    defaultValue: field.value,
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormControl"], {
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                                    placeholder: "Select reason"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                                    lineNumber: 218,
                                                                                    columnNumber: 31
                                                                                }, void 0)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                                lineNumber: 217,
                                                                                columnNumber: 29
                                                                            }, void 0)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                            lineNumber: 216,
                                                                            columnNumber: 27
                                                                        }, void 0),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                    value: "cancellation",
                                                                                    children: "Voluntary Cancellation"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                                    lineNumber: 222,
                                                                                    columnNumber: 29
                                                                                }, void 0),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                    value: "service_issue",
                                                                                    children: "Service Issue"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                                    lineNumber: 223,
                                                                                    columnNumber: 29
                                                                                }, void 0),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                    value: "operational",
                                                                                    children: "Operational Change"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                                    lineNumber: 224,
                                                                                    columnNumber: 29
                                                                                }, void 0),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                                    value: "fare_difference",
                                                                                    children: "Fare Difference"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                                    lineNumber: 225,
                                                                                    columnNumber: 29
                                                                                }, void 0)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                            lineNumber: 221,
                                                                            columnNumber: 27
                                                                        }, void 0)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                    lineNumber: 215,
                                                                    columnNumber: 25
                                                                }, void 0),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                    lineNumber: 228,
                                                                    columnNumber: 25
                                                                }, void 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                            lineNumber: 213,
                                                            columnNumber: 23
                                                        }, void 0)
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                    lineNumber: 209,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormField"], {
                                                    control: form.control,
                                                    name: "type",
                                                    render: ({ field })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormItem"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormLabel"], {
                                                                    children: "Refund Type"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                    lineNumber: 238,
                                                                    columnNumber: 25
                                                                }, void 0),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex gap-4",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                            className: `flex-1 border rounded-lg p-3 cursor-pointer transition-all ${field.value === "FULL" ? "bg-primary/5 border-primary ring-1 ring-primary" : "hover:bg-muted"}`,
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex items-center gap-2",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                            type: "radio",
                                                                                            ...field,
                                                                                            value: "FULL",
                                                                                            className: "accent-primary",
                                                                                            checked: field.value === "FULL"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                                            lineNumber: 244,
                                                                                            columnNumber: 31
                                                                                        }, void 0),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "font-medium",
                                                                                            children: "Full Refund"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                                            lineNumber: 251,
                                                                                            columnNumber: 31
                                                                                        }, void 0)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                                    lineNumber: 243,
                                                                                    columnNumber: 29
                                                                                }, void 0),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "text-xs text-muted-foreground mt-1 pl-6",
                                                                                    children: "100% of booking value"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                                    lineNumber: 253,
                                                                                    columnNumber: 29
                                                                                }, void 0)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                            lineNumber: 240,
                                                                            columnNumber: 27
                                                                        }, void 0),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                            className: `flex-1 border rounded-lg p-3 cursor-pointer transition-all ${field.value === "PARTIAL" ? "bg-primary/5 border-primary ring-1 ring-primary" : "hover:bg-muted"}`,
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex items-center gap-2",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                                            type: "radio",
                                                                                            ...field,
                                                                                            value: "PARTIAL",
                                                                                            className: "accent-primary",
                                                                                            checked: field.value === "PARTIAL"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                                            lineNumber: 259,
                                                                                            columnNumber: 31
                                                                                        }, void 0),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "font-medium",
                                                                                            children: "Partial"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                                            lineNumber: 266,
                                                                                            columnNumber: 31
                                                                                        }, void 0)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                                    lineNumber: 258,
                                                                                    columnNumber: 29
                                                                                }, void 0),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "text-xs text-muted-foreground mt-1 pl-6",
                                                                                    children: "Subject to penalties"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                                    lineNumber: 268,
                                                                                    columnNumber: 29
                                                                                }, void 0)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                            lineNumber: 255,
                                                                            columnNumber: 27
                                                                        }, void 0)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                    lineNumber: 239,
                                                                    columnNumber: 25
                                                                }, void 0),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$form$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FormMessage"], {}, void 0, false, {
                                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                    lineNumber: 271,
                                                                    columnNumber: 25
                                                                }, void 0)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                            lineNumber: 237,
                                                            columnNumber: 23
                                                        }, void 0)
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                    lineNumber: 233,
                                                    columnNumber: 19
                                                }, this),
                                                selectedBooking && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between items-center p-3 bg-green-50 text-green-700 rounded-lg border border-green-100",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-medium text-sm",
                                                            children: "Est. Refund Amount"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                            lineNumber: 278,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-bold text-lg",
                                                            children: [
                                                                "₹",
                                                                estimatedRefund.toLocaleString("en-IN")
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                            lineNumber: 279,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                    lineNumber: 277,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    type: "submit",
                                                    className: "w-full",
                                                    children: "Initiate Refund"
                                                }, void 0, false, {
                                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                    lineNumber: 283,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                            lineNumber: 170,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                        lineNumber: 169,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                    lineNumber: 168,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                            lineNumber: 163,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                        lineNumber: 162,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:col-span-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                            className: "h-full border-none shadow-none bg-transparent",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                    className: "px-0 pt-0",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                        children: "Recent Refund Requests"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                        lineNumber: 296,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                    lineNumber: 295,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                    className: "px-0",
                                    children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center py-8 text-muted-foreground",
                                        children: "Loading..."
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                        lineNumber: 300,
                                        columnNumber: 17
                                    }, this) : refunds.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center py-8 text-muted-foreground",
                                        children: "No refund requests found"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                        lineNumber: 302,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: refunds.map((refund)=>{
                                            const booking = bookings.find((b)=>b.id === refund.bookingId);
                                            const isProcessing = refund.status === "Processing";
                                            const isCompleted = refund.status === "Completed";
                                            const progress = refund.timeline.length;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "group relative overflow-hidden bg-card border rounded-xl p-0 hover:shadow-md transition-all cursor-pointer",
                                                onClick: ()=>setActiveRequest(refund),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-5 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex gap-4 items-center",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: `p-3 rounded-full ${isProcessing ? "bg-yellow-100 text-yellow-600" : isCompleted ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`,
                                                                        children: isProcessing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                            className: "w-5 h-5"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                            lineNumber: 325,
                                                                            columnNumber: 33
                                                                        }, this) : isCompleted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                            className: "w-5 h-5"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                            lineNumber: 327,
                                                                            columnNumber: 33
                                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                            className: "w-5 h-5"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                            lineNumber: 329,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                        lineNumber: 319,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex items-center gap-2",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                                        className: "font-semibold text-lg",
                                                                                        children: refund.refundId
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                                        lineNumber: 334,
                                                                                        columnNumber: 33
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                        variant: "outline",
                                                                                        children: refund.status
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                                        lineNumber: 335,
                                                                                        columnNumber: 33
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                                lineNumber: 333,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-sm text-muted-foreground mt-0.5",
                                                                                children: booking ? `${booking.type} Booking ${booking.bookingId}` : "Booking not found"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                                lineNumber: 337,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                        lineNumber: 332,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                lineNumber: 318,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-8 w-full md:w-auto justify-between md:justify-end",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-right",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "text-xs text-muted-foreground",
                                                                                children: "Refund Amount"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                                lineNumber: 345,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                className: "font-bold text-lg",
                                                                                children: [
                                                                                    "₹",
                                                                                    refund.amount.toLocaleString("en-IN")
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                                lineNumber: 346,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                        lineNumber: 344,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    currentUser.role === "FINANCE_TEAM" && refund.status === "Initiated" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                        size: "sm",
                                                                        onClick: (e)=>{
                                                                            e.stopPropagation();
                                                                            handleProcessRefund(refund.id);
                                                                        },
                                                                        children: "Process"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                        lineNumber: 349,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                        variant: "ghost",
                                                                        size: "icon",
                                                                        className: "group-hover:translate-x-1 transition-transform",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                                            className: "w-5 h-5"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                            lineNumber: 360,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                        lineNumber: 359,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                                lineNumber: 343,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                        lineNumber: 317,
                                                        columnNumber: 25
                                                    }, this),
                                                    isProcessing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-muted h-1.5 w-full",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-yellow-500 h-1.5 w-[60%] animate-pulse"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                            lineNumber: 368,
                                                            columnNumber: 29
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                        lineNumber: 367,
                                                        columnNumber: 27
                                                    }, this)
                                                ]
                                            }, refund.id, true, {
                                                fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                                lineNumber: 312,
                                                columnNumber: 23
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                        lineNumber: 304,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                                    lineNumber: 298,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                            lineNumber: 294,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                        lineNumber: 293,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/travel-booking-platform/app/dashboard/refunds/page.tsx",
        lineNumber: 154,
        columnNumber: 5
    }, this);
}
_s(RefundsPage, "YC+4s3GPKOLHrLmVCB5C//JhsUo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$lib$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$travel$2d$booking$2d$platform$2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForm"]
    ];
});
_c = RefundsPage;
var _c;
__turbopack_context__.k.register(_c, "RefundsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Downloads_travel-booking-platform_92150167._.js.map