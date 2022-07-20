# 校园微音最终版



## Start

安装、更新依赖

```javascript
npm install        //安装依赖
```



## 编写规范

### 1、必须采用 4 格缩进

必须采用 4 格缩进

必须采用 4 格缩进

必须采用 4 格缩进



### 2、采用分包

**非tabbar页面** **`必须`** 采用分包，以减少启动加载时间

方法一：HbuildX中直接右键`subpages`文件夹创建页面即可。（其他编辑器根据情况来）

方法二：pages.json中照抄一份已有的分包定义



### 3、页面定义

页面文件名需要与文件夹名**相同**

> √ 正确示范

```json
{
    "path": "pages/tab2/tab2"	//定义主包页面 
}
{
    "path": "tab2/tab2"			//定义分包页面
}
```

> x 错误示范

```json
{
    "path": "pages/tab2/index"	//定义主包页面
}
{
    "path": "tab2/index"		//定义分包页面
}
```



### 4、style使用SCSS、



### 5、Vuex 采用模块化



### 6、iconfont引入、更新

阿里巴巴矢量图标不提供在线连接（2022年7月15日），需将在线引入转为本地引入。



#### 普通图标

==操作步骤如下==：

1. 图标库最新项目下载至本地，并解压

   

2. 将解压文件中名为 `iconfont.css` 中的图标内容替换 项目中 `/style/icon.css` 文件对应的图标内容



#### 彩色图标

本质上没有任何区别，只是作为特殊的备用选项

1. 将图标项目下载至本地，并解压
   
2. 安装工具包（已安装的跳过此步）

   - 在解压目录下使用npm安装

     ```javascript
     //此处建议全局安装 
     npm install -g iconfont-tools 
     ```

     

3. 执行工具包转换

   ```javascript
   iconfont-tools
   //或
   iconfont-tools.cmd
   ```

   然后一路无脑回车即可，会在当前目录生成一个新的文件夹，内容为转换后的新css

   

4. 将生成目录下的 `iconfont-weapp-icon.css` 中图标内容替换至项目中 `/style/color_icon.css` 文件对应的图标内容
   
5. 使用时 类名前加 t-，具体看工具文档
   
6. **注意事项**：转换后 是图片，不能再使用font-size调整大小。且无法调色

### 7、文件上传（等接口即可实装）

对图片、视频上传进行了封装。（内含风控接入，根据实际情况开关即可）

调用方法示例(发布微音场景)

```vue
<template>
	<view>
        <ty-file-upload
            @upPara="getImgData"
            paraGetMethods="active"
            iniTopPath="images/ty"
            :initData="fileList1" 
        /> 
    </view>
</template>

<script>
export default {
    methods:{
        getImgData(e){
            console.log('组件返回数据列表', e);
        }
    }
}
</script>
```

理论上支持头像，但可能需要使用ref



### 8、内容风控检测(等接口即可实装)



