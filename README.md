# Yibozi

### 运行项目
推荐使用 [Yarn](https://yarnpkg.com/zh-Hans/) 来管理应用的依赖。

开发环境：

```shell
# 安装所有依赖：
yarn

# 运行应用：
yarn dev

# 也可以在特定端口来运行应用：
PORT=8081 yarn dev

# 运行 storybook：
yarn storybook
```

生产环境：

```shell
# 安装生产环境依赖：
yarn install --production

# 构建生产环境代码：
yarn build

# 运行应用：
yarn start

# 也可以在特定端口来运行应用：
PORT=8081 yarn start
```

### 关于主题与样式

自定义样式方案有如下几种：

* 提供几个固定的选项，分别对应不同的类名来切换应用样式 —— 此种方案限制太多，不利于扩展，维护难度较大，一旦有需求变动，就是一场灾难，而且需要重新编译才能生效。

* 基于 Less 在浏览器端的能力 —— 此种方案更适合用户需要自定义样式的场景，而且是临时更改，[Ant.design](https://ant.design/) 就采用了这种方案。由于是在浏览器端编译 Less 来实现，所以页面初次呈现会显示默认样式，之后通过编译 Less 来覆盖掉默认样式，效果不理想。

* styled-components —— 目前为止比较理想的解决方案，其提供了完整的应用主题支持，配合站点配置文件来使用威力十分强大，不需要编译即可生效。

因此本项目采用 [styled-components](https://github.com/styled-components/styled-components) 来编写样式，以满足不同站点的个性化需求。[这里](https://gist.github.com/Feel-Joy/a1f608134128abb7547963b4b6208335) 有一份 styled-components 不完全指南作为参考。

### 关于响应式

此项目基于媒体查询来构建兼容桌面端与移动端的响应式应用。参考 shopify 以及相关站点，统一使用 px 作为样式属性的单位，关于是否要在移动端使用 rem 有待商榷。

项目中使用 styled-components 构建了媒体查询模板文件，请基于此文件来使用媒体查询，以下为示例：

```js
import styled from 'styled-components';

import { mediaTemplate } from '../utils';

const Component = styled.div`
  ${ mediaTemplate.desktop`background: dodgerblue;` }
  ${ mediaTemplate.tablet`background: mediumseagreen;` }
  ${ mediaTemplate.phone`background: palevioletred;` }
`;
```



### 关于 Storybook
[Storybook](https://github.com/storybooks/storybook) 为我们提供了一个 UI 组件开发环境：
* 对应用几乎没有侵入性
* 关注点分离，提高开发效率
* 便于 UI 组件调试、测试
* 可以为 UI 组件编写文档，利于后期维护和扩展
* 强大的扩展
* ...

此项目的所有 UI 组件都应该放入 Storybook 中进行统一管理，并且要编写组件文档，以及为组件添加属性类型检测。

### component vs container

编写 React 组件时需要区分 component 与 container。

component 是无状态的函数式组件，由 props 驱动，其中不应包含副作用，不直接与 Redux 通信，component 应该被 storybook 所管理。

container 拥有状态，可以包含副作用，可以直接与 Redux 通信。

参见：[component vs container](https://github.com/reduxjs/redux/issues/756#issuecomment-141683834)

### 状态管理

状态管理库目前有 Mobx 和 Redux：

* Mobx 通过 get 和 set 实现数据的双向绑定，可以在应用中的任何地方更改状态，十分灵活。
* Redux 简单却更严格，只能通过 dispatch action 的方式来更改状态。

由于 Mobx 的灵活性，更容易写出后期难以理解的代码，而且其相较于 Redux 更加复杂，学习成本更高，因此本项目采用 Redux 来管理应用状态。

并不是所有的应用都需要 Redux，或者只要引入了 Redux 就要将所有的数据放入其中。无脑的将数据放入 Redux 中会使其难以维护。我们要时刻保持 store 的简洁和扁平，在你思考是否要将数据放入 Redux 中时，请参考以下几点：

* 应用中的其他部分需要用到这部分数据吗？
* 是否需要根据这部分原始数据创建衍生数据？
* 这部分相同的数据是否用于驱动多个组件？
* 是否需要能够将数据恢复到某个特定的时间点？
* 是否需要缓存数据？

如果答案为 **是**，则可以将其放入 redux 中。

### 缓存策略

服务端 HTML 缓存：

使用 [lru-cache](https://github.com/isaacs/node-lru-cache) 配合 [react-no-ssr](https://github.com/kadirahq/react-no-ssr) 来缓存服务端渲染的 HTML 字符串，当前缓存时间为 5 分钟。

* 对于实时性较低且不区分用户的数据，例如列表数据、分类数据，都可以缓存起来
* 对于实时性较高或者区分用户的数据，则可以使用 react-no-ssr 放到客户端进行渲染

**需要注意的是，当拥有多种语言或者多种货币等此类选项时，要确保生成不同的 cacheKey 来缓存同一页面的不同版本。**

请求缓存：

使用 [axios-extensions](https://github.com/kuitos/axios-extensions) 来缓存经由 axios 发起的请求，适用于服务端以及客户端。

```js
/**
 * throttleAdapterEnhancer(): 将请求进行缓存，默认缓存五分钟
 * cacheAdapterEnhancer(): 限制一定时间范围内的请求次数，默认 1s 内限制请求 1次
 */
adapter: throttleAdapterEnhancer(cacheAdapterEnhancer(axios.defaults.adapter, { enabledByDefault: false }))

// 默认不对请求进行缓存，在需要缓存的请求中设置 cache: ture 即可缓存
axios.get(`http://localhost:${ port }/config`, { cache: true });
```
