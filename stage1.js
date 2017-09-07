registerPlugin(proto(Gem, function(){
	this.name = 'HelloWorld'
	this.build = function(ticket, optionsObservee, api){
		this.add(Text('It works!'))
	}
}))