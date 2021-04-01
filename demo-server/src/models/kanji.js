var mongoose=require('mongoose');

var schema=new Schema({
	imagePath:{type:String, require:true},
	title:{type:String, require:true},
	description:{type:String, require:true},
	price:{type:Number, require:true},
	category:{type:String,require:true},
	amount:{type:Number,require:true},
	status:{type:String,require:true},
	releaseDate:{type:String, default:''},
	publisher:{type:String, default:''}
});