var levels = require('./index.json'),
	out = [];

function quote(v) {
	return '"' + v + '"'; // @todo Could add quote escaping, but there's no need at this point
}

function list(array) {
	return array && array.length
		? '[ ' + array.map(quote).join(', ') + ' ]'
		: '[]';
}

function map(obj) {
	return obj && Object.keys(obj).length
		? '{ ' + Object.keys(obj).map(function (key) { return quote(key) + ': ' + quote(obj[key]); }).join(', ') + ' }'
		: '{}';
}

function number(v) {
	return isNaN(v) ? -1 : v;
}

out.push('[{');
levels.forEach(function (level) {
out.push('    "number": ' + level.number + ',');
out.push('    "name": ' + quote(level.name) + ',');
if (level.floor) {
out.push('    "floor": ' + map(level.floor) + ',');
}
out.push('    "expect": [{');
level.expect.forEach(function (expect) {
out.push('        "inbox": ' + list(level.expect.inbox) + ',');
out.push('        "outbox": ' + list(level.expect.outbox));
out.push('    }, {');
});
out.pop();
out.push('    }],');
out.push('    "challenge": {');
out.push('        "size": ' + number(level.challenge.size) + ',');
out.push('        "speed": ' + number(level.challenge.speed));
out.push('    }');
out.push('}, {');
});
out.pop();
out.push('}]');

console.log(out.join('\n'));
