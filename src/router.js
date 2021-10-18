const { Router } = require('express')
const { processBidAsk, VN30_LIST } = require('./utils')
// const Plotly = require('plotly.js-dist-min')
const { getAllBidAskVolume } = require('./fetchBidAsk')

const router = Router()
const FETCH_INTERVAL = 2000
let globalArr = []

async function fetchBidAskByInterval() {
  setInterval(async () => {
    globalArr = await getAllBidAskVolume()
    const hpg = globalArr.find(({ code }) => code === 'HPG')
    console.log(hpg)
    console.log('ROuter', hpg)
    // console.log(globalArr)
  }, FETCH_INTERVAL)
}

fetchBidAskByInterval()

// router.get('/', (req, res) => {
//   res.send('Hello from server')
// })

router.get('/', (req, res) => {
  res.render('pages/index', {
    hello: 'hihi',
    globalArr,
  })
})

router.get('/get-data', (req, res) => {
  res.send(JSON.stringify(globalArr))
})

// router.post('/bid-ask-pressure', (req, res) => {
//   //   res.send('Hello from server')
//   const newData = processBidAsk(req.body)
//   const { code = '' } = newData
//   if (!VN30_LIST.includes(code)) return
//   const existIndex = globalArr.findIndex((item) => item.code === code)
//   if (existIndex === -1) {
//     globalArr.push(newData)
//   } else {
//     globalArr[existIndex] = newData
//   }
//   //   console.log(req.body)
// })

// export { router }
module.exports = {
  router,
}
