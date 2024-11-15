// PartBForm.js
import React from "react";
import { useForm } from "react-hook-form";

const PartBForm = ({ onPrevious, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h5>PART B - Additional Details</h5>

      <div>
        <label>Name</label>
        <input type="text" {...register("name", { required: "Name is required" })} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label>Email</label>
        <input type="email" {...register("email", { required: "Email is required" })} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label>Mobile Number</label>
        <input type="text" {...register("mobileNumber", { required: "Mobile number is required" })} />
        {errors.mobileNumber && <p>{errors.mobileNumber.message}</p>}
      </div>

      <div>
        <button type="button" onClick={onPrevious}>Previous</button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default PartBForm;
