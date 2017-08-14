Creating a plugin isn't difficult. Here you will build a basic Hello World plugin in 4 stages, each building on the previous stage.

* Stage 1 - Display the text “Hello World” in the plugin space
* Stage 2 - Display “Hello World” after the button is clicked
* Stage 3 - Add text that tells how many times the button has been clicked
* Stage 4 - Add the ability to recognize a change in the count from an external source 

First, create a project folder and inside of it create a file called package.json. This plugin will need just two node modules, gem and proto. In the terminal go into the project folder and install the two gems. This will add the gems to the package.json file and create a node modules folder with the gems inside of it.

```
npm install gem —save
npm install proto —save
```

It will be easiest to work on the plugin from here on in a text editor, such as Sublime or Atom. Create an html file and open it. The code for the plugin will go after the body tags. Use script tags to link to the location of the gem and proto node modules. In order to run and test the plugin, a script tag with a link to the plugin tester is also necessary. It should look something like this:

	<html>
	  <head></head>
	  <body></body>
	  <script src=“node_modules/proto/dist/proto.umd.js"></script>
	  <script src=“node_modules/gem/dist/Gem.umd.js”></script>
	  <script src=“https://tixit.me/ExtensionTester.umd.js”></script>
	  <script>
	  </script>
	</html>

The rest of the code to build the plugin will go inside the last set of script tags. Inside that set of script tags, create a variable for the plugin. Usually the variable will a one or two word description of the plugin.

```
var HelloWorld = proto(Gem, function(superclass){}
```

The plugin, or Gem, takes a name property, which should be the name of the plugin. It also has a constructor method called build which has three parameters, ticket, optionsObservee, and api.

```
var HelloWorld = proto(Gem, function(superclass){
  this.name = ‘HelloWorld’
  this.build = function(ticket, optionsObservee, api){}
})
```

The code for the plugin tester will come after the plugin but still inside of the script tags.

```
ExtensionTester.Api.Ticket.create().then(function(newOne){
  ExtensionTester(HelloWorld, {}, {ticketId: newOne.subject._id, showEditor: true})
}).done()
```

Now it is time to start on the 4 stages.


### STAGE 1 - Display the text "Hello World" in the plugin space

* Inside of the build method, create the greeting Hello World by using the Text property of Gem. Here, it will have a label of greeting so it can be styled differently from the text that will be coming up in a later step.

```
var greeting = Gem.Text(‘greeting’, ‘Hello World’)
```
* Make an area for the plugin; it is basically a div so use the Block property. It will be given a label of box and the greeting needs to be added to the Block.

```
var box = Gem.Block(‘box’, greeting)
```

* Then the box can be added.

```
this.add(box)
```

* Style can be added after the build method by using the getStyle method. It is a function that will return a Style object. The symbol $ will be used along with the labels. Here a border is given so an outline of the space can be seen. The text for the greeting will be blue and larger than the default size.

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


### STAGE 2 - Display "Hello World" after the button is clicked

* Since the greeting is not supposed to appear until after the button is clicked, it needs to be made invisible. This is done by giving the visible property a value of false.

```
greeting.visible = false
```

* A button needs to be created using the Button property. Since there is only one button, it does not need a label to distinguish it from other buttons.

```
var button = Gem.Button('click me')
```

* Then add it to box.

```
var box = Gem.Block(‘box’, greeting, button)
```

* Give the button some style if desired. It can just be added after the $greeting. Just be sure to separate it with a comma.

```
Button: {
  backgroundColor: ‘green’,
  color: ‘white’,
  display: 'block',
  margin: 10
}
```

* Put an EventEmitter on the button so when it is clicked the greeting will appear. The code for what happens when the button is clicked will go inside the callback function.

```
button.on('click', function(){
	code
})
```

* To make things a little more interesting, have the greeting “Hello World” change to a different greeting each time the button is clicked. To do this, make a function that will update the text. It will go outside of the build method.

```
this.updateText = function(){}
```

* Before writing the code inside the function, create a variable to iterate through the greetings. Create it inside the build method but make it an instance variable so it is accessible outside of the build method.

```
this.index = 0
```

* Create an array of greetings and have greeting’s text change when the button is clicked. To do this, the var greeting will need to become an instance variable. This is done by changing var greeting to this.greeting. Don’t forget to change greeting to this.greeting everywhere in the code. The visible property of this.greeting will also need to be changed to true.

```
this.updateText = function(){
  var newGreeting = [‘Hello World’, ‘Hi There’, ‘Howdy’, ‘Hello', ‘Hey’]
  this.greeting.text = newGreeting[this.index%newGreeting.length]
  this.greeting.visible = true
```

* Lastly, the code for the EventEmitter needs to be added. The value of index will need to increase when the button is clicked and the updateText function needs to be called. In order to have access to this.index and this.updateText inside of the function, make a variable that. Put it inside of the build method and it is usually the first line.

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