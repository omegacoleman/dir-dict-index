const assert = require('assert')
const util = require('util')
const fs = require('fs')
const exec = util.promisify(require('child_process').exec)
const rimraf = util.promisify(require('rimraf'))

describe('ddi', function() {
	it('should run successfully with the given test/src/', async function() {
		await rimraf("test/dst")
		await exec("node index.js -f test/src -t test/dst -l 2 --copy")
	})
	it('should generate the dst/ dir', function() {
		assert(fs.statSync("test/dst").isDirectory())
	})
	it('should generate carnival.txt in dst/C-/CA-/', function() {
		assert(fs.statSync("test/dst/C-/CA-/carnival.txt").isFile())
	})
	it('should generate c.txt in dst/C-, as it does not go thru deepest level', function() {
		assert(fs.statSync("test/dst/C-/c.txt").isFile())
	})
	it('should keep the original file as --copy is present', function() {
		assert(fs.statSync("test/src/c.txt").isFile())
	})
});

