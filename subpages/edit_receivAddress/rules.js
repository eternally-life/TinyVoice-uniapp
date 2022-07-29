export function getRule() {
	return {
		'name': [{
			type: 'string',
			required: true,
			message: '请填写姓名',
			trigger: ['blur', 'change']
		}],
		'phonenumber': [{
			required: true,
			min: 11,
			message: '请填写联系手机号',
			trigger: ['blur', 'change']
		}],
		'school': [{
			required: true,
			message: '请输入学校名',
			trigger: ['blur', 'change']
		}],
		'apartment': [{
			required: true,
			message: '请输入公寓楼',
			trigger: ['blur', 'change']
		}],
		'dormitoryNumber': {
			required: true,
			message: '请输入宿舍号',
			trigger: ['blur', 'change']
		},
	}
}
