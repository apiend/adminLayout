### 官方一些用法 
- https://monterail.github.io/vuelidate/#sub-form-submission



## 可以加上一些独特的验证规则




$v values
$v model represents the current state of validation. It does so by defining a set of properties which hold the output of user defined validation functions, following the validations option structure. The presence of those special reserved keywords means that you cannot specify your own validators with that name.

Name	Type	Description
$invalid	boolean	Indicates the state of validation for given model. becomes true when any of it's child validators specified in options returns a falsy value. In case of validation groups, all grouped validators are considered.

$dirty	boolean	A flag representing if the field under validation was touched by the user at least once. Usually it is used to decide if the message is supposed to be displayed to the end user. You can manage this flag manualy by using $touch and 
$reset methods. It is set automatically when writing to $model value. The $dirty flag is considered true if given model was $touched or all of it's children are $dirty.


$anyDirty	boolean	A flag very similar to $dirty, with one exception. The $anyDirty flag is considered true if given model was $touched or any of it's children are $anyDirty.


$model	any	A reference to the original validated model. Reading this value will always give you exactly the same value as if you referenced the model directly. That means this.$v.value.$model is equivalent to this.value when read. Writing to that value will update the model and invoke $touch method automatically. This is very useful to use as v-model payload, providing a way of automatically marking given field as $dirty on first touch. Pairs well with .lazy modifier.


$error	boolean	Convenience flag to easily decide if a message should be displayed. Equivalent to this.$dirty && !this.$pending && this.$invalid.



$anyError	boolean	Convenience flag to easily decide if a message should be displayed. A variant that considers error to be displayed when any of it's children are $anyDirty. Equivalent to this.$anyDirty && !this.$pending && this.$invalid.


$pending	boolean	Indicates if any child async validator is currently pending. Always false if all validators are synchronous.


$params	object	Contains types and parameters of all provided validators at the current level, as well as types and parameters of child validation groups, which may be declared using `withParams`. Useful as an input to your error rendering system. Safe to use in translated text.


$each	object	Holds all validation models of collection validator. Always preserves the keys of original model, but also holds additional names for all associated validators and special values like $invalid. A special $iter fields is preferred for usage inside v-for directives.


$iter	object	Only present as direct child of $each objects. Holds all validation models of collection validator and nothing else. It can be safely referenced in the v-for loop iterating over all your model validators.
See Collections Validation for usage example.