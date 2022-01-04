var DOM = {};
//通过类名获取元素
DOM.getByClass = function(eles, className) {
    //正则表达式,用来匹配一个类名，左右两边为空格或者是边界
    var reg = new RegExp("(?:^| +)" + className + "(?: +|$)");
    //初始化一个空数组，用来存放匹配到的元素
    var a = [];
    for (var i = 0; i < eles.length; i++) {
        var ele = eles[i];
        if (reg.test(ele.className)) {
            a.push(ele);
        }
    }
    return a;
}

//获取某个范围下以strSclass为类名的所有元素
DOM.getElesByClass = function(context, strClass) {
    if (context.getElementsByClassName) {
        return context.getElementsByClassName(strClass);
    }
    var eles = context.getElementsByTagName('*');
    var aClass = strClass.split(/ +/);
    for (var i = 0; i < aClass.length; i++) {
        eles = DOM.getByClass(eles, aClass[i]);
        //i为0时，eles为：在eles中查找类名为aClass[0]的元素，如果存在就将这些元素返回
        //i为1时，eles为：在第一次筛选出来的eles中继续筛选类名为aClass[1]的元素，如果匹配就将这些元素返回
        //依次类推。当类名为一个时，就是满足这一个类名的所有元素。当类名为一个数组时，eles就是满足所有类名的元素
    }
    return eles;
}

//通过类名获取元素的方法（此类名是多个类名以空格区分开来的）重复的方法
function getEleByClassName(context, strClass) {
    //通过类名获取元素的方法（此类名为单一类名）
    function getEleByClass(eles, className) {
        var a = [];
        //定义匹配类名的正则表达式
        var reg = new RegExp('\\b' + className + '\\b');
        //循环遍历所有要匹配类名的元素
        for (var i = 0; i < eles.length; i++) {
            var ele = eles.item(i);
            if (reg.test(ele.className)) {
                a.push(ele); //将匹配成功的元素放入数组中
            }
        }
        return a;
    }
    //如果第一个参数没有传进来，则就默认获取document下面的所有元素
    var context = context || document;
    //获取所有指定范围下的所有元素
    var eles = context.getElementsByTagName('*');
    //将类名开头和结尾的边界部分用空格替换
    strClass = strClass.replace(/^ +| +$/g, '');
    //用空格将类名字符串参数分隔开
    var aClass = strClass.split(/ +/);
    for (var j = 0; j < aClass.length; j++) {
        //调用通过类名获取元素的方法（此类名为单一类名）
        eles = getEleByClass(eles, aClass[j]);
    }
    return eles;
}

//添加样式
DOM.addClass = function(ele, strClass) {
    //正则表达式
    var reg = new RegExp("(?:^| +)" + strClass + "(?: +|$)");
    //如果不存在这个类名，则将这个类名追加在这个字符串的后面，中间以空格隔开
    if (!reg.test(ele.className)) {
        ele.className = ele.className.trim() + ' ' + strClass;
    }
}

//删除样式
DOM.removeClass = function(ele, strClass) {
    //正则表达式
    var reg = new RegExp("(?:^| +)" + strClass + "(?: +|$)", "g"); //模式匹配符g，全文多次查找
    //将className中指定的类名strClass移除
    ele.className = ele.className.replace(reg, '');
}


//1、获取当前节点的下一个元素节点的方法一
//传进来的参数是元素本身
DOM.nextEleNode = function(ele) {
    //var oDiv=oDivs.item(1);
    //获取元素的下一个弟弟元素
    var next = ele.nextSibling;
    while (next) {
        //如果下一个弟弟节点是元素节点，
        if (next.nodeType == 1) {
            return next;
        }
        //不是元素节点，依次取出弟弟节点，直至为元素节点
        next = next.nextSibling;
    }
    return null;
}

//这种方法是将下一个兄弟元素传进来
DOM.nextEleNode1 = function(nextNode) {
    //如果下一个兄弟元素是元素节点
    if (nextNode.nodeType == 1) {
        return nextNode;
    } else {
        //如果不是元素节点，就反复调用方法本身，递归
        return arguments.callee(nextNode.nextSibling); //把运行的fn3方法返回
        // return getNextOne(nextNode.nextSibling);
    }
    return null;
}

//获得指定标记名的所有弟弟元素
DOM.getNextAll = function(ele, tagName) {
    //创建一个数组，用来存放运算出来的一组弟弟元素
    var a = [];
    //调用fn2方法，算出，ele的单一弟弟节点
    var next = DOM.nextEleNode(ele);
    //先判断tagname是否传进来了，如果传进来了，判断tagName是否是string类型的
    if (tagName && typeof tagName == 'string') {
        //循环判断下一个弟弟元素是否存在
        while (next) {
            //如果存在，则判断弟弟元素的标签名，是否和传进来的所要找的标签名字一致
            if (next.tagName.toLowerCase() == tagName.toLowerCase())
            //将满足要求的弟弟元素放入数组a中
                a.push(next);
            //获取下一个弟弟元素的下一个
            next = DOM.nextEleNode(next);
        }
    } else {
        //如果第二个参数没有传进来，则直接将所有的弟弟元素放入数组中并一起返回
        while (next) {
            a.push(next);
            next = DOM.nextEleNode(next);
        }
    }
    return a;
}


DOM.getLastChd = function(eles) {
    //判断eles是否是一个数组，如果是数组，则应该有Length属性，并且数组长度必须>0
    if (eles && eles.length && eles.length > 0) {
        var a = [];
        for (var i = 0; i < eles.length; i++) {
            if (eles[i] && eles[i].nodeType && eles[i].nodeType === 1) {
                var ele = nextEleNode(eles[i]);
                //如果ele存在，且存在nodeType属性，且nodeType的值为1
                //如果ele为空，则表示，元素节点不存在
                if (ele == null) {
                    //或 if(!ele)
                    a.push(ele);
                }
            } else {
                alert('参数中的第' + '个对象不符合条件！');
            }
        }
        return a;
    }
}


