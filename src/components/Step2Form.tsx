import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, Grid, TextField } from "@mui/material";
import UserTable from "./UserTable";

interface FormValues {
  address?: string;
  state?: string;
  city?: string;
  country: string;
  pincode: string;
}

const schema = yup.object().shape({
  country: yup.string().required("Country is required"),
  pincode: yup
    .string()
    .required("Pincode is required")
    .matches(/^\d+$/, "Pincode must be numeric"),
});

interface Step1FormProps {
  onSubmit: SubmitHandler<FormValues>;
}

const Step2Form: React.FC<Step1FormProps> = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  return (
    <>
      <h1 style={{ marginLeft: "15px" }}>Address Details</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ margin: "10px" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Address"
                      {...field}
                      fullWidth
                      error={!!errors.address}
                      helperText={errors.address?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="State"
                      {...field}
                      fullWidth
                      error={!!errors.state}
                      helperText={errors.state?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="City"
                      {...field}
                      fullWidth
                      error={!!errors.city}
                      helperText={errors.city?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Country"
                      {...field}
                      fullWidth
                      error={!!errors.country}
                      helperText={errors.country?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  name="pincode"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Pincode"
                      {...field}
                      fullWidth
                      error={!!errors.pincode}
                      helperText={errors.pincode?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
          <Button
            sx={{
              display: "block",
              margin: "auto",
              border: "1px solid blue",
              marginTop: "2em",
            }}
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
      <UserTable />
    </>
  );
};

export default Step2Form;
