const
    yargs = require('yargs')
    app = require('./app')

const flags = yargs
    .usage('$0: Usage <cmd> [options]')
    .command({
        command: 'search',
        desc: 'search for your pokemon',
        builder: (yargs) => {
            return yargs.options('g', {
              alias: 'gen',
              describe: 'pokemon gen'
            }).option('n', {
              alias: 'name',
              describe: 'find your pokemon'
            })
        },
        handler: (argv) => {
            app.search(argv.gen, argv.name)
        }
    })
    .help('help')
    .argv
