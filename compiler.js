/*
 * @Descripttion: unTitle
 * @Author: yizheng.yuan
 * @Date: 2021-10-05 15:28:41
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-10-05 21:08:03
 */
class Compiler{
  constructor(vm){
    console.log('compiler:',vm)
    this.compile(vm)
  }
  modelUpdate(keyName,node,vm){
    // 用data的数据替换
    node.value = vm.data[keyName]
    // 监听输入变化
    node.addEventListener('input',(e)=>{
      console.error('e',e);
      vm.data[keyName] = e.target.value
    })
  }
  compile(vm){
    // 取出根节点
    let root = this.getRoot(vm.el);
    console.log('root:',root)
    let allNode = root.childNodes
    allNode.forEach(node => {
      // 节点元素
      if(node.nodeType === 1){
        // 节点的属性
        let attrs = node.attributes;
        console.log('elm:',node,attrs)
        Array.from(attrs).forEach(attr=>{
          console.log('attr-x',attr,attr.name);
          if(this.hasVLetter(attr.name)){
            console.log('v-:',attr.name)
            let directiveName = attr.name.split('-')[1];
            let keyName = attr.value
            switch(directiveName){
              case 'model':
                this.modelUpdate(keyName,node,vm)
                break;
            }
          }
        })
        
      }else{
        // 文本元素
        console.log('text',node,node.attributes,node.nodeType,node.nodeValue);
        // node.nodeValue = 'TEST'
        let value = node.nodeValue;
        let reg = /\{\{([^}]+)\}\}/g;
        window.dataArr = []
        var r = ""; 
        while(r = reg.exec(value)) { 
          dataArr.push({
            name: r[1],
            value: vm.data[r[1]],
            firstValue: value,
            node
          });
        }
        dataArr.forEach((one, index) =>{
          let name = one.name;
          // 正则加变量
          // https://zhidao.baidu.com/question/175541282.html

          let str = `{{${name}}}`
          var reg1 = new RegExp(str, "g");
          console.log('name, index',name, index, value.replace(reg1, one.value));
          value = value.replace(reg1, one.value)
        })
        node.nodeValue = value
      }
    });
  }
  hasVLetter(attr){
    return attr.includes('v-')
  }
  getRoot(el){
    if(el.nodeType === 1){
      return el
    }else{
      return document.querySelector(el)
    }
  }
}