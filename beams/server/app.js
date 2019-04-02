const domain = require("./domain")
const express = require('express')
const app = express()
const port = 5000
var token = null

const getToken = async () => {
    if (!token) {
        token = await domain.getAccessToken("client_be2ab801ecb44fce8c876a3e90561be9", "secret_1bc0240f29867097dfd68d770ba92cba")
    }
}

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/suburb/:suburb/:state', async (req, res) =>
{
    await getToken()
    const suburbInfo = await domain.getSuburbId(token, req.params.suburb, req.params.state)
    res.json(suburbInfo)
})

app.get('/AgeGroupOfPopulation/:suburb/:state', async (req, res) =>
{
    await getToken()
    const suburbInfo = await domain.getSuburbId(token, req.params.suburb, req.params.state)
    console.log("Suburb Info Age Group", suburbInfo)
    const result = await domain.getDemographics(token, suburbInfo[0].ids[0].id, "AgeGroupOfPopulation")

    res.json(result)
})

app.get('/MaritalStatus/:suburb/:state', async (req, res) =>
{
    await getToken()
    const suburbInfo = await domain.getSuburbId(token, req.params.suburb, req.params.state)
    const result = await domain.getDemographics(token, suburbInfo[0].ids[0].id, "MaritalStatus")
    console.log("Marital Results app.js", result);
    res.json(result)
})

app.get('/CountryOfBirth/:suburb/:state', async (req, res) =>
{
    await getToken()
    const suburbInfo = await domain.getSuburbId(token, req.params.suburb, req.params.state)
    const result = await domain.getDemographics(token, suburbInfo[0].ids[0].id, "CountryOfBirth")
    console.log("CountryOfBirth Results app.js", result);
    res.json(result)
})

app.get('/Coords/:lat/:lng', async (req, res) =>
{
    await getToken();
    const result = await domain.getSchools(token, req.params.lat, req.params.lng);
    res.json(result);
})


app.listen(port, () => console.log(`App listening on port ${port}!`))

// If editting files in server folder, make sure to restart server by running node app.js