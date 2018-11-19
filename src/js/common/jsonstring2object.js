module.exports = {
	parse : function(obj) {
		if(typeof obj != 'object') {
            obj = JSON.parse(obj);
        }
        return obj;
	}
}