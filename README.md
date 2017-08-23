# helloWorld2
Creating a plugin is easy! This tutorial will show you how to build a basic Hello World plugin in 5 stages, each building on the previous stage.

## Build Stages
* [Stage 1](#stage-1---setup-environment-to-test-your-plugin) - Setup the environment to test your plugin
* [Stage 2](#stage-2---display-the-text-hello-world-in-the-plugin-space) - Display the text “Hello World” in the plugin space
* [Stage 3](#stage-3---display-hello-world-after-the-button-is-clicked) - Display “Hello World” after the button is clicked
* [Stage 4](#stage-4---add-text-that-tells-how-many-times-the-button-has-been-clicked) - Add text that tells how many times the button has been clicked and save that number to the ticket.
* [Stage 5](#stage-5---add-the-ability-to-recognize-a-change-in-the-count-from-an-external-source-and-update-the-text-appropriately) - Add the ability to recognize a change in the count from an external source 

### Stage 1 - Setup environment to test your plugin

1. First, create a project folder and create package.json inside it. The two node modules [gem.js](https://github.com/Tixit/Gem.js) and [proto](https://github.com/fresheneesz/proto) are required to build plugins for Tixit. In the terminal, go into the project folder and run the following commands:

```
npm install gem —save
npm install proto —save
```

2. Create a new html file and open it. Use script tags to link to the location of the gem and proto node modules. Also, adding a link to the plugin tester (ExtensionTester.umd.js) allows you to run and test the plugin. You'll write your plugin code inside another script block. Your html file should look something like this:

```
	<html>
	  <head></head>
	  <body></body>
	  <script src='node_modules/proto/dist/proto.umd.js'></script>
	  <script src='node_modules/gem/dist/Gem.umd.js'></script>
	  <script src='https://tixit.me/ExtensionTester.umd.js'></script>
	  <script>
	  
	  </script>
	</html>
```

3. Inside the empty script block, create a Gem and assign it to a variable. Plugins require a `name` property and a constructor method called `build`, which has three parameters: `ticket', `optionsObservee`, and `api`.

```
var HelloWorld = proto(Gem, function(superclass){
  this.name = ‘HelloWorld’
  this.build = function(ticket, optionsObservee, api){
    this.add(Gem.Text('It works!'))
  }
})
```

4. Then write the code to create a test ticket and use it to test the plugin with the `ExtensionTester`.

```
ExtensionTester.Api.Ticket.create().then(function(newOne){
  ExtensionTester(HelloWorld, {}, {ticketId: newOne.subject._id})
}).done()
```

To test that everything is working, add the line `this.add(Gem.Text('It works!')` inside the build method. Now open it in the browser and you should see "It works!" This line won't be needed for the next stages, so delete it when you're done testing.


### STAGE 2 - Display the text "Hello World" in the plugin space

Now that we have the boiler-plate set up, let's add some visual content to the plugin!

1. Inside the build method, create a [`Text`](https://github.com/Tixit/Gem.js#text) gem containing the greeting `'Hello World'`. Give it a label so it can be styled differently from text that will be coming in a later step. Here, `'greetng'` is used as the label.

```
var greeting = Gem.Text(‘greeting’, ‘Hello World’)
```

2. Use the [`Block`](https://github.com/Tixit/Gem.js#block) gem to make an area for the plugin. Enter `'box'` as the label and pass `greeting` in to add it to the `Block`.

```
var box = Gem.Block(‘box’, greeting)
```

3. Append `box` to the plugin.

```
this.add(box)
```

4. Styles can be added after the `build` method by using the `getStyle` method. The `getStyle` method should return a gem [`Style`](https://github.com/Tixit/Gem.js#style-objects) object. Items in the style that start with the symbol [$](https://github.com/Tixit/Gem.js#label) allows you to style objects with the label given after the `$` symbol. Here, a border is given so an outline of the space can be seen. The text for `greeting` will be blue and given a size of 24px.

```
this.getStyle = function(){
  return Gem.Style({
    $box: {
      width: 250,
      minHeight: 100,
      border: '1pix solid black',
      padding: 5
    },
    $greeting: {
      color: 'blue',
      fontSize: 24,
      display: 'block',
      margin: 10
    }
  })
}
```
It's now ready to test! Open the page in the browser and you'll see it greet the world!


### STAGE 3 - Display "Hello World" after the button is clicked

Let's make things interactive. We'll modify our plugin so that greetings come up when you click a button.

1. Since the greeting is supposed to appear only after the button is clicked, it needs to start out invisible. Give the `visible` property of `greeting` a value of `false`.

```
greeting.visible = false
```

2. Create a button with the [`Button`](https://github.com/Tixit/Gem.js#button) gem. 

```
var button = Gem.Button('click me')
```

3. Add `button` to `box`.

```
var box = Gem.Block(‘box’, greeting, button)
```

4. *(optional)* Give the button some style. Just add it after `$greeting`. Here, we're using the `Button`'s name to select it and give it a style, rather than using a label.

```
Button: {
  backgroundColor: ‘green’,
  color: ‘white’,
  display: 'block',
  margin: 10
}
```

5. In order to cause the greeting to appear when the button is clicked, attach a click [event listener](https://github.com/Tixit/Gem.js#event-instance-properties-and-methods) to the button.

```
button.on('click', function(){ })
```

5. To make things a little more interesting, have the greeting `“Hello World”` change to a different greeting each time the button is clicked. To do this, make a function that will update the text. It will go outside of the build method.

```
this.updateText = function(){}
```

6. Before writing the code inside the `updateText` method, create a property to iterate through the greetings that will be created in the next step. Create it inside the `build` constructor method but make it an instance property so it's accessible outside of the `build` method.

```
this.count = 0
```

7. In the `updateText` method, create an array of greetings and have `greeting`'s text change when the button is clicked. To do this, the greeting variable will need to become an instance variable. This is done in the `build` method when creating the variable; instead of using `var greeeting = " "` use `this.greeting = " "`. Don’t forget to change `greeting` to `this.greeting` everywhere in the code. The visible property of `this.greeting` also needs to be changed to `true`.

```
this.updateText = function(){
  var newGreeting = [‘Hello World’, ‘Hi There’, ‘Howdy’, ‘Hello', ‘Hey’]
  this.greeting.text = newGreeting[this.count%newGreeting.length]
  this.greeting.visible = true
```

8. In order to cause the greeting to appear when the button is clicked, attach a click [event listener](https://github.com/Tixit/Gem.js#event-instance-properties-and-methods) to the button.

```
button.on('click', function(){ })
```

9. Lastly, the code for the callback function of the `click` needs to be added. Call the `updateText` method and then increment the `count` property when the button is clicked. In order to have access to `this.count` and `this.updateText` inside of the function, make a variable called `that` and assign it the value `this`. Put it inside of the `build` method on the first line.

```
var that = this
```

```
button.on(‘click’, function(){
  that.updateText()
  that.count++
})
```

Now open the page in the browser and test out the "click me" button!


### STAGE 4 - Add text that tells how many times the button has been clicked and save that number to the ticket

Ok, now let's add a click counter. The count variable is already counting the number of clicks, so we will just use it.

1. Create the text that will tell users how many times the button has been clicked. It will need to be hidden when the page loads, and it will also need to be an instance variable so that the `updateText` function has access to it. Don't forget to add it to `box`.

```
this.countText = Gem.Text()
this.countText.visible = false
var box = Gem.Block(‘box’, this.greeting, button, this.countText)
```

Notice that `countText` doesn’t have the label `‘greeting’` so it won’t have any of the greeting style. It also doesn't need to have any actual text yet since it is hidden.

2. Inside of the `updateText` method, `countText` needs to be updated with the actual count and it needs to be made visible.

```
this.updateText = function(){
  this.countText.text = ‘You have clicked this button ‘ + this.count + ‘ times.’
  this.countText.visible = true
}
```

3. In order to save `count` to the ticket, a configuration option for the plugin must be added: `countField`. This option configures what ticket field the plugin will interact with. The `showEditor` option tells the `ExtensionTester` to show a box of editable ticket data. The value for `count` will be in that box.

```
ExtensionTester.Api.Ticket.create().then(function(testTicket){
  ExtensionTester(HelloWorld, {countField: 'count'}, {ticketId: testTicket.subject._id, showEditor: true})
}).done()
```

4. Now to actually save the data to the ticket, we need to set `countField` with `this.count`. After incrementing the 'count' property, add the following line. Notice that we are using `that.count` rather than `this.count`.

```
ticket.set('count', that.count)
```

The `count` property in the editor box should now be updated every time the button is clicked.


Now open your browser and try it out!


### STAGE 5 - Add the ability to recognize a change in the count from an external source and update the text appropriately

For our last trick, let's actually save this data to the ticket and react to changes to ticket data that happen outside our plugin!

1. To simulate a ticket that has saved data, set the property `count` of the `testTicket`'s `subject` with some initial value. This value will also appear in the `ExtensionTester`'s editor box. 

```
ExtensionTester.Api.Ticket.create().then(function(testTicket){
  testTicket.subject.count = 12
  ExtensionTester(HelloWorld, {countField: ‘count’}, {ticketId: testTicket.subject._id, showEditor: true})
}).done()
```

If you comment out the line `testTicket.subject.count = 12`, the `count` property won't be defined, but the plugin should still work whether that property is initialized or not.

2. In the `build` method, set `this.count` to the value stored in the ticket. Use the `countField` option to access the correct ticket field:

```
var countProperty = optionsObservee.subject.countField
this.count = ticket.subject[countProperty]
```

4. If `this.count` is already defined, the `greeting` text and `countText` should be visible when the page is loaded, so call the `updateText` method to initialize the text. It needs to come before the click event listener. If `this.count` is not defined, then both texts shouldn't be visible and set `this.count` to 0. 

```
if(this.count === undefined){
  this.greeting.visible = false
  this.countText.visible = false
  this.count = 0
} else{
  this.updateText()
}
```


5. The plugin running on your machine isn't the only thing that can update the ticket. If someone else is using your plugin on the same ticket, or if another plugin modifies the ticket, the ticket data will change. We need some way to listen for those changes so the plugin can be updated appropriately. To do this, listen for the `change` event on the ticket's `"count"` property:

```
ticket.get(‘count’).on(‘change’, function(){
  that.count = ticket.subject.count
  that.updateText()
})
```

Now, if `count` is changed elsewhere (for example if you edit the `count` property in the editor box), the plugin will be updated for the new count! Open the file up in your browser and try it out!

Congratulations, you have just built a plugin! 

To learn more about building Tixit plugins look [here](http://docs.tixit.me/d/Plugin_API).
