export const BASE_URL1 = 'http://codercba.com:5000'
export const TIME_OUT1 = 10000

// 1.区分环境变量方式一:
// export const API_BASE_URL = 'https://coderwhy/org/dev'
// export const API_BASE_URL = 'https://coderwhy/org/prod'

// 2.区分环境变量方式二:
// let baseURL = ''
// if (process.env.NODE_ENV === 'production') {
//   baseURL = 'https://coderwhy/org/prod'
// } else if (process.env.NODE_ENV === 'development') {
//   baseURL = 'https://coderwhy/org/dev'
// } else {
//   baseURL = 'https://coderwhy/org/test'
// }

// 3.区分环境变量方式三: 加载.env文件
// export const API_BASE_URL = process.env.VUE_APP_BASE_URL

// export const TIME_OUT = 10000
