registerPlugin(proto(Gem, function(){
	this.name = 'HelloWorld'
	this.build = function(ticket, optionsObservee, api){
		this.greeting = Text('greeting', 'Hello World')
		var box = Block('box', this.greeting)
		this.add(box)
	}
}))