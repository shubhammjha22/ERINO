import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";

export default function ContactEditForm({ id, contact, onSubmit, onClose }) {
  const myContact = contact;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: myContact.firstName,
      lastName: myContact.lastName,
      email: myContact.email,
      company: myContact.company,
      phoneNumber: myContact.phoneNumber,
      jobTitle: myContact.jobTitle,
    },
  });

  return (
    <Dialog open onClose={onClose}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        <DialogTitle>
          Edit Contact
          <IconButton
            onClick={onClose}
            style={{ position: "absolute", right: 16 }}
          >
            <X size={24} />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)} id="contact-form">
            <div className="flex mb-4 mt-4 gap-5">
              <TextField
                {...register("firstName", {
                  required: "First name is required",
                })}
                label="First Name"
                fullWidth
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                variant="outlined"
              />
              <TextField
                {...register("lastName", { required: "Last name is required" })}
                label="Last Name"
                fullWidth
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                variant="outlined"
              />
            </div>

            <TextField
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              label="Email"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
              variant="outlined"
              style={{ marginBottom: "1rem" }}
            />

            <TextField
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Phone number must be 10 digits",
                },
              })}
              label="Phone Number"
              fullWidth
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
              variant="outlined"
              style={{ marginBottom: "1rem" }}
            />

            <TextField
              {...register("company", {
                required: "Company name is required",
              })}
              label="Company"
              error={!!errors.company}
              helperText={errors.company?.message}
              fullWidth
              variant="outlined"
              style={{ marginBottom: "1rem" }}
            />

            <TextField
              {...register("jobTitle", {
                required: "Job title is required",
              })}
              label="Job Title"
              fullWidth
              error={!!errors.jobTitle}
              helperText={errors.jobTitle?.message}
              variant="outlined"
              style={{ marginBottom: "1rem" }}
            />

            <DialogActions className="">
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" form="contact-form" variant="contained">
                Edit Contact
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </motion.div>
    </Dialog>
  );
}
