/*
 * @Descripttion: unTitle
 * @Author: yizheng.yuan
 * @Date: 2021-10-05 15:29:40
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-10-05 21:10:15
 */
class Observer{
  constructor(vm){
    this.observe(vm.data)
  }

  observe(data){
    // 检查data是否为对象,否则不处理
    if(!data || typeof data !== 'object'){
      return
    }
    console.log('ob:',data)
    // 开始劫持数据
    Object.keys(data).forEach(key=>{
      console.log('key:',key)
      // 任意一个属性
      this.defineReactive(data,key, data[key]);
      // 可能这个data[key]还是一个对象，所以继续要遍历一次
      this.observe(data[key])
    })
  }

  defineReactive(data, key, value){
    console.log('dr:',data,key);
    // 为对象重新定义属性
    Object.defineProperty(data, key ,{
      configurable: true,
      enumerable: true,
      // value: data[key], // value 不能和下面的get函数同时存在
      get(){
        console.log('取值')
        return value;
      },
      set(newValue){
        // alert('set'+newValue)
        console.error(key,':被设置了：',value,newValue);
        if(value != newValue){
          value = newValue
        }
        function getNode(name){
          let arr = dataArr
          for (let i = 0; i < arr.length; i++) {
            if(arr[i].name === name){
              return arr[i];
            }
          }
        }
        let node = getNode(key)
        console.error('node',node);
        let realNode = node.node
        if(realNode.nodeType === 3){
          // 文本节点
          
          let str = `{{${key}}}`
          var reg1 = new RegExp(str, "g");
          let nvalue = node.firstValue.replace(reg1, newValue)
          console.log('nvalue',nvalue, nvalue.includes('{{'));
          if(nvalue.includes('{{')){
            let dataArr1 = []
            var r = ""; 
            let reg = /\{\{([^}]+)\}\}/g;
            while(r = reg.exec(nvalue)) { 
              dataArr1.push({
                name: r[1],
                value: data[r[1]]
              });
            }
            // console.error('dataArr1',dataArr1);
            dataArr1.forEach((one, index) =>{
              let name = one.name;
              let str = `{{${name}}}`
              var reg1 = new RegExp(str, "g");
              nvalue = nvalue.replace(reg1, one.value)
            })
          }
          realNode.nodeValue = nvalue
        }else{
          console.error('其他节点',node);
        }
      }
    })
  }
}