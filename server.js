var express = require('express');
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

var Storage = {
  add: function(name) {
    var item = {name: name, id: this.setId};
    this.items.push(item);
    this.setId += 1;
    return item;
  },
  del: function(id) {
    console.log("HTTP DELETE");
    console.log(id + " to be deleted");
    // console.log("at " + getArrayIndex(this.items,id) + " index");
    this.items.splice(getArrayIndex(this.items,id),1);
    // console.log(this.items);
    return this.items;
  },
  update: function(id,name){
    console.log("HTTP PUT");
    console.log(id + " to be UPDATED.")
    var item = {name: name, id: id};
    this.del(id).push(item);
    return this.items;
  },
  adduser: function(){
    console.log("adding user: ");
    users.push(this);
  }
};

var createStorage = function() { // The class prototype for the Storage object
  var storage = Object.create(Storage);
  this.user =""; //adding a user
  storage.items = [];
  storage.setId = 1;
  return storage;
}

function getArrayIndex(arr,id){
  var index = -1;
  for(var i =0; i<arr.length; i++){
    // console.log(id + " is or is not equal to " +arr[i].id)
    if (id == arr[i].id){
      // console.log(id + " is equal to " + arr[i].id);
      // console.log(i + " index to be spliced");
      index = i;
      return index;
    } else if (id!=arr.id && i ==arr.length){
      console.log("no such index found");
    }
  }
}

var users = [createStorage];

var storage = new createStorage(); // Storage object with createStorage class properties and methods
var Pierce = new createStorage();


Pierce.user = "Pierce";
Pierce.add('broccoli');
Pierce.adduser();

storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');''

var app = express();
app.use(express.static('public'));

app.get('/items', function(req, res) {
    res.json(storage.items);
});

app.post('/items', jsonParser, function(req,res){
  if (!('name' in req.body)){
    res.sendStatus(400);
  } else {
    var item =storage.add(req.body.name);
    res.status(201).json(item); //send status 201-OK and send item to the server in json.
  }
});

app.put('/items/:id',jsonParser,function(req,res){
  if(!('id' in req.body)){
    res.sendStatus(400);
  } else if (req.params.id === NaN){
    res.sendStatus(400);
    console.log("id is not a number");
  } else {
    console.log(req.body.name + " is req.body.name");
    var item = storage.update(req.params.id,req.body.name);
    res.sendStatus(200)
  }
});

app.delete('/items/:id',jsonParser,function(req,res){
  if(!(req.params.id) in req.body ){
    res.sendStatus(404).json(req.params.id + " not found.");
  } else {
    console.log(req.params.id);
    var item = storage.del(req.params.id); //set this item object equal to the newly returned this.items object.
    res.status(200).json(item); //respond okay and send the returned this.items object to the client.
  }
});

app.get('/users/:username',function(req,res){
  console.log("request for user " + req.params.username);
  var user = req.params.username;
  for(var i = 0;i<users.length;i++){
    if(user == users[i].user){
      res.json(users[i].items);
    }
  }
});

app.listen(process.env.PORT || 8080, process.env.IP, function(){
  console.log("Server running on port 8080");
});
