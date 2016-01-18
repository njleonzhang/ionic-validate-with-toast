# ionic-validate-with-toast
A pure angular validate specially for mobile app/website without jQuery dependency. 


##Introduce.

[view Demo](http://codepen.io/leonz/pen/WQVPBV)

The example in sample folder can work too.

##Function

1) Show special style in time to tag the input is valid or not when user input.

2) When user submit the form, focus to the first invalid input and show a toast.
    Content in toast can be customized.

##Usage. (take a ionic project as example)

1) link the angularValidateWithToast.js and ionic-toast.bundle.min.js in to your project in index.html

```html
    <script src="js/angularValidateWithToast.js"></script>
    <script src="js/ionic-toast.bundle.min.js"></script>
```

ionic-toast.bundle.min.js is a toast module, for detail, check https://github.com/rajeshwarpatlolla/ionic-toast

You can use your own toast module.

2) Inject the two module to your project in app.js

```javascript
angular.module('starter', ['ionic', 'angularValidateWithToast', 'ionic-toast'])
```

3) Define the css to show the error label style in style.css

```css
label.has-error {
  border-right: 3px solid red !important;
}
```

4) Add attribute `bsy-form-validate` to your input, add `check-form` to the submit button
```html
<form novalidate>
   <label class="item item-input">
       <span class="input-label">username</span>
       <input type="text" ng-model="test.username" bsy-form-validate="userNameErrorTips"
              ng-minlength="5" ng-maxlength='10' ng-pattern="/^[0-9]{11}$/" required>
   </label>

   <button class="button button-block button-positive" check-form ng-click="">login</button>
</form>
```

`ng-minlength` is used to set min length, `ng-maxlength` is used to set max length,
`ng-pattern` set the pattern, `required` means the field is required, for detail check [angularJS input](https://docs.angularjs.org/api/ng/directive/input/)

5) In controller, define the userNameErrorTips for customized error tips.

```javascript
  .controller('controller', function ($scope) {
    $scope.userNameErrorTips = {
      required: 'please input username',
      minlength: 'This field does not match the min length',
      maxlength: 'This field does not match the max length',
      pattern: 'This field is not right',
      number: 'This field should be a number'
    }
  }
```

