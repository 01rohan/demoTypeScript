import React from "react";
import {
  useForm,
  SubmitHandler,
  Controller,
  useFormState,
  useWatch,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Box,
  Grid, // Import FormHelperText
} from "@mui/material";
import UserTable from "./UserTable";

interface FormValues {
  name: string;
  age: number | null;
  sex: string;
  mobile?: string;
  govtIdType?: string;
  govtId?: string;
  govtIdPan?: string;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  age: yup
    .number()
    .required("Age is required")
    .positive("Age must be a positive number")
    .integer("Age must be an integer")
    .typeError("Age must be a number")
    .nullable(),
  sex: yup.string().required("Sex is required"),
  mobile: yup
    .string()
    // .required("Mobile is required")
    .max(10)
    .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Enter a valid Indian mobile number"),
  govtIdType: yup.string(),
  govtId: yup
    .string()
    // .required("govtId is required")
    .matches(
      /^[2-9]\d{11}$/,
      "Enter a 12-digit numeric value not starting with 0 or 1"
    ),
  govtIdPan: yup
    .string()
    // .required("govtIdPan is required")
    .matches(/^[a-zA-Z0-9]{10}$/, "Enter a 10-character alphanumeric string"),
});

interface Step1FormProps {
  onSubmit: SubmitHandler<FormValues>;
}

const Step1Form: React.FC<Step1FormProps> = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  // Use useFormState to access the current value of govtIdType
  const { dirtyFields } = useFormState({ control });

  // Use useWatch to get the real-time selected value of govtIdType
  const govtIdType = useWatch({
    control,
    name: "govtIdType",
  });

  return (
    <>
      <h1 style={{ marginLeft: "15px" }}>Personal Details</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ margin: "10px" }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Name"
                      {...field}
                      fullWidth
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  name="age"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Age"
                      {...field}
                      fullWidth
                      error={!!errors.age}
                      helperText={errors.age?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl error={!!errors.sex} fullWidth>
                  <InputLabel id="sex-label">Sex</InputLabel>
                  <Controller
                    name="sex"
                    control={control}
                    render={({ field }) => (
                      <Select labelId="sex-label" label="Sex" {...field}>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </Select>
                    )}
                  />
                  <FormHelperText>{errors.sex?.message}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <Controller
                  name="mobile"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="mobile"
                      {...field}
                      fullWidth
                      error={!!errors.mobile}
                      helperText={errors.mobile?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl error={!!errors.govtIdType} fullWidth>
                  <InputLabel id="sex-label">govtIdType</InputLabel>
                  <Controller
                    name="govtIdType"
                    control={control}
                    render={({ field }) => (
                      <Select
                        labelId="govtIdType-label"
                        label="govtIdType"
                        {...field}
                      >
                        <MenuItem value="aadhar">Aadhar</MenuItem>
                        <MenuItem value="pancard">Pan Card</MenuItem>
                      </Select>
                    )}
                  />
                  <FormHelperText>{errors.govtIdType?.message}</FormHelperText>
                </FormControl>
              </Grid>
              {govtIdType === "aadhar" ? (
                <Grid item xs={4}>
                  <Controller
                    name="govtId"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label=""
                        fullWidth
                        {...field}
                        error={!!errors.govtId}
                        helperText={errors.govtId?.message}
                      />
                    )}
                  />
                </Grid>
              ) : (
                <Grid item xs={4}>
                  <Controller
                    name="govtIdPan"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label=""
                        fullWidth
                        {...field}
                        error={!!errors.govtIdPan}
                        helperText={errors.govtIdPan?.message}
                      />
                    )}
                  />
                </Grid>
              )}
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
            Next
          </Button>
        </Box>
      </form>
      <Box sx={{ marginTop: "2rem" }}>
        <h1>Data Table</h1>
        <UserTable />
      </Box>
    </>
  );
};

export default Step1Form;
