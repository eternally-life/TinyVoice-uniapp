/*
graceUI rich-text 加强工具
link : graceui.hcoder.net
author : 5213606@qq.com 深海
*/

// 正则变量
var graceRichTextReg;

// 批量替换的样式 [ 根据项目需求自行设置 ]
var GRT = [
	// div 样式
	['div', "line-height:2rem;"],
	// h1 样式
	['h1', "font-size:3rem; line-height:1.5rem;"],
	// h2 样式
	['h2', "font-size:2rem; line-height:1.8rem;"],
	// h3 样式
	['h3', "font-size:1.6rem; line-height:2rem;"],
	// h4 样式
	['h4', "font-size:1.2rem; line-height:2rem;"],
	// h5 样式
	['h5', "font-size:1rem; line-height:2rem;"],
	// h6 样式
	['h6', "font-size:0.9rem; line-height:2rem;"],
	// p 样式
	['p', "font-size:32rpx; line-height:2rem;"],
	// b 样式
	['b', "font-size:1rem; line-height:2rem;"],
	// strong 样式
	['strong', "font-size:1rem; line-height:2rem;"],
	// code 样式
	['code', "font-size:1rem; line-height:1.2rem; background:#F6F7F8; padding:16rpx 2%; width:96%;"],
	// img 样式
	['img', "width:100%; margin:8rpx 0;"],
	// blockquote
	['blockquote',
		"font-size:1rem; border-left:6rpx solid #D1D1D1; line-height:2rem; border-radius:10rpx; background:#F6F7F8; padding:16rpx 2%;"
	],
	// li 样式
	['ul', "padding:10rpx 0; list-style:none; padding:0; margin:0;"],
	['li', "line-height:1.5rem; padding:10rpx 0; list-style:none; padding:0; margin:0; margin-top:20rpx;"],
	// table
	['table', "width:100%; border-left:2rpx solid #F2F3F4; border-top:2rpx solid #F2F3F4;"],
	['th', "border-right:2rpx solid #F2F3F4; border-bottom:2rpx solid #F2F3F4;"],
	['td', "border-right:2rpx solid #F2F3F4; border-bottom:2rpx solid #F2F3F4; padding-left:10rpx;"]
];


module.exports = {
	format: function(html) {
		html = html.replace(/<pre.*pre>?/gis, function(word) {
			word = word.replace(/[\n]/gi, '<br />');
			word = word.replace(/    /gi, '<span style="padding-left:2rem;"></span>');
			return word.replace(/[\t]/gi, '<span style="padding-left:2rem;"></span>');
		});
		html = html.replace(/<pre/gi,
			'<p style="font-size:1rem; margin:12rpx 0; line-height:1.2rem; background:#F6F7F8; border-radius:5rpx; padding:8rpx 4%; width:92%;"'
		);
		html = html.replace(/<\/pre/gi, "</p");
		for (let i = 0; i < GRT.length; i++) {
			graceRichTextReg = new RegExp('<' + GRT[i][0] + '>|<' + GRT[i][0] + ' (.*?)>', 'gi');
			html = html.replace(graceRichTextReg, function(word) {
				// 分析 dom 上是否带有 style=""
				if (word.indexOf('style=') != -1) {
					var regIn = new RegExp('<' + GRT[i][0] + '(.*?)style="(.*?)"(.*?)(/?)>', 'gi');
					return word.replace(regIn, '<' + GRT[i][0] + '$1style="$2 ' + GRT[i][1] + '"$3$4>');
				} else {
					var regIn = new RegExp('<' + GRT[i][0] + '(.*?)(/?)>', 'gi');
					return word.replace(regIn, '<' + GRT[i][0] + '$1 style="' + GRT[i][1] + '$2">');
				}
			});
		}
		return html;
	}

}
