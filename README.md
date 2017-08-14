Creating a plugin isn't difficult. Here you will build a basic Hello World plugin in 4 stages, each building on the previous stage.

* Stage 1 - Display the text “Hello World” in the plugin space
* Stage 2
* Stage 3
* Stage 4

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