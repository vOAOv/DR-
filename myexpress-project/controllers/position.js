const positionModel = require("../models/position.js");

module.exports = {
	addPosition(req, res) {
		const { company, position , salary, address } = req.body;//post请求
		const filename = req.file ? req.file.filename : "";

		positionModel.addPosition(company, position , salary, address, filename, (err) => {
			res.json({
				ret: true,
				data: {
					inserted: !err
				}
			})
		})
	},
	getPositionList(req, res) {
		const { page, size } = req.query;//get请求
		let totalPage = 0;
		positionModel.getPosition({}, (result) => {
			if (result && result !== "error") {
				totalPage = Math.ceil(result.length / size);
				positionModel.getPositionByPage(page, size, (result) => {				
					res.json({
						ret: true,
						data: {
							list: result,
							totalPage: totalPage
						}
					})
				})
			}
		})
	},
	getPosition(req, res) {
		oldfilename = req.query.oldfilename
		positionModel.getPositionById(req.query.id, (result) => {
			res.json({
				ret: true,
				data: {
					info: (result && result !== "error") ? result : false
				}
			})
		})
	},
	removePosition(req, res) {
		positionModel.removeItemById(req.query.file, req.query.id, (err) => {
			res.json({
				ret: true,
				data: {
					delete: !err
				}	
			})			
		})
	},
	updatePosition(req, res) {
		const {company, position, salary, address, id} = req.body;
		const params = {
			company,
			position,
			salary,
			address
		}
		if (req.file && req.file.filename) {
			params.filename = req.file.filename
		}
		positionModel.updatePositionById(id, params, params.filename, oldfilename, (result) => {
			res.json({
				ret: true,
				data: {
					update: (result && result !== "error") ? true : false
				}
			})
		})
	},
	salarySuit(req, res) {
		positionModel.getPositionBySalary(req.query.salary, (result) => {
			console.log(result)
			res.json({
				ret: true,
				data: {
					suit: (result && result !== "error") ? result : false
				}
			})
		})
	}
} 