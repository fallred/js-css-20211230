var DOM = {
	getElesByClass(strClass, contextEle) {
	  if (typeof strClass !== 'string') {
		throw new Error('第一个参数strClass错误!');
	  }
  
	  function getEle(strClass, eles) { // 获取只包括一个类的函数
		const a = [];
		const reg = new RegExp('(?:^| +)' + strClass + '(?: +|$)');
		for (let i = 0; i < eles.length; i++) {
		  if (reg.test(eles[i].className)) {
			a.push(eles[i]);
		  }
		}
		return a;
	  }
	  // 以上这些是个单独的模块
	  contextEle = contextEle || document;
	  if (contextEle.nodeType !== 1 && contextEle.nodeType !== 9) {
		throw new Error('第二个参数contextEle错误!');
	  }
	  if (contextEle.getElementsByClassName) {
		return contextEle.getElementsByClassName(strClass);
	  }
	  let aClass = [];
	  aClass = strClass.split(' ');
	  let eles = contextEle.getElementsByTagName('*');
	  for (let i = 0; i < aClass.length; i++) {
		if (aClass[i].replace(/\s/g, '').length > 0) { eles = getEle(aClass[i], eles); }
	  }
	  return eles;
  
	},
	removeClass(ele, strClass) {
	  if (!(ele && ele.nodeType === 1)) {
		throw new Error('第一参数ele需要是一个DOM元素对象');
	  }
	  if (typeof strClass !== 'string') {
		throw new Error('第二参数必须为string类型');
	  }
  
	  const reg = new RegExp('(?:^| +)' + strClass + '(?: +|$)');
	  ele.className = ele.className.replace(reg, ' ');
	},
	addClass(ele, strClass) {
	  const reg = new RegExp('(?:^| +)' + strClass + '(?: +|$)');
	  if (reg.test(ele.className)) {
		// 如果此类样式已经存在，则什么也不需要做
	  } else {
		// 不存在
		ele.className = ele.className.trim() + ' ' + strClass;
	  }
	},
	domToString(node) {
	  let tmpNode = document.createElement('div');
	  tmpNode.appendChild(node);
	  const str = tmpNode.innerHTML;
	  tmpNode = node = null;
	  return str;
	},
};
  