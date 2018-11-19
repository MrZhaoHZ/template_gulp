function setItem(item, obj) {
	localStorage.setItem(item, obj);
}

function getItem(item) {
	return localStorage.getItem(item);
}

function removeItem(item){
	localStorage.removeItem(item);
}

exports.setItem = setItem;
exports.removeItem = removeItem;
exports.getItem = getItem;