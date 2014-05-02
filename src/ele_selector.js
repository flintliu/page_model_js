// Element selector
// Author: Flint LIU
// Email: flintliu@hotmail.com

'use strict';

var objects = require('./object_models');

var ElementSelector = function(element_name, elements_info, driver) {
	if (!typeof element === 'string') {
		throw Error('The ElementSelector need a string as element name.');
	}
	this.element_name = element_name
	if (!typeof element === 'object') {
		throw Error('The ElementSelector need a json objecy as element info.');
	}
	this.elements_info = elements_info
	if (!typeof driver === 'object') {
		throw Error('The ElementSelector need a driver objecy as driver.');
	}
	this.driver = driver
}

ElementSelector.prototype.getEleInfo = function(ele_name){
	ele_info_ = this.elements_info[ele_name]
	root_ele_ = ele_info[0]
	selec_method_ = ele_info[1]
	arg_ele_ = ele_info[2]
	ele_type_ = ele_info[3]
	return [root_ele_, selec_method_, arg_ele_, ele_type_]
}

ElementSelector.prototype.elementSelector = function(driver){
	if (this.path_flow == 1){
		return driver
	}
	else{
		this.path_flow.pop()
		s_method_ = this.getEleInfo(this.path_flow.slice(-1)[0])[1]
		arg_ele_ = this.getEleInfo(this.path_flow.slice(-1)[0])[2]
		if (s_method_ == "id") {
			driver = driver.find_element_by_id(arg_ele)
		}
        else if (s_method_ == "ids") {
        	driver = _driver.find_elements_by_id(arg_ele)	
        }
        else if (s_method_ == "xpath") {
            driver = _driver.find_element_by_xpath(arg_ele)
        }
        else if (s_method_ == "name") {
            driver = _driver.find_element_by_name(arg_ele)
        }
        else if (s_method_ == "className") {
            driver = _driver.find_element_by_class_name(arg_ele)
        }
        else if (s_method_ == "tagName") {
            driver = _driver.find_element_by_tag_name(arg_ele)
        }
        else if (s_method_ == "tagNames") {
            driver = _driver.find_elements_by_tag_name(arg_ele)
        }
        else if (s_method_ == "linkText") {
        	driver = _driver.find_element_by_link_text(arg_ele)
        }
        else if (s_method_ == "linkPartialText") {
        	driver = _driver.find_element_by_partial_link_text(arg_ele)
        }
        else if (s_method_ == "css") {
        	driver = _driver.find_element_by_css_selector(arg_ele)
        }
        return self.element_selector(driver)
	}
}

ElementSelector.prototype.pathBuilder = function(root_ele){
	this.path_flow.push(root_ele)
	if (this.path_flow.slice(-1)[0] == "window"){
		return NaN
	}
	else {
		root_ele = this.getEleInfo(root_ele)[0]
		return this.pathBuilder(root_ele)
	}
}

ElementSelector.prototype.getElement = function(){
	this.pathBuilder(this.ele_name)
	element_ = this.elementSelector(this.driver)
	ele_type_ = this.getEleInfo(this.ele_name)[3]
	if (ele_type != "" & objects.OBJECTMAP.hasOwnProperty(ele_type))
}