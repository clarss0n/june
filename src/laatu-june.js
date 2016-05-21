// by Nicholas Gasior <nicholas at laatu dot uk>. (C) LaatuGroup 2016.
// June is a tiny library for handling some common JS stuff.

// We will try to get the names short but sensible.
var j_ = (function() {
    // Objects assigned.
    var o=[];

    // Assigning object or array of objects.
    var setObjs = function(a) { o = a; return j_; };
    var getObjs = function()  { return o;         };

    // Adding/removing classes.
    var remClass = function(r) {
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
    var addClass = function(a) {
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

    // Coords.
    var coords = function() {
        var out=[];
        for (var i=0; i<o.length; i++) {
            var _height = "innerHeight" in o[i] ? o[i].innerHeight : o[i].offsetHeight;
            var _width  = "innerWidth"  in o[i] ? o[i].innerWidth  : o[i].offsetWidth;
            var _left   = o[i].offsetLeft;
            var _top    = o[i].offsetTop;
            out.push({
                w: _width,
                h: _height,
                l: _left,
                t: _top
            });
        }
        if (out.length==1)      { return out[0]; }
        else if (out.length==0) { return null;   }
        else                    { return out;    }
    };

    // Getting/setting the value.
    var val = function(v) {
        var out=[];
        for (var i=0; i<o.length; i++) {
            if (typeof v === 'undefined') {
                out.push(_val(o[i]));
            } else {
                _val(o[i],v);
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

    var setCheckedIfValueMatches = function(v, c) {
        for (var i=0; i<o.length; i++) {
            if (_canElementBeChecked(o[i])) {
                if (_val(o[i])==v) {
                    _setElementChecked(o[i],(c?true:false));
                } else {
                    _setElementChecked(o[i],(c?false:true));
                }
            }
        }
        return this;
    };

    var setCheckedIfValuesMatches = function(v, c, s) {
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
            if (_canElementBeChecked(o[i])) {
                var fnd = false;
                for (var j = 0; j < valArr.length; j++) {
                    if (_val(o[i]) == valArr[j]) {
                        fnd = true;
                    }
                }
                if (fnd) {
                    _setElementChecked(o[i], (c?true:false));
                } else {
                    _setElementChecked(o[i], (c?false:true));
                }
            }
        }
        return this;
    };

    var getValueIfChecked = function(c) {
        if (typeof c === 'undefined') {
            c = true;
        }
        for (var i=0; i<o.length; i++) {
            if (_canElementBeChecked(o[i])) {
                var ch=_getElementChecked(o[i]);
                if ((ch && c)||(!ch && !c)) {
                    return _val(o[i]);
                }
            }
        }
        return null;
    };

    var getValuesIfChecked = function(c, s) {
        if (typeof c === 'undefined') {
            c = true;
        }
        if (typeof s === 'undefined') {
            s = '|';
        }
        var out='';
        for (var i=0; i<o.length; i++) {
            if (_canElementBeChecked(o[i])) {
                var ch=_getElementChecked(o[i]);
                if ((ch && c)||(!ch && !c)) {
                    out=out+(out!=''?s:'')+_val(o[i]);
                }
            }
        }
        return out;
    };

    var checked = function(v) {
        if (typeof v === 'undefined') {
            var out=[];
            for (var i=0; i<o.length; i++) {
                if (_canElementBeChecked(o[i])) {
                    out.push(_getElementChecked(o[i]));
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
                if (_canElementBeChecked(o[i])) {
                    _setElementChecked(o[i],(v?true:false));
                }
            }
            return this;
        }
    };

    var disabled = function(v) {
        if (typeof v === 'undefined') {
            var out=[];
            for (var i=0; i<o.length; i++) {
                out.push(_getElementDisabled(o[i]));
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
                _setElementDisabled(o[i],(v?true:false));
            }
            return this;
        }
    };

    var attribute = function(a, v) {
        if (typeof v === 'undefined') {
            var out=[];
            for (var i=0; i<o.length; i++) {
                out.push(_getElementAttribute(o[i], a));
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
                _setElementAttribute(o[i], a, v);
            }
            return this;
        }
    };

    var style = function(a, v) {
        if (typeof v === 'undefined') {
            var out=[];
            for (var i=0; i<o.length; i++) {
                out.push(_getElementStyle(o[i], a));
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
                _setElementStyle(o[i], a, v);
            }
            return this;
        }
    };

    var html = function(v) {
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
            return this;
        }
    };

    var remove = function() {
        for (var i=0; i<o.length; i++) {
            o[i].parentNode.removeChild(o[i]);
        }
    };

    var parent = function() {
        var newObjs = [];
        for (var i=0; i<o.length; i++) {
            newObjs.push(o[i].parentNode);
        }
        this.setObjs(newObjs);
        return this;
    };

    var next = function() {
        var newObjs = [];
        for (var i=0; i<o.length; i++) {
            newObjs.push(o[i].nextElementSibling);
        }
        this.setObjs(newObjs);
        return this;
    };

    // Events.
    var on = function(n, f) {
        for (var i=0; i<o.length; i++) {
            o[i].addEventListener('on'+n, f);
        }
        return this;
    };

    // Getting/setting value.
    var _val = function(o,v) {
        if (typeof(v) == 'undefined')
            return _valGet(o);
        else
            return _valSet(o, v);
    };
    var _valGet = function (o) {
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
                    case 'password':
                    case 'hidden':
                    case 'checkbox':
                    case 'radio':
                        return o.value;
                }
                break;
        }
        return null;
    };

    var _valSet = function (o,v) {
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
                    case 'password':
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

    var _canElementBeChecked = function(el) {
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

    var _setElementChecked = function(el,v) {
        el.checked=(v?true:false);
        return this;
    };

    var _getElementChecked = function(el) {
        return el.checked;
    };

    var _setElementDisabled = function(el,v) {
        el.disabled=(v?true:false);
        return this;
    };

    var _getElementDisabled = function(el) {
        return el.disabled;
    };

    var _setElementAttribute = function(el,a,v) {
        el.setAttribute(a, v);
        return this;
    };

    var _getElementAttribute = function(el,a) {
        return el.getAttribute(a);
    };

    var _setElementStyle = function(el,a,v) {
        el.style[a]=v;
        return this;
    };

    var _getElementStyle = function(el,a) {
        return el.style[a];
    };


    // Counter for uniquely generated ids.
    var genIdsCnt = 0;

    // Getting the object and alternatively logging an error.
    var obj = function(id, errMsg) {
        var o = document.getElementById(id);
        if (o === null) {
            console.log(errMsg);
        }
        return o;
    };

    // To be used only in sensible places, eg. when object is created once for a lifetime.
    var newObj = function(type, properties) {
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
    };

    // Appending one object to another. Just a wrapper to appendChild.
    var appendObj = function(obj, tgt) {
        tgt.appendChild(obj);
    };

    // Encoding and decoding '<' and '>' HTML chars.
    var encHtml = function(s) {
        return s.replace('<', '&lt;').replace('>', '&gt');
    };
    var decHtml = function(s) {
        return s.replace(/\&lt\;/g, '<').replace(/\&gt\;/g, '>');
    };

    // Generates unique id dependant on current datetime and genIdsCnt counter.
    var genId = function() {
        var curDate = new Date();
        var curUnixTime = parseInt(curDate.getTime() / 1000);
        curUnixTime = curUnixTime.toString();
        june.genIdsCnt++;
        return 'gen_'+curUnixTime+'_'+(june.genIdsCnt-1);
    };

    // Getting object on which we are going do various action (eg. change styles).
    var get = function (i) {
        if (typeof(i) == 'object') {
            setObjs([i]);
        } else {
            if (document.getElementById(i)) {
                setObjs([document.getElementById(i)]);
            }
        }
        return this;
    };

    // Run function on document load.
    var onDocLoad = function(f) {
        var r = setInterval(function() {
            if (document.readyState == 'complete') {
                clearInterval(r);
                f();
            }
        }, 10);
    };

    return {
        get                         : get,

        remClass                    : remClass,
        addClass                    : addClass,
        coords                      : coords,
        val                         : val,
        setCheckedIfValueMatches    : setCheckedIfValueMatches,
        setCheckedIfValuesMatches   : setCheckedIfValuesMatches,
        getValueIfChecked           : getValueIfChecked,
        getValuesIfChecked          : getValuesIfChecked,
        checked                     : checked,
        disabled                    : disabled,
        attribute                   : attribute,
        style                       : style,
        html                        : html,
        remove                      : remove,
        parent                      : parent,
        next                        : next,
        on                          : on,
        
        genId                       : genId,
        encHtml                     : encHtml,
        decHtml                     : decHtml,
        appendObj                   : appendObj,
        newObj                      : newObj,
        obj                         : obj,
        onDocLoad                   : onDocLoad
    };
})();

