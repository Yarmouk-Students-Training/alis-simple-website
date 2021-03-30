require("dotenv").config();
const bcrypt = require("bcrypt");
const { sequelize } = require("./models");
const express = require("express");
const jwt = require("jsonwebtoken");
const modele = require("./models");
// routes
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const reactRoutes = require("./routes/reactRoutes");


const app = express();

app.use(express.json());

app.listen({ port: 4000 }, async () => {
  console.log("server is up on port 3000");
  await sequelize.sync({ alert: true });
  console.log("database synced");
});

// routes
app.get("/", (req, res) => {});

app.post("/refresh",async(req,res)=>{
  const refresh =req.body.refresh
  const refreshT =await modele.authtoken.findOne({where
  :{refresh}})
  if(refreshT!== null){
    jwt.sign(refreshT,process.env.REFRESH_TOKEN,(err,email)=>{
      if(err){
        res.json(err)
      }
      else
      {
        const access = jwt .sign({email},process.env.ACCESS_TOKEN,{expiresIn:"10m"})
        return res.json({access})
      }
    })
  }
  else
  {
    return res.json("Not Allowed")
  }
})


app.post("/login", async (req, res) => {
    const {email,password}  = req.body;
    const user = await modele.user.findOne({where:{email,password}});
    if(user)
    {
      const acces =await jwt.sign({email},process.env.ACCESS_TOKEN,{expiresIn:"10m"})
      const refresh = await jwt.sign({email},process.env.REFRESH_TOKEN,{expiresIn:"50d"})
      await modele.authtoken.create({refresh})
        return res.json({acces,refresh})}
      
      else{
        return res.status(402).send('not Allowed')
      } 
    
});
app.delete("/logout",async(req,res)=>{
  try{
    const email=req.body.email
    const refRes = await modele.authtoken.destroy({where:{email}})
    if(refRes)
      return res.status(203).send("loged out")
    else
      return res.status(203).send("you haven't a token")
  }catch(err){
    console.log(err);
    return res.status(500)
  }
})
// user routes=
app.use("/user", userRoutes);
// post routes=
app.use("/post", postRoutes);
// user routes=
app.use("/comment", commentRoutes);
// user routes=
app.use("/react", reactRoutes);



function AuthenticateT(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, email) => {
    if (err) return res.sendStatus(403);
    req.email = email;
    next();
  });
}
