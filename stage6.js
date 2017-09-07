// add flatpickr
var flatpickr = require('flatpickr')

registerPlugin(proto(Gem, function(){
	this.name = 'HelloWorld'
	this.build = function(ticket, optionsObservee, api){
		var that = this

		var countProperty = optionsObservee.subject.countField

		this.greeting = Text('greeting', 'Hello World')
		var button = Button('click me')
		this.countText = Text()
		this.countText.visible = false

		// create and add calendar
		var calendar = TextField()
		var fp_calendar = new flatpickr(calendar.domNode, {
			enableTime: true,
			dateFormat:'m-d-Y h:i K',
			defaultDate: new Date()
		})
		var box = Block('box', this.greeting, button, this.countText, calendar)
		this.add(box)

		if(ticket.get(countProperty).subject === undefined){
			this.greeting.visible = false
			this.countText.visible = false
			ticket.set('count', 0)
		} else {
			this.updateText(ticket.get(countProperty).subject)
		}

		button.on('click', function(){
			ticket.set('count', ticket.get(countProperty).subject+1)
		})

		ticket.get('count').on('change', function(){
			that.updateText(ticket.get(countProperty).subject)
		})

		// stylesheet for flatpick
		this.on('attach', function(){
			var flatpickrStylesheet = require('raw-loader!flatpickr/dist/flatpickr.min.css')
			var style = document.createElement('style')
			style.innerHTML = flatpickrStylesheet
			document.head.appendChild(style)
		})		
	}

	this.updateText = function(num){
		var newGreeting = ['Hello World', 'Hi There', 'Howdy', 'Hello', 'Hey']
		this.greeting.text = newGreeting[(num -1)%newGreeting.length]
		this.greeting.visible = true
		this.countText.text = 'You have clicked this button ' + num + ' times.'
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
			},
			TextField: {
				display: 'block',
				margin: 'auto',
				marginTop: 30
			}
		})
	}
}))