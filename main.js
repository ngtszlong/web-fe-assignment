var request = new XMLHttpRequest()
var deleteitemid
var token = localStorage.getItem('token');
request.open('GET', 'https://web-apiassignment.herokuapp.com/hot', true)
request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
request.setRequestHeader('Authorization', 'Bearer ' + token)
request.onload = function() {
	var data = JSON.parse(this.response)
	data = JSON.stringify(data, 'hots')
	data = JSON.parse(data)
	if(request.status >= 200 && request.status < 400) {
		for(i = 0; i < data.hots.length; i++) {
			deleteitemid = data.hots[i]._id
			console.log(deleteitemid)
			var request1 = new XMLHttpRequest()
			request1.open('GET', 'https://web-apiassignment.herokuapp.com/hot/' + data.hots[i]._id, true)
			request1.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
			request1.setRequestHeader('Authorization', 'Bearer ' + token)
			request1.onload = function() {
				var data1 = JSON.parse(this.response)
				data1 = JSON.stringify(data1, 'hot')
				data1 = JSON.parse(data1)
				console.log(data1)
				if(request1.status >= 200 && request1.status < 400) {
					var app = document.getElementById('orderlist')
					var card = document.createElement('div')
                    card.setAttribute('class', 'card')
                    
					var nameinput = document.createElement('h3')
					nameinput.setAttribute("id", "edtname" + data1.hot.product.name)
					nameinput.value = data1.hot.product.name
					var text2 = document.createTextNode(data1.hot.product.name)
                    nameinput.appendChild(text2)
                    
					var priceinput = document.createElement('h3')
					priceinput.setAttribute("id", "edtprice" + data1.hot.product.price)
					priceinput.value = data1.hot.product.price
					var text4 = document.createTextNode("$" + data1.hot.product.price)
                    priceinput.appendChild(text4)
                    
					var input2 = document.createElement('input')
					input2.setAttribute("id", deleteitemid)
					input2.setAttribute("onclick", "deleteproduct(this)")
					input2.type = "submit"
					input2.className = "button"
                    input2.value = "Remove out of Hot Item"
                    
					card.appendChild(nameinput)
					card.appendChild(priceinput)
					card.appendChild(input2)
					app.appendChild(card)
				}
			}
			request1.send()
		}
	} else {
		const errorMessage = document.createElement('marquee')
		errorMessage.textContent = 'it is not working!'
		app.appendChild(errorMessage)
	}
};
request.send()

function deleteproduct(myObj) {
	var Objid = myObj.id
	console.log(Objid)
	var request = new XMLHttpRequest()
	request.open('DELETE', 'https://web-apiassignment.herokuapp.com/hot/' + Objid, false)
	request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
	request.setRequestHeader('Authorization', 'Bearer ' + token)
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

function redirect() {
	setTimeout(function() {
		document.location.href = "main.html"
	}, 500)
}