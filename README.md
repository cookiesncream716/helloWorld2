Creating a plugin isn't difficult. Here you will build a basic Hello World plugin in 4 stages, each building on the previous stage.

* Stage 1 - Display the text “Hello World” in the plugin space
* Stage 2 - Display “Hello World” after the button is clicked
* Stage 3 - Add text that tells how many times the button has been clicked
* Stage 4 - Add the ability to recognize a change in the count from an external source 

First, create a project folder and inside of it create a file called package.json. This plugin will need just two node modules, gem and proto. In the terminal go into the project folder and install the two gems. This will add the gems to the package.json file and create a node modules folder with the gems inside of it.

	npm install gem —save
	npm install proto —save

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

	var HelloWorld = proto(Gem, function(superclass){}

The plugin, or Gem, takes a name property, which should be the name of the plugin. It also has a constructor method called build which has three parameters, ticket, optionsObservee, and api.

	var HelloWorld = proto(Gem, function(superclass){
	  this.name = ‘HelloWorld’
	  this.build = function(ticket, optionsObservee, api){}
	})

The code for the plugin tester will come after the plugin but still inside of the script tags.

	ExtensionTester.Api.Ticket.create().then(function(newOne){
	  ExtensionTester(HelloWorld, {}, {ticketId: newOne.subject._id, showEditor:
	    true})
	}).done()

Now it is time to start on the 4 stages.


###### **STAGE 1** - Display the text "Hello World" in the plugin space

* Inside of the build method, create the greeting Hello World by using the Text property of Gem. Here, it will have a label of greeting so it can be styled differently from the text that will be coming up in a later step.

```
var greeting = Gem.Text(‘greeting’, ‘Hello World’)
```
* Make an area for the plugin; it is basically a div so use the Block property. It will be given a label of box and the greeting needs to be added to the Block.

```
var box = Gem.Block(‘box’, greeting)
```