###在这里记下开发这个app

####本app的功能：

等待补充

####开发日志

### 0916 react进阶初步

自己之前有过一点react的学习经历，但是比较零散，今天先是总结了一下react

之后是学习了一下redux和react-redux,react-router，参考的资料主要有http://redux.js.org/docs/recipes/MigratingToRedux.html和https://hulufei.gitbooks.io/react-tutorial/content/forms.html

另外有个前辈的博客也总结了如何用es6开发react，传送门：http://wwsun.github.io/posts/react-with-es6-part-1.html


### 0918 ES6书写react

今天开始初步总结学习的react，打算先试一试基础的props传递、路由等等，但是，还没有开始就遇到一个问题！渲染组件的时候有时候能渲染出来有时候不能渲染出来......自己尝试了半天终于发现要**首字母大写**，之后发现命名规则不是驼峰式！而是**大驼峰式**，大驼峰式相对于小驼峰式，第一个首字母也大写了。

自己之后又查找了相关资料，这里记录一下：

JSX编码规范：https://github.com/minwe/style-guide/blob/master/React.js.md
匈牙利、小驼峰、大驼峰命名法：
http://blog.csdn.net/liaoxiaoli99/article/details/6372557

还有一个坑自己虽然之前在博客里面有记录，但是由于比较常见，自己在这里再说一下，es6写react的话要进行初始化，也不能用getinitstate方法直接初始化state，具体做法应该是这样：

```
  constructor(props) {
        super(props);
        this.state = {/* your state*/};
    }
```
把这段代码添加到模块里面。

### 0919 继续总结react全家桶

react中调用组件方法方法要记得重新绑定this的指向，具体可以参考http://wwsun.github.io/posts/react-with-es6-part-3.html

### 0925 上手react-native

这几天开始学习react-native,前几天我的MacBook坏了去苹果店修了一下，之后又升级了系统，所以一开始一直在配置环境，这里先说下配置环境的几个问题：

1.一开始自己总是在热模块替换的部分出现问题，见https://github.com/facebook/react-native/issues/10088，经过查证是自己的watchman没有安装正确，这个应该和系统升级有关系，Github相关页面中有解决方案。
2.安卓环境目前还有一些关键的地方不支持新系统...

接下来自己看了看《react-native开发指南》这本书，这本书虽然是今年六月份出的，但是现在已经有点过时了，不过看看还是可以的，也会有很多帮助，这里面几个重要的点：

1.react-native现在比较支持ES6的语法，原书使用CommonJS的语法，不知道react是不是在将来还支持，但是我使用es6的语法是没有问题的。
2.react-native的组件都是需要在开头引入的，比如Text,Image什么的，这个自己总是忘记。
3.相关知识都可以在http://reactnative.cn/docs/0.31/getting-started.html这个地方看，但是现在还有一个遗留问题，在Image里面写Text不显示啊哭..，这个遗留问题以后解决。

### 0927 部署react-native的app到自己的测试机

在之前的版本中，部署react-native的app到测试机需要先进行更改IP地址，现在的版本(文档是0.34，react-native-cli是1.0.0)中已经不需要手动进行一些更改了，但是要注意测试机和自己的电脑要在一个**局域网下面**，这个地方自己之前没有注意所以一直出问题，之后一定要注意。

顺便提醒自己，及时参考react的官方文档。

**react native常见的开发环境问题**

react native更新的非常快，如果遇到由于包管理器的启动比如”npm start“或者“react-native run-ios”等出现问题，很可能会是依赖的问题(实际上我现在就有这个问题..晕菜)。

如果使用brew进行管理依赖，那么时刻保持把brew置于最新状态：
```
brew update
brew upgrade
```

如果已经升级了React Native，那么推荐运行这些命令升级你的node：

```
brew upgrade node
```

如果依赖出现问题，可以重新安装所有的依赖：
```
rm -rf node_modules
npm install
```

**Xcode**

如果遇到"X is underfined"这种类型的错误，并且X是以RCT为前缀的，那可能是自己的“npm install”没有执行正确


**Android**

>自己现在还没怎么在安卓的环境下进行测试，这个先记录一下吧。

