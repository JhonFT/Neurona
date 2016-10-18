var app = angular.module("app", []);

app.controller('getLetter', ['$scope','$http','$timeout', ($scope, $http, $timeout) => {

	$scope.resizeCajas = ()=>{
		const $caja  = angular.element('#body-container .caja')
		$caja.height($caja.css('width'))
	} 

	$scope.letter = [
		{id_posicion:1,e1:0,e2:0,e3:0,e4:0,e5:0,e6:0,e7:0,e8:0,e9:0},
		{id_posicion:2,e1:0,e2:0,e3:0,e4:0,e5:0,e6:0,e7:0,e8:0,e9:0},
		{id_posicion:3,e1:0,e2:0,e3:0,e4:0,e5:0,e6:0,e7:0,e8:0,e9:0},
		{id_posicion:4,e1:0,e2:0,e3:0,e4:0,e5:0,e6:0,e7:0,e8:0,e9:0},
		{id_posicion:5,e1:0,e2:0,e3:0,e4:0,e5:0,e6:0,e7:0,e8:0,e9:0},
		{id_posicion:6,e1:0,e2:0,e3:0,e4:0,e5:0,e6:0,e7:0,e8:0,e9:0},
		{id_posicion:7,e1:0,e2:0,e3:0,e4:0,e5:0,e6:0,e7:0,e8:0,e9:0},
		{id_posicion:8,e1:0,e2:0,e3:0,e4:0,e5:0,e6:0,e7:0,e8:0,e9:0},
		{id_posicion:9,e1:0,e2:0,e3:0,e4:0,e5:0,e6:0,e7:0,e8:0,e9:0},
	]

	$http
		.get('http://localhost:1111/weight')
		.success((data) => {
			$scope.weight = data
		})
		.error((data, status) => {

		})
		.finally(() => {

		})
	
	$http
		.get('http://localhost:1111/letters')
		.success(function(data) {
			$scope.letter = []
			$scope.letters = data
        	data[0].val.map((v) => {if(v.objeto === 1) {$scope.letter.push(v)} })
        	
	    })
	    .error(function(data, status) {
	        // Handle HTTP error
		})
	    .finally(function() {
			$timeout(()=>{$scope.resizeCajas()},0)
		})


	 $scope.changeLetter =  (id) => {
	 	$scope.letter = [];	
        $scope.letters[id-1].val.map((v) => {if(v.objeto === 1) {$scope.letter.push(v)} })
	 }

	 $scope.table = (x,y) => {
	 	var val
	 	x === parseInt(y) ? val  = 0 : val = 1 
	 	return val
	 }

	$scope.changevalue = (element,param) =>{
		$scope.letter.map((v)=>{
			if(v === element){
				element[param] > 0 ? element[param] = 0 : element[param] = 1 
				element.salida = $scope.table(element.e1,element.e2) 
				element.salida = $scope.table(element.salida,element.e3)
				element.salida = $scope.table(element.salida,element.e4) 
				element.salida = $scope.table(element.salida,element.e5) 
				element.salida = $scope.table(element.salida,element.e6) 
				element.salida = $scope.table(element.salida,element.e7) 
				element.salida = $scope.table(element.salida,element.e8) 
				element.salida = $scope.table(element.salida,element.e9) 
				element.salida < 1 ? element.salida = -1 : element.salida = 1
			}
		})
	}
	$scope.save = () =>{
		$http.
			post('http://localhost:1111/letter/new',$scope.letter).
			success((data)=>{})
	}


	$scope.changeWeight = () =>{
		$http.
			post('http://localhost:1111/weight/change',$scope.weight).
			success((data)=>{})
	}

	$scope.comparar =  () =>{
		var i = 0;
		var salida = [];
		while(i < $scope.letter.length){
			y = ($scope.letter[i].e1 * $scope.weight[i].p1) +
				($scope.letter[i].e2 * $scope.weight[i].p2) +
				($scope.letter[i].e3 * $scope.weight[i].p3) +
				($scope.letter[i].e4 * $scope.weight[i].p4) +
				($scope.letter[i].e5 * $scope.weight[i].p5) +
				($scope.letter[i].e6 * $scope.weight[i].p6) +
				($scope.letter[i].e7 * $scope.weight[i].p7) +
				($scope.letter[i].e8 * $scope.weight[i].p8) +
				($scope.letter[i].e9 * $scope.weight[i].p9)

			y >= $scope.weight[i].umbral ? y = 1 : y = -1
			salida.push(y)
			i++;
		}

		var posibles = []
		angular.forEach($scope.letters,(value,key)=>{
			var count = 0;
			angular.forEach(value.val,(val,key)=>{
				if(parseInt(val.salida) === salida[key] ) count ++;
			})	
			if(count>0){
				posibles.push({el:value,por:count})
			}
		})

		 
		var maxid = 0;
		$scope.selectLetter;
		posibles.map(function(obj){     
    		if (obj.por > maxid) {
    			maxid = obj.por
    			$scope.selectLetter = obj.el.val[0].id_letra
    		}    
		});
		//console.log(posibles)
	}

	$scope.aprender = () =>{
		n = 0
		while(n < $scope.letters.length){
			var cambio = false;
			$scope.letra = $scope.letters[n].val
			var i = 1,
			y = 0,
			count = 0 
			while(i < $scope.letra.length && count < 100){
				y = ($scope.letra[i].e1 * $scope.weight[i].p1) +
					($scope.letra[i].e2 * $scope.weight[i].p2) +
					($scope.letra[i].e3 * $scope.weight[i].p3) +
					($scope.letra[i].e4 * $scope.weight[i].p4) +
					($scope.letra[i].e5 * $scope.weight[i].p5) +
					($scope.letra[i].e6 * $scope.weight[i].p6) +
					($scope.letra[i].e7 * $scope.weight[i].p7) +
					($scope.letra[i].e8 * $scope.weight[i].p8) +
					($scope.letra[i].e9 * $scope.weight[i].p9)

				y >= $scope.weight[i].umbral ? y = 1 : y = -1


				console.log("Fila"+ i +": \n Entrada[" + 
							+$scope.letra[i].e1+","
							+$scope.letra[i].e2+","
							+$scope.letra[i].e3+","
							+$scope.letra[i].e4+","
							+$scope.letra[i].e5+","
							+$scope.letra[i].e6+","
							+$scope.letra[i].e7+","
							+$scope.letra[i].e8+","
							+$scope.letra[i].e9+"]) Valor esperado[" +
							+$scope.letra[i].salida+"] Salida[" + y + "]")


				if(y === parseInt($scope.letra[i].salida)){
					i++
				}else{
					cambio = true;
					$scope.weight[i].p1 = $scope.weight[i].p1 + 2 * (0.5) * $scope.letra[i].salida * $scope.letra[i].e1
					$scope.weight[i].p2 = $scope.weight[i].p2 + 2 * (0.5) * $scope.letra[i].salida * $scope.letra[i].e2
					$scope.weight[i].p3 = $scope.weight[i].p3 + 2 * (0.5) * $scope.letra[i].salida * $scope.letra[i].e3
					$scope.weight[i].p4 = $scope.weight[i].p4 + 2 * (0.5) * $scope.letra[i].salida * $scope.letra[i].e4
					$scope.weight[i].p5 = $scope.weight[i].p5 + 2 * (0.5) * $scope.letra[i].salida * $scope.letra[i].e5
					$scope.weight[i].p6 = $scope.weight[i].p6 + 2 * (0.5) * $scope.letra[i].salida * $scope.letra[i].e6
					$scope.weight[i].p7 = $scope.weight[i].p7 + 2 * (0.5) * $scope.letra[i].salida * $scope.letra[i].e7
					$scope.weight[i].p8 = $scope.weight[i].p8 + 2 * (0.5) * $scope.letra[i].salida * $scope.letra[i].e8
					$scope.weight[i].p9 = $scope.weight[i].p9 + 2 * (0.5) * $scope.letra[i].salida * $scope.letra[i].e9
					$scope.weight[i].umbral = $scope.weight[i].umbral + 2 * (0.5) * $scope.letra[i].salida * (-1)

	                console.log("\nAjuste de pesos filas "+i+" (" + count  + "):");
	                console.log("w1: " + $scope.weight[i].p1);
	                console.log("w2: " + $scope.weight[i].p2);
	                console.log("w3: " + $scope.weight[i].p3);
	                console.log("w4: " + $scope.weight[i].p4);
	                console.log("w5: " + $scope.weight[i].p5);
	                console.log("w6: " + $scope.weight[i].p6);
	                console.log("w7: " + $scope.weight[i].p7);
	                console.log("w8: " + $scope.weight[i].p8);
	                console.log("w9: " + $scope.weight[i].p9);

	                console.log("θ: " + $scope.weight[i].umbral + "\n");
	                count ++;
	                i = 0;
				}
			}
			cambio ? n = 0 : n++
		}	
		
		$scope.weight = $scope.weight;
		$scope.changeWeight();
	}



	$(window).resize(()=>{
		$scope.resizeCajas()
	})
}])