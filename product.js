var request = new XMLHttpRequest()
request.open('GET', 'https://web-apiassignment.herokuapp.com/product', true)
request.onload = function() {
	var data = JSON.parse(this.response)
	data = JSON.stringify(data, 'name')
	data = JSON.parse(data)
	if(request.status >= 200 && request.status < 400) {
		for(i=0; i < data.products.length; i++){
			var app = document.getElementById('itemlist')
			var card = document.createElement('div')
			card.setAttribute('class', 'card')

			var nameinput = document.createElement('input')
			nameinput.setAttribute("id", "edtname" + data.products[i].request.url)
			nameinput.value = data.products[i].name
			nameinput.type = "text"
			var text2 = document.createTextNode(data.products[i].name)
			nameinput.appendChild(text2)

			var priceinput = document.createElement('input')
			priceinput.setAttribute("id", "edtprice" + data.products[i].request.url)
			priceinput.value = data.products[i].price
			priceinput.type = "text"
			var text4 = document.createTextNode("$" + data.products[i].price)
			priceinput.appendChild(text4)

			var input = document.createElement('input')
			input.setAttribute("id", data.products[i].request.url)
			input.setAttribute("onclick", "updatedata(this)")
			input.className = "button"
			input.type = "submit"
			input.value = "Update"

			var input1 = document.createElement('input')
			input1.setAttribute("id", data.products[i]._id)
			input1.setAttribute("onclick", "addtohot(this)")
			input1.className = "button"
			input1.type = "submit"
			input1.value = "Add To Hot Item List"

			var input2 = document.createElement('input')
			input2.setAttribute("id", data.products[i].request.url)
			input2.setAttribute("onclick", "deleteproduct(this)")
			input2.type = "submit"
			input2.className = "button"
			input2.value = "Delete product"

			card.appendChild(nameinput)
			card.appendChild(priceinput)
			card.appendChild(input)
			card.appendChild(input1)
			card.appendChild(input2)

			app.appendChild(card)
		}
	} else {
		const errorMessage = document.createElement('marquee')
		errorMessage.textContent = 'it is not working!'
		app.appendChild(errorMessage)
	}
};
request.send()
var token = localStorage.getItem('token');

function addtohot(myObj){
	var request = new XMLHttpRequest()
	var id = myObj.id
	var product = JSON.stringify({
		"productId": id
	})
	request.open('POST', 'https://web-apiassignment.herokuapp.com/hot', false)
	request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
	request.setRequestHeader('Authorization', 'Bearer '+ token)
	request.onreadystatechange = function() {
		if(request.readyState == 4) {
			if(request.status == 201) {
				alert("It has been added")
				redirect();
			} else {
				console.log("failed");
			}
		}
	};
	request.send(product)
}

function updatedata(myObj){
	var url = myObj.id
	console.log(myObj)
	console.log(url)
	var request = new XMLHttpRequest()
	var productname = document.getElementById("edtname" +  url).value
	var productprice = document.getElementById("edtprice" + url).value
	var namejson = JSON.stringify([
		{
			"propName": "name", "value": productname
		}
	])
	var pricejson = JSON.stringify([
		{
			"propName": "price", "value": productprice
		}
	])
	request.open('PATCH', url, false)
	request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
	request.setRequestHeader('Authorization', 'Bearer '+ token)
	request.onreadystatechange = function() {
		if(request.readyState == 4) {
			if(request.status == 200) {
				console.log("successful");
			} else {
				console.log("failed");
			}
		}
	};
	request.send(namejson)
	
	request.open('PATCH', url, false)
	request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
	request.setRequestHeader('Authorization', 'Bearer '+ token)
	request.onreadystatechange = function() {
		if(request.readyState == 4) {
			if(request.status == 200) {
				console.log("successful");
				redirect();
			} else {
				console.log("failed");
			}
		}
	};
	request.send(pricejson)
}

function deleteproduct(myObj){
	var url = myObj.id

	var request = new XMLHttpRequest()
	request.open('DELETE', url, false)
	request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
	request.setRequestHeader('Authorization', 'Bearer '+ token)
	request.onreadystatechange = function() {
		if(request.readyState == 4) {
			if(request.status == 200) {
				console.log("successful");
				redirect();
			} else {
				console.log("failed");
			}
		}
	};
	request.send()
}

function addproduct(){
	var request = new XMLHttpRequest()
	var productname = document.getElementById("productname").value
	var price = document.getElementById("price").value
	var product = JSON.stringify({
		"name": productname,
		"price": price
	})
	request.open('POST', 'https://web-apiassignment.herokuapp.com/product', false)
	request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
	request.setRequestHeader('Authorization', 'Bearer '+ token)
	request.onreadystatechange = function() {
		if(request.readyState == 4) {
			if(request.status == 201) {
				console.log("successful");
				redirect();
			} else {
				console.log("failed");
			}
		}
	};
	request.send(product)
}

function redirect() {
	setTimeout(function() {
		document.location.href = "product.html"
	}, 500)
}