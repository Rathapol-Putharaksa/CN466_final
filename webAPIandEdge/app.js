'use strict';
const Module = require('./edge-impulse-standalone');
const axios = require('axios');
const express = require('express');
var bodyParser = require('body-parser');
const mqtt = require("mqtt");
require('dotenv').config()
const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';
var result_send;
var move_sec = 0;
var stay_sec = 0;

var client  = mqtt.connect('mqtt://broker.hivemq.com')

client.on('connect', function () {
  client.subscribe('cn466_dave', function (err) {
    if (!err) {
      client.publish('presence', 'Hello mqtt')
    }
  })
})



const server = express()
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());


let classifierInitialized = false;
    Module.onRuntimeInitialized = function() {
        classifierInitialized = true;
    };
    
    class EdgeImpulseClassifier {
        _initialized = false;
    
        init() {
            if (classifierInitialized === true) return Promise.resolve();
    
            return new Promise((resolve) => {
                Module.onRuntimeInitialized = () => {
                    resolve();
                    classifierInitialized = true;
                };
            });
        }
    
        classify(rawData, debug = false) {
            if (!classifierInitialized) throw new Error('Module is not initialized');
    
            const obj = this._arrayToHeap(rawData);
            let ret = Module.run_classifier(obj.buffer.byteOffset, rawData.length, debug);
            Module._free(obj.ptr);
    
            if (ret.result !== 0) {
                throw new Error('Classification failed (err code: ' + ret.result + ')');
            }
    
    
            let jsResult = {
                anomaly: ret.anomaly,
                results: []
            };
    
            for (let cx = 0; cx < ret.size(); cx++) {
                let c = ret.get(cx);
                jsResult.results.push({ label: c.label, value: c.value, x: c.x, y: c.y, width: c.width, height: c.height });
                c.delete();
            }
    
            ret.delete();
    
            return jsResult;
        }
    
        getProperties() {
            return Module.get_properties();
        }
      
        _arrayToHeap(data) {
            let typedArray = new Float32Array(data);
            let numBytes = typedArray.length * typedArray.BYTES_PER_ELEMENT;
            let ptr = Module._malloc(numBytes);
            let heapBytes = new Uint8Array(Module.HEAPU8.buffer, ptr, numBytes);
            heapBytes.set(new Uint8Array(typedArray.buffer));
            return { ptr: ptr, buffer: heapBytes };
        }
    }
server.get('/check',function(req,res){
res.send(result_send)

})

server.get('/checktime',function(req,res){
    res.send({'move_time':move_sec,
"stay_time":stay_sec})
    
    })

server.post('/test', function (req, res) {

// Classifier module



(async () => {
           
    var classifier = new EdgeImpulseClassifier();
    await classifier.init();
    var rawdata = []  
        var last_value;
        var data = axios.get("https://cn466-a22ce-default-rtdb.firebaseio.com/.json?auth=4kIwSUooJ4uZ2oacIYLvOXFcYFObdbZpLgG9vICS")
        .then((response) => {
           
            var last_value =  Object.values(response.data)[Object.values(response.data).length - 1]
//console.log(last_value.rawdata)
for (let i = 0; i < Object.keys(last_value.rawdata).length; i++) { 
    rawdata.push(last_value.rawdata[i])
    }
    let result =classifier.classify(rawdata);
    if(result.results[0].value>result.results[1].value){
    res.send(result.results[0].label);
    result_send = result.results[0].label
    move_sec = move_sec+ 5


    client.publish("cn466_dave/leds/cucumber_dave", "red")
    }
    else{
        res.send(result.results[1].label)
        client.publish("cn466_dave/leds/cucumber_dave", "green")
        result_send = result.results[1].label
        stay_sec = stay_sec +5
    }
    
});

    //console.log('results', classifier.classify(last_value.rawdata));
       //console.log(last_value)
       //await 
       
        
    })();
  
});

server.use((req, res) => res.sendFile(INDEX, { root: __dirname }))

server.listen(PORT, () => console.log(`Listening on ${PORT}`));
