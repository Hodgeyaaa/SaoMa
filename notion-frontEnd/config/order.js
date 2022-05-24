// 生成订单编号
export let orderCode = function () {
	// var code = ['H', 'O', 'D', 'G', 'E']
	// function shuffle(arr) {
	//     let i = arr.length;
	//     while (--i) {
	//         let j = Math.floor(Math.random() * i);
	//         [arr[j], arr[i]] = [arr[i], arr[j]];
	//     }
	// }
	// shuffle(code)
	// console.log(code)
	var code = ''
	for(var i = 0; i < 8; i++) {
		code += Math.floor(Math.random() * 10)
	}
	code += Date.now()
	return code
	
}