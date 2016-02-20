// by Nicholas Gasior. (C) LaatuGroup 2016.
// June is a tiny library for handling some common JS stuff.

function juneObj() {
  var o=[];
  this.setObj = function(a) {
    o = a;
    return this;
  };
  this.getObj = function() {
    return o;
  };
  this.removeClasses = function(a) {
    for (var oi=0; oi<o.length; oi++) {
      var cl=o[oi].className;
      if (cl!='') {
        var cArr=cl.split(' ');
        var cNew='';
        for (var i=0; i<cArr.length; i++) {
          var f=false;
          for (var j=0; j<a.length; j++) {
            if (cArr[i]==a[j]) {
              f=true;
            }
          }
          if (!f) {
            cNew=cNew+(cNew!=''?' ':'')+cArr[i];
          }
        }
      o[oi].className=cNew;
      }
    }
    return this;
  };
  this.addClasses = function(a) {
    for (var i=0; i<o.length; i++) {
      var cl=o[i].className;
      if (cl!='') {
        var cArr=cl.split(' ');
      } else {
        var cArr=null;
      }
      for (var j=0; j<a.length; j++) {
        var f=false;
        if (cArr!==null) {
          for (var k=0; k<cArr.length; k++) {
            if (cArr[k]==a[j]) {
              f=true;
            }
          }
        }
        if (!f) {
          cl=cl+(cl!=''?' ':'')+a[j];
        }
      }
      o[i].className=cl;
    }
    return this;
  };
  this.value = function(v) {
    var out=[];
    for (var i=0; i<o.length; i++) {
      if (typeof v === 'undefined') {
        out.push(this._getElementValue(o[i]));
      } else {
        this._setElementValue(o[i],v);
      }
    }
    if (typeof v === 'undefined') {
      if (out.length==1) {
        return out[0];
      } else if (out.length==0) {
        return null;
      } else {
        return out;
      }
    } else {
      return this;
    }
  };
  this.setCheckedIfValueMatches = function(v, c) {
    for (var i=0; i<o.length; i++) {
    if (this._canElementBeChecked(o[i])) {
      if (this._getElementValue(o[i])==v) {
        this._setElementChecked(o[i],(c?true:false));
      } else {
        this._setElementChecked(o[i],(c?false:true));
      }
    }
    }
  };
  this.setCheckedIfValuesMatches = function(v, c, s) {
    if (typeof c === 'undefined') {
      c = true;
    }
    if (typeof s === 'undefined') {
      s = '|';
    }
    if (v.indexOf(s) > -1) {
      var valArr = v.split(s);
    } else {
      var valArr = [v];
    }
    for (var i=0; i<o.length; i++) {
      if (this._canElementBeChecked(o[i])) {
        var fnd = false;
        for (var j = 0; j < valArr.length; j++) {
          if (this._getElementValue(o[i]) == valArr[j]) {
            fnd = true;
          }
        }
        if (fnd) {
          this._setElementChecked(o[i], (c?true:false));
        } else {
          this._setElementChecked(o[i], (c?false:true));
        }
      }
    }
  };
  this.getValueIfChecked = function(c) {
    if (typeof c === 'undefined') {
      c = true;
    }
    for (var i=0; i<o.length; i++) {
      if (this._canElementBeChecked(o[i])) {
        var ch=this._getElementChecked(o[i]);
        if ((ch && c)||(!ch && !c)) {
          return this._getElementValue(o[i]);
        }
      }
    }
    return null;
  };
  this.getValuesIfChecked = function(c, s) {
    if (typeof c === 'undefined') {
      c = true;
    }
    if (typeof s === 'undefined') {
      s = '|';
    }
    var out='';
    for (var i=0; i<o.length; i++) {
      if (this._canElementBeChecked(o[i])) {
        var ch=this._getElementChecked(o[i]);
        if ((ch && c)||(!ch && !c)) {
          out=out+(out!=''?s:'')+this._getElementValue(o[i]);
        }
      }
    }
    return out;
  };
  this.checked = function(v) {
    if (typeof v === 'undefined') {
      var out=[];
      for (var i=0; i<o.length; i++) {
        if (this._canElementBeChecked(o[i])) {
          out.push(this._getElementChecked(o[i]));
        }
      }
      if (out.length==1) {
        return out[0];
      } else if (out.length==0) {
        return null;
      } else {
        return out;
      }
    } else {
      for (var i=0; i<o.length; i++) {
        if (this._canElementBeChecked(o[i])) {
          this._setElementChecked(o[i],(v?true:false));
        }
      }
    }
  };
  this.disabled = function(v) {
    if (typeof v === 'undefined') {
      var out=[];
      for (var i=0; i<o.length; i++) {
        out.push(this._getElementDisabled(o[i]));
      }
      if (out.length==1) {
        return out[0];
      } else if (out.length==0) {
        return null;
      } else {
        return out;
      }
    } else {
      for (var i=0; i<o.length; i++) {
        this._setElementDisabled(o[i],(v?true:false));
      }
    }
  };
  this.attribute = function(a, v) {
    if (typeof v === 'undefined') {
      var out=[];
      for (var i=0; i<o.length; i++) {
        out.push(this._getElementAttribute(o[i], a));
      }
      if (out.length==1) {
        return out[0];
      } else if (out.length==0) {
        return null;
      } else {
        return out;
      }
    } else {
      for (var i=0; i<o.length; i++) {
        this._setElementAttribute(o[i], a, v);
      }
    }
  };
  this.style = function(a, v) {
    if (typeof v === 'undefined') {
      var out=[];
      for (var i=0; i<o.length; i++) {
        out.push(this._getElementStyle(o[i], a));
      }
      if (out.length==1) {
        return out[0];
      } else if (out.length==0) {
        return null;
      } else {
        return out;
      }
    } else {
      for (var i=0; i<o.length; i++) {
        this._setElementStyle(o[i], a, v);
      }
    }
  };
  this.html = function(v) {
    if (typeof v === 'undefined') {
      var out=[];
      for (var i=0; i<o.length; i++) {
        out.push(o[i].innerHTML);
      }
      if (out.length==1) {
        return out[0];
      } else if (out.length==0) {
        return null;
      } else {
        return out;
      }
    } else {
      for (var i=0; i<o.length; i++) {
        o[i].innerHTML=v;
      }
    }
  };
  this.remove = function() {
    for (var i=0; i<o.length; i++) {
      o[i].parentNode.removeChild(o[i]);
    }
  };

  this._getElementValue = function (el) {
    var tagName = el.tagName.toLowerCase();
    switch (tagName) {
    case 'select':
      return el.options[el.selectedIndex].value;
      break;
    case 'input':
      var tagType = el.getAttribute('type');
      if (tagType===null) {
        tagType='text';
      }
      switch (tagType) {
        case 'text':
        case 'hidden':
        case 'checkbox':
        case 'radio':
        return el.value;
        break;
      }
      break;
    case 'textarea':
      return el.value;
      break;
    }
    return null;
  };

  this._setElementValue = function (el,v) {
    var tagName = el.tagName.toLowerCase();
    switch (tagName) {
    case 'select':
      for (var i=0; i<el.options.length; i++) {
        if (el.options[i].value == v) {
          el.selectedIndex = i;
          return this;
        }
      }
      break;
    case 'input':
      var tagType = el.getAttribute('type');
      if (tagType===null) {
        tagType='text';
      }
      switch (tagType) {
        case 'text':
        case 'hidden':
        case 'checkbox':
        case 'radio':
          el.value=v;
        return this;
      }
      break;
    case 'textarea':
      el.value=v;
      return this;
      break;
    }
    return this;
  };

  this._canElementBeChecked = function(el) {
    var tagName = el.tagName.toLowerCase();
    var tagType = el.getAttribute('type');
    if (tagType===null) {
      tagType='text';
    }
    if (tagName=='input' && (tagType=='radio' || tagType=='checkbox')) {
      return true;
    } else {
      return false;
    }
  };

  this._setElementChecked = function(el,v) {
    el.checked=(v?true:false);
    return this;
  };

  this._getElementChecked = function(el) {
    return el.checked;
  };

  this._setElementDisabled = function(el,v) {
    el.disabled=(v?true:false);
    return this;
  };

  this._getElementDisabled = function(el) {
    return el.disabled;
  };

  this._setElementAttribute = function(el,a,v) {
    el.setAttribute(a, v);
    return this;
  };

  this._getElementAttribute = function(el,a) {
    return el.getAttribute(a);
  };

  this._setElementStyle = function(el,a,v) {
    el.style[a]=v;
    return this;
  };

  this._getElementStyle = function(el,a) {
    return el.style[a];
  };
}

