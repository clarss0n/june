// by Mikolaj Gasior <mikolaj at laatu dot uk>. (C) LaatuGroup 2016.
// June is a tiny library for handling some common JS stuff.

// We will try to get the names short but sensible.
function juneObj() {
  // Objects assigned.
  var o=[];

  // Assigning object or array of objects.
  this.set = function(a) { o = a; return this; };
  this.get = function()  { return o;           };

  // Adding/removing classes.
  this.remClass = function(r) {
    for (var oi=0; oi<o.length; oi++) {
      var re_w=/[\t\r\n\f]/g;
      var c=o[oi].className;
      c = c.replace(re_w, ' ');
      if (c != '') {
        var ca=c.split(' ');
        var n='';
        for (var ci=0; ci<ca.length; ci++) {
          if (!ca[ci].match(/^[ ]*$/) && ca[ci]!=r) {
            n+=(n!=''?' ':'')+ca[ci];
          }
        }
        c=n;
      }
      o[oi].className=c; 
    }
    return this;
  };
  this.addClass = function(a) {
    for (var oi=0; oi<o.length; oi++) {
      var re_w=/[\t\r\n\f]/g;
      var c=o[oi].className;
      c = c.replace(re_w, ' ');
      if (c != '') {
        var ca=c.split(' ');
        var n='';
        for (var ci=0; ci<ca.length; ci++) {
          if (!ca[ci].match(/^[ ]*$/) && ca[ci]!=a) {
            n+=(n!=''?' ':'')+ca[ci];
          }
        }
        c=n+(n!=''?' ':'')+a;
      } else {
        c=a;
      }
      o[oi].className=c; 
    }
    return this;
  };

  // Getting/setting the value.
  this.val = function(v) {
    var out=[];
    for (var i=0; i<o.length; i++) {
      if (typeof v === 'undefined') {
        out.push(this._val(o[i]));
      } else {
        this._val(o[i],v);
      }
    }
    if (typeof v === 'undefined') {
      if      (out.length==1) { return out[0]; }
      else if (out.length==0) { return null;   } 
      else                    { return out;    }
    } else {
      return this;
    }
  };

  this.setCheckedIfValueMatches = function(v, c) {
    for (var i=0; i<o.length; i++) {
    if (this._canElementBeChecked(o[i])) {
      if (this._val(o[i])==v) {
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
          if (this._val(o[i]) == valArr[j]) {
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
          return this._val(o[i]);
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
          out=out+(out!=''?s:'')+this._val(o[i]);
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
  this.parent = function() {
    var newObjs = [];
    for (var i=0; i<o.length; i++) {
      newObjs.push(o[i].parentNode);
    }
    this.set(newObjs);
    return this;
  };
  this.next = function() {
    var newObjs = [];
    for (var i=0; i<o.length; i++) {
      newObjs.push(o[i].nextElementSibling);
    }
    this.set(newObjs);
    return this;
  }

  // Getting/setting value.
  this._val = function(o,v) {
    if (typeof(v) == 'undefined')
      return this._valGet(o);
    else
      return this._valSet(o, v);
  };
  this._valGet = function (o) {
    var tag = o.tagName.toLowerCase();
    switch (tag) {
      case 'select': 
        return o.options[o.selectedIndex].value;
      case 'textarea':
        return o.value;
      case 'input':
        var type = o.getAttribute('type');
        if (type===null) {
          type='text';
        }
        switch (type) {
          case 'text':
          case 'hidden':
          case 'checkbox':
          case 'radio':
            return o.value;
        }
        break;
    }
    return null;
  };
  this._valSet = function (o,v) {
    var tag = o.tagName.toLowerCase();
    switch (tag) {
      case 'select':
        for (var i=0; i<o.options.length; i++) {
          if (o.options[i].value == v) {
            o.selectedIndex = i;
            return this;
          }
        }
        break;
      case 'input':
        var type = o.getAttribute('type');
        if (type===null) {
          type='text';
        }
        switch (type) {
          case 'text':
          case 'hidden':
          case 'checkbox':
          case 'radio':
            o.value=v;
            return this;
        }
        break;
      case 'textarea':
        o.value=v;
        return this;
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
    // @todo This definately needs better implementation as offset* properties might not be reliable.
    return {
      w: obj.offsetWidth,
      h: obj.offsetHeight,
      l: obj.offsetLeft,
      t: obj.offsetTop
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
  genId: function() {
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
      o.set([document.getElementById(id)]);
    }
    return o;
  }
}
