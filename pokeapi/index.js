const config = require('./config')

const superagent = require('superagent')

const _fetch = command => {
	return superagent.get(`${config.url}/${command}`)
				.then(reponse => reponse.body)
}

exports.find = gen => {
	//generation of the pokemon
	return _fetch(`generation/${gen}`)
}

exports.look = name => {
	return _fetch(`pokemon/${name}`)
}

