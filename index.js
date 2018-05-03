#!/usr/bin/env node

const fs = require('fs')
const mkdirp = require('mkdirp').sync
const path = require('path')

const args = require('arg')({
	'--help': Boolean, 
	'--version': Boolean, 

	'--from': [String], 
	'--to': String, 

	'--level': Number, 
	'--copy': Boolean, 

	'--simulate': Boolean, 

	'-v': '--version', 
	'-h': '--help', 
	'-f': '--from', 
	'-t': '--to', 
	'-l': '--level', 
})

const help = [ "", 
	"usage : ddi --from .. --to .. ", 
	"", 
	"Create a dir dictionary, e.g. file -> F-/FI-/file", 
	"", 
	"--help,-h : print this message", 
	"--version,-v : print the version", 
	"--from,-f [paths] : the entries inside given dirs would be moved into the dictionary", 
	"--to,-t [path] : where to create the dictionary", 
	"--level,-l [level] : how many levels. A-/AB-/ABC-/abcd.txt is considered 4 levels", 
	"--copy : Copy the files, but not move", 
	"--simulate : print what will be done but do nothing", 
	"", ""].join("\n")


if (args['--version'])
{
	process.stdout.write(require('./package.json').version)
	process.exit()
}

if ((args['--help']) || (! args['--from']) || (! args['--to']))
{
	process.stdout.write(help)
	process.exit()
}

const level = Math.floor(args['--level'] || 2)
const from = args['--from']
const to = args['--to']
const copy_files = args['--copy']
const simulate = args['--simulate']

process.stdout.write("Creating a dictionary file bank at " + to + " ... \n")
process.stdout.write("Level is set to " + level + "\n")
process.stdout.write("Will " + (copy_files ? "copy" : "move") + " the files to destination.\n")

for (var j in from)
{
	var src = from[j]
	process.stdout.write("-------------\n")
	process.stdout.write("Adding entries from " + src + "\n")

	var curr_files = fs.readdirSync(src)
	for (var curr_file_i in curr_files)
	{
		var curr_file = curr_files[curr_file_i]
		var curr_from = path.join(src, curr_file)
		var curr_base = path.basename(curr_file, path.extname(curr_file))
		var curr_dst = to
		for (var i = 0; i < level; i++)
		{
			if(curr_base[i] == undefined)
			{
				break
			}
			curr_dst = path.join(curr_dst, curr_base.slice(0, i + 1).toUpperCase() + '-')
		}

		curr_dst = path.join(curr_dst, curr_file)

		process.stdout.write(curr_file + " ---> " + curr_dst + "\n")
		if(! simulate)
		{
			mkdirp(path.dirname(curr_dst))
			if(! copy_files)
			{
				fs.renameSync(curr_from, curr_dst)
			} else {
				fs.copyFileSync(curr_from, curr_dst)
			}
		}
	}
}



