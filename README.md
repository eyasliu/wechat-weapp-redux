微信小程序Redux绑定
==============
用于在微信小程序为页面绑定Redux Store。

_PS: 代码是基于[react-redux](https://github.com/reactjs/react-redux)修改的_

_PPS: 改造代码使其能适用于 [labrador](https://github.com/maichong/labrador) 开发工具_

## 安装
1. clone或者下载代码库到本地:
    
    ```
    git clone https://github.com/eyasliu/wechat-weapp-redux
    ```
2. 将`lib/wechat-weapp-redux`目录直接拷贝到小程序的工程中,例如(下面假设):

    ```    
    cd wechat-weapp-redux
    cp -r lib/wechat-weapp-redux <小程序根目录>/src/libs
    ```       
 上面的命令将包拷贝到小程序开发目录的`libs`目录下

## 使用
1. 将Redux Store绑定到App上。

    ```js
    const store = createStore(reducer) // redux store
    class APP {
      store = store
      onLaunch: function() {
        console.log( "onLaunch" )
      }
    }
    ```
    **Provider**方法尚未实现，先用此方式顶替。

2. 在页面的定义上使用connect,绑定redux store到页面上。

    ```js
    import {connect} from './libs/wechat-weapp-redux'
    import wx from 'labrador'
    import {getUser} from './actions'

    class MyPage extends wx.Component{}

    export default connect(
      state => ({list: state.list}),  //mapStateToData
      dispatch => ({getUser: id => dispatch(getUser)}) // mapDispatchToPage
    )(MyPage)
    ```
    注册小程序的页面
    
3. 说明
    
    完成上述两步之后,你就可以在`this.data`中访问你在`mapStateToData`定义的数据了。
    
    `mapDispatchToPage`定义的action会被映射到`this`对象上。
    
## Example

详细的使用例子可以参照: [eyasliu/wechat-app-music](https://github.com/eyasliu/wechat-app-music)
    
