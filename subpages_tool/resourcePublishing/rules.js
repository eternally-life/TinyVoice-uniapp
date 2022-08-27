export function getRule() {
	return {
		'integral': [{
			type: 'number',
			required: true,
			message: '请输入下载所需音符',
			trigger: ['blur', 'change']
		}],

		'name': [{
			required: true,
			message: '请输入资源名',
			trigger: ['blur', 'change']
		}],

		'describe': {
			required: true,
			message: '',
			trigger: ['blur', 'change']
		},
	}
}
