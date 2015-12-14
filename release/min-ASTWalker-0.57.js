(function(){var t={},i=function(){!function(t){t.on=function(t,i){return this._ev||(this._ev={}),this._ev[t]||(this._ev[t]=[]),this._ev[t].push(i),this},t.removeListener=function(t,i){if(this._ev&&this._ev[t])for(var e=this._ev[t],n=0;n<e.length;n++)if(e[n]==i)return void e.splice(n,1)},t.trigger=function(t,i,e){if(this._ev&&this._ev[t]){return this._ev[t].forEach(function(t){t(i,e)}),this}}}(this),function(t){t.ArrayExpression=function(t,i){var e=this;if(t.elements&&t.elements.length>=0){this.out("[");var n=0;t.elements.forEach(function(t){n++>0&&e.out(","),e.trigger("ArrayElement",t),e.walk(t,i)}),this.out("]")}},t.ArrayPattern=function(t,i){var e=this;if(t.elements&&t.elements.length>0){this.out("[");var n=0;t.elements.forEach(function(t){n++>0&&e.out(","),e.trigger("ArrayElement",t),e.walk(t,i)}),this.out("]")}},t.ArrowExpression=function(){},t.ArrowFunctionExpression=function(t,i){this.out("function"),t.generator&&(this.trigger("FunctionGenerator",t),this.out("* ")),t.id&&t.id.name?(console.log("ERROR: ArrowFunctionExpression should not have name"),this.trigger("FunctionName",t),this.out(" "+t.id.name+" ")):this.trigger("FunctionAnonymous",t);var e=this;this.out("(");var n=0;t.params.forEach(function(s){if(n++>0&&e.out(","),e.trigger("FunctionParam",s),e.walk(s,i),t.defaults&&t.defaults[n-1]){var o=t.defaults[n-1];e.out("="),e.trigger("FunctionDefaultParam",o),e.walk(o,i)}}),this.out(")"),e.trigger("FunctionBody",t.body),this.walk(t.body,i)},t.AssignmentExpression=function(t,i){this.trigger("AssigmentLeft",t.left),this.walk(t.left,i),this.out(" "+t.operator+" "),this.trigger("AssigmentRight",t.right),this.walk(t.right,i)},t.BinaryExpression=function(t,i){var e=!0,n=!0;("Identifier"==t.left.type||"Literal"==t.left.type)&&(e=!1),("Identifier"==t.right.type||"Literal"==t.right.type)&&(n=!1),e&&this.out("("),this.walk(t.left,i),e&&this.out(")"),this.out(" "+t.operator+" "),n&&this.out("("),this.walk(t.right,i),n&&this.out(")")},t.BlockStatement=function(t,i){this.out(" {",!0),this.indent(1),this.walk(t.body,i,!0),this.indent(-1),this.out("}")},t.BreakStatement=function(t,i){this.nlIfNot(),this.out("break "),t.label&&this.walk(t.label,i),this.out("",!0)},t.breakWalk=function(){this._breakWalk=!0},t.CallExpression=function(t,i){if(t.callee){if("FunctionExpression"==t.callee.type&&this.out("("),this.walk(t.callee,i),"FunctionExpression"==t.callee.type&&this.out(")"),this.out("("),t.arguments){var e=this,n=0;t.arguments.forEach(function(t){n++>0&&e.out(", "),e.walk(t,i)})}this.out(")")}},t.CatchClause=function(t,i){this.out(" catch "),t.param&&(this.out("("),this.walk(t.param,i),this.out(")")),t.body&&this.walk(t.body,i)},t.ClassBody=function(t,i){this.out("{",!0),this.indent(1),this.walk(t.body,i),this.indent(-1),this.out("}",!0)},t.ClassDeclaration=function(t,i){this.out("class "),t.id&&(this.walk(t.id,i),this.out(" ")),t.superClass&&(this.trigger("Extends",t.superClass),this.out(" extends "),this.walk(t.superClass,i)),t.body&&this.walk(t.body,i)},t.ConditionalExpression=function(t,i){this.walk(t.test,i),this.out(" ? "),this.walk(t.consequent,i),this.out(" : "),this.walk(t.alternate,i)},t.ContinueStatement=function(t,i){this.nlIfNot(),this.out("continue "),t.label&&this.walk(t.label,i),this.out("",!0)},t.createContext=function(t){this._objects||(this._objects={});var i=this.createId(),e={id:i,vars:{},functions:{},parentCtx:t};return this._objects[i]=e,e},t.createId=function(t){return this._localId||(this._localId=0),this._localId++,(t?t:"")+this._localId},t.createObject=function(t,i){this._objects||(this._objects={}),this._objects[t]=i},t.DebuggerStatement=function(){this.nlIfNot(),this.out("debugger;")},t.DoWhileStatement=function(t,i){if(this.nlIfNot(),this.out("do ",!0),t.body){var e=!1;"BlockStatement"!=t.body.type&&t.body.type.indexOf("Statement")>=0&&(e=!0),e&&(this.out("{"),this.indent(1)),this.walk(t.body,i),e&&(this.indent(-1),this.out("}"))}this.out(" "),t.test&&(this.out("while("),this.trigger("DoWhileTest",t.test),this.walk(t.test,i),this.out(")")),this.out("",!0)},t.EmptyStatement=function(){},t.endBlock=function(){this.out("}",!0),this.indent(-1)},t.endCollecting=function(){this._collecting=!1},t.ExpressionStatement=function(t,i){this.nlIfNot(),this.walk(t.expression,i),this.out(";",!0)},t.find=function(){},t.ForInStatement=function(t,i){if(this.nlIfNot(),this.out("for"),this.out("("),t.left&&(this.trigger("ForInLeft",t.left),this.walk(t.left,i)),this.out(" in "),t.right&&(this.trigger("ForInRight",t.right),this.walk(t.right,i)),this.out(")"),t.body){this.trigger("ForInBody",t.body);var e=!1;"BlockStatement"!=t.body.type&&t.body.type.indexOf("Statement")>=0&&(e=!0),e&&(this.out("{"),this.indent(1)),this.walk(t.body,i),e&&(this.indent(-1),this.out("}"))}this.out("",!0)},t.ForOfStatement=function(t,i){if(this.nlIfNot(),this.out("for"),this.out("("),t.left&&(this.trigger("ForOfLeft",t.left),this.walk(t.left,i)),this.out(" of "),t.right&&(this.trigger("ForOfRight",t.right),this.walk(t.right,i)),this.out(")"),t.body){this.trigger("ForOfBody",t.body);var e=!1;"BlockStatement"!=t.body.type&&t.body.type.indexOf("Statement")>=0&&(e=!0),e&&(this.out("{"),this.indent(1)),this.walk(t.body,i),e&&(this.indent(-1),this.out("}"))}this.out("",!0)},t.ForStatement=function(t,i){if(this.out("for"),this.out("("),t.init&&this.walk(t.init,i),this.out("; "),t.test&&this.walk(t.test,i),this.out("; "),t.update&&this.walk(t.update,i),this.out(")"),t.body){var e=!1;"BlockStatement"!=t.body.type&&t.body.type.indexOf("Statement")>=0&&(e=!0),e&&(this.out("{"),this.indent(1)),this.walk(t.body,i),e&&(this.indent(-1),this.out("}"))}this.out("",!0)},t.FunctionDeclaration=function(t,i){var e=this.createContext(i);t.contextId=e.id,this.out("function"),t.generator&&this.out("*"),t.id&&t.id.name?(this.trigger("FunctionName",t),this.out(" "+t.id.name+" "),t.id.name&&(i.functions[t.id.name]=t)):this.trigger("FunctionAnonymous",t);var n=this;this.out("(");var s=0;t.params.forEach(function(i){if(s++>0&&n.out(","),n.trigger("FunctionParam",i),n.walk(i,e),t.defaults&&t.defaults[s-1]){var o=t.defaults[s-1];n.out("="),n.trigger("FunctionDefaultParam",o),n.walk(o,e)}}),this.out(")"),n.trigger("FunctionBody",t.body),this.walk(t.body,e)},t.FunctionExpression=function(t,i){var e=this.createContext(i);t.contextId=e.id,this.__insideMethod||this.out("function"),t.generator&&(this.trigger("FunctionGenerator",t),this.out("* ")),t.id&&t.id.name?(this.trigger("FunctionName",t),this.out(" "+t.id.name+" "),t.id.name&&i.functions[t.id.name]==t):this.trigger("FunctionAnonymous",t);var n=this;this.out("(");var s=0;t.params.forEach(function(i){if(s++>0&&n.out(","),n.trigger("FunctionParam",i),n.walk(i,e),t.defaults&&t.defaults[s-1]){var o=t.defaults[s-1];n.out("="),n.trigger("FunctionDefaultParam",o),n.walk(o,e)}}),this.out(")"),n.trigger("FunctionBody",t.body),this.walk(t.body,e)},t.getCode=function(){return this._codeStr},t.getLineNumber=function(){return this._lineNumber},t.getParent=function(t){if(t){if(t.nodeid){var i=this._nodeParents[t.nodeid];return i}}else if(this._path){var e=this._path.length;return this._path[e-1]}},t.getStructures=function(){return this._structures},t.Identifier=function(t){this.out(t.name)},t.IfStatement=function(t,i){if(this.nlIfNot(),this.out("if("),this.trigger("IfTest",t.test),this.walk(t.test,i),this.out(")"),t.consequent){var e=!1;"BlockStatement"!=t.consequent.type&&(e=!0),this.trigger("IfConsequent",t.consequent),e&&(this.out("{"),this.indent(1)),this.walk(t.consequent,i),e&&(this.indent(-1),this.out("}"))}if(t.alternate){this.out(" else ");var e=!1;"BlockStatement"!=t.alternate.type&&(e=!0),this.trigger("IfAlternate",t.alternate),e&&(this.out("{"),this.indent(1)),this.walk(t.alternate,i),e&&(this.indent(-1),"{"!=this.prevChar()&&this.out("",!0),this.out("}"))}this.out("",!0)},t.indent=function(t){this._indent+=t,this._indent<0&&(this._indent=0)},t.__traitInit&&!t.hasOwnProperty("__traitInit")&&(t.__traitInit=t.__traitInit.slice()),t.__traitInit||(t.__traitInit=[]),t.__traitInit.push(function(t){this._structures=[],this._path=[],this._tabChar="  ",this._codeStr="",this._currentLine="",this._indent=0,this._options=t||{},this.initReactNamespace(),this.initDOMNamespace()}),t.initDOMNamespace=function(){var i=["a","abbr","acronym","address","applet","area","article","aside","audio","b","base","basefont","bdi","bdo","big","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","datalist","dd","del","details","dfn","dialog","dir","div","dl","dt","em","embed","fieldset","figcaption","figure","font","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noframes","noscript","object","ol","optgroup","option","output","p","param","pre","progress","q","rp","rt","ruby","s","sampe","script","section","select","small","source","span","strike","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","tt","u","ul","var","video","wbr"];t.DOMJSXAttribute=function(t,i){this.out('"'),this.out(t.name.name),this.out('"'),this.out(i._fnCall?":":","),this.walk(t.value,i)},t.DOMJSXOpeningElement=function(t,e){this.out("(function() { ",!0),this.indent(1),this.out("var e,me=this;",!0);var n;if("JSXMemberExpression"==t.name.type){var s=t.name;s.object.name==e.ns&&(n=s.property.name)}else n=t.name.name;if(i.indexOf(n)>=0){if(this.out("e=document.createElement('"+n+"');",!0),t.attributes&&t.attributes.length)for(var o=0;o<t.attributes.length;o++){var r=t.attributes[o].name.name;if(r&&"on"==r.substring(0,2)){var h=r.slice(2).toLowerCase();this.out("e.addEventListener('"+h+"', function(){me['"+r+"']("),this.walk(t.attributes[o].value,e),this.out(")});",!0)}else this.out("e.setAttribute("),this.walk(t.attributes[o],e),this.out(");",!0)}}else{this.out("var self = function(){this.parent=me;};"),this.out("self.prototype = this;",!0),this.out("e = "+n+".apply(new self(),[");var a=e._fnCall;if(e._fnCall=!0,t.attributes&&t.attributes.length){this.out("{",!0),this.indent(1);for(var o=0;o<t.attributes.length;o++)o>0&&this.out(",",!0),this.walk(t.attributes[o],e);this.indent(-1),this.out("}")}e._fnCall=a,this.out("]);",!0)}t.selfClosing&&(this.out("return e;"),this.indent(-1),this.out("}).apply(this,[])",!0))},t.DOMLiteral=function(t){"string"==typeof t.value?(this.out('"'),this.out(t.value),this.out('"')):this.out(t.value)},t.DOMJSXExpressionContainer=function(t,i){this.walk(t.expression,i)},t.DOMJSXElement=function(t,i){var e=i._inJSX;i._inJSX=!0;var n=!1;this.walk(t.openingElement,i);if(t.children)for(var s=0;s<t.children.length;s++){var o=t.children[s];if("JSXElement"==o.type&&(this.out("e.appendChild("),this.indent(1),this.walk(o,i),this.indent(-1),this.out(")",!0)),"Literal"==o.type){var r=o.value;if("string"==typeof r)for(var h=r.split("\n"),a=0;a<h.length;a++)a>0&&this.out('e.appendChild(document.createTextNode("\n"));',!0),this.out('e.appendChild(document.createTextNode("'+h[a]+'"));',!0);else this.out("e.appendChild(document.createTextNode("),this.walk(o,i),this.out("))",!0)}"JSXExpressionContainer"==o.type&&(n||(this.out("var expr="),this.walk(o,i),this.out(";",!0)),this.out("if(expr instanceof Array) {",!0),this.indent(1),this.out("expr.forEach(function(ee){e.appendChild(ee)});",!0),this.indent(-1),this.out("} else {"),this.indent(1),this.out("if(typeof(expr)=='object') {",!0),this.indent(1),this.out("e.appendChild(expr);",!0),this.indent(-1),this.out("}",!0),this.out("if(typeof(expr)=='string' || typeof(expr)=='number') {",!0),this.indent(1),this.out("e.appendChild(document.createTextNode(expr));",!0),this.indent(-1),this.out("}",!0),this.indent(-1),this.out("}"))}this.walk(t.closingElement,i),e||this.out(";",!0),i._inJSX=e},t.DOMJSXClosingElement=function(){this.out("return e;",!0),this.indent(-1),this.out("}).apply(this,[])",!0)}},t.initReactNamespace=function(){t.reactJSXAttribute=function(t,i){this.walk(t.name,i),this.out(":"),this.walk(t.value,i)},t.reactJSXOpeningElement=function(t,i){if(console.log("reactJSXOpeningElement at namepace "+i.ns),this.out("React.createElement(",!0),this.indent(1),"JSXMemberExpression"==t.name.type){var e=t.name;"react"==e.object.name&&this.out('"'+e.property.name+'",',!0)}else t.name&&this.out('"'+t.name.name+'",',!0);if(t.attributes&&t.attributes.length){this.out("{",!0),this.indent(1);for(var n=0;n<t.attributes.length;n++)n>0&&this.out(",",!0),this.walk(t.attributes[n],i);this.indent(-1),this.out("}")}else this.out("null");t.selfClosing&&(this.indent(-1),this.out(""),this.out(")",!0))},t.reactLiteral=function(t,i){if(i._inJSX){var e=t.value.trim();if(0==e.length)return;this.out('"'),this.out(t.value.trim()),this.out('"')}else this.out(t.raw)},t.reactJSXExpressionContainer=function(t,i){this.walk(t.expression,i)},t.reactJSXElement=function(t,i){var e=i._inJSX;i._inJSX=!0,this.walk(t.openingElement,i);if(t.children)for(var n=0;n<t.children.length;n++){var s=t.children[n];("Literal"!=s.type||"string"!=typeof s.value||0!=s.value.trim().length)&&(this.out(",",!0),this.walk(t.children[n],i))}this.walk(t.closingElement,i),i._inJSX=e},t.reactJSXClosingElement=function(){this.indent(-1),this.out(""),this.out(")",!0)}},t.JSXAttribute=function(t,i){this.walk(t.name,i),this.out("="),this.walk(t.value,i)},t.JSXClosingElement=function(t,i){this.out("</"),this.walk(t.name,i),this.out(">")},t.JSXElement=function(t,i){this.walk(t.openingElement,i),this.out("",!0),this.indent(1),this.walk(t.children,i),this.indent(-1),t.selfClosing?this.out("/>",!0):t.closingElement&&this.walk(t.closingElement,i)},t.JSXEmptyExpression=function(){},t.JSXExpressionContainer=function(t,i){this.out("{"),this.walk(t.expression,i),this.out("}")},t.JSXIdentifier=function(t){this.out(t.name)},t.JSXMemberExpression=function(t,i){this.walk(t.object,i),t.computed?(this.out("["),this.walk(t.property,i),this.out("]")):(this.out("."),this.walk(t.property,i))},t.JSXNamespacedName=function(t){this.out(t.namespace),this.out(":"),this.out(t.name)},t.JSXOpeningElement=function(t,i){this.out("<"),this.walk(t.name,i),this.out(" "),this.walk(t.attributes,i),this.out(t.selfClosing?"/>":">")},t.JSXSpreadAttribute=function(){console.error("JSXSpreadAttribute is not implemented")},t.LabeledStatement=function(t,i){this.nlIfNot(),this.walk(t.label,i),this.out(":",!0),this.indent(1),t.body&&this.walk(t.body,i),this.indent(-1)},t.Literal=function(t){this.out(t.raw)},t.LogicalExpression=function(t,i){var e=!0,n=!0;("Identifier"==t.left.type||"Literal"==t.left.type)&&(e=!1),("Identifier"==t.right.type||"Literal"==t.right.type)&&(n=!1),e&&this.out("("),this.walk(t.left,i),e&&this.out(")"),t.operator&&this.out(" "+t.operator+" "),n&&this.out("("),this.walk(t.right,i),n&&this.out(")")},t.MemberExpression=function(t,i){this.trigger("MemberExpressionObject",t.object);var e=!0;("Identifier"==t.object.type||"Literal"==t.object.type||"ThisExpression"==t.object.type)&&(e=!1,"number"==typeof t.object.value&&(e=!0)),e&&this.out("("),this.walk(t.object,i),e&&this.out(")"),t.computed?(this.out("["),this.trigger("MemberExpressionProperty",t.property),this.walk(t.property,i),this.out("]")):(this.out("."),this.trigger("MemberExpressionProperty",t.property),this.walk(t.property,i))},t.MethodDefinition=function(t,i){t.key&&(this.__insideMethod=!0,"constructor"==t.kind&&this.trigger("ClassConstructor",t),t.static&&this.out("static "),this.walk(t.key,i),this.walk(t.value,i),this.out("",!0),this.__insideMethod=!1)},t.NewExpression=function(t,i){if(t.callee){if(this.out(" new "),this.trigger("NewExpressionClass",t.callee),this.walk(t.callee,i),this.out("("),t.arguments){var e=this,n=0;t.arguments.forEach(function(t){e.trigger("NewExpressionArgument",t),n++>0&&e.out(", "),e.walk(t,i)})}this.out(")")}},t.nlIfNot=function(){var t=this._currentLine.length;t>0&&("{"==this._currentLine[t-1]||";"==this._currentLine[t-1]?this.out("",!0):this.out(";",!0))},t.ObjectExpression=function(t,i){var e=this;try{e.out("{");var n=0;t&&t.properties&&(t.properties.length>1&&e.out("",!0),e.indent(1),t.properties.forEach(function(t){n++>0&&e.out(",",!0),e.trigger("ObjectExpressionProperty",t),e.walk(t,i)}),e.indent(-1)),e.out("}")}catch(s){console.error(s.message)}},t.ObjectPattern=function(t,i){var e=this;try{e.out("{");var n=0;t&&t.properties&&t.properties.forEach(function(t){n++>0&&e.out(","),e.trigger("ObjectExpressionProperty",t),e.walk(t,i)}),e.out("}")}catch(s){console.error(s.message)}},t.out=function(t,i){if(!this._options.noOutput){if(this._collecting){if(t){if(0==this._collectLine.length)for(var e=0;e<this._indent;e++)this._collectLine+=this._tabChar;this._collectLine+=t}return void(i&&(this._collectStr+=this._collectLine+"\n",this._collectLine="",this._collectStr+="\n"))}if(t){if(0==this._currentLine.length){this.trigger("startline"),this.trigger("tabs",this._indent);for(var e=0;e<this._indent;e++)this._currentLine+=this._tabChar}this.trigger("out",t),this._currentLine+=t}i&&(this.trigger("newline"),this._codeStr+=this._currentLine+"\n",this._currentLine="",this._lineNumber++)}},t.prevChar=function(){var t=this._currentLine.length;return t>0?this._currentLine[t-1]:"\n"},t.Program=function(t,i){this.walk(t.body,i,!0)},t.Property=function(t,i){this.trigger("ObjectPropertyKey",t.key),this.walk(t.key,i),t.shorthand||(this.out(":"),this.trigger("ObjectPropertyValue",t.value),this.walk(t.value,i))},t.pushStructure=function(t){this._structures||(this._structures=[]),this._structures.push(t)},t.RestElement=function(t,i){t.argument&&this.trigger("RestArgument",t.argument),this.out(" ..."),this.walk(t.argument,i)},t.ReturnStatement=function(t,i){this.nlIfNot(),this.out("return "),this.trigger("ReturnValue",t.argument),this.walk(t.argument,i),this.out(";")},t.saveNode=function(t){t.nodeid||(t.nodeid=this.createId()),this.createObject(t.nodeid,t)},t.SequenceExpression=function(t,i){if(t.expressions){var e=this,n=0;this.out("("),t.expressions.forEach(function(t){n++>0&&e.out(","),e.walk(t,i)}),this.out(")")}},t.skip=function(){this._skipWalk=!0},t.startBlock=function(){this.out("{",!0),this.indent(1)},t.startCollecting=function(){this._collecting=!0},t.startWalk=function(t,i){this._breakWalk=!1,this._path=[],this._codeStr="",this._currentLine="",this._lineNumber=0,this.walk(t,i),this.out("",!0)},t.Super=function(){this.out("super")},t.SwitchCase=function(t,i){if(this.nlIfNot(),t.test?(this.out("case "),this.walk(t.test,i),this.out(" : ",!0)):this.out("default: ",!0),t.consequent){var e=this;t.consequent.forEach(function(t){e.walk(t,i)})}},t.SwitchStatement=function(t,i){this.nlIfNot(),this.out("switch"),this.out("("),this.walk(t.discriminant,i),this.out(")"),this.out("{",!0),this.indent(1);var e=this;t.cases.forEach(function(t){e.walk(t,i)}),this.indent(-1),this.out("}",!0)},t.TemplateElement=function(t){this.out(t.value.raw)},t.TemplateLiteral=function(t,i){this.out("`");for(var e=0;e<t.quasis.length;e++){e>0&&(this.out("${"),t.expressions[e-1]&&this.walk(t.expressions[e-1],i),this.out("}"));var n=t.quasis[e];this.walk(n,i)}this.out("`")},t.ThisExpression=function(){this.out("this")},t.ThrowStatement=function(t,i){this.nlIfNot(),this.out("throw "),this.trigger("ThrowArgument",t.argument),this.walk(t.argument,i)},t.TryStatement=function(t,i){this.out("try "),this.walk(t.block,i),t.handler&&this.walk(t.handler,i),t.finalizer&&(this.out(" finally "),this.walk(t.finalizer,i))},t.UnaryExpression=function(t,i){var e=!0;("Identifier"==t.argument.type||"Literal"==t.argument.type)&&(e=!1),this.out(t.operator),"!"!=t.operator&&this.out(" "),e&&this.out("("),this.trigger("UnaryExpressionArgument",t.argument),this.walk(t.argument,i),e&&this.out(")")},t.UpdateExpression=function(t,i){this.trigger("UpdateExpressionArgument",t.argument),t.prefix?(this.out(t.operator),this.walk(t.argument,i)):(this.walk(t.argument,i),this.out(t.operator))},t.VariableDeclaration=function(t,i){var e=this,n=0;"var"==t.kind&&e.out("var "),"let"==t.kind&&e.out("let "),"const"==t.kind&&e.out("const ");var s=0;t.declarations.forEach(function(t){t.deleted||(n++>0&&(2==n&&(s+=2,e.indent(s)),e.out(",",!0)),e.walk(t,i))}),this.indent(-1*s),0==n&&(this._undoOutput=!0)},t.VariableDeclarator=function(t,i){var e=this;t.id&&(e.walk(t.id,i),t.id.name&&(i.vars[t.id.name]=t)),t.init&&(this.out(" = "),e.walk(t.init,i))},t.walk=function(t,i,e){if(t){if(!i)return console.log("ERROR: no context defined for ",t),void console.trace();if(t instanceof Array){var n=this;this.trigger("nodeArray",{node:t,ctx:i}),t.forEach(function(t){n.walk(t,i),e&&n.nlIfNot()})}else{if(t.deleted)return;if(t.type){this.saveNode(t),t.contextId=i.id;var s=this.getParent();this._nodeParents||(this._nodeParents={}),s&&(this._nodeParents[t.nodeid]=s);var o={node:t,ctx:i};if(this.trigger("node",o),this.trigger(t.type,o),this._skipWalk)return void(this._skipWalk=!1);if(this._wCb&&this._wCb(t),this[t.type]){this._path.push(t);var r,h=this._currentLine,a=this._codeStr.length,u=!1;if("JSXElement"==t.type&&t.openingElement&&t.openingElement.name)if("JSXMemberExpression"==t.openingElement.name.type){var l=t.openingElement.name,c=l.object.name;i.nsStack||(i.nsStack=[]),i.nsStack.push(c),r=i.ns,i.ns=c,u=!0}else if(!i.ns){var c="DOM";i.nsStack||(i.nsStack=[]),i.nsStack.push(c),r=i.ns,i.ns=c,u=!0}if(i.ns){var f=i.ns+t.type;"undefined"!=typeof this[f]?this[f](t,i):this[t.type](t,i)}else this[t.type](t,i);u&&(i.nsStack.pop(),i.ns=r),this._undoOutput&&(this._codeStr=this._codeStr.substring(0,a),this._currentLine=h,this._undoOutput=!1),this._path.pop()}else console.log("Did not find "+t.type),console.log(t);this.trigger("nodeWalked",o),this.trigger("After"+t.type,o)}}}},t.walkAsString=function(t,i){var e="";try{this.startCollecting(),this._collectStr="",this._collectLine="",this.walk(t,i),e=this._collectStr,this.endCollecting()}catch(n){}return e},t.WhileStatement=function(t,i){if(this.nlIfNot(),this.out("while "),t.test&&(this.trigger("WhileTest",t.test),this.out("("),this.walk(t.test,i),this.out(")")),t.body){var e=!1;"BlockStatement"!=t.body.type&&t.body.type.indexOf("Statement")>=0&&(e=!0),e&&(this.out("{"),this.indent(1)),this.walk(t.body,i),e&&(this.indent(-1),this.out("}"))}this.out("",!0)},t.WithStatement=function(){console.error("With statement is not supported")},t.YieldExpression=function(t,i){this.out("yield "),this.walk(t.argument,i)}}(this)},e=function(t,i,n,s,o,r,h,a){var u,l=this;if(!(l instanceof e))return new e(t,i,n,s,o,r,h,a);var c=[t,i,n,s,o,r,h,a];if(l.__factoryClass)if(l.__factoryClass.forEach(function(t){u=t.apply(l,c)}),"function"==typeof u){if(u._classInfo.name!=e._classInfo.name)return new u(t,i,n,s,o,r,h,a)}else if(u)return u;l.__traitInit?l.__traitInit.forEach(function(t){t.apply(l,c)}):"function"==typeof l.init&&l.init.apply(l,c)};e._classInfo={name:"ASTWalker"},e.prototype=new i,function(){"undefined"!=typeof define&&null!==define&&null!=define.amd?(t.ASTWalker=e,this.ASTWalker=e):"undefined"!=typeof module&&null!==module&&null!=module.exports?module.exports.ASTWalker=e:this.ASTWalker=e}.call(new Function("return this")()),"undefined"!=typeof define&&null!==define&&null!=define.amd&&define(t)}).call(new Function("return this")());