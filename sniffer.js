/**
 * Created by ytang on 10/6/2015.
 */


var express = require('express')
var http = require('http')
var req = require('requestify')

//uniqlo clothes widget
var email = require("emailjs/email")

var server  = email.server.connect({
    user:    "nake37@hotmail.com",
    password:"Ourstoryisnice4",
    host:    "smtp-mail.outlook.com",
    tls: {ciphers: "SSLv3"}
});
var buyingurl ='http://www.uniqlo.com/us/product/women-lemaire-lambswool-cropped-sweater-166401.html'
var message = {
    text:    "It's available "+buyingurl,
    from:    "nake37@hotmail.com",
    to:      "nake37@gmail.com",

    subject: "Clothes avaiable",

};
function sniff(){

    var url = 'http://www.uniqlo.com/us/store/gcx/getProductInfo.do?format=json&product_cd=166401'
    req.get(url).then(function(response) {
        // Get the response body (JSON parsed - JSON response or jQuery object in case of XML response)
        // console.log(response.getBody());

        // Get the response raw body
        var body = response.body;
        //console.log(body)
        var productinfo = JSON.parse(body)
        //  console.log(productinfo)
        //  console.log(productinfo.l2_goods_list[0])
        for(var i=0;i<productinfo.l2_goods_list.length;i++){
            if(productinfo.l2_goods_list[i].color_cd =='55' &&productinfo.l2_goods_list[i].size_cd=='002'){
                //  console.log(productinfo.l2_goods_list[i])
                if(productinfo.l2_goods_list[i].real_stock_cnt>0||productinfo.l2_goods_list[i].sum_stock_cnt>0)
                {

                    console.log("It's available "+new Date)
                    server.send(message, function(err, message) { console.log(err || message); });
                }
                else{

                    console.log("out of stock "+new Date())
                 //   server.send(message, function(err, message) { console.log(err || message); });
                }
            }
        }
    })
}
function addToCart(){
    req.get('http://www.uniqlo.com/us/store/ApiAddToCart.do?callback=addToBagCallback&timestamp=1444162484111&disp_cd=1573460009&disp_classif_cd=10&l1_goods_cd=157346&l2_goods_cd=1573460012&goods_cnt=1').then(function(response){
        var body = response.body;
        console.log(body)
        var returninfo = JSON.parse(body)
        console.log(returninfo)

    });
}
function checkout(){

}
var minute =0.1, the_interval = minute*60*1000;
setInterval(sniff,the_interval);
//addToCart()