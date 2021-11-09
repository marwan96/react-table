import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./flymenu.scss";
import { useFormik } from "formik";
import UserSchema from "./UserSchema";
import InputField from "./Input";
import Select from "./Select";
import shortid from "shortid";

const AddUser = ({
  showAddUserFlyMenu,
  setShowAddUserFlyMenu,
  updateListFromAddFlyMenu,
  closeAddUserFlyMenu
}) => {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "",
    tenant: ""
  };
  const Roleoptions = [
    {
      value: "systemOperator",
      label: "System Operator"
    },
    {
      value: "tenant",
      label: "Tenant"
    },
    {
      value: "systemAdmin",
      label: "System Admin"
    }
  ];

  const Tenantoptions = [
    {
      value: "amazon",
      label: "Amazon"
    },
    {
      value: "flipkart",
      label: "Flipkart"
    },
    {
      value: "myntra",
      label: "Myntra"
    }
  ];

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: UserSchema,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      AddUser(values, setSubmitting, resetForm);
    }
  });

  const AddUser = (userData, setSubmitting, resetForm) => {
    const data = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      phoneNumber: userData.phoneNumber,
      email: userData.email,
      id: shortid.generate(),
      ...(userData.role.value && {
        roleName: userData.role.label,
        roleId: userData.role.value
      }),
      ...(userData.tenant.value && {
        tenantName: userData.tenant.label,
        tenantId: userData.tenant.value
      })
    };
    console.log("hellloData", data);
    updateListFromAddFlyMenu(data);
    resetForm();
    setSubmitting(false);
    closeAddUserFlyMenu();
  };

  const renderSubmitButton = () => {
    return (
      <button type="submit" className="submitButton">
        Add
      </button>
    );
  };
  return (
    <div
      className={`${
        showAddUserFlyMenu ? "RCflymenu RCflymenuopen" : "RCflymenu"
      }`}
    >
      <div className="RCheaderFlymenu">
        Add User
        <button
          className="RCcloseButton"
          onClick={() => setShowAddUserFlyMenu(false)}
        >
          <AiOutlineClose />
        </button>
      </div>
      <div className="RCbodyFlyMenu">
        <form onSubmit={formik.handleSubmit}>
          <InputField name="email" type="email" label="Email" formik={formik} />
          <InputField
            name="firstName"
            type="text"
            label="First Name"
            formik={formik}
          />
          <InputField
            name="lastName"
            type="text"
            label="Last Name"
            formik={formik}
          />
          <div className="selectcomp">
            <Select
              name="role"
              label="Role"
              value={formik.values.role}
              onChange={(value) =>
                formik.setFieldValue("role", value ? value : "")
              }
              onBlur={() => formik.setFieldTouched("role", true)}
              error={formik.errors.role}
              touched={formik.touched.role}
              placeholder="Select..."
              options={Roleoptions}
              isClearable={true}
            />
            <Select
              name="tenant"
              label="Tenant"
              value={formik.values.tenant}
              onChange={(value) =>
                formik.setFieldValue("tenant", value ? value : "")
              }
              onBlur={() => formik.setFieldTouched("tenant", true)}
              error={formik.errors.tenant}
              touched={formik.touched.tenant}
              placeholder="Select..."
              options={Tenantoptions}
              isClearable={true}
            />
          </div>
          <InputField
            name="phoneNumber"
            type="string"
            label="Phone"
            formik={formik}
          />
          <div>{renderSubmitButton()}</div>
        </form>
      </div>
    </div>
  );
};
export default AddUser;
