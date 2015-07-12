

function expandString(str, quote, properties) {
	return str.replace(/\$\{([^\}]+)\}/g, function (match, key) {
		return quote(properties[key]);
	});
}

const RootContext = {
  evaluate(expression) {

  }
};

exports.createContext = function() {


  return Object.create(RootContext,{
    evaluate();
    });
};
