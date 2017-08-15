# helloWorld2
Creating a plugin isn't difficult. Here you will build a basic Hello World plugin in 5 stages, each building on the previous stage.

## Build Stages
* [Stage 1](https://github.com/GeorgeEYokoyama/helloWorld2/blob/patch-1/README.md#stage-1---setup-environment-to-test-your-plugin) - Setup the environment to test your plugin
* [Stage 2](https://github.com/GeorgeEYokoyama/helloWorld2/blob/patch-1/README.md#stage-2---display-the-text-hello-world-in-the-plugin-space) - Display the text “Hello World” in the plugin space
* [Stage 3](https://github.com/GeorgeEYokoyama/helloWorld2/blob/patch-1/README.md#stage-3---display-hello-world-after-the-button-is-clicked) - Display “Hello World” after the button is clicked
* [Stage 4](https://github.com/GeorgeEYokoyama/helloWorld2/blob/patch-1/README.md#stage-4---add-text-that-tells-how-many-times-the-button-has-been-clicked) - Add text that tells how many times the button has been clicked
* [Stage 5](https://github.com/GeorgeEYokoyama/helloWorld2/blob/patch-1/README.md#stage-5---add-the-ability-to-recognize-a-change-in-the-count-from-an-external-source-and-update-the-text-appropriately) - Add the ability to recognize a change in the count from an external source 

### Stage 1 - Setup environment to test your plugin

1. First, create a project folder and create package.json inside it. The two node modules [gem.js](https://github.com/Tixit/Gem.js) and [proto](https://github.com/fresheneesz/proto) are required to build plugins for Tixit. In the terminal, go into the project folder and run the following:

```
npm install gem —save
npm install proto —save
```

2. Create an html file and open it. Use script tags to link to the location of the gem and proto node modules. Also, in order to run and test the plugin, a link to the plugin tester (ExtensionTester.umd.js) is necessary. The code to build the plugin will inside another set of script tags. Your html file should look something like this:

	<html>
	  <head></head>
	  <body></body>
	  <script src=“node_modules/proto/dist/proto.umd.js"></script>
	  <script src=“node_modules/gem/dist/Gem.umd.js”></script>
	  <script src=“https://tixit.me/ExtensionTester.umd.js”></script>
	  <script>
	  </script>
	</html>

3. Inside the last set of script tags, create a variable for the plugin. Usually the variable will be a one or two word description of the plugin.

```
var HelloWorld = proto(Gem, function(superclass){})
```

4. Plugins require a name property and a constructor method called build, which has three parameters; ticket, optionsObservee, and api.

```
var HelloWorld = proto(Gem, function(superclass){
  this.name = ‘HelloWorld’
  this.build = function(ticket, optionsObservee, api){}
})
```

5. The code for the plugin tester will come after the plugin but still inside of the script tags.

```
ExtensionTester.Api.Ticket.create().then(function(newOne){
  ExtensionTester(HelloWorld, {}, {ticketId: newOne.subject._id, showEditor: true})
}).done()
```


### STAGE 2 - Display the text "Hello World" in the plugin space

1. Inside the build method, create a variable for the greeting Hello World by using the [Text](https://github.com/Tixit/Gem.js#text) property of Gem. Give it a label so it can be styled differently from text that will be coming in a later step. Here, greetng is used as the label.

```
var greeting = Gem.Text(‘greeting’, ‘Hello World’)
```
2. Use the [Block](https://github.com/Tixit/Gem.js#block) property of Gem to make an area for the plugin. Enter box as the label. Then the greeting variable needs to be added to the Block.

```
var box = Gem.Block(‘box’, greeting)
```

3. Append box to the plugin.

```
this.add(box)
```

4. Styles can be added after the build method by using the getStyle method. It is a function that will return a [Style](https://github.com/Tixit/Gem.js#style-objects) object. The symbol [$](https://github.com/Tixit/Gem.js#label) will be used along with the labels. Here a border is given so an outline of the space can be seen. The text for the greeting will be blue and given a size of 24.

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
It is now ready to test. Open the page in the browser.


### STAGE 3 - Display "Hello World" after the button is clicked

1. Because the greeting is not supposed to appear until after the button is clicked, it needs to be made invisible. Give the visible property of greeting a value of false.

```
greeting.visible = false
```

2. A button needs to be created using the [Button](https://github.com/Tixit/Gem.js#button) property. Since there is only one button, it does not need a label to distinguish it from other buttons.

```
var button = Gem.Button('click me')
```

3. Add button to box.

```
var box = Gem.Block(‘box’, greeting, button)
```

4. (optional) Give the button some style if desired. It can just be added after the $greeting. Just be sure to separate it with a comma.

```
Button: {
  backgroundColor: ‘green’,
  color: ‘white’,
  display: 'block',
  margin: 10
}
```

5. Attach a click [event listener](https://github.com/Tixit/Gem.js#event-instance-properties-and-methods) on the button.

```
button.on('click', function(){ })
```

6. To make things a little more interesting, have the greeting “Hello World” change to a different greeting each time the button is clicked. To do this, make a function that will update the text. It will go outside of the build method.

```
this.updateText = function(){}
```

7. Before writing the code inside the updateText function, create a variable to iterate through the greetings. Create it inside the build method but make it an instance variable so it is accessible outside of the build method.

```
this.index = 0
```

8. Create an array of greetings and have greeting’s text change when the button is clicked. To do this, the greeting variable will need to become an instance variable. This is done by changing var greeting to this.greeting. Don’t forget to change greeting to this.greeting everywhere in the code. The visible property of this.greeting will also need to be changed to true.

```
this.updateText = function(){
  var newGreeting = [‘Hello World’, ‘Hi There’, ‘Howdy’, ‘Hello', ‘Hey’]
  this.greeting.text = newGreeting[this.index%newGreeting.length]
  this.greeting.visible = true
```

9. Lastly, the code for the callback function for the button in 5 needs to be added. The value of index will need to increase when the button is clicked and the updateText function needs to be called. In order to have access to this.index and this.updateText inside of the function, make a variable that. Put it inside of the build method on the first line.

```
var that = this
```

```
button.on(‘click’, function(){
  that.index++
  that.updateText()
})
```

It is now ready to test. Open the page in the browser.


### STAGE 4 - Add text that tells how many times the button has been clicked

1. Create the text that will tell users how many times the button has been clicked. A way to keep track of the number of times the button is clicked is needed. The index variable is doing this already, so the name can be changed to this.count or left this.index. If it is changed to this.count, make sure it is changed everywhere. It will need to be hidden when the page loads, and it will also need to be an instance variable so that the updateText function has access to it.

```
this.countText = Gem.Text()
this.countText.visible = false
var box = Gem.Block(‘box’, this.greeting, button, this.countText)
```

Notice that it doesn’t have the label ‘greeting’ so it won’t have any of the greeting style. It also does not need to have any actual text yet since it is hidden.

2. Inside of the updateText function, the countText needs to be updated with the actual count and it needs to be made visible.

```
this.updateText = function(){
  this.countText.text = ‘You have clicked this button ‘ + this.count + ‘ times.’
  this.countText.visible = true
}
```

It is now ready to test. Open the page in the browser.


### STAGE 5 - Add the ability to recognize a change in the count from an external source and update the text appropriately

1. In the plugin tester, add `{countField: 'count'}`.

```
ExtensionTester.Api.Ticket.create().then(function(newOne){
  newOne.subject.count = ’12’ // Sets 12 as the initial value of count in the editor box
  ExtensionTester(HelloWorld, {countField: ‘count’}, {ticketId:newOne.subject._id, showEditor: true})
}).done()
```

2. In the build method, create a variable set to the information in the editor box. If it’s not set in the editor box, then the variable created will be undefined.

```
var countProperty = optionsObservee.subject.countField
```

3. The this.count variable needs to be set to the count that is in the editor box, which is in the information in countProperty and accessible using the folling line:

```
this.count = ticket.subject[countProperty]
```

4. The greeting text and the countText need to be visible when the page is loaded if this.count is already defined. This is done using an if else statement. If this.count is undefined, then both texts are not visible and set this.count to 0; otherwise, call the updateText function. This needs to come before the button event listener.

```
if(this.count == undefined){
  this.greeting.visible = false
  this.countText.visible = false
  this.count = 0
} else{
  this.updateText()
}
```

5. The count in the ticket/editor box needs to be updated every time the button is clicked. So inside of the callback function for the button event listener, set the count, after this.count has been incremented.

```
button.on(‘click’, function(){
  that.count++
  that.updateText()
  ticket.set('count', that.count)
})
```

6. If the count is changed elsewhere, in this case in the editor box, that needs to trigger an update in this.count and in countText. Add the following inside the build method.

```
ticket.get(‘count’).on(‘change’, function(){
  that.count = ticket.subject.count
  that.updateText()
})
```

It is ready to test. Open the page in the browser.

Congratulations. You have just built a plugin.
