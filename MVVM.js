/*
 * @Descripttion: unTitle
 * @Author: yizheng.yuan
 * @Date: 2021-10-05 15:21:33
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-10-05 18:01:07
 */
class MVVM{
  constructor(vm){
    console.log('MVVM:',vm)
    this.$el = vm.$el
    this.$data = vm.data
    
    // 2.数据劫持
    this.observer(vm)

    // 1.模板解析
    this.compiler(vm)
    // 3.观察者-修改-更新变化
  }

  compiler(vm){
    new Compiler(vm)
  }

  observer(vm){
    new Observer(vm)
  }

}