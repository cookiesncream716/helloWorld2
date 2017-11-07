# Tixit: helloWorld2
Creating a Tixit plugin is easy! This tutorial will show you how to build a basic Hello World [Tixit](https://tixit.me/) plugin in 6 stages, each building on the previous stage. In-depth documentation of the plugin API touched on in this tutorial can be found here: [http://docs.tixit.me/d/Plugin_API](http://docs.tixit.me/d/Plugin_API).

## Build Stages
* [Stage 1](#stage-1---setup-environment-to-test-your-plugin-and-display-hello-world) - Setup the environment to test your plugin and display "Hello World"
* [Stage 2](#stage-2---style-the-plugin) - Style the plugin
* [Stage 3](#stage-3---display-hello-world-after-the-button-is-clicked) - Display “Hello World” after the button is clicked
* [Stage 4](#stage-4---add-text-that-tells-how-many-times-the-button-has-been-clicked-and-save-that-number-to-the-ticket) - Add text that tells how many times the button has been clicked and save that number to the ticket.
* [Stage 5](#stage-5---add-the-ability-to-recognize-a-change-in-the-count-from-an-external-source-and-update-the-text-appropriately) - Add the ability to recognize a change in the count from an external source
* [Stage 6](#stage-6---add-a-module-and-bundle-it-all-together) - Add a module and bundle it all together
* [Stage 7](#stage-7---uploading-the-plugin-to-tixit) - Uploading the plugin to Tixit

### Stage 1 - Setup environment to test your plugin and display "Hello World"

1. First, create a project folder with a new html file and open it.  Adding a link to the [plugin tester](http://docs.tixit.me/d/Plugin_API#Plugin_Tester) (https://tixit.me/PluginTester.umd.js) allows you to run and test the plugin. You'll write your plugin code in a javascript file and need to add a link to it. Your html file should look something like this:

```
<html>
	<head><meta charset="utf-8" /></head>
	<body></body>
	<script src='https://tixit.me/PluginTester.umd.js'></script>
	<script src='stage1.js'></script>
	<script>
   	 	PluginTester('HelloWorld')
	</script>
</html>
```

2. Make a new javascript file for your plugin code. A Tixit plugin must be a Gem instance using the view-library [gem.js](https://github.com/Tixit/Gem.js). This tutorial also uses the class library [proto](https://github.com/fresheneesz/proto). Plugins automatically have access to `proto`, `Gem`, `Text`, `Block`, `Style`, and a number of [other gem components](http://docs.tixit.me/d/Plugin_API#Main_Plugin_API), so they don't need to be installed. Gems require a `name` property and a constructor method called `build`. 

```
registerPlugin(proto(Gem, function(){
  this.name = 'HelloWorld'
  this.build = function(ticket, optionsObservee, api){
     // your constructor code goes here
  }
}))
```

3. Your plugin doesn't have any content yet, so let's add some. Inside the build method, create a [`Text`](https://github.com/Tixit/Gem.js#text) gem containing the greeting `'Hello World'`. Let's make it an instance variable because we will want access to it in a later step. Give the label `'greeting'` so that can be used when we style the plugin in the next step.

```
this.greeting = Text(‘greeting’, ‘Hello World’)
```

4. Use the [`Block`](https://github.com/Tixit/Gem.js#block) gem to make a container for the plugin. Enter `'box'` as the label and pass in `greeting` to add it to the `Block`. Then append `box` to the plugin using the `add` method.

```
var box = Block(‘box’, this.greeting)
this.add(box)
```

To test that everything is working, open the html file in the browser. You should see the greeting "Hello World".


### STAGE 2 - Style the plugin

Our plugin looks a bit boring so let's give it some style.

1. Styles can be added by creating a `getStyle` method. The `getStyle` method should return a gem [`Style`](https://github.com/Tixit/Gem.js#style-objects) object. Note that the `getStyle` method shouldn't be in the `build` constructor.

2. Items in the style that start with the symbol [$](https://github.com/Tixit/Gem.js#label) allows you to style objects with the label given after the `$` symbol.

3. Style your plugin any way that you like. Here, a border is given so an outline of the space can be seen. The text for `greeting` will be blue and given a size of 74px. The text is also centered.

```
this.getStyle = function(){
  return Style({
    $box: {
      width: 550,
      minHeight: 300,
      border: '1px solid black',
      padding: 5,
      margin: 50
    },
    $greeting: {
      color: 'blue',
      fontSize: 74,
      display: 'block',
      margin: 10,
      textAlign: 'center'
    }
  })
}
```

It's now ready to test! Open the page in the browser and see how much better it looks!


### STAGE 3 - Display "Hello World" after the button is clicked

Let's make things interactive. We'll modify our plugin so that greetings appear when you click a button.

1. Since the greeting is supposed to be shown only after the button is clicked, it needs to start out invisible. Give the `visible` property of `this.greeting` a value of `false`.

```
this.greeting.visible = false
```

2. Create a button with the [`Button`](https://github.com/Tixit/Gem.js#button) gem, and add it to the box.

```
var button = Button('click me')
var box = Block(‘box’, this.greeting, button)
```

3. *(optional)* Give the button some style. Just add it after `$greeting` in the `getStyle` method. Here, we're using the `Button`'s `name` to select it and give it a style, rather than using a label.

```
Button: {
  backgroundColor: ‘green’,
  color: ‘white’,
  display: 'block',
  margin: 'auto'
}
```

4. To make things a little more interesting, let's make the greeting change each time the button is clicked. To do this, we'll first write a method that updates the text from an array of greetings. The greeting we choose will depend on a new `count` property.

```
this.updateText = function(){
   var newGreeting = [‘Hello World’, ‘Hi There’, ‘Howdy’, ‘Hello', ‘Hey’]
   this.greeting.text = newGreeting[(this.count-1)%newGreeting.length]
   this.greeting.visible = true
}
```

5. Now, we'll want to keep track of the `count` of times the button is clicked. Inside the `build` constructor method, initialize the count property and create a `click` [event handler](https://github.com/Tixit/Gem.js#event-instance-properties-and-methods) that updates that `count` and re-renders the text by calling `updateText`.

```
var that = this // so the instance can be accessed inside the click handler
this.count = 0
button.on(‘click’, function(){
  that.count++
  that.updateText()
})
```

Now open the page in the browser and test out the "click me" button!


### STAGE 4 - Add text that tells how many times the button has been clicked and save that number to the ticket

Ok, now let's add a click counter. The count variable is already counting the number of clicks, so we'll just show that count to the user.

1. Create the text that will tell users how many times the button has been clicked. We'll hide it when the page loads and then show it once the button has been clicked. Inside the build constructor:

```
this.countText = Text()
this.countText.visible = false
var box = Block(‘box’, this.greeting, button, this.countText)
```

Notice that `countText` doesn’t have the label `‘greeting’` so it won’t have any of the greeting style.

2. Inside of the `updateText` method, update `countText` with the actual count and make it visible.

```
this.updateText = function(){
  ...
  this.countText.text = ‘You have clicked this button ‘ + this.count + ‘ times.’
  this.countText.visible = true
}
```

3. To save `count` to the ticket, you could just assume there will be a `count` field in the Ticket schema for the given ticket, but what if another plugin wants to use a `count` property? The proper way to do this is to have a configuration option for which the ticket's field is used to store the count. So let's use a plugin configuration property to get the field name. We'll use `countField`. In the click handler, save the updated count to the ticket:

```
ticket.set(optionsObservee.subject.countField, that.count)
```

Note that `ticket` is a [model object](http://docs.tixit.me/d/Plugin_API#Model_Object) which inherits properties from the [observe module](https://github.com/Tixit/observe). Setting the ticket property in this way will update the ticket everywhere in your frontend client as well as saving that data to the server. 

The `optionsObservee` argument is also an [observee object](https://github.com/Tixit/observe), and so the `countField` property will be in its `subject`.

4. Now that the plugin expects the `countField` configuration property, let's add a plugin configuration object. In the HTML file, we'll add a second parameter to the `PluginTester` call, containing plugin options directing the plugin to use the `count` field:

```
PluginTester('HelloWorld', {countField: 'count'})
```

Open your browser and try out the new changes!


### STAGE 5 - Add the ability to recognize a change in the count from an external source and update the text appropriately

For our last trick, let's make our plugin recognize previously saved ticket data as well as make it react to ticket changes that happen outside our plugin!

1. To check to see if there is already value for `count` stored in the ticket, use the `countField` option to access the correct ticket field.

```
var countField = optionsObservee.subject.countField
```

2. Let's initialize our plugin based on the ticket's countField (`count`). If the countField is not defined, then both texts shouldn't be visible and set `count` to 0. If the countField is already defined, the `greeting` text and `countText` should be visible when the page is loaded, so call the `updateText` method to initialize the text. This time, we'll pass the ticket countField into `updateText`. 

```
if(ticekt.get(countField).subject === undefined){
  this.greeting.visible = false
  this.countText.visible = false
  ticket.set(optionsObservee.subject.countField, 0)
} else{
  this.updateText(ticket.get(countField).subject)
}
```

3. Since we're now passing in the count to `updateText`, update it to use that count parameter instead.

```
this.updateText = function(count){
  ...
  this.greeting.text = newGreeting[(count-1)%newGreeting.length]
  this.countText.text = 'You have clicked this button ' + count + ' times.'
}
```

4. The plugin running on your machine isn't the only thing that can update the ticket. If someone else is using your plugin on the same ticket, or if another plugin modifies the ticket, we want to be able to react to those ticket changes. To do this, listen for the `change` event on the ticket's `"count"` property. Add this inside the `build` constructor:

```
ticket.get(optionsObservee.subject.countField).on(‘change’, function(){
  that.updateText(ticket.get(countProperty).subject)
})
```

5. We aren't going to use `this.count` anymore, so we'll modify the `click` handler to save the count directly to the ticket. And because the ticket is listening for any changes to 'count' and calling `updateText`, we don't need to call `updateText` here anymore.

```
button.on('click', function(){
  ticket.set(optionsObservee.subject.countField, ticket.get(countProperty).subject+1)
})
```

6. To test this, we'll want our test ticket to have an initialized count, and we'll want some way to change the ticket's count from outside the plugin. To do this, let's use the `PluginTester` to explicitly create a test ticket, and we'll create a ticket data editor box:

```
PluginTester.Api.Ticket.create().then(function(testTicket){
  testTicket.subject.count = 12
  PluginTester(HelloWorld, {countField: ‘count’}, {ticketId: testTicket.subject._id, showEditor: true})
}).done()
```

This will initialize the ticket's count to `12`. The `showEditor` option tells the `PluginTester` to show a box of editable ticket data. The value for `count` will be in that box under the `count` property. If you comment out the line `testTicket.subject.count = 12`, the `count` property won't be defined, but the plugin should still work whether that property is initialized or not.

Now, if `count` is changed elsewhere (for example if you edit the `count` property in the editor box), the plugin will be updated for the new count! Open the file up in your browser and try it out!

Test it out and see how it works. 


### Stage 6 - Add a module and bundle it all together

Sometimes you might want to add a feature to your plugin that requires an outside dependency. If you do that, you are going to need to use a module bundler to bundle your Javascript files together. In this example, let's add a calendar that could be used to select a date for a deadline or a meeting and then bundle it all up using [build-modules](https://github.com/fresheneesz/buildModules). The [build-modules](https://github.com/fresheneesz/buildModules) module uses the popular [Webpack](https://webpack.github.io/) tool to create a javascript bundle file.

 Because we have added some dependencies, we are going to need to bundle everything together using something like [build-modules](https://github.com/fresheneesz/buildModules). [Webpack](https://webpack.github.io/) is probably the most popular bundler, but for our purposes, build-modules will be a little easier to use. 

In order to install node modules, you will need to have npm installed on your computer. If you don't have [node.js](https://nodejs.org/en/) installed, you will need to install it before continuing.

1. We are going to use [flatpickr](https://chmln.github.io/flatpickr/) for the calendar. Before adding it, create a file called [package.json](https://docs.npmjs.com/getting-started/using-a-package.json).

```
{
  "name": "helloWorld2",
  "version": "1.0"
}
```

 The following will install `flatpickr` and `build-modules` then automatically add them as dependencies in the `package.json` file.

```
npm install flatpickr --save
npm install build-modules --save
```

2. Flatpickr will need to be imported before creating the plugin. At the top of your javascript plugin file, write:

```
var flatpickr = require('flatpickr')
```

3. Follow the directions to configure flatpickr in whatever way you need inside of the `build` constructor and add it to `box`:

```
var calender = TextField()
var fp_calendar = new flatpickr(calendar.domNode, {
  enableTime: true,
  dateFormat: 'm-d-Y h:i K'
  defaultDate: new Date()
})

...

box.add(calendar)
```

4. This particular module also requires that you use it's stylesheet. In order to do that, we are going to add another module, [raw-loader](https://www.npmjs.com/package/raw-loader). This Webpack loader module instructs webpack to load flatpickr's stylesheet as a string.

```
npm install raw-loader --save
```

Now inside of the `build` constructor, we'll load the flatpickr stylesheet using `raw-loader`, and insert it in the head of the html file as a new stylesheet.

```
this.on('attach', function(){
  var flatpickrStylesheet = require('raw-loader!flatpickr/dist/flatpckr.min.css')
  var style = document.createElement('style')
  style.innerHTML = flatpickrStylesheet
  document.head.appendChild(style)
})
```

5. *(optional)* In the getStyle method, add some more style. Let's just move the calendar to the center of the plugin area and away from `countText`.

```
TextField: {
  dispaly:'block',
  margin: 'auto',
  marginTop: 30
}
```

6. Now let's build the plugin bundle. Create a new javascript file called `buildBundle.js` and put in the following

```
var build = require('build-modules')

// change 'stage6.js' here to whatever your javascript plugin source file is named
var emitter = build(__dirname + '/stage6.js', {output: {path: __dirname, minify:false}})
emitter.on('done', function() {
   console.log("Done!")
})
emitter.on('error', function(e) {
  console.log('error')
  console.log(e)
})
emitter.on('warning', function(w) {
  console.log('warning')
  console.log(w)
})
```

When you run it, the output will be a file named `stage6.umd.js`, so change that link in your html file to:

```
<script src='stage6.umd.js'></script>
```

Open it in the browser and see what day it is! And congratulations, you've completed this tutorial and now should understand the basics of creating a Tixit plugin that interacts with a ticket! 

### Stage 7 - Uploading the plugin to Tixit

1. Now that you have a plugin, you can upload it into Tixit and use it in a ticket layout! To do that, go to Tixit, click on the user settings button the top right, and open the Package Library. There you can `create` a new Plugin, then upload the plugin by clicking on the `Upload New Version` button. 

2. Once your plugin is uploaded, you can go to the settings for one of your projects, click `Edit Layouts` to open up the Layout Editor, and add your plugin to a new or existing layout. 

3. Once you've added your plugin to a layout, create a ticket type that uses that layout. Now tickets that are changed to that ticket type will show your plugin and your plugin will be able to modify that ticket. Note that you may also need to create a ticket schema that contains the ticket type(s) your plugin uses.

To learn more about building Tixit plugins see the [Plugin API](http://docs.tixit.me/d/Plugin_API).
