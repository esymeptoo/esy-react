## esy-react组件库(PS: 纯属瞎几把搞, OS: 什么傻吊东西)


### 所得及所想
#### 关于react组件的设计思想

1. state数据的问题：因为constructor只执行一次，所以如果存在state的值是通过props计算所得，<br><br>需在componentWillReceiveProps钩子中重新计算并赋值

2. 有关重写组件的方法：比如onChange高频事件，最好触发在setState的回调函数中，因为setState是异步的.