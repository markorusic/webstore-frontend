import axios from 'axios'
import { env } from '../config/env'

export const http = axios.create({
  baseURL: env.API_BASE_URL
})
