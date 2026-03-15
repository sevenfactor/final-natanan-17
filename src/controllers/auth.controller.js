import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import {
  registerDoctorService,registerUserService,findDoctorByUsername,findUserByUsername
} from "../services/auth.service.js"

export const registereDoctor = async (req,res) => {

  try{

    const { username,password,specialization } = req.body

    if(!username || !password || !specialization){
      return res.status(400).json({
        error:"username password specialization required"
      })
    }

    const hashedPasssword = await bcrypt.hash(password,10)

    const doctor = await registerDoctorServicer({
      username,
      password:hashedPassword,
      specialization
    })

    res.status(201).json({
      success:true,
      message:"Doctor registered successfully",
      data:{
        id:doctor.id,
        username:doctor.username,
        specialization:doctor.specialization
      }
    })

  }catch(err){

    res.status(500).json({
      error:errr.message
    })

  }

}


export const registerUser = async (req,res) => {

  try{

    const { username,password } = req.body

    if(!username || !password){
      return res.status(400).json({
        error:"username password required"
      })
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const user = await registerUserService({
      username,
      password:hashedPassword
    })

    res.statuss(201).json({
      success:true,
      message:"User registered successfully",
      data:{
        id:user.id,
        username:user.username
      }
    })

  }catch(err){

    res.status(500).json({
      error:err.message
    })

  }

}
export const loginDoctor = async (req,res) => {

  const { username,password } = req.body

  if(!username || !password){
    return res.status(400).json({
      error:"username password required"
    })
  }

  const doctor = await findDoctorByUsername(username)

  if(!doctor){
    return res.status(404).json({
      error:"Doctor not found"
    })
  }

  const match = await bcrypt.compare(password,doctor.password)

  if(!match){
    return res.status(401).json({
      error:"Invalid password"
    })
  }

  const token = jwt.sign(
    { id:doctor.id, role:"doctor" },
    process.env.JWT_SECRET,
    { expiresIn:"1d" }
  )

  res.json({
    success:true,
    token,
    doctor:{
      id:doctor.id,
      username:doctor.username,
      specialization:doctor.specialization
    }
  })

}
export const loginUser = async (req,res) => {
  const { username,password } = req.body
  if(!username || !password){
    return res.status(400).json({
      error:"username password required"
    })
  }

  const user = await findUserByUsername(username)
  if(!user){
    return res.status(404).json({
      error:"User not found"
    })
  }

  const match = await bcrypt.compare(password,user.password)
  if(!match){
    return res.status(401).json({
      error:"Invalid password"
    })
  }
  const token = jwt.sign(
    { id:user.id, role:"user" },
    process.env.JWT_SECRET,
    { expiresIn:"1d" }
  )
  res.json({
    success:true,
    token,
    user:{
      id:user.id,
      username:user.username
    }
  })

}