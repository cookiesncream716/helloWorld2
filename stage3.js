registerPlugin(proto(Gem, function(){
	this.name = 'HelloWorld'
	this.build = function(ticket, optionsObservee, api){
		// add that
		var that = this

		this.greeting = Text('greeting', 'Hello World')

		// make greeting invisible and add button
		this.greeting.visible = false
		var button = Button('click me')
		var box = Block('box', this.greeting, button)
		this.add(box)

		// show greeting on click
		this.count = 0
		button.on('click', function(){
			that.count++
			that.updateText()
		})
	}

	// add method for updating text
	this.updateText = function(){
		var newGreeting = ['Hello World', 'Hi There', 'Howdy', 'Hello', 'Hey']
		this.greeting.text = newGreeting[(this.count-1)%newGreeting.length]
		this.greeting.visible = true
	}

	this.getStyle = function(){
		return Style({
			$box: {
				width: 550,
				minHeight: 300,
				border: '1px solid black',
				padding: 10,
				margin: 50
			},
			$greeting: {
				color: 'blue',
				fontSize: 74,
				display: 'block',
				margin: 10,
				textAlign: 'center'
			},

			// style the button
			Button: {
				backgroundColor: 'green',
				color: 'white',
				display: 'block',
				margin: 'auto'
			}
		})
	}
}))