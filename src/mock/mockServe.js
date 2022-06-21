import Mock from 'mockjs'
import banner from './banner.json'
import flor from './flor.json'
Mock.mock('/mock/banner', { code: 200, data: banner })
Mock.mock('/mock/flor', { code: 200, data: flor })
