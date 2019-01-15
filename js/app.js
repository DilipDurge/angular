var mainApp = angular.module('angularShortestPath', []);

mainApp.controller("graphController", function($scope){
	Graph();
	var ver = JSON.stringify(vertices,null,4);
	$scope.graph = ver;
	$scope.calculate = function() {
		$scope.paths = $scope.startLocation+" -->> "+$scope.endLocation;
		$scope.shortestRoute = shortestPath($scope.startLocation, $scope.endLocation);
		$scope.totalDistance = total;
	}

function PriorityQueue () {
  this._nodes = [];

  this.enqueue = function (priority, key) {
    this._nodes.push({key: key, priority: priority });
    this.sort();
  };
  this.dequeue = function () {
    return this._nodes.shift().key;
  };
  this.sort = function () {
    this._nodes.sort(function (a, b) {
      return a.priority - b.priority;
    });
  };
  this.isEmpty = function () {
    return !this._nodes.length;
  };
}

function totalDistance(totalDist) {
	var t = totalDist;
	console.log("t : ",t);
	return t;
}

function Graph(){
  var INFINITY = 1/0;
  this.vertices = {};
  this.total;	
  this.addVertex = function(name, edges){
    this.vertices[name] = edges;
  };
				
  this.shortestPath = function (start, finish) {
    var nodes = new PriorityQueue(),
        distances = {},
        previous = {},
        path = [],
        smallest, vertex, neighbor, alt;

    for(vertex in this.vertices) {
      if(vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(0, vertex);
      }
      else {
        distances[vertex] = INFINITY;
        nodes.enqueue(INFINITY, vertex);
      }

      previous[vertex] = null;
    }

    while(!nodes.isEmpty()) {
      smallest = nodes.dequeue();
	  
      if(smallest === finish) {
        path = [];
        while(previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }

        break;
      }

      if(!smallest || distances[smallest] === INFINITY){
        continue;
      }

      for(neighbor in this.vertices[smallest]) {
        alt = distances[smallest] + this.vertices[smallest][neighbor];
		  
        if(alt < distances[neighbor]) {
          distances[neighbor] = alt;
          previous[neighbor] = smallest;
          nodes.enqueue(alt, neighbor);
        }
      }
    }
	path.push(start);
	var paths = path.reverse();
	total = 0;
	for(var i = 0; i < path.length; i++){
	  
	  if (path[i+1] != undefined) {
		  total = total + this.vertices[path[i]][path[i+1]];	
	  }
	}
	return path;
  };
  
	this.addVertex('A', {B: 3, C: 1, D: 4});
	this.addVertex('B', {H: 2, E: 3});
	this.addVertex('C', {F: 1});
	this.addVertex('D', {L: 4, M: 5});
	this.addVertex('E', {I: 2});
	this.addVertex('F', {J: 4, K:6});
	this.addVertex('G', {Z: 5});
	this.addVertex('H', {G: 3});
	this.addVertex('I', {Z: 3, J: 8});
	this.addVertex('J', {R: 3});
	this.addVertex('L', {T: 4});
	this.addVertex('N', {T: 3});
	this.addVertex('O', {U: 8, S: 6});
	this.addVertex('P', {U: 3, R: 4});
	this.addVertex('Q', {X: 5, Y: 9});
	this.addVertex('S', {T: 8});
	this.addVertex('Y', {Z: 9});
	}
});