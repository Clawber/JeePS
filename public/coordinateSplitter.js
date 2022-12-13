//splits a polyline into even segments
//input :  list of lat-long , granularity (distance per slice)
//output: list of coordinates that correspond to split intervals

// import {ikotRoutePoints, ikotEveningRoutePoints, tokiRoutePoints, } from './jeepRoutes.js'

function get_distance(point1, point2) {
  var a = point1[0] - point2[0]
  var b = point1[1] - point2[1]

  var c = Math.sqrt(a*a + b*b)
  return c
}

// function draw_in_the_middle()
console.log(get_distance([5,5], [11,13]));