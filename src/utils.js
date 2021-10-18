const VN30_LIST = [
  'ACB',
  'BID',
  'BVH',
  'CTG',
  'FPT',
  'GAS',
  'GVR',
  'HDB',
  'HPG',
  'KDH',
  'MBB',
  'MSN',
  'MWG',
  'NVL',
  'PDR',
  'PLX',
  'PNJ',
  'POW',
  'SAB',
  'SSI',
  'STB',
  'TCB',
  'TPB',
  'VCB',
  'VHM',
  'VIC',
  'VJC',
  'VNM',
  'VPB',
  'VRE',
]

let globalDps = []

function parseDatapoint(raw) {
  // f = lambda x: -1 if x == "ATC" else int(x) if len(x) > 0 else 0
  // ff = lambda x: -1 if x == "ATC" else float(x) if len(x) > 0 else 0.0
  f = (x) => {
    if (x === 'ATC') return -1
    else if (x.length > 0) return parseInt(x)
    else return 0
  }
  ff = (x) => {
    if (x === 'ATC') return -1
    else if (x.length > 0) return parseFloat(x)
    else return 0.0
  }
  try {
    const data = raw['data']['response']['payloadData'].split('|')
    // console.log(data)
    const dp = {
      timestamp2: raw['data']['timestamp'],
      timestamp: raw['timestamp'],
      // "time": dt.fromtimestamp(raw["timestamp"] / 1000).strftime("%X"),
      time: new Date(raw['timestamp']).toString(),
      hoseId: data[0],
      code: data[1],
      bestBid1: f(data[2]),
      bestBid1Volume: f(data[3]),
      bestBid2: f(data[4]),
      bestBid2Volume: f(data[5]),
      bestBid3: f(data[6]),
      bestBid3Volume: f(data[7]),
      bestOffer1: f(data[22]),
      bestOffer1Volume: f(data[23]),
      bestOffer2: f(data[24]),
      bestOffer2Volume: f(data[25]),
      bestOffer3: f(data[26]),
      bestOffer3Volume: f(data[27]),
      last: f(data[42]),
      matchingVolume: f(data[43]) * 10,
      averageMatchPrice: ff(data[47]),
      change: f(data[52]),
      changePercentage: ff(data[53]),
      totalMatchVolume: f(data[54]),
      totalMatchValue: ff(data[55]),
      refPrice: data[61],
      session: data[-14],
      openPrice: data[75],
    }

    return dp
  } catch (error) {
    console.log(error)
    return null
  }
}

function processBidAsk(body) {
  // console.log(body);
  const dp = parseDatapoint(body)
  const {
    code,
    timestamp,
    bestBid1Volume,
    bestBid2Volume,
    bestBid3Volume,
    bestOffer1Volume,
    bestOffer2Volume,
    bestOffer3Volume,
  } = dp
  const bidTotal = bestBid1Volume + bestBid2Volume + bestBid3Volume
  const askTotal = bestOffer1Volume + bestOffer2Volume + bestOffer3Volume
  const result = {
    code,
    bidTotal,
    askTotal,
    timestamp,
  }

  console.log(result)
  return result
}

module.exports = {
  parseDatapoint,
  processBidAsk,
  VN30_LIST,
}
