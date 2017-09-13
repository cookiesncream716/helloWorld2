registerPlugin(proto(Gem, function(){
	this.name = 'HelloWorld'
	this.build = function(ticket, optionsObservee, api){
		var that = this

		// access saved ticket data
		var countField = optionsObservee.subject.countField

		this.greeting = Text('greeting', 'Hello World')
		var button = Button('click me')
		this.countText = Text()
		this.countText.visible = false
		var box = Block('box', this.greeting, button, this.countText)
		this.add(box)

		// no text if count undefined and set count to 0 or display greeting and countText
		if(ticket.get(countField).subject === undefined){
			this.greeting.visible = false
			this.countText.visible = false
			ticket.set(optionsObservee.subject.countField, 0)
		} else {
			this.updateText(ticket.get(countField).subject)
		}

		// save and increment count
		button.on('click', function(){
			ticket.set(optionsObservee.subject.countField, ticket.get(countField).subject+1)
		})

		// updates count and text when count changed anywhere
		ticket.get(optionsObservee.subject.countField).on('change', function(){
			that.updateText(ticket.get(countField).subject)
		})
	}

	// add parameter for updateText and use it
	this.updateText = function(count){
		var newGreeting = ['Hello World', 'Hi There', 'Howdy', 'Hello', 'Hey']
		this.greeting.text = newGreeting[(count -1)%newGreeting.length]
		this.greeting.visible = true
		this.countText.text = 'You have clicked this button ' + count + ' times.'
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