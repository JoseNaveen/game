var expect = require("chai").expect;
var routes = require("../routes/index.js");
var controller = require("../controller.js")
var req = {
		session:{
			username:1
		}
		,body:{
			username:"jose"
			,password:"enter"
		}
}
var req_incorrect_user = {
		session:{
			username:1
		}
		,body:{
			username:"josey"
			,password:"enter"
		}
}
var req_incorrect_passwd = {
		session:{
			username:1
		}
		,body:{
			username:"jose"
			,password:"enteer"
		}
}
var req_unknown_user = {
		session:{
			username:0
		}
}
var res = {
		viewName:""
		, data:{}
		,jsonData:{}
		, render: function(view,viewData){
			this.viewName=view
			this.data=viewData
		}
		,json: function(d){
			this.jsonData = d
		}
}
describe("routes.index",function(){
	describe(".home()",function(){
		it("render correct web page for known and unknown user",function(){
			routes.home(req,res)
			expect(res).to.have.a.property("viewName","home")
			expect(res.data).to.have.a.property("status", "LoggedIn")
			routes.home(req_unknown_user,res)
			expect(res).to.have.a.property("viewName","home")
			expect(res.data).to.have.a.property("status", "NotLoggedIn")
		})
	})
})


describe("routes.index",function(){
	describe(".play()",function(){
		it("render the appropriate page for game for logged_in/unknown user",function(){
			routes.play(req,res)
			expect(res).to.have.a.property("viewName","game_page.ejs")
			routes.play(req_unknown_user,res)
			expect(res).to.have.a.property("viewName","home")
			expect(res.data).to.have.a.property("status", "NotLoggedIn")
			
		})
	})
})

describe("routes.index",function(){
	describe(".signin()",function(){
		beforeEach(function(done){
			routes.signin(req,res)
		    setTimeout(function(){
		      done()
		    }, 1900);

		  });
		afterEach(function(done){
			//console.log(res.jsonData)
			done()
		})
		it("check the signin router success case",function(){
			expect(res.jsonData).equals('{"result":"success"}')
		})
	})
})

describe("routes.index",function(){
	describe(".signin()",function(){
		beforeEach(function(done){
			req.session.passsword = "enter1"
			routes.signin(req_incorrect_passwd,res)
		    setTimeout(function(){
		      done()
		    }, 1900);

		  });
		afterEach(function(done){
			//console.log(res.jsonData)
			done()
		})
		it("check the signin router incorrect password",function(){
			expect(res.jsonData).equals('{"result":"failure","message":"incorrect password"}')
		})
	})
})


describe("routes.index",function(){
	describe(".signin()",function(){
		beforeEach(function(done){
			
			routes.signin(req_incorrect_user,res)
		    setTimeout(function(){
		      done()
		    }, 1900);

		  });
		afterEach(function(done){
			done()
		})
		it("check the signin router incorrect username",function(){
			expect(res.jsonData).equals('{"result":"failure","message":"incorrect username"}')
		})
	})
})
//describe("controller",function(){
//	describe(".get_game()",function(){
//		
//	})
//})