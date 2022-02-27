function defaultTask(cb) {
    const HLTV = require('hltv-api').default
    const express = require('express')
    const app = express()

    app.get('/results', async (req, res) => {
        const results = await HLTV.getResults()
        res.json(results)
    })
    console.log(132123);
    cb();
}

exports.default = defaultTask