/**
 * Created by leon on 15/12/1.
 */

angular.module('angularValidateWithToast', [])

.directive('bsyFormValidate', function (ionicToast) {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            bsyFormValidate: '='
        },
        link: function (scope, element, attrs, ctrl) {
            ctrl.validate = false;
            var formCtrl = element.controller('form');
            var wrap = element.parent();

            scope.defaultTips = {
                required: 'This field is required',
                minlength: 'This field does not match the min length',
                maxlength: 'This field does not match the max length',
                pattern: 'This field is not right',
                number: 'This field should be a number'
            }

            scope.$watch(function () {
                return ctrl.$valid + '_' + formCtrl.$submitted + '_' + ctrl.$dirty;
            }, function () {
                if (ctrl.$valid) {
                    // input is valid
                    wrap.addClass('has-success').removeClass('has-error');
                } else if(ctrl.$invalid && formCtrl.$submitted){
                    // input is invalid, and submit is triggered
                    wrap.addClass('has-error').removeClass('has-success');
                } else if(ctrl.$invalid && ctrl.$dirty){
                    // input is revised, and invliad
                    wrap.addClass('has-error').removeClass('has-success');
                } else{
                    // other
                    wrap.removeClass('has-success').removeClass('has-error');
                }
            })

            var showTopToastShort = function(msg){
                ionicToast.show(msg, 'top', false, 1000)

            }

            element.on('focus', function (evt) {
                // focus to the first invliad input when submit
                if(formCtrl.showToast && ctrl.$invalid){
                    formCtrl.showToast = false;
                    var errorType = Object.keys(ctrl.$error)[0];

                    if(scope.bsyFormValidate == undefined){
                        scope.bsyFormValidate = scope.defaultTips
                    }

                    var errorTips = scope.bsyFormValidate[errorType];

                    if(errorTips == undefined){
                        errorTips = scope.defaultTips[errorType]
                    }
                    showTopToastShort(errorTips);
                }
            })
        }
    }
})

    .directive('checkForm', function ($parse, $timeout) {
        return {
            require: '^form',
            restrict: 'A',
            priority: -1,   // execute before ng-click, which is on priority 0
            link: function (scope, element, attrs, ctrl) {
                var form = angular.element(element[0].form);
                var formCtrl = ctrl;

                formCtrl.$submitted = false;
                formCtrl.showToast = false;
                element.on('click', function (event) {
                    if (formCtrl.$invalid) {
                        var inputs = form[0].getElementsByClassName('ng-invalid');
                        // the first invliad input
                        var inputWithErr = inputs[0]
                        $timeout(function () {
                            formCtrl.showToast = true;
                            formCtrl.$submitted = true;
                            //console.log(inputWithErr)
                            inputWithErr.focus();
                        }, 0);
                        event.stopImmediatePropagation();
                        event.preventDefault()
                    }
                })
            }
        }
    })
