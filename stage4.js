registerPlugin(proto(Gem, function(){
	this.name = 'HelloWorld'
	this.build = function(ticket, optionsObservee, api){
		var that = this
		this.greeting = Text('greeting', 'Hello World')
		this.greeting.visible = false
		var button = Button('click me')

		// create text to tell number of times button clicked, make it invisible, and add it
		this.countText = Text()
		this.countText.visible = false
		var box = Block('box', this.greeting, button, this.countText)
		this.add(box)

		this.count = 0
		button.on('click', function(){
			that.count++
			that.updateText()

			// save count to the ticket and update the editor box
			ticket.set(optionsObservee.subject.countField, that.count)
		})
	}

	this.updateText = function(){
		var newGreeting = ['Hello World', 'Hi There', 'Howdy', 'Hello', 'Hey']
		this.greeting.text = newGreeting[this.count%newGreeting.length]
		this.greeting.visible = true

		// show number of times button clicked
		this.countText.text = 'You have clicked this button ' + this.count + ' times.'
		this.countText.visible = true
	}

	this.getStyle = function(){
		return Style({
			$box: {
				width: 550,
				minHeight: 300,
				border: '1px solid black',
				padding: 10,
				margin: 50,
				textAlign: 'center'
			},
			$greeting: {
				color: 'blue',
				fontSize: 74,
				display: 'block',
				margin: 10,
				textAlign: 'center'
			},
			Button: {
				backgroundColor: 'green',
				color: 'white',
				display: 'block',
				margin: 'auto',
				marginBottom: 30
			}
		})
	}
}))