//获取所有指定标签名的孩子节点元素
DOM.Children = function(ele, tagName) {
    //ele为DOM对象
    DOM.assertElement(ele);
    //获取ele元素下的所有孩子节点
    var childNodes = ele.childNodes;
    //定义一个数组
    var a = [];
    if (typeof tagName == 'undefinded') {
        //如果第二个参数没有传值，则默认获取ele元素下的所有孩子节点
        for (var i = 0; i < childNodes.lendth; i++) {
            var child = childNodes[i];
            if (child.nodeType == 1) {
                a.push(child);
            }
        }
    } else if (typeof tagName == 'string') {
        //如果第二个参数传进来了
        //tagName默认为大写，所以应该将传进来的参数转化为大写
        tagName = tagName.toUpperCase();
        for (var i = 0; i < childNodes.length; i++) {
            var child = childNodes[i];
            if (child.nodeType == 1 && child.nodeName == tagName) {
                a.push(child);
            }
        }
    } else {
        throw new Error('第二个参数类型错误');
    }
    return a;
}




//获得ele所有相邻的元素节点或者是相邻的非元素节点
DOM.closet = function(ele) {
    var a = [];
    //获取所有的弟弟元素节点
    var p = ele.previousElementSibling;
    //如果获取到的所有弟弟元素师一个数组的话，那么通过typeof运算出来的类型就是一个object类型的
    if (typeof p == "object") {
        //如果存在弟弟元素
        if (p) {
            a.push(p);
        }
        var n = ele.nextElementSibling;
        //如果存在下一个哥哥元素
        if (n) {
            a.push(n);
        }
        return a; //将数组a返回 
    }
    var p = ele.previousSibling;
    var n = ele.nextSibling;
    while (p) {
        if (p.nodeType == 1) {
            a.push(p);
            break;
        }
        p = p.previousSibling;
    }
    while (n) {
        if (n.nodeType == 1) {
            a.push(n);
            break;
        }
        n = n.nextSibling;
    }
}



//将一个元素插入到指定元素的后面
DOM.insertAfter = function(oldEle, newEle) {
    if (oldEle && oldEle.nodeType && oldEle.nodeType == 1 && newEle && newEle.nodeType && newEle.nodeType == 1) {
        oldEle.nextSibling ? oldEle.parentNode.insertBefore(newEle, oldEle.nextSibling) : oldEle.parentNode.appendChild(newEle);
    } else {
        throw new Error('参数类型出错');
    }
}

//将newNode当做第一个子节点追加给parenrNode，类似于appendChild
DOM.prepend = function(parentEle, newNode) {
    var child = parentEle.firstChild;
    child ? parentEle.insertBefore(newNode, child) : parentEle.appendChild(newNode);
}

//所有的上一个元素节点,与nextSiblings(fn2,fn3类似)
DOM.preSiblings = function(currentEle, tag) {
    var pre = currentEle.previousSibling;
    var a = [];
    while (pre) {
        if (typeof tag == 'string') {
            tag = tag.toUpperCase();
            if (pre.nodeType == 1 && pre.tagName == tag)
                a.unshift(pre);
        } else if (typeof tag == 'undefinded') {
            a.unshift(pre);
        }
        pre = pre.previousSibling;
    }
    return a;
}

//所有的下一个元素节点
DOM.nextSibling1 = function(currentEle) {
    var next = currentEle.nextSibling;
    var a = [];
    while (next) {
        tag = tag.toUpperCase();
        if (next.nodeType == 1)
            a.unshift(next);
        next = next.nextSibling;
    }
    return a;
}
DOM.nextSiblings = function(currentEle, tag) {
    var next = currentEle.nextSibling;
    var a = [];
    while (next) {
        if (typeof tag == 'string') {
            tag = tag.toUpperCase();
            if (next.nodeType == 1 && next.tagName == tag)
                a.unshift(next);
        } else if (typeof tag == 'undefinded') {
            if (next.nodeType == 1)
                a.unshift(next);
        }
        next = next.nextSibling;
    }
    return a;
}

//获得所有兄弟节点（包括哥哥节点和弟弟节点）
DOM.siblings = function(ele, tag) {
    //调用获取所有弟弟元素的方法
    var pre = DOM.preSiblings(ele, tag);
    //调用获取所有哥哥元素的方法
    var next = DOM.nextSiblings(ele, tag);
    //再将弟弟元素的数组拼接上哥哥元素的数组
    var allSibling = pre.concat(next);
    return allSibling;
}

//将类数组转化为数组
DOM.listToArray = function(eles) {
    try {
        var a = [].slice.call(eles, 0); //借用数组的slice的方法，eles.slice(0);
    } catch (e) {
        var a = [];
        for (var i = 0; i < eles.length; i++) {
            a.push(eles[i]); //如果产生异常，则遍历每个元素，然后将每个遍历到的元素放入数组中
        }
    }
    return a; //将该数组返回
}

//获取所有的弟弟元素节点个数
DOM.getIndex = function(eles) {
    var index = 0;
    for (var p = eles.previousSibling; p;) {
        if (p.nodeType == 1) { //如果为元素节点
            index++; //则数量加1
        }
        p = p.previousSibling;
    }
    return index;
}

//克隆类数组ele
DOM.assertElement = function(ele) {
    try {
        ele.cloneNode(true);
        if (ele.nodeType != 1 && ele.nodeType != 9) {
            throw new Error('');
        }
    } catch (e) {
        throw new Error('ele参数不合法');
    }
}