如果在安卓的测试过程中出现问题，首先检查`echo $ANDROID_HOME`看看是不是有这个变量，如果有的话这个地方就没有问题，否则的话应该加上：

```
vi ~/.bash_profile
加上这一句：
export ANDROID_HOME=/usr/local/opt/android-sdk

然后  
source ~/.bash_profile
```

这样可以让环境变量生效。

### 0929 继续学习react-native

大致看完了《react-native》权威指南，总体而言感觉这本书并不是什么特别好的书，不过还是有一些可以参考的地方。

运行自己写的程序的时候出现了`expected a component class got object object`这样一个错误，经过查证后发现这个错误通常是由以下原因造成的：

* 没有把自己的组件进行首字母大写
* 没有把系统组件(比如View)进行首字母大写



###1001 react-native:iOS10开发适配系列之权限Crash问题

今天在用react-native进行一些调试和学习，主要有以下几点:

* 自己一开始用ImagePickeriOS这个接口，一开始不行，是因为要把RCTCameraRoll放在Xcode的lib中，并且把".m"后缀文件也加到相关地方(这个很普遍，随便一查就有)
* 后来发现还是不行，直接crash了，自己后来又用了一个第三方的差不多的组件(传送门：https://github.com/doochik/react-native-imagepicker)，见了鬼，还是crash，后来发现是iOS中的权限问题，要添加一些东西到相关的plist中。

解决方案
1.在项目中找到info.plist文件，右键点击以 Source Code形式打开
2.添加以下键值对，这里以 PhotoLibrary 作为例子

```
    <key>NSPhotoLibraryUsageDescription</key>
    <string>此 App 需要您的同意才能读取媒体资料库</string>
```

这里还有几个其他的key/value:

```
    <key>NSCameraUsageDescription</key>    
    <string>cameraDesciption</string>

    <key>NSContactsUsageDescription</key>    
    <string>contactsDesciption</string>

    <key>NSMicrophoneUsageDescription</key>    
    <string>microphoneDesciption</string>
```

###1002 ract-native Image不显示的问题&ListView不滚动

* Image不显示

自己在使用Image控件的时候，发现总是不显示，后来发现主要原因是无论是相册中的图片还是网络https的图片，都要说明长和宽两个尺寸，否则就会有不显示的问题。

* ListView不滚动

自己在第一次调用ListView的时候，发现ListView不能滚动，后来经过我排查发现要用flex:1或者给一个固定高度，因为ListView本身就有ScrollView所以就不用ScrollView嵌套了(如果嵌套那么OnEndReached会不断执行)，另外值得注意的是：注意给所有的上层父组件都加上`flex:1`，关于这个的原因我这里有一段摘录自stackoverflow的话：
> The goal is to have ListView's height expand to fill the screen. If you put flex: 1 on only the ListView, it will expand to fill its parent but the parent will not expand to fill the grandparent, hence the chain of flex: 1. You can also put flex-direction: row or fixed heights on the ancestors -- the point is that you need the ListView to fill the screen.


###1003 react-native 完成post图片上传

今天下午没有遇到什么太大的bug，晚上又遇到了比较严重的bug，关于上传图片到服务器这里，接下来依次说一下会遇到什么问题：

* 首先nodejs本身是不接受multipart的表单的，所以直接接受请求的话打印出来的很可能body和files都是空值，这个时候要引入中间件，我引入的是`connect-multiparty`，当然这并不是一个很好的中间件，因为他不能删除临时文件，我的临时文件保存在服务器的`/tmp`这个目录下面，所以要设置一个定时任务删除或者手动删除。
	* 据说这个还有别的解决方案，甚至本身的body-praser也是可以解决的，自己目前还没有进行透彻的研究...
* 之后上传图片返回"413"错误，查证后发现是请求过长，这个时候要同时设置nginx和nodejs的限制：
	* nginx：`client_max_body_size 20m;`放在http的配置里面，自己随便写的大小，现在暂时够用。
	* nodejs: `app.use(bodyParser.json({ limit:'10000kb'}));
app.use(bodyParser.urlencoded({ extended: false,limit:'10000kb' }));`这样设计的合理性有待考察，暂时这样设计是可以的。
* 官网文档中给出的上传样例对返回体判断的有些过于复杂了，当然这也不是没用，不过自己现在就判断一个http代码和返回体的uri就够。
* 据说用fetch也能实现图片上传功能(现在的版本已经封装好)，但是自己还是用的是XHRHttprequest，这样也不是没有好处，而且也肯定灵活一些，暂时这样用，

###1005 react-native navigator, 配置redis

自己用react-native的navigator有这样一个场景：(主要是在iOS)

一个界面，用户点击登陆后push一个登陆页到当前路由栈，登陆完成后把登陆数据存在asyncstorage中，然后pop()回去

但是发现pop回去后原来的界面并不会重新渲染，所以没有办法调用constructor把登录的数据取出用于更新页面，即还是显示没有登录状态..

* 自己想到一个解决方案，再上一个路由中传递函数给下一个路由，下一个路由卸载前调用这个函数就好了..
* navigator的replacePreviousAndPop(route)方法会重新渲染你要跳转的route(这个方法有待尝试)

____

自己在后端服务器，用redis存储一些简单的数据，比如验证码之类的。nodejs有redis模块，可以很方便的操作redis。

可以在这个网站http://itbilu.com/database/redis/4kB2ninp.html  学习如何配置redis

###1010 关于ListView的重新渲染

react的ListView充分运用到了原生的性能优势，并且可扩展性也较强，因此列表类都应当充分运用ListView。

ListView在重新绘制的时候，我们应当调用类似以下的函数：

```
this.setState({
            dataSource:this.state.dataSource.cloneWithRows(this._genRows(data2))
        });

```

重绘的时候会先进行比较，判断哪些变化了，这里用到的函数可以在rowHasChanged函数中进行自定义，但是注意的：

**定义抽取函数的时候，一定要注意需不需要深拷贝**。

如果不进行深拷贝或者部分深拷贝，当自己更改一些数据的时候，由于指向相同，最终在比较函数中传递的r1,r2其实都是一个指向，这个时候认为数据没有变化，自然不会重新进行绘制。

###1012 

不知不觉已经10月12号了..没想到这个app拖延了这么久，这几天自己打算写一个比较完善的iOS相册选择组件，之后放在GitHub上分享，写着写着，发现这里面需求比较复杂，而且很难用一个独立的组件完成(另外就是需要在navigator等组件里面使用)，虽然暂时写成了但是没办法较为独立的发布。

也许自己对react-native的认识还是比较有欠缺，自己目前正在努力学习中，希望这个星期结束的时候app能够差不多...

###1014

这几天没有开发...今天服务器又被攻击挂了，数据删除了...恢复了一下，配了公私钥对称加密等..感觉暂时应该没啥问题了吧。

之后写完了用户上传自己的作品这一部分，主要包括：选择图片、选择封面图、增加标题和说明等功能，之后自己直接构建XHR进行formdata的上传，服务端选用了multer，一个官方推荐的(多)文件上传中间件，相关函数和接口比较丰富，直接Google即可。

####Possible Unhandled Promise rejection

这个错误总是时不时出现，我在这里应该总结一下这个错误出现的可能的原因：

1.  最常见的原因是自己后台服务器没有开起来，导致没有办法fetch到数据出错。

###1020 react native 获取相册图片的尺寸

自己在用ImagePickeriOS的系统接口的时候，发现返回的只有Image的uri，而react native规定必须要指定width和height才能显示图片，所以自己查了半天如何获取width和height，经过查证，发现原来有这个函数：

```
  componentDidMount() {
        // this._fetchRandomPhoto();
        Image.getSize(this.props.uri, (imageWidth, imageHeight) => {
            this.setState({imageWidth, imageHeight});
            console.log(imageWidth, imageHeight);
        });
    }
```

这个函数非常好用，用来获取图片width和height，是系统提供的。

* 关于在styels中使用变量的问题，styles中是不太好直接使用组件中的变量的，但是可以直接把变量定义在组件外围，可以直接使用(自己在制作相片多选组件的时候有用到过)。


____

*一些注意点*

1. TouchableHighlight 只能包裹一个元素...
