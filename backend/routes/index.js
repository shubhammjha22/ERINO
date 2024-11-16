const { PrismaClient } = require("@prisma/client");
const express = require("express");
const router = express.Router();
const { z } = require("zod");
const prisma = new PrismaClient();

const contactsSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email({ message: "Invalid Email" }),
  company: z.string(),
  jobTitle: z.string(),
  phoneNumber: z.string(),
});

// ROute to create new contacts
router.post("/contacts", async (req, res) => {
  const body = req.body;

  const { success, error } = contactsSchema.safeParse(body);
  if (!success) {
    return res
      .status(400)
      .json({ message: "Invalid Inputs", error: error.errors });
  }

  const contactExist = await prisma.contact.findFirst({
    where: {
      OR: [{ email: body.email }, { phoneNumber: body.phoneNumber }],
    },
  });
  console.log("here is the contact if exist -", contactExist);

  if (contactExist) {
    return res.status(403).send({ message: "Contact already exists" });
  }

  try {
    const contact = await prisma.contact.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        company: body.company,
        jobTitle: body.jobTitle,
        phoneNumber: body.phoneNumber,
      },
    });
    console.log(contact);
    res.send({ message: "Contact Added !", contact });
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
});

//to get bulkkk contacts
router.get("/contacts", async (req, res) => {
  //   const prisma = new PrismaClient();
  const contacts = await prisma.contact.findMany({});

  res.send({ message: "All contacts fetched", contacts });
});

//update a specific contacts infor

const updateContactSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email({ message: "Invalid Email" }).optional(),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  phoneNumber: z.string().optional(),
});
// Update contact
router.put("/contacts/:id", async (req, res) => {
  //   const prisma = new PrismaClient();
  const { id } = req.params;
  const body = req.body;
  const { success, error } = updateContactSchema.safeParse(body);

  if (!success) {
    return res
      .status(400)
      .json({ message: "Invalid Inputs", error: error.errors });
  }

  try {
    const contact = await prisma.contact.update({
      where: {
        id: id,
      },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        company: body.company,
        jobTitle: body.jobTitle,
        phoneNumber: body.phoneNumber,
      },
    });

    if (!contact) {
      return res.send({ message: "No Contact found !" });
    }

    res.send({ message: "Contact Updated", contact });
  } catch (error) {
    res.status(502).json({ message: "There was some error" });
  }
});

// deltingg the contact
router.delete("/contacts/:id", async (req, res) => {
  const { id } = req.params;

  //   const prisma = new PrismaClient();

  try {
    const response = await prisma.contact.delete({ where: { id: id } });
    console.log(response);
    res.status(200).json({ message: "Contact Deleted !" });
  } catch (error) {
    console.log("There was some error -", error);
    res.status(500).json({ message: "There was some error !" });
  }
});

module.exports = router;
