import axios from 'axios'

const TOKEN = 'cdgqjf2ad3i2r375f1pgcdgqjf2ad3i2r375f1q0'

export default axios.create({
  baseURL: 'https://finnhub.io/api/v1',
  params: {
    token: TOKEN
  }
})