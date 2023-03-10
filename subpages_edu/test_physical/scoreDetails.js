/**分数详细划分*/
export default {
	/* 男生MBI分数 */
	BMI_male(F) {
		return F >= 17.9 && F <= 23.9 ? 100 : F > 0 && F <= 17.8 || F >= 24 && F <= 27.9 ? 80 : F >= 28 ?
			60 : 0;
	},

	/* 女生MBI分数 */
	BMI_female(F) {
		return F >= 17.2 && F <= 23.9 ? 100 : F > 0 && F <= 17.1 || F >= 24 && F <= 27.9 ? 80 : F >= 28 ?
			60 : 0;
	},

	/*肺活量 男-大一大二/大三大四 */
	vitalCapacity_male_12(v) {
		return v >= 5040 ? 100 : v >= 4920 ? 95 : v >= 4800 ? 90 : v >= 4550 ? 85 : v >= 4300 ?
			80 : v >= 4180 ? 78 : v >= 4060 ? 76 : v >= 3940 ? 74 : v >= 3820 ? 72 : v >= 3700 ?
			70 : v >= 3580 ? 68 : v >= 3460 ? 66 : v >= 3340 ? 64 : v >= 3220 ? 62 : v >= 3100 ? 60 : v >=
			2940 ? 50 : v >= 2780 ? 40 : v >= 2620 ? 30 : v >= 2460 ? 20 : v >= 2300 ? 10 : 0;
	},

	vitalCapacity_male_34(v) {
		return v >= 5140 ? 100 : v >= 5020 ? 95 : v >= 4900 ? 90 : v >= 4650 ? 85 : v >= 4400 ?
			80 : v >= 4280 ? 78 : v >= 4160 ? 76 : v >= 4040 ? 74 : v >= 3920 ? 72 : v >= 3800 ?
			70 : v >=
			3680 ? 68 : v >= 3560 ? 66 : v >= 3440 ? 64 : v >= 3320 ? 62 : v >= 3200 ? 60 : v >=
			3030 ? 50 : v >= 2860 ? 40 : v >= 2690 ? 30 : v >= 2520 ? 20 : v >= 2350 ? 10 : 0;
	},

	/*肺活量 女-大一~大二/大三~大四 */
	vitalCapacity_female_12(v) {
		return v >= 3400 ? 100 : v >= 3350 ? 95 : v >= 3300 ? 90 : v >= 3150 ? 85 : v >= 3e3 ?
			80 : v >= 2900 ? 78 : v >= 2800 ? 76 : v >= 2700 ? 74 : v >= 2600 ? 72 : v >= 2500 ?
			70 : v >= 2400 ? 68 : v >= 2300 ? 66 : v >= 2200 ? 64 : v >= 2100 ? 62 : v >= 2e3 ? 60 : v >=
			1960 ? 50 : v >= 1920 ? 40 : v >= 1880 ? 30 : v >= 1840 ? 20 : v >= 1800 ? 10 : 0;
	},

	vitalCapacity_female_34(v) {
		return v >= 3450 ? 100 : v >= 3400 ? 95 : v >= 3350 ? 90 : v >= 3200 ? 85 : v >= 3050 ?
			80 : v >= 2950 ? 78 : v >= 2850 ? 76 : v >= 2750 ? 74 : v >= 2650 ? 72 : v >= 2550 ?
			70 : v >= 2450 ? 68 : v >= 2350 ? 66 : v >= 2250 ? 64 : v >= 2150 ? 62 : v >= 2050 ? 60 : v >=
			2010 ? 50 : v >= 1970 ? 40 : v >= 1930 ? 30 : v >= 1890 ? 20 : v >= 1850 ? 10 : 0;
	},

	/* 50米  男  大一二/大三四  */
	run50_male_12(d) {
		return d > 0 && d <= 6.7 ? 100 : d > 0 && d <= 6.8 ? 95 : d > 0 && d <= 6.9 ? 90 : d >
			0 && d <= 7 ? 85 : d > 0 && d <= 7.1 ? 80 : d > 0 && d <= 7.3 ? 78 : d > 0 && d <= 7.5 ? 76 : d >
			0 && d <= 7.7 ? 74 : d > 0 && d <= 7.9 ? 72 : d > 0 && d <= 8.1 ? 70 : d > 0 && d <= 8.3 ? 68 : d >
			0 && d <= 8.5 ? 66 : d > 0 && d <= 8.7 ? 64 : d > 0 && d <= 8.9 ? 62 : d > 0 && d <= 9.1 ? 60 : d >
			0 && d <= 9.3 ? 50 : d > 0 && d <= 9.5 ? 40 : d > 0 && d <= 9.7 ? 30 : d > 0 && d <= 9.9 ? 20 : d >
			0 && d <= 10.1 ? 10 : 0;
	},

	run50_male_34(d) {
		return d > 0 && d <= 6.6 ? 100 : d > 0 && d <= 6.7 ? 95 : d > 0 && d <= 6.8 ? 90 : d >
			0 && d <= 6.9 ? 85 : d > 0 && d <= 7 ? 80 : d > 0 && d <= 7.2 ? 78 : d > 0 && d <= 7.4 ? 76 : d >
			0 && d <= 7.6 ? 74 : d > 0 && d <= 7.8 ? 72 : d > 0 && d <= 8 ? 70 : d > 0 && d <= 8.2 ? 68 : d >
			0 && d <= 8.4 ? 66 : d > 0 && d <= 8.6 ? 64 : d > 0 && d <= 8.8 ? 62 : d > 0 && d <= 9 ? 60 : d >
			0 && d <= 9.2 ? 50 : d > 0 && d <= 9.4 ? 40 : d > 0 && d <= 9.6 ? 30 : d > 0 && d <= 9.8 ? 20 : d >
			0 && d <= 10 ? 10 : 0;
	},

	/* 50米  女  大一二/大三四  */
	run50_female_12(d) {
		return d > 0 && d <= 7.5 ? 100 : d > 0 && d <= 7.6 ? 95 : d > 0 && d <= 7.7 ? 90 : d >
			0 && d <= 8 ? 85 : d > 0 && d <= 8.3 ? 80 : d > 0 && d <= 8.5 ? 78 : d > 0 && d <= 8.7 ? 76 : d >
			0 && d <= 8.9 ? 74 : d > 0 && d <= 9.1 ? 72 : d > 0 && d <= 9.3 ? 70 : d > 0 && d <= 9.5 ? 68 : d >
			0 && d <= 9.7 ? 66 : d > 0 && d <= 9.9 ? 64 : d > 0 && d <= 10.1 ? 62 : d > 0 && d <= 10.3 ? 60 :
			d > 0 && d <= 10.5 ? 50 : d > 0 && d <= 10.7 ? 40 : d > 0 && d <= 10.9 ? 30 : d > 0 && d <= 11.1 ?
			20 : d > 0 && d <= 11.3 ? 10 : 0;
	},

	run50_female_34(d) {
		return d > 0 && d <= 7.4 ? 100 : d > 0 && d <= 7.5 ? 95 : d > 0 && d <= 7.6 ? 90 : d >
			0 && d <= 7.9 ? 85 : d > 0 && d <= 8.2 ? 80 : d > 0 && d <= 8.4 ? 78 : d > 0 && d <= 8.6 ? 76 : d >
			0 && d <= 8.8 ? 74 : d > 0 && d <= 9 ? 72 : d > 0 && d <= 9.2 ? 70 : d > 0 && d <= 9.4 ? 68 : d >
			0 && d <= 9.6 ? 66 : d > 0 && d <= 9.8 ? 64 : d > 0 && d <= 10 ? 62 : d > 0 && d <= 10.2 ? 60 : d >
			0 && d <= 10.4 ? 50 : d > 0 && d <= 10.6 ? 40 : d > 0 && d <= 10.8 ? 30 : d > 0 && d <= 11 ? 20 :
			d > 0 && d <= 11.2 ? 10 : 0;
	},

	/* 坐位体前屈  男 大一二/大三四 */
	sittingBodyFlex_male_12(u) {
		return u >= 24.9 ? 100 : u >= 23.1 ? 95 : u >= 21.3 ? 90 : u >= 19.5 ? 85 : u >= 17.7 ?
			80 : u >= 16.3 ? 78 : u >= 14.9 ? 76 : u >= 13.5 ? 74 : u >= 12.1 ? 72 : u >= 10.7 ? 70 : u >= 9.3 ?
			68 : u >= 7.9 ? 66 : u >= 6.5 ? 64 : u >= 5.1 ? 62 : u >= 3.7 ? 60 : u >= 2.7 ? 50 : u >= 1.7 ? 40 :
			u >= .7 ? 30 : u > 0 ? 20 : 0;
	},

	sittingBodyFlex_male_34(u) {
		return u >= 25.1 ? 100 : u >= 23.3 ? 95 : u >= 21.5 ? 90 : u >= 19.9 ? 85 : u >= 18.2 ?
			80 : u >= 16.8 ? 78 : u >= 15.4 ? 76 : u >= 14 ? 74 : u >= 12.6 ? 72 : u >= 11.2 ? 70 : u >= 9.8 ?
			68 : u >= 8.4 ? 66 : u >= 7 ? 64 : u >= 5.6 ? 62 : u >= 4.2 ? 60 : u >= 3.2 ? 50 : u >= 2.2 ? 40 :
			u >= 1.2 ? 30 : u >= .2 ? 20 : u > 0 ? 10 : 0;
	},

	/* 坐位体前屈  女 大一二/大三四 */
	sittingBodyFlex_female_12(u) {
		return u >= 25.8 ? 100 : u >= 24 ? 95 : u >= 22.2 ? 90 : u >= 20.6 ? 85 : u >= 19 ? 80 :
			u >= 17.7 ? 78 : u >= 16.4 ? 76 : u >= 15.1 ? 74 : u >= 13.8 ? 72 : u >= 12.5 ? 70 : u >= 11.2 ?
			68 : u >= 9.9 ? 66 : u >= 8.6 ? 64 : u >= 7.3 ? 62 : u >= 6 ? 60 : u >= 5.2 ? 50 : u >= 4.4 ? 40 :
			u >= 3.6 ? 30 : u >= 2.8 ? 20 : u >= 2 ? 10 : 0;
	},

	sittingBodyFlex_female_34(u) {
		return u >= 26.3 ? 100 : u >= 24.4 ? 95 : u >= 22.4 ? 90 : u >= 21 ? 85 : u >= 19.5 ?
			80 : u >= 18.2 ? 78 : u >= 16.9 ? 76 : u >= 15.6 ? 74 : u >= 14.3 ? 72 : u >= 13 ? 70 : u >= 11.7 ?
			68 : u >= 10.4 ? 66 : u >= 9.1 ? 64 : u >= 7.8 ? 62 : u >= 6.5 ? 60 : u >= 5.7 ? 50 : u >= 4.9 ?
			40 : u >= 4.1 ? 30 : u >= 3.3 ? 20 : u >= 2.5 ? 10 : 0;
	},

	/* 立定跳远  男 大一二/大三四*/
	longJump_male_12(n) {
		return n >= 273 ? 100 : n >= 268 ? 95 : n >= 263 ? 90 : n >= 256 ? 85 : n >= 248 ? 80 :
			n >= 244 ? 78 : n >= 240 ? 76 : n >= 236 ? 74 : n >= 232 ? 72 : n >= 228 ? 70 : n >= 224 ? 68 : n >=
			220 ? 66 : n >= 216 ? 64 : n >= 212 ? 62 : n >= 208 ? 60 : n >= 203 ? 50 : n >= 198 ? 40 : n >=
			193 ? 30 : n >= 188 ? 20 : n >= 183 ? 10 : 0;
	},

	longJump_male_34(n) {
		return n >= 275 ? 100 : n >= 270 ? 95 : n >= 265 ? 90 : n >= 258 ? 85 : n >= 250 ? 80 :
			n >= 246 ? 78 : n >= 242 ? 76 : n >= 238 ? 74 : n >= 234 ? 72 : n >= 230 ? 70 : n >= 226 ? 68 : n >=
			222 ? 66 : n >= 218 ? 64 : n >= 214 ? 62 : n >= 210 ? 60 : n >= 205 ? 50 : n >= 200 ? 40 : n >=
			195 ? 30 : n >= 190 ? 20 : n >= 185 ? 10 : 0;
	},

	/* 立定跳远  女 大一二/大三四*/
	longJump_female_12(n) {
		return n >= 207 ? 100 : n >= 201 ? 95 : n >= 195 ? 90 : n >= 188 ? 85 : n >=
			181 ? 80 : n >= 178 ? 78 : n >= 175 ? 76 : n >= 172 ? 74 : n >= 169 ? 72 : n >= 166 ? 70 : n >=
			163 ? 68 : n >= 160 ? 66 : n >= 157 ? 64 : n >= 154 ? 62 : n >= 151 ? 60 : n >= 146 ? 50 : n >=
			141 ? 40 : n >= 136 ? 30 : n >= 131 ? 20 : n >= 126 ? 10 : 0;
	},

	longJump_female_34(n) {
		return n >= 208 ? 100 : n >= 202 ? 95 : n >= 196 ? 90 : n >= 189 ? 85 : n >= 182 ? 80 :
			n >= 179 ? 78 : n >= 176 ? 76 : n >= 173 ? 74 : n >= 170 ? 72 : n >= 167 ? 70 : n >= 164 ? 68 : n >=
			161 ? 66 : n >= 158 ? 64 : n >= 155 ? 62 : n >= 152 ? 60 : n >= 147 ? 50 : n >= 142 ? 40 : n >=
			137 ? 30 : n >= 132 ? 20 : n >= 127 ? 10 : 0;
	},

	/* 1000m 男生  大一大二、大三大四 */
	run1000_male_12(h) {
		return h > 0 && h <= 197 ? 100 : h > 0 && h <= 202 ? 95 : h > 0 && h <= 207 ? 90 : h >
			0 && h <= 214 ? 85 : h > 0 && h <= 222 ? 80 : h > 0 && h <= 227 ? 78 : h > 0 && h <= 232 ? 76 : h >
			0 && h <= 237 ? 74 : h > 0 && h <= 242 ? 72 : h > 0 && h <= 247 ? 70 : h > 0 && h <= 252 ? 68 : h >
			0 && h <= 257 ? 66 : h > 0 && h <= 262 ? 64 : h > 0 && h <= 267 ? 62 : h > 0 && h <= 272 ? 60 : h >
			0 && h <= 292 ? 50 : h > 0 && h <= 312 ? 40 : h > 0 && h <= 332 ? 30 : h > 0 && h <= 352 ? 20 : h >
			0 && h <= 372 ? 10 : 0;
	},

	run1000_male_34(h) {
		return h > 0 && h <= 195 ? 100 : h > 0 && h <= 200 ? 95 : h > 0 && h <= 205 ? 90 : h >
			0 && h <= 212 ? 85 : h > 0 && h <= 220 ? 80 : h > 0 && h <= 225 ? 78 : h > 0 && h <= 230 ? 76 : h >
			0 && h <= 235 ? 74 : h > 0 && h <= 240 ? 72 : h > 0 && h <= 245 ? 70 : h > 0 && h <= 250 ? 68 : h >
			0 && h <= 255 ? 66 : h > 0 && h <= 260 ? 64 : h > 0 && h <= 265 ? 62 : h > 0 && h <= 270 ? 60 : h >
			0 && h <= 290 ? 50 : h > 0 && h <= 310 ? 40 : h > 0 && h <= 330 ? 30 : h > 0 && h <= 350 ? 20 : h >
			0 && h <= 370 ? 10 : 0;
	},

	/* 800m 女生 大一大二、大三大四  */
	run800_female_12(h) {
		return h > 0 && h <= 198 ? 100 : h > 0 && h <= 204 ? 95 : h > 0 && h <= 210 ? 90 : h >
			0 && h <= 217 ? 85 : h > 0 && h <= 224 ? 80 : h > 0 && h <= 229 ? 78 : h > 0 && h <= 234 ? 76 : h >
			0 && h <= 239 ? 74 : h > 0 && h <= 244 ? 72 : h > 0 && h <= 249 ? 70 : h > 0 && h <= 254 ? 68 : h >
			0 && h <= 259 ? 66 : h > 0 && h <= 264 ? 64 : h > 0 && h <= 269 ? 62 : h > 0 && h <= 274 ? 60 : h >
			0 && h <= 284 ? 50 : h > 0 && h <= 294 ? 40 : h > 0 && h <= 304 ? 30 : h > 0 && h <= 314 ? 20 : h >
			0 && h <= 324 ? 10 : 0;
	},

	run800_female_34(h) {
		return h > 0 && h <= 196 ? 100 : h > 0 && h <= 202 ? 95 : h > 0 && h <= 208 ? 90 : h >
			0 && h <= 215 ? 85 : h > 0 && h <= 222 ? 80 : h > 0 && h <= 227 ? 78 : h > 0 && h <= 232 ? 76 : h >
			0 && h <= 237 ? 74 : h > 0 && h <= 242 ? 72 : h > 0 && h <= 247 ? 70 : h > 0 && h <= 252 ? 68 : h >
			0 && h <= 257 ? 66 : h > 0 && h <= 262 ? 64 : h > 0 && h <= 267 ? 62 : h > 0 && h <= 272 ? 60 : h >
			0 && h <= 282 ? 50 : h > 0 && h <= 292 ? 40 : h > 0 && h <= 302 ? 30 : h > 0 && h <= 312 ? 20 : h >
			0 && h <= 322 ? 10 : 0;
	},

	/* 男生 引体向上  大一大二、大三大四 */
	pullUp_12(l) {
		return l >= 19 ? 100 : l >= 18 ? 95 : l >= 17 ? 90 : l >= 16 ? 85 : l >= 15 ? 80 :
			l >= 14 ? 76 : l >= 13 ? 72 : l >= 12 ? 68 : l >= 11 ? 64 : l >= 10 ? 60 : l >= 9 ? 50 : l >= 8 ?
			40 : l >= 7 ? 30 : l >= 6 ? 20 : l >= 5 ? 10 : 0;
	},

	pullUp_34(l) {
		return l >= 20 ? 100 : l >= 19 ? 95 : l >= 18 ? 90 : l >= 17 ? 85 : l >= 16 ? 80 :
			l >= 15 ? 76 : l >= 14 ? 72 : l >= 13 ? 68 : l >= 12 ? 64 : l >= 11 ? 60 : l >= 10 ? 50 : l >= 9 ?
			40 : l >= 8 ? 30 : l >= 7 ? 20 : l >= 6 ? 10 : 0;
	},

	/* 女生 一分钟仰卧起坐  大一大二、大三大四 */
	abdominalCurl_12(l) {
		return l >= 56 ? 100 : l >= 54 ? 95 : l >= 52 ? 90 : l >= 49 ? 85 : l >= 46 ? 80 : l >=
			44 ? 78 : l >= 42 ? 76 : l >= 40 ? 74 : l >= 38 ? 72 : l >= 36 ? 70 : l >= 34 ? 68 : l >= 32 ? 66 :
			l >= 30 ? 64 : l >= 28 ? 62 : l >= 26 ? 60 : l >= 24 ? 50 : l >= 22 ? 40 : l >= 20 ? 30 : l >= 18 ?
			20 : l >= 16 ? 10 : 0;
	},

	abdominalCurl_34(l) {
		return l >= 57 ? 100 : l >= 55 ? 95 : l >= 53 ? 90 : l >= 50 ? 85 : l >= 47 ? 80 : l >=
			45 ? 78 : l >= 43 ? 76 : l >= 41 ? 74 : l >= 39 ? 72 : l >= 37 ? 70 : l >= 35 ? 68 : l >= 33 ? 66 :
			l >= 31 ? 64 : l >= 29 ? 62 : l >= 27 ? 60 : l >= 25 ? 50 : l >= 23 ? 40 : l >= 21 ? 30 : l >= 19 ?
			20 : l >= 17 ? 10 : 0;
	},

	/**加分项 全年级统一标准 
	 * max	最大加分起点
	 * val	参数
	 * */
	plus_pullUp(val, max) {
		// 力量类 计算多出来的
		let f = val - max;
		return f >= 10 ? 10 : f >= 9 ? 9 : f >= 8 ? 8 : f >= 7 ? 7 : f >= 6 ? 6 : f >= 5 ? 5 : f >= 4 ? 4 : f >= 3 ? 3 :
			f >= 2 ? 2 : f >= 1 ? 1 : 0;
	},
	plus_abdominalCurl(val, max) {
		// 力量类 计算多出来的
		let f = val - max;
		return f >= 13 ? 10 : f >= 12 ? 9 : f >= 11 ? 8 : f >= 10 ? 7 : f >= 9 ? 6 : f >= 8 ?
			5 : f >= 7 ? 4 : f >= 6 ? 3 : f >= 4 ? 2 : f >= 2 ? 1 : 0;
	},
	plus_run800(max, val) {
		// 田径类计算 少的
		let f = max - val;
		return f >= 50 ? 10 : f >= 45 ? 9 : f >= 40 ? 8 : f >= 35 ? 7 : f >= 30 ? 6 : f >= 25 ? 5 : f >= 20 ? 4 : f >=
			15 ? 3 : f >= 10 ? 2 : f >= 5 ? 1 : 0;
	},
	plus_run1000(max, val) {
		// 田径类计算 少的
		let f = max - val;
		return f >= 35 ? 10 : f >= 32 ? 9 : f >= 29 ? 8 : f >= 26 ? 7 : f >= 23 ? 6 : f >= 20 ? 5 : f >= 16 ? 4 : f >=
			12 ? 3 : f >= 8 ? 2 : f >= 4 ? 1 : 0;
	},

}
