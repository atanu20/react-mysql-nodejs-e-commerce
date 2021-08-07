const express=require("express");
const mysql=require("mysql");
const cors=require("cors");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const Insta = require("instamojo-nodejs");
const url = require('url');
const open = require('openurl');
const saltRounds = 10;
const PORT =process.env.PORT || 8000;

const API_KEY = "test_******";
const AUTH_KEY = "test_*****";


Insta.setKeys(API_KEY, AUTH_KEY);

Insta.isSandboxMode(true);

const app =express()
app.use(cors())
app.use(express.json())
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'ecom-react'
  });

app.get("/",(req,res)=>{
    res.send("hi")
})  
// get data 
app.get("/getdataall",(req,res)=>{
    let sql=`select * from products`;
    db.query(sql,(err,result)=>{
        if(err)
        {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})
app.get("/getdata",(req,res)=>{
    let sql=`select * from products ORDER BY RAND() limit 6`;
    db.query(sql,(err,result)=>{
        if(err)
        {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })

})
app.get("/getdata/:id",(req,res)=>{
    const id=req.params.id;
    let sqll=`select * from products where id=${id}`;
    db.query(sqll,(err,result)=>{
        if(err)
        {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
    

})
app.get("/sort/:price",(req,res)=>{
    const price=req.params.price;
    if(price==='200')
    {
        let sqll=`select * from products WHERE price < 200`;
    db.query(sqll,(err,result)=>{
        if(err)
        {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })

    }
    else if(price==='200_500')
    {
        let sqll=`select * from products WHERE price >=200 && price <= 500`;
        db.query(sqll,(err,result)=>{
            if(err)
            {
                console.log(err)
            }
            else{
                res.send(result)
            }
        })

    }
    else if(price==='500_1000')
    {
        let sqll=`select * from products WHERE price > 500 && price <= 1000`;
        db.query(sqll,(err,result)=>{
            if(err)
            {
                console.log(err)
            }
            else{
                res.send(result)
            }
        })
        
    }
    
    

})

app.get("/getaddress/:userid",(req,res)=>{
    const userid=req.params.userid
    let sql=`select * from user_data where user_id=${userid}`;
    db.query(sql,(err,result)=>{
        if(err)
        {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})


app.get("/account/:id",(req,res)=>{
    const id=req.params.id;
    let sqll=`select * from orders where userid=${id} && orderstatus='order done'`;
    db.query(sqll,(err,result)=>{
        if(err)
        {
            console.log(err)
        }
        else{
           
            res.send(result)
        }
    })

})
app.get("/myorder/:id",(req,res)=>{
    const id=req.params.id;
    // let sqll=`select * from orderitems where orderid=${id}`;
    let sqll=`SELECT * FROM orderitems,products WHERE orderitems.productid = products.id && orderitems.orderid=${id}`
    db.query(sqll,(err,result)=>{
        if(err)
        {
            console.log(err)
        }
        else{
           
            res.send(result)
        }
    })
})

// post details 

app.post("/addaddress",(req,res)=>{
    const data={
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        address:req.body.address,
        user_id:req.body.userId

    }
    let sql="INSERT INTO `user_data` SET ?";
    db.query(sql,data,(err,result)=>{
        if(err)
        {
            console.log(err)
        }
        else{
           
            res.send({msg:"Address inserted Successfully"})

        }
    })
    // console.log(data)



})

app.post("/buynow",(req,res)=>{
    // const data={
    //     userid:req.body.userid,
    //     totalprice:req.body.totalprice,
    //     orderstatus:req.body.orderstatus,
    //     paymentmode:req.body.paymentmode,
       

    // }

   

    const cartdata=req.body.cart
    const paymentemail=req.body.paymentemail
    const name=req.body.name;
    var insta = new Insta.PaymentData();

   const REDIRECT_URL = "http://localhost:3000/success";

            insta.setRedirectUrl(REDIRECT_URL);
            insta.send_email = "True";
            insta.send_sms = "False";
            insta.purpose = "React Ecom"; // REQUIRED
            insta.amount = req.body.totalprice;
            insta.name = name;
            insta.email = paymentemail; // REQUIRED
            
            // console.log(paymentemail+ name)
                
            Insta.createPayment(insta, function (error, response) {
                if (error) {
                  console.log("something went wrong")
                } else {
                //   console.log(response[0].success)
                  const responseData = JSON.parse( response );
			const redirectUrl = responseData.payment_request.longurl;
            // console.log(redirectUrl)
                    //   open(response.payment_request.longurl);
                    const data={
                        userid:req.body.userid,
                        totalprice:req.body.totalprice,
                        orderstatus:responseData.payment_request.status,
                        paymentmode:req.body.paymentmode,
                        paymentid:responseData.payment_request.id
                       
                
                    }


                    let sql="INSERT INTO `orders` SET ?";
                    db.query(sql,data,(err,result)=>{
                        if(err)
                        {
                            // console.log("hi1")
                            console.log(err)
                        }
                        else{
                        //    console.log(result.insertId)
                
                        for(let i=0;i<cartdata.length;i++)
                        {
                         // console.log(cartdata[i].name)
                         const detailsdata={
                             orderid:result.insertId,
                             productid:cartdata[i].id,
                             productqty:cartdata[i].qty,
                             productprice:cartdata[i].price
                         }
                
                         let sqll="INSERT INTO `orderitems` SET ?";
                         db.query(sqll,detailsdata,(er,resu)=>{
                             if(er)
                             {
                                //  console.log("hi2")
                                 console.log(er)
                             }
                            
                         })
                
                
                
                        }
                        //  open.open(redirectUrl)
                         res.send(response)
                        
    
                        
                       
                
                
                
                
                       
                           
                            
                
                        }
                    })



                    
                //   res.send(response)
                // res.send({msg:"pay done"})
                }
              });
  

    // console.log(data)
})

app.post("/paydetails",(req,res)=>{
   
    const pid=req.body.pid
    const pyid=req.body.pyid

   if(pid === pyid)
   {
       let sql=`update orders set orderstatus="order done" where paymentid='${pid}'`
       db.query(sql,(err,result)=>{
        if(err)
        {
            console.log(err)
        }
        else{
           
            res.send({msg:"order done Successfully"})

        }
       })
   }
   

})

// edit address 

app.post("/editadd",(req,res)=>{
    
     const name= req.body.name
     const email=req.body.email
     const phone=req.body.phone
     const address=req.body.address
     const user_id=req.body.userId

    
    let sql=`update user_data set name='${name}',email='${email}',phone='${phone}',address='${address}' where user_id=${user_id}`;
    db.query(sql,(err,result)=>{
        if(err)
        {
            console.log(err)
        }
        else{
           
            res.send({msg:"edit Successfully"})

        }
    })

})



app.post("/register",(req,res)=>{
    const email=req.body.email;
    
    const username=req.body.username;
    const password=req.body.password;
    bcrypt.hash(password,saltRounds,(errr,hash)=>{
        const data={
            username:req.body.username,
            email:req.body.email,
            password:hash,        
       
       };
       if(errr)
       {
        console.log(err);
       }
       else{
        let sqll=`select * from users where email='${email}'`;
        db.query(sqll,(er,ress)=>{
            if(ress.length > 0)
            {
                res.send({msg:"User Email Already Present"})

            }
            else{
                let sql="INSERT INTO `users` SET ?";
                db.query(sql,data,(err,result)=>{
                    if(err)
                    {
                        console.log(err)
                    }
                    else{
                        //  console.log(result);
                         res.send(result);
                        // res.send()
            
                    }
                })
            }
        })

       

       }
      

    })
   
    
     
})

const verifyJwt=(req,res,next)=>{
    const token=req.headers["x-access-token"]

    if(!token)
    {
        res.send({login:false,msg:"need token"});
    }
    else{
        jwt.verify(token,'ecomreact',(err,decoded)=>{
            if(err)
            {
                res.send({login:false,msg:"need for token"});
            }
            else{
                req.userID=decoded.id;
                next();
            }
        })
    }
}

app.get("/isAuth",verifyJwt,(req,res)=>{
    res.send({login:true,msg:"done"});
})

app.post("/login",(req,res)=>{
    const email=req.body.email;
     const password=req.body.password;
 
     // console.log(email);
         
       
         let sql=`select * from users where email='${email}'`;
         // console.log(sql);
         db.query(sql,(err,result)=>{
             if(err)
             {
                 // res.send({err:err})
                 console.log(err);
             }
             else{
               
                if(result.length > 0)
                {
                 bcrypt.compare(password,result[0].password,(errr,response)=>{
                     if(response)
                     {
                        
                        const id=result[0].id;
                        const token=jwt.sign({id},"ecomreact",{
                            expiresIn:60*60*24,
                        })
                        res.send({login:true,token:token,user:result[0].username,userID:result[0].id,userEmail:result[0].email})
                        // res.send({login:true,user:result[0].name})

                     }
                     else{
                      res.send({login:false,msg:"Wrong Password"});
                     
                     }
                 })
 
                 
 
                }
                else{
                     res.send({login:false,msg:"User Email Not Exits"});
                 // console.log("noo email ")
                }
                 
     
             }
         })
 
       
     
      
 })


app.listen(PORT , ()=>{
    console.log(`app running on port ${PORT}`)
})
