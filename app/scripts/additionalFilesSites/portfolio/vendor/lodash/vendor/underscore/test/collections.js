!function(){var e="function"==typeof require?require(".."):window._;QUnit.module("Collections"),QUnit.test("each",function(t){e.each([1,2,3],function(e,n){t.equal(e,n+1,"each iterators provide value and iteration count")});var n=[];e.each([1,2,3],function(e){n.push(e*this.multiplier)},{multiplier:5}),t.deepEqual(n,[5,10,15],"context object property accessed"),n=[],e.each([1,2,3],function(e){n.push(e)}),t.deepEqual(n,[1,2,3],"can iterate a simple array"),n=[];var a={one:1,two:2,three:3};a.constructor.prototype.four=4,e.each(a,function(e,t){n.push(t)}),t.deepEqual(n,["one","two","three"],"iterating over objects works, and ignores the object prototype."),delete a.constructor.prototype.four,e(1e3).times(function(){e.each([],function(){})});var r=0;a={1:"foo",2:"bar",3:"baz"},e.each(a,function(){r++}),t.equal(r,3,"the fun should be called only 3 times");var i=null;e.each([1,2,3],function(t,n,a){e.include(a,t)&&(i=!0)}),t.ok(i,"can reference the original collection from inside the iterator"),n=0,e.each(null,function(){++n}),t.equal(n,0,"handles a null properly"),e.each(!1,function(){});var o=[1,2,3];t.strictEqual(e.each(o,function(){}),o),t.strictEqual(e.each(null,function(){}),null)}),QUnit.test("forEach",function(t){t.strictEqual(e.forEach,e.each,"is an alias for each")}),QUnit.test("lookupIterator with contexts",function(t){e.each([!0,!1,"yes","",0,1,{}],function(n){e.each([1],function(){t.equal(this,n)},n)})}),QUnit.test("Iterating objects with sketchy length properties",function(t){var n=["each","map","filter","find","some","every","max","min","groupBy","countBy","partition","indexBy"],a=["reduce","reduceRight"],r=[{length:"5"},{length:{valueOf:e.constant(5)}},{length:Math.pow(2,53)+1},{length:Math.pow(2,53)},{length:null},{length:-2},{length:new Number(15)}];t.expect(r.length*(n.length+a.length+4)),e.each(r,function(r){var i=r.length;t.strictEqual(e.size(r),1,"size on obj with length: "+i),t.deepEqual(e.toArray(r),[i],"toArray on obj with length: "+i),t.deepEqual(e.shuffle(r),[i],"shuffle on obj with length: "+i),t.deepEqual(e.sample(r),i,"sample on obj with length: "+i),e.each(n,function(n){e[n](r,function(e,a){t.strictEqual(a,"length",n+": ran with length = "+e)})}),e.each(a,function(n){t.strictEqual(e[n](r),r.length,n)})})}),QUnit.test("Resistant to collection length and properties changing while iterating",function(t){var n=["each","map","filter","find","some","every","max","min","reject","groupBy","countBy","partition","indexBy","reduce","reduceRight"],a=["findIndex","findLastIndex"],r=["mapObject","findKey","pick","omit"];e.each(n.concat(a),function(n){var a=[1,2,3];a.length=100;var r=0;e[n](a,function(){return++r,"every"===n||null},{}),t.equal(r,100,n+" enumerates [0, length)");var i=[1,2,3],o=0;e[n](i,function(){return o<10&&i.push(o++),"every"===n||null},{}),t.equal(o,3,n+" is resistant to length changes")}),e.each(n.concat(r),function(n){var a={0:0,1:1},r=0;e[n](a,function(e){return r<10&&(a[++r]=e+1),"every"===n||null},{}),t.equal(r,2,n+" is resistant to property changes")})}),QUnit.test("map",function(t){var n=e.map([1,2,3],function(e){return 2*e});t.deepEqual(n,[2,4,6],"doubled numbers");var a=e.map([1,2,3],function(e){return e*this.multiplier},{multiplier:3});t.deepEqual(a,[3,6,9],"tripled numbers with context"),n=e([1,2,3]).map(function(e){return 2*e}),t.deepEqual(n,[2,4,6],"OO-style doubled numbers");var r=e.map({length:2,0:{id:"1"},1:{id:"2"}},function(e){return e.id});t.deepEqual(r,["1","2"],"Can use collection methods on Array-likes."),t.deepEqual(e.map(null,e.noop),[],"handles a null properly"),t.deepEqual(e.map([1],function(){return this.length},[5]),[1],"called with context");var i=[{name:"moe",age:30},{name:"curly",age:50}];t.deepEqual(e.map(i,"name"),["moe","curly"],"predicate string map to object properties")}),QUnit.test("collect",function(t){t.strictEqual(e.collect,e.map,"is an alias for map")}),QUnit.test("reduce",function(t){var n=e.reduce([1,2,3],function(e,t){return e+t},0);t.equal(n,6,"can sum up an array");var a={multiplier:3};n=e.reduce([1,2,3],function(e,t){return e+t*this.multiplier},0,a),t.equal(n,18,"can reduce with a context object"),n=e([1,2,3]).reduce(function(e,t){return e+t},0),t.equal(n,6,"OO-style reduce"),n=e.reduce([1,2,3],function(e,t){return e+t}),t.equal(n,6,"default initial value");var r=e.reduce([1,2,3,4],function(e,t){return e*t});t.equal(r,24,"can reduce via multiplication"),t.ok(138===e.reduce(null,e.noop,138),"handles a null (with initial value) properly"),t.equal(e.reduce([],e.noop,void 0),void 0,"undefined can be passed as a special case"),t.equal(e.reduce([e],e.noop),e,"collection of length one with no initial value returns the first item"),t.equal(e.reduce([],e.noop),void 0,"returns undefined when collection is empty and no initial value")}),QUnit.test("foldl",function(t){t.strictEqual(e.foldl,e.reduce,"is an alias for reduce")}),QUnit.test("inject",function(t){t.strictEqual(e.inject,e.reduce,"is an alias for reduce")}),QUnit.test("reduceRight",function(t){var n=e.reduceRight(["foo","bar","baz"],function(e,t){return e+t},"");t.equal(n,"bazbarfoo","can perform right folds"),n=e.reduceRight(["foo","bar","baz"],function(e,t){return e+t}),t.equal(n,"bazbarfoo","default initial value");var a=e.reduceRight({a:1,b:2,c:3},function(e,t){return e+t});t.equal(a,6,"default initial value on object"),t.ok(138===e.reduceRight(null,e.noop,138),"handles a null (with initial value) properly"),t.equal(e.reduceRight([e],e.noop),e,"collection of length one with no initial value returns the first item"),t.equal(e.reduceRight([],e.noop,void 0),void 0,"undefined can be passed as a special case"),t.equal(e.reduceRight([],e.noop),void 0,"returns undefined when collection is empty and no initial value");var r,i={},o={a:1,b:2},u=e.keys(o).pop(),l="a"===u?[i,1,"a",o]:[i,2,"b",o];e.reduceRight(o,function(){r||(r=e.toArray(arguments))},i),t.deepEqual(r,l),o={2:"a",1:"b"},u=e.keys(o).pop(),r=null,l="2"===u?[i,"a","2",o]:[i,"b","1",o],e.reduceRight(o,function(){r||(r=e.toArray(arguments))},i),t.deepEqual(r,l)}),QUnit.test("foldr",function(t){t.strictEqual(e.foldr,e.reduceRight,"is an alias for reduceRight")}),QUnit.test("find",function(t){var n=[1,2,3,4];t.strictEqual(e.find(n,function(e){return e>2}),3,"should return first found `value`"),t.strictEqual(e.find(n,function(){return!1}),void 0,"should return `undefined` if `value` is not found"),n.dontmatch=55,t.strictEqual(e.find(n,function(e){return 55===e}),void 0,"iterates array-likes correctly");var a=[{a:1,b:2},{a:2,b:2},{a:1,b:3},{a:1,b:4},{a:2,b:4}];t.deepEqual(e.find(a,{a:1}),{a:1,b:2},"can be used as findWhere"),t.deepEqual(e.find(a,{b:4}),{a:1,b:4}),t.ok(!e.find(a,{c:1}),"undefined when not found"),t.ok(!e.find([],{c:1}),"undefined when searching empty list");var r=e.find([1,2,3],function(e){return 2*e===4});t.equal(r,2,'found the first "2" and broke the loop');var i={a:{x:1,z:3},b:{x:2,z:2},c:{x:3,z:4},d:{x:4,z:1}};t.deepEqual(e.find(i,{x:2}),{x:2,z:2},"works on objects"),t.deepEqual(e.find(i,{x:2,z:1}),void 0),t.deepEqual(e.find(i,function(e){return 4===e.x}),{x:4,z:1}),e.findIndex([{a:1}],function(n,a,r){t.equal(a,0),t.deepEqual(r,[{a:1}]),t.strictEqual(this,e,"called with context")},e)}),QUnit.test("detect",function(t){t.strictEqual(e.detect,e.find,"is an alias for find")}),QUnit.test("filter",function(t){var n=[1,2,3,4,5,6],a={one:1,two:2,three:3},r=function(e){return e%2===0};t.deepEqual(e.filter(n,r),[2,4,6]),t.deepEqual(e.filter(a,r),[2],"can filter objects"),t.deepEqual(e.filter([{},a,[]],"two"),[a],"predicate string map to object properties"),e.filter([1],function(){t.equal(this,a,"given context")},a);var i=[{a:1,b:2},{a:2,b:2},{a:1,b:3},{a:1,b:4}];t.deepEqual(e.filter(i,{a:1}),[{a:1,b:2},{a:1,b:3},{a:1,b:4}]),t.deepEqual(e.filter(i,{b:2}),[{a:1,b:2},{a:2,b:2}]),t.deepEqual(e.filter(i,{}),i,"Empty object accepts all items"),t.deepEqual(e(i).filter({}),i,"OO-filter")}),QUnit.test("select",function(t){t.strictEqual(e.select,e.filter,"is an alias for filter")}),QUnit.test("reject",function(t){var n=e.reject([1,2,3,4,5,6],function(e){return e%2===0});t.deepEqual(n,[1,3,5],"rejected each even number");var a="obj",r=e.reject([1,2,3,4,5,6],function(e){return t.equal(a,"obj"),e%2!==0},a);t.deepEqual(r,[2,4,6],"rejected each odd number"),t.deepEqual(e.reject([n,{one:1,two:2,three:3}],"two"),[n],"predicate string map to object properties");var i=[{a:1,b:2},{a:2,b:2},{a:1,b:3},{a:1,b:4}];t.deepEqual(e.reject(i,{a:1}),[{a:2,b:2}]),t.deepEqual(e.reject(i,{b:2}),[{a:1,b:3},{a:1,b:4}]),t.deepEqual(e.reject(i,{}),[],"Returns empty list given empty object"),t.deepEqual(e.reject(i,[]),[],"Returns empty list given empty array")}),QUnit.test("every",function(t){t.ok(e.every([],e.identity),"the empty set"),t.ok(e.every([!0,!0,!0],e.identity),"every true values"),t.ok(!e.every([!0,!1,!0],e.identity),"one false value"),t.ok(e.every([0,10,28],function(e){return e%2===0}),"even numbers"),t.ok(!e.every([0,11,28],function(e){return e%2===0}),"an odd number"),t.ok(e.every([1],e.identity)===!0,"cast to boolean - true"),t.ok(e.every([0],e.identity)===!1,"cast to boolean - false"),t.ok(!e.every([void 0,void 0,void 0],e.identity),"works with arrays of undefined");var n=[{a:1,b:2},{a:2,b:2},{a:1,b:3},{a:1,b:4}];t.ok(!e.every(n,{a:1,b:2}),"Can be called with object"),t.ok(e.every(n,"a"),"String mapped to object property"),n=[{a:1,b:2},{a:2,b:2,c:!0}],t.ok(e.every(n,{b:2}),"Can be called with object"),t.ok(!e.every(n,"c"),"String mapped to object property"),t.ok(e.every({a:1,b:2,c:3,d:4},e.isNumber),"takes objects"),t.ok(!e.every({a:1,b:2,c:3,d:4},e.isObject),"takes objects"),t.ok(e.every(["a","b","c","d"],e.hasOwnProperty,{a:1,b:2,c:3,d:4}),"context works"),t.ok(!e.every(["a","b","c","d","f"],e.hasOwnProperty,{a:1,b:2,c:3,d:4}),"context works")}),QUnit.test("all",function(t){t.strictEqual(e.all,e.every,"is an alias for every")}),QUnit.test("some",function(t){t.ok(!e.some([]),"the empty set"),t.ok(!e.some([!1,!1,!1]),"all false values"),t.ok(e.some([!1,!1,!0]),"one true value"),t.ok(e.some([null,0,"yes",!1]),"a string"),t.ok(!e.some([null,0,"",!1]),"falsy values"),t.ok(!e.some([1,11,29],function(e){return e%2===0}),"all odd numbers"),t.ok(e.some([1,10,29],function(e){return e%2===0}),"an even number"),t.ok(e.some([1],e.identity)===!0,"cast to boolean - true"),t.ok(e.some([0],e.identity)===!1,"cast to boolean - false"),t.ok(e.some([!1,!1,!0]));var n=[{a:1,b:2},{a:2,b:2},{a:1,b:3},{a:1,b:4}];t.ok(!e.some(n,{a:5,b:2}),"Can be called with object"),t.ok(e.some(n,"a"),"String mapped to object property"),n=[{a:1,b:2},{a:2,b:2,c:!0}],t.ok(e.some(n,{b:2}),"Can be called with object"),t.ok(!e.some(n,"d"),"String mapped to object property"),t.ok(e.some({a:"1",b:"2",c:"3",d:"4",e:6},e.isNumber),"takes objects"),t.ok(!e.some({a:1,b:2,c:3,d:4},e.isObject),"takes objects"),t.ok(e.some(["a","b","c","d"],e.hasOwnProperty,{a:1,b:2,c:3,d:4}),"context works"),t.ok(!e.some(["x","y","z"],e.hasOwnProperty,{a:1,b:2,c:3,d:4}),"context works")}),QUnit.test("any",function(t){t.strictEqual(e.any,e.some,"is an alias for some")}),QUnit.test("includes",function(t){e.each([null,void 0,0,1,NaN,{},[]],function(n){t.strictEqual(e.includes(n,"hasOwnProperty"),!1)}),t.strictEqual(e.includes([1,2,3],2),!0,"two is in the array"),t.ok(!e.includes([1,3,9],2),"two is not in the array"),t.strictEqual(e.includes([5,4,3,2,1],5,!0),!0,"doesn't delegate to binary search"),t.ok(e.includes({moe:1,larry:3,curly:9},3)===!0,"_.includes on objects checks their values"),t.ok(e([1,2,3]).includes(2),"OO-style includes");var n=[1,2,3,1,2,3,1,2,3];t.strictEqual(e.includes(n,1,1),!0,"takes a fromIndex"),t.strictEqual(e.includes(n,1,-1),!1,"takes a fromIndex"),t.strictEqual(e.includes(n,1,-2),!1,"takes a fromIndex"),t.strictEqual(e.includes(n,1,-3),!0,"takes a fromIndex"),t.strictEqual(e.includes(n,1,6),!0,"takes a fromIndex"),t.strictEqual(e.includes(n,1,7),!1,"takes a fromIndex"),t.ok(e.every([1,2,3],e.partial(e.includes,n)),"fromIndex is guarded")}),QUnit.test("include",function(t){t.strictEqual(e.include,e.includes,"is an alias for includes")}),QUnit.test("contains",function(t){t.strictEqual(e.contains,e.includes,"is an alias for includes")}),QUnit.test("includes with NaN",function(t){t.strictEqual(e.includes([1,2,NaN,NaN],NaN),!0,"Expected [1, 2, NaN] to contain NaN"),t.strictEqual(e.includes([1,2,1/0],NaN),!1,"Expected [1, 2, NaN] to contain NaN")}),QUnit.test("includes with +- 0",function(t){e.each([-0,0],function(n){t.strictEqual(e.includes([1,2,n,n],n),!0),t.strictEqual(e.includes([1,2,n,n],-n),!0),t.strictEqual(e.includes([-1,1,2],-n),!1)})}),QUnit.test("invoke",function(t){t.expect(5);var n=[[5,1,7],[3,2,1]],a=e.invoke(n,"sort");t.deepEqual(a[0],[1,5,7],"first array sorted"),t.deepEqual(a[1],[1,2,3],"second array sorted"),e.invoke([{method:function(){t.deepEqual(e.toArray(arguments),[1,2,3],"called with arguments")}}],"method",1,2,3),t.deepEqual(e.invoke([{a:null},{},{a:e.constant(1)}],"a"),[null,void 0,1],"handles null & undefined"),t.raises(function(){e.invoke([{a:1}],"a")},TypeError,"throws for non-functions")}),QUnit.test("invoke w/ function reference",function(t){var n=[[5,1,7],[3,2,1]],a=e.invoke(n,Array.prototype.sort);t.deepEqual(a[0],[1,5,7],"first array sorted"),t.deepEqual(a[1],[1,2,3],"second array sorted"),t.deepEqual(e.invoke([1,2,3],function(e){return e+this},5),[6,7,8],"receives params from invoke")}),QUnit.test("invoke when strings have a call method",function(t){String.prototype.call=function(){return 42};var n=[[5,1,7],[3,2,1]],a="foo";t.equal(a.call(),42,"call function exists");var r=e.invoke(n,"sort");t.deepEqual(r[0],[1,5,7],"first array sorted"),t.deepEqual(r[1],[1,2,3],"second array sorted"),delete String.prototype.call,t.equal(a.call,void 0,"call function removed")}),QUnit.test("pluck",function(t){var n=[{name:"moe",age:30},{name:"curly",age:50}];t.deepEqual(e.pluck(n,"name"),["moe","curly"],"pulls names out of objects"),t.deepEqual(e.pluck(n,"address"),[void 0,void 0],"missing properties are returned as undefined"),t.deepEqual(e.pluck([{"[object Object]":1}],{}),[1])}),QUnit.test("where",function(t){function n(){}var a=[{a:1,b:2},{a:2,b:2},{a:1,b:3},{a:1,b:4}],r=e.where(a,{a:1});t.equal(r.length,3),t.equal(r[r.length-1].b,4),r=e.where(a,{b:2}),t.equal(r.length,2),t.equal(r[0].a,1),r=e.where(a,{}),t.equal(r.length,a.length),n.map=e.map,t.deepEqual(e.where([e,{a:1,b:2},e],n),[e,e],"checks properties given function")}),QUnit.test("findWhere",function(t){function n(){}function a(){this.y=5,this.x="foo"}var r=[{a:1,b:2},{a:2,b:2},{a:1,b:3},{a:1,b:4},{a:2,b:4}],i=e.findWhere(r,{a:1});t.deepEqual(i,{a:1,b:2}),i=e.findWhere(r,{b:4}),t.deepEqual(i,{a:1,b:4}),i=e.findWhere(r,{c:1}),t.ok(e.isUndefined(i),"undefined when not found"),i=e.findWhere([],{c:1}),t.ok(e.isUndefined(i),"undefined when searching empty list"),n.map=e.map,t.equal(e.findWhere([e,{a:1,b:2},e],n),e,"checks properties given function");var o={c:1,x:"foo",y:5};t.deepEqual(e.findWhere([{y:5,b:6},o],new a),o,"uses class instance properties")}),QUnit.test("max",function(t){t.equal(-(1/0),e.max(null),"can handle null/undefined"),t.equal(-(1/0),e.max(void 0),"can handle null/undefined"),t.equal(-(1/0),e.max(null,e.identity),"can handle null/undefined"),t.equal(3,e.max([1,2,3]),"can perform a regular Math.max");var n=e.max([1,2,3],function(e){return-e});t.equal(n,1,"can perform a computation-based max"),t.equal(-(1/0),e.max({}),"Maximum value of an empty object"),t.equal(-(1/0),e.max([]),"Maximum value of an empty array"),t.equal(e.max({a:"a"}),-(1/0),"Maximum value of a non-numeric collection"),t.equal(299999,e.max(e.range(1,3e5)),"Maximum value of a too-big array"),t.equal(3,e.max([1,2,3,"test"]),"Finds correct max in array starting with num and containing a NaN"),t.equal(3,e.max(["test",1,2,3]),"Finds correct max in array starting with NaN"),t.equal(3,e.max([1,2,3,null]),"Finds correct max in array starting with num and containing a `null`"),t.equal(3,e.max([null,1,2,3]),"Finds correct max in array starting with a `null`"),t.equal(3,e.max([1,2,3,""]),"Finds correct max in array starting with num and containing an empty string"),t.equal(3,e.max(["",1,2,3]),"Finds correct max in array starting with an empty string"),t.equal(3,e.max([1,2,3,!1]),"Finds correct max in array starting with num and containing a false"),t.equal(3,e.max([!1,1,2,3]),"Finds correct max in array starting with a false"),t.equal(4,e.max([0,1,2,3,4]),"Finds correct max in array containing a zero"),t.equal(0,e.max([-3,-2,-1,0]),"Finds correct max in array containing negative numbers"),t.deepEqual([3,6],e.map([[1,2,3],[4,5,6]],e.max),"Finds correct max in array when mapping through multiple arrays");var a={x:-(1/0)},r={x:-(1/0)},i=function(e){return e.x};t.equal(e.max([a,r],i),a,"Respects iterator return value of -Infinity"),t.deepEqual(e.max([{a:1},{a:0,b:3},{a:4},{a:2}],"a"),{a:4},"String keys use property iterator"),t.deepEqual(e.max([0,2],function(e){return e*this.x},{x:1}),2,"Iterator context"),t.deepEqual(e.max([[1],[2,3],[-1,4],[5]],0),[5],"Lookup falsy iterator"),t.deepEqual(e.max([{0:1},{0:2},{0:-1},{a:1}],0),{0:2},"Lookup falsy iterator")}),QUnit.test("min",function(t){t.equal(1/0,e.min(null),"can handle null/undefined"),t.equal(1/0,e.min(void 0),"can handle null/undefined"),t.equal(1/0,e.min(null,e.identity),"can handle null/undefined"),t.equal(1,e.min([1,2,3]),"can perform a regular Math.min");var n=e.min([1,2,3],function(e){return-e});t.equal(n,3,"can perform a computation-based min"),t.equal(1/0,e.min({}),"Minimum value of an empty object"),t.equal(1/0,e.min([]),"Minimum value of an empty array"),t.equal(e.min({a:"a"}),1/0,"Minimum value of a non-numeric collection"),t.deepEqual([1,4],e.map([[1,2,3],[4,5,6]],e.min),"Finds correct min in array when mapping through multiple arrays");var a=new Date(9999999999),r=new Date(0);t.equal(e.min([a,r]),r),t.equal(1,e.min(e.range(1,3e5)),"Minimum value of a too-big array"),t.equal(1,e.min([1,2,3,"test"]),"Finds correct min in array starting with num and containing a NaN"),t.equal(1,e.min(["test",1,2,3]),"Finds correct min in array starting with NaN"),t.equal(1,e.min([1,2,3,null]),"Finds correct min in array starting with num and containing a `null`"),t.equal(1,e.min([null,1,2,3]),"Finds correct min in array starting with a `null`"),t.equal(0,e.min([0,1,2,3,4]),"Finds correct min in array containing a zero"),t.equal(-3,e.min([-3,-2,-1,0]),"Finds correct min in array containing negative numbers");var i={x:1/0},o={x:1/0},u=function(e){return e.x};t.equal(e.min([i,o],u),i,"Respects iterator return value of Infinity"),t.deepEqual(e.min([{a:1},{a:0,b:3},{a:4},{a:2}],"a"),{a:0,b:3},"String keys use property iterator"),t.deepEqual(e.min([0,2],function(e){return e*this.x},{x:-1}),2,"Iterator context"),t.deepEqual(e.min([[1],[2,3],[-1,4],[5]],0),[-1,4],"Lookup falsy iterator"),t.deepEqual(e.min([{0:1},{0:2},{0:-1},{a:1}],0),{0:-1},"Lookup falsy iterator")}),QUnit.test("sortBy",function(t){function n(e,t){this.x=e,this.y=t}var a=[{name:"curly",age:50},{name:"moe",age:30}];a=e.sortBy(a,function(e){return e.age}),t.deepEqual(e.pluck(a,"name"),["moe","curly"],"stooges sorted by age");var r=[void 0,4,1,void 0,3,2];t.deepEqual(e.sortBy(r,e.identity),[1,2,3,4,void 0,void 0],"sortBy with undefined values"),r=["one","two","three","four","five"];var i=e.sortBy(r,"length");t.deepEqual(i,["one","two","four","five","three"],"sorted by length");var o=[new n(1,1),new n(1,2),new n(1,3),new n(1,4),new n(1,5),new n(1,6),new n(2,1),new n(2,2),new n(2,3),new n(2,4),new n(2,5),new n(2,6),new n((void 0),1),new n((void 0),2),new n((void 0),3),new n((void 0),4),new n((void 0),5),new n((void 0),6)],u=e.object("abcdefghijklmnopqr".split(""),o),l=e.sortBy(o,function(e){return e.x});t.deepEqual(l,o,"sortBy should be stable for arrays"),t.deepEqual(e.sortBy(o,"x"),o,"sortBy accepts property string"),l=e.sortBy(u,function(e){return e.x}),t.deepEqual(l,o,"sortBy should be stable for objects"),r=["q","w","e","r","t","y"],t.deepEqual(e.sortBy(r),["e","q","r","t","w","y"],"uses _.identity if iterator is not specified")}),QUnit.test("groupBy",function(t){var n=e.groupBy([1,2,3,4,5,6],function(e){return e%2});t.ok("0"in n&&"1"in n,"created a group for each value"),t.deepEqual(n[0],[2,4,6],"put each even number in the right group");var a=["one","two","three","four","five","six","seven","eight","nine","ten"],r=e.groupBy(a,"length");t.deepEqual(r[3],["one","two","six","ten"]),t.deepEqual(r[4],["four","five","nine"]),t.deepEqual(r[5],["three","seven","eight"]);var i={};e.groupBy([{}],function(){t.ok(this===i)},i),r=e.groupBy([4.2,6.1,6.4],function(e){return Math.floor(e)>4?"hasOwnProperty":"constructor"}),t.equal(r.constructor.length,1),t.equal(r.hasOwnProperty.length,2);var o=[{}];e.groupBy(o,function(e,n,a){t.ok(a===o)}),o=[1,2,1,2,3],r=e.groupBy(o),t.equal(r[1].length,2),t.equal(r[3].length,1);var u=[[1,2],[1,3],[2,3]];t.deepEqual(e.groupBy(u,0),{1:[[1,2],[1,3]],2:[[2,3]]}),t.deepEqual(e.groupBy(u,1),{2:[[1,2]],3:[[1,3],[2,3]]})}),QUnit.test("indexBy",function(t){var n=e.indexBy([1,2,3,4,5],function(e){return e%2===0});t.equal(n.true,4),t.equal(n.false,5);var a=["one","two","three","four","five","six","seven","eight","nine","ten"],r=e.indexBy(a,"length");t.equal(r[3],"ten"),t.equal(r[4],"nine"),t.equal(r[5],"eight");var i=[1,2,1,2,3];r=e.indexBy(i),t.equal(r[1],1),t.equal(r[2],2),t.equal(r[3],3)}),QUnit.test("countBy",function(t){var n=e.countBy([1,2,3,4,5],function(e){return e%2===0});t.equal(n.true,2),t.equal(n.false,3);var a=["one","two","three","four","five","six","seven","eight","nine","ten"],r=e.countBy(a,"length");t.equal(r[3],4),t.equal(r[4],3),t.equal(r[5],3);var i={};e.countBy([{}],function(){t.ok(this===i)},i),r=e.countBy([4.2,6.1,6.4],function(e){return Math.floor(e)>4?"hasOwnProperty":"constructor"}),t.equal(r.constructor,1),t.equal(r.hasOwnProperty,2);var o=[{}];e.countBy(o,function(e,n,a){t.ok(a===o)}),o=[1,2,1,2,3],r=e.countBy(o),t.equal(r[1],2),t.equal(r[3],1)}),QUnit.test("shuffle",function(t){t.deepEqual(e.shuffle([1]),[1],"behaves correctly on size 1 arrays");var n=e.range(20),a=e.shuffle(n);t.notDeepEqual(n,a,"does change the order"),t.notStrictEqual(n,a,"original object is unmodified"),t.deepEqual(n,e.sortBy(a),"contains the same members before and after shuffle"),a=e.shuffle({a:1,b:2,c:3,d:4}),t.equal(a.length,4),t.deepEqual(a.sort(),[1,2,3,4],"works on objects")}),QUnit.test("sample",function(t){t.strictEqual(e.sample([1]),1,"behaves correctly when no second parameter is given"),t.deepEqual(e.sample([1,2,3],-2),[],"behaves correctly on negative n");var n=e.range(10),a=e.sample(n,10).sort();t.deepEqual(a,n,"contains the same members before and after sample"),a=e.sample(n,20).sort(),t.deepEqual(a,n,"also works when sampling more objects than are present"),t.ok(e.contains(n,e.sample(n)),"sampling a single element returns something from the array"),t.strictEqual(e.sample([]),void 0,"sampling empty array with no number returns undefined"),t.notStrictEqual(e.sample([],5),[],"sampling empty array with a number returns an empty array"),t.notStrictEqual(e.sample([1,2,3],0),[],"sampling an array with 0 picks returns an empty array"),t.deepEqual(e.sample([1,2],-1),[],"sampling a negative number of picks returns an empty array"),t.ok(e.contains([1,2,3],e.sample({a:1,b:2,c:3})),"sample one value from an object");var r=e.sample(e.range(1e3),10),i=r.sort();t.notDeepEqual(i,e.range(10),"samples from the whole array, not just the beginning")}),QUnit.test("toArray",function(t){t.ok(!e.isArray(arguments),"arguments object is not an array"),t.ok(e.isArray(e.toArray(arguments)),"arguments object converted into array");var n=[1,2,3];t.ok(e.toArray(n)!==n,"array is cloned"),t.deepEqual(e.toArray(n),[1,2,3],"cloned array contains same elements");var a=e.toArray({one:1,two:2,three:3});t.deepEqual(a,[1,2,3],"object flattened into array");var r="💕",i=r.split(""),o=[i[0],r,"&",r,i[1]];if(t.deepEqual(e.toArray(o.join("")),o,"maintains astral characters"),t.deepEqual(e.toArray(""),[],"empty string into empty array"),"undefined"!=typeof document){var u;try{u=e.toArray(document.childNodes)}catch(e){}t.deepEqual(u,e.map(document.childNodes,e.identity),"works on NodeList")}}),QUnit.test("size",function(t){t.equal(e.size({one:1,two:2,three:3}),3,"can compute the size of an object"),t.equal(e.size([1,2,3]),3,"can compute the size of an array"),t.equal(e.size({length:3,0:0,1:0,2:0}),3,"can compute the size of Array-likes");var n=function(){return e.size(arguments)};t.equal(n(1,2,3,4),4,"can test the size of the arguments object"),t.equal(e.size("hello"),5,"can compute the size of a string literal"),t.equal(e.size(new String("hello")),5,"can compute the size of string object"),t.equal(e.size(null),0,"handles nulls"),t.equal(e.size(0),0,"handles numbers")}),QUnit.test("partition",function(t){var n=[0,1,2,3,4,5];t.deepEqual(e.partition(n,function(e){return e<4}),[[0,1,2,3],[4,5]],"handles bool return values"),t.deepEqual(e.partition(n,function(e){return 1&e}),[[1,3,5],[0,2,4]],"handles 0 and 1 return values"),t.deepEqual(e.partition(n,function(e){return e-3}),[[0,1,2,4,5],[3]],"handles other numeric return values"),t.deepEqual(e.partition(n,function(e){return!(e>1)||null}),[[0,1],[2,3,4,5]],"handles null return values"),t.deepEqual(e.partition(n,function(e){if(e<2)return!0}),[[0,1],[2,3,4,5]],"handles undefined return values"),t.deepEqual(e.partition({a:1,b:2,c:3},function(e){return e>1}),[[2,3],[1]],"handles objects"),t.deepEqual(e.partition(n,function(e,t){return t%2}),[[1,3,5],[0,2,4]],"can reference the array index"),t.deepEqual(e.partition(n,function(e,t,n){return e===n.length-1}),[[5],[0,1,2,3,4]],"can reference the collection"),t.deepEqual(e.partition([1,!1,!0,""]),[[1,!0],[!1,""]],"Default iterator"),t.deepEqual(e.partition([{x:1},{x:0},{x:1}],"x"),[[{x:1},{x:1}],[{x:0}]],"Takes a string");var a=function(e){return e===this.x};t.deepEqual(e.partition([1,2,3],a,{x:2}),[[2],[1,3]],"partition takes a context argument"),t.deepEqual(e.partition([{a:1},{b:2},{a:1,b:2}],{a:1}),[[{a:1},{a:1,b:2}],[{b:2}]],"predicate can be object");var r={a:1};e.partition(r,function(e,n,i){t.equal(e,1),t.equal(n,"a"),t.equal(i,r),t.equal(this,a)},a)}),"undefined"!=typeof document&&QUnit.test("Can use various collection methods on NodeLists",function(t){function n(t){return e.isElement(t)?t.id.charAt(2):void 0}var a=document.createElement("div");a.innerHTML="<span id=id1></span>textnode<span id=id2></span>";var r=e.filter(a.childNodes,e.isElement);t.equal(r.length,2),t.deepEqual(e.map(r,"id"),["id1","id2"]),t.deepEqual(e.map(a.childNodes,"nodeType"),[1,3,1]),t.ok(!e.every(a.childNodes,e.isElement)),t.ok(e.some(a.childNodes,e.isElement)),t.equal(e.max(a.childNodes,n),e.last(a.childNodes)),t.equal(e.min(a.childNodes,n),e.first(a.childNodes))})}();
//# sourceMappingURL=collections.js.map