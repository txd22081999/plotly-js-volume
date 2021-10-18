const axios = require('axios')
const { VN30_LIST } = require('./utils')

const URL = 'https://gateway-iboard.ssi.com.vn/graphql'

const SYMBOLS_WITH_NO = [
  {
    stockNo: 'hose:436',
    symbol: 'ACB',
  },
  {
    stockNo: 'hose:217',
    symbol: 'BID',
  },
  {
    stockNo: 'hose:209',
    symbol: 'BVH',
  },
  {
    stockNo: 'hose:580',
    symbol: 'CTG',
  },
  {
    stockNo: 'hose:974',
    symbol: 'FPT',
  },
  {
    stockNo: 'hose:1152',
    symbol: 'GAS',
  },
  {
    stockNo: 'hose:233',
    symbol: 'GVR',
  },
  {
    stockNo: 'hose:1386',
    symbol: 'HDB',
  },
  {
    stockNo: 'hose:1354',
    symbol: 'HPG',
  },
  {
    stockNo: 'hose:1734',
    symbol: 'KDH',
  },
  {
    stockNo: 'hose:2027',
    symbol: 'MBB',
  },
  {
    stockNo: 'hose:2024',
    symbol: 'MSN',
  },
  {
    stockNo: 'hose:2028',
    symbol: 'MWG',
  },
  {
    stockNo: 'hose:2200',
    symbol: 'NVL',
  },
  {
    stockNo: 'hose:2567',
    symbol: 'PDR',
  },
  {
    stockNo: 'hose:2576',
    symbol: 'PLX',
  },
  {
    stockNo: 'hose:2557',
    symbol: 'PNJ',
  },
  {
    stockNo: 'hose:66',
    symbol: 'POW',
  },
  {
    stockNo: 'hose:2947',
    symbol: 'SAB',
  },
  {
    stockNo: 'hose:2920',
    symbol: 'SSI',
  },
  {
    stockNo: 'hose:2908',
    symbol: 'STB',
  },
  {
    stockNo: 'hose:32',
    symbol: 'TCB',
  },
  {
    stockNo: 'hose:25',
    symbol: 'TPB',
  },
  {
    stockNo: 'hose:3825',
    symbol: 'VCB',
  },
  {
    stockNo: 'hose:29',
    symbol: 'VHM',
  },
  {
    stockNo: 'hose:3813',
    symbol: 'VIC',
  },
  {
    stockNo: 'hose:3847',
    symbol: 'VJC',
  },
  {
    stockNo: 'hose:3801',
    symbol: 'VNM',
  },
  {
    stockNo: 'hose:3852',
    symbol: 'VPB',
  },
  {
    stockNo: 'hose:3854',
    symbol: 'VRE',
  },
]

function getStockNo(code) {
  return SYMBOLS_WITH_NO.find(({ symbol }) => symbol === code).stockNo
}

async function getBidAskTotal(stockNo) {
  const { data } = await axios.post(URL, {
    operationName: 'stockRealtime',
    variables: {
      //   stockNo: 'hose:217',
      stockNo,
    },
    query:
      'query stockRealtime($stockNo: String) {\n  stockRealtime(stockNo: $stockNo) {\n    stockNo\n    ceiling\n    floor\n    refPrice\n    stockSymbol\n    best1Bid\n    best1BidVol\n    best2Bid\n    best2BidVol\n    best3Bid\n    best3BidVol\n    best4Bid\n    best4BidVol\n    best5Bid\n    best5BidVol\n    best6Bid\n    best6BidVol\n    best7Bid\n    best7BidVol\n    best8Bid\n    best8BidVol\n    best9Bid\n    best9BidVol\n    best10Bid\n    best10BidVol\n    best1Offer\n    best1OfferVol\n    best2Offer\n    best2OfferVol\n    best3Offer\n    best3OfferVol\n    best4Offer\n    best4OfferVol\n    best5Offer\n    best5OfferVol\n    best6Offer\n    best6OfferVol\n    best7Offer\n    best7OfferVol\n    best8Offer\n    best8OfferVol\n    best9Offer\n    best9OfferVol\n    best10Offer\n    best10OfferVol\n    session\n    __typename\n  }\n}\n',
  })

  const {
    data: {
      stockRealtime: {
        stockSymbol,
        best1BidVol,
        best2BidVol,
        best3BidVol,
        best1OfferVol,
        best2OfferVol,
        best3OfferVol,
        __typename: type,
      },
    },
  } = data

  const totalBid = best1BidVol + best2BidVol + best3BidVol
  const totalAsk = best1OfferVol + best2OfferVol + best3OfferVol

  const result = {
    code: stockSymbol,
    totalBid,
    totalAsk,
  }

  return result
}

async function getAllBidAskVolume() {
  //   for (const code in VN30_LIST) {
  const getBidAskTotalPromises = VN30_LIST.map((code) => {
    const stockNo = getStockNo(code)
    return getBidAskTotal(stockNo)
  })

  const results = await Promise.all(getBidAskTotalPromises)
  return results
}

module.exports = {
  getAllBidAskVolume,
}
