const prf = 't-';
module.exports = {
	getSetInfo_QQ() {
		return [{
				icon: prf + 'icon-gerenxinxi1',
				name: '个人信息'
			},
			{
				icon: prf + 'icon-guanyuwomen-01-01',
				name: '关于我们'
			},
			{
				icon: prf + 'icon-fenxiangweiyin1',
				name: '分享微音',
				open_type: 'share'
			},
			{
				icon: prf + 'icon-tuichuzhanghao1',
				name: '退出账号'
			}
		]
	},

	getSetInfo_WX() {
		return [{
				icon: prf + 'icon-gerenxinxi1',
				name: '个人信息'
			},
			{
				icon: prf + 'icon-lianxikefu1',
				name: '联系客服',
				open_type: 'contact'
			},
			{
				icon: prf + 'icon-guanyuwomen-01-01',
				name: '关于我们'
			},
			{
				icon: prf + 'icon-fenxiangweiyin1',
				name: '分享微音',
				open_type: 'share'
			},
			{
				icon: prf + 'icon-tuichuzhanghao1',
				name: '退出账号'
			}
		]
	},
	getNaviList() {
		return [{
				icon: 'iconfont icon-fabu1',
				title: '我的发布',
				path: '/pages/small_voice/MyVoice'
			},
			{
				icon: 'iconfont icon-dingdan',
				title: '我的订单',
				path: '/subpages_shop/order/order'
			},
			{
				icon: 'iconfont icon-ruzhu1',
				title: '购物车',
				path: '/subpages_shop/ShoppingCart/ShoppingCart'
			},
			{
				icon: 'iconfont icon-wodedianpu3',
				title: '收货地址',
				path: '/subpages/receivAddress/receivAddress'
			}
		]
	},
	getOtherInfo_QQ() {
		return [{
			num: '0',
			text: '音符'
		}]
	},

	getOtherInfo_WX() {
		return [{
				num: '0',
				text: '音符'
			},
			// {
			// 	num: '0',
			// 	text: '关注'
			// },
			// {
			// 	num: '0',
			// 	text: '粉丝'
			// },
			{
				num: '0',
				text: '消息',
				path: '/subpages/myMessage/myMessage'
			}
		]
	}
}
