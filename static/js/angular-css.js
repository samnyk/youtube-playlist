/*! angular-css 1.0.8 | Copyright (c) 2016 Alex Castillo | MIT License */
"use strict";
!function (a) {
    var b = a.module("angularCSS", []);
    a.module("door3.css", []).run(function () {
        console.error('AngularCSS: The module name "door3.css" is now deprecated. Please use "angularCSS" instead.')
    }), b.provider("$css", [function () {
        var b = this.defaults = {
            element: "link",
            rel: "stylesheet",
            type: "text/css",
            container: "head",
            method: "append",
            weight: 0
        }, d = !1;
        this.debugMode = function (b) {
            return a.isDefined(b) && (d = b), d
        }, this.$get = ["$rootScope", "$injector", "$q", "$window", "$timeout", "$compile", "$http", "$filter", "$log", "$interpolate", function (e, f, g, h, i, j, k, l, m, n) {
            function o(a, b, c) {
                c && b.hasOwnProperty("css") && y.bind(b.css, c)
            }

            function p(a, b, c) {
                c && (y.remove(y.getFromRoute(c).concat(F)), F.length = 0), b && y.add(y.getFromRoute(b))
            }

            function q(a, b, c, d) {
                d && (y.remove(y.getFromState(d).concat(F)), F.length = 0), b && y.add(y.getFromState(b))
            }

            function r(b) {
                a.isDefined(D.breakpoints) && (b.breakpoint in D.breakpoints && (b.media = D.breakpoints[b.breakpoint]), delete b.breakpoints)
            }

            function s(b) {
                return b ? (a.isFunction(b) && (b = a.copy(f.invoke(b))), a.isString(b) && (b = a.extend({href: b}, D)), a.isArray(b) && a.isString(b[0]) && a.forEach(b, function (c) {
                    b = a.extend({href: c}, D)
                }), a.isObject(b) && !a.isArray(b) && (b = a.extend({}, D, b)), a.isArray(b) && a.isObject(b[0]) && a.forEach(b, function (c) {
                    b = a.extend(c, D)
                }), r(b), b) : void 0
            }

            function t(a) {
                if (!a)return void(d && m.error("No stylesheets provided"));
                var b = "?cache=";
                -1 === a.href.indexOf(b) && (a.href = a.href + (a.bustCache ? b + (new Date).getTime() : ""))
            }

            function u(a, b) {
                return a && b ? l("filter")(a, function (a) {
                    return a[b]
                }) : void(d && m.error("filterBy: missing array or property"))
            }

            function v(a) {
                return a ? (A[a.href] = h.matchMedia(a.media), B[a.href] = function (b) {
                    i(function () {
                        if (b.matches)e.stylesheets.push(a); else {
                            var c = e.stylesheets.indexOf(l("filter")(e.stylesheets, {href: a.href})[0]);
                            -1 !== c && e.stylesheets.splice(c, 1)
                        }
                    })
                }, A[a.href].addListener(B[a.href]), void B[a.href](A[a.href])) : void(d && m.error("No stylesheet provided"))
            }

            function w(b) {
                return b ? void(e && a.isDefined(A) && A[b.href] && a.isDefined(B) && A[b.href].removeListener(B[b.href])) : void(d && m.error("No stylesheet provided"))
            }

            function x(a) {
                return a ? !(!a.media || -1 !== C.indexOf(a.media) || !h.matchMedia) : void(d && m.error("No stylesheet provided"))
            }

            var y = {}, z = '<link ng-repeat="stylesheet in stylesheets | orderBy: \'weight\' track by $index " rel="{{ stylesheet.rel }}" type="{{ stylesheet.type }}" ng-href="{{ stylesheet.href }}" ng-attr-media="{{ stylesheet.media }}">';
            z = z.replace(/{{/g, n.startSymbol()).replace(/}}/g, n.endSymbol());
            var A = {}, B = {}, C = ["print"], D = a.extend({}, b), E = a.element(document.querySelector ? document.querySelector(D.container) : document.getElementsByTagName(D.container)[0]), F = [];
            return a.forEach(c, function (a, b) {
                a.hasOwnProperty("css") && (c[b] = s(a.css))
            }), e.stylesheets = [], E[D.method](j(z)(e)), e.$on("$directiveAdd", o), e.$on("$routeChangeSuccess", p), e.$on("$stateChangeSuccess", q), y.getFromRoute = function (b) {
                if (!b)return void(d && m.error("Get From Route: No route provided"));
                var c = null, e = [];
                return b.$$route && b.$$route.css ? c = b.$$route.css : b.css && (c = b.css), c && (a.isArray(c) ? a.forEach(c, function (b) {
                    a.isFunction(b) && F.push(s(b)), e.push(s(b))
                }) : (a.isFunction(c) && F.push(s(c)), e.push(s(c)))), e
            }, y.getFromRoutes = function (b) {
                if (!b)return void(d && m.error("Get From Routes: No routes provided"));
                var c = [];
                return a.forEach(b, function (a) {
                    var b = y.getFromRoute(a);
                    b.length && c.push(b[0])
                }), c
            }, y.getFromState = function (b) {
                if (!b)return void(d && m.error("Get From State: No state provided"));
                var c = [];
                if (a.isDefined(b.views) && a.forEach(b.views, function (b) {
                        b.css && (a.isFunction(b.css) && F.push(s(b.css)), c.push(s(b.css)))
                    }), a.isDefined(b.children) && a.forEach(b.children, function (b) {
                        b.css && (a.isFunction(b.css) && F.push(s(b.css)), c.push(s(b.css))), a.isDefined(b.children) && a.forEach(b.children, function (b) {
                            b.css && (a.isFunction(b.css) && F.push(s(b.css)), c.push(s(b.css)))
                        })
                    }), a.isDefined(b.css) || a.isDefined(b.data) && a.isDefined(b.data.css)) {
                    var e = b.css || b.data.css;
                    a.isArray(e) ? a.forEach(e, function (b) {
                        a.isFunction(b) && F.push(s(b)), c.push(s(b))
                    }) : (a.isFunction(e) && F.push(s(e)), c.push(s(e)))
                }
                return c
            }, y.getFromStates = function (b) {
                if (!b)return void(d && m.error("Get From States: No states provided"));
                var c = [];
                return a.forEach(b, function (b) {
                    var d = y.getFromState(b);
                    a.isArray(d) ? a.forEach(d, function (a) {
                        c.push(a)
                    }) : c.push(d)
                }), c
            }, y.preload = function (b, e) {
                b || (b = [], c.length && Array.prototype.push.apply(b, c), f.has("$route") && Array.prototype.push.apply(b, y.getFromRoutes(f.get("$route").routes)), f.has("$state") && Array.prototype.push.apply(b, y.getFromStates(f.get("$state").get())), b = u(b, "preload")), a.isArray(b) || (b = [b]);
                var h = [];
                a.forEach(b, function (a, c) {
                    a = b[c] = s(a), h.push(k.get(a.href)["catch"](function (b) {
                        d && m.error("AngularCSS: Incorrect path for " + a.href)
                    }))
                }), a.isFunction(e) && g.all(h).then(function () {
                    e(b)
                })
            }, y.bind = function (b, c) {
                if (!b || !c)return void(d && m.error("No scope or stylesheets provided"));
                var e = [];
                a.isArray(b) ? a.forEach(b, function (a) {
                    e.push(s(a))
                }) : e.push(s(b)), y.add(e), d && m.debug("$css.bind(): Added", e), c.$on("$destroy", function () {
                    y.remove(e), d && m.debug("$css.bind(): Removed", e)
                })
            }, y.add = function (b, c) {
                return b ? (a.isArray(b) || (b = [b]), a.forEach(b, function (a) {
                    a = s(a), a.href && !l("filter")(e.stylesheets, {href: a.href}).length && (t(a), x(a) ? v(a) : e.stylesheets.push(a), d && m.debug("$css.add(): " + a.href))
                }), void e.$broadcast("$cssAdd", b, e.stylesheets)) : void(d && m.error("No stylesheets provided"))
            }, y.remove = function (b, c) {
                return b ? (a.isArray(b) || (b = [b]), b = l("filter")(b, function (a) {
                    return !a.persist
                }), a.forEach(b, function (a) {
                    a = s(a);
                    var b = e.stylesheets.indexOf(l("filter")(e.stylesheets, {href: a.href})[0]);
                    -1 !== b && e.stylesheets.splice(b, 1), w(a), d && m.debug("$css.remove(): " + a.href)
                }), void e.$broadcast("$cssRemove", b, e.stylesheets)) : void(d && m.error("No stylesheets provided"))
            }, y.removeAll = function () {
                e && e.hasOwnProperty("stylesheets") && (e.stylesheets.length = 0), d && m.debug("all stylesheets removed")
            }, y.preload(), y
        }]
    }]), b.filter("$cssLinks", function () {
        return function (b) {
            if (!b || !a.isArray(b))return b;
            var c = "";
            return a.forEach(b, function (a) {
                c += '<link rel="' + a.rel + '" type="' + a.type + '" href="' + a.href + '"', c += a.media ? ' media="' + a.media + '"' : "", c += ">\n\n"
            }), c
        }
    }), b.run(["$css", function (a) {
    }]);
    var c = [], d = a.module, e = function (a, b) {
        return a.reduce(function (a, c) {
            return a.push(b(c)), a
        }, [])
    }, f = function (a, b) {
        return a.indexOf(b) > -1
    };
    a.module = function () {
        var b = d.apply(this, arguments), g = b.directive;
        b.directive = function (b, d) {
            var h = a.isFunction(d) ? d : d[d ? d.length - 1 : 0];
            try {
                var i = a.copy(h)();
                i.directiveName = b, i.hasOwnProperty("css") && !f(e(c, function (a) {
                    return a.ddo.directiveName
                }), b) && c.push({ddo: i, handled: !1})
            } catch (j) {
            }
            return g.apply(this, arguments)
        };
        var h = b.component;
        return b.component = function (a, b) {
            return b.directiveName = a, b.hasOwnProperty("css") && !f(e(c, function (a) {
                return a.ddo.directiveName
            }), a) && c.push({ddo: b, handled: !1}), h.apply(this, arguments)
        }, b.config(["$provide", "$injector", function (b, d) {
            a.forEach(c, function (a) {
                if (!a.handled) {
                    var c = a.ddo, e = c.directiveName + "Directive";
                    d.has(e) && (a.handled = !0, b.decorator(e, ["$delegate", "$rootScope", "$timeout", function (a, b, d) {
                        var e = a[0], f = e.compile;
                        return e.css || (e.css = c.css), e.compile = function () {
                            var a = f ? f.apply(this, arguments) : !1;
                            return function (c) {
                                var f = arguments;
                                d(function () {
                                    a && a.apply(this, f)
                                }), b.$broadcast("$directiveAdd", e, c)
                            }
                        }, a
                    }]))
                }
            })
        }]), b
    }
}(angular);
