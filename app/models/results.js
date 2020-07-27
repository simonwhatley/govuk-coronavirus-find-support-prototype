'use strict'

const path = require('path')
const fs = require('fs')
const yaml = require('js-yaml')

const directoryPath = path.join(__dirname, '../data/')
const content = yaml.safeLoad(fs.readFileSync(directoryPath + 'results.yaml', 'utf8'))

exports.find = () => {
  return content.en.results_link
}
