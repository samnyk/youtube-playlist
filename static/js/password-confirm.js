!function () {
    "use strict";
    function a() {
        function a(a, e, r, n) {
            var s = n[1], u = n[0], o = s[r.matchPassword], t = function () {
                return o.$viewValue
            };
            a.$watch(t, function () {
                u.$$parseAndValidate()
            }), u.$validators ? u.$validators.passwordMatch = function (a) {
                return !a && !o.$modelValue || a === o.$modelValue
            } : u.$parsers.push(function (a) {
                return u.$setValidity("passwordMatch", !a && !o.$viewValue || a === o.$viewValue), a
            }), o.$parsers.push(function (a) {
                return u.$setValidity("passwordMatch", !a && !u.$viewValue || a === u.$viewValue), a
            })
        }

        var e = ["^ngModel", "^form"];
        return {restrict: "A", require: e, link: a}
    }

    angular.module("ngPassword", []).directive("matchPassword", a), angular.module("angular.password", ["ngPassword"]), angular.module("angular-password", ["ngPassword"]), "object" == typeof module && "function" != typeof define && (module.exports = angular.module("ngPassword"))
}();
