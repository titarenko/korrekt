var korrekt = require('../');
var should = require('should');
var Promise = require('bluebird');

var v = korrekt; // alias

describe('korrekt', function () {
	it('should at least run without syntax errors', function (done) {
		var schema = {
			a: v.isInt('кина не будет -- there will be no movie'),
			b: v.isLength(10, 'слишком коротко -- too short')
		};

		var validator = v(schema);

		var obj = {
			a: 'a10',
			b: 'ohno!'
		};

		validator(obj).then(screw).catch(korrekt.ValidationError, function (error) {
			error.fields.should.eql({
				a: 'кина не будет -- there will be no movie',
				b: 'слишком коротко -- too short'
			});
			done();
		}).catch(done);
	});

	it('should allow to register custom validators', function (done) {
		v.register('isPatient100', function builder (message, anyOtherArgs) {
			return function validator (value, field, obj) {
				return Promise.delay(100).return(message);
			};
		});
		var validator = v({ s: v.isPatient100('abba!') });
		var obj = { s: 10 };
		validator(obj).then(screw).catch(v.ValidationError, function (error) {
			error.fields.should.eql({
				s: 'abba!'
			});
			done();
		}).catch(done);
	});
});

function screw (done) {
	return function () {
		done('seems like validator does not work, it should throw, but did not');
	}
}
