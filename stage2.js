registerPlugin(proto(Gem, function(){
	this.name = 'HelloWorld'
	this.build = function(ticket, optionsObservee, api){

		// create and add greeting
		this.greeting = Text('greeting', 'Hello World')
		var box = Block('box', this.greeting)
		this.add(box)
	}

	// add style
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
}))