june = {
  // Counter for uniquely generated ids.
  genIdsCnt: 0,
  // Getting the object and alternatively logging an error.
  obj: function(id, errMsg) {
    var o = document.getElementById(id);
    if (o === null) {
      console.log(errMsg);
    }
    return o;
  },
  // Getting object's width, height, top and left. The object is not a June object.
  coords: function(obj) {
    if (typeof(obj) == 'string') {
      var obj = this.__obj(obj);
    }
    // @todo Needs rewritting to pure JS.
    return {
      w: $(obj).width(),
      h: $(obj).height(),
      l: $(obj).position().left,
      t: $(obj).position().top
    };
  },
  // To be used only in sensible places, eg. when object is created once for a lifetime.
  newObj: function(type, properties) {
    var o = document.createElement(type);
    if (typeof(properties) == 'object') {
      for (p in properties) {
        if (typeof(properties[p]) == 'object') {
          for (p2 in properties[p]) {
            o[p][p2] = properties[p][p2];
          }
        } else {
          o[p] = properties[p];
        }
      }
    }
    return o;
  },
  // Appending one object to another. Just a wrapper to appendChild.
  appendObj: function(obj, tgt) {
    tgt.appendChild(obj);
  },
  // Encoding and decoding '<' and '>' HTML chars.
  encHtml: function(s) {
    return s.replace('<', '&lt;').replace('>', '&gt');
  },
  decHtml: function(s) {
    return s.replace(/\&lt\;/g, '<').replace(/\&gt\;/g, '>');
  },
  // Generates unique id dependant on current datetime and genIdsCnt counter.
  genId = function() {
    var curDate = new Date();
    var curUnixTime = parseInt(curDate.getTime() / 1000);
    curUnixTime = curUnixTime.toString();
    june.genIdsCnt++;
    return 'gen_'+curUnixTime+'_'+(june.genIdsCnt-1);
  },
  // Getting June object.
  get: function (id) {
    var o = new juneObj;
    if (document.getElementById(id)) {
      o.setObj([document.getElementById(id)]);
    }
    return o;
  }
}
