/*
* @Author: CuiXing
* @Date:   2018-02-17 20:03:23
* @Last Modified by:   CuiXing
* @Last Modified time: 2018-02-17 20:59:37
*/
require('page/common/header-sim/index.js');
require('./index.css');

var _mm = require('util/mm.js');

$(function(){
    var type        = _mm.getUrlParam('type') || 'default',
        $element    = $('.' + type + '-success');
    // 显示对应的提示元素
    $element.show();
})