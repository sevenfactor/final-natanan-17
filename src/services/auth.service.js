import { prisma } from "../config/prisma.js"

export const registerDoctorService = async (data) => {

  const doctor = await prisma.doctor.create({
    data: {
      username: data.username,
      password: data.password,
      specialization: data.specialization
    }
  })

  return doctor
}

export const registerUserService = async (data) => {

  const user = await prisma.user.create({
    data: {
      username: data.username,
      password: data.password
    }
  })

  return user
}

export const findDoctorByUsername = async (username) => {

  return prisma.doctor.findUnique({
    where: { username }
  })

}


export const findUserByUsername = async (username) => {

  return prisma.user.findUnique({
    where: { username }
  })

}