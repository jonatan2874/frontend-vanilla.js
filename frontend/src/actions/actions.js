const endPoint = '/frontend-vanilla.js/backend/';
const getUsers = async params =>{
    return fetch(`${endPoint}users/index.php?&${params}`)
    		.then(function(response) {
		        return response.json();
		    })
}

const addUser = params => {
    return fetch(`${endPoint}users/index.php?`, {
		method  : 'POST', // or 'PUT'
		body    : JSON.stringify(params), // data can be `string` or {object}!
		mode    : 'cors',
		headers : {
	    	'Content-Type': 'application/json',
	  	}
	}).then(res => res.json())
}

const editUser = params => {
    return fetch(`${endPoint}users/index.php?`, {
		method  : 'PUT', // or 'PUT'
		body    : JSON.stringify(params), // data can be `string` or {object}!
		mode    : 'cors',
		headers : {
	    	'Content-Type': 'application/json',
	  	}
	}).then(res => res.json())
}

const dropUser = async params => {
    return fetch(`${endPoint}users/index.php?`, {
		method  : 'DELETE', // or 'PUT'
		body    : JSON.stringify(params), // data can be `string` or {object}!
		mode    : 'cors',
		headers : {
	    	'Content-Type': 'application/json',
	  	}
	}).then(res => res.json())
}

// export {getUsers};