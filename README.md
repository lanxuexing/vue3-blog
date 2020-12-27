# vue3-blog

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Vue 双向绑定

```vue
// vue2 原生组件
<input v-mode="val" />
<input :value="val" @input="val = $event.target.value "/>

// vue2 自定义组件
<my-component v-mode="val" />
<my-component :value="val" @input="val = arguments[0]" />

// vue3 compile 结果
<my-component v-mode="val" />
h(
    Comp,
    { modelValue: foo, 'onUpdate:modelValue': value => (foo = value) }
)
```


### 箭头函数

```js
() => ...
// 等价于
(function () {
    return ...
}).bind(this)

// 箭头函数在不写{} 的情况下，可以省略return关键字，而默认return接下来的东西

() => () => ...
// 等价于
() => {return () => {return ...}}
// 也等价于
function () {
    retunrn function() {
        return ...
    }
}
```