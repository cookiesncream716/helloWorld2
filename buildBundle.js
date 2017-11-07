var build = require('build-modules')
var emitter = build(__dirname + '/stage6.js', {output: {path: __dirname, minify:false}})
emitter.on('done', function() {
   console.log("Done!")
})
emitter.on('error', function(e) {
	console.log('error')
   console.log(e)
})
emitter.on('warning', function(w) {
	console.log('warning')
   console.log(w)
})